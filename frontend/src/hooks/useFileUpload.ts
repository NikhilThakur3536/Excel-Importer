import { useState } from "react";
import { uploadFile } from "../services/uploadService";

export const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [uploadMessage, setUploadMessage] = useState<string | null>(null);
  const [isUploaded, setIsUploaded] = useState<boolean>(false); // Track successful upload

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setIsVisible(true);
      setIsUploaded(false); // Reset upload state when a new file is selected
    } else {
      setIsVisible(false);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      console.log("No file uploaded");
      setUploadMessage("❌ Please select a file first.");
      return;
    }

    if (!file.name.endsWith(".xlsx")) {
      setUploadMessage("❌ Only .xlsx files are allowed.");
      return;
    }

    try {
      const message = await uploadFile(file);
      setUploadMessage(message);

      if (message.includes("✅")) {
        setIsUploaded(true); // Mark as uploaded when successful
      }
    } catch (error) {
      setUploadMessage("❌ Error uploading file.");
    }
  };

  return { fileName, isVisible, handleFileChange, handleUpload, uploadMessage, isUploaded };
};
