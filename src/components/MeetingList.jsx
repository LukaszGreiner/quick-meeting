import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Paper,
  Button,
  Chip,
  useTheme,
  useMediaQuery,
  Stack,
  IconButton,
} from "@mui/material";
import MeetingForm from "./MeetingForm";
import MeetingFilterSort from "./MeetingFilterSort";
import * as meetingApi from "../API/meetingApi";
import CalendarView from "./CalendarView";
import ListView from "./ListView";
import ViewListIcon from "@mui/icons-material/ViewList";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";

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

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const isExtraSmall = useMediaQuery(theme.breakpoints.down("xs"));

  const fetchMeetings = async () => {};

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
    try {
      await meetingApi.deleteMeeting(id);
      fetchMeetings();
    } catch (error) {
      console.error("Błąd podczas usuwania spotkania:", error);
    }
  };
  const handleFormSubmit = async (data) => {
    try {
      if (editMeeting) {
        await meetingApi.updateMeeting(editMeeting.id, data);
      } else {
        await meetingApi.createMeeting({ ...data, createdBy: user.email });
      }
      setFormOpen(false);
      fetchMeetings();
    } catch (error) {
      console.error("Błąd podczas zapisu formularza:", error);
    }
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
    <Box p={isMobile ? 1 : 2}>
      <Paper
        sx={{
          p: isMobile ? 1.5 : 2,
          mb: 2,
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          gap: isMobile ? 1.5 : 0,
        }}
      >
        <Typography variant="h6" sx={{ mb: isMobile ? 1 : 0 }}>
          Witaj, {user.username} ({user.role})
        </Typography>
        <Stack direction="row" spacing={1} alignItems="center" flexWrap="wrap">
          <Button
            variant={view === "list" ? "contained" : "outlined"}
            size="small"
            onClick={() => setView("list")}
            startIcon={isMobile ? null : <ViewListIcon />}
            sx={{
              minWidth: isMobile ? "auto" : "90px",
              px: isMobile ? 1 : 1.5,
            }}
          >
            {isMobile ? <ViewListIcon /> : "Lista"}
          </Button>
          <Button
            variant={view === "calendar" ? "contained" : "outlined"}
            size="small"
            onClick={() => setView("calendar")}
            startIcon={isMobile ? null : <CalendarMonthIcon />}
            sx={{
              minWidth: isMobile ? "auto" : "110px",
              px: isMobile ? 1 : 1.5,
            }}
          >
            {isMobile ? <CalendarMonthIcon /> : "Kalendarz"}
          </Button>
          <Button
            onClick={onLogout}
            color="secondary"
            size="small"
            variant="outlined"
            startIcon={isMobile ? null : <LogoutIcon />}
            sx={{
              minWidth: isMobile ? "auto" : "90px",
              px: isMobile ? 1 : 1.5,
            }}
          >
            {isMobile ? <LogoutIcon /> : "Wyloguj"}
          </Button>
        </Stack>
      </Paper>

      <Paper sx={{ p: isMobile ? 1.5 : 2, mb: 2 }}>
        <MeetingFilterSort
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
        />
      </Paper>

      {view === "list" ? (
        <>
          <Box
            sx={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              justifyContent: "space-between",
              alignItems: isMobile ? "flex-start" : "center",
              mb: 2,
              gap: isMobile ? 1.5 : 0,
            }}
          >
            <Typography variant="h5" sx={{ mb: isMobile ? 1 : 0 }}>
              Lista rezerwacji
            </Typography>
            <Button
              variant="contained"
              onClick={handleAdd}
              size={isMobile ? "small" : "medium"}
              startIcon={<AddIcon />}
            >
              Dodaj rezerwację
            </Button>
          </Box>
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
