package com.meta.mask.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "OWNER")
@SequenceGenerator(name = "owner_seq", sequenceName = "OWNER_SEQ", allocationSize = 1)
public class Owner {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator = "owner_seq")
    private Long ownerId;

    @NotBlank
    private String ownerName;

    @Email
    @NotBlank
    private String email;

    @NotBlank
    private String password;

    // ✅ One owner can have multiple cryptos
    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference
    private List<Crypto> cryptos;
}
