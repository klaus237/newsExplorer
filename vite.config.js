import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  // Utilisez un chemin de base cohérent avec le nom de votre dépôt
  base: "/se_project_react/",
});
