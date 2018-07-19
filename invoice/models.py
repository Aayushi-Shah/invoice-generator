from django.db import models


class customerModel(models.Model):
	name = models.CharField(max_length=255)
	phone = models.CharField(max_length=12)
	address = models.CharField(max_length=255 , null=True)
	email = models.CharField(max_length=255) 
	pincode = models.CharField(max_length=9,null=True)
	
	def __str__(self):
		return self.name


'''class productModel(models.Model):
	item_name=models.CharField(max_length=255,null=True)
	rate=models.CharField(max_length=255)
	quantity=models.CharField(max_length=255)
	price=models.CharField(max_length=255)
	sub_total=models.CharField(max_length=255)
	tax=models.CharField(max_length=255 , null=True)
	discount=models.CharField(max_length=255 , null=True)
	grandtotal=models.CharField(max_length=255)
	customer= models.ForeignKey(customerModel,on_delete=models.CASCADE)'''





