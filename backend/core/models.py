from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


# Create your models here.
class Feature(models.Model):
    name = models.CharField(max_length=250)
    limit = models.PositiveIntegerField(default=1)
    discount = models.PositiveIntegerField(
        default=1, validators=[MaxValueValidator(100), MinValueValidator(1)]
    )
    description = models.TextField()

    def __str__(self):
        return f"{self.id} - {self.name}"


class Tarif(models.Model):
    name = models.CharField(max_length=255)
    price = models.PositiveIntegerField(default=10)
    features = models.ManyToManyField(Feature)

    def __str__(self):
        return f"{self.id} - {self.name}"
