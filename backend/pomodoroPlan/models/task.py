from django.db import models
from django.contrib import admin

from django.contrib.auth.models import User

class Task(models.Model):
    description = models.CharField(max_length=10000)
    finished = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE,unique=False)

class AuthorAdmin(admin.ModelAdmin):
    pass

admin.site.register(Task, AuthorAdmin)