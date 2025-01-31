import folder from "../assets/folder.png";
import { useFileUpload } from "../hooks/useFileUpload";

export const FileUpload: React.FC = () => {
  const { fileName, isVisible, handleFileChange, handleUpload, uploadMessage } =
    useFileUpload();

  return (
    <div className="flex w-[95%] h-[90%] border-2 border-dashed border-blue-400 border-opacity-20 rounded-xl">
      <div className="flex w-[360px] h-[380px] m-2 gap-12">
        <img className="drop-shadow-xl" src={folder} alt="xls files only" />
      </div>
      <div className="flex flex-col justify-center items-center w-[60%] h-auto border-2 border-dashed border-slate-400 rounded-xl m-2">
        <h2 className="text-4xl font-bold text-blue-500">
          Drag Or Drop Your XLSX File
        </h2>
        <hr className="w-[80%] h-4 mt-4 border-blue-700" />

        {!isVisible && (
          <label
            htmlFor="file"
            className="bg-blue-500 text-white px-6 py-3 rounded-md cursor-pointer shadow-lg hover:bg-blue-600 transition"
          >
            Choose File
          </label>
        )}

        <input
          id="file"
          type="file"
          accept=".xlsx"
          onChange={handleFileChange}
          className={`absolute opacity-0 cursor-pointer ${isVisible ? "hidden" : ""}`}
        />

        {isVisible && fileName && (
          <div className="flex flex-col items-center mt-4">
            <p className="text-lg font-semibold text-gray-700">{fileName}</p>
            <button
              onClick={handleUpload}
              className="mt-4 px-6 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600 transition"
            >
              Upload File
            </button>
          </div>
        )}

        {uploadMessage && (
          <p className="mt-4 text-lg font-medium text-gray-700">{uploadMessage}</p>
        )}
      </div>
    </div>
  );
};
