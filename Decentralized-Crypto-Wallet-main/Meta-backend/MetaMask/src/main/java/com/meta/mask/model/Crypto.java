package com.meta.mask.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "CRYPTO")
@SequenceGenerator(name = "crypto_seq", sequenceName = "CRYPTO_SEQ", allocationSize = 1)
public class Crypto {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "crypto_seq")
    private Long cryptoId;

    @NotBlank(message = "Crypto name is mandatory")
    @Size(max = 50)
    private String cryptoName;

    @NotBlank(message = "Crypto symbol is mandatory")
    @Size(max = 10)
    private String cryptoSymbol;

    @NotNull
    @Positive
    private Double cryptoPrice;

    private Double priceChange = 0.0;

    private Double priceChangePercent = 0.0;

    @NotNull
    @PositiveOrZero
    private Double availableQuantity;

    @ManyToOne
    @JoinColumn(name = "owner_id")
    @JsonBackReference
    private Owner owner;
}
