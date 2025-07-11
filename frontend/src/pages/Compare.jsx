import { useState } from "react";
import axios from "axios";

export default function Compare() {
  const [fileA, setFileA] = useState(null);
  const [fileB, setFileB] = useState(null);
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [results, setResults] = useState([]);

  const fields = [
    {
      label: "Invoice Number",
      regex: /Invoice\s*(?:No|Number)[^\d]*(\d+)/i,
      fallback: /#(\d{4,})/,
    },
    {
      label: "Invoice Date",
      regex: /Date[^\d]*(\d{2}[-/]\d{2}[-/]\d{2,4})/i,
    },
    {
      label: "Vendor Name",
      regex: /Vendor[:\s]*([A-Za-z\s]+)/i,
    },
    {
      label: "Total Amount",
      regex: /Total[^\d]*(\d+(?:\.\d{2})?)/i,
    },
    {
      label: "Tax Amount",
      regex: /Tax[^\d]*(\d+(?:\.\d{2})?)/i,
    },
  ];

  const extractField = (regex, text, fallback) => {
    const match = text.match(regex);
    if (match?.[1]) return match[1].trim();
    if (fallback) {
      const alt = text.match(fallback);
      if (alt?.[1]) return alt[1].trim();
    }
    return "Not Found";
  };

  const handleUpload = async (file, setText) => {
    const formData = new FormData();
    formData.append("file", file);
    try {
      const res = await axios.post("http://localhost:8000/extract-text", formData);
      setText(res.data.text);
    } catch (err) {
      console.error("Upload error:", err);
    }
  };

  const handleCompare = () => {
    const comparison = fields.map(({ label, regex, fallback }) => {
      const valueA = extractField(regex, textA, fallback);
      const valueB = extractField(regex, textB, fallback);
      return {
        field: label,
        valueA,
        valueB,
        match: valueA === valueB && valueA !== "Not Found",
      };
    });
    setResults(comparison);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-700 dark:text-blue-300 text-center">
          🔍 Invoice Comparison Tool
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label className="block mb-1 font-semibold">Upload Invoice A</label>
            <input
              type="file"
              accept=".pdf,.png,.jpg"
              onChange={(e) => setFileA(e.target.files[0])}
              className="block w-full p-2 border rounded"
            />
            {fileA && (
              <button
                onClick={() => handleUpload(fileA, setTextA)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Extract Text A
              </button>
            )}
          </div>

          <div>
            <label className="block mb-1 font-semibold">Upload Invoice B</label>
            <input
              type="file"
              accept=".pdf,.png,.jpg"
              onChange={(e) => setFileB(e.target.files[0])}
              className="block w-full p-2 border rounded"
            />
            {fileB && (
              <button
                onClick={() => handleUpload(fileB, setTextB)}
                className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Extract Text B
              </button>
            )}
          </div>
        </div>

        {textA && textB && (
          <button
            onClick={handleCompare}
            className="mb-8 px-6 py-3 bg-green-600 text-white font-semibold rounded hover:bg-green-700"
          >
            Compare Invoices
          </button>
        )}

        {results.length > 0 && (
          <div className="overflow-x-auto bg-white dark:bg-gray-800 rounded-lg shadow border">
            <table className="min-w-full text-sm">
              <thead className="bg-gray-100 dark:bg-gray-700 text-left">
                <tr>
                  <th className="px-4 py-3">Field</th>
                  <th className="px-4 py-3">Invoice A</th>
                  <th className="px-4 py-3">Invoice B</th>
                  <th className="px-4 py-3">Match</th>
                </tr>
              </thead>
              <tbody>
                {results.map((row, idx) => (
                  <tr
                    key={idx}
                    className={`${
                      row.match ? "bg-green-50 dark:bg-green-900" : "bg-red-50 dark:bg-red-900"
                    } border-t`}
                  >
                    <td className="px-4 py-3 font-medium">{row.field}</td>
                    <td className="px-4 py-3">{row.valueA}</td>
                    <td className="px-4 py-3">{row.valueB}</td>
                    <td className="px-4 py-3 font-semibold">
                      {row.match ? "✅ Match" : "❌ Mismatch"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
