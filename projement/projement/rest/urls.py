from django.urls import include, path


urlpatterns = [
    path("", include("projects.rest.urls")),
]
