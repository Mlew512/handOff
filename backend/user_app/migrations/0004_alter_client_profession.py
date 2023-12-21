# Generated by Django 5.0 on 2023-12-20 22:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('user_app', '0003_remove_client_assignment_client_assignments'),
    ]

    operations = [
        migrations.AlterField(
            model_name='client',
            name='profession',
            field=models.CharField(choices=[('Registered Nurse', 'REGISTERED NURSE'), ('physician', 'Physician')], default='Registered Nurse', max_length=16),
        ),
    ]