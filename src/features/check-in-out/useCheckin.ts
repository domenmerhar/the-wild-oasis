import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useCheckin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: checkIn, isLoading: isCheckingIn } = useMutation({
    mutationKey: ["checkin"],
    mutationFn: ({ bookingId, breakfast = {} }: { bookingId: string, breakfast?: Record<string, unknown> }) => {
      return {
        bookingId,
        ...updateBooking(bookingId, {
          status: "checked-in",
          isPaid: true,
          ...breakfast,
        }),
      };
    },

    onSuccess: (data) => {
      toast.success(`Booking #${data.id} successfully checked in!`);
      queryClient.invalidateQueries();
      navigate("/dashboard");
    },

    onError: () => {
      toast.error("Failed to check in booking");
    },
  });

  return { checkIn, isCheckingIn };
};
