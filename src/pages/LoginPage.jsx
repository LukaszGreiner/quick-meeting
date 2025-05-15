import { Box, Button } from "@mui/material";
import Login from "../components/Login";
import Logo from "../components/Logo";

export default function LoginPage({ onLogin, onSwitchToRegister }) {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
      }}
    >
      {/* Przycisk przełączania na rejestrację */}
      <Button
        onClick={onSwitchToRegister}
        sx={{ position: "absolute", top: 24, right: 32 }}
      >
        Nie masz konta? Zarejestruj się
      </Button>

      {/* Logo i formularz logowania */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          maxWidth: "420px",
          width: "100%",
        }}
      >
        <Logo />
        <Login onLogin={onLogin} />
      </Box>
    </Box>
  );
}
