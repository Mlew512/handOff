# Generated by Django 5.0 on 2023-12-06 22:31

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('assessment_app', '0001_initial'),
        ('encounters_app', '0001_initial'),
        ('patient_app', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.AddField(
            model_name='assessment',
            name='encounter',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='encounters_app.encounter'),
        ),
        migrations.AddField(
            model_name='assessment',
            name='patient',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='patient_app.patient'),
        ),
        migrations.AddField(
            model_name='assessment',
            name='provider',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
