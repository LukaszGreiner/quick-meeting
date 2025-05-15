import { useState } from "react";
import { Box, Paper, useTheme, useMediaQuery } from "@mui/material";
import MeetingFilterSort from "../components/MeetingFilterSort";
import CalendarView from "../components/CalendarView";
import useMeetings from "../hooks/useMeetings";
import MeetingListHeader from "../components/MeetingListHeader";
import ListViewSection from "../components/ListViewSection";
import Logo from "../components/Logo";

export default function Homepage({ user, onLogout }) {
  const isAdmin = user.role === "admin";
  const {
    meetings,
    formOpen,
    setFormOpen,
    editMeeting,
    filters,
    handleAdd,
    handleEdit,
    handleDelete,
    handleFormSubmit,
    handleFilterChange,
    handleFilterReset,
  } = useMeetings(user, isAdmin);

  const [view, setView] = useState("list");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box sx={{ maxWidth: 1200, mx: "auto", p: isMobile ? 1 : 2, mt: 2 }}>
      <MeetingListHeader
        user={user}
        onLogout={onLogout}
        view={view}
        setView={setView}
        isMobile={isMobile}
      />

      <Paper sx={{ p: isMobile ? 1.5 : 2, mb: 3 }}>
        <MeetingFilterSort
          filters={filters}
          onChange={handleFilterChange}
          onReset={handleFilterReset}
        />
      </Paper>

      {view === "list" ? (
        <ListViewSection
          meetings={meetings}
          isAdmin={isAdmin}
          user={user}
          onEdit={handleEdit}
          onDelete={handleDelete}
          formOpen={formOpen}
          setFormOpen={setFormOpen}
          onSubmit={handleFormSubmit}
          initialData={editMeeting}
          onAdd={handleAdd}
          isMobile={isMobile}
        />
      ) : (
        <CalendarView meetings={meetings} />
      )}
    </Box>
  );
}
