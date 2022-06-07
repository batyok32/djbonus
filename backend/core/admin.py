from django.contrib import admin

from .models import Feature, Tarif
from django.contrib.auth.admin import UserAdmin


admin.site.register(Tarif)
admin.site.register(Feature)
