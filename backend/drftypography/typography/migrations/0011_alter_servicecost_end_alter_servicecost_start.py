# Generated by Django 5.0.1 on 2024-01-10 19:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('typography', '0010_servicecost_end_servicecost_start'),
    ]

    operations = [
        migrations.AlterField(
            model_name='servicecost',
            name='end',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='servicecost',
            name='start',
            field=models.DateField(),
        ),
    ]
