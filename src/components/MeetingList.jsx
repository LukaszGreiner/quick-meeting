import { useEffect, useState } from "react";
import { Typography, Box, Paper, Button, Chip } from "@mui/material";
import MeetingForm from "./MeetingForm";
import MeetingFilterSort from "./MeetingFilterSort";
import * as meetingApi from "../API/meetingApi";
import CalendarView from "./CalendarView";
import ListView from "./ListView";

export default function MeetingList({ user, onLogout }) {
  const [meetings, setMeetings] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editMeeting, setEditMeeting] = useState(null);
  const [filters, setFilters] = useState({
    date: "",
    participant: "",
    status: "",
    sortBy: "",
    order: "asc",
  });
  const [view, setView] = useState("list"); // "list" lub "calendar"
  const isAdmin = user.role === "admin";

  const fetchMeetings = async () => {
    try {
      // Pobierz dane z backendu (z filtrami poza sortowaniem i uczestnikiem)
      let data = await meetingApi.getMeetings({
        date: filters.date,
        status: filters.status,
      });
      // Filtrowanie po uczestniku (frontend)
      if (filters.participant) {
        data = data.filter(
          (m) =>
            m.participants &&
            m.participants.some((p) =>
              p.toLowerCase().includes(filters.participant.toLowerCase())
            )
        );
      }
      // Sortowanie po stronie frontendu
      if (filters.sortBy) {
        data = [...data].sort((a, b) => {
          let aVal = a[filters.sortBy];
          let bVal = b[filters.sortBy];
          // Jeśli sortujemy po dacie lub czasie, porównuj jako string lub Date
          if (filters.sortBy === "date" || filters.sortBy === "createdAt") {
            aVal = new Date(aVal);
            bVal = new Date(bVal);
          }
          if (filters.sortBy === "startTime" || filters.sortBy === "endTime") {
            // format hh:mm
            aVal = aVal || "";
            bVal = bVal || "";
          }
          if (aVal < bVal) return filters.order === "asc" ? -1 : 1;
          if (aVal > bVal) return filters.order === "asc" ? 1 : -1;
          return 0;
        });
      }
      setMeetings(data);
    } catch {
      // obsługa błędów
    }
  };

  useEffect(() => {
    fetchMeetings();
    // eslint-disable-next-line
  }, [filters]);

  const handleAdd = () => {
    setEditMeeting(null);
    setFormOpen(true);
  };
  const handleEdit = (meeting) => {
    setEditMeeting(meeting);
    setFormOpen(true);
  };
  const handleDelete = async (id) => {
    await meetingApi.deleteMeeting(id);
    fetchMeetings();
  };
  const handleFormSubmit = async (data) => {
    if (editMeeting) {
      await meetingApi.updateMeeting(editMeeting.id, data);
    } else {
      await meetingApi.createMeeting({ ...data, createdBy: user.email });
    }
    setFormOpen(false);
    fetchMeetings();
  };
  const handleFilterChange = (e) => {
    setFilters((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const handleFilterReset = () => {
    setFilters({
      date: "",
      participant: "",
      status: "",
      sortBy: "",
      order: "asc",
    });
  };

  return (
    <Box p={2}>
      <Paper
        sx={{
          p: 2,
          mb: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">
          Witaj, {user.username} ({user.role})
        </Typography>
        <Box>
          <Button
            variant={view === "list" ? "contained" : "outlined"}
            sx={{ mr: 1 }}
            onClick={() => setView("list")}
          >
            Lista
          </Button>
          <Button
            variant={view === "calendar" ? "contained" : "outlined"}
            onClick={() => setView("calendar")}
          >
            Kalendarz
          </Button>
          <Button onClick={onLogout} color="secondary" sx={{ ml: 2 }}>
            Wyloguj
          </Button>
        </Box>
      </Paper>
      <MeetingFilterSort
        filters={filters}
        onChange={handleFilterChange}
        onReset={handleFilterReset}
      />
      {view === "list" ? (
        <>
          <Typography variant="h5" mb={2}>
            Lista rezerwacji
          </Typography>
          <div>
            <Button variant="contained" sx={{ mb: 2 }} onClick={handleAdd}>
              Dodaj rezerwację
            </Button>
          </div>
          <ListView
            meetings={meetings}
            isAdmin={isAdmin}
            user={user}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
          <MeetingForm
            open={formOpen}
            onClose={() => setFormOpen(false)}
            onSubmit={handleFormSubmit}
            initialData={editMeeting}
            user={user}
          />
        </>
      ) : (
        <CalendarView meetings={meetings} />
      )}
    </Box>
  );
}
