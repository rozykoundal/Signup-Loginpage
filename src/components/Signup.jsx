import React, { useState } from 'react';
import './Auth.css';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Signup = () => {
  const [fields, setFields] = useState([
    { name: 'email', value: '' },
    { name: 'password', value: '' },
    { name: 'confirmPassword', value: '' }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const email = fields.find(f => f.name === 'email').value;
    const password = fields.find(f => f.name === 'password').value;
    const confirmPassword = fields.find(f => f.name === 'confirmPassword').value;

    if (!email || !password || !confirmPassword) {
      toast.error('Please fill in all required fields.');
      setIsLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(' Passwords do not match.');
      setIsLoading(false);
      return;
    }

    if (password.length < 6) {
      toast.error(' Password must be at least 6 characters long.');
      setIsLoading(false);
      return;
    }

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const existingUsers = JSON.parse(localStorage.getItem('users')) || [];

    const userExists = existingUsers.find((user) => user.email === email);
    if (userExists) {
      toast.error(' User already exists. Please login.');
      setIsLoading(false);
      return;
    }

    const newUsers = [...existingUsers, { email, password }];
    localStorage.setItem('users', JSON.stringify(newUsers));

    toast.success(' Account created successfully! Redirecting to login...');
    
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
            value={fields.find(f => f.name === 'email').value}
            onChange={e => setFields(fields.map(f => f.name === 'email' ? { ...f, value: e.target.value } : f))}
            disabled={isLoading}
          />
        </div>
        <div className="input-group password-group">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Create a password"
            required
            value={fields.find(f => f.name === 'password').value}
            onChange={e => setFields(fields.map(f => f.name === 'password' ? { ...f, value: e.target.value } : f))}
            disabled={isLoading}
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword((prev) => !prev)}
            tabIndex={0}
            role="button"
            aria-label={showPassword ? "Hide password" : "Show password"}
            style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          >
            {showPassword ? (
              // Eye-off SVG
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.06 10.06 0 0 1 12 20c-5.05 0-9.29-3.14-11-8 1.21-3.06 3.6-5.64 6.58-7.06"/><path d="M1 1l22 22"/><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03"/></svg>
            ) : (
              // Eye SVG
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </span>
        </div>
        <div className="input-group password-group">
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder="Confirm your password"
            required
            value={fields.find(f => f.name === 'confirmPassword').value}
            onChange={e => setFields(fields.map(f => f.name === 'confirmPassword' ? { ...f, value: e.target.value } : f))}
            disabled={isLoading}
          />
          <span
            className="password-toggle"
            onClick={() => setShowConfirmPassword((prev) => !prev)}
            tabIndex={0}
            role="button"
            aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            style={{ cursor: 'pointer', position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)' }}
          >
            {showConfirmPassword ? (
              // Eye-off SVG
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.94 17.94A10.06 10.06 0 0 1 12 20c-5.05 0-9.29-3.14-11-8 1.21-3.06 3.6-5.64 6.58-7.06"/><path d="M1 1l22 22"/><path d="M9.53 9.53A3.5 3.5 0 0 0 12 15.5c1.38 0 2.63-.83 3.16-2.03"/></svg>
            ) : (
              // Eye SVG
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
            )}
          </span>
        </div>
        <button 
          type="submit" 
          className={isLoading ? 'loading' : ''}
          disabled={isLoading}
        >
          {isLoading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

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
