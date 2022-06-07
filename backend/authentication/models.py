from datetime import date
from django.core.exceptions import ValidationError
from django.db import models
from django.contrib.auth.models import (
    AbstractBaseUser,
    PermissionsMixin,
    BaseUserManager,
)
from django.utils import timezone
from django.core.files.storage import default_storage
from django.conf import settings

from core.models import Feature, Tarif
from dateutil.relativedelta import relativedelta
import datetime
import qrcode
from io import BytesIO
from django.core.files import File
from PIL import Image, ImageDraw


def select_storage():
    return default_storage if settings.DEBUG else "Fine"


class UserManager(BaseUserManager):
    def _create_user(self, username, password, **extra_fields):
        """
        Create and save a user with the given username, email, and password.
        """
        if not username:
            raise ValueError("Users must haven a name")

        username = self.model.normalize_username(username)

        user = self.model(username=username, **extra_fields)
        user.set_password(password)
        user.save()

        return user

    def create_user(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", False)
        extra_fields.setdefault("is_superuser", False)
        return self._create_user(username, password, **extra_fields)

    def create_superuser(self, username, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)
        extra_fields.setdefault("type", "ADMIN")

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self._create_user(username, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    class Types(models.TextChoices):
        CLIENT = "CLIENT", "Client"
        COMPANY = "COMPANY", "Company"
        ADMIN = "ADMIN", "Admin"

    type = models.CharField(
        "Type", max_length=50, choices=Types.choices, default=Types.CLIENT
    )

    username = models.CharField("Username for Login", max_length=255, unique=True)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()
    date_joined = models.DateTimeField("Joined date", default=timezone.now)

    USERNAME_FIELD = "username"
    REQUIRED_FIELDS = ["type"]

    def __str__(self):
        return self.username

    @property
    def is_company(self):
        if self.type == self.Types.COMPANY:
            return True
        else:
            return False

    def save(self, *args, **kwargs):
        self.full_clean()
        super(User, self).save(*args, **kwargs)


# Clients MODEL


class ClientManager(UserManager):
    """
    Used for returning only clients
    """

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.CLIENT)


class ClientProfile(models.Model):
    """
    Profile Model for Freelancer
    """

    user = models.OneToOneField(
        User, related_name="client_profile", on_delete=models.CASCADE
    )
    full_name = models.CharField("Full Name", max_length=255, unique=True)
    phone_number = models.BigIntegerField("Contact phone number")
    email = models.EmailField("Email")
    balans = models.PositiveIntegerField(default=0)
    tarif = models.ForeignKey(
        Tarif, related_name="clients", on_delete=models.CASCADE, null=True, blank=True
    )
    features = models.ManyToManyField(
        Feature,
        related_name="clients",
        through="ClientQrCodeCount",
        blank=True,
    )
    tarif_started = models.DateField(blank=True, null=True)
    tarif_expiring = models.DateField(blank=True, null=True)

    created = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    def __str__(self) -> str:
        return self.user.username

    def clean(self, *args, **kwargs):
        if self.phone_number >= 99360000000 and self.phone_number <= 99365999999:
            # It is phone number
            pass
        elif self.phone_number >= 99312000000 and self.phone_number <= 99312999999:
            # It is work number
            pass
        else:
            raise ValidationError("Invalid phone number", code="invalid")
        super(ClientProfile, self).clean(*args, **kwargs)

    def save(self, *args, **kwargs):
        self.full_clean()
        self.tarif_expiring = self.tarif_started + relativedelta(months=1)
        super(ClientProfile, self).save(*args, **kwargs)


class ClientQrCodeCount(models.Model):
    client = models.ForeignKey(ClientProfile, on_delete=models.CASCADE)
    feature = models.ForeignKey(Feature, on_delete=models.CASCADE)

    def __str__(self) -> str:
        return f"{self.client.user.username} - {self.feature.name}"


class CountScan(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    qrcodecount = models.ForeignKey(
        ClientQrCodeCount, related_name="scancounts", on_delete=models.CASCADE
    )

    def __str__(self):
        return f"{self.id}"


class Client(User):
    """
    It is layer of User model for Freelancer
    """

    objects = ClientManager()

    class Meta:
        proxy = True

    @property
    def profile(self):
        return self.client_profile

    def save(self, *args, **kwargs):
        # if not self.pk:
        self.type = User.Types.CLIENT
        return super().save(*args, **kwargs)


# Admins


class AdminManager(UserManager):
    """
    Used for returning only admins
    """

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.ADMIN)


class Admin(User):
    """
    It is layer of User model for Admin
    """

    objects = AdminManager()

    class Meta:
        proxy = True
        verbose_name = "Admin"
        verbose_name_plural = "Admins"

    def save(self, *args, **kwargs):
        # if not self.pk:
        self.type = User.Types.ADMIN
        self.is_staff = True
        return super().save(*args, **kwargs)


# COMPANY MODEL


class CompanyManager(UserManager):
    """
    Used for returning only companies
    """

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(type=User.Types.COMPANY)


class CompanyProfile(models.Model):
    """
    Profile for company
    """

    user = models.OneToOneField(
        User, related_name="company_profile", on_delete=models.CASCADE
    )

    full_name = models.CharField("Full Name", max_length=255, unique=True)
    phone_number = models.PositiveIntegerField("Contact phone number")
    qrcodeurl = models.CharField(max_length=255)
    feature = models.OneToOneField(
        Feature, on_delete=models.CASCADE, related_name="company"
    )
    qrcode = models.ImageField(blank=True, null=True, upload_to="qr_codes")
    created = models.DateTimeField(auto_now_add=True)
    active = models.BooleanField(default=True)

    def clean(self, *args, **kwargs):
        # add custom validation here
        if self.phone_number >= 99360000000 and self.phone_number <= 99365999999:
            # It is phone number
            pass
        elif self.phone_number >= 99312000000 and self.phone_number <= 99312999999:
            # It is work number
            pass
        else:
            raise ValidationError("Invalid phone number", code="invalid")
        super(CompanyProfile, self).clean(*args, **kwargs)

    def saveqrcode(self):
        qr_image = qrcode.make(self.qrcodeurl)
        qr_offset = Image.new("RGB", (400, 400), "white")
        draw_img = ImageDraw.Draw(qr_offset)
        qr_offset.paste(qr_image)
        file_name = f"{self.full_name}-{self.id}qr.png"
        stream = BytesIO()
        qr_offset.save(stream, "PNG")
        self.qrcode.save(file_name, File(stream), save=False)
        qr_offset.close()

    def save(self, *args, **kwargs):
        self.full_clean()
        # if not self.id:
        self.saveqrcode()
        super(CompanyProfile, self).save(*args, **kwargs)


class Company(User):
    """
    It is layer of User model for Company
    """

    objects = CompanyManager()

    class Meta:
        proxy = True
        verbose_name = "Company"
        verbose_name_plural = "Companies"

    @property
    def profile(self):
        return self.company_profile

    def save(self, *args, **kwargs):
        self.type = User.Types.COMPANY
        return super().save(*args, **kwargs)
