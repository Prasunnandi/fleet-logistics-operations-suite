package com.fleetlogistics.modules.fleet.controller;

import com.fleetlogistics.modules.fleet.entity.Driver;
import com.fleetlogistics.modules.fleet.entity.FuelLog;
import com.fleetlogistics.modules.fleet.entity.MaintenanceRecord;
import com.fleetlogistics.modules.fleet.entity.Vehicle;
import com.fleetlogistics.modules.fleet.service.FleetService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/fleet")
@Tag(name = "Fleet & Vehicle Management (FleetPulse)", description = "APIs for vehicles, driver assignments, fuel expenses, and maintenance logs")
public class FleetController {

    private final FleetService fleetService;

    public FleetController(FleetService fleetService) {
        this.fleetService = fleetService;
    }

    @GetMapping("/vehicles")
    @Operation(summary = "List all registered vehicles")
    public ResponseEntity<List<Vehicle>> getVehicles() {
        return ResponseEntity.ok(fleetService.getAllVehicles());
    }

    @PostMapping("/vehicles")
    @Operation(summary = "Register a new vehicle")
    public ResponseEntity<Vehicle> createVehicle(@RequestBody Vehicle vehicle) {
        return ResponseEntity.ok(fleetService.createVehicle(vehicle));
    }

    @PatchMapping("/vehicles/{id}/status")
    @Operation(summary = "Update vehicle operational status")
    public ResponseEntity<Vehicle> updateVehicleStatus(@PathVariable Long id, @RequestParam Vehicle.VehicleStatus status) {
        return ResponseEntity.ok(fleetService.updateVehicleStatus(id, status));
    }

    @GetMapping("/drivers")
    @Operation(summary = "List all registered drivers")
    public ResponseEntity<List<Driver>> getDrivers() {
        return ResponseEntity.ok(fleetService.getAllDrivers());
    }

    @PostMapping("/drivers")
    @Operation(summary = "Register a new driver")
    public ResponseEntity<Driver> createDriver(@RequestBody Driver driver) {
        return ResponseEntity.ok(fleetService.createDriver(driver));
    }

    @PostMapping("/drivers/{driverId}/assign-vehicle/{vehicleId}")
    @Operation(summary = "Assign a vehicle to a driver")
    public ResponseEntity<Driver> assignVehicle(@PathVariable Long driverId, @PathVariable Long vehicleId) {
        return ResponseEntity.ok(fleetService.assignVehicleToDriver(driverId, vehicleId));
    }

    @GetMapping("/fuel-logs")
    @Operation(summary = "Get all fuel logs")
    public ResponseEntity<List<FuelLog>> getFuelLogs() {
        return ResponseEntity.ok(fleetService.getAllFuelLogs());
    }

    @PostMapping("/fuel-logs")
    @Operation(summary = "Record a new fuel expense log")
    public ResponseEntity<FuelLog> logFuel(@RequestBody FuelLog fuelLog) {
        return ResponseEntity.ok(fleetService.logFuel(fuelLog));
    }

    @GetMapping("/maintenance")
    @Operation(summary = "Get all maintenance service history")
    public ResponseEntity<List<MaintenanceRecord>> getMaintenance() {
        return ResponseEntity.ok(fleetService.getAllMaintenanceRecords());
    }

    @PostMapping("/maintenance")
    @Operation(summary = "Schedule or record maintenance work")
    public ResponseEntity<MaintenanceRecord> logMaintenance(@RequestBody MaintenanceRecord record) {
        return ResponseEntity.ok(fleetService.logMaintenance(record));
    }
}
