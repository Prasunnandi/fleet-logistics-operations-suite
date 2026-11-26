/**
 * Capacitated Vehicle Routing Problem (CVRP) & Dijkstra Route Optimization Engine
 * Computes multi-stop route assignments with vehicle weight/volume capacity limits,
 * Clarke-Wright savings heuristics, and 2-Opt local search trajectory refinement.
 */

/**
 * Calculate Great-Circle distance using Haversine formula in kilometers
 */
export function haversineDistanceKm(coord1, coord2) {
  const R = 6371.0; // Earth radius in km
  const lat1Rad = (coord1.lat * Math.PI) / 180;
  const lat2Rad = (coord2.lat * Math.PI) / 180;
  const deltaLat = ((coord2.lat - coord1.lat) * Math.PI) / 180;
  const deltaLon = ((coord2.lon - coord1.lon) * Math.PI) / 180;

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) * Math.cos(lat2Rad) * Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Number((R * c).toFixed(3));
}

/**
 * Dijkstra's Shortest Path on a directed graph with positive edge weights
 */
export function dijkstraShortestPath(graph, startNode, targetNode) {
  const distances = {};
  const previous = {};
  const unvisited = new Set(Object.keys(graph));

  for (const node of unvisited) {
    distances[node] = Infinity;
  }
  distances[startNode] = 0;

  while (unvisited.size > 0) {
    let closestNode = null;
    let smallestDist = Infinity;

    for (const node of unvisited) {
      if (distances[node] < smallestDist) {
        smallestDist = distances[node];
        closestNode = node;
      }
    }

    if (!closestNode || distances[closestNode] === Infinity) break;
    if (closestNode === targetNode) break;

    unvisited.delete(closestNode);

    const neighbors = graph[closestNode] || {};
    for (const [neighbor, weight] of Object.entries(neighbors)) {
      if (!unvisited.has(neighbor)) continue;
      const alt = distances[closestNode] + weight;
      if (alt < distances[neighbor]) {
        distances[neighbor] = alt;
        previous[neighbor] = closestNode;
      }
    }
  }

  // Reconstruct path
  const path = [];
  let curr = targetNode;
  while (curr) {
    path.unshift(curr);
    curr = previous[curr];
  }

  return {
    path: path[0] === startNode ? path : [],
    distanceKm: distances[targetNode] !== Infinity ? distances[targetNode] : null
  };
}

/**
 * 2-Opt local search heuristic to untangle route crossings
 */
export function twoOptRouteRefinement(routeStops, distanceFn) {
  let improved = true;
  let bestRoute = [...routeStops];

  const calculateRouteDistance = (stops) => {
    let dist = 0;
    for (let i = 0; i < stops.length - 1; i++) {
      dist += distanceFn(stops[i], stops[i + 1]);
    }
    return dist;
  };

  let bestDistance = calculateRouteDistance(bestRoute);

  while (improved) {
    improved = false;
    for (let i = 1; i < bestRoute.length - 2; i++) {
      for (let k = i + 1; k < bestRoute.length - 1; k++) {
        // Reverse route segment between i and k
        const newRoute = [
          ...bestRoute.slice(0, i),
          ...bestRoute.slice(i, k + 1).reverse(),
          ...bestRoute.slice(k + 1)
        ];
        const newDist = calculateRouteDistance(newRoute);
        if (newDist < bestDistance - 0.001) {
          bestRoute = newRoute;
          bestDistance = newDist;
          improved = true;
          break;
        }
      }
      if (improved) break;
    }
  }

  return { route: bestRoute, totalDistanceKm: Number(bestDistance.toFixed(2)) };
}

export class CapacitatedVrpSolver {
  /**
   * @param {Object} depot - Distribution Center / Hub { id, lat, lon }
   * @param {Array<Object>} vehicles - Fleet specifications [{ id, capacityKg, maxStops }]
   * @param {Object} [options]
   */
  constructor(depot, vehicles, options = {}) {
    this.depot = depot || { id: 'DEPOT-01', lat: 37.7749, lon: -122.4194 };
    this.vehicles = vehicles && vehicles.length > 0 ? vehicles : [
      { id: 'VAN-101', capacityKg: 1200, maxStops: 12 },
      { id: 'VAN-102', capacityKg: 1200, maxStops: 12 }
    ];
    this.averageSpeedKmh = options.averageSpeedKmh || 45.0; // Average commercial delivery speed
    this.stopServiceTimeMin = options.stopServiceTimeMin || 10; // Service time per stop
  }

