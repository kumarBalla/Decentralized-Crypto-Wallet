package com.meta.mask.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.HashMap;
import java.util.Map;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "APP_USER")
@SequenceGenerator(name = "user_seq", sequenceName = "USER_SEQ", allocationSize = 1)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "user_seq")
    private Long userId;

    @NotBlank
    @Size(max = 50)
    private String userName;

    @NotBlank
    @Email
    @Column(unique = true)
    private String email;

    @NotBlank
    @Size(min = 6, max = 20)
    private String password;

    @NotNull
    @Min(0)
    private Integer age;

    @PositiveOrZero
    private Double walletBalance = 10000.0;

    @ElementCollection
    @CollectionTable(name = "USER_CRYPTO_HOLDINGS", joinColumns = @JoinColumn(name = "user_id"))
    @MapKeyColumn(name = "crypto_id")
    @Column(name = "quantity")
    private Map<Long, @PositiveOrZero Double> cryptoHoldings = new HashMap<>();
}
