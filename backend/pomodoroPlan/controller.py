from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate,login,logout
from django.db import IntegrityError

import json

from pomodoroPlan.models.task import Task

success_resp = {
    "status":"success"
}

err_resp = {
    "status":"err"
}

def emptry_resp(_,ex):
    return JsonResponse({})

def serialize_task(t):
    return {description_key:t.description,"uuid":str(t.uuid),"finished":t.finished}

description_key = "description"

def get_task_list(req):
    if not req.user.is_authenticated:
        return JsonResponse(err_resp)
    
    return JsonResponse({"tasks":[serialize_task(t) for t in Task.objects.filter(user=req.user)]})

def add_pomodoro_task(req):

    if not req.user.is_authenticated:
        return JsonResponse(err_resp)
    
    data = json.loads(req.body)

    if not description_key in data:
        return JsonResponse(err_resp)

    description = data[description_key]

    if len(description) == 0:
        return JsonResponse(err_resp)

    t = req.user.task_set.create(description=description)
    t_s = serialize_task(t)
    print(t_s)

    return JsonResponse({"status":"success","tasks":[t_s]})


def valid_auth_data(body):
    data = json.loads(body)
    if "email" not in data or "password" not in data:
        return False,'',''

    email = data["email"]
    password = data["password"]

    if len(email) == 0 or len(password) == 0:
        return False,'',''

    return True,email,password

def sign_up(req):
    if req.method == 'POST':
        valid,email,password = valid_auth_data(req.body)
        if not valid:
            return JsonResponse(err_resp)

        try:
            user = User.objects.create_user(email,email,password)
            user.save()
            login(req,user)
        except IntegrityError:
            return JsonResponse({"status":"This email is used already "})
        except Exception as e:
            return JsonResponse(err_resp)
        return JsonResponse(success_resp)


def sign_in(req):
    valid,email,password = valid_auth_data(req.body)
    if not valid:
        return JsonResponse({
            "status":"email or password don't match"
        })

    user = authenticate(username=email, password=password)
    if user:
        login(req,user)
        return JsonResponse(success_resp)
    
    return JsonResponse({
            "status":"email or password don't match"
        })

def login_check(req):
    return JsonResponse({"status":'authenticated' if req.user.is_authenticated else 'unauthenticated'})

def logout_route(req):
    logout(req)
    return JsonResponse(success_resp)

def update_task(req,uuid):
    if not req.user.is_authenticated:
        return JsonResponse(err_resp)

    data = json.loads(req.body)
    
    if "delete" in data["options"]:
        req.user.task_set.filter(uuid=uuid).delete()
        # no save here?
        return JsonResponse(success_resp)

    if "finished" in data["options"]:
        t = req.user.task_set.filter(uuid=uuid).first()
        if t:
            t.finished = not t.finished
            t.save()
            return JsonResponse(success_resp)

    # unknown option
    return JsonResponse(err_resp)