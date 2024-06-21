import { useEffect, useState } from "react";

import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Form from "../../ui/Form";
import Input from "../../ui/Input";

import { useUser } from "./useUser";
import { FormRow } from "../../ui/FormRow";
import { useUpdateUser } from "./useUpdateUser";
import Spinner from "../../ui/Spinner";
import { useNavigate } from "react-router-dom";

function UpdateUserDataForm() {
  // We don't need the loading state, and can immediately use the user data, because we know that it has already been loaded at this point
  const { user, isLoading } = useUser();

  const navigate = useNavigate();

  const { isUpdating, updateUser } = useUpdateUser();

  const [fullName, setFullName] = useState("");
  const [avatar, setAvatar] = useState(null);

  if (isLoading) return <Spinner />;

  const {
    user: {
      email,
      user_metadata: { fullName: currentFullName },
    },
  } = user;

  function handleSubmit(e) {
    e.preventDefault();

    if (!fullName) return;

    updateUser(
      { fullName, avatar },
      {
        onSuccess: () => {
          setAvatar(null);
          e.target.reset();
        },
      }
    );
    navigate("/dashboard");
  }

  function handleCancel() {
    setFullName(currentFullName);
    setAvatar(null);
  }

  return (
    <Form onSubmit={handleSubmit}>
      <FormRow label="Email address">
        <Input value={email} disabled />
      </FormRow>
      <FormRow label="Full name">
        <Input
          type="text"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          id="fullName"
          disabled={isUpdating}
          defaultValue={currentFullName}
        />
      </FormRow>
      <FormRow label="Avatar image">
        <FileInput
          id="avatar"
          accept="image/*"
          onChange={(e) => setAvatar(e.target.files[0])}
          disabled={isUpdating}
        />
      </FormRow>
      <FormRow>
        <Button
          type="reset"
          variation="secondary"
          disabled={isUpdating}
          onClick={handleCancel}
        >
          Cancel
        </Button>
        <Button disabled={isUpdating}>Update account</Button>
      </FormRow>
    </Form>
  );
}

export default UpdateUserDataForm;