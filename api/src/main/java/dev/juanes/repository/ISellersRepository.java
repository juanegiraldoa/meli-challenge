package dev.juanes.repository;

import dev.juanes.model.Seller;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ISellersRepository extends JpaRepository<Seller, String> {
}
