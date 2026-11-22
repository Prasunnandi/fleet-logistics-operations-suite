package com.fleetlogistics.modules.fleet.repository;

import com.fleetlogistics.modules.fleet.entity.MaintenanceRecord;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MaintenanceRecordRepository extends JpaRepository<MaintenanceRecord, Long> {
    List<MaintenanceRecord> findByVehicleId(Long vehicleId);
    List<MaintenanceRecord> findByStatus(MaintenanceRecord.MaintenanceStatus status);

    @Query("SELECT SUM(m.cost) FROM MaintenanceRecord m WHERE m.vehicle.id = :vehicleId")
    Double sumMaintenanceCostByVehicleId(Long vehicleId);
}
