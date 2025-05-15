import { useState, useEffect, useCallback } from "react";
import * as meetingApi from "../api/meetingApi";

export default function useMeetings(user, isAdmin) {
  const [meetings, setMeetings] = useState([]);
  const [formOpen, setFormOpen] = useState(false);
  const [editMeeting, setEditMeeting] = useState(null);
  const [filters, setFilters] = useState({
    date: "",
    participant: "",
    status: "",
    sortBy: "createdAt",
    order: "desc",
  });

  const fetchMeetings = useCallback(async () => {
    try {
      const data = await meetingApi.getMeetings(filters);
      let filteredMeetings = data;

      if (!isAdmin) {
        filteredMeetings = filteredMeetings.filter(
          (meeting) =>
            meeting.participants && meeting.participants.includes(user.email)
        );
      }

      if (filters.participant) {
        filteredMeetings = filteredMeetings.filter(
          (meeting) =>
            Array.isArray(meeting.participants) &&
            meeting.participants.some((p) =>
              p.toLowerCase().includes(filters.participant.toLowerCase())
            )
        );
      }

      if (filters.status && filters.status !== "") {
        filteredMeetings = filteredMeetings.filter(
          (meeting) => meeting.status === filters.status
        );
      }

      if (filters.sortBy) {
        filteredMeetings = [...filteredMeetings].sort((a, b) => {
          let aValue, bValue;
          switch (filters.sortBy) {
            case "startTime":
              aValue =
                a.date && a.startTime
                  ? new Date(`${a.date}T${a.startTime}`)
                  : null;
              bValue =
                b.date && b.startTime
                  ? new Date(`${b.date}T${b.startTime}`)
                  : null;
              break;
            case "createdAt":
              aValue = a.createdAt ? new Date(a.createdAt) : new Date(0);
              bValue = b.createdAt ? new Date(b.createdAt) : new Date(0);
              break;
            default:
              aValue = a[filters.sortBy];
              bValue = b[filters.sortBy];
          }
          if (
            aValue === undefined ||
            bValue === undefined ||
            aValue === null ||
            bValue === null
          )
            return 0;
          if (aValue instanceof Date && bValue instanceof Date) {
            if (filters.order === "desc") {
              return bValue.getTime() - aValue.getTime();
            } else {
              return aValue.getTime() - bValue.getTime();
            }
          }
          if (filters.order === "desc") {
            return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
          } else {
            return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
          }
        });
      }
      setMeetings(filteredMeetings);
    } catch (error) {
      console.error("Błąd pobierania spotkań:", error);
    }
  }, [filters, isAdmin, user.email]);

  useEffect(() => {
    fetchMeetings();
  }, [fetchMeetings]);

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
        await meetingApi.createMeeting({
          ...data,
          createdBy: user.email,
          createdAt: new Date().toISOString(),
        });
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

  return {
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
    fetchMeetings,
  };
}
