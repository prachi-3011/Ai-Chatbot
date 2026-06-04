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
    <div className="app-container" style={{ fontFamily: 'sans-serif', backgroundColor: '#222', minHeight: '100vh', color: '#fff' }}>
      
      {!user ? (
        /* IF NOT LOGGED IN: Show the login screen */
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '80vh' }}>
          <h2>Welcome to AI Chatbot</h2>
          <p style={{ color: '#aaa', marginBottom: '20px' }}>Please sign in with your Google account to continue.</p>
          
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            useOneTap // Optional: Enables the cool drop-down prompt in the top right corner
          />
        </div>
      ) : (
        /* IF LOGGED IN: Show the logout header and your Chatbot */
        <div>
          <header style={{ display: 'flex', justifyContent: 'flex-end', padding: '20px' }}>
            <button 
              onClick={handleLogout} 
              style={{ padding: '8px 16px', borderRadius: '15px', border: 'none', backgroundColor: '#ff4d4d', color: '#fff', cursor: 'pointer' }}
            >
              Sign Out
            </button>
          </header>
          
          <main>
            <NewChat />
          </main>
        </div>
      )}

    </div>
  );
}