package com.fleetlogistics.modules.fleet.repository;

import com.fleetlogistics.modules.fleet.entity.Vehicle;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface VehicleRepository extends JpaRepository<Vehicle, Long> {
    Optional<Vehicle> findByPlateNumber(String plateNumber);
    List<Vehicle> findByStatus(Vehicle.VehicleStatus status);
    List<Vehicle> findByVehicleType(Vehicle.VehicleType vehicleType);
}
