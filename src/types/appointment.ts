import { PatientProps } from "./patient";

export type AppointmentProps = {
  _id?: string;
  date_time: Date;
  patient_id: PatientProps;
  reason?: string;
  status?: "waiting" | "confirmed" | "completed" | "canceled";
  user_id?: string;
  createdAt?: Date;
  updatedAt?: Date;
};
