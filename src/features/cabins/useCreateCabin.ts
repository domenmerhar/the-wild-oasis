import { createEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: createCabin, isLoading: isCreating } = useMutation([
    {
      mutationFn: createEditCabin,
      onSuccess: () => {
        toast.success("Cabin created");
        queryClient.invalidateQueries(["cabin"]);
      },
      onError: (error: { message: string }) => {
        toast.error(error.message);
      },
    },
  ]);

  return { createCabin, isCreating };
};
