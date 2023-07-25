from rest_framework import viewsets, permissions

from projects.models import Project
from projects.rest.serializers import ProjectSerializer
from .utils import custom_sort


class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return custom_sort(self.queryset)
