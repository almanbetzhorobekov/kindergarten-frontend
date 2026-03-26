/** Do not use these colors directly in your code!
 * These colors are included into the {@link theme} and should be referenced from there for normal use cases. */
const green = {
  50: "#E6F9E9",
  100: "#B5E8C4",
  200: "#82D4A5",
  300: "#47C78F",
  400: "#009964",
  500: "#008A54",
  600: "#167241",
  700: "#005C30",
  800: "#004D24",
  900: "#003315",
};

/** Do not use these colors directly in your code!
 * These colors are included into the {@link theme} and should be referenced from there for normal use cases. */
const grey = {
  50: "#F0F1F2",
  100: "#E4E5E6",
  200: "#C8CBCC",
  300: "#AFB2B3",
  400: "#909799",
  500: "#787E80",
  600: "#5C6366",
  700: "#454B4D",
  800: "#2E3233",
  900: "#17191A",
};

/** Do not use these colors directly in your code!
 * These colors are included into the {@link theme} and should be referenced from there for normal use cases. */
const neutrals = {
  white: "#ffffff",
  black: "#000000",
};

/** Do not use these colors directly in your code!
 * These colors are included into the {@link theme} and should be referenced from there for normal use cases. */
export const Colors = {
  green,
  grey,
  neutrals,

  primary: {
    main: green[600],
    dark: green[700],
    light: green[400],
  },
  secondary: {
    main: grey[500],
    dark: grey[700],
    light: grey[300],
  },
  error: {
    main: "#d4403a",
    dark: "#aa332e",
    light: "#dc6661",
    shade50: "#fbeceb",
  },
  warning: {
    main: "#f0ad4e",
    dark: "#a5660d",
    light: "#f3bd71",
    shade50: "#fef7ed",
  },
  info: {
    main: "#24a5e5",
    dark: "#1374a4",
    light: "#a4d9f4",
    shade50: "#e9f6fc",
  },
  success: {
    main: "#5cb85c",
    dark: "#408040",
    light: "#7cc67c",
    shade50: "#eff8ef",
  },
  text: {
    primary: grey[800],
    secondary: grey[500],
    disabled: grey[300],
    hint: grey[800],
    paper: neutrals.white,
  },
  neutral: {
    main: grey[700],
    dark: grey[600],
    contrastText: "#fff",
  },
  background: {
    default: grey[50],
    paper: neutrals.white,
    opacity10: "#0001",
    primary50: green[50],
  },
  diagram: {
    categorical: {
      c1: "#69a9c2",
      c2: "#4d72a3",
      c3: "#ffcc6d",
      c4: "#d67a4f",
      c5: "#99d6c1",
      c6: "#b7c791",
      c7: "#826bc7",
      c8: "#7a453b",
      c9: "#bfbfb4",
    },
    diverging: {
      d1: "#99d998",
      d2: "#b7e1b5",
      d3: "#d4e9d3",
      d4: "#f1f1f1",
      d5: "#e9c0bc",
      d6: "#dc8f8a",
      d7: "#c95e5b",
    },
    trafficLight: {
      green: "#99d998",
      yellow: "#ffcc6d",
      red: "#c95e5b",
    },
  },
  neutralWhite: {
    main: neutrals.white,
    dark: neutrals.white,
    contrastText: grey[800],
  },
};
