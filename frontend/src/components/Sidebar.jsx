import React from 'react';
import { LayoutDashboard, Truck, MapPin, Package, Cpu, ShieldAlert, BarChart3, Navigation } from 'lucide-react';

export default function Sidebar({ activeTab, setActiveTab }) {
  const menuItems = [
    { id: 'dashboard', label: 'Executive Overview', icon: LayoutDashboard },
    { id: 'tracking', label: 'Live GPS Tracking', icon: MapPin, badge: 'Live' },
    { id: 'intelligence', label: 'Performance & Anomaly Lab', icon: Cpu, badge: 'AI Alert' },
    { id: 'fleet', label: 'Fleet & Driver Roster', icon: Truck },
    { id: 'shipments', label: 'Shipments & Dispatch', icon: Package },
  ];

  return (
    <aside className="w-64 bg-slate-900 border-r border-slate-800 flex flex-col shrink-0 h-screen sticky top-0">
      {/* Brand Header */}
      <div className="p-5 border-b border-slate-800 flex items-center gap-3">
        <div className="h-10 w-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-500/20">
          <Navigation className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="font-extrabold text-base tracking-tight text-white flex items-center gap-1.5">
            HORIZON <span className="text-xs font-semibold px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">FLEET</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">Logistics Intelligence Suite</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1.5 overflow-y-auto">
        <div className="px-3 pt-2 pb-1 text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          Operations & Control
        </div>
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl font-medium text-sm transition-all duration-200 ${
                isActive
                  ? 'bg-emerald-600/15 text-emerald-400 border border-emerald-500/30 shadow-sm shadow-emerald-950'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`h-4.5 w-4.5 ${isActive ? 'text-emerald-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold uppercase tracking-wider ${
                  item.badge === 'Live'
                    ? 'bg-emerald-500/20 text-emerald-300 animate-pulse'
                    : 'bg-rose-500/20 text-rose-300'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      {/* Telemetry Status Widget */}
      <div className="p-4 m-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-semibold text-slate-400">System Telemetry</span>
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
        </div>
        <p className="text-[11px] text-slate-500 leading-relaxed">
          Ingesting GPS packets & fuel sensors via Spring Boot REST backend.
        </p>
      </div>

      {/* User profile */}
      <div className="p-3 border-t border-slate-800 flex items-center gap-3">
        <div className="h-8 w-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-slate-300">
          PN
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-xs font-bold text-slate-200 truncate">Prasun Nandi</p>
          <p className="text-[11px] text-slate-400 truncate">Operations Director</p>
        </div>
      </div>
    </aside>
  );
}
