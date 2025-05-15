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
  server: {
    port: 5173, // Port Vite
    proxy: {
      "/api": {
        target: "http://localhost:3000", // Serwer API (json-server)
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
});
