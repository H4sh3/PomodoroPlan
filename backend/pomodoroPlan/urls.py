from django.urls import path

# urls.py
from django.contrib import admin
from django.urls import path


from . import views
from . import controller

urlpatterns = [
    path('create_task', controller.add_pomodoro_task),
    path('task_list', controller.get_task_list),
    path('admin/', admin.site.urls),
    path('register', controller.register),
    path('login', controller.login_route),
    path('check', controller.login_check),
]
