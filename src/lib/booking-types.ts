import { ServiceItem } from "./services-data";

export type BookingType = "treatment" | "consultation";

export interface SelectedTreatment {
  categoryId: string;
  categoryTitle: string;
  subcategoryId: string;
  subcategoryTitle: string;
  item: ServiceItem;
  note?: string; // e.g., "Save up to 10%"
}

export interface UserDetails {
  name: string;
  phone: string;
  email: string;
}

export interface AppointmentDetails {
  date: string;
  timeSlot: "morning" | "afternoon" | "late-afternoon" | "";
}

export interface BookingState {
  bookingType: BookingType;
  treatments?: SelectedTreatment[]; // Optional for consultations
  userDetails: UserDetails;
  appointment: AppointmentDetails;
  currentStep: 1 | 2 | 3;
  isSubmitting: boolean;
  error: string | null;
}

export const initialBookingState: BookingState = {
  bookingType: "treatment",
  treatments: [],
  userDetails: {
    name: "",
    phone: "",
    email: "",
  },
  appointment: {
    date: "",
    timeSlot: "",
  },
  currentStep: 1,
  isSubmitting: false,
  error: null,
};

export const timeSlotOptions = [
  { value: "morning" as const, label: "Morning", time: "9:00 AM - 12:00 PM" },
  { value: "afternoon" as const, label: "Afternoon", time: "12:00 PM - 3:00 PM" },
  { value: "late-afternoon" as const, label: "Late Afternoon", time: "3:00 PM - 6:00 PM" },
];
