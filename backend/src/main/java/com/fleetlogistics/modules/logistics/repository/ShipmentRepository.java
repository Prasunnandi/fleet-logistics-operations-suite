package com.fleetlogistics.modules.logistics.repository;

import com.fleetlogistics.modules.logistics.entity.Shipment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ShipmentRepository extends JpaRepository<Shipment, Long> {
    Optional<Shipment> findByTrackingNumber(String trackingNumber);
    List<Shipment> findByStatus(Shipment.ShipmentStatus status);
    
    @Query("SELECT COUNT(s) FROM Shipment s WHERE s.status = 'DELIVERED'")
    Long countDelivered();

    @Query("SELECT COUNT(s) FROM Shipment s WHERE s.status = 'DELAYED'")
    Long countDelayed();

    @Query("SELECT COUNT(s) FROM Shipment s WHERE s.status = 'FAILED'")
    Long countFailed();

    @Query("SELECT COUNT(s) FROM Shipment s WHERE s.status = 'IN_TRANSIT'")
    Long countInTransit();
}
