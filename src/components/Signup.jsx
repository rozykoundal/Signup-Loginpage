import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!email || !password || !confirmPassword) {
      setMessage('❌ Please fill in all required fields.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setMessage('❌ Passwords do not match.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      setMessage('❌ Password must be at least 6 characters long.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = existingUsers.find((user) => user.email === email);
    if (userExists) {
      setMessage('❌ User already exists. Please login.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    const newUsers = [...existingUsers, { email, password }];
    localStorage.setItem('users', JSON.stringify(newUsers));

    setMessage('✅ Account created successfully! Redirecting to login...');
    setMessageType('success');
    
    setTimeout(() => {
      navigate('/login');
    }, 2000);
    
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Create Account</h2>
      <form onSubmit={handleSignup} className="auth-form">
        <div className="input-group">
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Create a password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            placeholder="Confirm your password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className={isLoading ? 'loading' : ''}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      {message && (
        <p className={`auth-message ${messageType}`}>
          {message}
        </p>
      )}

      <div className="switch-form">
        <span>Already have an account?</span>
        <button
          onClick={() => navigate('/login')}
          className="auth-link-button"
          disabled={isLoading}
        >
          Sign In
        </button>
      </div>
    </div>
  );
};

export default Signup;
