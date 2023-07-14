from typing import List
from random import choices, choice, randint

from django.core.management.base import BaseCommand

from faker import Faker

from projects.models import Company, Project, Tag

fake = Faker()


class Command(BaseCommand):
    help = "Helper for creating many projects so that performance issues could be tested more easily."

    def add_arguments(self, parser):
        parser.add_argument(
            "--nr-of-projects",
            type=int,
            default=300,
            dest="nr_of_projects",
            help="Number of projects to create",
        )

    def handle(self, *args, **options):
        """
        Create a bunch of projects.

        Creates a company for every 10 projects.
        """
        nr_of_projects = options.get("nr_of_projects")
        NR_OF_TAGS = 10

        # Create tags until we have a good amount of tags to choose from
        tags: List[Tag] = list(Tag.objects.all())
        while len(tags) < NR_OF_TAGS:
            color = choice(Tag.COLOR_CHOICES)
            tags.append(Tag.objects.create(name=fake.currency_code(), color=color[0]))
        tag_ids = [tag.id for tag in tags]

        # Create a few dummy companies for the projects
        companies: List[Company] = []
        for i in range(round(nr_of_projects / 10)):
            company: Company = Company.objects.create(name=fake.company())
            company.tags.add(*choices(tag_ids, k=randint(1, 3)))
            companies.append(company)

        # Create the given number of projects
        for i in range(nr_of_projects):
            start_date = fake.date_between(start_date="-20y", end_date="-1d")
            has_end_date = fake.boolean(chance_of_getting_true=50)
            end_date = (
                fake.date_between(start_date, end_date="today")
                if has_end_date
                else None
            )

            project: Project = Project.objects.create(
                company=choice(companies),
                title=fake.domain_name(),
                start_date=start_date,
                end_date=end_date,
                estimated_design=fake.pyint(min_value=1, max_value=999, step=1),
                actual_design=fake.pyint(min_value=1, max_value=999, step=1),
                estimated_development=fake.pyint(min_value=1, max_value=999, step=1),
                actual_development=fake.pyint(min_value=1, max_value=999, step=1),
                estimated_testing=fake.pyint(min_value=1, max_value=999, step=1),
                actual_testing=fake.pyint(min_value=1, max_value=999, step=1),
            )
