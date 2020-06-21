## Project Info

This is a simple "weather app" built-in Django framework and also used AJAX for preventing the page from refreshing.  
This project consists of two main modules 1. GEOPY and 2. SpeechRecognition and used API of [OpenWeatherMap](https://openweathermap.org/) (here you can create your own api key) for getting the weather info.

## Getting Started

Clone this repo into your local machine using this url:
`https://github.com/VikyCham/weather-app.git`

or you can download the **.zip** file from above button.

## Setting the virtual environment

Run these command in the project directory.\
For installing pipenv : `pip install pipenv`\
For running the env : `pipenv shell`

## Installing the packages

In the project dirctory run command : `pip install -r requirements.txt`.

OR run commands:\
`pip install Django`,\
`pip install SpeechRecognition`,\
`pip install geopy`\
`pip install PyAudio`.

If "PyAudio" not installing then run command:\
`pip install pipwin`,\
`pipwin install pyaudio`

## Starting the project

When everything is set just run this command: `python manage.py runserver` in the root directory and open `http://127.0.0.1:8000/` in your browser.

And you are good to go.\
Hope you like the project.
