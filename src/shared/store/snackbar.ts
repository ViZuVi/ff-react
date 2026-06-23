import { create } from "zustand";

type SnackbarMode = "auto" | "confirm";

type SnackbarState = {
  open: boolean;
  message: string;
  loading: boolean;
  type: "success" | "error" | "info" | "warning";
  mode: SnackbarMode;

  confirmAction?: () => void;
  cancelAction?: () => void;

  showSnackbar: (params: {
    message: string;
    loading?: boolean;
    type?: SnackbarState["type"];
    mode?: SnackbarMode;
    confirmAction?: () => void;
    cancelAction?: () => void;
  }) => void;

  hideSnackbar: () => void;
  confirm: () => void;
  cancel: () => void;
};

export const useSnackbarStore = create<SnackbarState>((set, get) => ({
  open: false,
  loading: false,
  message: "",
  type: "info",
  mode: "auto",

  confirmAction: undefined,
  cancelAction: undefined,

  showSnackbar: (params) => {
    set({
      open: true,
      message: params.message,
      type: params.type ?? "info",
      mode: params.mode ?? "auto",
      confirmAction: params.confirmAction,
      cancelAction: params.cancelAction,
    });
  },

  hideSnackbar: () => set({ open: false, loading: false }),

  confirm: () => {
    const action = get().confirmAction;
    set({ loading: true });
    if (action) action();
  },

  cancel: () => {
    const action = get().cancelAction;
    if (action) action();
    set({ open: false });
  },
}));
