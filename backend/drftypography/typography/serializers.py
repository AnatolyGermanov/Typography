import pytz
from django.utils import timezone
from rest_framework import serializers
from .models import *


# Create your serializers here.
class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = ('id', 'first_name', 'last_name', 'patronymic')


class ClientSerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    staff = StaffSerializer(read_only=True)
    staff_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=Staff.objects.all(),
        source='staff'
    )
    client = ClientSerializer(read_only=True)
    client_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=Client.objects.all(),
        source='client'
    )
    total_order_cost = serializers.SerializerMethodField()

    class Meta:
        model = Order
        fields = '__all__'

    def get_total_order_cost(self, order):
        order_details = OrderDetail.objects.filter(order=order)
        total_cost = 0

        for detail in order_details:
            serializer = OrderDetailSerializer(detail)
            service_cost = serializer.get_service_cost(detail)
            if service_cost is not None:
                total_cost += service_cost*detail.amount

        return total_cost


class ServiceSerializer(serializers.ModelSerializer):
    current_service_cost = serializers.SerializerMethodField()

    class Meta:
        model = Service
        fields = '__all__'

    def get_current_service_cost(self, obj):
        current_time_moscow = timezone.now().astimezone(pytz.timezone('Europe/Moscow'))

        costs = ServiceCost.objects.filter(
            service=obj,
            start__lte=current_time_moscow,
            end__gte=current_time_moscow
        )
        if costs.exists():
            return costs.first().cost
        else:
            # Если для даты заказа не задана конкретная стоимость услуги, нужно это как-то обработать.
            # Это может означать возвращение None, вызов исключения или использование стандартной стоимости.
            return None


class OrderDetailSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=Service.objects.all(),
        source='service'
    )
    service_cost = serializers.SerializerMethodField()

    class Meta:
        model = OrderDetail
        fields = '__all__'

    def get_service_cost(self, obj):
        # Используйте дату получения заказа для определения соответствующей стоимости услуги
        order_date = obj.order.receipt_date
        costs = ServiceCost.objects.filter(
            service=obj.service,
            start__lte=order_date,
            end__gte=order_date
        )
        if costs.exists():
            return costs.first().cost
        else:
            # Если для даты заказа не задана конкретная стоимость услуги, нужно это как-то обработать.
            # Это может означать возвращение None, вызов исключения или использование стандартной стоимости.
            return None


class ServiceCostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCost
        fields = '__all__'

