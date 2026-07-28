import { useMutation } from "@tanstack/react-query";
import { getCode } from "./api/get-code";
import { restore } from "./api/restore";

export const useCode = () => {
  return useMutation({
    mutationFn: getCode,
  });
};

export const useRestore = () => {
  return useMutation({
    mutationFn: restore,
  });
};
