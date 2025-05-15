import { Typography, Paper, Button, Stack } from "@mui/material";
import ViewListIcon from "@mui/icons-material/ViewList";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import LogoutIcon from "@mui/icons-material/Logout";

export default function MeetingListHeader({
  user,
  onLogout,
  view,
  setView,
  isMobile,
}) {
  const { username, role } = user;

  return (
    <Paper
      sx={{
        p: isMobile ? 1.5 : 2,
        mb: 3,
        display: "flex",
        flexDirection: isMobile ? "column" : "row",
        justifyContent: "space-between",
        alignItems: isMobile ? "flex-start" : "center",
        gap: isMobile ? 1.5 : 0,
      }}
    >
      <Typography variant="h6" sx={{ mb: isMobile ? 1 : 0 }}>
        Witaj, {username} ({role})
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
  );
}
