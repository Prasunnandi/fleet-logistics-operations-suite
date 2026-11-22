package com.fleetlogistics.modules.fleet.service;

import com.fleetlogistics.modules.fleet.entity.Driver;
import com.fleetlogistics.modules.fleet.entity.FuelLog;
import com.fleetlogistics.modules.fleet.entity.MaintenanceRecord;
import com.fleetlogistics.modules.fleet.entity.Vehicle;
import com.fleetlogistics.modules.fleet.repository.DriverRepository;
import com.fleetlogistics.modules.fleet.repository.FuelLogRepository;
import com.fleetlogistics.modules.fleet.repository.MaintenanceRecordRepository;
import com.fleetlogistics.modules.fleet.repository.VehicleRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class FleetService {

    private final VehicleRepository vehicleRepository;
    private final DriverRepository driverRepository;
    private final FuelLogRepository fuelLogRepository;
    private final MaintenanceRecordRepository maintenanceRepository;

    public FleetService(VehicleRepository vehicleRepository,
                        DriverRepository driverRepository,
                        FuelLogRepository fuelLogRepository,
                        MaintenanceRecordRepository maintenanceRepository) {
        this.vehicleRepository = vehicleRepository;
        this.driverRepository = driverRepository;
        this.fuelLogRepository = fuelLogRepository;
        this.maintenanceRepository = maintenanceRepository;
    }

    // Vehicle Operations
    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(Long id) {
        return vehicleRepository.findById(id);
    }

    public Vehicle createVehicle(Vehicle vehicle) {
        return vehicleRepository.save(vehicle);
    }

    public Vehicle updateVehicleStatus(Long id, Vehicle.VehicleStatus status) {
        Vehicle vehicle = vehicleRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found: " + id));
        vehicle.setStatus(status);
        return vehicleRepository.save(vehicle);
    }

    // Driver Operations
    public List<Driver> getAllDrivers() {
        return driverRepository.findAll();
    }

    public Optional<Driver> getDriverById(Long id) {
        return driverRepository.findById(id);
    }

    public Driver createDriver(Driver driver) {
        return driverRepository.save(driver);
    }

    public Driver assignVehicleToDriver(Long driverId, Long vehicleId) {
        Driver driver = driverRepository.findById(driverId)
                .orElseThrow(() -> new IllegalArgumentException("Driver not found: " + driverId));
        Vehicle vehicle = vehicleRepository.findById(vehicleId)
                .orElseThrow(() -> new IllegalArgumentException("Vehicle not found: " + vehicleId));
        
        driver.setAssignedVehicle(vehicle);
        driver.setStatus(Driver.DriverStatus.ON_DUTY);
        return driverRepository.save(driver);
    }

    // Fuel Logs
    public List<FuelLog> getAllFuelLogs() {
        return fuelLogRepository.findAll();
    }

    public FuelLog logFuel(FuelLog log) {
        return fuelLogRepository.save(log);
    }

    // Maintenance Records
    public List<MaintenanceRecord> getAllMaintenanceRecords() {
        return maintenanceRepository.findAll();
    }

    public MaintenanceRecord logMaintenance(MaintenanceRecord record) {
        return maintenanceRepository.save(record);
    }
}
