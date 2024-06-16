from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DataViewSet, upload_csv


router = DefaultRouter()
router.register(r'data', DataViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('upload_csv/', upload_csv, name='upload_csv'),
]
