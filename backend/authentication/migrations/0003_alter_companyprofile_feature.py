# Generated by Django 4.0.3 on 2022-06-07 13:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0005_remove_feature_day_count'),
        ('authentication', '0002_alter_clientprofile_features_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='companyprofile',
            name='feature',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='company', to='core.feature'),
        ),
    ]
