from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from .models import *


# Register your models here.
@admin.register(Staff)
class StaffAdmin(UserAdmin):
    add_fieldsets = UserAdmin.add_fieldsets + (
        (None, {'fields': ('patronymic', 'address', 'phone_number',)}),
    )

    fieldsets = UserAdmin.fieldsets + (
        (None, {'fields': ('patronymic', 'address', 'phone_number', 'is_banned',)}),
    )

    list_display = ('username', 'first_name', 'last_name', 'patronymic', 'phone_number', 'is_staff', 'is_banned')
    search_fields = ('username', 'first_name', 'last_name', 'patronymic', 'email', 'phone_number')
    list_filter = ('is_banned',)


@admin.register(Client)
class ClientAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'patronymic', 'phone_number', 'passport_details', )
    search_fields = ('first_name', 'last_name', 'patronymic')


@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ('id', 'client', 'staff', 'receipt_date', 'target_date')
    search_fields = ('client', )
    list_filter = ('staff',)


@admin.register(OrderDetail)
class OrderDetailAdmin(admin.ModelAdmin):
    list_display = ('order', 'service', 'amount', )
    search_fields = ('order', )


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ('title', )
    search_fields = ('title', )


@admin.register(ServiceCost)
class ServiceCostAdmin(admin.ModelAdmin):
    list_display = ('service', 'cost', )
    search_fields = ('service', )

