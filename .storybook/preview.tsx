import type { Preview } from "@storybook/react-vite";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import theme from "../src/styling/theme";

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },

  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;
