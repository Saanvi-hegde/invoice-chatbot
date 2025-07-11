import { FaFileInvoice, FaBuilding, FaExclamationTriangle } from "react-icons/fa";

const cards = [
  {
    label: "Invoices Processed",
    value: 42,
    icon: <FaFileInvoice className="text-blue-600 text-2xl" />,
    border: "border-blue-500",
  },
  {
    label: "Vendors Detected",
    value: 9,
    icon: <FaBuilding className="text-green-600 text-2xl" />,
    border: "border-green-500",
  },
  {
    label: "Field Mismatches",
    value: 3,
    icon: <FaExclamationTriangle className="text-red-600 text-2xl" />,
    border: "border-red-500",
  },
];

export default function AnalyticsCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`card flex items-center justify-between border-l-4 ${card.border} hover:shadow-lg transition`}
        >
          <div className="flex flex-col">
            <span className="text-sm text-gray-500">{card.label}</span>
            <span className="text-3xl font-bold text-blue-900">{card.value}</span>
          </div>
          <div className="opacity-80">{card.icon}</div>
        </div>
      ))}
    </div>
  );
}
