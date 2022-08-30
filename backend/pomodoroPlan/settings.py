DEBUG = True
USE_TZ = False

SECRET_KEY="yolo"

from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

INSTALLED_APPS=[
    "pomodoroPlan"
]

ROOT_URLCONF="pomodoroPlan.urls"

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': f'{BASE_DIR}/database.sqlite',
    }
}

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'