package com.fleetlogistics.modules.logistics.repository;

import com.fleetlogistics.modules.logistics.entity.DeliveryStop;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeliveryStopRepository extends JpaRepository<DeliveryStop, Long> {
    List<DeliveryStop> findByTripScheduleIdOrderBySequenceIndexAsc(Long tripId);
    List<DeliveryStop> findByStatus(DeliveryStop.StopStatus status);
}
