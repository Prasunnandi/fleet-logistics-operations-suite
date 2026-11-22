import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import { Truck, Navigation, AlertTriangle, ShieldCheck, MapPin } from 'lucide-react';

// Custom Leaflet DivIcons
const createVehicleIcon = (status) => {
  const isDelayed = status === 'DELAYED';
  return L.divIcon({
    className: 'custom-vehicle-marker',
    html: `
      <div style="
        width: 32px;
        height: 32px;
        background: ${isDelayed ? '#f59e0b' : '#10b981'};
        border: 2px solid #ffffff;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0,0,0,0.5);
        display: flex;
        align-items: center;
        justify-content: center;
        color: white;
        font-size: 14px;
        font-weight: bold;
      ">
        🚚
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

export default function LiveTrackingMap({ trips }) {
  const [selectedTrip, setSelectedTrip] = useState(trips[0] || null);

  // Route points sample for polylines
  const routeCorridors = {
    'TRP-8801': [
      [40.7128, -74.0060], // NYC
      [41.2565, -81.5644], // Current (Ohio)
      [41.8781, -87.6298]  // Chicago
    ],
    'TRP-8802': [
      [39.9526, -75.1652], // Philly
      [41.5120, -72.8240], // Current (Conn)
      [42.3601, -71.0589]  // Boston
    ],
    'TRP-8803': [
      [42.3314, -83.0458], // Detroit
      [40.7580, -83.1250], // Current (Ohio)
      [39.9612, -82.9988]  // Columbus
    ]
  };

  return (
    <div className="space-y-4">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Navigation className="h-5 w-5 text-emerald-400" />
            <span>RouteWise Live GPS Fleet Tracking</span>
          </h2>
          <p className="text-xs text-slate-400 mt-0.5">
            Real-time geospatial positioning, speed telemetry, and waypoint progression.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-semibold">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping"></span>
            3 Transits In Progress
          </span>
          <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-400 font-semibold">
            <AlertTriangle className="h-3.5 w-3.5" />
            1 Delayed Run
          </span>
        </div>
      </div>

      {/* Map & Detail Container */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 h-[620px]">
        {/* Left Interactive Map */}
        <div className="lg:col-span-3 rounded-2xl overflow-hidden border border-slate-800 relative shadow-2xl">
          <MapContainer
            center={[41.1, -78.2]}
            zoom={6}
            scrollWheelZoom={true}
            style={{ height: '100%', width: '100%' }}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {/* Polylines for corridors */}
            {trips.map((t) => {
              const points = routeCorridors[t.tripCode];
              if (!points) return null;
              return (
                <Polyline
                  key={t.id}
                  positions={points}
                  pathOptions={{
                    color: t.status === 'DELAYED' ? '#f59e0b' : '#10b981',
                    weight: 4,
                    dashArray: t.status === 'DELAYED' ? '6, 8' : undefined,
                    opacity: 0.8
                  }}
                />
              );
            })}

            {/* Vehicle Markers */}
            {trips.map((t) => {
              if (!t.currentLat || !t.currentLng) return null;
              return (
                <Marker
                  key={t.id}
                  position={[t.currentLat, t.currentLng]}
                  icon={createVehicleIcon(t.status)}
                  eventHandlers={{
                    click: () => setSelectedTrip(t)
                  }}
                >
                  <Popup>
                    <div className="p-1 space-y-1">
                      <div className="font-bold text-sm text-white flex items-center justify-between gap-2">
                        <span>{t.tripCode}</span>
                        <span className={`text-[10px] px-1.5 py-0.2 rounded font-semibold ${
                          t.status === 'DELAYED' ? 'bg-amber-500/20 text-amber-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {t.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-300">
                        {t.vehicle?.model} ({t.vehicle?.plateNumber})
                      </p>
                      <p className="text-xs text-slate-400 font-mono">
                        Speed: {t.currentSpeedKmh || 0} km/h
                      </p>
                      <p className="text-xs text-emerald-400">
                        Route: {t.originCity} ➔ {t.destinationCity}
                      </p>
                    </div>
                  </Popup>
                </Marker>
              );
            })}
          </MapContainer>
        </div>

        {/* Right Info Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col justify-between overflow-y-auto">
          <div>
            <h3 className="font-bold text-sm text-slate-200 mb-3">Active Dispatch Units</h3>
            <div className="space-y-2.5">
              {trips.map((t) => {
                const isSelected = selectedTrip?.id === t.id;
                return (
                  <div
                    key={t.id}
                    onClick={() => setSelectedTrip(t)}
                    className={`p-3 rounded-xl border cursor-pointer transition text-xs ${
                      isSelected
                        ? 'bg-slate-800 border-emerald-500/40 shadow-sm'
                        : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-800/50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-bold text-slate-200">{t.tripCode}</span>
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                        t.status === 'DELAYED'
                          ? 'bg-amber-500/20 text-amber-300'
                          : 'bg-emerald-500/20 text-emerald-300'
                      }`}>
                        {t.status}
                      </span>
                    </div>

                    <div className="mt-2 text-slate-300 font-medium">
                      {t.originCity} ➔ {t.destinationCity}
                    </div>

                    <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                      <span>Driver: {t.driver?.fullName}</span>
                      <span className="font-mono text-emerald-400 font-bold">{t.currentSpeedKmh} km/h</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {selectedTrip && (
            <div className="mt-4 p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
              <div className="font-bold text-slate-200">Selected Telemetry Focus</div>
              <div className="text-[11px] text-slate-400 space-y-1">
                <div>Vehicle: <span className="text-slate-200 font-semibold">{selectedTrip.vehicle?.model}</span></div>
                <div>Plate: <span className="text-slate-200 font-mono">{selectedTrip.vehicle?.plateNumber}</span></div>
                <div>GPS Coords: <span className="text-slate-300 font-mono">{selectedTrip.currentLat?.toFixed(4)}, {selectedTrip.currentLng?.toFixed(4)}</span></div>
                <div>Est. Distance: <span className="text-slate-200 font-semibold">{selectedTrip.totalDistanceKm} km</span></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
