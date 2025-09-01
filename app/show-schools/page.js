"use client"; 

import { useEffect, useState } from 'react';
import Link from 'next/link'; // Import the Link component

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const response = await fetch('/api/schools');
        const data = await response.json();
        setSchools(data);
      } catch (error) {
        console.error('Failed to fetch schools:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchSchools();
  }, []);

  if (isLoading) {
    return <p style={{ textAlign: 'center', marginTop: '2rem' }}>Loading schools...</p>;
  }

  return (
    <div className="container">
      <h1>Schools List</h1>
      <div className="grid-container">
        {schools.length > 0 ? (
          schools.map((school) => (
            <div key={school.id} className="school-card">
              <img src={school.image} alt={school.name} className="school-image" />
              <div className="card-content">
                <h2>{school.name}</h2>
                <p>{school.address}</p>
                <p>{school.city}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No schools found.</p>
        )}
      </div>

      {}
      <nav style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/add-school" style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Add a New School
        </Link>
      </nav>
      {}


      <style jsx>{`
        .container { max-width: 1200px; margin: 2rem auto; padding: 20px; }
        h1 { text-align: center; margin-bottom: 2rem; }
        .grid-container {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
          gap: 20px;
        }
        .school-card { border: 1px solid #ddd; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .school-image { width: 100%; height: 200px; object-fit: cover; background-color: #eee; }
        .card-content { padding: 15px; }
        h2 { font-size: 1.25rem; margin: 0 0 10px 0; }
        p { margin: 0; color: #555; }
      `}</style>
    </div>
  );
}