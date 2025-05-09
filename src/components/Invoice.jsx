import React from 'react';
import Chart from 'react-apexcharts';
import StateGeoChart from './GeoMap';
import TransporterBarChart from './TransporterInvoice';
import FreightCostChart from './FreightCost';


const InvoiceTab = () => {
const invoiceData = {
    pending: 45,
    paid: 220,
    approved: 68,
    stateWise: [
        { name: "Telangana", value: 139 },
        { name: "Gujarat", value: 7 },
        { name: "Karnataka", value: 6 },
        { name: "Delhi NCR", value: 5 },
        { name: "Maharashtra", value: 3 },
        { name: "Uttar Pradesh", value: 2 },
        { name: "Andhra Pradesh", value: 1 },
      ],
    transporterWise: [
      { name: "Alpha Logistics", pending: 12, paid: 58 },
      { name: "Beta Transport", pending: 8, paid: 45 },
      { name: "Gamma Freight", pending: 10, paid: 42 },
      { name: "Delta Shipping", pending: 7, paid: 38 },
      { name: "Epsilon Cargo", pending: 8, paid: 37 },
    ],
  };


    const invoiceStatusOptions = {
      labels: ['Paid', 'Pending', 'Approved'],
      colors: ['#4CAF50', '#FFC107', '#2196F3'],
      legend: { position: 'bottom' },
      tooltip: {
        y: {
          formatter: (val) => `${val} Invoices`,
        },
      },
      responsive: [{
        breakpoint: 480,
        options: {
          chart: { width: 300 },
          legend: { position: 'bottom' },
        },
      }],
    };
  
    const invoiceStatusSeries = [
      invoiceData.paid,
      invoiceData.pending,
      invoiceData.approved,
    ];
  
    const stateWiseOptions = {
      labels: invoiceData.stateWise.map((s) => s.name),
      colors: ['#FF5722', '#03A9F4', '#8BC34A', '#E91E63', '#9C27B0', '#FF9800'],
      legend: { position: 'bottom' },
      tooltip: {
        y: {
          formatter: (val) => `${val} Invoices`,
        },
      },
    };
  
    const stateWiseSeries = invoiceData.stateWise.map((s) => s.value);
  
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Invoice Status Summary */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-700">Invoice Status</h3>
          </div>
          <div className="p-4">
            <Chart
              options={invoiceStatusOptions}
              series={invoiceStatusSeries}
              type="donut"
              height={300}
            />
          </div>
        </div>
  
        {/* State-wise Invoice Distribution */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <h3 className="font-semibold text-gray-700">State-wise Invoices</h3>
          </div>
          <div className="p-4">
            <Chart
              options={stateWiseOptions}
              series={stateWiseSeries}
              type="donut"
              height={300}
            />
          </div>
        </div>
        <div>
            <TransporterBarChart/>
        </div>
        <div className='grid grid-cols-4 col-span-full gap-6'>
        <div className='col-span-2'>
            <StateGeoChart/>
        </div>
        <div className='col-span-2'>
            <FreightCostChart/>
        </div>
        </div>
      </div>
    );
  };
  
  export default InvoiceTab;