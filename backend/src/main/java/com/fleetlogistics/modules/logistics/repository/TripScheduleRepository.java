package com.fleetlogistics.modules.logistics.repository;

import com.fleetlogistics.modules.logistics.entity.TripSchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TripScheduleRepository extends JpaRepository<TripSchedule, Long> {
    Optional<TripSchedule> findByTripCode(String tripCode);
    List<TripSchedule> findByStatus(TripSchedule.TripStatus status);
    List<TripSchedule> findByDriverId(Long driverId);
    List<TripSchedule> findByVehicleId(Long vehicleId);
}
