import React, { useState, useEffect } from 'react';
import { Package, Plus, Search, CheckCircle, Clock, AlertTriangle, ArrowRight } from 'lucide-react';
import { api } from '../services/api';

export default function ShipmentsDispatch() {
  const [shipments, setShipments] = useState([]);
  const [filter, setFilter] = useState('ALL');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    trackingNumber: `SHP-${Math.floor(10000 + Math.random() * 90000)}`,
    customerName: '',
    originAddress: '',
    destinationAddress: '',
    weightKg: 5000,
    priority: 'STANDARD',
    status: 'CREATED'
  });

  useEffect(() => {
    loadShipments();
  }, []);

  async function loadShipments() {
    const data = await api.getShipments();
    setShipments(data);
  }

  async function handleCreate(e) {
    e.preventDefault();
    await api.createShipment(formData);
    setShowModal(false);
    loadShipments();
    setFormData({
      trackingNumber: `SHP-${Math.floor(10000 + Math.random() * 90000)}`,
      customerName: '',
      originAddress: '',
      destinationAddress: '',
      weightKg: 5000,
      priority: 'STANDARD',
      status: 'CREATED'
    });
  }

  const filtered = shipments.filter(s => {
    if (filter === 'ALL') return true;
    return s.status === filter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Package className="h-5 w-5 text-emerald-400" />
            <span>Shipment Booking & Order Pipeline</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Book freight cargo, assign carriers, monitor delivery status, and handle exception escalations.
          </p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-emerald-600/20"
        >
          <Plus className="h-4 w-4" />
          <span>Book New Shipment</span>
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-2 text-xs font-semibold">
        {['ALL', 'IN_TRANSIT', 'DELAYED', 'DELIVERED', 'FAILED'].map((st) => (
          <button
            key={st}
            onClick={() => setFilter(st)}
            className={`px-3 py-1.5 rounded-lg transition ${
              filter === st
                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            {st.replace('_', ' ')}
          </button>
        ))}
      </div>

      {/* Shipment Table */}
      <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
              <th className="p-4 font-semibold">Tracking #</th>
              <th className="p-4 font-semibold">Customer</th>
              <th className="p-4 font-semibold">Origin ➔ Destination</th>
              <th className="p-4 font-semibold">Weight</th>
              <th className="p-4 font-semibold">Priority</th>
              <th className="p-4 font-semibold text-right">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-slate-800/40 transition">
                <td className="p-4 font-mono font-bold text-slate-200">{s.trackingNumber}</td>
                <td className="p-4 font-bold text-slate-200">{s.customerName}</td>
                <td className="p-4 text-slate-300">
                  <div className="truncate max-w-xs">{s.originAddress}</div>
                  <div className="text-[11px] text-emerald-400 truncate">➔ {s.destinationAddress}</div>
                </td>
                <td className="p-4 font-mono text-slate-300">{(s.weightKg || 0).toLocaleString()} kg</td>
                <td className="p-4">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    s.priority === 'CRITICAL'
                      ? 'bg-rose-500/20 text-rose-300'
                      : s.priority === 'EXPRESS'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-slate-700/50 text-slate-400'
                  }`}>
                    {s.priority}
                  </span>
                </td>
                <td className="p-4 text-right">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                    s.status === 'DELIVERED'
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : s.status === 'IN_TRANSIT'
                      ? 'bg-teal-500/20 text-teal-300'
                      : s.status === 'DELAYED'
                      ? 'bg-amber-500/20 text-amber-300'
                      : 'bg-rose-500/20 text-rose-300'
                  }`}>
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md p-6 space-y-4">
            <h3 className="font-extrabold text-white text-base">Book New Freight Shipment</h3>

            <form onSubmit={handleCreate} className="space-y-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1 font-medium">Tracking Number</label>
                <input
                  type="text"
                  value={formData.trackingNumber}
                  disabled
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-400 font-mono"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1 font-medium">Customer / Client Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Global Logistics"
                  value={formData.customerName}
                  onChange={(e) => setFormData({ ...formData, customerName: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Origin Address</label>
                  <input
                    type="text"
                    required
                    placeholder="Newark Port, NJ"
                    value={formData.originAddress}
                    onChange={(e) => setFormData({ ...formData, originAddress: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Destination</label>
                  <input
                    type="text"
                    required
                    placeholder="Chicago Hub, IL"
                    value={formData.destinationAddress}
                    onChange={(e) => setFormData({ ...formData, destinationAddress: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Cargo Weight (kg)</label>
                  <input
                    type="number"
                    value={formData.weightKg}
                    onChange={(e) => setFormData({ ...formData, weightKg: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1 font-medium">Priority Tier</label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  >
                    <option value="STANDARD">Standard</option>
                    <option value="EXPRESS">Express</option>
                    <option value="CRITICAL">Critical</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-400 hover:text-slate-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition shadow"
                >
                  Create Shipment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
