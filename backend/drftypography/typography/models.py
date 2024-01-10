from django.contrib.auth.models import AbstractUser
from django.db import models


# Create your models here.
class Staff(AbstractUser):
    patronymic = models.CharField(max_length=150, null=True, blank=True)
    address = models.CharField(max_length=150, null=True, blank=True)
    phone_number = models.CharField(max_length=12, null=True, blank=True)
    is_banned = models.BooleanField(default=False)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Client(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    patronymic = models.CharField(max_length=50, null=True, blank=True)
    phone_number = models.CharField(max_length=12)
    passport_details = models.CharField(max_length=12, null=True, blank=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name}'


class Order(models.Model):
    client = models.ForeignKey('Client', on_delete=models.CASCADE)
    staff = models.ForeignKey('Staff', on_delete=models.CASCADE)
    receipt_date = models.DateField(auto_now_add=True)
    target_date = models.DateField(null=True, blank=True)

    def __str__(self):
        return str(self.id)


class OrderDetail(models.Model):
    order = models.ForeignKey('Order', on_delete=models.CASCADE)
    service = models.ForeignKey('Service', on_delete=models.CASCADE)
    amount = models.IntegerField(default=1)


class Service(models.Model):
    title = models.CharField(max_length=50)

    def __str__(self):
        return self.title


class ServiceCost(models.Model):
    service = models.ForeignKey('Service', on_delete=models.CASCADE)
    cost = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return f'{self.service} {self.cost}'

