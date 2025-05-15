import { Box, Button } from "@mui/material";
import Register from "../components/Register";
import Logo from "../components/Logo";

export default function SignUpPage({ onRegister, onSwitchToLogin }) {
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
      {/* Przycisk przełączania na logowanie */}
      <Button
        onClick={onSwitchToLogin}
        sx={{ position: "absolute", top: 24, right: 32 }}
      >
        Masz konto? Zaloguj się
      </Button>

      {/* Logo i formularz rejestracji */}
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
        <Register onRegister={onRegister} />
      </Box>
    </Box>
  );
}
