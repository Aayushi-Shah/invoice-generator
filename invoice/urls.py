from django.urls import path
from invoice import views

urlpatterns = [
    path('home', views.home.as_view(),name='home'),
    path('customer',views.customer.as_view(),name='customer'),
    #path('product',views.product.as_view(),name='product'),

]

