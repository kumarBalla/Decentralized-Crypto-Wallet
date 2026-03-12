package com.meta.mask.repository;

import com.meta.mask.model.Crypto;
import com.meta.mask.model.User;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CryptoRepository extends JpaRepository<Crypto, Long> {

    List<Crypto> findByOwnerOwnerId(Long ownerId);

    @Query("SELECT CASE WHEN COUNT(c) > 0 THEN TRUE ELSE FALSE END " +
           "FROM Crypto c WHERE c.owner.ownerId = :ownerId AND UPPER(c.cryptoName) = UPPER(:cryptoName)")
    boolean existsByOwnerOwnerIdAndCryptoNameIgnoreCase(@Param("ownerId") Long ownerId,
                                                        @Param("cryptoName") String cryptoName);

    @Query("SELECT c FROM Crypto c WHERE c.owner.ownerId = :ownerId AND UPPER(c.cryptoName) = UPPER(:cryptoName)")
    Optional<Crypto> findByOwnerIdAndCryptoNameIgnoreCase(@Param("ownerId") Long ownerId,
                                                          @Param("cryptoName") String cryptoName);

    List<Crypto> findByCryptoNameIgnoreCase(String cryptoName);

    @Query("SELECT c FROM Crypto c WHERE c.owner.ownerId = :ownerId AND LOWER(c.cryptoName) = LOWER(:cryptoName)")
    Optional<Crypto> findByOwnerAndCryptoName(@Param("ownerId") Long ownerId,
                                             @Param("cryptoName") String cryptoName);

	Optional<User> findByOwnerOwnerIdAndCryptoId(Long ownerId, Long cryptoId);


}
