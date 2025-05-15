import {
  List,
  ListItem,
  Chip,
  Button,
  Box,
  Typography,
  Stack,
  useTheme,
  useMediaQuery,
  IconButton,
  Paper,
  Tooltip,
  Avatar,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EventIcon from "@mui/icons-material/Event";
// AccessTimeIcon is no longer needed here
import DescriptionIcon from "@mui/icons-material/Description";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import SubjectIcon from "@mui/icons-material/Subject";

export default function ListView({
  meetings,
  isAdmin,
  user,
  onEdit,
  onDelete,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (meetings.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Typography variant="body1" color="text.secondary">
          Brak rezerwacji do wyświetlenia
        </Typography>
      </Box>
    );
  }

  return (
    <List sx={{ p: 0 }}>
      {meetings.map((m) => (
        <Paper
          key={m.id}
          elevation={1}
          sx={{
            mb: 2,
            borderRadius: 2,
            overflow: "hidden",
            transition: "all 0.2s",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: 3,
            },
          }}
        >
          <ListItem
            sx={{
              p: { xs: 1.5, md: 2.5 }, // Adjusted padding for mobile
              bgcolor:
                m.status === "canceled"
                  ? "rgba(211, 47, 47, 0.05)"
                  : "rgba(46, 125, 50, 0.05)",
              borderLeft: `4px solid ${
                m.status === "canceled"
                  ? theme.palette.error.main
                  : theme.palette.success.main
              }`,
              display: "flex",
              flexDirection: "column", // Always column for better control on mobile
              alignItems: "stretch", // Stretch items to full width
            }}
          >
            {/* Header with title, time and status chip */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start", // Align items to the start for multiline titles
                mb: 1.5,
                flexWrap: "wrap", // Allow wrapping for very long titles/times
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  flexGrow: 1,
                  mr: 1,
                }}
              >
                <SubjectIcon color="primary" fontSize="small" />
                <Typography
                  variant="h6"
                  component="h3"
                  sx={{ fontWeight: 500, lineHeight: 1.3 }} // Adjusted line height
                >
                  {m.title}
                  {m.startTime && m.endTime && (
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.secondary"
                      sx={{ ml: 0.5 }}
                    >
                      | {m.startTime} - {m.endTime}
                    </Typography>
                  )}
                </Typography>
              </Box>
              <Chip
                label={m.status === "scheduled" ? "Zaplanowane" : "Anulowane"}
                color={m.status === "scheduled" ? "success" : "error"}
                size="small"
                sx={{
                  mt: isMobile ? 0.5 : 0,
                  ml: isMobile ? 0 : 1,
                  alignSelf: "flex-start",
                }} // Adjust margin for mobile
              />
            </Box>

            {/* Meeting details with icons */}
            <Stack spacing={1} sx={{ width: "100%" }}>
              {" "}
              {/* Ensure stack takes full width */}
              {/* Date row */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <EventIcon fontSize="small" color="action" />
                <Typography variant="body2" color="text.secondary">
                  {m.date}
                </Typography>
              </Box>
              {/* Description row */}
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <DescriptionIcon
                  fontSize="small"
                  color="action"
                  sx={{ mt: 0.3 }}
                />
                <Typography variant="body2" sx={{ wordBreak: "break-word" }}>
                  {m.description || "Brak opisu"}
                </Typography>
              </Box>
              {/* Participants row */}
              <Box sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}>
                <PeopleAltIcon
                  fontSize="small"
                  color="action"
                  sx={{ mt: 0.3 }}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography
                    variant="caption" // Smaller text for "Uczestnicy" label
                    color="text.secondary"
                    display="block"
                    sx={{ mb: 0.5 }}
                  >
                    Uczestnicy:
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                    {m.participants.map((participant, i) => (
                      <Tooltip key={i} title={participant}>
                        <Chip
                          avatar={
                            <Avatar
                              sx={{
                                width: 20,
                                height: 20,
                                fontSize: "0.75rem",
                              }}
                            >
                              {participant.charAt(0).toUpperCase()}
                            </Avatar>
                          }
                          label={participant.split("@")[0]}
                          size="small"
                          variant="outlined"
                        />
                      </Tooltip>
                    ))}
                  </Box>
                </Box>
              </Box>
              {/* Created by info */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <PersonIcon fontSize="small" color="action" />
                <Typography variant="caption" color="text.secondary">
                  {" "}
                  {/* Smaller text */}
                  Utworzone przez: {m.createdBy}
                </Typography>
              </Box>
            </Stack>

            {/* Action buttons */}
            {(isAdmin || m.createdBy === user.email) && (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "flex-end",
                  mt: 1.5, // Reduced margin top
                  gap: 1,
                  width: "100%", // Ensure buttons take full width for justification
                }}
              >
                <Button
                  size="small"
                  variant="outlined"
                  color="primary"
                  startIcon={<EditIcon />}
                  onClick={() => onEdit(m)}
                  sx={{ borderRadius: 2, flexGrow: isMobile ? 1 : 0 }} // Buttons grow on mobile
                >
                  Edytuj
                </Button>
                <Button
                  size="small"
                  variant="outlined"
                  color="error"
                  startIcon={<DeleteOutlineIcon />}
                  onClick={() => onDelete(m.id)}
                  sx={{ borderRadius: 2, flexGrow: isMobile ? 1 : 0 }} // Buttons grow on mobile
                >
                  Usuń
                </Button>
              </Box>
            )}
          </ListItem>
        </Paper>
      ))}
    </List>
  );
}
