from django.contrib.auth import views as django_auth_views

from auth.forms import LoginForm


class LoginView(django_auth_views.LoginView):
    authentication_form = LoginForm
    redirect_authenticated_user = True
