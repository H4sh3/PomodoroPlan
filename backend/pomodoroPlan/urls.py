from django.urls import path

from . import views

urlpatterns = [
    path('example_view/<int:year>/', views.example_view),
]
