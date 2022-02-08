from django.shortcuts import render
from django.http import HttpResponse, JsonResponse
import json

# Create your views here.
def index(request):
    data = json.loads(request.body)
    print(data)
    lat = data['lat']
    long = data['long']


    result = {'title': 'locations', 'lat': lat, 'long': long}
    print(result)
    return JsonResponse(dict(result))