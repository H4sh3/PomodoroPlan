from django.http import HttpResponse

from pomodoroPlan.models.task import Task

def task_list(request):

    task_list = ''

    for t in Task.objects.all():
        task_list+= f'<div>{t.description}</div>'
    
    html = f"<html><body>{task_list}</body></html>"

    return HttpResponse(html)