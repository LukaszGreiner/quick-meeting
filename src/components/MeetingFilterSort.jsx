// MeetingFilterSort.jsx
// Komponent do filtrowania i sortowania rezerwacji
import React from "react";
import { Box, TextField, MenuItem, Button, InputLabel } from "@mui/material";

const statusOptions = [
  { value: "", label: "Wszystkie" },
  { value: "scheduled", label: "Zaplanowane" },
  { value: "canceled", label: "Anulowane" },
];

export default function MeetingFilterSort({ filters, onChange, onReset }) {
  return (
    <Box display="flex" gap={2} mb={2} flexWrap="wrap">
      <TextField
        label="Data"
        name="date"
        type="date"
        value={filters.date || ""}
        onChange={onChange}
        inputlabel={<InputLabel shrink={true}>Data</InputLabel>}
        size="small"
      />
      <TextField
        label="Uczestnik (email)"
        name="participant"
        value={filters.participant || ""}
        onChange={onChange}
        size="small"
      />
      <TextField
        label="Status"
        name="status"
        select
        value={filters.status || ""}
        onChange={onChange}
        size="small"
      >
        {statusOptions.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <TextField
        label="Sortuj po"
        name="sortBy"
        select
        value={filters.sortBy || ""}
        onChange={onChange}
        size="small"
      >
        <MenuItem value="">Brak</MenuItem>
        <MenuItem value="startTime">Godzina</MenuItem>
        <MenuItem value="date">Data</MenuItem>
        <MenuItem value="createdAt">Data utworzenia</MenuItem>
      </TextField>
      <TextField
        label="Kierunek"
        name="order"
        select
        value={filters.order || "asc"}
        onChange={onChange}
        size="small"
      >
        <MenuItem value="asc">Rosnąco</MenuItem>
        <MenuItem value="desc">Malejąco</MenuItem>
      </TextField>
      <Button onClick={onReset} color="secondary" variant="outlined">
        Wyczyść
      </Button>
    </Box>
  );
}
