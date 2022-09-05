from django.http import JsonResponse
from django.contrib.auth.models import User
from django.core import serializers

import json

ok_resp = {
    "status":"ok"
}

err_resp = {
    "status":"err"
}


def add_pomodoro_task(req):
    
    for task in serializers.deserialize("json", req.body):
        task.save()

    return JsonResponse(ok_resp)

def register(req):
    data = json.loads(req.body)

    if "email" not in data or "password" not in data:
        return JsonResponse(err_resp)

    email = data["email"]
    password = data["password"]

    if len(email) == 0 or len(password) == 0:
        return JsonResponse(err_resp)

    user = User.objects.create_user(email,email,password)
    user.save()

    return JsonResponse(ok_resp)

    return JsonResponse(resp)