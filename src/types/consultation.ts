import { AppointmentProps } from "./appointment";
import { PatientProps } from "./patient";
import { UserProps } from "./user";

export type ConsultationProps = {
  _id?: string;
  reason: string;
  symptoms: string;
  diagnosis: string;
  laboratory_studies?: {
    description?: string;
    images?: string[];
  };
  images_studies?: {
    description?: string;
    images?: string[];
  };
  treatment: string;
  obstetric_information?: {
    blood_pressure?: number;
    weight?: number;
    fundal_height?: number;
    fcf_mfa?: number;
    edema?: boolean;
    varices?: boolean;
  };
  gynecological_information?: {
    last_menstrual_period?: Date;
    estimated_due_date?: Date;
    gestational_age?: number;
  };
  notes?: string;
  type?: string;
  patient_id: PatientProps | string;
  user_id?: UserProps | string;
  appointment_id?: AppointmentProps | string;
  createdAt?: Date;
  updatedAt?: Date;
};
