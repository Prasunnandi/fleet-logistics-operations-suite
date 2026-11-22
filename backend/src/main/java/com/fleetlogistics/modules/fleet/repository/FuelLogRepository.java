package com.fleetlogistics.modules.fleet.repository;

import com.fleetlogistics.modules.fleet.entity.FuelLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FuelLogRepository extends JpaRepository<FuelLog, Long> {
    List<FuelLog> findByVehicleId(Long vehicleId);
    List<FuelLog> findByDriverId(Long driverId);

    @Query("SELECT AVG(f.efficiencyKmPerLiter) FROM FuelLog f WHERE f.vehicle.model = :model")
    Double findAverageEfficiencyByVehicleModel(String model);
}
