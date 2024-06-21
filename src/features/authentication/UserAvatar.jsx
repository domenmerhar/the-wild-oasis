import styled from "styled-components";
import { useUser } from "./useUser";
import SpinnerMini from "../../ui/SpinnerMini";

const StyledUserAvatar = styled.div`
  display: flex;
  gap: 1.2rem;
  align-items: center;
  font-weight: 500;
  font-size: 1.4rem;
  color: var(--color-grey-600);
`;

const Avatar = styled.img`
  display: block;
  width: 4rem;
  width: 3.6rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
  outline: 2px solid var(--color-grey-100);
`;

export const UserAvatar = () => {
  const { user, isLoading } = useUser();

  if (isLoading) return <SpinnerMini />;

  const avatar = user?.user?.user_metadata?.avatar;
  const fullName = "User";

  return (
    <StyledUserAvatar>
      <Avatar src={avatar || "default-user.jpg"} alt={fullName} />
      <span>{fullName}</span>
    </StyledUserAvatar>
  );
};
