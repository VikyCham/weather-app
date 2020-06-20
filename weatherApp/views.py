from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
import geopy.exc as geopy_error
from geopy.geocoders import Nominatim
import speech_recognition as sr
import urllib.request
import json


def index(request):
    return render(request, 'index.html')


def fetchWeather(city_name):
    # getting cordinates
    try:
        geocoder = Nominatim(user_agent="weatherApp", timeout=3)
        coordinates = geocoder.geocode(city_name)

        if coordinates == None:
            return JsonResponse({"data": "not found",
                                 "text": city_name})
    except (geopy_error.GeocoderServiceError, geopy_error.GeocoderTimedOut):
        return JsonResponse({"data": "not found",
                             "error": "connection_failed",
                             "text": city_name,
                             })

    lati = str(round(coordinates.latitude, 2))
    longi = str(round(coordinates.longitude, 2))

    # for weather api
    api_key = 'd2835ae992ec3a5455a8b65ce46726a3'
    api_base_url = "http://api.openweathermap.org/data/2.5/weather?"

    modified_url = ""
    modified_url += api_base_url + 'appid=' + \
        api_key + '&lat=' + lati + '&lon=' + longi

    try:
        response = urllib.request.urlopen(modified_url)
    except urllib.error.URLError as e:
        return JsonResponse({"data": "not found",
                             "text": city_name,
                             })
    else:
        response_data = response.read()
        json_data = json.loads(response_data)
        return JsonResponse({"data": json_data,
                             "text": city_name.title()})


def getWeatherWithMic(request):
    if request.method == "POST":
        recog = sr.Recognizer()

        try:
            with sr.Microphone() as source2:

                recog.adjust_for_ambient_noise(source2, duration=0.5)
                recog.dynamic_energy_threshold = True

                if request.POST.get('command') == 'start':
                    listen_audio = recog.listen(source2)
                else:
                    listen_audio = recog.listen(source2)
                    return JsonResponse({"data": "close"})
                output_text = recog.recognize_google(listen_audio)

                if output_text:
                    return fetchWeather(output_text)

        except sr.RequestError:
            return JsonResponse({"data": "not found",
                                 "error": "connection_failed",
                                 })
        except sr.UnknownValueError:
            return JsonResponse({"data": "Unable"})

    return JsonResponse({"data": "nothing happened"})


def getWeather(request):

    if request.method == "POST":
        input_text = request.POST.get('input_text', 'null')
        city_name = input_text

        if city_name:
            return fetchWeather(city_name)

        return 0
