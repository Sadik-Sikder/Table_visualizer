from django.db import models

class Data(models.Model):
    date = models.DateField()
    trade_code = models.CharField(max_length=50)
    high = models.FloatField()
    low = models.FloatField()
    open = models.FloatField()
    close = models.FloatField()
    volume = models.IntegerField()

    def __str__(self):
        return f'{self.trade_code} on {self.date}'
