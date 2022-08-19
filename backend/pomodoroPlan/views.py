from django.http import HttpResponse
import datetime

def example_view(request,year):
    
    html = "<html><body>Argument is: %s.</body></html>" % year

    return HttpResponse(html)