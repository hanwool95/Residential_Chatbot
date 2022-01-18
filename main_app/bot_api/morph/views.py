from django.shortcuts import render

from django.http import HttpResponse, JsonResponse

import json

from konlpy.tag import Kkma

kma = Kkma()

# Create your views here.



def index(request):
    data = json.loads(request.body)
    print(data)
    text = data['body']

    morph_result = str(kma.pos(text))

    result = {'title': 'morph', 'body': morph_result}
    print(result)
    return JsonResponse(dict(result))

