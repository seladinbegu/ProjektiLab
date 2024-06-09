import React, { useState, useEffect } from 'react';

const EmailForm = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    fetchUserEmail();
  }, []);

  const fetchUserEmail = async () => {
    const token = localStorage.getItem('token');
    console.log('Token:', token); // Log the token value
    if (!token) {
      console.error('No token found');
      return;
    }

    try {
      // Fetch user email using the token...
    } catch (error) {
      console.error('Error fetching email:', error.message);
    }
  };

  return (
    <div>
      <h2>Email: {email}</h2>
    </div>
  );
};

export default EmailForm;
