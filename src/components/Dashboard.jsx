import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import {
  LineChart,
  BarChart,
  PieChart,
  AreaChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Line,
  Bar,
  Pie,
  Area,
  ResponsiveContainer,
  Cell,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar
} from 'recharts';

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
  Search
} from 'lucide-react';

// Static data for the dashboard
const tripBifurcationData = [
  { name: 'Active', value: 1734, color: '#4CAF50' },
  { name: 'In Transit', value: 4, color: '#2196F3' },
  { name: 'Completed', value: 752, color: '#8BC34A' },
  { name: 'Delayed', value: 211, color: '#FFC107' },
  { name: 'Untracked', value: 8, color: '#FF5722' },
  { name: 'Cancelled', value: 172, color: '#F44336' },
  { name: 'Pending', value: 10, color: '#9E9E9E' }
];

const deliveryLeadTimeData = [
  { month: 'Jan', orderToDelivery: 3.2, loadingToDelivery: 2.1 },
  { month: 'Feb', orderToDelivery: 3.5, loadingToDelivery: 2.3 },
  { month: 'Mar', orderToDelivery: 3.1, loadingToDelivery: 2.0 },
  { month: 'Apr', orderToDelivery: 3.3, loadingToDelivery: 2.2 },
  { month: 'May', orderToDelivery: 3.8, loadingToDelivery: 2.5 },
  { month: 'Jun', orderToDelivery: 3.4, loadingToDelivery: 2.3 },
  { month: 'Jul', orderToDelivery: 3.2, loadingToDelivery: 2.1 },
  { month: 'Aug', orderToDelivery: 3.5, loadingToDelivery: 2.3 },
  { month: 'Sep', orderToDelivery: 3.0, loadingToDelivery: 1.9 },
  { month: 'Oct', orderToDelivery: 3.3, loadingToDelivery: 2.2 },
  { month: 'Nov', orderToDelivery: 3.6, loadingToDelivery: 2.4 },
  { month: 'Dec', orderToDelivery: 3.4, loadingToDelivery: 2.2 }
];

const tatData = [
  { name: 'Indent to Delivery', value: 36 },
  { name: 'Delivery to ePOD', value: 12 }
];

const transporterPerformanceData = [
  { name: 'Alpha Logistics', onTime: 92, score: 87, business: 35 },
  { name: 'Beta Transport', onTime: 85, score: 82, business: 25 },
  { name: 'Gamma Freight', onTime: 89, score: 84, business: 20 },
  { name: 'Delta Shipping', onTime: 78, score: 75, business: 15 },
  { name: 'Epsilon Cargo', onTime: 94, score: 89, business: 5 }
];

const driverScoreData = [
  { name: 'Safety', value: 85 },
  { name: 'Punctuality', value: 78 },
  { name: 'Route Accuracy', value: 82 },
  { name: 'Documentation', value: 70 },
  { name: 'Vehicle', value: 75 }
];

const businessShareData = [
  { name: 'L1 Transporters', value: 50, color: '#2196F3' },
  { name: 'L2 Transporters', value: 30, color: '#4CAF50' },
  { name: 'L3 Transporters', value: 15, color: '#FFC107' },
  { name: 'Adhoc Transporters', value: 5, color: '#9E9E9E' }
];

const operationalEfficiencyData = {
  onTimeDelivery: 87,
  orderFulfillment: 94,
  transitTime: 2.5,
  loadingTime: 45,
  unloadingTime: 38,
  dwellTime: 95,
  routeDeviation: 8.3,
  networkCoverage: 92,
  claimRate: 1.2
};

const costMetricsData = {
  costPerTonKm: 12.5,
  costPerUnit: 8.3,
  costPerTrip: 15750,
  costPerShipment: 4250,
  costPerKm: 32.5,
  fuelCostPerKm: 18.4,
  freightCostPercent: 7.5,
  emptyKmPercent: 14.2,
  freightBillAccuracy: 98.5
};

const transportationTrendData = [
  { month: 'Jan', cost: 148000 },
  { month: 'Feb', cost: 152000 },
  { month: 'Mar', cost: 160000 },
  { month: 'Apr', cost: 167000 },
  { month: 'May', cost: 172000 },
  { month: 'Jun', cost: 168000 },
  { month: 'Jul', cost: 173000 },
  { month: 'Aug', cost: 175000 },
  { month: 'Sep', cost: 178000 },
  { month: 'Oct', cost: 183000 },
  { month: 'Nov', cost: 187000 },
  { month: 'Dec', cost: 192000 }
];

