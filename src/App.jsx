import { useState } from 'react';
import { GoogleLogin, googleLogout } from '@react-oauth/google';
import NewChat from './Components/Newchat';

export default function App() {
  const [user, setUser] = useState(null);

  // const handleLoginSuccess = (credentialResponse) => {
  //   console.log("Encoded JWT Token from Google:", credentialResponse.credential);
  //   setUser(credentialResponse.credential);
  // };
  const handleLoginSuccess = (credentialResponse) => {
    try {
      // Decode the base64 JWT payload from Google token cleanly without external packages
      const base64Url = credentialResponse.credential.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
        atob(base64)
          .split('')
          .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
      
      const decodedUser = JSON.parse(jsonPayload);
      console.log("Logged in User Profile:", decodedUser);
      setUser(decodedUser); // This now contains 'name', 'email', 'picture'
    } catch (error) {
      console.error("Failed to parse Google credentials", error);
    }
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
        <div style={{ 
          fontFamily: 'sans-serif', 
          color: '#000000', 
          minHeight: '100vh',
          background: '#000000', 
          display: 'flex', 
          flexDirection: 'column', 
          alignItems: 'center', 
          justifyContent: 'center' 
        }}>
          <div style={{height:'200px', width:'400px', background:'#f5f5f5',border:'1px solid #575656',borderRadius:'15px',textAlign:'center'}}>
          <h2 style={{ color: '#000000' }}>Welcome to AI Chatbot</h2>
          <p style={{ color: '#474749', marginBottom: '20px' }}>Please sign in with your Google account to continue.</p>
          <div style={{width:'200px',margin:'0 auto'}}>
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
          />
          </div>
          </div>
        </div>
      ) : (
        /* 2. LOGGED IN: A protective wrapper that forces a minimum height */
        <div style={{ 
          position: 'relative', 
          Height: '100vh',
          width: '100%',
          overflow:'hidden',
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
              backgroundColor: '#655ec9', 
              color: '#fff', 
              cursor: 'pointer',
              zIndex: 1000 
            }}
          >
            Sign Out
          </button>
          
          {/* Your original component runs safely inside here */}
          <NewChat userName={user.name}/>
        </div>
      )}
    </>
  );
}