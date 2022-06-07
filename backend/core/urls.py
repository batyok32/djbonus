from django.urls import path
from . import views

app_name = "core"

urlpatterns = [
    path("tarifs/", views.TarifListView.as_view(), name="tarifs_list"),
    path("buy-tarif/", views.BuyTarif.as_view(), name="buy_tarif"),
    path("pay-tarif/", views.PayTarif.as_view(), name="pay_tarif"),
]
