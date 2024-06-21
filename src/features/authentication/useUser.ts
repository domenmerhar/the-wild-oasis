import { useQuery } from "@tanstack/react-query";
import { getCurrentuser } from "../../services/apiAuth";

import { User as SupabaseUser } from "@supabase/supabase-js";

interface User extends SupabaseUser {
  user: {
    role: string;
  };
}

export const useUser = () => {
  const {
    data: user,
    error,
    isLoading,
  } = useQuery({
    queryFn: getCurrentuser,
    queryKey: ["user"],
    staleTime: 3600,
    cacheTime: 3600,
  });

  return {
    user,
    error,
    isLoading,
    isAuthenticated: (user as User | null)?.user?.role === "authenticated",
  };
};
