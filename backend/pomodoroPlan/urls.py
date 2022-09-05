from django.urls import path

# urls.py
from django.contrib import admin
from django.urls import path


from . import views
from . import controller

urlpatterns = [
    path('tasks', views.task_list),
    path('new_task', controller.add_pomodoro_task),
    path('admin/', admin.site.urls),
    path('register', controller.register),
]
