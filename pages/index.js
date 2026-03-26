import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GOOGLE_SHEET_ID = process.env.NEXT_PUBLIC_GOOGLE_SHEET_ID;
const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_API_KEY;

export default function Home() {
    const [leads, setLeads] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [newLead, setNewLead] = useState({
          name: '',
          email: '',
          phone: '',
          company: '',
          status: 'Lead',
          value: ''
    });

  useEffect(() => {
        fetchLeads();
  }, []);

  const fetchLeads = async () => {
        try {
                setLoading(true);
                const range = 'Sheet1!A2:G100';
                const url = `https://sheets.googleapis.com/v4/spreadsheets/${GOOGLE_SHEET_ID}/values/${range}?key=${API_KEY}`;

          const response = await axios.get(url);
                const rows = response.data.values || [];

          const leadsData = rows.map((row, idx) => ({
                    id: row[0] || idx,
                    name: row[1] || '',
                    email: row[2] || '',
                    phone: row[3] || '',
                    company: row[4] || '',
                    status: row[5] || '',
                    value: row[6] || ''
          }));

          setLeads(leadsData);
                setError(null);
        } catch (err) {
                setError('Failed to fetch leads');
                console.error(err);
        } finally {
                setLoading(false);
        }
  };

  const handleAddLead = async (e) => {
        e.preventDefault();
        // This would require Sheets API write access with proper authentication
        alert('Lead added! (Demo - requires backend setup for actual Google Sheets integration)');
        fetchLeads();
  };

  const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewLead(prev => ({
                ...prev,
                [name]: value
        }));
  };

  return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
          <div className="max-w-7xl mx-auto px-4 py-8">
  {/* Header */}
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-800 mb-2">Leads Management Dashboard</h1>
            <p className="text-gray-600">Manage and track your business leads in real-time</p>
    </div>

  {/* Add Lead Form */}
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
                      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Lead</h2>
            <form onSubmit={handleAddLead} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <input
                type="text"
                name="name"
                placeholder="Lead Name"
                value={newLead.name}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newLead.email}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                            <input
              type="tel"
              name="phone"
              placeholder="Phone"
              value={newLead.phone}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                            <input
              type="text"
              name="company"
              placeholder="Company"
              value={newLead.company}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                            <select
              name="status"
              value={newLead.status}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                              <option>Lead</option>
              <option>Hot Lead</option>
              <option>Qualified</option>
              <option>Contacted</option>
                </select>
            <input
              type="text"
              name="value"
              placeholder="Deal Value"
              value={newLead.value}
              onChange={handleInputChange}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
                            <button
              type="submit"
              className="md:col-span-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
            >
                              Add Lead
                </button>
                </form>
                </div>

{/* Leads Table */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-200">
                      <h2 className="text-xl font-semibold text-gray-800">All Leads</h2>
          </div>

{loading ? (
              <div className="p-6 text-center text-gray-500">Loading leads...</div>
            ) : error ? (
              <div className="p-6 text-center text-red-500">{error}</div>
            ) : leads.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No leads found</div>
           ) : (
                         <div className="overflow-x-auto">
                           <table className="w-full">
                             <thead className="bg-gray-50">
                               <tr>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                     <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Value</th>
             </tr>
             </thead>
                 <tbody className="divide-y divide-gray-200">
           {leads.map((lead, idx) => (
                                 <tr key={idx} className="hover:bg-gray-50">
                                   <td className="px-6 py-4 text-sm text-gray-900">{lead.name}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{lead.email}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{lead.phone}</td>
                                            <td className="px-6 py-4 text-sm text-gray-600">{lead.company}</td>
                                            <td className="px-6 py-4 text-sm">
                                     <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                                                                 lead.status === 'Hot Lead' ? 'bg-red-100 text-red-800' :
                                                                 lead.status === 'Qualified' ? 'bg-green-100 text-green-800' :
                                                                 lead.status === 'Contacted' ? 'bg-blue-100 text-blue-800' :
                                                                 'bg-gray-100 text-gray-800'
                                     }`}>
{lead.status}
</span>
  </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">{lead.value}</td>
  </tr>
                  ))}
                    </tbody>
                    </table>
                    </div>
          )}
</div>

{/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-8">
                    <div className="bg-white rounded-lg shadow-md p-6">
                      <p className="text-gray-600 text-sm font-medium">Total Leads</p>
            <p className="text-3xl font-bold text-gray-800">{leads.length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
                      <p className="text-gray-600 text-sm font-medium">Hot Leads</p>
            <p className="text-3xl font-bold text-red-600">{leads.filter(l => l.status === 'Hot Lead').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
                      <p className="text-gray-600 text-sm font-medium">Qualified</p>
            <p className="text-3xl font-bold text-green-600">{leads.filter(l => l.status === 'Qualified').length}</p>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
                      <p className="text-gray-600 text-sm font-medium">Total Value</p>
            <p className="text-3xl font-bold text-blue-600">
                        ${leads.reduce((sum, l) => {
                          const val = parseInt(l.value.replace(/[^0-9]/g, '')) || 0;
                          return sum + val;
        }, 0).toLocaleString()}
</p>
  </div>
  </div>
  </div>
  </div>
  );
}
