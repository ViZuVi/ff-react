import { setupServer } from "msw/node";
import { spaceHandlers } from "./handlers/spaces";

export const server = setupServer(
  ...spaceHandlers,
  //  ...transactionHandlers,
  // ...accountHandlers,
  // ...categoryHandlers,
);
