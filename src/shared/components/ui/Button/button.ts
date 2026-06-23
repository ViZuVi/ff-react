export const buttonOverrides = {
  MuiButton: {
    styleOverrides: {
      root: {
        textTransform: "none",
        fontWeight: 600,
        height: 44,
        display: "block",
      },

      containedPrimary: {
        background: "linear-gradient(135deg,#2962FF,#7C4DFF)",

        "&:hover": {
          opacity: 0.94,
        },
      },
    },
  },
};
