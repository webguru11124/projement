from rest_framework import serializers

from projects.models import Project, Company, Tag


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ("id", "name", "color")


class CompanySerializer(serializers.ModelSerializer):
    tags = TagSerializer(many=True, read_only=True)

    class Meta:
        model = Company
        fields = ("id", "name", "tags")

class CustomDecimalField(serializers.DecimalField):
    def to_representation(self, value):
        # Convert the decimal value to a Python float and then to a number (if not None)
        return float(value) if value is not None else None


class ProjectSerializer(serializers.ModelSerializer):
    company = CompanySerializer(many=False, read_only=True)
    tags = serializers.SerializerMethodField()

    class Meta:
        model = Project
        fields = (
            "id",
            "company",
            "tags",
            "title",
            "start_date",
            "end_date",
            "estimated_design",
            "actual_design",
            "estimated_development",
            "actual_development",
            "estimated_testing",
            "actual_testing",
            "has_ended",
            "total_estimated_hours",
            "total_actual_hours",
            "is_over_budget",
        )
        read_only_fields = (
            "title",
            "start_date",
            "end_date",
            "estimated_design",
            "estimated_development",
            "estimated_testing",
        )

    actual_design = CustomDecimalField(max_digits=10, decimal_places=2, required=False)
    actual_development = CustomDecimalField(max_digits=10, decimal_places=2, required=False)
    actual_testing = CustomDecimalField(max_digits=10, decimal_places=2, required=False)

    def get_tags(self, obj: Project):
        return TagSerializer(obj.company.tags, many=True).data
