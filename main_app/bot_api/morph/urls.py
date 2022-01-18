from django.urls import path

from . import views

app_name = 'morph'


urlpatterns = [
    path('', views.index, name='index'),

]