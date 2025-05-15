// CalendarView.jsx
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import plLocale from "@fullcalendar/core/locales/pl";
import tippy from "tippy.js";
import "tippy.js/dist/tippy.css";

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

  // Dodaj tooltipy po renderze eventów
  function handleEventDidMount(info) {
    const m = info.event.extendedProps;
    let details = `<strong>${m.title}</strong><br/>`;
    details += m.description ? `<em>${m.description}</em><br/>` : "";
    details += m.date ? `Data: ${m.date}<br/>` : "";
    details +=
      m.startTime && m.endTime
        ? `Godzina: ${m.startTime} - ${m.endTime}<br/>`
        : "";
    details +=
      m.participants && m.participants.length
        ? `Uczestnicy: ${m.participants.join(", ")}<br/>`
        : "";
    details += m.createdBy ? `Twórca: ${m.createdBy}<br/>` : "";
    details += m.status
      ? `Status: ${m.status === "canceled" ? "Anulowane" : "Zaplanowane"}`
      : "";
    tippy(info.el, {
      content: details,
      allowHTML: true,
      theme: m.status === "canceled" ? "danger" : "light",
      placement: "top",
      delay: [100, 0],
    });
  }

  return (
    <Box>
      <Paper sx={{ p: 2, mb: 2 }}>
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          locale={plLocale}
          events={events}
          height={600}
          eventDidMount={handleEventDidMount}
        />
      </Paper>
    </Box>
  );
}
