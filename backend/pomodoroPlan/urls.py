from django.urls import path

# urls.py
from django.contrib import admin
from django.urls import path

from . import controller

urlpatterns = [
    path('create_task', controller.add_pomodoro_task),
    path('task_list', controller.get_task_list),
    path('admin/', admin.site.urls),
    path('signup', controller.sign_up),
    path('signin', controller.sign_in),
    path('login_check', controller.login_check),
]
