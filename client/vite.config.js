import { defineConfig } from "vite"
import react from "@vitejs/plugin-react-swc"

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            "/api": {
                target: "http://localhost:3000", // Your backend URL
                changeOrigin: true,
                secure: false, // Set to true if your backend uses HTTPS
                rewrite: (path) => path.replace(/^\/api/, "/api"), // Keeps /api in the request
            },
        },
    },
})
