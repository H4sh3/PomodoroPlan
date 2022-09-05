from django.http import HttpResponse

from pomodoroPlan.models.task import Task

def task_list(request):

    task_list = ''

    i = 0
    for t in Task.objects.all():
        i+=1
        task_list+= f'<div>{i}: {t.description}</div>'
    
    html = f"<html><body>{task_list}</body></html>"

    if len(task_list) == 0:
        html="<html><body>You have 0 tasks</body></html>"

    return HttpResponse(html)