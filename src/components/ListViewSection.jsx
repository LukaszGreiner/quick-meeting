import { Typography, Box, Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import ListView from "./ListView";
import MeetingForm from "./MeetingForm";

export default function ListViewSection({
  meetings,
  isAdmin,
  user,
  onEdit,
  onDelete,
  formOpen,
  setFormOpen,
  onSubmit,
  initialData,
  onAdd,
  isMobile,
}) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "space-between",
          alignItems: isMobile ? "flex-start" : "center",
          mb: 3,
          mt: 2,
          gap: isMobile ? 1.5 : 0,
        }}
      >
        <Typography variant="h5" sx={{ mb: isMobile ? 1 : 0 }}>
          Lista rezerwacji
        </Typography>
        <Button
          variant="contained"
          onClick={onAdd}
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
        onEdit={onEdit}
        onDelete={onDelete}
      />
      <MeetingForm
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={onSubmit}
        initialData={initialData}
        user={user}
      />
    </>
  );
}
