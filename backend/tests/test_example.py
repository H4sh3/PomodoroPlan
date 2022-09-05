from pomodoroPlan.models.task import Task
from django.contrib.auth.models import User

from datetime import date
import pytest


def inc(x):
    return x + 1


def test_answer():
    assert inc(4) == 5

@pytest.mark.django_db
def test_create_user():
    email = "john321@doe.com"
    pw = "test"
    user = User.objects.create_user(email,email,pw)
    user.save()

    for i in range(10):
        print(user.task_set)
        task = user.task_set.create(description=f"task-{i}")
        task.save()

    tasks = Task.objects.filter(user=user)

    assert len(tasks)==10