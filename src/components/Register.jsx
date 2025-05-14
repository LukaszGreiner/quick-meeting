import { useState } from "react";
import { Button, TextField, Typography, Box, Paper } from "@mui/material";

export default function Register({ onRegister }) {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirm: ""
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (form.password !== form.confirm) {
      setError("Hasła nie są zgodne");
      return;
    }
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
          role: "user",
          createdAt: new Date().toISOString()
        })
      });
      if (res.ok) {
        onRegister();
      } else {
        setError("Błąd rejestracji");
      }
    } catch {
      setError("Błąd połączenia z serwerem");
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
      <Paper elevation={3} sx={{ p: 4, minWidth: 320 }}>
        <Typography variant="h5" mb={2}>Rejestracja</Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nazwa użytkownika"
            name="username"
            value={form.username}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Hasło"
            name="password"
            type="password"
            value={form.password}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          <TextField
            label="Powtórz hasło"
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
          />
          {error && <Typography color="error">{error}</Typography>}
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>Zarejestruj</Button>
        </form>
      </Paper>
    </Box>
  );
}
