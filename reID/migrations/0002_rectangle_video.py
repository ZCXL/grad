# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-05-09 14:37
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('reID', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='rectangle',
            name='video',
            field=models.IntegerField(default=1),
            preserve_default=False,
        ),
    ]