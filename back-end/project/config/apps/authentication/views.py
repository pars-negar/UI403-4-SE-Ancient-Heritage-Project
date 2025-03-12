from django.shortcuts import render
from django.views import generic
from random import randint




class ShowHomePage(generic.TemplateView):
    template_name='index.html'
    
class  login(generic.TemplateView):
    otp=""
    def get(self, request, *args, **kwargs):
        login.otp= randint(100000,999999)
        context = { 'method': 'get' }
        return render(request , 'login.html' , context)
    def post(self, request, *args, **kwargs):
        send_otp = request.POST.get('send_otp')
        context = { 'method': 'post' }
          
        return render(request , 'login.html' , context) 