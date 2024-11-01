import axios from "axios";

export default async function uploadImage(image: File) {
  const formData = new FormData();
  formData.append("file", image);
  formData.append(
    "upload_preset",
    process.env.VITE_CLOUDINARY_UPLOAD_PRESET || ""
  ); // Define el preset en Cloudinary

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.VITE_CLOUDINARY_NAME}/upload`,
      formData
    );
    return response.data.secure_url;
  } catch (error) {
    throw error;
  }
}
