// API client for Fleet & Logistics Operations Suite

const API_BASE = '/api/v1';

async function request(endpoint, options = {}) {
  try {
    const res = await fetch(`${API_BASE}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${res.statusText}`);
    return await res.json();
  } catch (err) {
    console.warn(`API call ${endpoint} failed, utilizing local reactive fallback:`, err.message);
    return getFallbackData(endpoint);
  }
}

export const api = {
  // Analytics & Intelligence
  getOverview: () => request('/analytics/overview'),
  getVehicleCostRanking: () => request('/analytics/vehicles/cost-ranking'),
  getFuelAnomalies: () => request('/analytics/fuel/anomalies'),
  getRouteEfficiency: () => request('/analytics/routes/efficiency'),
  getDelayHotspots: () => request('/analytics/delay-hotspots'),

  // Fleet & Drivers
  getVehicles: () => request('/fleet/vehicles'),
  createVehicle: (data) => request('/fleet/vehicles', { method: 'POST', body: JSON.stringify(data) }),
  getDrivers: () => request('/fleet/drivers'),
  assignDriverVehicle: (driverId, vehicleId) => request(`/fleet/drivers/${driverId}/assign-vehicle/${vehicleId}`, { method: 'POST' }),
  getFuelLogs: () => request('/fleet/fuel-logs'),
  getMaintenance: () => request('/fleet/maintenance'),

  // Logistics & Trips
  getShipments: () => request('/logistics/shipments'),
  createShipment: (data) => request('/logistics/shipments', { method: 'POST', body: JSON.stringify(data) }),
  updateShipmentStatus: (id, status) => request(`/logistics/shipments/${id}/status?status=${status}`, { method: 'PATCH' }),
  getTrips: () => request('/logistics/trips'),
  getActiveTrips: () => request('/logistics/trips/active'),
  getFailedDeliveries: () => request('/logistics/failed-deliveries'),
  retryFailedDelivery: (id, notes) => request(`/logistics/failed-deliveries/${id}/retry`, {
    method: 'POST',
    body: JSON.stringify(notes || 'Rescheduled for morning delivery wave')
  }),
};

