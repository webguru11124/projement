from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.models import User
from django.test import Client, TestCase


class AuthenticationTestCase(TestCase):
    def setUp(self):
        super().setUp()

        self.username = "Thorgate"
        self.password = "thorgate123"

        self.authenticated_user = User.objects.create_user(
            username=self.username,
            email="info@throgate.eu",
            password=self.password,
        )

        self.authenticated_client = Client()
        self.authenticated_client.login(username=self.username, password=self.password)

    def test_login_redirect(self):
        # Anonymous user should see the login form

        client = Client()
        response = client.get("/login/")
        self.assertEqual(response.status_code, 200)

        # Authenticated user should be redirected to the assignment page

        response = self.authenticated_client.get("/login/")
        self.assertRedirects(response, "/", 302, 200)

    def test_login_form(self):
        # There should be the login form in the context

        client = Client()
        response = client.get("/login/")
        form = response.context["form"]
        self.assertIsInstance(form, AuthenticationForm)

        # Both, username and password, are required fields

        client = Client()
        response = client.post("/login/", {})
        self.assertEqual(response.status_code, 200)
        form = response.context["form"]
        self.assertListEqual(["This field is required."], form.errors["username"])
        self.assertListEqual(["This field is required."], form.errors["password"])

        # Authentication should fail with the wrong password

        client = Client()
        response = client.post(
            "/login/",
            {"username": self.username, "password": self.password + self.password},
        )
        self.assertEqual(response.status_code, 200)
        form = response.context["form"]
        self.assertListEqual(
            [
                "Please enter a correct username and password. Note that both fields may be case-sensitive."
            ],
            form.errors["__all__"],
        )

        # Login view should redirect to assignment page after successful authentication

        client = Client()
        response = client.post(
            "/login/", {"username": self.username, "password": self.password}
        )
        self.assertRedirects(response, "/", 302, 200)

    def test_logout_view(self):
        # Authenticated user should get a redirect after logging out

        response = self.authenticated_client.get("/logout/")
        self.assertRedirects(response, "/login/", 302, 200)

        # The user should not get a redirect on login page after logging out

        response = self.authenticated_client.get("/login/")
        self.assertEqual(response.status_code, 200)
