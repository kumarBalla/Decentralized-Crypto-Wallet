package com.meta.mask.service;

import com.meta.mask.model.Crypto;
import com.meta.mask.model.Owner;
import com.meta.mask.repository.CryptoRepository;
import com.meta.mask.repository.OwnerRepository;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class CryptoService {

    private final CryptoRepository cryptoRepo;
    private final OwnerRepository ownerRepo;

    public CryptoService(CryptoRepository cryptoRepo, OwnerRepository ownerRepo) {
        this.cryptoRepo = cryptoRepo;
        this.ownerRepo = ownerRepo;
    }

    // ✅ Add specific owner crypto
    public Crypto addCryptoForOwner(Long ownerId, Crypto crypto) {
        Owner owner = ownerRepo.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        boolean exists = cryptoRepo.existsByOwnerOwnerIdAndCryptoNameIgnoreCase(ownerId, crypto.getCryptoName());
        if (exists) {
            throw new RuntimeException("Crypto already exists for this owner");
        }

        crypto.setOwner(owner);
        return cryptoRepo.save(crypto);
    }

    // ✅ Update specific owner crypto
    public Crypto updateCryptoForOwner(Long ownerId, Long cryptoId, Crypto updatedCrypto) {
        Crypto existing = cryptoRepo.findById(cryptoId)
                .orElseThrow(() -> new RuntimeException("Crypto not found"));

        if (!existing.getOwner().getOwnerId().equals(ownerId)) {
            throw new RuntimeException("This crypto does not belong to this owner!");
        }

        existing.setCryptoPrice(updatedCrypto.getCryptoPrice());
        existing.setAvailableQuantity(updatedCrypto.getAvailableQuantity());
        existing.setPriceChange(updatedCrypto.getPriceChange());
        existing.setPriceChangePercent(updatedCrypto.getPriceChangePercent());

        return cryptoRepo.save(existing);
    }

    // ✅ Delete specific owner crypto
    public void deleteCryptoForOwner(Long ownerId, Long cryptoId) {
        Crypto crypto = cryptoRepo.findById(cryptoId)
                .orElseThrow(() -> new RuntimeException("Crypto not found"));

        if (!crypto.getOwner().getOwnerId().equals(ownerId)) {
            throw new RuntimeException("This crypto does not belong to this owner!");
        }

        cryptoRepo.delete(crypto);
    }

    // ✅ Get cryptos of a single owner
    public List<Crypto> getByOwner(Long ownerId) {
        return cryptoRepo.findByOwnerOwnerId(ownerId);
    }

    public List<Crypto> getMergedCryptoDetails() {
        List<Crypto> allCryptos = cryptoRepo.findAll();

        // Group cryptos by name
        Map<String, List<Crypto>> grouped = allCryptos.stream()
                .collect(Collectors.groupingBy(Crypto::getCryptoName));

        return grouped.entrySet().stream().map(entry -> {
            List<Crypto> list = entry.getValue();
            Crypto base = list.get(0);

            // ✅ Total quantity
            double totalQty = list.stream()
                    .mapToDouble(Crypto::getAvailableQuantity)
                    .sum();

            // ✅ Average price across owners
            double avgPrice = list.stream()
                    .mapToDouble(Crypto::getCryptoPrice)
                    .average()
                    .orElse(0.0);

            // ✅ Use average % change too
            double avgChange = list.stream()
                    .mapToDouble(Crypto::getPriceChange)
                    .average()
                    .orElse(0.0);

            double avgChangePercent = list.stream()
                    .mapToDouble(Crypto::getPriceChangePercent)
                    .average()
                    .orElse(0.0);

            Crypto merged = new Crypto();
            merged.setCryptoId(base.getCryptoId()); // any id: customer not editing
            merged.setCryptoName(base.getCryptoName());
            merged.setCryptoSymbol(base.getCryptoSymbol());
            merged.setCryptoPrice(avgPrice);
            merged.setAvailableQuantity(totalQty);
            merged.setPriceChange(avgChange);
            merged.setPriceChangePercent(avgChangePercent);

            return merged;
        }).collect(Collectors.toList());
    }
    
 // ✅ Get merged crypto with price change by cryptoId
    public Crypto getMergedCryptoById(Long cryptoId) {
        return getMergedCryptoDetails().stream()
                .filter(c -> c.getCryptoId().equals(cryptoId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Merged Crypto not found"));
    }


}
