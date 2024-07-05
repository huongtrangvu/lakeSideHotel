package org.example.repository;

import org.example.model.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RoomRepository extends JpaRepository<Room, Long> {
    @Query(value = "select distinct room_type from room ", nativeQuery = true)
    List<String> findDistinctRoomTypes();
}
