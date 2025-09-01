"use client"; 

import { useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link'; 

export default function AddSchoolPage() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onSubmit = async (data) => {
    setIsSubmitting(true);
    setMessage('');
    const formData = new FormData();
    Object.keys(data).forEach(key => {
      if (key === 'image') {
        formData.append(key, data.image[0]);
      } else {
        formData.append(key, data[key]);
      }
    });

    try {
      const response = await fetch('/api/schools', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Success: ' + result.message);
        reset(); 
      } else {
        setMessage('Error: ' + result.message);
      }
    } catch (error) {
      setMessage('Error: Failed to submit the form.');
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="form-container">
      <h1>Add a New School</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        {}
        <input {...register('name', { required: 'Name is required' })} placeholder="School Name" />
        {errors.name && <span>{errors.name.message}</span>}

        <input {...register('address', { required: 'Address is required' })} placeholder="Address" />
        {errors.address && <span>{errors.address.message}</span>}

        <input {...register('city', { required: 'City is required' })} placeholder="City" />
        {errors.city && <span>{errors.city.message}</span>}
        
        <input {...register('state', { required: 'State is required' })} placeholder="State" />
        {errors.state && <span>{errors.state.message}</span>}

        <input type="number" {...register('contact', { required: 'Contact is required' })} placeholder="Contact Number" />
        {errors.contact && <span>{errors.contact.message}</span>}

        <input {...register('email_id', { required: 'Email is required', pattern: { value: /^\S+@\S+$/i, message: 'Invalid email address' } })} placeholder="Email ID" />
        {errors.email_id && <span>{errors.email_id.message}</span>}

        <label htmlFor="image">School Image</label>
        <input type="file" {...register('image', { required: 'Image is required' })} accept="image/*" />
        {errors.image && <span>{errors.image.message}</span>}

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Add School'}
        </button>
      </form>
      {message && <p>{message}</p>}

      {}
      <nav style={{ marginTop: '2rem', textAlign: 'center' }}>
        <Link href="/show-schools" style={{ padding: '10px 20px', backgroundColor: '#555', color: 'white', textDecoration: 'none', borderRadius: '5px' }}>
            Show All Schools
        </Link>
      </nav>
      {}


      <style jsx>{`
        .form-container { max-width: 600px; margin: 2rem auto; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); }
        h1 { text-align: center; margin-bottom: 2rem; }
        input, button { display: block; width: 100%; padding: 12px; margin-bottom: 1rem; border: 1px solid #ccc; border-radius: 4px; font-size: 1rem; }
        label { margin-bottom: 0.5rem; display: block; }
        span { color: red; margin-bottom: 1rem; display: block; }
        button { background-color: #0070f3; color: white; border: none; cursor: pointer; }
        button:disabled { background-color: #ccc; }
      `}</style>
    </div>
  );
}