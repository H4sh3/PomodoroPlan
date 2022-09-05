from django.db import models
from django.contrib import admin

class Task(models.Model):
    description = models.CharField(max_length=10000)
    finished = models.BooleanField(default=False)

class AuthorAdmin(admin.ModelAdmin):
    pass

admin.site.register(Task, AuthorAdmin)