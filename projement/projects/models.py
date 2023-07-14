from django.db import models
from django.core.validators import MinValueValidator
from django.urls import reverse
from django.utils import timezone
from django.utils.text import slugify


class Tag(models.Model):
    COLOR_CHOICES = (
        ("primary", "Primary"),
        ("secondary", "Secondary"),
        ("success", "Success"),
        ("danger", "Danger"),
        ("warning", "Warning"),
        ("info", "Info"),
        ("light", "Light"),
        ("dark", "Dark"),
    )

    name = models.CharField("Name", max_length=255)
    # For simplicity's sake, we only allow Bootstrap colors to be chosen
    color = models.CharField("Color", choices=COLOR_CHOICES, max_length=128)

    def __str__(self):
        return self.name


class Company(models.Model):
    class Meta:
        verbose_name_plural = "companies"

    tags = models.ManyToManyField(Tag, related_name="projects")
    name = models.CharField(max_length=128)

    def __str__(self):
        return self.name


class Project(models.Model):
    company = models.ForeignKey(
        "projects.Company",
        on_delete=models.PROTECT,
        related_name="projects",
    )

    title = models.CharField("Project title", max_length=128)
    start_date = models.DateField("Project start date", blank=True, null=True)
    end_date = models.DateField("Project end date", blank=True, null=True)

    estimated_design = models.PositiveSmallIntegerField("Estimated design hours")
    actual_design = models.PositiveSmallIntegerField(
        "Actual design hours",
        default=0,
        validators=[MinValueValidator(0)],
    )

    estimated_development = models.PositiveSmallIntegerField(
        "Estimated development hours"
    )
    actual_development = models.PositiveSmallIntegerField(
        "Actual development hours",
        default=0,
        validators=[MinValueValidator(0)],
    )

    estimated_testing = models.PositiveSmallIntegerField("Estimated testing hours")
    actual_testing = models.PositiveSmallIntegerField(
        "Actual testing hours",
        default=0,
        validators=[MinValueValidator(0)],
    )

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse(
            "project-update", kwargs={"pk": self.pk, "slug": slugify(self.title)}
        )

    @property
    def has_ended(self):
        return self.end_date is not None and self.end_date < timezone.now().date()

    @property
    def total_estimated_hours(self):
        return (
            self.estimated_design + self.estimated_development + self.estimated_testing
        )

    @property
    def total_actual_hours(self):
        return self.actual_design + self.actual_development + self.actual_testing

    @property
    def is_over_budget(self):
        return self.total_actual_hours > self.total_estimated_hours
