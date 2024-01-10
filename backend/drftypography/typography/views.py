from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from .models import *
from .serializers import *


# Create your views here.
class StaffViewSet(ModelViewSet):
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = (IsAuthenticated,)


class ClientViewSet(ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    permission_classes = (IsAuthenticated,)


class OrderViewSet(ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes = (IsAuthenticated,)


class OrderDetailViewSet(ModelViewSet):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer
    permission_classes = (IsAuthenticated,)


class ServiceViewSet(ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = (IsAuthenticated,)

