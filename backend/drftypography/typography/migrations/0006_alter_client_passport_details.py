# Generated by Django 5.0.1 on 2024-01-10 09:30

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('typography', '0005_service_staff_is_banned_order_orderdetail_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='passport_details',
            field=models.CharField(blank=True, max_length=12, null=True),
        ),
    ]
