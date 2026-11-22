import React, { useState, useEffect } from 'react';
import { Truck, Users, Fuel, Wrench, Plus, CheckCircle, AlertCircle } from 'lucide-react';
import { api } from '../services/api';

export default function FleetManager() {
  const [vehicles, setVehicles] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [fuelLogs, setFuelLogs] = useState([]);
  const [maintenance, setMaintenance] = useState([]);
  const [activeTab, setActiveTab] = useState('vehicles');

  useEffect(() => {
    loadFleetData();
  }, []);

  async function loadFleetData() {
    const [v, d, f, m] = await Promise.all([
      api.getVehicles(),
      api.getDrivers(),
      api.getFuelLogs(),
      api.getMaintenance()
    ]);
    setVehicles(v);
    setDrivers(d);
    setFuelLogs(f);
    setMaintenance(m);
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Truck className="h-5 w-5 text-emerald-400" />
            <span>FleetPulse Vehicle & Driver Operations</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Asset registry, driver shifts, preventive maintenance intervals, and fuel ledger.
          </p>
        </div>

        {/* Tab pills */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('vehicles')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'vehicles' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Vehicles ({vehicles.length})
          </button>
          <button
            onClick={() => setActiveTab('drivers')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'drivers' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Drivers ({drivers.length})
          </button>
          <button
            onClick={() => setActiveTab('maintenance')}
            className={`px-3 py-1.5 rounded-lg transition ${activeTab === 'maintenance' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}
          >
            Maintenance Log
          </button>
        </div>
      </div>

      {/* Vehicles View */}
      {activeTab === 'vehicles' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="p-4 font-semibold">Plate Number</th>
                <th className="p-4 font-semibold">Model</th>
                <th className="p-4 font-semibold">Category</th>
                <th className="p-4 font-semibold">Capacity</th>
                <th className="p-4 font-semibold">Odometer</th>
                <th className="p-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {vehicles.map((v) => (
                <tr key={v.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-mono font-bold text-slate-200">{v.plateNumber}</td>
                  <td className="p-4 font-semibold text-slate-200">{v.model}</td>
                  <td className="p-4 text-slate-400">{v.vehicleType}</td>
                  <td className="p-4 font-mono text-slate-300">{(v.capacityKg || 0).toLocaleString()} kg</td>
                  <td className="p-4 font-mono text-slate-300">{(v.currentMileageKm || 0).toLocaleString()} km</td>
                  <td className="p-4 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      v.status === 'AVAILABLE'
                        ? 'bg-teal-500/20 text-teal-300'
                        : v.status === 'IN_TRANSIT'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}>
                      {v.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Drivers View */}
      {activeTab === 'drivers' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="p-4 font-semibold">Driver Name</th>
                <th className="p-4 font-semibold">License #</th>
                <th className="p-4 font-semibold">Contact</th>
                <th className="p-4 font-semibold">Safety Rating</th>
                <th className="p-4 font-semibold">Trips Done</th>
                <th className="p-4 font-semibold text-right">Duty Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {drivers.map((d) => (
                <tr key={d.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-bold text-slate-200">{d.fullName}</td>
                  <td className="p-4 font-mono text-slate-400">{d.licenseNumber}</td>
                  <td className="p-4 text-slate-300">{d.phone}</td>
                  <td className="p-4 font-bold text-amber-400">★ {d.rating || 5.0}</td>
                  <td className="p-4 font-mono text-slate-300">{d.totalTripsCompleted} runs</td>
                  <td className="p-4 text-right">
                    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                      d.status === 'ON_DUTY'
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : d.status === 'AVAILABLE'
                        ? 'bg-teal-500/20 text-teal-300'
                        : 'bg-slate-700/50 text-slate-400'
                    }`}>
                      {d.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Maintenance View */}
      {activeTab === 'maintenance' && (
        <div className="rounded-2xl bg-slate-900 border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="p-4 font-semibold">Vehicle</th>
                <th className="p-4 font-semibold">Service Type</th>
                <th className="p-4 font-semibold">Date</th>
                <th className="p-4 font-semibold">Description</th>
                <th className="p-4 font-semibold">Expense</th>
                <th className="p-4 font-semibold text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {maintenance.map((m) => (
                <tr key={m.id} className="hover:bg-slate-800/40 transition">
                  <td className="p-4 font-mono font-bold text-slate-200">{m.vehicle?.plateNumber}</td>
                  <td className="p-4 font-semibold text-slate-200">{m.serviceType}</td>
                  <td className="p-4 text-slate-400">{m.serviceDate}</td>
                  <td className="p-4 text-slate-300">{m.description}</td>
                  <td className="p-4 font-mono font-bold text-amber-400">${(m.cost || 0).toLocaleString()}</td>
                  <td className="p-4 text-right">
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300">
                      {m.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
