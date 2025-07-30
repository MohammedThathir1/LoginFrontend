import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import toast from 'react-hot-toast';
import { useNavigate, useLocation } from 'react-router-dom';

const Login = () => {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

const [isProcessing, setIsProcessing] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // OAuth configuration
  const GOOGLE_CLIENT_ID = '482493811105-9jf678apgg6ifhr4p5nkr0saiiond05e.apps.googleusercontent.com'; // Replace with your Google Client ID
  const GITHUB_CLIENT_ID = 'Ov23lizxU5gW8ro8C0cE'; // Replace with your GitHub Client ID
  const REDIRECT_URI = window.location.origin + '/login'; // Current page as redirect URI
  
  // Handle OAuth callback
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const code = urlParams.get('code');
    const state = urlParams.get('state');
    
    if (code && state) {
      window.history.replaceState({}, document.title, window.location.pathname);
      handleOAuthCallback(code, state);
    }
  }, [location.search]);

  const handleOAuthCallback = async (code, provider) => {
     if (isProcessing) return; // Prevent multiple processing
    setIsProcessing(true);
    
    try {
       toast.loading(`Processing ${provider} login...`, { id: 'oauth-login' });
      let response;
      if (provider === 'google') {
        response = await axios.get(`http://localhost:8080/api/oauth/google?code=${code}`);
      } else if (provider === 'github') {
        response = await axios.get(`http://localhost:8080/api/oauth/github?code=${code}`);
      }

      toast.dismiss('oauth-login');
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        toast.success(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login successful`);
        navigate('/welcome');
      }
    } catch (error) {
      console.log(error);
      toast.dismiss('oauth-login');
      toast.error(`${provider.charAt(0).toUpperCase() + provider.slice(1)} login failed`);
      // Clean up URL
     /*  window.history.replaceState({}, document.title, window.location.pathname); */
    }finally {
      setIsProcessing(false);
    }
  };

  const handleLogin = async(e) => {
    e.preventDefault();
    try {
        const response = await axios.post('http://localhost:8080/api/register/login', {username,password});
        localStorage.setItem("token", response.data.token);
        toast.success('Login successful')
        navigate('/welcome');
    
    } catch (error) {
        console.log(error);
       toast.error('Login failed, Invalid credentials!');
    }
  }

  const handleGoogleLogin = () => {
    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
      `client_id=${GOOGLE_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      `response_type=code&` +
      `scope=openid email profile&` +
      `state=google`;
    
    window.location.href = googleAuthUrl;
  };

  const handleGithubLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?` +
      `client_id=${GITHUB_CLIENT_ID}&` +
      `redirect_uri=${encodeURIComponent(REDIRECT_URI)}&` +
      `scope=user:email&` +
      `state=github`;
    
    window.location.href = githubAuthUrl;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 px-2 sm:px-4 py-6">
      <div className="bg-white p-4 sm:p-8 rounded-xl shadow-2xl w-full max-w-md mx-auto transition-all duration-300">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center text-indigo-700 mb-6">Login</h2>
        
        {/* OAuth Buttons */}
        <div className="mb-6 space-y-3">
          <button
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 text-gray-700 py-3 rounded-lg shadow hover:shadow-md hover:border-gray-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 font-semibold text-base sm:text-lg"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>
          
          <button
            onClick={handleGithubLogin}
            className="w-full flex items-center justify-center gap-3 bg-gray-800 text-white py-3 rounded-lg shadow hover:bg-gray-700 hover:shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 font-semibold text-base sm:text-lg"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Continue with GitHub
          </button>
        </div>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        {/* Email/Password Form */}
        <input
          type="text"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base sm:text-lg"
          placeholder="Username"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-base sm:text-lg"
          placeholder="Password"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 rounded-lg shadow hover:scale-105 hover:from-indigo-700 hover:to-purple-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400 font-semibold text-base sm:text-lg"
        >
          Login
        </button>
        <p className="text-sm sm:text-base text-center mt-4">
          Don't have an account? <span onClick={() => navigate('/signup')} className="text-indigo-600 cursor-pointer hover:underline font-semibold">Sign Up</span>
        </p>
      </div>
    </div>
  )
}

export default Login