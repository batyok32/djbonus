from django.contrib import admin

from .forms import UserCreationForm, UserChangeForm
from .models import (
    ClientQrCodeCount,
    Company,
    CompanyProfile,
    Client,
    ClientProfile,
    CountScan,
    User,
    Admin,
)
from django.contrib.auth.admin import UserAdmin


class UseAdmin(UserAdmin):
    list_display = ["id", "username"]
    add_form = UserCreationForm
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "username",
                    "password",
                    "type",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_superuser",
                    "is_active",
                    "is_staff",
                    "user_permissions",
                    "groups",
                )
            },
        ),
        (
            "Dates",
            {
                "fields": (
                    "last_login",
                    "date_joined",
                )
            },
        ),
    )


class AdminAdmin(UserAdmin):
    list_display = ["username"]
    add_form = UserCreationForm
    form = UserChangeForm
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "username",
                    "password",
                    "type",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_superuser",
                    "is_active",
                    "is_staff",
                    "user_permissions",
                    "groups",
                )
            },
        ),
        (
            "Dates",
            {
                "fields": (
                    "last_login",
                    "date_joined",
                )
            },
        ),
    )


class CompanyProfileInline(admin.StackedInline):
    model = CompanyProfile


class CompanyAdmin(UserAdmin):
    list_display = ["id", "username"]
    inlines = [
        CompanyProfileInline,
    ]
    add_form = UserCreationForm
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "username",
                    "password",
                    "type",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_superuser",
                    "is_active",
                    "is_staff",
                    "user_permissions",
                    "groups",
                )
            },
        ),
        (
            "Dates",
            {
                "fields": (
                    "last_login",
                    "date_joined",
                )
            },
        ),
    )


class ClientProfileInline(admin.StackedInline):
    model = ClientProfile
    readonly_fields = ["features"]


class ClientAdmin(UserAdmin):
    list_display = ["username"]
    inlines = [
        ClientProfileInline,
    ]
    add_form = UserCreationForm
    fieldsets = (
        (
            None,
            {
                "fields": (
                    "username",
                    "password",
                    "type",
                )
            },
        ),
        (
            "Permissions",
            {
                "fields": (
                    "is_superuser",
                    "is_active",
                    "is_staff",
                    "user_permissions",
                    "groups",
                )
            },
        ),
        (
            "Dates",
            {
                "fields": (
                    "last_login",
                    "date_joined",
                )
            },
        ),
    )


class ClientQrFeaturesAdmin(admin.ModelAdmin):
    fieldsets = (
        (
            None,
            {
                "fields": ("client", "feature", "scan_counts"),
            },
        ),
    )
    readonly_fields = ["scan_counts"]
    list_filter = ("feature",)

    def scan_counts(self, obj):
        return obj.scancounts.all().count()


class CountScanAdmin(admin.ModelAdmin):
    list_display = ["id", "date"]
    readonly_fields = ["date"]
    list_filter = ("date",)


admin.site.register(CountScan, CountScanAdmin)
admin.site.register(ClientQrCodeCount, ClientQrFeaturesAdmin)
admin.site.register(User, UseAdmin)
admin.site.register(Admin, AdminAdmin)
admin.site.register(Company, CompanyAdmin)
admin.site.register(Client, ClientAdmin)
