// CalendarView.jsx
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";

import { Box, Paper } from "@mui/material";

export default function CalendarView({ meetings }) {
  // Zamiana spotkań na eventy FullCalendar
  const events = meetings.map((m) => ({
    id: m.id,
    title: m.title,
    start: m.date + (m.startTime ? `T${m.startTime}` : ""),
    end: m.date + (m.endTime ? `T${m.endTime}` : ""),
    extendedProps: { ...m },
    color: m.status === "canceled" ? "#d32f2f" : undefined,
  }));

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale="pl"
          events={events}
          height={600}
        />
      </Paper>
    </Box>
  );
}
