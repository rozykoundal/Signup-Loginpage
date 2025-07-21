import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    if (!email || !password) {
      setMessage('❌ Please fill in all required fields.');
      setMessageType('error');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

    const foundUser = storedUsers.find((user) => user.email === email);

    if (!foundUser) {
      setMessage('❌ Account not found. Please create an account.');
      setMessageType('error');
    } else if (foundUser.password !== password) {
      setMessage('❌ Invalid password!');
      setMessageType('error');
    } else {
      setMessage('✅ Login successful! Redirecting...');
      setMessageType('success');
      
      // Open external URL in a new tab after successful login
      setTimeout(() => {
        window.open('https://rozy-koundal.vercel.app/', '_blank');
      }, 2000);
    }
    
    setIsLoading(false);
  };

  return (
    <div className="auth-container">
      <h2>Welcome Back</h2>
      <form onSubmit={handleLogin} className="auth-form">
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
            placeholder="Enter your password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isLoading}
          />
        </div>
        <button 
          type="submit" 
          className={isLoading ? 'loading' : ''}
          disabled={isLoading}
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      {message && (
        <p className={`auth-message ${messageType}`}>
          {message}
        </p>
      )}

      <div className="switch-form">
        <span>Don't have an account?</span>
        <button
          onClick={() => navigate('/signup')}
          className="auth-link-button"
          disabled={isLoading}
        >
          Create Account
        </button>
      </div>
    </div>
  );
};

export default Login;
