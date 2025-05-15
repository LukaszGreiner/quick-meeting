import { Box, Typography } from "@mui/material";

export default function Logo() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mb: 4 * 0.8,
        mt: 2 * 0.8,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 0 }}>
        {/* Emoji calendar icon */}
        <Box
          sx={{
            fontSize: 100 * 0.8,
            lineHeight: 1,
            mr: 2 * 0.8,
            mt: 1 * 0.8,
            mb: 2 * 0.8,
            filter: "drop-shadow(1px 2px 1px #bbb)",
          }}
        >
          📅
        </Box>
        {/* Logo text */}
        <Box>
          <Typography
            variant="h3"
            component="span"
            sx={{
              fontWeight: 900,
              lineHeight: 1.1,
              letterSpacing: 0,
              fontSize: 36 * 0.8,
              verticalAlign: "middle",
            }}
          >
            Quick <br /> Meeting
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            sx={{
              mt: 0,
              fontWeight: 300,
              fontSize: `${22 * 0.8}px`,
              letterSpacing: 0.2,
              textAlign: "left",
            }}
          >
            Spotkania pod kontrolą
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
