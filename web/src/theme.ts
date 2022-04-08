import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const activeLabelStyles = {
  transform: "scale(0.85) translateY(-24px) translateX(-10px)",
};

const theme = extendTheme({
  colors: {
    palette: {
      bg: "#fff",
      100: "#E4EFE7",
      200: "#FAF1E6",
      300: "#E4EFE7",
      400: "#064420",
    },
  },
  fonts: {
    haeading: "Basement Grotesque Black",
    body: "Inter",
  },
  styles: {
    global: {
      body: {
        bg: "palette.bg",
      },
      ".chakra-heading": {
        color: "palette.400",
        lineHeight: "0.85em !important",
        letterSpacing: "-0.18rem",
      },
      ".chakra-text": {
        color: "palette.400",
        lineHeight: "0.85em !important",
        letterSpacing: "tighter",
      },
    },
  },
  fontSizes: {
    "10xl": "9rem",
    "11xl": "10rem",
    "12xl": "11rem",
  },
  breakpoints,
  components: {
    Heading: {
      baseStyle: {
        textTransform: "uppercase",
      },
      variants: {
        outline: {
          color: "palette.bg",
          textShadow:
            "-1px 0 0 #064420, 0 1px 0 #064420, 1px 0 0 #064420, 0 -1px 0 #064420",
        },
      },
    },
    Input: {
      baseStyle: {
        field: {
          rounded: "full",
        },
      },
    },
    Button: {
      baseStyle: {
        rounded: "full",
        borderWidth: 1,
        transition: "all 0.2s",
      },
      variants: {
        primary: {
          color: "palette.bg",
          bg: "palette.400",
          fontFamily: "Basement Grotesque Black",
          borderColor: "palette.400",
          _hover: {
            bg: "transparent",
            color: "palette.400",
          },
        },
        error: {
          bg: "red.400",
          color: "white",
          _hover: {
            bg: "red.500",
          },
        },

        secondary: {
          color: "palette.400",
          borderColor: "palette.300",
          _hover: {
            borderColor: "palette.400",
          },
        },
      },
    },
    Divider: {
      baseStyle: {
        borderColor: "palette.400",
      },
    },
    Modal: {
      baseStyle: {
        dialog: {
          bg: "palette.bg",
        },
        header: {
          color: "palette.400",
          fontFamily: "Basement Grotesque Black",
        },
      },
    },
    Tag: {
      variants: {
        available: {
          container: {
            bg: "palette.400",
            color: "palette.bg",
          },
        },
        not_available: {
          container: {
            bg: "red.500",
            color: "palette.bg",
          },
        },
      },
    },
    Form: {
      variants: {
        floating: {
          container: {
            _focusWithin: {
              label: {
                ...activeLabelStyles,
              },
            },
            "input:not(:placeholder-shown) + label, .chakra-select__wrapper + label":
              {
                ...activeLabelStyles,
              },
            label: {
              top: 0,
              left: 0,
              zIndex: 2,
              position: "absolute",
              backgroundColor: "white",
              pointerEvents: "none",
              mx: 3,
              px: 1,
              my: 2,
            },
            input: {
              rounded: "full",
            },
          },
        },
      },
    },
  },
});

export default theme;
