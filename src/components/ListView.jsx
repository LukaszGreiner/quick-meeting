// ListView.jsx
import { List, ListItem, ListItemText, Chip, Button, Box } from "@mui/material";

export default function ListView({
  meetings,
  isAdmin,
  user,
  onEdit,
  onDelete,
}) {
  return (
    <List>
      {meetings.map((m) => (
        <ListItem
          key={m.id}
          sx={{
            mb: 1,
            bgcolor: "#f5f5f5",
            borderRadius: 2,
            alignItems: "flex-start",
          }}
          secondaryAction={
            isAdmin || m.createdBy === user.email ? (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Chip
                  label={m.status === "scheduled" ? "Zaplanowane" : "Anulowane"}
                  color={m.status === "scheduled" ? "success" : "error"}
                  sx={{ mr: 1 }}
                />
                <Button size="small" onClick={() => onEdit(m)}>
                  Edytuj
                </Button>
                <Button
                  size="small"
                  color="error"
                  onClick={() => onDelete(m.id)}
                >
                  Usuń
                </Button>
              </Box>
            ) : (
              <Chip
                label={m.status === "scheduled" ? "Zaplanowane" : "Anulowane"}
                color={m.status === "scheduled" ? "success" : "error"}
              />
            )
          }
        >
          <ListItemText
            primary={
              m.title + " | " + m.date + " " + m.startTime + "-" + m.endTime
            }
            secondary={
              m.description + " | Uczestnicy: " + m.participants.join(", ")
            }
          />
        </ListItem>
      ))}
    </List>
  );
}
