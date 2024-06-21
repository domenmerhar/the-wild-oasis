import {
  HiOutlineBanknotes,
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineChartBar,
} from "react-icons/hi2";
import Stat from "./Stat";
import { formatCurrency } from "../../utils/helpers";

type Booking = [];
type ConfirmedStay = [];

export const Stats = ({
  bookings,
  confirmedStays,
  numDays,
  cabinCount,
}: {
  bookings: Booking;
  confirmedStays: ConfirmedStay;
  numDays: number;
  cabinCount: number;
}) => {
  // 1.
  const numBookings = bookings.length;

  // 2.
  const sales = bookings.reduce(
    (acc: number, booking: { totalPrice: number }) =>
      (acc += booking.totalPrice),
    0
  );

  // 3.
  const checkIns = confirmedStays.length;

  // 4.
  const occupation =
    (confirmedStays.reduce(
      (acc: number, cur: { numNights: number }) => (acc += cur.numNights),
      0
    ) /
      (numDays * cabinCount)) *
    100;

  return (
    <>
      <Stat
        title="Bookings"
        color="blue"
        icon={<HiOutlineBriefcase />}
        value={numBookings}
      />

      <Stat
        title="Sales"
        color="blue"
        icon={<HiOutlineBanknotes />}
        value={formatCurrency(sales)}
      />

      <Stat
        title="Check ins"
        color="blue"
        icon={<HiOutlineCalendarDays />}
        value={checkIns}
      />

      <Stat
        title="Occupancy rates"
        color="yellow"
        icon={<HiOutlineChartBar />}
        value={occupation.toFixed(2) + "%"}
      />
    </>
  );
};
