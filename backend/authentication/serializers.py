# from django.db.models import fields
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from rest_framework import serializers

from core.serializers import FeatureSerializer
from .models import ClientProfile, CompanyProfile


User = get_user_model()


# For Sign up and list
class UserCreateeSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = User
        fields = ("id", "username", "type", "password")


# Detail User
class UserDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "is_active", "type", "is_staff", "date_joined")
        read_only_fields = ["id", "is_active", "is_staff", "date_joined"]


class CustomUserCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = (
            "id",
            "username",
            "password",
            "is_active",
            "type",
            "is_staff",
            "date_joined",
        )
        read_only_fields = ["id", "is_active", "is_staff", "date_joined"]


# CLIENT


class ClientSerializer(serializers.ModelSerializer):
    tarif = serializers.StringRelatedField()
    features = FeatureSerializer(many=True)

    class Meta:
        model = ClientProfile
        fields = (
            "id",
            "user",
            "full_name",
            "phone_number",
            "balans",
            "tarif",
            "features",
            "email",
            "created",
            "active",
        )


class ClientUpdateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientProfile
        fields = (
            "id",
            "user",
            "full_name",
            "phone_number",
            "email",
            "created",
            "active",
        )


class ClientRetrieveSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientProfile
        fields = (
            "id",
            "user",
            "full_name",
            "phone_number",
            "email",
            "created",
            "active",
        )


class ClientCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientProfile
        fields = (
            "id",
            "user",
            "full_name",
            "phone_number",
            "email",
            "created",
            "active",
        )
        read_only_fields = ["id", "user"]


# COMPANY


class CompanySerializer(serializers.ModelSerializer):
    qrcode = serializers.SerializerMethodField()

    class Meta:
        model = CompanyProfile
        fields = (
            "id",
            "user",
            "full_name",
            "phone_number",
            "feature",
            "qrcode",
            "created",
            "active",
        )
        read_only_fields = ["id", "user"]

    def get_qrcode(self, obj):
        return self.context["request"].build_absolute_uri(obj.qrcode.url)


class CompanyCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = (
            "id",
            "user",
            "full_name",
            "description",
            "address",
            "company_type",
            "company_type_full",
            "phone_number",
            "email",
            "created",
            "active",
        )
        read_only_fields = ["id", "user"]

    def create(self, validated_data):
        instance = CompanyProfile.objects.create(**validated_data)
        return instance


class SearchCompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = CompanyProfile
        fields = ("id", "full_name", "user")


class SearchClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientProfile
        fields = ("id", "full_name", "user")


# class SmallCompanySerializer(serializers.ModelSerializer):
#     logo = serializers.SerializerMethodField()
#     full_name = serializers.SerializerMethodField()
#     slug = serializers.SerializerMethodField()

#     class Meta:
#         model = Company
#         fields = ('id', 'username', 'logo', 'full_name', 'slug')

#     def get_logo(self, obj):
#         return self.context['request'].build_absolute_uri(obj.profile.logo.url)

#     def get_full_name(self, obj):
#         return obj.profile.full_name

#     def get_slug(self, obj):
#         return obj.profile.slug
