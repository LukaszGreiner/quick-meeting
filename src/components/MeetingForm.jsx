// MeetingForm.jsx
// Formularz do dodawania i edycji rezerwacji spotkań
import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  MenuItem,
} from "@mui/material";

const statusOptions = [
  { value: "scheduled", label: "Zaplanowane" },
  { value: "canceled", label: "Anulowane" },
];

export default function MeetingForm({
  open,
  onClose,
  onSubmit,
  initialData,
  user,
}) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    startTime: "",
    endTime: "",
    participants: "",
    status: "scheduled",
  });

  useEffect(() => {
    if (initialData) {
      setForm({
        ...initialData,
        participants: initialData.participants?.join(", ") || "",
      });
    } else if (user) {
      setForm({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        participants: user.email,
        status: "scheduled",
      });
    } else {
      setForm({
        title: "",
        description: "",
        date: "",
        startTime: "",
        endTime: "",
        participants: "",
        status: "scheduled",
      });
    }
  }, [initialData, open, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({
      ...form,
      participants: form.participants
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
    });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        {initialData ? "Edytuj rezerwację" : "Dodaj rezerwację"}
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            margin="dense"
            label="Tytuł"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Opis"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            multiline
            minRows={2}
          />
          <TextField
            margin="dense"
            label="Data"
            name="date"
            type="date"
            value={form.date}
            onChange={handleChange}
            fullWidth
            InputLabel={{ shrink: true }}
            required
          />
          <TextField
            margin="dense"
            label="Godzina rozpoczęcia"
            name="startTime"
            type="time"
            value={form.startTime}
            onChange={handleChange}
            fullWidth
            InputLabel={{ shrink: true }}
            required
          />
          <TextField
            margin="dense"
            label="Godzina zakończenia"
            name="endTime"
            type="time"
            value={form.endTime}
            onChange={handleChange}
            fullWidth
            InputLabel={{ shrink: true }}
            required
          />
          <TextField
            margin="dense"
            label="Uczestnicy (emaile, oddzielone przecinkami)"
            name="participants"
            value={form.participants}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            margin="dense"
            label="Status"
            name="status"
            select
            value={form.status}
            onChange={handleChange}
            fullWidth
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Anuluj</Button>
          <Button type="submit" variant="contained">
            {initialData ? "Zapisz" : "Dodaj"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
