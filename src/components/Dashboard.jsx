import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import TATMetrics from "./TATMetrics"; // Assuming TATMetrics is in the same directory

// Lucide icons need to be individually imported
import {
  Truck,
  Calendar,
  Clock,
  AlertCircle,
  CheckCircle,
  XCircle,
  MapPin,
  DollarSign,
  BarChart2,
  FileText,
  Users,
  TrendingUp,
  Award,
  Activity,
  Bell,
  Search,
} from "lucide-react";
import OnTimePerformance from "./OnTimeDelivery";
import TransporterScorecard from "./TransporterScoreCard";
import BusinessBreakupChart from "./BusinessShares";
import LinearProgressBar from "./LinearProgressBar";
import CostAnalysis from "./Cost";
import SustainabilityMetrics from "./CarbonEmission";
import OperationalTab from "./OperationalTab";
import CostToRevenueRatioChart from "./CostToRevenue";

// Static data for the dashboard
const tripBifurcationData = [
  { name: "Active", value: 1734, color: "#4CAF50" },
  { name: "In Transit", value: 4, color: "#2196F3" },
  { name: "Completed", value: 752, color: "#8BC34A" },
  { name: "Delayed", value: 211, color: "#FFC107" },
  { name: "Untracked", value: 8, color: "#FF5722" },
  { name: "Cancelled", value: 172, color: "#F44336" },
  { name: "Pending", value: 10, color: "#9E9E9E" },
];

const deliveryLeadTimeData = [
  // 2022
  { year: "2022", month: "Jan", orderToDelivery: 3.2, loadingToDelivery: 2.1 },
  { year: "2022", month: "Feb", orderToDelivery: 3.5, loadingToDelivery: 2.3 },
  { year: "2022", month: "Mar", orderToDelivery: 3.1, loadingToDelivery: 2.0 },
  { year: "2022", month: "Apr", orderToDelivery: 3.6, loadingToDelivery: 2.4 },
  { year: "2022", month: "May", orderToDelivery: 3.3, loadingToDelivery: 2.2 },
  { year: "2022", month: "Jun", orderToDelivery: 3.7, loadingToDelivery: 2.5 },
  { year: "2022", month: "Jul", orderToDelivery: 3.4, loadingToDelivery: 2.3 },
  { year: "2022", month: "Aug", orderToDelivery: 3.0, loadingToDelivery: 2.1 },
  { year: "2022", month: "Sep", orderToDelivery: 3.8, loadingToDelivery: 2.6 },
  { year: "2022", month: "Oct", orderToDelivery: 3.2, loadingToDelivery: 2.2 },
  { year: "2022", month: "Nov", orderToDelivery: 3.5, loadingToDelivery: 2.4 },
  { year: "2022", month: "Dec", orderToDelivery: 3.4, loadingToDelivery: 2.2 },
  // 2023
  { year: "2023", month: "Jan", orderToDelivery: 3.0, loadingToDelivery: 2.0 },
  { year: "2023", month: "Feb", orderToDelivery: 3.3, loadingToDelivery: 2.2 },
  { year: "2023", month: "Mar", orderToDelivery: 3.6, loadingToDelivery: 2.4 },
  { year: "2023", month: "Apr", orderToDelivery: 3.1, loadingToDelivery: 2.1 },
  { year: "2023", month: "May", orderToDelivery: 3.5, loadingToDelivery: 2.3 },
  { year: "2023", month: "Jun", orderToDelivery: 3.2, loadingToDelivery: 2.2 },
  { year: "2023", month: "Jul", orderToDelivery: 3.7, loadingToDelivery: 2.5 },
  { year: "2023", month: "Aug", orderToDelivery: 3.4, loadingToDelivery: 2.3 },
  { year: "2023", month: "Sep", orderToDelivery: 3.0, loadingToDelivery: 2.0 },
  { year: "2023", month: "Oct", orderToDelivery: 3.8, loadingToDelivery: 2.6 },
  { year: "2023", month: "Nov", orderToDelivery: 3.3, loadingToDelivery: 2.1 },
  { year: "2023", month: "Dec", orderToDelivery: 3.6, loadingToDelivery: 2.4 },
  // 2024
  { year: "2024", month: "Jan", orderToDelivery: 3.3, loadingToDelivery: 2.1 },
  { year: "2024", month: "Feb", orderToDelivery: 3.7, loadingToDelivery: 2.5 },
  { year: "2024", month: "Mar", orderToDelivery: 3.2, loadingToDelivery: 2.2 },
  { year: "2024", month: "Apr", orderToDelivery: 3.5, loadingToDelivery: 2.3 },
  { year: "2024", month: "May", orderToDelivery: 3.0, loadingToDelivery: 2.0 },
  { year: "2024", month: "Jun", orderToDelivery: 3.8, loadingToDelivery: 2.6 },
  { year: "2024", month: "Jul", orderToDelivery: 3.4, loadingToDelivery: 2.3 },
  { year: "2024", month: "Aug", orderToDelivery: 3.1, loadingToDelivery: 2.1 },
  { year: "2024", month: "Sep", orderToDelivery: 3.6, loadingToDelivery: 2.4 },
  { year: "2024", month: "Oct", orderToDelivery: 3.3, loadingToDelivery: 2.2 },
  { year: "2024", month: "Nov", orderToDelivery: 3.7, loadingToDelivery: 2.5 },
  { year: "2024", month: "Dec", orderToDelivery: 3.7, loadingToDelivery: 2.5 },
];

