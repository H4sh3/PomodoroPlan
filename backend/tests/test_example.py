from pomodoroPlan.models.user import User


def inc(x):
    return x + 1


def test_answer():
    assert inc(4) == 5


def test_create_user():
    u = User(name="joe", age=69)
    assert u.age == 69
    assert u.name != "jane"
    assert u.name == "joe"