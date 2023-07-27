from django.urls import include, path

from rest_framework import routers

from projects.rest.views import ProjectViewSet


router = routers.DefaultRouter()
router.register(r"projects", ProjectViewSet)

urlpatterns = [
    path("", include(router.urls)),
]
