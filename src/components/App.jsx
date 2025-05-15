import { useState } from "react";
import { CssBaseline } from "@mui/material";
import LoginPage from "../pages/LoginPage";
import SignUpPage from "../pages/SignUpPage";
import HomePage from "../pages/HomePage";

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return (
      <>
        <CssBaseline />
        {showRegister ? (
          <SignUpPage
            onRegister={() => setShowRegister(false)}
            onSwitchToLogin={() => setShowRegister(false)}
          />
        ) : (
          <LoginPage
            onLogin={setUser}
            onSwitchToRegister={() => setShowRegister(true)}
          />
        )}
      </>
    );
  }

  return <HomePage user={user} onLogout={() => setUser(null)} />;
}

export default App;
