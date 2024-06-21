import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getBooking } from "../../services/apiBookings";

export const useBooking = () => {
  const { bookingId } = useParams<{ bookingId: string }>();

  if (!bookingId)
    throw new Error("useBooking can't be used without a bookingId");

  const { data, error, isLoading } = useQuery({
    queryKey: ["booking", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return { data, error, isLoading };
};