  /**
   * Solve multi-vehicle capacitated delivery routes using Clarke-Wright savings heuristic
   * @param {Array<Object>} deliveryOrders - List of customer deliveries [{ id, lat, lon, demandKg, customerName }]
   * @returns {Object} Optimized fleet itinerary, vehicle routes, and fleet metrics
   */
  solveRoutes(deliveryOrders) {
    if (!deliveryOrders || deliveryOrders.length === 0) {
      return {
        vehicleAssignments: [],
        unservicedOrders: [],
        totalFleetDistanceKm: 0,
        totalFleetTimeMin: 0,
        fleetUtilizationPct: 0
      };
    }

    const n = deliveryOrders.length;
    const depot = this.depot;

    // 1. Calculate savings matrix s(i, j) = d(depot, i) + d(depot, j) - d(i, j)
    const savingsList = [];
    for (let i = 0; i < n; i++) {
      for (let j = i + 1; j < n; j++) {
        const orderA = deliveryOrders[i];
        const orderB = deliveryOrders[j];

        const dDepotA = haversineDistanceKm(depot, orderA);
        const dDepotB = haversineDistanceKm(depot, orderB);
        const dAB = haversineDistanceKm(orderA, orderB);

        const savings = dDepotA + dDepotB - dAB;
        if (savings > 0) {
          savingsList.push({
            i,
            j,
            orderA,
            orderB,
            savings
          });
        }
      }
    }

    savingsList.sort((a, b) => b.savings - a.savings);

    // Initial individual routes: Depot -> Customer -> Depot
    const orderRoutes = new Map(); // orderId -> Array of orders in route
    const routeDemands = new Map(); // route reference -> cumulative weight

    deliveryOrders.forEach((order) => {
      const initialRoute = [order];
      orderRoutes.set(order.id, initialRoute);
      routeDemands.set(initialRoute, order.demandKg || 10);
    });

    const maxVehicleCap = Math.max(...this.vehicles.map((v) => v.capacityKg));

    // Merge routes based on descending savings
    for (const save of savingsList) {
      const routeA = orderRoutes.get(save.orderA.id);
      const routeB = orderRoutes.get(save.orderB.id);

      if (!routeA || !routeB || routeA === routeB) continue;

      const demandA = routeDemands.get(routeA) || 0;
      const demandB = routeDemands.get(routeB) || 0;
      const mergedDemand = demandA + demandB;

      // Check capacity constraint
      if (mergedDemand > maxVehicleCap) continue;

      // Check endpoints: A must be last in routeA, B must be first in routeB (or reversed)
      const isAAtEnd = routeA[routeA.length - 1].id === save.orderA.id;
      const isBAtStart = routeB[0].id === save.orderB.id;

      if (isAAtEnd && isBAtStart) {
        const mergedRoute = [...routeA, ...routeB];
        routeDemands.set(mergedRoute, mergedDemand);
        routeDemands.delete(routeA);
        routeDemands.delete(routeB);

        mergedRoute.forEach((o) => orderRoutes.set(o.id, mergedRoute));
      }
    }

    // Extract unique merged clusters
    const uniqueRoutes = Array.from(new Set(orderRoutes.values()));
    const vehicleAssignments = [];
    const unservicedOrders = [];

    let totalFleetKm = 0;
    let totalFleetMin = 0;
    let totalPayloadDelivered = 0;
    let totalFleetCapacity = 0;

    // Assign routes to available vehicles
    const availableVehicles = [...this.vehicles].sort((a, b) => b.capacityKg - a.capacityKg);

    for (let r = 0; r < uniqueRoutes.length; r++) {
      const cluster = uniqueRoutes[r];
      const demand = cluster.reduce((sum, o) => sum + (o.demandKg || 10), 0);

      // Find suitable vehicle
      const vIndex = availableVehicles.findIndex((v) => v.capacityKg >= demand);

      if (vIndex !== -1) {
        const vehicle = availableVehicles.splice(vIndex, 1)[0];

        // Refine route order with 2-Opt local search
        const fullStopsWithDepot = [depot, ...cluster, depot];
        const refined = twoOptRouteRefinement(fullStopsWithDepot, haversineDistanceKm);

        const transitTimeMin = (refined.totalDistanceKm / this.averageSpeedKmh) * 60;
        const serviceTimeMin = cluster.length * this.stopServiceTimeMin;
        const totalTimeMin = Math.round(transitTimeMin + serviceTimeMin);

        totalFleetKm += refined.totalDistanceKm;
        totalFleetMin += totalTimeMin;
        totalPayloadDelivered += demand;
        totalFleetCapacity += vehicle.capacityKg;

        vehicleAssignments.push({
          vehicleId: vehicle.id,
          capacityKg: vehicle.capacityKg,
          carriedPayloadKg: demand,
          utilizationPct: Number(((demand / vehicle.capacityKg) * 100).toFixed(1)),
          stopCount: cluster.length,
          totalDistanceKm: refined.totalDistanceKm,
          estimatedDurationMin: totalTimeMin,
          stops: refined.route.map((s, idx) => ({
            sequence: idx,
            id: s.id,
            name: s.customerName || (idx === 0 || idx === refined.route.length - 1 ? 'Depot Hub' : `Stop #${idx}`),
            lat: s.lat,
            lon: s.lon,
            demandKg: s.demandKg || 0
          }))
        });
      } else {
        // Vehicle fleet capacity exhausted
        cluster.forEach((o) => unservicedOrders.push(o));
      }
    }

    const fleetUtilizationPct =
      totalFleetCapacity > 0 ? Number(((totalPayloadDelivered / totalFleetCapacity) * 100).toFixed(1)) : 0;

    return {
      totalFleetDistanceKm: Number(totalFleetKm.toFixed(2)),
      totalFleetTimeMin: totalFleetMin,
      fleetUtilizationPct,
      assignedVehicleCount: vehicleAssignments.length,
      vehicleAssignments,
      unservicedOrders
    };
  }
}

// Dual ESM & CommonJS compatibility
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    haversineDistanceKm,
    dijkstraShortestPath,
    twoOptRouteRefinement,
    CapacitatedVrpSolver
  };
}

export default CapacitatedVrpSolver;
