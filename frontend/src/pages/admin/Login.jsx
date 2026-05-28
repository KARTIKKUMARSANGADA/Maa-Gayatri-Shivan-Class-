import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/LOGO.png';

const Login = () => {
  const { login } = useData();
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) {
      navigate('/gayatriclass-portal');
    } else {
      setError('Invalid username or password');
    }
  };

  return (
    <div className="min-h-screen bg-brand-cream flex items-center justify-center font-body p-4">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-md border-t-4 border-brand-maroon">
        <div className="text-center mb-8">
          <img src={logo} alt="Maa Gayatri Shivan Class Logo" className="h-20 mx-auto mb-4" />
          <h1 className="text-2xl font-heading font-bold text-brand-maroon">Admin Login</h1>
          <p className="text-gray-500 text-sm mt-1">Enter your credentials to access the dashboard</p>
        </div>

        {error && (
          <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4 text-center border border-red-200">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input 
              type="text" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 bg-gray-50"
              placeholder="Username"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-maroon/50 bg-gray-50"
              placeholder="••••••••"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-brand-maroon text-white font-bold py-3 rounded-lg shadow-md hover:bg-brand-maroon-dark transition-colors mt-2"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
