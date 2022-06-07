from django.contrib import admin
from django.urls import include, path

# Settings
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("api/v0/", include("core.urls")),
    path("admin/", admin.site.urls),
    path("auth/", include("djoser.urls")),
    path("auth/", include("djoser.urls.jwt")),
    path("credentials/", include("authentication.urls")),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
