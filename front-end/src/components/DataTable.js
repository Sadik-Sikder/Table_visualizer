import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  LineChart,
  BarChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import './DataTable.css'; 

const DataTableWithChart = () => {
  const [data, setData] = useState([]);
  const [selectedTradeCode, setSelectedTradeCode] = useState('');
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    date: '',
    trade_code: '',
    high: '',
    low: '',
    open: '',
    close: '',
    volume: '',
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const result = await axios.get('http://127.0.0.1:8000/api/data/');
      if (Array.isArray(result.data.results)) {
        const sortedData = result.data.results.sort((a, b) => new Date(a.date) - new Date(b.date));
        console.log(sortedData);
        setData(sortedData);
        if (result.data.results.length > 0) {
          setSelectedTradeCode(result.data.results[0].trade_code);
        }
      } else {
        console.error("Unexpected response format:", result.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };


  const handleTradeCodeChange = (e) => {
    setSelectedTradeCode(e.target.value);
  };

  const handleDelete = async (id) => {
    try {
      const confirmDelete = window.confirm("Are you sure you want to delete this item?");
      if (confirmDelete) {
        await axios.delete(`http://127.0.0.1:8000/api/data/${id}/`);
        fetchData();
      }
    } catch (error) {
      console.error("Error deleting data:", error);
    }
  };

  const handleEdit = (item) => {
    setEditId(item.id);
    setFormData(item);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://127.0.0.1:8000/api/data/${editId}/`, formData);
      setEditId(null);
      setFormData({
        date: '',
        trade_code: '',
        high: '',
        low: '',
        open: '',
        close: '',
        volume: '',
      });
      fetchData();
    } catch (error) {
      console.error("Error updating data:", error);
    }
  };

  const filteredData = data.filter(item => item.trade_code === selectedTradeCode);

  return (
    <div className="DataTableWithChart">
      <h2>Data Management with Charts</h2>

      <div className="chart-container">
        <select onChange={handleTradeCodeChange} value={selectedTradeCode}>
          {Array.from(new Set(data.map(item => item.trade_code))).map((tradeCode, index) => (
            <option key={index} value={tradeCode}>
              {tradeCode}
            </option>
          ))}
        </select>

        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={filteredData} margin={{ top: 20, right: 20, left: 0, bottom: 20 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line yAxisId="left" type="monotone" dataKey="high" stroke="#8884d8" />
            <Line yAxisId="left" type="monotone" dataKey="low" stroke="#82ca9d" />
            <Line yAxisId="left" type="monotone" dataKey="open" stroke="#ffc658" />
            <Line yAxisId="left" type="monotone" dataKey="close" stroke="#ff7300" />
            <Bar yAxisId="right" dataKey="volume" fill="#413ea0" />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <h2>Data Table</h2>
      
      <div className="data-table">
        <table>
          <thead>
            <tr>
              <th>Serial No</th>
              <th>Date</th>
              <th>Trade Code</th>
              <th>High</th>
              <th>Low</th>
              <th>Open</th>
              <th>Close</th>
              <th>Volume</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.date}</td>
                  <td>{item.trade_code}</td>
                  <td>{item.high}</td>
                  <td>{item.low}</td>
                  <td>{item.open}</td>
                  <td>{item.close}</td>
                  <td>{item.volume}</td>
                  <td>
                    <button onClick={() => handleEdit(item)}>Edit</button>
                    <button onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8">No data available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {editId && (
        <form className="edit-form" onSubmit={handleUpdate}>
          <h2>Edit Data</h2>
          <input type="date" name="date" value={formData.date} onChange={handleChange} placeholder="Date" required />
          <input name="trade_code" value={formData.trade_code} onChange={handleChange} placeholder="Trade Code" required />
          <input name="high" value={formData.high} onChange={handleChange} placeholder="High" required />
          <input name="low" value={formData.low} onChange={handleChange} placeholder="Low" required />
          <input name="open" value={formData.open} onChange={handleChange} placeholder="Open" required />
          <input name="close" value={formData.close} onChange={handleChange} placeholder="Close" required />
          <input name="volume" value={formData.volume} onChange={handleChange} placeholder="Volume" required />
          <button type="submit">Update</button>
        </form>
      )}
    </div>
  );
};

export default DataTableWithChart;