const invoiceData = {
  pending: 45,
  paid: 220,
  approved: 68,
  stateWise: [
    { name: 'Maharashtra', value: 75 },
    { name: 'Gujarat', value: 52 },
    { name: 'Karnataka', value: 43 },
    { name: 'Tamil Nadu', value: 38 },
    { name: 'Delhi NCR', value: 32 },
    { name: 'Others', value: 25 }
  ],
  transporterWise: [
    { name: 'Alpha Logistics', pending: 12, paid: 58 },
    { name: 'Beta Transport', pending: 8, paid: 45 },
    { name: 'Gamma Freight', pending: 10, paid: 42 },
    { name: 'Delta Shipping', pending: 7, paid: 38 },
    { name: 'Epsilon Cargo', pending: 8, paid: 37 }
  ]
};

const sustainabilityChartOptions = {
    chart: {
      height: 350,
      type: 'line',
    },
    stroke: {
      width: [3, 3, 3],
      curve: 'smooth'
    },
    colors: ['#e74c3c', '#3498db', '#2ecc71'],
    series: [
      {
        name: 'totalEmission',
        type: 'line',
        data: [7000, 9000, 5000, 3000, 15000, 12048],
      },
      {
        name: 'avgEmission',
        type: 'line',
        data: [300.1, 310.4, 350.2, 370.6, 400.0, 388.64],
      },
      {
        name: 'efficiencyIndex',
        type: 'line',
        data: [60, 58, 70, 75, 65, 51],
      },
    ],
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    yaxis: [
      {
        title: {
          text: 'Emission',
        },
      },
      {
        opposite: true,
        title: {
          text: 'Efficiency Index',
        },
      },
    ],
    tooltip: {
      shared: true,
      intersect: false,
    },
  };

const serviceMetricsData = {
  deliveryAccuracy: 97.2,
  csatScore: 4.3,
  returnRate: 1.5,
  damageRate: 0.8,
  orderCycleTime: 4.5
};

