DEBUG = True
USE_TZ = False

SECRET_KEY="yolo"

from pathlib import Path
import os

BASE_DIR = Path(__file__).resolve().parent.parent

INSTALLED_APPS=[
    "pomodoroPlan",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.messages", 
    "django.contrib.sessions",
    "django.contrib.staticfiles"
]

MIDDLEWARE=[
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
]

TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": os.path.join(BASE_DIR, 'templates'),
        "APP_DIRS": True,
        "OPTIONS":{
            "context_processors":[
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        }
    }
]

ROOT_URLCONF="pomodoroPlan.urls"

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'database.sqlite'),
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATIC_URL="static/"
STATIC_ROOT="staticroot/"