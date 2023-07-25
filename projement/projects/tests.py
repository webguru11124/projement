from django.contrib.auth.models import User
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APITestCase

from projects.models import Project


class ProjectsTestCase(TestCase):
    fixtures = ["projects/fixtures/initial.json"]

    def setUp(self):
        super().setUp()

        self.projects = Project.objects.order_by("id")

    def test_project_has_ended(self):
        # 2 of the projects have ended
        self.assertListEqual(
            [p.has_ended for p in self.projects], [True, True, False, True, False]
        )

    def test_project_is_over_budget(self):
        # 1 of the projects is over budget
        self.assertListEqual(
            [p.is_over_budget for p in self.projects], [True, False, False, True, False]
        )

    def test_total_estimated_hours(self):
        self.assertListEqual(
            [p.total_estimated_hours for p in self.projects], [690, 170, 40, 141, 1025]
        )

    def test_total_actual_hours(self):
        self.assertListEqual(
            [p.total_actual_hours for p in self.projects], [739, 60, 5, 207, 1020]
        )


from django.urls import get_resolver


def get_all_urls():
    url_patterns = get_resolver().url_patterns
    return [pattern for pattern in url_patterns]


class ProjectAdminTestCase(TestCase):
    fixtures = ["projects/fixtures/initial.json"]

    def setUp(self):
        super().setUp()
        self.user = User.objects.create_superuser(username="test", password="123")
        login = self.client.login(username="test", password="123")

    def test_admin_end_date_sorting(self):
        all_urls = get_all_urls()
        for url in all_urls:
            print(url)

        url = reverse("admin:projects_project_changelist")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        projects_on_page = response.context["cl"].result_list

        expected_order = ["Krah", "Projement", "Vaheladu", "Comics", "GateMe"]

        actual_order = [project.title for project in projects_on_page]

        self.assertEqual(actual_order, expected_order)


class ProjectsViewSetTestCase(APITestCase):
    fixtures = ["projects/fixtures/initial.json"]

    def setUp(self):
        super().setUp()
        self.user = User.objects.create_user(username="test", password="123")
        login = self.client.login(username="test", password="123")

    def test_projects_can_be_retrieved(self):
        url = reverse("project-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        # There are 3 projects in the response (loaded from the fixtures)
        self.assertEqual(len(response.data), 5)

    def test_end_date_sorting(self):
        url = reverse("project-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_200_OK)
        data = response.data

        expected_order = ["Krah", "Projement", "Vaheladu", "Comics", "GateMe"]
        actual_order = [project["title"] for project in data]

        self.assertEqual(actual_order, expected_order)

    def test_projects_list_requires_authentication(self):
        self.client.logout()

        url = reverse("project-list")
        response = self.client.get(url)

        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)
