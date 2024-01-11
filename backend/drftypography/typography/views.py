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

    def get_queryset(self):
        """
        Этот представление должно возвращать список всех заказов
        или только заказов для определенного клиента, если параметр
        clientId передан в GET запросе.
        """
        queryset = Order.objects.all()
        # Получаем параметр 'orderId' из запроса, 'None' если параметр не предоставлен
        client_id = self.request.query_params.get('clientId', None)
        if client_id is not None:
            # Если параметр 'clientId' предоставлен, фильтруем queryset по этому id
            queryset = queryset.filter(client__id=client_id)
        return queryset


class OrderDetailViewSet(ModelViewSet):
    queryset = OrderDetail.objects.all()
    serializer_class = OrderDetailSerializer
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """
        Этот представление должно возвращать список всех деталей заказов
        или только детали заказов для определенного заказа, если параметр
        orderId передан в GET запросе.
        """
        queryset = OrderDetail.objects.all()
        # Получаем параметр 'orderId' из запроса, 'None' если параметр не предоставлен
        order_id = self.request.query_params.get('orderId', None)
        if order_id is not None:
            # Если параметр 'orderId' предоставлен, фильтруем queryset по этому id
            queryset = queryset.filter(order__id=order_id)
        return queryset


class ServiceViewSet(ModelViewSet):
    queryset = Service.objects.all()
    serializer_class = ServiceSerializer
    permission_classes = (IsAuthenticated,)

