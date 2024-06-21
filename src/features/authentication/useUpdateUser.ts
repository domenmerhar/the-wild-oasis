import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isLoading: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: ({ user }) => {
      toast.success("Cabin edited");

      queryClient.setQueryData(["user"], user);
      //queryClient.invalidateQueries({ queryKey: "user" });
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  return { updateUser, isUpdating };
};
