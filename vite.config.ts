import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { pigment } from "@pigment-css/vite-plugin";
import { createTheme } from "@mui/material";

/**
 * @type {import('@pigment-css/vite-plugin').PigmentOptions}
 */
const pigmentConfig = {
  transformLibraries: ["@mui/material"],
  theme: createTheme({
    cssVariables: true,
    components: {
      MuiAppBar: {
        styleOverrides: {
          colorTransparent: {
            backgroundColor: "#fff",
          },
        },
      },
    },
    shadows: Array(25).fill("none"),
    palette: {
      primary: {
        main: "#457cce",
      },
    },
  }),
};

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [pigment(pigmentConfig), react()],
  css: {
    preprocessorOptions: {
      scss: {
        api: "modern-compiler",
      },
    },
  },
});
