import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    host: "0.0.0.0", // Allow access from all network interfaces
    port: 3000, // Default port (you can change it if needed)
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            if (id.includes("recharts") || id.includes("d3-")) return "vendor-charts";
            if (id.includes("jspdf") || id.includes("html2canvas")) return "vendor-export";
            if (id.includes("@amcharts")) return "vendor-maps";
            if (id.includes("react-dom") || id.includes("react-router"))
              return "vendor-react";
            if (id.includes("leaflet")) return "vendor-leaflet";
            if (id.includes("exceljs") || id.includes("xlsx")) return "vendor-excel";
          }
        },
      },
    },
  },
});
