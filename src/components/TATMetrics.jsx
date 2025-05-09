import { Timer, PackageCheck } from "lucide-react";

const TATMetrics = ({ tatData }) => {
  const total = tatData.reduce((sum, item) => sum + item.value, 0);
  const average = (total / tatData.length).toFixed(2);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">TAT Metrics</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {tatData.map((item, idx) => (
          <div
            key={idx}
            className="flex items-center p-4 border rounded-lg bg-gray-50"
          >
            <div className="bg-blue-100 p-2 rounded-full mr-4 text-blue-600">
              {item.name.includes("ePOD") ? <PackageCheck size={20} /> : <Timer size={20} />}
            </div>
            <div>
              <p className="text-sm text-gray-500">{item.name}</p>
              <p className="text-xl font-semibold text-gray-800">{item.value} hrs</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 border-t pt-4 text-center">
        <p className="text-sm text-gray-500">Average Turnaround Time</p>
        <p className="text-xl font-bold text-indigo-600">{average} hrs</p>
      </div>
    </div>
  );
};

export default TATMetrics;
