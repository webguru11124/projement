from django.contrib import admin
from .rest.utils import custom_sort
from projects.models import Company, Project, Tag


@admin.register(Project)
class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "company", "start_date", "end_date")
    list_filter = ("company__name",)

    def get_queryset(self, request):
        queryset = super().get_queryset(request)
        return custom_sort(queryset)

    fieldsets = (
        (None, {"fields": ["company", "title", "start_date", "end_date"]}),
        (
            "Estimated hours",
            {
                "fields": [
                    "estimated_design",
                    "estimated_development",
                    "estimated_testing",
                ]
            },
        ),
        (
            "Actual hours",
            {"fields": ["actual_design", "actual_development", "actual_testing"]},
        ),
    )

    def get_readonly_fields(self, request, obj=None):
        if obj is None:
            return ()

        return ("company",)


admin.site.register(Company)
admin.site.register(Tag)
