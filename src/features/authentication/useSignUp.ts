import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "../../services/apiAuth";
import toast from "react-hot-toast";

interface User {
  fullname: string;
}

export const useSignUp = () => {
  const { mutate: signup, isLoading } = useMutation([
    {
      mutationFn: signupApi,

      onSuccess: (user: { user: User | null }) => {
        toast.success(
          `Welcome ${user.user?.fullname}\n Please verify your the new account from your email address.`
        );
      },
    },
  ]);

  return { signup, isLoading };
};
