# Generated by Django 5.0.1 on 2024-01-10 19:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('typography', '0006_alter_client_passport_details'),
    ]

    operations = [
        migrations.AddField(
            model_name='servicecost',
            name='end',
            field=models.DateField(null=True),
        ),
        migrations.AddField(
            model_name='servicecost',
            name='start',
            field=models.DateField(null=True),
        ),
    ]