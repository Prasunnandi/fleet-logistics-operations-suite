import React from 'react';
import { 
  Truck, CheckCircle2, AlertTriangle, Fuel, Wrench, 
  ArrowUpRight, Clock, Navigation, AlertOctagon, TrendingUp 
} from 'lucide-react';

export default function Dashboard({ overview, trips, setActiveTab }) {
  const stats = [
    {
      title: 'Fleet Deployment',
      value: `${overview?.activeVehicles || 0} / ${overview?.totalVehicles || 0}`,
      subtitle: `${((overview?.activeVehicles / (overview?.totalVehicles || 1)) * 100).toFixed(0)}% utilization rate`,
      icon: Truck,
      color: 'text-emerald-400',
      bg: 'bg-emerald-500/10 border-emerald-500/20'
    },
    {
      title: 'On-Time Reliability',
      value: `${overview?.onTimeDeliveryRate || 92.5}%`,
      subtitle: 'SLA target: 95.0%',
      icon: CheckCircle2,
      color: 'text-teal-400',
      bg: 'bg-teal-500/10 border-teal-500/20'
    },
    {
      title: 'Delayed & Failed',
      value: `${(overview?.delayedShipments || 0) + (overview?.failedShipments || 0)}`,
      subtitle: `${overview?.delayedShipments || 0} delayed, ${overview?.failedShipments || 0} failed`,
      icon: AlertTriangle,
      color: 'text-amber-400',
      bg: 'bg-amber-500/10 border-amber-500/20'
    },
    {
      title: 'Total Fuel Spend',
      value: `$${(overview?.totalFuelSpend || 0).toLocaleString()}`,
      subtitle: `$${(overview?.totalMaintenanceSpend || 0).toLocaleString()} in maintenance`,
      icon: Fuel,
      color: 'text-sky-400',
      bg: 'bg-sky-500/10 border-sky-500/20'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950/40 border border-slate-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              FleetPulse + RouteWise Unified Feed
            </span>
            <h2 className="text-2xl font-black text-white tracking-tight mt-2">
              Dispatch & Logistics Command Center
            </h2>
            <p className="text-slate-400 text-sm mt-1 max-w-xl">
              Real-time telemetry, automated driver allocations, and machine-learning anomaly detection across all corridors.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab('intelligence')}
              className="px-4 py-2.5 rounded-xl bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-300 text-xs font-bold transition flex items-center gap-2"
            >
              <AlertOctagon className="h-4 w-4" />
              <span>Review Anomalies</span>
            </button>
            <button
              onClick={() => setActiveTab('tracking')}
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition shadow-lg shadow-emerald-600/25 flex items-center gap-2"
            >
              <Navigation className="h-4 w-4" />
              <span>Open Live Map</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, idx) => {
          const Icon = s.icon;
          return (
            <div key={idx} className="p-5 rounded-xl bg-slate-900/90 border border-slate-800 shadow-sm relative overflow-hidden">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-slate-400">{s.title}</span>
                <div className={`p-2 rounded-lg border ${s.bg}`}>
                  <Icon className={`h-4 w-4 ${s.color}`} />
                </div>
              </div>
              <div className="mt-3">
                <div className="text-2xl font-extrabold text-white tracking-tight">{s.value}</div>
                <div className="text-xs text-slate-400 mt-1 flex items-center gap-1">
                  <span>{s.subtitle}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Live Dispatched Trips Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-5 rounded-2xl bg-slate-900/90 border border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white">Active Dispatch & Delivery Runs</h3>
              <p className="text-xs text-slate-400">Live GPS tracking and estimated arrival statuses</p>
            </div>
            <button
              onClick={() => setActiveTab('tracking')}
              className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1"
            >
              <span>View Interactive Map</span>
              <ArrowUpRight className="h-3.5 w-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-800 text-slate-400">
                  <th className="pb-3 font-semibold">Trip Code</th>
                  <th className="pb-3 font-semibold">Vehicle & Model</th>
                  <th className="pb-3 font-semibold">Driver</th>
                  <th className="pb-3 font-semibold">Corridor</th>
                  <th className="pb-3 font-semibold">Speed</th>
                  <th className="pb-3 font-semibold text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {trips.map((t) => (
                  <tr key={t.id} className="hover:bg-slate-800/40 transition">
                    <td className="py-3 font-mono font-bold text-slate-200">{t.tripCode}</td>
                    <td className="py-3">
                      <div className="font-semibold text-slate-200">{t.vehicle?.plateNumber}</div>
                      <div className="text-[11px] text-slate-400">{t.vehicle?.model}</div>
                    </td>
                    <td className="py-3 text-slate-300">{t.driver?.fullName}</td>
                    <td className="py-3 font-medium text-slate-300">
                      {t.originCity} ➔ {t.destinationCity}
                    </td>
                    <td className="py-3 font-mono text-emerald-400 font-bold">
                      {t.currentSpeedKmh ? `${t.currentSpeedKmh} km/h` : 'Stopped'}
                    </td>
                    <td className="py-3 text-right">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        t.status === 'ACTIVE'
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30'
                          : t.status === 'DELAYED'
                          ? 'bg-amber-500/10 text-amber-400 border border-amber-500/30'
                          : 'bg-slate-700/50 text-slate-300'
                      }`}>
                        {t.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Intelligence Alert Snapshot */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-rose-400 mb-2">
              <AlertOctagon className="h-4 w-4" />
              <span className="text-xs font-bold uppercase tracking-wider">Automated Alerts</span>
            </div>
            <h3 className="text-base font-bold text-white">Critical Operations Watch</h3>
            <p className="text-xs text-slate-400 mt-1">
              Algorithms flagged 2 items needing operational review today:
            </p>

            <div className="mt-4 space-y-3">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-rose-500/30">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-rose-400">Fuel Burn Anomaly</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/20 text-rose-300">+36.4% Burn</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  Driver <span className="text-white font-semibold">David Miller</span> (Scania R500) logged 2.1 km/L vs 3.3 benchmark.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/80 border border-amber-500/30">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-amber-400">Corridor Bottleneck</span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300">61.1% On-Time</span>
                </div>
                <p className="text-xs text-slate-300 mt-1">
                  <span className="text-white font-semibold">Philadelphia ➔ Boston</span> average delay is 84 minutes.
                </p>
              </div>
            </div>
          </div>

          <button
            onClick={() => setActiveTab('intelligence')}
            className="w-full mt-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700/80 border border-slate-700 text-xs font-bold text-slate-200 transition text-center"
          >
            Open Intelligence Lab ➔
          </button>
        </div>
      </div>
    </div>
  );
}
