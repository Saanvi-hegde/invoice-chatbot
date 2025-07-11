import { useEffect, useState } from "react";
import axios from "axios";
import { FaTrashAlt } from "react-icons/fa";

export default function History() {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8000/history")
      .then((res) => setRecords(res.data))
      .catch(() => alert("❌ Failed to fetch history"))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this?")) return;
    setDeleting(id);
    try {
      await axios.delete(`http://localhost:8000/history/${id}`);
      setRecords((prev) => prev.filter((r) => r._id !== id));
    } catch {
      alert("❌ Delete failed");
    } finally {
      setDeleting(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-10 px-4 sm:px-6 text-gray-900 dark:text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-blue-800 dark:text-blue-300 mb-8 text-center drop-shadow">
          📜 Upload History (MongoDB)
        </h1>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading records...</p>
        ) : records.length === 0 ? (
          <p className="text-center text-gray-400 italic">No history records yet.</p>
        ) : (
          <div className="space-y-6">
            {records.map((rec) => (
              <div
                key={rec._id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow border border-blue-100 dark:border-gray-700 p-5 transition-all"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-lg font-semibold text-blue-700 dark:text-blue-200">
                      {rec.filename}
                    </h2>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(rec.timestamp * 1000).toLocaleString()} • {(rec.size / 1024).toFixed(1)} KB
                    </p>
                  </div>
                  <button
                    onClick={() => handleDelete(rec._id)}
                    className={`text-red-500 hover:text-red-700 text-lg transition ${
                      deleting === rec._id ? "opacity-50 pointer-events-none" : ""
                    }`}
                    aria-label="Delete record"
                  >
                    <FaTrashAlt />
                  </button>
                </div>

                <details className="mt-4 group">
                  <summary className="text-blue-600 dark:text-blue-400 cursor-pointer hover:underline">
                    Show extracted text
                  </summary>
                  <pre className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 mt-2 border rounded max-h-60 overflow-y-auto whitespace-pre-wrap text-sm">
                    {rec.text}
                  </pre>
                </details>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
