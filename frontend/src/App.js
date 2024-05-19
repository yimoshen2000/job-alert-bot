import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from 'react';

function App() {
  const [jobAlerts, setJobAlerts] = useState([]);

  useEffect(() => {
    fetchJobAlerts();
  }, []);

  const fetchJobAlerts = async () => {
    const response = await fetch('/job_alerts');
    const data = await response.json();
    setJobAlerts(data);
  };

  const createJobAlert = async (title, company, url, duration) => {
    const response = await fetch('/job_alerts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ title, company, url, duration })
    });
    await response.json();
    fetchJobAlerts();
  };

  const deleteJobAlert = async (alertId) => {
    await fetch(`/job_alerts/${alertId}`, { method: 'DELETE' });
    fetchJobAlerts();
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      <JobAlertList jobAlerts={jobAlerts} onDelete={deleteJobAlert} />
      <CreateJobAlertForm onSubmit={createJobAlert} />
    </div>
  );
}

function JobAlertList({ jobAlerts, onDelete }) {
  return (
    <div>
      <h2>Job Alerts</h2>
      <ul>
        {jobAlerts.map((alert) => (
          <li key={alert.id}>
            <span>{alert.title}</span>
            <span>{alert.company}</span>
            <span>{alert.url}</span>
            <span>{alert.duration}</span>
            <button onClick={() => onDelete(alert.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

function CreateJobAlertForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [company, setCompany] = useState('');
  const [url, setUrl] = useState('');
  const [duration, setDuration] = useState(0);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(title, company, url, duration);
    setTitle('');
    setCompany('');
    setUrl('');
    setDuration(0);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Company:
        <input type="text" value={company} onChange={(e) => setCompany(e.target.value)} />
      </label>
      <label>
        URL:
        <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
      </label>
      <label>
        Duration:
        <input type="number" value={duration} onChange={(e) => setDuration(parseInt(e.target.value, 10))} />
      </label>
      <button type="submit">Create Job Alert</button>
    </form>
  );
}

export default App;