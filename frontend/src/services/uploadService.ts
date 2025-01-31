export const uploadFile = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    console.log('FormData before sending:', formData);
  
    try {
      const response = await fetch("http://localhost:3000/api/files/upload", {
        method: "POST",
        body: formData,
      });
  
      let result;
      try {
        result = await response.json(); // Try to parse JSON response
      } catch (jsonError) {
        console.error("Failed to parse JSON response:", jsonError);
        result = {}; // Set default empty object
      }
  
      if (response.ok) {
        return "✅ File uploaded successfully!";
      } else {
        const errorMessages = result.errors
          ? result.errors.map((err: { error: string }) => err.error).join(", ")
          : "Unknown error";
        return `❌ Upload failed: ${errorMessages}`;
      }
    } catch (error) {
      console.error("Network error during file upload is:", error);
      return "❌ Error uploading file. Please check your internet connection.";
    }
  };
  