from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import APIException
from rest_framework import status

from rest_framework.pagination import PageNumberPagination
from decimal import Decimal
from projects.models import Project
from projects.rest.serializers import ProjectSerializer
from .utils import custom_sort

class CustomPagination(PageNumberPagination):
    page_size = 10  # Number of items per page
    page_size_query_param = 'page_size'  # You can specify the page size in the request query params
    max_page_size = 100  # Maximum allowed page size

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated]   
    pagination_class = CustomPagination  # Include the custom pagination class


    def get_queryset(self):
        return custom_sort(self.queryset)

    @action(detail=True, methods=["put"])
    def add_actual(self, request, pk=None):
        # Get the project instance by primary key (pk)
        project = self.get_object()

        # Assuming you have 'actual_design', 'actual_development', 'actual_testing' in the request data
        actual_design = request.data.get("actual_design", None)
        actual_development = request.data.get("actual_development", None)
        actual_testing = request.data.get("actual_testing", None)

        try:
            # Update the actual hours if the values are provided in the request data
            if actual_design is not None:
                project.actual_design += Decimal(actual_design)
            if actual_development is not None:
                project.actual_development += Decimal(actual_development)
            if actual_testing is not None:
                project.actual_testing += Decimal(actual_testing)

            # Save the changes to the project
            project.save()

            # Serialize the updated project and return the response
            serializer = ProjectSerializer(project)
            return Response(serializer.data)

        except (ValueError, TypeError) as e:
            # If there is a ValueError or TypeError (e.g., invalid decimal format), raise an APIException
            # You can customize the error message as needed
            raise APIException(
                "Invalid actual hours provided.", code=status.HTTP_400_BAD_REQUEST
            )
