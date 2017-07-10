from django.db import models

# Create your models here.


class Rectangle(models.Model):
    video = models.IntegerField()
    personID = models.IntegerField()
    frameNum = models.IntegerField()
    top = models.FloatField()
    left = models.FloatField()
    height = models.FloatField()
    width = models.FloatField()

    def __str__(self):
        return str(self.personID)


class TreeEdge(models.Model):
    st = models.IntegerField()
    ed = models.IntegerField()
    val = models.IntegerField()

    def __str__(self):
        return str(self.st) + ' ' + str(self.ed) + ' ' + str(self.val)
