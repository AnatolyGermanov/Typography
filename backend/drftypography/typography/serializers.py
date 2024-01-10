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

    class Meta:
        model = Order
        fields = '__all__'


class ServiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Service
        fields = '__all__'


class OrderDetailSerializer(serializers.ModelSerializer):
    service = ServiceSerializer(read_only=True)
    service_id = serializers.PrimaryKeyRelatedField(
        write_only=True,
        queryset=Service.objects.all(),
        source='service'
    )

    class Meta:
        model = OrderDetail
        fields = '__all__'


class ServiceCostSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceCost
        fields = '__all__'