// Possible values found in the dataset:
const possibleYears = [
  ...new Set(deliveryLeadTimeData.map((item) => item.year)),
];
const possibleMonths = [
  ...new Set(deliveryLeadTimeData.map((item) => item.month)),
];
const allOrderToDeliveryValues = deliveryLeadTimeData.map(
  (item) => item.orderToDelivery
);
const allLoadingToDeliveryValues = deliveryLeadTimeData.map(
  (item) => item.loadingToDelivery
);

console.log("Possible Years:", possibleYears);
console.log("Possible Months:", possibleMonths);
console.log("All Order To Delivery Values:", allOrderToDeliveryValues);
console.log("All Loading To Delivery Values:", allLoadingToDeliveryValues);

const tatData = [
  { name: "Indent to Delivery", value: 36 },
  { name: "Delivery to ePOD", value: 12 },
];

const transporterPerformanceData = [
  { name: "Alpha Logistics", onTime: 92, score: 87, business: 35 },
  { name: "Beta Transport", onTime: 85, score: 82, business: 25 },
  { name: "Gamma Freight", onTime: 89, score: 84, business: 20 },
  { name: "Delta Shipping", onTime: 78, score: 75, business: 15 },
  { name: "Epsilon Cargo", onTime: 94, score: 89, business: 5 },
];

const driverScoreData = [
  { name: "Safety", value: 85 },
  { name: "Punctuality", value: 78 },
  { name: "Route Accuracy", value: 82 },
  { name: "Documentation", value: 70 },
  { name: "Vehicle", value: 75 },
];

const invoiceData = {
  pending: 45,
  paid: 220,
  approved: 68,
  stateWise: [
    { name: "Maharashtra", value: 75 },
    { name: "Gujarat", value: 52 },
    { name: "Karnataka", value: 43 },
    { name: "Tamil Nadu", value: 38 },
    { name: "Delhi NCR", value: 32 },
    { name: "Others", value: 25 },
  ],
  transporterWise: [
    { name: "Alpha Logistics", pending: 12, paid: 58 },
    { name: "Beta Transport", pending: 8, paid: 45 },
    { name: "Gamma Freight", pending: 10, paid: 42 },
    { name: "Delta Shipping", pending: 7, paid: 38 },
    { name: "Epsilon Cargo", pending: 8, paid: 37 },
  ],
};

{/* Trip Performance */}
const tripChartOptions = {
  chart: {
    type: "donut",
    toolbar: { show: false },
  },
  labels: tripBifurcationData.map((item) => item.name),
  legend: {
    position: "bottom",
  },
  colors: tripBifurcationData.map((item) => item.color),
  dataLabels: {
    enabled: false,
  },
  tooltip: {
    custom: ({ series, seriesIndex, w }) => {
      const name = w.globals.labels[seriesIndex];
      const value = series[seriesIndex];
      const total = series.reduce((acc, curr) => acc + curr, 0);
      const percent = ((value / total) * 100).toFixed(1);
      const color = w.config.colors[seriesIndex];

      return `
        <div style="
          padding: 8px 12px;
          background-color: ${color};
          color: white;
          border-radius: 6px;
          font-size: 13px;
        ">
          <strong>${name}</strong><br />
          ${value} (${percent}%)
        </div>
      `;
    },
  },
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 300,
        },
        legend: {
          position: "bottom",
        },
      },
    },
  ],
};


