from rest_framework import viewsets
from .models import Data
from .serializers import DataSerializer
from rest_framework.permissions import AllowAny
import csv
from django.shortcuts import render, redirect
from .forms import UploadCSVForm

class DataViewSet(viewsets.ModelViewSet):
    queryset = Data.objects.all()
    serializer_class = DataSerializer
    permission_classes = [AllowAny]

def upload_csv(request):
    if request.method == "POST":
        form = UploadCSVForm(request.POST, request.FILES)
        if form.is_valid():
            csv_file = form.cleaned_data['csv_file']
            decoded_file = csv_file.read().decode('utf-8-sig').splitlines()  
            reader = csv.DictReader(decoded_file)

            for row in reader:
                try:
                    high = float(row['high'].replace(',', ''))
                    low = float(row['low'].replace(',', ''))
                    open_val = float(row['open'].replace(',', ''))
                    close = float(row['close'].replace(',', ''))
                    volume = int(row['volume'].replace(',', ''))

                    Data.objects.create(
                        date=row['date'],
                        trade_code=row['trade_code'],
                        high=high,
                        low=low,
                        open=open_val,
                        close=close,
                        volume=volume
                    )
                except KeyError as e:
                    return render(request, 'upload_csv.html', {
                        'form': form,
                        'error_message': f'Missing column in row: {e}'
                    })
                except ValueError as e:
                    return render(request, 'upload_csv.html', {
                        'form': form,
                        'error_message': f'Error processing row: {e}'
                    })
            return redirect('upload_csv')
    else:
        form = UploadCSVForm()
    return render(request, 'upload_csv.html', {'form': form})