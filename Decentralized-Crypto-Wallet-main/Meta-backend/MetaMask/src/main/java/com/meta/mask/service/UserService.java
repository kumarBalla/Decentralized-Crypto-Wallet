package com.meta.mask.service;

import com.meta.mask.model.Crypto;
import com.meta.mask.model.User;
import com.meta.mask.model.Owner;
import com.meta.mask.repository.CryptoRepository;
import com.meta.mask.repository.UserRepository;

import jakarta.transaction.Transactional;

import com.meta.mask.repository.OwnerRepository;

import java.util.Map;
import java.util.Optional;

import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final UserRepository userRepo;
    private final CryptoRepository cryptoRepo;
    private final OwnerRepository ownerRepo;
    private final CryptoService cryptoService;

    public UserService(UserRepository userRepo, CryptoRepository cryptoRepo, OwnerRepository ownerRepo, CryptoService cryptoService) {
        this.userRepo = userRepo;
        this.cryptoRepo = cryptoRepo;
        this.ownerRepo = ownerRepo;
        this.cryptoService = cryptoService;
    }

    // ✅ REGISTER
    public User registerUser(User user) {
        if (userRepo.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        user.setWalletBalance(10000.0);
        return userRepo.save(user);
    }

    // ✅ NORMAL LOGIN
    public User login(String email, String password) {
        User user = userRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!user.getPassword().equals(password)) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    // ✅ GOOGLE LOGIN SUPPORT
    public User getUserByEmail(String email) {
        return userRepo.findByEmail(email).orElse(null);
    }

    // ✅ USER DETAILS BY ID
    public User getUserDetails(Long userId) {
        return userRepo.findById(userId).orElse(null);
    }

    @Transactional
    public User buyCrypto(Long userId, Long ownerId, Long cryptoId, double quantity) {

        // ✅ Get user
        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // ✅ Find market crypto (for name)
        Crypto marketCrypto = cryptoRepo.findById(cryptoId)
                .orElseThrow(() -> new RuntimeException("Crypto not found"));

        String cryptoName = marketCrypto.getCryptoName();

        // ✅ Find owner’s crypto by name
        Crypto ownerCrypto = cryptoRepo.findByOwnerAndCryptoName(ownerId, cryptoName)
                .orElseThrow(() -> new RuntimeException("Owner does not have this crypto!"));

        if (ownerCrypto.getAvailableQuantity() < quantity) {
            throw new RuntimeException("Owner does not have enough crypto!");
        }

        double totalPrice = ownerCrypto.getCryptoPrice() * quantity;

        if (user.getWalletBalance() < totalPrice) {
            throw new RuntimeException("Insufficient wallet balance!");
        }

        // ✅ Deduct money
        user.setWalletBalance(user.getWalletBalance() - totalPrice);

        // ✅ Update user holdings ALWAYS using OWNER CRYPTO ID
        Map<Long, Double> holdings = user.getCryptoHoldings();

        Long existingId = ownerCrypto.getCryptoId(); // ✅ THIS IS THE FIX

        double currentQty = holdings.getOrDefault(existingId, 0.0);
        holdings.put(existingId, currentQty + quantity);

        user.setCryptoHoldings(holdings);

        // ✅ Deduct from owner
        ownerCrypto.setAvailableQuantity(ownerCrypto.getAvailableQuantity() - quantity);
        cryptoRepo.save(ownerCrypto);

        return userRepo.save(user);
    }




    @Transactional
    public User sellCrypto(Long userId, Long ownerId, Long cryptoId, double quantity) {

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Map<Long, Double> holdings = user.getCryptoHoldings();
        double userQty = holdings.getOrDefault(cryptoId, 0.0);

        if (userQty < quantity) {
            throw new RuntimeException("You don't have enough crypto to sell!");
        }

        Crypto crypto = cryptoRepo.findById(cryptoId)
                .orElseThrow(() -> new RuntimeException("Crypto not found!"));

        String cryptoName = crypto.getCryptoName();

        // ✅ Do NOT throw error — allow owner creation
        Optional<Crypto> optOwnerCrypto = cryptoRepo.findByOwnerAndCryptoName(ownerId, cryptoName);

        // ✅ Get merged price + price change
        Crypto mergedCrypto = cryptoService.getMergedCryptoById(cryptoId);
        double price = mergedCrypto.getCryptoPrice();
        double priceChange = mergedCrypto.getPriceChange();

        double saleAmount = (price + priceChange) * quantity;

        // ✅ Wallet add money
        user.setWalletBalance(user.getWalletBalance() + saleAmount);

        // ✅ Reduce/remove user holding
        double updatedQty = userQty - quantity;
        if (updatedQty > 0) {
            holdings.put(cryptoId, updatedQty);
        } else {
            holdings.remove(cryptoId);
        }
        user.setCryptoHoldings(holdings);

        Crypto ownerCrypto;

        if (optOwnerCrypto.isPresent()) {
            // ✅ Owner has crypto → Update quantity
            ownerCrypto = optOwnerCrypto.get();
            ownerCrypto.setAvailableQuantity(ownerCrypto.getAvailableQuantity() + quantity);

        } else {
            // ✅ Owner does NOT have → Create NEW crypto for owner
            ownerCrypto = new Crypto();
            ownerCrypto.setCryptoName(mergedCrypto.getCryptoName());
            ownerCrypto.setCryptoSymbol(mergedCrypto.getCryptoSymbol());
            ownerCrypto.setCryptoPrice(price);
            ownerCrypto.setPriceChange(priceChange);
            ownerCrypto.setPriceChangePercent(mergedCrypto.getPriceChangePercent());
            ownerCrypto.setAvailableQuantity(quantity);
            ownerCrypto.setOwner(ownerRepo.findById(ownerId)
                    .orElseThrow(() -> new RuntimeException("Owner not found")));
        }

        cryptoRepo.save(ownerCrypto);
        return userRepo.save(user);
    }



    @Transactional
    public User swapCrypto(Long userId, Long ownerId,
                           Long fromCryptoId, Long toCryptoId, double quantity) {

        if (fromCryptoId.equals(toCryptoId)) {
            throw new RuntimeException("Cannot swap same crypto!");
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Owner owner = ownerRepo.findById(ownerId)
                .orElseThrow(() -> new RuntimeException("Owner not found"));

        Map<Long, Double> userHoldings = user.getCryptoHoldings();
        double userFromQty = userHoldings.getOrDefault(fromCryptoId, 0.0);

        if (userFromQty < quantity) {
            throw new RuntimeException("Insufficient quantity for swap!");
        }

        Crypto mergedFrom = cryptoService.getMergedCryptoById(fromCryptoId);
        Crypto mergedTo = cryptoService.getMergedCryptoById(toCryptoId);

        Optional<Crypto> ownerToCryptoOpt =
                cryptoRepo.findByOwnerAndCryptoName(ownerId, mergedTo.getCryptoName());

        Crypto ownerToCrypto = ownerToCryptoOpt
                .orElseThrow(() -> new RuntimeException("Owner does not have this crypto!"));

        if (ownerToCrypto.getAvailableQuantity() <= 0) {
            throw new RuntimeException("Owner has no TO crypto available!");
        }

        double fromValue = (mergedFrom.getCryptoPrice() + mergedFrom.getPriceChange()) * quantity;
        double toQty = fromValue / (mergedTo.getCryptoPrice() + mergedTo.getPriceChange());

        // ✅ Update User
        double updatedUserFromQty = userFromQty - quantity;
        if (updatedUserFromQty > 0) {
            userHoldings.put(fromCryptoId, updatedUserFromQty);
        } else {
            userHoldings.remove(fromCryptoId);
        }

        userHoldings.put(toCryptoId,
                userHoldings.getOrDefault(toCryptoId, 0.0) + toQty);

        // ✅ Update Owner side
        ownerToCrypto.setAvailableQuantity(ownerToCrypto.getAvailableQuantity() - toQty);

        Optional<Crypto> ownerFromCryptoOpt =
                cryptoRepo.findByOwnerAndCryptoName(ownerId, mergedFrom.getCryptoName());

        Crypto ownerFromCrypto = ownerFromCryptoOpt.orElseGet(() -> {
            Crypto newCrypto = new Crypto();
            newCrypto.setOwner(owner);
            newCrypto.setCryptoName(mergedFrom.getCryptoName());
            newCrypto.setCryptoSymbol(mergedFrom.getCryptoSymbol());
            newCrypto.setCryptoPrice(mergedFrom.getCryptoPrice());
            newCrypto.setPriceChange(mergedFrom.getPriceChange());
            newCrypto.setPriceChangePercent(mergedFrom.getPriceChangePercent());
            newCrypto.setAvailableQuantity(0.0);
            return newCrypto;
        });

        ownerFromCrypto.setAvailableQuantity(ownerFromCrypto.getAvailableQuantity() + quantity);

        cryptoRepo.save(ownerToCrypto);
        cryptoRepo.save(ownerFromCrypto);
        return userRepo.save(user);
    }
    
 // ✅ Add Money using UPI ID
    public User addMoney(Long userId, double amount, String upiId) {

        if (amount <= 0) {
            throw new RuntimeException("Amount must be greater than 0");
        }

        if (upiId == null || upiId.trim().isEmpty()) {
            throw new RuntimeException("UPI ID is required");
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        double updatedBalance = user.getWalletBalance() + amount;
        user.setWalletBalance(updatedBalance);

        return userRepo.save(user);
    }

    // ✅ Withdraw Money
    public User withdrawMoney(Long userId, double amount) {

        if (amount <= 0) {
            throw new RuntimeException("Amount must be greater than 0");
        }

        User user = userRepo.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found!"));

        if (user.getWalletBalance() < amount) {
            throw new RuntimeException("Not enough balance in wallet");
        }

        double updatedBalance = user.getWalletBalance() - amount;
        user.setWalletBalance(updatedBalance);

        return userRepo.save(user);
    }




}