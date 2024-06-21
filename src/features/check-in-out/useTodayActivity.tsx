import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export const useTodayActivity = () => {
  const {
    data: activities,
    isLoading,
    error,
  } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  if (error) throw new Error((error as Error)!.message);

  return { activities, isLoading };
};
