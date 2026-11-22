import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import LiveTrackingMap from './pages/LiveTrackingMap';
import IntelligenceLab from './pages/IntelligenceLab';
import FleetManager from './pages/FleetManager';
import ShipmentsDispatch from './pages/ShipmentsDispatch';
import { api } from './services/api';

export default function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [overview, setOverview] = useState(null);
  const [trips, setTrips] = useState([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    setIsRefreshing(true);
    try {
      const [ov, tr] = await Promise.all([
        api.getOverview(),
        api.getActiveTrips()
      ]);
      setOverview(ov);
      setTrips(tr);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRefreshing(false);
    }
  }

  return (
    <div className="flex bg-slate-950 min-h-screen text-slate-100">
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="flex-1 flex flex-col min-w-0">
        <Navbar onRefresh={loadData} isRefreshing={isRefreshing} />

        <main className="flex-1 p-6 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <Dashboard
              overview={overview}
              trips={trips}
              setActiveTab={setActiveTab}
            />
          )}

          {activeTab === 'tracking' && (
            <LiveTrackingMap trips={trips} />
          )}

          {activeTab === 'intelligence' && (
            <IntelligenceLab />
          )}

          {activeTab === 'fleet' && (
            <FleetManager />
          )}

          {activeTab === 'shipments' && (
            <ShipmentsDispatch />
          )}
        </main>
      </div>
    </div>
  );
}
