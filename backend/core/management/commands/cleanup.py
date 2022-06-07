from django.core.management.base import BaseCommand
import os
from config.settings import INSTALLED_APPS
# import glob
from pathlib import Path
import re

# calm
BASE_DIR = Path(__file__).resolve().parent.parent.parent.parent

main_app = os.path.join(BASE_DIR / "core/migrations/")
auth_app = os.path.join(BASE_DIR / "authentication/migrations/")

app_list = [
    main_app,
    auth_app
]
system_list = []

for app in INSTALLED_APPS:
    parts = app.split('.')
    system_list.append(parts[-1])


# system_list = ["sessions", "admin", "auth", "contenttypes", "django_celery_results"]


class bcolors:
    HEADER = "\033[95m"
    OKBLUE = "\033[94m"
    OKCYAN = "\033[96m"
    OKGREEN = "\033[92m"
    WARNING = "\033[93m"
    FAIL = "\033[91m"
    ENDC = "\033[0m"
    BOLD = "\033[1m"
    UNDERLINE = "\033[4m"


class Command(BaseCommand):
    help = "Command information"

    def handle(self, *args, **kwargs):
        # Greeting
        print(f"{bcolors.BOLD}{bcolors.OKGREEN}\nStarted cleaning...\n{bcolors.ENDC}")

        # Looping in apps
        for app in app_list:

            # Taking only files from directory (not folders)
            onlyfiles = [
                f for f in os.listdir(app) if os.path.isfile(os.path.join(app, f))
            ]

            # If files more than one (__init.py__)
            if len(onlyfiles) > 1:
                print(
                    f"{bcolors.BOLD}{bcolors.WARNING}Deleting in - {bcolors.ENDC} {app} \n"
                )
                # Looping all files
                for clenup in onlyfiles:
                    # Do not delete __init__.py
                    if not clenup.endswith("__init__.py"):
                        print(
                            f"{bcolors.FAIL}{bcolors.BOLD}Deleted - {clenup}{bcolors.ENDC}"
                        )
                        # Delete file
                        os.remove(os.path.join(f"{app}/{clenup}"))
        # Delete db
        db = os.path.join(BASE_DIR / "db.sqlite3")
        if os.path.exists(db):
            os.remove(db)
            print(
                f"{bcolors.WARNING}{bcolors.BOLD}\nDeleted - Database{bcolors.ENDC}")
        else:
            os.system("python manage.py flush")
            os.system("python manage.py sqlflush")
            for app in app_list:
                os.system(
                    f"python manage.py migrate zero {os.path.basename(app)}")

            # subprocess.run("python", "manage.py", "flush")
        # Ended
        print(f"{bcolors.BOLD}{bcolors.OKGREEN}\nEnded cleaning...\n{bcolors.ENDC}")
        for app in system_list:
            dr = os.path.basename(app)
            dir = f"python manage.py migrate {dr} zero "
            print(dir)
            os.system(dir)


# SELECT pg_terminate_backend(pg_stat_activity.pid)
# FROM pg_stat_activity
# WHERE pg_stat_activity.datname = 'my_DB';
# DROP DATABASE target_db;
# CREATE DATABASE vpnsystem;
# GRANT ALL PRIVILEGES ON DATABASE vpnsystem TO djvpn;
