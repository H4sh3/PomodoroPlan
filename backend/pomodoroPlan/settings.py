import os
from pathlib import Path
from django.core.exceptions import ImproperlyConfigured

import environ

env = environ.Env()
environ.Env.read_env()

import logging


USE_TZ = False

SECRET_KEY = env("SECRET_KEY")
CORS_ORIGIN_ALLOW_ALL = env("CORS_ORIGIN_ALLOW_ALL") == "True"


# django-cors-headers settings
CORS_ALLOW_CREDENTIALS = True
CORS_ALLOWED_ORIGINS = []

try:
    cors_origin_env = env("CORS_ALLOWED_ORIGIN")
    CORS_ALLOWED_ORIGINS = [cors_origin_env]
except ImproperlyConfigured:
    # not set in dev
    CORS_ALLOWED_ORIGINS+=["http://localhost:8000","http://127.0.0.1:8000"]

# prod
SESSION_COOKIE_SECURE = True
DEBUG = env("DEBUG") == "True"
gunicorn_logger = logging.getLogger('gunicorn.error')
gunicorn_logger.warning(f'DEBUG: {DEBUG}')

ALLOWED_HOSTS=["localhost","127.0.0.1"]

BASE_DIR = Path(__file__).resolve().parent.parent

INSTALLED_APPS = [
    "corsheaders",
    "pomodoroPlan",
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.messages",
    "django.contrib.sessions",
    "django.contrib.staticfiles"
]

MIDDLEWARE = [
    "corsheaders.middleware.CorsMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
]


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [os.path.join(BASE_DIR, 'templates')],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ]
        }
    }
]

ROOT_URLCONF = "pomodoroPlan.urls"

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': env("DATABASE"),
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

STATIC_URL = "static/"
STATIC_ROOT = "staticroot/"