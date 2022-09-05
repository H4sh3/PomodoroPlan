from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login

import json

from pomodoroPlan.models.task import Task

ok_resp = {
    "status":"ok"
}

err_resp = {
    "status":"err"
}



description_key = "description"

def get_task_list(req):
    if not req.user.is_authenticated:
        return JsonResponse(err_resp)
    
    return JsonResponse({"tasks":[{description_key:t.description} for t in Task.objects.filter(user=req.user)]})

def add_pomodoro_task(req):

    if not req.user.is_authenticated:
        return JsonResponse(err_resp)
    
    data = json.loads(req.body)

    if not description_key in data:
        return JsonResponse(err_resp)

    description = data[description_key]

    if len(description) == 0:
        return JsonResponse(err_resp)

    req.user.task_set.create(description=description)

    return JsonResponse(ok_resp)


def valid_auth_data(body):
    data = json.loads(body)
    if "email" not in data or "password" not in data:
        return False,'',''

    email = data["email"]
    password = data["password"]

    if len(email) == 0 or len(password) == 0:
        return False,'',''

    return True,email,password

def register(req):
    valid,email,password = valid_auth_data(req.body)
    if not valid:
        return JsonResponse(err_resp)

    user = User.objects.create_user(email,email,password)
    user.save()

    return JsonResponse(ok_resp)


def login_route(req):
    valid,email,password = valid_auth_data(req.body)
    if not valid:
        return JsonResponse(err_resp)

    user = authenticate(username=email, password=password)
    if user is not None:
        login(req,user)
        return JsonResponse(ok_resp)
    else:
        return JsonResponse(err_resp)

def login_check(req):
    return JsonResponse({"auth":req.user.is_authenticated})