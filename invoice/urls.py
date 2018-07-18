from django.urls import path
from invoice import views

urlpatterns = [
    path('', views.home,name='home'),
   
]

