import { ConsultationProps } from "@/types/consultation";
import ReactDOMServer from "react-dom/server";
import formatDate from "@/lib/format-date";

export const PrescriptionComponent: React.FC<{
  prescription: ConsultationProps;
  logo: string;
}> = ({ prescription, logo }) => {
  const patientName =
    typeof prescription.patient_id === "object"
      ? prescription.patient_id.name
      : "...";
  const dateOfBirth =
    typeof prescription.patient_id === "object" &&
    prescription.patient_id.date_of_birth
      ? formatDate(prescription.patient_id.date_of_birth)
      : "...";
  const phone =
    typeof prescription.patient_id === "object" && prescription.patient_id.phone
      ? prescription.patient_id.phone
      : "...";
  const address =
    typeof prescription.patient_id === "object" &&
    prescription.patient_id.address
      ? prescription.patient_id.address
      : "...";
  const gender =
    typeof prescription.patient_id === "object" &&
    prescription.patient_id.gender
      ? prescription.patient_id.gender === "male"
        ? "Masculino"
        : prescription.patient_id.gender === "female"
        ? "Femenino"
        : "Otro"
      : "...";
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
      : "Dr/a.";

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

          .header-logo {
            position: absolute;
            top: 15mm;
            left: 15mm;
            width: 25px;
            height: auto;
          }

          .patient-info {
            margin: 1.5rem 0;
            padding: 0.75rem;
            background: #f8f9fa;
            border-radius: 6px;
          }

          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 0.75rem;
          }

          .info-item {
            display: flex;
            gap: 0.5rem;
          }

          .info-label {
            font-weight: 600;
            color: #2c3e50;
            min-width: 80px;
          }

          .info-value {
            color: #34495e;
          }

          .consultation-details {
            margin: 1.5rem 0;
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
          }

          .footer {
            margin-top: 3rem;
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
          <img src={logo} alt="Logo" className="header-logo" />

          <div className="letterhead">
            <div className="doctor-name">
              {doctorTitle} {doctorName}
            </div>
            <div className="specialty">
              Ginecóloga-Obstetra. Colposcopista. Reproducción Humana Asistida
            </div>
            <div className="contact-info">
              <span>Tel. 809.788.2323 Ext 332</span>
              <span>Cel. 829.669.0777</span>
              <span>giannimmedina@hotmail.com</span>
            </div>
            <div
              style={{ fontSize: "0.8rem", color: "#666", marginTop: "0.5rem" }}
            >
              Calle Guayubin Olivo No. 1, Urb. Vista Hermosa, Carr. Mella Km 7
              ½, Santo Domingo Este, Rep. Dom.
            </div>
          </div>

          <div className="patient-info">
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Paciente:</span>
                <span className="info-value">{patientName}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Fecha Nac.:</span>
                <span className="info-value">{dateOfBirth}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Teléfono:</span>
                <span className="info-value">{phone}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Género:</span>
                <span className="info-value">{gender}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Dirección:</span>
                <span className="info-value">{address}</span>
              </div>
              <div className="info-item">
                <span className="info-label">Estado Civil:</span>
                <span className="info-value">
                  {typeof prescription.patient_id === "object" &&
                  prescription.patient_id.marital_status
                    ? prescription.patient_id.marital_status === "single"
                      ? `Soltero/a`
                      : prescription.patient_id.marital_status === "married"
                      ? "Casado/a"
                      : prescription.patient_id.marital_status === "divorced"
                      ? "Divorciado/a"
                      : prescription.patient_id.marital_status === "widowed"
                      ? "Viudo/a"
                      : prescription.patient_id.marital_status === "separated"
                      ? "Separado/a"
                      : prescription.patient_id.marital_status === "free_union"
                      ? "Unión libre"
                      : "Otro"
                    : "..."}
                </span>
              </div>
            </div>
          </div>

          <div className="consultation-details">
            <div className="section">
              <div className="section-title">Motivo de Consulta</div>
              <div className="section-content">{prescription.reason}</div>
            </div>

            <div className="section">
              <div className="section-title">Síntomas</div>
              <div className="section-content">{prescription.symptoms}</div>
            </div>

            <div className="section">
              <div className="section-title">Diagnóstico</div>
              <div className="section-content">{prescription.diagnosis}</div>
            </div>

            <div className="section">
              <div className="section-title">Estudios de Laboratorio</div>
              <div className="section-content">
                {prescription.laboratory_studies?.description ||
                  "No se realizaron estudios de laboratorio"}
              </div>
            </div>

            <div className="section">
              <div className="section-title">Estudios de Imágenes</div>
              <div className="section-content">
                {prescription.images_studies?.description ||
                  "No se realizaron estudios de imágenes"}
              </div>
            </div>

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
  const logo = await window.ipcRenderer.invoke("converter-image-64");
  return ReactDOMServer.renderToStaticMarkup(
    <PrescriptionComponent prescription={prescription} logo={logo} />
  );
}