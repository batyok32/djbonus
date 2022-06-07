from .models import Tarif, Feature
from rest_framework import serializers


class FeatureSerializer(serializers.ModelSerializer):
    class Meta:
        model = Feature
        fields = ("id", "name", "limit", "discount", "description")


class TarifSerializer(serializers.ModelSerializer):
    features = FeatureSerializer(many=True)

    class Meta:
        model = Tarif
        fields = ("id", "name", "features", "price")