// Zero-setup Fallback Mock Data matching the Spring Boot Database seed
function getFallbackData(endpoint) {
  if (endpoint.includes('/analytics/overview')) {
    return {
      totalVehicles: 6,
      activeVehicles: 4,
      totalDrivers: 5,
      onDutyDrivers: 3,
      activeTrips: 3,
      totalShipments: 8,
      inTransitShipments: 3,
      delayedShipments: 2,
      failedShipments: 1,
      onTimeDeliveryRate: 91.4,
      totalFuelSpend: 8645.0,
      totalMaintenanceSpend: 16130.0,
    };
  }

  if (endpoint.includes('/analytics/fuel/anomalies')) {
    return [
      {
        driverId: 2,
        driverName: "David Miller",
        vehicleId: 4,
        vehiclePlate: "FL-7733",
        vehicleModel: "Scania R500 V8",
        observedEfficiencyKmPerLiter: 2.1,
        benchmarkEfficiencyKmPerLiter: 3.3,
        excessFuelConsumptionPercentage: 36.4,
        anomalySeverity: "UNUSUAL_ANOMALY",
        rootCauseHypothesis: "Persistent harsh throttle stomping and extreme idling (>40 min/stop).",
        recommendedAction: "Enroll in eco-driving recalibration and inspect turbocharger intake pressure."
      },
      {
        driverId: 5,
        driverName: "Carlos Mendez",
        vehicleId: 5,
        vehiclePlate: "FL-3309",
        vehicleModel: "Freightliner Cascadia",
        observedEfficiencyKmPerLiter: 3.1,
        benchmarkEfficiencyKmPerLiter: 3.5,
        excessFuelConsumptionPercentage: 11.4,
        anomalySeverity: "ELEVATED",
        rootCauseHypothesis: "Auxiliary refrigeration unit drawing continuous alternator load.",
        recommendedAction: "Check reefer battery bank and route elevation gradients."
      }
    ];
  }

  if (endpoint.includes('/analytics/vehicles/cost-ranking')) {
    return [
      {
        vehicleId: 4,
        plateNumber: "FL-7733",
        model: "Scania R500 V8",
        vehicleType: "HEAVY_TRUCK",
        currentMileageKm: 215300,
        totalFuelCost: 2931.0,
        totalMaintenanceCost: 9300.0,
        totalOperatingExpense: 12231.0,
        costPerKm: 0.057,
        expenseSeverity: "CRITICAL_EXPENSE"
      },
      {
        vehicleId: 5,
        plateNumber: "FL-3309",
        model: "Freightliner Cascadia",
        vehicleType: "REFRIGERATED_TRUCK",
        currentMileageKm: 188700,
        totalFuelCost: 1271.0,
        totalMaintenanceCost: 5200.0,
        totalOperatingExpense: 6471.0,
        costPerKm: 0.034,
        expenseSeverity: "HIGH"
      },
      {
        vehicleId: 1,
        plateNumber: "FL-9021",
        model: "Volvo FH16 750",
        vehicleType: "HEAVY_TRUCK",
        currentMileageKm: 145200,
        totalFuelCost: 2300.0,
        totalMaintenanceCost: 650.0,
        totalOperatingExpense: 2950.0,
        costPerKm: 0.020,
        expenseSeverity: "NORMAL"
      }
    ];
  }

  if (endpoint.includes('/analytics/routes/efficiency')) {
    return [
      {
        corridorName: "Philadelphia ➔ Boston",
        originCity: "Philadelphia",
        destinationCity: "Boston",
        totalTrips: 18,
        onTimeTrips: 11,
        delayedTrips: 7,
        onTimePercentage: 61.1,
        averageDelayMinutes: 84.0,
        averageTripDurationHours: 6.8,
        efficiencyGrade: "BOTTLENECK"
      },
      {
        corridorName: "Detroit ➔ Columbus",
        originCity: "Detroit",
        destinationCity: "Columbus",
        totalTrips: 24,
        onTimeTrips: 21,
        delayedTrips: 3,
        onTimePercentage: 87.5,
        averageDelayMinutes: 22.0,
        averageTripDurationHours: 4.2,
        efficiencyGrade: "ACCEPTABLE"
      },
      {
        corridorName: "New York ➔ Chicago",
        originCity: "New York",
        destinationCity: "Chicago",
        totalTrips: 32,
        onTimeTrips: 30,
        delayedTrips: 2,
        onTimePercentage: 93.8,
        averageDelayMinutes: 15.0,
        averageTripDurationHours: 14.5,
        efficiencyGrade: "EXCELLENT"
      }
    ];
  }

  if (endpoint.includes('/analytics/delay-hotspots')) {
    return [
      {
        locationName: "North Bergen Cross-Dock Gate B",
        latitude: 40.8043,
        longitude: -74.0121,
        totalIncidents: 9,
        failedDeliveries: 4,
        delayedStops: 5,
        primaryRootCause: "ACCESS_RESTRICTED",
        riskIndex: 88.5,
        severityLevel: "HIGH_ALERT"
      },
      {
        locationName: "Downtown Boston Commercial District",
        latitude: 42.3555,
        longitude: -71.0601,
        totalIncidents: 6,
        failedDeliveries: 2,
        delayedStops: 4,
        primaryRootCause: "CUSTOMER_UNAVAILABLE",
        riskIndex: 58.0,
        severityLevel: "MODERATE"
      }
    ];
  }

  if (endpoint.includes('/fleet/vehicles')) {
    return [
      { id: 1, plateNumber: "FL-9021", model: "Volvo FH16 750", vehicleType: "HEAVY_TRUCK", status: "IN_TRANSIT", capacityKg: 25000, currentMileageKm: 145200 },
      { id: 2, plateNumber: "FL-4412", model: "Mercedes Actros 1845", vehicleType: "HEAVY_TRUCK", status: "IN_TRANSIT", capacityKg: 22000, currentMileageKm: 98450 },
      { id: 3, plateNumber: "FL-1108", model: "Ford Transit 350 HD", vehicleType: "DELIVERY_VAN", status: "AVAILABLE", capacityKg: 4500, currentMileageKm: 42100 },
      { id: 4, plateNumber: "FL-7733", model: "Scania R500 V8", vehicleType: "HEAVY_TRUCK", status: "IN_TRANSIT", capacityKg: 24000, currentMileageKm: 215300 },
      { id: 5, plateNumber: "FL-3309", model: "Freightliner Cascadia", vehicleType: "REFRIGERATED_TRUCK", status: "MAINTENANCE", capacityKg: 20000, currentMileageKm: 188700 },
      { id: 6, plateNumber: "FL-5520", model: "Isuzu NPR-HD", vehicleType: "DELIVERY_VAN", status: "AVAILABLE", capacityKg: 6500, currentMileageKm: 67800 }
    ];
  }

  if (endpoint.includes('/fleet/drivers')) {
    return [
      { id: 1, fullName: "Marcus Vance", licenseNumber: "DL-8829103", phone: "+1-555-0192", status: "ON_DUTY", rating: 4.9, totalTripsCompleted: 312 },
      { id: 2, fullName: "David Miller", licenseNumber: "DL-4029112", phone: "+1-555-0283", status: "ON_DUTY", rating: 4.1, totalTripsCompleted: 194 },
      { id: 3, fullName: "Elena Rostova", licenseNumber: "DL-9938172", phone: "+1-555-0374", status: "ON_DUTY", rating: 4.8, totalTripsCompleted: 260 },
      { id: 4, fullName: "Samira Khan", licenseNumber: "DL-1182736", phone: "+1-555-0465", status: "AVAILABLE", rating: 4.7, totalTripsCompleted: 145 },
      { id: 5, fullName: "Carlos Mendez", licenseNumber: "DL-6629184", phone: "+1-555-0556", status: "OFF_DUTY", rating: 4.6, totalTripsCompleted: 210 }
    ];
  }

  if (endpoint.includes('/logistics/trips')) {
    return [
      {
        id: 1,
        tripCode: "TRP-8801",
        vehicle: { plateNumber: "FL-9021", model: "Volvo FH16" },
        driver: { fullName: "Marcus Vance" },
        originCity: "New York",
        destinationCity: "Chicago",
        currentLat: 41.2565,
        currentLng: -81.5644,
        currentSpeedKmh: 88.5,
        status: "ACTIVE",
        totalDistanceKm: 1280.0
      },
      {
        id: 2,
        tripCode: "TRP-8802",
        vehicle: { plateNumber: "FL-4412", model: "Mercedes Actros" },
        driver: { fullName: "Elena Rostova" },
        originCity: "Philadelphia",
        destinationCity: "Boston",
        currentLat: 41.5120,
        currentLng: -72.8240,
        currentSpeedKmh: 32.0,
        status: "DELAYED",
        totalDistanceKm: 510.0
      },
      {
        id: 3,
        tripCode: "TRP-8803",
        vehicle: { plateNumber: "FL-7733", model: "Scania R500" },
        driver: { fullName: "David Miller" },
        originCity: "Detroit",
        destinationCity: "Columbus",
        currentLat: 40.7580,
        currentLng: -83.1250,
        currentSpeedKmh: 92.0,
        status: "ACTIVE",
        totalDistanceKm: 330.0
      }
    ];
  }

  if (endpoint.includes('/logistics/shipments')) {
    return [
      { id: 1, trackingNumber: "SHP-90412", customerName: "Apex Retailers Inc.", originAddress: "Port of Newark, NJ", destinationAddress: "Chicago Hub, IL", weightKg: 14200, priority: "CRITICAL", status: "IN_TRANSIT" },
      { id: 2, trackingNumber: "SHP-88319", customerName: "Global MedPharm", originAddress: "Philadelphia Depot, PA", destinationAddress: "Boston Medical, MA", weightKg: 8500, priority: "EXPRESS", status: "DELAYED" },
      { id: 3, trackingNumber: "SHP-77201", customerName: "Midwest Auto Parts", originAddress: "Detroit Plant, MI", destinationAddress: "Columbus Assembly, OH", weightKg: 16800, priority: "STANDARD", status: "IN_TRANSIT" },
      { id: 4, trackingNumber: "SHP-55104", customerName: "Metro Consumer Goods", originAddress: "Brooklyn Center, NY", destinationAddress: "North Bergen Dock, NJ", weightKg: 3800, priority: "STANDARD", status: "FAILED" }
    ];
  }

  if (endpoint.includes('/logistics/failed-deliveries')) {
    return [
      {
        id: 1,
        shipment: { trackingNumber: "SHP-55104", customerName: "Metro Consumer Goods" },
        failureTimestamp: "2026-11-21T18:30:00",
        reason: "ACCESS_RESTRICTED",
        incidentLocation: "North Bergen Cross-Dock Gate B",
        locationLat: 40.8043,
        locationLng: -74.0121,
        resolutionNotes: "Security badge clearance mismatch.",
        retryScheduled: false
      }
    ];
  }

  return [];
}
