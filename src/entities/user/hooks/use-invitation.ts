import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getInvitation } from "../api/get-invitations";
import { sendInvitation } from "../api/send-invitation";

const useInvalidateInvitationQueries = () => {
  const queryClient = useQueryClient();
  queryClient.invalidateQueries({
    queryKey: ["invitations"],
  });
};

export const useGetInvitation = () => {
  return useQuery({
    queryKey: ["invitations"],
    queryFn: getInvitation,
  });
};

export const useSendInvitation = () => {
  return useMutation({
    mutationFn: sendInvitation,
    onSuccess: useInvalidateInvitationQueries,
  });
};

// export const useCreateCategory = () => {
//   const invalidate = useInvalidateAccountQueries();

//   return useMutation({
//     mutationFn: createCategory,
//     onSuccess: invalidate,
//   });
// };
