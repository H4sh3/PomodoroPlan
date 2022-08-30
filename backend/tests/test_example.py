from pomodoroPlan.models.task import Task

from django.core import serializers


def inc(x):
    return x + 1


def test_answer():
    assert inc(4) == 5


def test_create_user():
    t = Task(description="get the dishes")
    x = serializers.serialize("json",[t])
    print(x)
    assert 1 == 2