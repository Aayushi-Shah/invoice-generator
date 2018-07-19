from django.contrib import admin
from .models import *

class customerAdmin(admin.ModelAdmin):
	list_display=('id','name','email')

admin.site.register(customerModel,customerAdmin)
#admin.site.register(productModel)
