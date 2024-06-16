# Table Visualizer

Table Visualizer is a web application that visualizes data using Django as the backend framework and React as the frontend framework.

## Backend (Django)

### Setup
### First setup a virtual env than install the requirements.txt
### start the server
```
python manage.py runserver
```
### API Endpoints
Upload CSV: POST /api/upload_csv/
Data List: GET /api/data/
Data Detail: GET /api/data/<id>/, PUT /api/data/<id>/, DELETE /api/data/<id>/

## Front-end (React)
### install the dependencies
```
npm install
```
### start the development server
```
npm start
```
In the project learned about the recharts to make beutiful charts in react 
The major problem i faced was in the csv data the the low , high column values were actually string instead of float and also Date was Byte Order Mark (BOM) which was causing a problem when we were reading the csv
