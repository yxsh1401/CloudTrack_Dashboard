import React from "react";
import { Truck, AlertCircle } from "lucide-react";
import LinearProgressBar from "./LinearProgressBar"; // Adjust import path as needed

const OperationalTab = () => {
  const operationalEfficiencyData = {
    onTimeDelivery: 87,
    orderFulfillment: 82,
    transitTime: 2.5,
    loadingTime: 45,
    unloadingTime: 38,
    dwellTime: 95,
    routeDeviation: 8.3,
    networkCoverage: 92,
    claimRate: 1.2,
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* On-Time Delivery Rate */}
      <div className="bg-white rounded-lg shadow col-span-2 lg:col-span-1">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">On-Time Delivery Rate</h3>
        </div>
        <div className="p-4">
          <div className="flex flex-col items-center">
            <div className="relative h-36 w-36">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-gray-200"
                  strokeWidth="2"
                ></circle>
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-green-500"
                  strokeWidth="2"
                  strokeDasharray={`${operationalEfficiencyData.onTimeDelivery} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                ></circle>
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-3xl font-bold text-gray-700">
                  {operationalEfficiencyData.onTimeDelivery}%
                </p>
                <p className="text-xs text-gray-500">On Time</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between items-center mt-4">
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-xs text-gray-500">Total Shipments</p>
              <p className="font-semibold">3534</p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-xs text-gray-500">Shipments on Time</p>
              <p className="font-semibold">2989</p>
            </div>
          </div>
        </div>
      </div>

      {/* Order Fulfillment Rate */}
      <div className="bg-white rounded-lg shadow col-span-2 lg:col-span-1">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Order Fulfillment Rate</h3>
        </div>
        <div className="p-4">
          <div className="flex flex-col items-center">
            <div className="relative h-36 w-36">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-gray-200"
                  strokeWidth="2"
                ></circle>
                <circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  className="stroke-blue-500"
                  strokeWidth="2"
                  strokeDasharray={`${operationalEfficiencyData.orderFulfillment} 100`}
                  strokeLinecap="round"
                  transform="rotate(-90 18 18)"
                ></circle>
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="text-3xl font-bold text-gray-700">
                  {operationalEfficiencyData.orderFulfillment}%
                </p>
                <p className="text-xs text-gray-500">Fulfilled</p>
              </div>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4">
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-xs text-gray-500">Without Damage</p>
              <p className="font-semibold">
                {operationalEfficiencyData.orderFulfillment - 0.8}%
              </p>
            </div>
            <div className="p-3 bg-gray-50 rounded">
              <p className="text-xs text-gray-500">Without Shortage</p>
              <p className="font-semibold">
                {operationalEfficiencyData.orderFulfillment - 1.2}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transit Time */}
      <div className="bg-white rounded-lg shadow col-span-2 lg:col-span-1">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Transit Time</h3>
        </div>
        <div className="p-4 flex items-center justify-center">
          <div className="text-center">
            <p className="text-4xl font-bold text-blue-600 mt-10">
              {operationalEfficiencyData.transitTime} Days
            </p>
            <p className="text-2xl text-gray-500">Average Transit Time</p>
          </div>
        </div>
      </div>

      {/* Shipment Section */}
      <div className="bg-white rounded-lg shadow col-span-2 lg:col-span-2">
        <div className="p-4">
          <h4 className="font-semibold text-gray-700 mb-2">Shipment</h4>
          <div className="grid grid-cols-1 gap-6 items-center mb-4">
            {/* Total Shipments */}
            <div className="flex items-center p-4 bg-blue-50 border border-blue-100 rounded-lg shadow-sm">
              <div className="bg-blue-200 text-blue-700 p-2 rounded-full mr-4">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-sm text-blue-700">Total Shipments</p>
                <p className="text-lg font-semibold text-blue-900">3534</p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4"> 
            {/* Damaged Shipments */}
            <div className="flex items-center p-4 bg-red-50 border border-red-100 rounded-lg shadow-sm">
              <div className="bg-red-200 text-red-700 p-2 rounded-full mr-4">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="text-sm text-red-700">Damaged Shipments</p>
                <p className="text-lg font-semibold text-red-900">749</p>
                <LinearProgressBar value={21.2} color="red" />
              </div>
            </div>

            {/* Shortage Shipments */}
            <div className="flex items-center p-4 bg-yellow-50 border border-yellow-100 rounded-lg shadow-sm">
              <div className="bg-yellow-200 text-yellow-700 p-2 rounded-full mr-4">
                <AlertCircle size={20} />
              </div>
              <div>
                <p className="text-sm text-yellow-700">Shortage Shipments</p>
                <p className="text-lg font-semibold text-yellow-900">849</p>
                <LinearProgressBar value={24.1} color="yellow" />
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationalTab;
