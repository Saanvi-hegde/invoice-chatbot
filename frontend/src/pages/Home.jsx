import { useState, useMemo } from "react";
import NavBar from "../components/NavBar";
import FileUpload from "../components/FileUpload";
import ChatBox from "../components/ChatBox";
import AnalyticsCards from "../components/AnalyticsCards";
import ExportButtons from "../components/ExportButtons";

export default function Home() {
  const [extractedText, setExtractedText] = useState("");

  const analytics = useMemo(() => <AnalyticsCards />, []);

  return (
    <>
      <NavBar />

      <main className="min-h-screen bg-gradient-to-br from-gray-100 to-blue-50 dark:from-gray-900 dark:to-gray-800 py-10 px-4 sm:px-6 text-gray-900 dark:text-white">
        <div className="max-w-6xl mx-auto">
          {/* 📊 Analytics Overview */}
          {analytics}

          {/* 📁 Upload Section */}
          <section className="mb-12">
            <FileUpload onTextExtracted={setExtractedText} />
          </section>

          {/* 📑 Extracted Text + Chat */}
          {extractedText && (
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left: Extracted Invoice */}
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow border border-blue-100 dark:border-gray-700 p-6">
                <h2 className="text-2xl font-semibold text-blue-700 dark:text-blue-300 mb-3">
                  Extracted Invoice Text
                </h2>
                <div className="bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 p-4 rounded border max-h-96 overflow-y-auto whitespace-pre-wrap text-sm leading-relaxed">
                  {extractedText}
                </div>

                <ExportButtons extractedText={extractedText} />
              </div>

              {/* Right: ChatBot */}
              <ChatBox extractedText={extractedText} />
            </section>
          )}
        </div>
      </main>
    </>
  );
}