const tripChartSeries = tripBifurcationData.map((item) => item.value);

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [view, setView] = useState("monthly"); // or 'yearly'
  const [mode, setMode] = useState("primary"); // Add mode state

  {
    /* Delivery Lead Time */
  }

  const getFilteredData = () => {
    if (view === "monthly") {
      return deliveryLeadTimeData.filter((item) => item.year === "2024");
    } else {
      const yearlySummary = {};
      deliveryLeadTimeData.forEach(
        ({ year, orderToDelivery, loadingToDelivery }) => {
          if (!yearlySummary[year])
            yearlySummary[year] = { count: 0, order: 0, loading: 0 };
          yearlySummary[year].count += 1;
          yearlySummary[year].order += orderToDelivery;
          yearlySummary[year].loading += loadingToDelivery;
        }
      );
      return Object.entries(yearlySummary).map(
        ([year, { order, loading, count }]) => ({
          year,
          orderToDelivery: (order / count).toFixed(2),
          loadingToDelivery: (loading / count).toFixed(2),
        })
      );
    }
  };

  const filtered = getFilteredData();

  const chartOptions = {
    chart: {
      type: "line",
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
    },
    xaxis: {
      categories: filtered.map((item) =>
        view === "monthly" ? item.month : item.year
      ),
    },
    markers: { size: 4 },
    colors: ["#6366f1", "#10b981"],
    tooltip: {
      shared: true,
      intersect: false,
    },
    legend: {
      position: "top",
    },
  };

  const chartSeries = [
    {
      name: "Order to Delivery (days)",
      data: filtered.map((item) => parseFloat(item.orderToDelivery)),
    },
    {
      name: "Loading to Delivery (days)",
      data: filtered.map((item) => parseFloat(item.loadingToDelivery)),
    },
  ];

  const avgOrder = (
    filtered.reduce((sum, item) => sum + parseFloat(item.orderToDelivery), 0) /
    filtered.length
  ).toFixed(2);

  const avgLoading = (
    filtered.reduce(
      (sum, item) => sum + parseFloat(item.loadingToDelivery),
      0
    ) / filtered.length
  ).toFixed(2);

  const renderMetricCard = (title, value, icon, color) => (
    <div className="bg-white rounded-lg shadow p-4 flex items-center">
      <div className={`p-3 rounded-full mr-4 ${color}`}>{icon}</div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Trip Bifurcation */}
      <div className="bg-white rounded-lg shadow col-span-2">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Trip Performance</h3>
        </div>
        <div className="p-4">
          <ReactApexChart
            options={tripChartOptions}
            series={tripChartSeries}
            type="donut"
            height={250}
          />
          <div className="mt-4">
            <div className="flex justify-between items-center mb-2 p-2 bg-yellow-50 rounded border border-yellow-200">
              <div className="flex items-center">
                <AlertCircle size={16} className="text-yellow-500 mr-2" />
                <span className="text-sm">Late Delivery Shipments</span>
              </div>
              <span className="font-semibold">15</span>
            </div>
            <div className="flex justify-between items-center p-2 bg-orange-50 rounded border border-orange-200">
              <div className="flex items-center">
                <AlertCircle size={16} className="text-orange-500 mr-2" />
                <span className="text-sm">Untracked Shipments</span>
              </div>
              <span className="font-semibold">8</span>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Lead Time */}
      <div className="bg-white rounded-lg shadow col-span-1 lg:col-span-2">
        <div className="p-4 border-b flex justify-between items-center">
          <h3 className="font-semibold text-gray-700">Delivery Lead Time</h3>
          <div className="space-x-2">
            <button
              onClick={() => setView("monthly")}
              className={`px-3 py-1 rounded ${
                view === "monthly"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setView("yearly")}
              className={`px-3 py-1 rounded ${
                view === "yearly"
                  ? "bg-indigo-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              Yearly
            </button>
          </div>
        </div>
        <div className="p-4">
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="line"
            height={280}
          />
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Average Order to Delivery */}
            <div className="flex items-center p-4 bg-indigo-50 border border-indigo-100 rounded-lg shadow-sm">
              <div className="bg-indigo-200 text-indigo-700 p-2 rounded-full mr-4">
                <Clock size={20} />
              </div>
              <div>
                <p className="text-sm text-indigo-700">
                  Avg. Order to Delivery
                </p>
                <p className="text-lg font-semibold text-indigo-900">
                  {avgOrder} days
                </p>
              </div>
            </div>

            {/* Average Loading to Delivery */}
            <div className="flex items-center p-4 bg-green-50 border border-green-100 rounded-lg shadow-sm">
              <div className="bg-green-200 text-green-700 p-2 rounded-full mr-4">
                <Truck size={20} />
              </div>
              <div>
                <p className="text-sm text-green-700">
                  Avg. Loading to Delivery
                </p>
                <p className="text-lg font-semibold text-green-900">
                  {avgLoading} days
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-lg shadow col-span-1 lg:col-span-2">
        <TATMetrics tatData={tatData} />
      </div>

      {/* Transporter Invoice Status */}
      <div className="bg-white rounded-lg shadow col-span-2">
        <CostToRevenueRatioChart/>
      </div>

      <div className="col-span-full">
        <SustainabilityMetrics/>
      </div>
    </div>
  );

  const renderTransporterTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Transporter Performance Chart */}
      <div className="bg-white rounded-lg shadow col-span-1">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">On Time Performance</h3>
        </div>
        <div className="p-4">
          <OnTimePerformance/>
        </div>
      </div>

      {/* Driver Score */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">
            Transporter Score Card
          </h3>
        </div>
        <TransporterScorecard />
      </div>

      {/* Most Common Vehicle Types */}
      <div className="bg-white rounded-lg shadow col-span-1">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Business Breakup</h3>
        </div>
        <BusinessBreakupChart />
      </div>
      <div className="col-span-full">
        <OperationalTab/>
      </div>
    </div>
  );

  const renderCostTab = () => (
    <div>
      <CostAnalysis/>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Truck size={28} className="text-blue-600 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900">
              Transportation Analytics Dashboard
            </h1>
          </div>
          <div className="inline-flex rounded-full border border-gray-300 bg-white p-1">
  <button
    onClick={() => setMode('primary')}
    className={`px-4 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
      mode === 'primary' ? 'bg-blue-600 text-white' : 'text-gray-700'
    }`}
  >
    Primary
  </button>
  <button
    onClick={() => setMode('secondary')}
    className={`px-4 py-1 text-sm font-medium rounded-full transition-colors duration-200 ${
      mode === 'secondary' ? 'bg-blue-600 text-white' : 'text-gray-700'
    }`}
  >
    Secondary
  </button>
</div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6">
            <button
              onClick={() => setActiveTab("dashboard")}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === "dashboard"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Dashboard & Metrics
            </button>
            <button
              onClick={() => setActiveTab("transporter")}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === "transporter"
                  ? "border-blue-500 text-blue-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              }`}
            >
              Transporter / Driver
            </button>
            {mode === 'primary' && (
              <button
                onClick={() => setActiveTab("cost")}
                className={`py-3 px-1 border-b-2 font-medium text-sm ${
                  activeTab === "cost"
                    ? "border-blue-500 text-blue-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                Cost & Financial
              </button>
            )}
          </nav>
        </div>

        {/* Dashboard Summary */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Total Trips</p>
                <p className="text-2xl font-semibold">2869</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full h-12">
                <Truck size={24} className="text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp size={14} className="text-green-500 mr-1" />
              <span className="text-xs text-green-500">+8.2% vs last week</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">On-Time Delivery</p>
                <p className="text-2xl font-semibold">87%</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full h-12">
                <CheckCircle size={24} className="text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp size={14} className="text-green-500 mr-1" />
              <span className="text-xs text-green-500">+2.5% vs last week</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Delayed Shipments</p>
                <p className="text-2xl font-semibold">211</p>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full h-12">
                <AlertCircle size={24} className="text-yellow-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp size={14} className="text-red-500 mr-1" />
              <span className="text-xs text-red-500">+3.1% vs last week</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Transit Time</p>
                <p className="text-2xl font-semibold">2.3 Days</p>
              </div>
              <div className="bg-purple-100 p-3 rounded-full h-12">
                <Clock size={24} className="text-purple-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp size={14} className="text-green-500 mr-1" />
              <span className="text-xs text-green-500">-4.2% vs last week</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. Cost/KM</p>
                <p className="text-2xl font-semibold">₹32.5</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full h-12">
                <DollarSign size={24} className="text-blue-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp size={14} className="text-red-500 mr-1" />
              <span className="text-xs text-red-500">+1.8% vs last week</span>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-gray-500">Avg. CSAT Score</p>
                <p className="text-2xl font-semibold">6.4/10</p>
              </div>
              <div className="bg-green-100 p-3 rounded-full h-12">
                <Users size={24} className="text-green-600" />
              </div>
            </div>
            <div className="mt-2 flex items-center">
              <TrendingUp size={14} className="text-green-500 mr-1" />
              <span className="text-xs text-green-500">+0.2 vs last week</span>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === "dashboard" && renderDashboard()}
        {activeTab === "transporter" && renderTransporterTab()}
        {activeTab === "cost" && renderCostTab()}
        
      </main>
    </div>
  );
};

export default Dashboard;
