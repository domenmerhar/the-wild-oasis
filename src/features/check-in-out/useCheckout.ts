import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

export const useCheckout = () => {
  const queryClient = useQueryClient();

  const { mutate: checkout, isLoading: isCheckingOut } = useMutation({
    mutationKey: ["checkout"],
    mutationFn: (bookingId) =>
      updateBooking(bookingId, {
        status: "checked-out",
      }),

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked out!`);
      queryClient.invalidateQueries();
    },

    onError: () => {
      toast.error("Failed to check out booking");
    },
  });

  return { checkout, isCheckingOut };
};
