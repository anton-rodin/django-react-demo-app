# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('quiz', '0004_auto_20150911_1636'),
    ]

    operations = [
        migrations.AddField(
            model_name='quiz',
            name='picture',
            field=models.URLField(max_length=500, default=''),
        ),
    ]
