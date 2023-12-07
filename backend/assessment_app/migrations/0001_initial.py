# Generated by Django 5.0 on 2023-12-06 22:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Assessment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('assessment_time', models.DateTimeField(auto_now_add=True)),
                ('neuro', models.CharField(max_length=255)),
                ('cardio', models.CharField(max_length=255)),
                ('respiratory', models.CharField(max_length=255)),
                ('gastrointestinal', models.CharField(max_length=255)),
                ('genitourinary', models.CharField(max_length=255)),
            ],
        ),
    ]
