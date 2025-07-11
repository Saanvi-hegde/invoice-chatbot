import { useState } from "react";
import axios from "axios";
import {
  AiOutlineFilePdf,
  AiOutlineFileImage,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { FaTimes, FaCheckCircle } from "react-icons/fa";

function FileUpload({ onTextExtracted }) {
  const [file, setFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [status, setStatus] = useState("idle"); // idle | uploading | success | error
  const [errorMessage, setErrorMessage] = useState("");
  const [isDragging, setIsDragging] = useState(false);

  const allowedTypes = ["application/pdf", "image/png", "image/jpeg"];
  const maxSizeMB = 5;

  const handleFileSelect = (selected) => {
    if (!selected) return;

    if (!allowedTypes.includes(selected.type)) {
      setErrorMessage("❌ Unsupported file. Upload PNG, JPG, or PDF only.");
      setStatus("error");
      return;
    }

    if (selected.size / 1024 / 1024 > maxSizeMB) {
      setErrorMessage("❌ File too large. Max allowed size: 5MB.");
      setStatus("error");
      return;
    }

    setErrorMessage("");
    setStatus("idle");
    setFile(selected);

    if (selected.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => setPreviewURL(e.target.result);
      reader.readAsDataURL(selected);
    } else {
      setPreviewURL("");
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    handleFileSelect(e.dataTransfer.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    setStatus("uploading");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/extract-text", formData);
      onTextExtracted(res.data.text);
      setStatus("success");
    } catch (err) {
      console.error(err);
      setStatus("error");
      setErrorMessage("❌ Upload failed. Please check backend server.");
    }
  };

  const reset = () => {
    setFile(null);
    setPreviewURL("");
    setStatus("idle");
    setErrorMessage("");
  };

  return (
    <div
      role="region"
      aria-label="Upload invoice"
      className={`relative border-2 border-dashed rounded-lg transition-all p-6
        ${isDragging ? "border-blue-500 bg-blue-50 scale-[1.02]" : "border-gray-300"}`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => setIsDragging(false)}
      onDrop={handleDrop}
    >
      <input
        type="file"
        accept=".pdf, .png, .jpg, .jpeg"
        id="fileUpload"
        onChange={(e) => handleFileSelect(e.target.files[0])}
        className="hidden"
      />

      {!file ? (
        <div
          onClick={() => document.getElementById("fileUpload").click()}
          className="text-center cursor-pointer select-none"
        >
          <p className="text-gray-600 text-lg font-medium">
            Click or drag an invoice here
          </p>
          <p className="text-gray-400 text-sm mt-1">
            Supported formats: PDF, PNG, JPG
          </p>
        </div>
      ) : (
        <div className="flex flex-col items-start gap-3">
          <div className="flex items-center w-full gap-3">
            {file.type === "application/pdf" ? (
              <AiOutlineFilePdf className="text-4xl text-red-500" />
            ) : (
              <AiOutlineFileImage className="text-4xl text-blue-500" />
            )}
            <div className="flex-1">
              <p className="font-medium text-gray-800">{file.name}</p>
              <p className="text-sm text-gray-500">{(file.size / 1024).toFixed(1)} KB</p>
            </div>
            <button
              onClick={reset}
              aria-label="Remove file"
              className="text-red-500 hover:text-red-700"
            >
              <FaTimes />
            </button>
          </div>

          {previewURL && (
            <img
              src={previewURL}
              alt="Invoice preview"
              className="mt-2 h-32 border rounded shadow"
            />
          )}

          <button
            onClick={handleUpload}
            disabled={status === "uploading"}
            className={`mt-2 px-5 py-2 rounded text-white text-sm flex items-center gap-2
              ${status === "uploading"
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-600 hover:bg-blue-700"}`}
          >
            {status === "uploading" ? (
              <>
                <AiOutlineLoading3Quarters className="animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload & Extract"
            )}
          </button>
        </div>
      )}

      {/* Status Messages */}
      {status === "success" && (
        <div className="mt-4 flex items-center gap-2 text-green-600 text-sm">
          <FaCheckCircle /> Text extracted successfully!
        </div>
      )}
      {status === "error" && (
        <div className="mt-4 text-red-600 text-sm">{errorMessage}</div>
      )}
    </div>
  );
}

export default FileUpload;
