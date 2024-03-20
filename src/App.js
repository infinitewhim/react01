import logo from './logo.svg';
import './App.css';

import { Car } from './Car.js';
import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/books/v1/'); // Example API endpoint
        setData(response.data.results);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>List of Posts</h1>
      <ul>
        {data.map(post => (
          <li key={post.id}>
            <h2>{post.name}</h2>
            <p>{post.pages}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
