package com.fleetlogistics.modules.logistics.controller;

import com.fleetlogistics.modules.logistics.entity.*;
import com.fleetlogistics.modules.logistics.service.LogisticsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/logistics")
@Tag(name = "Logistics & Delivery Operations (RouteWise)", description = "APIs for shipment bookings, trip dispatches, live GPS tracking, and delivery failure workflows")
public class LogisticsController {

    private final LogisticsService logisticsService;

    public LogisticsController(LogisticsService logisticsService) {
        this.logisticsService = logisticsService;
    }

    @GetMapping("/shipments")
    @Operation(summary = "Get all shipments")
    public ResponseEntity<List<Shipment>> getShipments() {
        return ResponseEntity.ok(logisticsService.getAllShipments());
    }

    @PostMapping("/shipments")
    @Operation(summary = "Book a new shipment order")
    public ResponseEntity<Shipment> createShipment(@RequestBody Shipment shipment) {
        return ResponseEntity.ok(logisticsService.createShipment(shipment));
    }

    @PatchMapping("/shipments/{id}/status")
    @Operation(summary = "Update shipment lifecycle status")
    public ResponseEntity<Shipment> updateShipmentStatus(@PathVariable Long id, @RequestParam Shipment.ShipmentStatus status) {
        return ResponseEntity.ok(logisticsService.updateShipmentStatus(id, status));
    }

    @GetMapping("/trips")
    @Operation(summary = "Get all scheduled and active trips")
    public ResponseEntity<List<TripSchedule>> getTrips() {
        return ResponseEntity.ok(logisticsService.getAllTrips());
    }

    @GetMapping("/trips/active")
    @Operation(summary = "Get currently active in-transit trips with live GPS locations")
    public ResponseEntity<List<TripSchedule>> getActiveTrips() {
        return ResponseEntity.ok(logisticsService.getActiveTrips());
    }

    @PostMapping("/trips")
    @Operation(summary = "Schedule a new trip dispatch")
    public ResponseEntity<TripSchedule> createTrip(@RequestBody TripSchedule trip) {
        return ResponseEntity.ok(logisticsService.createTrip(trip));
    }

    @PatchMapping("/trips/{id}/telemetry")
    @Operation(summary = "Ingest real-time GPS telemetry (latitude, longitude, speed)")
    public ResponseEntity<TripSchedule> updateTelemetry(@PathVariable Long id,
                                                        @RequestParam Double lat,
                                                        @RequestParam Double lng,
                                                        @RequestParam Double speedKmh) {
        return ResponseEntity.ok(logisticsService.updateTripCoordinates(id, lat, lng, speedKmh));
    }

    @GetMapping("/trips/{id}/stops")
    @Operation(summary = "Get sequential delivery stops for a trip")
    public ResponseEntity<List<DeliveryStop>> getTripStops(@PathVariable Long id) {
        return ResponseEntity.ok(logisticsService.getStopsForTrip(id));
    }

    @GetMapping("/failed-deliveries")
    @Operation(summary = "List all failed and exception delivery events")
    public ResponseEntity<List<FailedDeliveryEvent>> getFailedDeliveries() {
        return ResponseEntity.ok(logisticsService.getAllFailedEvents());
    }

    @PostMapping("/failed-deliveries/{id}/retry")
    @Operation(summary = "Schedule a delivery retry with corrective instructions")
    public ResponseEntity<FailedDeliveryEvent> scheduleRetry(@PathVariable Long id, @RequestBody(required = false) String notes) {
        return ResponseEntity.ok(logisticsService.scheduleRetry(id, notes != null ? notes : "Rescheduled for next business window"));
    }
}
