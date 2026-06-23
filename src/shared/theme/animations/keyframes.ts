import { keyframes } from "@mui/system";

export const gradientShift = keyframes`
  0% {
    background-position:0% 50%;
  }

  50% {
    background-position:100% 50%;
  }

  100% {
    background-position:0% 50%;
  }
`;

export const pulseGlow = keyframes`
  0% {
      box-shadow:
      0 0 0 rgba(41,98,255,.2);
  }

  50% {
      box-shadow:
      0 0 32px rgba(41,98,255,.45);
  }

  100% {
      box-shadow:
      0 0 0 rgba(41,98,255,.2);
  }
`;
