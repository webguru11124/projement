"""projement URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf import settings
from django.urls import include, path, re_path
from django.contrib import admin
from django.views.generic import TemplateView

urlpatterns = [
    path("", include("auth.urls")),
    path("api/", include("projement.rest.urls")),
    path("api-auth/", include("rest_framework.urls")),
    path("admin/", admin.site.urls),
    re_path(r"^(?P<path>.*)/$", TemplateView.as_view(template_name="app.html")),
    path("", TemplateView.as_view(template_name="app.html"), name="app"),
]

if settings.DEBUG:
    import debug_toolbar

    urlpatterns = [
        path("__debug__/", include(debug_toolbar.urls)),
    ] + urlpatterns
