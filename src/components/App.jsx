import { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import MeetingList from "./MeetingList";
import { CssBaseline, Button, Box } from "@mui/material";

function App() {
  const [user, setUser] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return (
      <Box>
        <CssBaseline />
        {showRegister ? (
          <>
            <Register onRegister={() => setShowRegister(false)} />
            <Button
              onClick={() => setShowRegister(false)}
              sx={{ position: "absolute", top: 16, right: 16 }}
            >
              Masz konto? Zaloguj się
            </Button>
          </>
        ) : (
          <>
            <Login onLogin={setUser} />
            <Button
              onClick={() => setShowRegister(true)}
              sx={{ position: "absolute", top: 16, right: 16 }}
            >
              Nie masz konta? Zarejestruj się
            </Button>
          </>
        )}
      </Box>
    );
  }

  return <MeetingList user={user} onLogout={() => setUser(null)} />;
}

export default App;
