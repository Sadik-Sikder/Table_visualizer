import React, { useState } from 'react';
import axios from 'axios';
import './DataForm.css'; 

const DataForm = () => {
  const [formData, setFormData] = useState({
    date: '',
    trade_code: '',
    high: '',
    low: '',
    open: '',
    close: '',
    volume: '',
  });
  const [error, setError] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/data/', formData);
      console.log('Data posted successfully:', response.data);
      setFormData({
        date: '',
        trade_code: '',
        high: '',
        low: '',
        open: '',
        close: '',
        volume: '',
      });
      setError(null);
    } catch (error) {
      console.error('Error posting data:', error);
      setError('Failed to post data. Please try again.');
    }
  };

  return (
    <form className="DataForm" onSubmit={handleSubmit}>
      <h2>Add New Data</h2>
      <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="Date" required />
      <input name="trade_code" value={formData.trade_code} onChange={handleChange} placeholder="Trade Code" required />
      <input name="high" value={formData.high} onChange={handleChange} placeholder="High" required />
      <input name="low" value={formData.low} onChange={handleChange} placeholder="Low" required />
      <input name="open" value={formData.open} onChange={handleChange} placeholder="Open" required />
      <input name="close" value={formData.close} onChange={handleChange} placeholder="Close" required />
      <input name="volume" value={formData.volume} onChange={handleChange} placeholder="Volume" required />
      <button type="submit">Add</button>
    </form>
  );
};

export default DataForm;
