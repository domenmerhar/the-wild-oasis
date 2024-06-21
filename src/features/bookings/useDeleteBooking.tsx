import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useDeleteBooking = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteCabin, isLoading: isDeletingCabin } = useMutation({
    mutationFn: (id) => deleteBooking(id),

    onSuccess: () => {
      toast.success("Booking deleted successfully");
      queryClient.invalidateQueries();
    },

    onError: () => {
      toast.error("Error deleting booking");
    },
  });

  return { deleteCabin, isDeletingCabin };
};
