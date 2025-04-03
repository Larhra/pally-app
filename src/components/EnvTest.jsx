// src/components/EnvTest.jsx
function EnvTest() {
    return (
      <div>
        <h2>Environment Variables Test</h2>
        <p>SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL ? '✅ Set' : '❌ Not set'}</p>
        <p>SUPABASE_ANON_KEY: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set'}</p>
        
        {/* Only show in development */}
        {import.meta.env.DEV && (
          <div style={{ background: '#f0f0f0', padding: '10px', borderRadius: '5px' }}>
            <p><strong>Debug Info (only visible in development):</strong></p>
            <p>SUPABASE_URL: {import.meta.env.VITE_SUPABASE_URL}</p>
          </div>
        )}
      </div>
    );
  }
  
  export default EnvTest;