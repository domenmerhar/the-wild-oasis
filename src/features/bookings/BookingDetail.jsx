import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckout } from "../check-in-out/useCheckout";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { data: booking, isLoading } = useBooking();
  const { checkout } = useCheckout();

  const navigate = useNavigate();
  const moveBack = useMoveBack();

  const { deleteCabin, isDeletingCabin } = useDeleteBooking();

  if (isLoading) return <Spinner />;
  if (!booking) return <Empty resourceName={"booking"} />;

  const { id: bookingId, status } = booking;

  const statusToTagName = {
    unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  return (
    <>
      <Modal>
        <Row type="horizontal">
          <HeadingGroup>
            <Heading as="h1">Booking #{bookingId}</Heading>
            <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
          </HeadingGroup>
          <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
        </Row>

        <BookingDataBox booking={booking} />

        <ButtonGroup>
          <Button variation="secondary" onClick={moveBack}>
            Back
          </Button>

          <Modal.Open opens="delete">
            <Button variation="danger" icon={<HiTrash />}>
              Delete
            </Button>
          </Modal.Open>

          <Modal.Window name="delete">
            <span>
              <ConfirmDelete
                resourceName="booking"
                onConfirm={() =>
                  deleteCabin(bookingId, { onSettled: navigate(-1) })
                }
                disabled={isDeletingCabin}
              />
            </span>
          </Modal.Window>

          {status === "unconfirmed" && (
            <Button
              icon={<HiArrowDownOnSquare />}
              onClick={() => navigate(`/checkin/${bookingId}`)}
            >
              Check in
            </Button>
          )}

          {status === "checked-in" && (
            <Button
              icon={<HiArrowUpOnSquare />}
              onClick={() => checkout(bookingId)}
            >
              Check out
            </Button>
          )}
        </ButtonGroup>
      </Modal>
    </>
  );
}

export default BookingDetail;
