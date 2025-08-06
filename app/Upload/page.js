"use client";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { UploadCloud, FileSpreadsheet } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [dragActive, setDragActive] = useState(false);

  const route = useRouter();

  const handleUpload = async () => {
    if (!file) return toast.error("Please upload a file");

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("/api/Upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(res.data.message);
      toast.success(res.data.message || "File uploaded successfully");
      setFile(null); // Reset file input
    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.error || "Upload failed";
      setMessage(errorMessage);
      toast.error(errorMessage);
    }
  };

  const goto = async(e) =>{
    route.push('/Tasks')
  } 

  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    if (e.dataTransfer.files.length) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="p-6 pt-20 min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">
        Upload CSV/XLSX File
      </h1>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`w-full max-w-lg border-2 rounded-lg p-8 flex flex-col items-center justify-center transition cursor-pointer
          ${dragActive ? "border-blue-400 bg-gray-800" : "border-gray-600 bg-gray-900"}
        `}
      >
        <UploadCloud className="w-12 h-12 text-blue-400 mb-3" />
        <p className="text-gray-300 mb-2">Drag & Drop your file here</p>
        <p className="text-sm text-gray-500 mb-4">or click to select a file</p>
        <input
          type="file"
          accept=".csv,.xlsx,.xls"
          onChange={(e) => setFile(e.target.files[0])}
          className="hidden"
          id="fileInput"
        />
        <label
          htmlFor="fileInput"
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded text-white text-sm cursor-pointer"
        >
          Choose File
        </label>
      </div>

      {/* File Preview */}
      {file && (
        <div className="mt-4 flex items-center gap-3 bg-gray-800 p-3 rounded-lg border border-gray-700 w-full max-w-lg">
          <FileSpreadsheet className="text-green-400 w-6 h-6" />
          <span className="text-sm text-gray-300 truncate">{file.name}</span>
        </div>
      )}

      {/* Upload Button */}
      <button
        onClick={handleUpload}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg shadow"
      >
        Upload
      </button>

      <button
        onClick={goto}
        className="mt-6 px-6 py-2 bg-blue-600 hover:bg-blue-700 transition text-white rounded-lg shadow"
      >
        Go to Tasks
      </button>

      {/* Status Message */}
      {message && (
        <p className="mt-4 text-sm text-gray-300 text-center">{message}</p>
      )}
    </div>
  );
}
