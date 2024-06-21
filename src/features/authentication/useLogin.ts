import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const useLogin = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      loginApi({ email, password }),

    onSuccess: (user) => {
      navigate("/dashboard", { replace: true });
      queryClient.setQueryData(["user"], user);
    },

    onError: (error: Error) => {
      console.log(error.message);
      toast.error("Provided email or password are incorrect.");
    },
  });

  return { login, isLoading };
};
