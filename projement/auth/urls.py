from django.urls import path
from django.contrib.auth import views as django_auth_views

from auth.views import LoginView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("logout/", django_auth_views.logout_then_login, name="logout"),
]
