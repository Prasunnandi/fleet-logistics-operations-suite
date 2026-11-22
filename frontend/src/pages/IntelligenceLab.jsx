import React, { useState, useEffect } from 'react';
import { 
  Fuel, DollarSign, Route, MapPin, AlertTriangle, 
  CheckCircle2, ArrowRight, ShieldAlert, Cpu, Sparkles, RefreshCw 
} from 'lucide-react';
import { api } from '../services/api';

export default function IntelligenceLab() {
  const [fuelAnomalies, setFuelAnomalies] = useState([]);
  const [expensiveVehicles, setExpensiveVehicles] = useState([]);
  const [routeEfficiency, setRouteEfficiency] = useState([]);
  const [delayHotspots, setDelayHotspots] = useState([]);
  const [failedDeliveries, setFailedDeliveries] = useState([]);
  const [retryingId, setRetryingId] = useState(null);

  useEffect(() => {
    loadIntelligenceData();
  }, []);

  async function loadIntelligenceData() {
    const [fuel, vehicles, routes, hotspots, failed] = await Promise.all([
      api.getFuelAnomalies(),
      api.getVehicleCostRanking(),
      api.getRouteEfficiency(),
      api.getDelayHotspots(),
      api.getFailedDeliveries()
    ]);
    setFuelAnomalies(fuel);
    setExpensiveVehicles(vehicles);
    setRouteEfficiency(routes);
    setDelayHotspots(hotspots);
    setFailedDeliveries(failed);
  }

  async function handleRetry(id) {
    setRetryingId(id);
    await api.retryFailedDelivery(id, 'Automated priority retry scheduled for morning dispatch.');
    setRetryingId(null);
    loadIntelligenceData();
  }

  return (
    <div className="space-y-8">
      {/* Standout Header */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900 border border-rose-500/30">
        <div className="flex items-center gap-2 text-rose-400 mb-2">
          <Cpu className="h-5 w-5" />
          <span className="text-xs font-bold uppercase tracking-wider">Logistics Performance Intelligence</span>
        </div>
        <h2 className="text-2xl font-black text-white tracking-tight">
          Automated Cost & Anomaly Detection Engine
        </h2>
        <p className="text-slate-400 text-sm mt-1 max-w-2xl leading-relaxed">
          Proprietary analytics identifying expensive vehicles, inefficient corridors, persistent delay hotspots, and drivers with unusual fuel consumption.
        </p>
      </div>

      {/* Feature 1: Drivers with Unusual Fuel Consumption */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400">
              <Fuel className="h-5 w-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-white">Unusual Fuel Consumption Anomalies</h3>
              <p className="text-xs text-slate-400">Drivers & trucks operating significantly below model efficiency baseline</p>
            </div>
          </div>
          <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-rose-500/10 text-rose-400 border border-rose-500/20">
            {fuelAnomalies.length} Flagged Drivers
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {fuelAnomalies.map((a, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-slate-900/90 border border-rose-500/30 space-y-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-extrabold text-white text-sm">{a.driverName}</h4>
                  <p className="text-xs text-slate-400">{a.vehicleModel} • <span className="font-mono text-slate-300">{a.vehiclePlate}</span></p>
                </div>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                  a.anomalySeverity === 'UNUSUAL_ANOMALY'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40 animate-pulse'
                    : 'bg-amber-500/20 text-amber-300'
                }`}>
                  +{a.excessFuelConsumptionPercentage}% Excess Burn
                </span>
              </div>

              {/* Stat Comparison bar */}
              <div className="grid grid-cols-2 gap-3 p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs">
                <div>
                  <span className="text-[11px] text-slate-400">Observed Efficiency</span>
                  <div className="text-base font-mono font-bold text-rose-400">{a.observedEfficiencyKmPerLiter} km/L</div>
                </div>
                <div>
                  <span className="text-[11px] text-slate-400">Model Benchmark</span>
                  <div className="text-base font-mono font-bold text-emerald-400">{a.benchmarkEfficiencyKmPerLiter} km/L</div>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div>
                  <span className="text-slate-400 font-semibold">Diagnosis: </span>
                  <span className="text-slate-300">{a.rootCauseHypothesis}</span>
                </div>
                <div>
                  <span className="text-emerald-400 font-semibold">Action: </span>
                  <span className="text-slate-300">{a.recommendedAction}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Feature 2: High Operating Cost & Expensive Vehicles */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <DollarSign className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-white">Expensive Vehicles (Total Cost of Ownership)</h3>
            <p className="text-xs text-slate-400">Ranked by combined maintenance and fuel operational expenditure</p>
          </div>
        </div>

        <div className="rounded-2xl bg-slate-900/90 border border-slate-800 overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-slate-800 text-slate-400 bg-slate-950/40">
                <th className="p-4 font-semibold">Vehicle</th>
                <th className="p-4 font-semibold">Odometer</th>
                <th className="p-4 font-semibold">Fuel Spend</th>
                <th className="p-4 font-semibold">Maintenance Spend</th>
                <th className="p-4 font-semibold">Total OPEX</th>
                <th className="p-4 font-semibold">Cost / Km</th>
                <th className="p-4 font-semibold text-right">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {expensiveVehicles.map((v) => (
                <tr key={v.vehicleId} className="hover:bg-slate-800/40 transition">
                  <td className="p-4">
                    <div className="font-bold text-slate-200">{v.model}</div>
                    <div className="font-mono text-[11px] text-slate-400">{v.plateNumber}</div>
                  </td>
                  <td className="p-4 font-mono text-slate-300">{(v.currentMileageKm || 0).toLocaleString()} km</td>
                  <td className="p-4 font-mono text-slate-300">${(v.totalFuelCost || 0).toLocaleString()}</td>
                  <td className="p-4 font-mono text-slate-300">${(v.totalMaintenanceCost || 0).toLocaleString()}</td>
                  <td className="p-4 font-mono font-bold text-white">${(v.totalOperatingExpense || 0).toLocaleString()}</td>
                  <td className="p-4 font-mono font-bold text-amber-400">${v.costPerKm}</td>
                  <td className="p-4 text-right">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider ${
                      v.expenseSeverity === 'CRITICAL_EXPENSE'
                        ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                        : v.expenseSeverity === 'HIGH'
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                        : 'bg-emerald-500/20 text-emerald-300'
                    }`}>
                      {v.expenseSeverity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Feature 3 & 4: Inefficient Corridors & Delay Hotspots */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inefficient Routes */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <Route className="h-5 w-5 text-teal-400" />
            <div>
              <h3 className="text-base font-bold text-white">Route & Corridor Bottlenecks</h3>
              <p className="text-xs text-slate-400">Routes with high delay rates and scheduling friction</p>
            </div>
          </div>

          <div className="space-y-3">
            {routeEfficiency.map((r, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{r.corridorName}</span>
                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                    r.efficiencyGrade === 'BOTTLENECK'
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {r.efficiencyGrade}
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>On-Time: <strong className="text-slate-200">{r.onTimePercentage}%</strong></span>
                  <span>Avg Delay: <strong className="text-amber-400">{r.averageDelayMinutes} mins</strong></span>
                  <span>Volume: <strong className="text-slate-200">{r.totalTrips} runs</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Delay Hotspots */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-rose-400" />
            <div>
              <h3 className="text-base font-bold text-white">Recurring Delay Hotspots</h3>
              <p className="text-xs text-slate-400">Clustered delivery failure & congestion zones</p>
            </div>
          </div>

          <div className="space-y-3">
            {delayHotspots.map((h, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-xs space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-200">{h.locationName}</span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                    Risk Index: {h.riskIndex} / 100
                  </span>
                </div>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Coordinates: <strong className="font-mono text-slate-300">{h.latitude}, {h.longitude}</strong></span>
                  <span>Primary Cause: <strong className="text-amber-400">{h.primaryRootCause}</strong></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Feature 5: Failed Delivery Exception Management */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-rose-400" />
          <div>
            <h3 className="text-base font-bold text-white">Failed Delivery Recovery Queue</h3>
            <p className="text-xs text-slate-400">Automated triage for exception orders and scheduled re-dispatches</p>
          </div>
        </div>

        <div className="space-y-3">
          {failedDeliveries.map((f) => (
            <div key={f.id} className="p-4 rounded-xl bg-slate-900 border border-slate-800 flex flex-col md:flex-row md:items-center justify-between gap-4 text-xs">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-200">{f.shipment?.trackingNumber}</span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 text-[10px] font-bold">
                    {f.reason}
                  </span>
                </div>
                <p className="text-slate-400">
                  Location: <span className="text-slate-200 font-medium">{f.incidentLocation}</span>
                </p>
                <p className="text-slate-500 text-[11px]">
                  Notes: {f.resolutionNotes}
                </p>
              </div>

              <div>
                {f.retryScheduled ? (
                  <span className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4" />
                    Retry Scheduled
                  </span>
                ) : (
                  <button
                    onClick={() => handleRetry(f.id)}
                    disabled={retryingId === f.id}
                    className="px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition flex items-center gap-1.5 shadow"
                  >
                    {retryingId === f.id ? <RefreshCw className="h-3.5 w-3.5 animate-spin" /> : null}
                    <span>Schedule Immediate Retry</span>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
