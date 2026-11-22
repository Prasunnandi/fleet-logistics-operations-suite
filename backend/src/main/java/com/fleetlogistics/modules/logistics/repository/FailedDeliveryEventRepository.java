package com.fleetlogistics.modules.logistics.repository;

import com.fleetlogistics.modules.logistics.entity.FailedDeliveryEvent;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface FailedDeliveryEventRepository extends JpaRepository<FailedDeliveryEvent, Long> {
    List<FailedDeliveryEvent> findByReason(FailedDeliveryEvent.FailureReason reason);
    List<FailedDeliveryEvent> findByRetryScheduled(Boolean retryScheduled);

    @Query("SELECT f.incidentLocation, COUNT(f) FROM FailedDeliveryEvent f GROUP BY f.incidentLocation ORDER BY COUNT(f) DESC")
    List<Object[]> countFailuresByLocation();
}
