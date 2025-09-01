"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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
              <div style={{ position: 'relative', width: '100%', height: '200px' }}>
                <Image 
                  src={school.image} 
                  alt={school.name} 
                  fill 
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                />
              </div>
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
      <nav style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/add-school" style={{ padding: '10px 20px', backgroundColor: '#0070f3', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Add a New School
        </Link>
      </nav>
    </div>
  );
}