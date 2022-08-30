from django.urls import path

from . import views
from . import controller

urlpatterns = [
    path('tasks', views.task_list),
    path('new_task', controller.add_pomodoro_task),
]
