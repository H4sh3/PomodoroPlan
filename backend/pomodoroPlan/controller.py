from django.http import JsonResponse

from django.core import serializers


def add_pomodoro_task(req):
    
    for task in serializers.deserialize("json", req.body):
        task.save()

    resp = {
        "status":"ok"
    }

    return JsonResponse(resp)