import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import { FaFilePdf, FaFileAlt } from "react-icons/fa";

export default function ExportButtons({ extractedText }) {
  const handleTxtExport = () => {
    const blob = new Blob([extractedText], {
      type: "text/plain;charset=utf-8",
    });
    saveAs(blob, "invoice-text.txt");
  };

  const handlePdfExport = () => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "pt",
      format: "a4",
    });

    const margin = 40;
    const pageWidth = doc.internal.pageSize.getWidth();
    const maxLineWidth = pageWidth - 2 * margin;
    const lines = doc.splitTextToSize(extractedText, maxLineWidth);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(lines, margin, 50);
    doc.save("invoice-text.pdf");
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mt-6">
      <button
        onClick={handleTxtExport}
        className="flex items-center justify-center gap-2 bg-blue-600 text-white px-5 py-2 rounded shadow hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-400"
        aria-label="Export invoice text as .txt"
      >
        <FaFileAlt />
        Export as .txt
      </button>

      <button
        onClick={handlePdfExport}
        className="flex items-center justify-center gap-2 bg-green-600 text-white px-5 py-2 rounded shadow hover:bg-green-700 transition focus:outline-none focus:ring-2 focus:ring-green-400"
        aria-label="Export invoice text as .pdf"
      >
        <FaFilePdf />
        Export as .pdf
      </button>
    </div>
  );
}
