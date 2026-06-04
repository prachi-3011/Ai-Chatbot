import { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import NewChat from './Components/Newchat';

export default function App() {
  const [user, setUser] = useState(null);

  const handleLoginSuccess = (credentialResponse) => {
    console.log("Encoded JWT Token from Google:", credentialResponse.credential);
    setUser(credentialResponse.credential);
  };

  const handleLoginError = () => {
    console.log('Login Failed');
  };

  const handleLogout = () => {
    googleLogout(); 
    setUser(null);  
  };

  return (
    <>
      {!user ? (
        /* 1. LOGGED OUT: Center-aligned login wrapper */
        <div style={{ 
          fontFamily: 'sans-serif', 
          color: '#000000', 
          minHeight: '100vh',
          background: 'linear-gradient(to bottom, #9398a0, #ffffff)', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <h2 style={{ color: '#48b615' }}>Welcome to AI Chatbot</h2>
          <p style={{ color: '#223fe2', marginBottom: '20px' }}>Please sign in with your Google account to continue.</p>
          
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
        </div>
      ) : (
        /* 2. LOGGED IN: A protective wrapper that forces a minimum height */
        <div style={{ 
          position: 'relative', 
          minHeight: '100vh',
          width: '100%',
          display: 'block' // Ensures block flow returns for NewChat layout
        }}>
          
          <button 
            onClick={handleLogout} 
            style={{ 
              position: 'absolute',
              top: '20px',
              right: '20px',
              padding: '8px 16px', 
              borderRadius: '15px', 
              border: 'none', 
              backgroundColor: '#ff4d4d', 
              color: '#fff', 
              cursor: 'pointer',
              zIndex: 1000 
            }}
          >
            Sign Out
          </button>
          
          {/* Your original component runs safely inside here */}
          <NewChat />
        </div>
      )}
    </>
  );
}