# Generated by Django 5.0.1 on 2024-01-04 17:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('typography', '0003_alter_client_passport_details'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='passport_details',
            field=models.CharField(blank=True, max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='client',
            name='patronymic',
            field=models.CharField(blank=True, max_length=50, null=True),
        ),
        migrations.AlterField(
            model_name='client',
            name='phone_number',
            field=models.CharField(max_length=12),
        ),
        migrations.AlterField(
            model_name='staff',
            name='phone_number',
            field=models.CharField(blank=True, max_length=12, null=True),
        ),
    ]
