import sys
from django.shortcuts import render
from django.http import *
from .models import *

from rest_framework.views import APIView
from rest_framework.response import Response 

class home(APIView):
	def get(self, request):
		return render(request,'home.html')

class customer(APIView):
	def post(self, request):
		name=request.data['name']
		phone=request.data['phone']
		address=request.data['address']
		email=request.data['email']
		pincode=request.data['pincode']

		customerModel.objects.create(name=name,phone=phone,address=address,email=email,pincode=pincode)
		return Response(True)

# class product(APIView):
# 	def post(self, request):
# 		customer_id=request.data['customer_id']
# 		c=customerModel.objects.get(id=customer_id)
# 		item_name=request.data['item_name']
# 		rate=request.data['rate']
# 		quantity=request.data['quantity']
# 		price=request.data['price']
# 		sub_total=request.data['sub_total']
# 		tax=request.data['tax']
# 		discount=request.data['discount']
# 		grandtotal=request.data['grandtotal']

# 		if c:
# 			productModel.objects.create(customer=c,item_name=item_name,rate=rate,quantity=quantity,price=price,sub_total=sub_total,tax=tax,discount=discount,grandtotal=grandtotal)
# 			return Response(True)
# 		else:
# 			c=customerModel.objects.get(id="2")
# 			productModel.objects.create(customer=c,item_name=item_name,rate=rate,quantity=quantity,price=price,sub_total=sub_total,tax=tax,discount=discount,grandtotal=grandtotal)
# 			return Response(True)
