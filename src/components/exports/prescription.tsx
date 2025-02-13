import { ConsultationProps } from "@/types/consultation";
import ReactDOMServer from "react-dom/server";
import formatDate from "@/lib/format-date";
import { RxLogo } from "@/assets/rx-image";
import {
  differenceInMonths,
  differenceInYears,
  isBefore,
  setYear,
} from "date-fns";

export const PrescriptionComponent: React.FC<{
  prescription: ConsultationProps;
  RxLogo: string;
  SiteLogo: string;
}> = ({ prescription, RxLogo, SiteLogo }) => {
  const patientName =
    typeof prescription.patient_id === "object"
      ? prescription.patient_id.name
      : "Sin registrar";
  const patientInsurance =
    typeof prescription.patient_id === "object"
      ? prescription.patient_id.insurance
      : "Sin registrar";
  const doctorName =
    typeof prescription.user_id === "object"
      ? prescription.user_id.name
      : "...";
  const doctorTitle =
    typeof prescription.user_id === "object" && prescription.user_id.gender
      ? prescription.user_id.gender === "male"
        ? "Dr."
        : prescription.user_id.gender === "female"
        ? "Dra."
        : "Dr/a."
      : "";
  const doctorSpeciality =
    typeof prescription.user_id === "object"
      ? prescription.user_id.speciality
      : "...";
  const doctorWorkPhone =
    typeof prescription.user_id === "object"
      ? prescription.user_id.work_phone
      : "...";
  const doctorPersonalPhone =
    typeof prescription.user_id === "object"
      ? prescription.user_id.personal_phone
      : "...";
  const doctorEmail =
    typeof prescription.user_id === "object"
      ? prescription.user_id.email
      : "...";
  const doctorWorkAddress =
    typeof prescription.user_id === "object"
      ? prescription.user_id.work_address
      : "...";

  function calculate_age(): number | undefined {
    const birthDateStr =
      typeof prescription.patient_id === "object"
        ? prescription.patient_id.date_of_birth
        : undefined;

    if (!birthDateStr) {
      return undefined;
    }

    const birthDate = new Date(birthDateStr);

    if (isNaN(birthDate.getTime())) {
      return undefined;
    }

    const today = new Date();
    const ageInYears = differenceInYears(today, birthDate);

    if (ageInYears < 1) {
      const ageInMonths = differenceInMonths(today, birthDate);
      const fractionalMonth = (today.getDate() - birthDate.getDate()) / 30;
      const ageInMonthsDecimal = ageInMonths + fractionalMonth;
      return ageInMonthsDecimal / 12;
    }

    const birthDateThisYear = setYear(birthDate, today.getFullYear());

    return isBefore(birthDateThisYear, today) ? ageInYears : ageInYears - 1;
  }

  const patient_age =
    calculate_age() !== undefined ? calculate_age() : undefined;

  return (
    <html lang="es">
      <head>
        <meta charSet="UTF-8" />
        <style>{`
          @page {
            margin: 0;
            padding: 0;
            size: A4;
            box-sizing: border-box;
          }
          
          html, body {
            margin: 0;
            padding: 0;
            font-family: 'Arial', sans-serif;
            line-height: 1.5;
            color: #2c3e50;
            font-size: 15px;
          }
          
          .prescription {
            max-width: 210mm;
            min-height: 297mm;
            margin: 0 auto;
            padding: 15mm;
            box-sizing: border-box;
            background: #fff;
            position: relative;
          }

          .letterhead {
            text-align: center;
            margin-bottom: 1.5rem;
            padding-bottom: 0.75rem;
            border-bottom: 1px solid #4CAF50;
          }

          .doctor-name {
            color: #4CAF50;
            font-size: 1.6rem;
            font-weight: 700;
            margin: 0.5rem 0;
            font-family: 'Times New Roman', serif;
          }

          .specialty {
            color: #666;
            font-size: 1rem;
            margin: 0.5rem 0;
          }

          .contact-info {
            display: flex;
            justify-content: space-between;
            font-size: 0.9rem;
            color: #666;
            margin-top: 0.75rem;
          }

           .header-logo-left {
            position: absolute;
            top: 12mm;
            left: 15mm;
            width: 65px;
            height: auto;
          }

          .header-logo-right {
            position: absolute;
            top: 13mm;
            right: 15mm;
            width: 45px;
            height: auto;
            opacity: 0.5;
          }

          .patient-info {
            margin: 1.5rem 0;
            padding: 0.75rem;
            background: #f8f9fa;
            border-radius: 6px;
          }

          .info-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 0.75rem;
            place-items: center;
          }

          .info-item {
            display: flex;
            gap: 1rem;
          }

          .info-label {
            font-weight: 600;
            color: #2c3e50;
            width: max-content;
          }

          .info-value {
            color: #34495e;
          }

          .consultation-details {
            margin: 1.5rem 0;
            margin-bottom: 3.5rem;
          }

          .section {
            margin: 1rem 0;
          }

          .section-title {
            color: #4CAF50;
            font-weight: 600;
            margin-bottom: 0.5rem;
            text-transform: uppercase;
            font-size: 1rem;
          }

          .section-content {
            padding: 0.5rem;
            background: #fff;
            border-left: 2px solid #4CAF50;
            margin-left: 0.75rem;
            white-space: pre-wrap;
          }

          .footer {
            position: absolute;
            bottom: 15mm;
            right: 0;
            left: 0;
            margin: auto;
            margin-top: auto;
            margin-bottom: 0;
            width: 185mm;
            display: flex;
            justify-content: space-between;
            padding-top: 1.5rem;
            border-top: 1px solid #e0e0e0;
          }

          .signature-box {
            text-align: center;
            min-width: 180px;
            display: flex;
            flex-direction: column;
          }

          .signature-line {
            border-top: 1px solid #2c3e50;
            margin-top: 0.4rem;
            margin-bottom: 0.4rem;
          }

          .signature-label {
            font-size: 0.8rem;
            color: #666;
          }

          @media print {
            .prescription {
              margin: 0;
              padding: 15mm;
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
        `}</style>
      </head>
      <body>
        <div className="prescription">
          {SiteLogo && (
            <img src={SiteLogo} alt="Logo" className="header-logo-left" />
          )}
          <img src={RxLogo} alt="Logo" className="header-logo-right" />

          <div className="letterhead">
            <div className="doctor-name">
              {doctorTitle} {doctorName}
            </div>
            <div className="specialty">{doctorSpeciality}</div>
            <div className="contact-info">
              {doctorWorkPhone && <span>{doctorWorkPhone}</span>}
              {doctorPersonalPhone && <span>{doctorPersonalPhone}</span>}
              {doctorEmail && <span>{doctorEmail}</span>}
            </div>
            <div
              style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
            >
              {doctorWorkAddress}
            </div>
          </div>

          <div className="patient-info">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Paciente:</span>
                <span className="info-value">{patientName}</span>
              </div>
              {patient_age && patient_age >= 1 && (
                <div className="info-item">
                  <span className="info-label">Edad:</span>
                  <span className="info-value">{`${patient_age} años`}</span>
                </div>
              )}
              {patientInsurance && (
                <div className="info-item">
                  <span className="info-label">Seguro:</span>
                  <span className="info-value">{patientInsurance}</span>
                </div>
              )}
            </div>
          </div>

          <div className="consultation-details">
            <div className="section">
              <div className="section-title">Tratamiento</div>
              <div className="section-content">{prescription.treatment}</div>
            </div>
          </div>

          <div className="footer">
            <div className="signature-box">
              <div>{formatDate(prescription.updatedAt!)}</div>
              <div className="signature-line"></div>
              <div className="signature-label">Fecha</div>
            </div>
            <div className="signature-box">
              <div>{doctorName}</div>
              <div className="signature-line"></div>
              <div className="signature-label">Firma del Médico</div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
};

export async function generatePrescriptionTemplate(
  prescription: ConsultationProps
) {
  const SiteLogo =
    typeof prescription.user_id === "object" &&
    prescription.user_id.work_logo_url
      ? await window.ipcRenderer.invoke(
          "converter-image-64",
          typeof prescription.user_id === "object" &&
            prescription.user_id.work_logo_url
        )
      : null;

  return ReactDOMServer.renderToStaticMarkup(
    <PrescriptionComponent
      prescription={prescription}
      RxLogo={RxLogo}
      SiteLogo={SiteLogo}
    />
  );
}
