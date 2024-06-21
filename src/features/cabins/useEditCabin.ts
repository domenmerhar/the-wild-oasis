import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { createEditCabin } from "../../services/apiCabins";

export const useEditCabin = () => {
  const queryClient = useQueryClient();

  const { mutate: editCabin, isLoading: isEditing } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    mutationFn: ({ newCabinData, id }: { newCabinData: any; id: any }) => {
      return createEditCabin(newCabinData, id);
    },
    onSuccess: () => {
      toast.success("Cabin edited");
      queryClient.invalidateQueries(["cabin"]);
    },
    onError: (error: { message: string }) => {
      toast.error(error.message);
    },
  });

  return { editCabin, isEditing };
};
