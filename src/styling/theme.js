import { alpha, createTheme } from "@mui/material";
import { Colors } from "./colors";

/* ! rem sizes are based on 10px set via bootstrap for html !*/

const defaultShadow = `0px 2px 10px ${Colors.neutrals.black}29`;
const shadows = [
  "none",
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
  defaultShadow,
];

export const scrollbarStyling = {
  "*::-webkit-scrollbar": { width: 8, height: 8 },
  "*::-webkit-scrollbar-corner": {
    backgroundColor: "transparent",
  },

  "*::-webkit-scrollbar-thumb": {
    borderRadius: 8,
    backgroundColor: Colors.grey[300],
  },

  "*::-webkit-scrollbar-thumb:hover": {
    backgroundColor: Colors.grey[400],
  },

  "@supports (-moz-appearance:none)": {
    "*": {
      /*The following attributes are currently supported only by Firefox. Webkit browsers are designed by the ::-webkit-scrollbar
	    So that nothing is broken in potential future support, these values are set only for Firefox.*/
      scrollbarWidth: "thin",
      scrollbarColor: `${Colors.grey[300]} transparent`,
    },
  },
};

export const typographyOptions = {
  h1: {
    marginTop: "0.75rem",
    marginBottom: "0.625rem",
    fontSize: "2.25rem",
    lineHeight: "2.625rem",
    fontWeight: 300,
  },
  h2: {
    marginTop: "0.75rem",
    marginBottom: "0.625rem",
    fontSize: "1.75rem",
    lineHeight: "2.625rem",
    fontWeight: 400,
  },
  h3: {
    marginTop: "0.75rem",
    marginBottom: "0.625rem",
    fontSize: "1.25rem",
    lineHeight: "1.875rem",
    fontWeight: 400,
  },
  h4: {
    marginTop: "0.75rem",
    marginBottom: "0.625rem",
    fontSize: "1.125rem",
    lineHeight: "1.6875rem",
    fontWeight: 400,
  },
  h5: {
    marginTop: "0.75rem",
    marginBottom: "0.625rem",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    fontWeight: 600,
  },
  h6: {
    marginTop: "0.75rem",
    marginBottom: "0.625rem",
    fontSize: "1rem",
    lineHeight: "1.5rem",
    fontWeight: 400,
  },
  subtitle1: {
    fontSize: "1.125rem",
    lineHeight: "1.6875rem",
    fontWeight: 400,
  },
  subtitle2: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    fontWeight: 600,
  },
  body1: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    fontWeight: 400,
  },
  body2: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    fontWeight: 400,
  },
  button: {
    fontSize: "1rem",
    lineHeight: "1.5rem",
    fontWeight: 600,
    textTransform: "none",
  },
  caption: {
    fontSize: "0.875rem",
    lineHeight: "1.3125rem",
    fontWeight: 400,
  },
  overline: {
    fontSize: "0.875rem",
    lineHeight: "1.3125rem",
    fontWeight: 400,
  },
  capsTitle: {
    textTransform: "uppercase",
    fontSize: "1.125rem",
    lineHeight: "1.343rem",
    fontWeight: 400,
    letterSpacing: "0.07rem",
  },
};

//Create additional theme for palette, to have possibility to use automatically generated colors from the palette in the theme.
const themeColors = createTheme({
  palette: {
    ...Colors,
  },
});

