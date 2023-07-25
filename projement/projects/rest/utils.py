# utils.py
from django.db.models import F, Case, When, Value, BooleanField


def custom_sort(queryset):
    return queryset.annotate(
        is_current_date=Case(
            When(end_date__isnull=True, then=Value(True)),
            default=Value(False),
            output_field=BooleanField(),
        )
    ).order_by("-is_current_date", "-end_date", "start_date")
