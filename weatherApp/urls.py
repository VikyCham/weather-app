from django.contrib import admin
from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('get_weather_details', views.getWeather),
    path('get_weather_details_with_mic', views.getWeatherWithMic),
]
