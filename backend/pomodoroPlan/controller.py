from django.http import JsonResponse
from django.contrib.auth.models import User
from django.core import serializers
from django.contrib.auth import authenticate,login

import json

ok_resp = {
    "status":"ok"
}

err_resp = {
    "status":"err"
}


def add_pomodoro_task(req):

    if not req.user.is_authenticated:
        return JsonResponse(err_resp)
    
    for task in serializers.deserialize("json", req.body):
        task.save()

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
    print(req.user.username)
    return JsonResponse({"auth":req.user.is_authenticated})