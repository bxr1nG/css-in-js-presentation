import { Theme } from "@mui/material/styles";

declare module "@mui/material-pigment-css" {
  interface ThemeArgs {
    theme: Theme;
  }
}

import type { SxProps } from "@mui/material/styles";

declare global {
  namespace React {
    interface HTMLAttributes<T> {
      sx?: SxProps<Theme>;
    }
    interface SVGProps<T> {
      sx?: SxProps<Theme>;
    }
  }
}