const sustainabilityData = {
//   co2Emissions: 0.82,
//   loadFactor: 84.5,
//   idleTimeFuel: 3.2,
//   ecoFriendlyFleet: 17.5,
//   driverCompliance: 92.3,
//   accidents: 0.3
'Total co2 Emissions': '92,321 kg CO2',
'Avg Emissions per Trip': '267.42 kg CO2',
'Lowest Emissions': '52.34 kg CO2',
'Highest Emissions': '553.96 kg CO2',
};

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  
  const renderMetricCard = (title, value, icon, color) => (
    <div className="bg-white rounded-lg shadow p-4 flex items-center">
      <div className={`p-3 rounded-full mr-4 ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <p className="text-2xl font-semibold">{value}</p>
      </div>
    </div>
  );

  const renderDashboard = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Trip Bifurcation */}
      <div className="bg-white rounded-lg shadow col-span-1">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Trip Performance</h3>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={tripBifurcationData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={60}
                fill="#8884d8"
                dataKey="value"
                nameKey="name"
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              >
                {tripBifurcationData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
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
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Delivery Lead Time</h3>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={deliveryLeadTimeData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="orderToDelivery" stroke="#8884d8" name="Order to Delivery (days)" />
              <Line type="monotone" dataKey="loadingToDelivery" stroke="#82ca9d" name="Loading to Delivery (days)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transporter Invoice Status */}
      <div className="bg-white rounded-lg shadow col-span-1">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Transporter Invoice Status</h3>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={invoiceData.transporterWise} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={100} />
              <Tooltip />
              <Legend />
              <Bar dataKey="pending" stackId="a" fill="#f59e0b" name="Pending" />
              <Bar dataKey="paid" stackId="a" fill="#10b981" name="Paid" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Freight Cost Trend */}
      <div className="bg-white rounded-lg shadow col-span-1 lg:col-span-3">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Freight Cost Trend</h3>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={transportationTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="cost" stroke="#3b82f6" name="Actual Cost" />
              <Line type="monotone" dataKey="cost" stroke="#ef4444" name="Predicted Cost" strokeDasharray="5 5" />
            </LineChart>
          </ResponsiveContainer>
          <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h4 className="font-semibold text-blue-800 mb-2">Cost Prediction</h4>
            <p className="text-sm text-blue-600">Based on current trends, expected freight costs for Q1 2022 are projected to increase by 5.2% compared to Q4 2021. Recommendations for cost optimization include consolidating shipments and renegotiating rates with L2 transporters.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderOperationalTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* On-Time Delivery Rate */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">On-Time Delivery Rate</h3>
        </div>
        <div className="p-4">
          <div className="flex flex-col items-center">
            <div className="relative h-36 w-36">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-200" strokeWidth="2"></circle>
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
                <p className="text-3xl font-bold text-gray-700">{operationalEfficiencyData.onTimeDelivery}%</p>
                <p className="text-xs text-gray-500">On Time</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">Target: 95%</span>
              <span className="text-sm text-red-500">-8% Gap</span>
            </div>
            <div className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-green-500 rounded-full" style={{ width: `${operationalEfficiencyData.onTimeDelivery}%` }}></div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-2">Monthly Trend</h4>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={[
                { month: 'Jan', value: 86 },
                { month: 'Feb', value: 85 },
                { month: 'Mar', value: 88 },
                { month: 'Apr', value: 87 },
              ]}>
                <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                <XAxis dataKey="month" hide={true} />
                <YAxis hide={true} domain={[80, 95]} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Order Fulfillment Rate */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Order Fulfillment Rate</h3>
        </div>
        <div className="p-4">
          <div className="flex flex-col items-center">
            <div className="relative h-36 w-36">
              <svg className="h-full w-full" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" className="stroke-gray-200" strokeWidth="2"></circle>
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
                <p className="text-3xl font-bold text-gray-700">{operationalEfficiencyData.orderFulfillment}%</p>
                <p className="text-xs text-gray-500">Fulfilled</p>
              </div>
            </div>
          </div>
          <div className="mt-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-500">Without Damage</p>
                <p className="font-semibold">{operationalEfficiencyData.orderFulfillment - 0.8}%</p>
              </div>
              <div className="p-3 bg-gray-50 rounded">
                <p className="text-xs text-gray-500">Without Shortage</p>
                <p className="font-semibold">{operationalEfficiencyData.orderFulfillment - 1.2}%</p>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <h4 className="font-medium text-sm mb-2">Monthly Trend</h4>
            <ResponsiveContainer width="100%" height={100}>
              <LineChart data={[
                { month: 'Jan', value: 92 },
                { month: 'Feb', value: 93 },
                { month: 'Mar', value: 93 },
                { month: 'Apr', value: 94 },
              ]}>
                <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
                <XAxis dataKey="month" hide={true} />
                <YAxis hide={true} domain={[90, 100]} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Transit Time */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Transit Time</h3>
        </div>
        <div className="p-4">
          <div className="flex items-center justify-center">
            <div className="text-center">
              <p className="text-4xl font-bold text-blue-600">{operationalEfficiencyData.transitTime}</p>
              <p className="text-sm text-gray-500">Average Days</p>
            </div>
          </div>
          <div className="mt-4">
            <div className="grid grid-cols-3 gap-2 text-center">
              <div className="p-2 bg-blue-50 rounded">
                <p className="text-xl font-semibold">{operationalEfficiencyData.transitTime - 0.3}</p>
                <p className="text-xs text-gray-500">Short Routes</p>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <p className="text-xl font-semibold">{operationalEfficiencyData.transitTime + 0.5}</p>
                <p className="text-xs text-gray-500">Long Routes</p>
              </div>
              <div className="p-2 bg-blue-50 rounded">
                <p className="text-xl font-semibold">{operationalEfficiencyData.transitTime}</p>
                <p className="text-xs text-gray-500">Medium Routes</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Control Tower - Map View */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Control Tower - Map View</h3>
        </div>
        <div className="p-4">
          <div className="flex space-x-2 mb-4">
            <button className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm">All Trips</button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">Ongoing</button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">Completed</button>
            <button className="px-3 py-1 bg-gray-200 text-gray-700 rounded-full text-sm">Delayed</button>
          </div>
          
          <div className="w-full h-96 bg-gray-100 rounded-lg flex items-center justify-center relative">
            {/* Placeholder for map */}
            <div className="absolute top-0 left-0 w-full h-full opacity-15">
              <svg width="100%" height="100%" viewBox="0 0 800 600" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0 0H800V600H0V0Z" fill="#E5E7EB" />
                <path d="M100 100H700V500H100V100Z" fill="#D1D5DB" />
                <path d="M150 150H650V450H150V150Z" fill="#E5E7EB" />
                <path d="M100 300H700" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="4 4" />
                <path d="M400 100V500" stroke="#9CA3AF" strokeWidth="2" strokeDasharray="4 4" />
                <circle cx="200" cy="250" r="10" fill="#3B82F6" />
                <circle cx="350" cy="200" r="10" fill="#3B82F6" />
                <circle cx="500" cy="300" r="10" fill="#3B82F6" />
                <circle cx="600" cy="250" r="10" fill="#3B82F6" />
                <circle cx="250" cy="350" r="10" fill="#10B981" />
                <circle cx="400" cy="400" r="10" fill="#F59E0B" />
                <circle cx="550" cy="350" r="10" fill="#EF4444" />
                <path d="M200 250L350 200L500 300L600 250" stroke="#3B82F6" strokeWidth="2" />
                <path d="M250 350L400 400L550 350" stroke="#F59E0B" strokeWidth="2" />
              </svg>
            </div>
            <MapPin size={48} className="text-gray-400" />
            <div className="absolute top-4 right-4 bg-white p-3 rounded-lg shadow">
              <h4 className="font-medium text-sm mb-2">Legend</h4>
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs">Warehouse</span>
              </div>
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-xs">On-time</span>
              </div>
              <div className="flex items-center mb-1">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-xs">Delayed</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-xs">Critical</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4">
            <h4 className="font-semibold text-gray-700 mb-2">Active Trips</h4>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trip ID</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Origin</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Destination</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ETA</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">TR-2023-0042</td>
                    <td className="px-6 py-4 whitespace-nowrap">Mumbai</td>
                    <td className="px-6 py-4 whitespace-nowrap">Delhi</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">On Time</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">Apr 25, 10:30 AM</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">TR-2023-0043</td>
                    <td className="px-6 py-4 whitespace-nowrap">Chennai</td>
                    <td className="px-6 py-4 whitespace-nowrap">Bangalore</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">Delayed</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">Apr 25, 4:15 PM</td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">TR-2023-0047</td>
                    <td className="px-6 py-4 whitespace-nowrap">Kolkata</td>
                    <td className="px-6 py-4 whitespace-nowrap">Hyderabad</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">Critical</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">Apr 26, 2:00 AM</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTransporterTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Transporter Performance Chart */}
      <div className="bg-white rounded-lg shadow col-span-2">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Transporter Performance</h3>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={transporterPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="onTime" fill="#4CAF50" name="On-Time %" />
              <Bar dataKey="score" fill="#2196F3" name="Performance Score" />
              <Bar dataKey="business" fill="#FFC107" name="Business Share %" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      
      {/* Driver Score */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Driver Performance Score</h3>
        </div>
        <div className="p-4">
          <ResponsiveContainer width="100%" height={250}>
            <RadarChart data={driverScoreData}>
              <PolarGrid />
              <PolarAngleAxis dataKey="name" />
              <PolarRadiusAxis angle={30} domain={[0, 100]} />
              <Radar dataKey="value" stroke="#8884d8" fill="#8884d8" fillOpacity={0.7} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );

  const renderInvoiceTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Invoice Status Summary */}
      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Invoice Status</h3>
        </div>
        <div className="p-4">
  <ResponsiveContainer width="100%" height={300}>
    <PieChart>
      <Pie
        data={[
          { name: 'Paid', value: invoiceData.paid, color: '#4CAF50' },
          { name: 'Pending', value: invoiceData.pending, color: '#FFC107' },
          { name: 'Approved', value: invoiceData.approved, color: '#2196F3' }
        ]}
        cx="50%"
        cy="50%"
        innerRadius={40} // Optional: for ring chart
        outerRadius={80}
        fill="#8884d8"
        dataKey="value"
        nameKey="name"
        label
      >
        {[
          { name: 'Paid', value: invoiceData.paid, color: '#4CAF50' },
          { name: 'Pending', value: invoiceData.pending, color: '#FFC107' },
          { name: 'Approved', value: invoiceData.approved, color: '#2196F3' }
        ].map((entry, index) => (
          <Cell key={`cell-${index}`} fill={entry.color} />
        ))}
      </Pie>
      <Tooltip />
      <Legend />
    </PieChart>
  </ResponsiveContainer>
</div>

      </div>
    </div>
  );

  const renderServiceTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Service Metrics */}
      <div className="bg-white rounded-lg shadow col-span-2">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Service Level Metrics</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(serviceMetricsData).map(([key, value]) => (
              <div key={key} className="p-4 border rounded">
                <h4 className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                <p className="text-2xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderSustainabilityTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Sustainability Metrics */}
      <div className="bg-white rounded-lg shadow col-span-2">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Sustainability Metrics</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(sustainabilityData).map(([key, value]) => (
              <div key={key} className="p-4 border rounded">
                <h4 className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                <p className="text-2xl font-semibold">{value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
          <ReactApexChart
            options={sustainabilityChartOptions}
            series={sustainabilityChartOptions.series}
            type="line"
            height={350}
          />
        </div>
        </div>
      </div>
    </div>
  );

  const renderCostTab = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {/* Cost Metrics */}
      <div className="bg-white rounded-lg shadow col-span-2">
        <div className="p-4 border-b">
          <h3 className="font-semibold text-gray-700">Cost Analysis</h3>
        </div>
        <div className="p-4">
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(costMetricsData).map(([key, value]) => (
              <div key={key} className="p-4 border rounded">
                <h4 className="text-sm text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</h4>
                <p className="text-2xl font-semibold">₹{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderMapTab = () => (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <h3 className="font-semibold text-gray-700">Live Tracking Map</h3>
      </div>
      <div className="p-4">
        {/* Map implementation would go here */}
        <div className="h-[600px] bg-gray-100 rounded-lg flex items-center justify-center">
          <MapPin size={48} className="text-gray-400" />
          <p className="text-gray-500 ml-2">Map Integration Required</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Truck size={28} className="text-blue-600 mr-2" />
            <h1 className="text-xl font-semibold text-gray-900">Transportation Analytics Dashboard</h1>
          </div>
          <div className="flex items-center space-x-4">
            {/* <div className="relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </span>
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div> */}
            {/* <div className="bg-blue-100 p-2 rounded-full">
              <Bell size={20} className="text-blue-600" />
            </div>
            <div className="bg-gray-200 w-8 h-8 rounded-full"></div> */}
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col space-y-8">
        {/* Tab Navigation */}
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-6">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'dashboard'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Dashboard & Metrics
            </button>
            <button
              onClick={() => setActiveTab('transporter')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'transporter'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Transporter / Driver
            </button>
            <button
              onClick={() => setActiveTab('ops')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'ops'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Operational Efficiency
            </button>
            <button
              onClick={() => setActiveTab('cost')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'cost'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Cost & Financial
            </button>
            <button
              onClick={() => setActiveTab('invoice')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'invoice'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Invoice
            </button>
            <button
              onClick={() => setActiveTab('service')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'service'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Service & Customer
            </button>
            <button
              onClick={() => setActiveTab('sustainability')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'sustainability'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Sustainability
            </button>
            <button
              onClick={() => setActiveTab('map')}
              className={`py-3 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'map'
                  ? 'border-blue-500 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Control Tower
            </button>
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
              <div className="bg-blue-100 p-2 rounded">
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
              <div className="bg-green-100 p-2 rounded">
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
              <div className="bg-yellow-100 p-2 rounded">
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
                <p className="text-2xl font-semibold">7.3h</p>
              </div>
              <div className="bg-purple-100 p-2 rounded">
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
              <div className="bg-blue-100 p-2 rounded">
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
                <p className="text-sm text-gray-500">CSAT Score</p>
                <p className="text-2xl font-semibold">4.3</p>
              </div>
              <div className="bg-green-100 p-2 rounded">
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
        {activeTab === 'dashboard' && renderDashboard()}
        {activeTab === 'transporter' && renderTransporterTab()}
        {activeTab === 'invoice' && renderInvoiceTab()}
        {activeTab === 'map' && renderMapTab()}
        {activeTab === 'ops' && renderOperationalTab()}
        {activeTab === 'cost' && renderCostTab()}
        {activeTab === 'service' && renderServiceTab()}
        {activeTab === 'sustainability' && renderSustainabilityTab()}
      </main>
    </div>
  );
};

export default Dashboard;