export const theme = createTheme({
  headerVariant: "DARK",
  typography: {
    fontFamily: "Source Sans Pro, sans-serif",
    allVariants: {
      fontSize: "0.875rem",
    },
    ...typographyOptions,
    fontWeightBold: 700,
    fontWeightMedium: 600,
    fontWeightRegular: 400,
  },
  palette: {
    ...themeColors.palette,
  },
  shadows: shadows,
  spacing: (factor) => `${0.5 * factor}rem`,
  breakpoints: {
    unit: "rem",
    values: {
      xs: 0,
      sm: 24.375,
      md: 48,
      lg: 64,
      xl: 90,
      "2xl": 120,
    },
  },
  components: {
    MuiScopedCssBaseline: {
      styleOverrides: {
        root: {
          ".MuiBox-root": {
            // the info icon should be 18px by default
            ".fa-circle-info": {
              fontSize: "1.125rem",
            },
          },
          background: "transparent",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          capsTitle: "h2",
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        root: {
          zIndex: 10000, //higher than .navbar-default z-index from old app + higher than legacy aside panel
          /*Modals can occur outside the react-container and thus the MuiScopedCssBaseline.
							Therefore, they need their own global definitions*/
        },
      },
    },
    MuiDialogContent: {
      styleOverrides: {
        root: {
          background: Colors.background.paper,
        },
      },
    },
    MuiPopover: {
      styleOverrides: {
        root: {
          zIndex: 10100,
        },
      },
    },
    MuiToggleButton: {
      styleOverrides: {
        root: {
          "&.Mui-disabled": {
            border: 0,
            background: themeColors.palette.grey[100],
            color: themeColors.palette.grey[400],
          },
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => {
          switch (ownerState.variant) {
            case "contained":
              return {
                textTransform: "none",
                "&.Mui-disabled": {
                  background: themeColors.palette.grey[100],
                  color: themeColors.palette.grey[400],
                },
              };

            default:
              return { textTransform: "none" };
          }
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: {
          /**
           * IconButton has a ripple effect, to align it with other elements we need to simulate removal of paddings.
           * We added negative margins, which will preserve the ripple effect and at the same time align the element with others on the page.
           */
          margin: "-8px",
          variants: [
            {
              props: {
                color: "default",
              },
              style: {
                color: themeColors.palette.text.primary,
              },
            },
            {
              props: { color: "primaryDark" },
              style: {
                color: themeColors.palette.primary.dark,
              },
            },
          ],
        },
        sizeSmall: {
          fontSize: "0.875rem",
        },
        sizeMedium: {
          fontSize: "1rem",
        },
        sizeLarge: {
          fontSize: "1.5rem",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        fontFamily: "Source Sans Pro, sans-serif",
      },
      styleOverrides: {
        root: {
          textDecorationColor: "unset",
          ":hover, &.Mui-focusVisible": {
            color: themeColors.palette.primary.dark,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 0,
        },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: {
          color: themeColors.palette.text.primary,
          fontSize: "1rem",
          fontWeight: 600,
          minHeight: 0,
          padding: "8px 16px",
          alignItems: "flex-start",
          ":hover": {
            color: themeColors.palette.primary.main,
          },
          "&.Mui-selected": {
            color: themeColors.palette.primary.dark,
          },
          "&.Mui-disabled": {
            color: themeColors.palette.secondary.light,
          },
        },
      },
    },
    MuiTooltip: {
      defaultProps: {
        enterDelay: 1000,
      },
      styleOverrides: {
        tooltip: {
          color: themeColors.palette.text.primary,
          backgroundColor: themeColors.palette.background.paper,
          boxShadow: shadows[1],
          ...typographyOptions.body1,
        },
        tooltipPlacementTop: {
          marginBottom: "8px !important",
        },
        tooltipPlacementBottom: {
          marginTop: "8px !important",
        },
        tooltipPlacementLeft: {
          marginRight: "8px !important",
        },
        tooltipPlacementRight: {
          marginLeft: "8px !important",
        },
        popper: {
          zIndex: 10200, //greater than MuiPopover
        },
      },
    },
    MuiBadge: {
      styleOverrides: {
        root: {
          alignItems: "center",
          "& .MuiBadge-badge": {
            transform: "none",
            border: "none",
            position: "static",
            marginLeft: "4px",
            ...typographyOptions.body1,
          },
        },
      },
      variants: [
        {
          props: { color: "infoDark" },
          style: {
            "& .MuiBadge-badge": {
              backgroundColor: themeColors.palette.info.dark,
              color: themeColors.palette.neutrals.white,
            },
          },
        },
      ],
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          margin: "2px 0 0",
          ...typographyOptions.body1,
          "&.Mui-focused": {
            color: themeColors.palette.primary.dark,
            "&.Mui-error": {
              color: themeColors.palette.error.main,
            },
          },
        },
      },
    },
    MuiFormControl: {
      styleOverrides: {
        root: {
          ".MuiSelect-icon": {
            fontSize: "1.5rem",
            color: themeColors.palette.grey[700],
          },
          ".MuiOutlinedInput-root:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused)":
            {
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: themeColors.palette.secondary.main,
              },
            },
          ".MuiPickersOutlinedInput-root:not(.Mui-disabled):not(.Mui-error):not(.Mui-focused)":
            {
              ".MuiPickersOutlinedInput-notchedOutline": {
                borderColor: themeColors.palette.secondary.main,
              },
            },
          ".MuiOutlinedInput-root": {
            ".MuiAutocomplete-endAdornment": {
              display: "flex",
              gap: "0.5rem",
            },
          },
          ".MuiPickersOutlinedInput-root": {
            ".MuiAutocomplete-endAdornment": {
              display: "flex",
              gap: "0.5rem",
            },
            "&.Mui-disabled *": {
              color: themeColors.palette.secondary.light,
            },
          },
          ":hover": {
            ".MuiInputLabel-root:not(.Mui-disabled):not(.Mui-error)": {
              color: themeColors.palette.primary.dark,
            },
            ".MuiOutlinedInput-root:not(.Mui-disabled):not(.Mui-error)": {
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: themeColors.palette.primary.main,
              },
            },
            ".MuiPickersOutlinedInput-root:not(.Mui-disabled):not(.Mui-error)":
              {
                ".MuiPickersOutlinedInput-notchedOutline": {
                  borderColor: themeColors.palette.primary.main,
                },
              },
            ".MuiFormHelperText-root:not(.Mui-disabled):not(.Mui-error)": {
              color: themeColors.palette.primary.dark,
            },
            ".MuiFormLabel-root.Mui-error": {
              color: themeColors.palette.error.dark,
            },
            ".MuiOutlinedInput-root.Mui-error": {
              ".MuiOutlinedInput-notchedOutline": {
                borderColor: themeColors.palette.error.dark,
              },
            },
            ".MuiPickersOutlinedInput-root.Mui-error": {
              ".MuiPickersOutlinedInput-notchedOutline": {
                borderColor: themeColors.palette.error.dark,
              },
            },
          },
          "&.Mui-disabled": {
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: themeColors.palette.grey[300],
            },
            ".MuiPickersOutlinedInput-notchedOutline": {
              borderColor: themeColors.palette.grey[300],
            },
            ".MuiSelect-icon": {
              borderColor: themeColors.palette.grey[300],
            },
          },
          "&.Mui-focused&.Mui-error": {
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: themeColors.palette.error.dark,
            },
            ".MuiPickersOutlinedInput-notchedOutline": {
              borderColor: themeColors.palette.error.dark,
            },
          },
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: themeColors.palette.grey[600],
          "&.Mui-focused": {
            color: themeColors.palette.primary.dark,
            "&.Mui-error": {
              color: themeColors.palette.error.dark,
            },
          },
          "&.Mui-disabled": {
            color: themeColors.palette.secondary.main,
          },
        },
      },
    },
    MuiFormControlLabel: {
      styleOverrides: {
        // needed to override legacy styling selectors
        root: {
          marginBottom: 0,
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          paddingTop: "8px",
          paddingBottom: "8px",
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          minWidth: "0px !important",
          marginRight: 8,
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {
          /**
           * Checkbox has a ripple effect, to align it with other elements we need to simulate removal of paddings.
           * We added negative margins, which will preserve the ripple effect and at the same time align the element with others on the page.
           */
          margin: "-11px",
          ".MuiSvgIcon-root": { fontSize: "1.325rem" },
          "input[type=checkbox]": {
            // needed to override legacy styling selectors
            margin: 0,
          },
          "&.Mui-disabled": {
            color: themeColors.palette.secondary.light,
          },
        },
      },
    },
    MuiUseMediaQuery: {
      defaultProps: {
        noSsr: true,
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          display: "flex",
          alignItems: "flex-start",
          color: themeColors.palette.neutrals.white,
          backgroundColor: themeColors.palette.secondary.dark,
          borderLeft: "8px",
          borderLeftStyle: "solid",
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          ".MuiSvgIcon-root": { fontSize: "1.25rem" },
          ".MuiIconButton-root": { padding: "4px" },
        },
        popper: {
          ...{
            zIndex: 10000, //greater than modal's z-index
            ".MuiAutocomplete-noOptions": { ...typographyOptions.body1 },
            ".MuiAutocomplete-loading": { ...typographyOptions.body1 },
          },
        },
        // removing this settings sets MUI default behavior for option hover and focus. PDM might want to use different coloring instead of default upon finishing PDM Approval ticket. Let this stay commented until than.
        /*    option: {
							"&.Mui-focused": {
								backgroundColor: `${themeColors.palette.green[50]} !important`,
							},
							"&[aria-selected=true]": {
								backgroundColor: `${themeColors.palette.green[100]} !important`,
							},
						}, */
        endAdornment: {
          pointerEvents: "all",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        head: {
          fontWeight: 600,
        },
        root: {
          borderColor: themeColors.palette.grey[300],
          paddingTop: 8,
          paddingBottom: 8,
          "&:not:first-of-type": {
            paddingLeft: 4,
          },
          "&:not:last-child": {
            paddingRight: 4,
          },
        },
      },
    },
    MuiRadio: {
      styleOverrides: {
        root: {
          /**
           * RadioGroup has a ripple effect, to align it with other elements we need to simulate removal of paddings.
           * We added negative margins, which will preserve the ripple effect and at the same time align the element with others on the page.
           */
          margin: "-10px",
          color: themeColors.palette.secondary.main,
          ".MuiSvgIcon-root": { fontSize: "1.1875rem" },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          textarea: {
            cursor: "auto",
            paddingTop: "2px",
            paddingRight: "6px",
          },
          label: typographyOptions.body1,
        },
      },
    },
    MuiSkeleton: {
      styleOverrides: {
        root: {
          backgroundColor: "rgba(0, 0, 0, 0.11)",
        },
      },
    },
    MuiStepper: {
      styleOverrides: {
        horizontal: {
          alignItems: "baseline",
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        labelContainer: {
          color: `${themeColors.palette.secondary.dark} !important`,
        },
        horizontal: {
          flexDirection: "column",
          textAlign: "center",
        },
      },
    },
    MuiStepConnector: {
      styleOverrides: {
        horizontal: {
          top: 8,
        },
      },
    },
    MuiListSubheader: {
      styleOverrides: {
        root: {
          fontSize: "0.875rem",
          lineHeight: "2.25rem",
          fontWeight: 600,
          color: themeColors.palette.grey[700],
        },
      },
    },
    MuiStack: {
      defaultProps: {
        useFlexGap: true,
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: "40px",
          height: "20px",
          padding: "3px 3px",
          position: "static",
          ".MuiButtonBase-root": {
            padding: 0,
            "&:hover .MuiTouchRipple-root": {
              backgroundColor: alpha(themeColors.palette.neutrals.black, 0.04),
            },
            "&.Mui-checked:hover .MuiTouchRipple-root": {
              backgroundColor: alpha(themeColors.palette.primary.main, 0.04),
            },
          },
          ".MuiTouchRipple-root": {
            width: "40px",
            height: "40px",
            top: "-50%",
            left: "-50%",
          },
          ".PrivateSwitchBase-input": {
            margin: 0,
          },
          "> .MuiSwitch-switchBase": {
            color: themeColors.palette.secondary.main,
          },
          "> .MuiSwitch-switchBase.Mui-disabled+.MuiSwitch-track": {
            opacity: 0.3,
          },
          ".MuiSwitch-track": {
            backgroundColor: alpha(themeColors.palette.secondary.main, 0.75),
          },
        },
      },
    },
  },
  zIndex: {
    modal: 10003,
    snackbar: 10004,
    tooltip: 10010,
  },
});
export default theme;
