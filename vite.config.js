import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),

    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Quick Meeting",
        short_name: "QuickMeeting",
        start_url: "/",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#1976d2",
        icons: [
          {
            src: "/icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
  define: {
    "process.env": {},
  },
  // define: { // Możesz usunąć, jeśli nie jest potrzebne
  //   "process.env": {},
  // },
  server: {
    port: 5173, // Port dla serwera deweloperskiego Vite
    proxy: {
      // Przekieruj wszystkie zapytania /api do json-server na porcie 3000
      "/api": {
        target: "http://localhost:3000", // Serwer API (json-server)
        changeOrigin: true, // Potrzebne dla wirtualnych hostów
        rewrite: (path) => path.replace(/^\/api/, ""), // Usuń /api z początku ścieżki
        // np. /api/meetings -> /meetings
      },
    },
  },
});
