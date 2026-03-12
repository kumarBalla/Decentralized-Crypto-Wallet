package com.meta.mask.controller;

import com.meta.mask.model.Crypto;
import com.meta.mask.service.CryptoService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@RequestMapping("/api/crypto")
@CrossOrigin(origins = "*")
public class CryptoController {

    private final CryptoService cryptoService;

    public CryptoController(CryptoService cryptoService) {
        this.cryptoService = cryptoService;
    }

    // ✅ Add crypto only for specific owner
    @PostMapping("/add/{ownerId}")
    public ResponseEntity<Crypto> addCrypto(
            @PathVariable Long ownerId,
            @Valid @RequestBody Crypto crypto) {
        return ResponseEntity.ok(cryptoService.addCryptoForOwner(ownerId, crypto));
    }

    // ✅ Update crypto only if it belongs to specific owner
    @PutMapping("/update/{ownerId}/{cryptoId}")
    public ResponseEntity<Crypto> updateCrypto(
            @PathVariable Long ownerId,
            @PathVariable Long cryptoId,
            @RequestBody Crypto updatedCrypto) {
        return ResponseEntity.ok(cryptoService.updateCryptoForOwner(ownerId, cryptoId, updatedCrypto));
    }

    // ✅ Delete crypto only if it belongs to specific owner
    @DeleteMapping("/delete/{ownerId}/{cryptoId}")
    public ResponseEntity<String> deleteOwnerCrypto(
            @PathVariable Long ownerId,
            @PathVariable Long cryptoId) {

        cryptoService.deleteCryptoForOwner(ownerId, cryptoId);
        return ResponseEntity.ok("Crypto deleted successfully for this owner");
    }

    // ✅ Get cryptos by owner
    @GetMapping("/owner/{ownerId}")
    public ResponseEntity<List<Crypto>> getByOwner(@PathVariable Long ownerId) {
        return ResponseEntity.ok(cryptoService.getByOwner(ownerId));
    }

    // ✅ All merged cryptos for customer view
    @GetMapping("/all")
    public ResponseEntity<List<Crypto>> getMergedCryptoDetails() {
        return ResponseEntity.ok(cryptoService.getMergedCryptoDetails());
    }
}
