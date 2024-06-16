import React from 'react';
import './App.css'; 
import DataTable from './components/DataTable';
import DataForm from './components/DataForm';

const App = () => {
  return (
    <div className="App">
      <h1>Data Management</h1>
      <DataForm />
      <DataTable />
      <br />
      <br />
    </div>
  );
}

export default App;
