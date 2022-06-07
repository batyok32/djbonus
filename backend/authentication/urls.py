from django.urls import path
from . import views


urlpatterns = [
    # path('company/exist/', views.CompanyExistView.as_view()),
    # Retrieving, Changing Company
    path('company/me/', views.CompanyRetrieveView.as_view()),
    path('company/', views.CompanyListCreateView.as_view()),
    # Retrieving, Changing Client
    path('client/me/', views.ClientRetrieveView.as_view()),
    path('client/', views.ClientListCreateView.as_view()),
    path('user/exist/', views.UserExistView.as_view()),
]

# path("company/<int:pk>/", views.RetrieveStrangerCompanyView.as_view()),
# path('search/company/', views.SearchCompanyView.as_view()),
# path('search/freelancer/', views.SearchFreelancerView.as_view()),
# path("client/<int:pk>/", views.RetrieveStrangerFreelancerView.as_view()),
