from datetime import datetime, date
from django.shortcuts import get_object_or_404, render
from rest_framework import generics
from authentication.models import ClientProfile, ClientQrCodeCount, CountScan, User

from .models import Feature, Tarif
from .serializers import TarifSerializer
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate

# Create your views here.


class TarifListView(generics.ListAPIView):
    """
    List  Jobs
    """

    serializer_class = TarifSerializer
    queryset = Tarif.objects.all()


class BuyTarif(APIView):
    """
    Checks if user Exists
    """

    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        tarif_id = request.data["tarif_id"]
        user = request.user
        # print("GOT IN POST")
        if tarif_id and user:
            tarif = get_object_or_404(Tarif, id=tarif_id)
            # print("Tarif", tarif)
            profile = get_object_or_404(ClientProfile, user=user)
            # print("Profile", profile)
            if profile.balans - tarif.price < 0:
                # print("BALANS LIMIT")
                return Response(False, status=status.HTTP_400_BAD_REQUEST)
            # print("BALANS", profile.balans)
            profile.balans = profile.balans - tarif.price
            # print("SETTING TARIF")
            profile.tarif = tarif
            profile.tarif_started = datetime.today()
            # print("SETTING Features")
            # profile.features.clear()
            profile.features.set(tarif.features.all())
            profile.save()
            # print("SAVED profile", profile)
            return Response(True, status=status.HTTP_200_OK)
        return Response(False, status=status.HTTP_400_BAD_REQUEST)


class PayTarif(APIView):
    """
    Checks if user Exists
    """

    def post(self, request, *args, **kwargs):
        feature_id = request.data.get("feature_id", None)
        username = request.data.get("username", None)
        password = request.data.get("password", None)
        print("GOT IN POST", feature_id, username, password)
        if feature_id and username and password:
            user = authenticate(username=username, password=password)
            # user = get_object_or_404(User, username=username, password=password)
            print("AUTHENTICATING")
            if user is not None:
                print("AUTHENTICATED", user)
                feature = get_object_or_404(Feature, id=feature_id)
                client = get_object_or_404(ClientProfile, user=user)
                qrcou = ClientQrCodeCount.objects.get(feature=feature, client=client)
                print("GOT QRCODECOUNT OBJECT", qrcou)
                count = qrcou.scancounts.count()
                print("GOT QRCODECOUNT OBJECTS COUNT", count)
                d = client.tarif_expiring
                if datetime.now() > datetime(d.year, d.month, d.day):
                    return Response(False, status=status.HTTP_400_BAD_REQUEST)

                if feature.limit > count:
                    newcountscan = CountScan.objects.create(qrcodecount=qrcou)
                    newcountscan.save()
                    print("CREATED NEW ONE")
                    return Response(True, status=status.HTTP_200_OK)
                return Response(False, status=status.HTTP_400_BAD_REQUEST)
            else:
                print("NO  SUCH USE", user)
                return Response(False, status=status.HTTP_400_BAD_REQUEST)
        return Response(False, status=status.HTTP_400_BAD_REQUEST)
