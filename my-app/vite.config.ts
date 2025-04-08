import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::", // This allows the server to be accessible on all interfaces
    port: 8080, // Define the port for the development server
    proxy: {
      // Proxy API requests to the backend server to handle CORS issues
      "/api": {
        target: "http://127.0.0.1:5000", // Your backend server URL
        changeOrigin: true,  // Adjusts the Origin header to match the target
        rewrite: (path) => path.replace(/^\/api/, ''), // Optional: Removes '/api' prefix
      },
    },
  },
  plugins: [
    react(),
    mode === 'development' && componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Alias '@' to the 'src' folder
    },
  },
}));