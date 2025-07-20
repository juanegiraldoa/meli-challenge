package dev.juanes.model;

import dev.juanes.datatypes.Currency;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.With;

import java.math.BigDecimal;

@With
@Data
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "SELLERS")
public class Seller {
    @Id
    @Column(name = "ID")
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    @Column(name = "SITE", nullable = false)
    private String site;
    @Column(name = "TITLE", nullable = false)
    private String title;
    @Column(name = "NICKNAME", nullable = false)
    private String nickname;
    @Column(name = "PRICE", nullable = false)
    private BigDecimal price;
    @Column(name = "CURRENCY", nullable = false)
    @Enumerated(EnumType.STRING)
    private Currency currency;
}
