package com.meta.mask.controller;

import com.meta.mask.model.User;
import com.meta.mask.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    // ✅ LOGIN (Normal + Google)
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> body) {
        try {
            String email = body.get("email");
            String password = body.get("password");
            String name = body.get("name");

            User user;

            if ("GOOGLE_AUTH".equals(password)) {
                user = userService.getUserByEmail(email);
                if (user == null) {
                    User newUser = new User();
                    newUser.setEmail(email);
                    newUser.setPassword("GOOGLEUSER");
                    newUser.setUserName(name != null ? name : "User");
                    newUser.setAge(18);
                    user = userService.registerUser(newUser);
                }
            } else {
                user = userService.login(email, password);
            }

            user.setPassword(null);
            return ResponseEntity.ok(user);

        } catch (RuntimeException e) {
            return ResponseEntity.status(401).body(Map.of("message", e.getMessage()));
        }
    }

    // ✅ REGISTER
    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        try {
            User savedUser = userService.registerUser(user);
            savedUser.setPassword(null);
            return ResponseEntity.ok(savedUser);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("message", e.getMessage()));
        }
    }
   
    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        User user = userService.getUserDetails(id);
        if (user == null) {
            return ResponseEntity.status(404).body("User not found");
        }
        return ResponseEntity.ok(user);
    }

    // ✅ BUY
    @PostMapping("/{userId}/buy/{ownerId}/{cryptoId}")
    public User buy(@PathVariable Long userId,
                    @PathVariable Long ownerId,
                    @PathVariable Long cryptoId,
                    @RequestParam double quantity) {
        return userService.buyCrypto(userId, ownerId, cryptoId, quantity);
    }

    // ✅ SELL (owner-aware)
    @PostMapping("/{userId}/sell/{ownerId}/{cryptoId}")
    public User sell(@PathVariable Long userId,
                     @PathVariable Long ownerId,
                     @PathVariable Long cryptoId,
                     @RequestParam double quantity) {
        return userService.sellCrypto(userId, ownerId, cryptoId, quantity);
    }

     // ✅ SWAP
    @PostMapping("/{userId}/swap/{ownerId}")
    public User swap(@PathVariable Long userId,
                     @PathVariable Long ownerId,
                     @RequestParam Long fromCryptoId,
                     @RequestParam Long toCryptoId,
                     @RequestParam double quantity) {
        return userService.swapCrypto(userId, ownerId, fromCryptoId, toCryptoId, quantity);
    }

    @PostMapping("/wallet/add/{userId}")
    public ResponseEntity<User> addMoney(
            @PathVariable Long userId,
            @RequestParam double amount,
            @RequestParam String upiId) {
        return ResponseEntity.ok(userService.addMoney(userId, amount, upiId));
    }

    @PostMapping("/wallet/withdraw/{userId}")
    public ResponseEntity<?> withdrawMoney(
            @PathVariable Long userId,
            @RequestParam double amount) {
        try {
            return ResponseEntity.ok(userService.withdrawMoney(userId, amount));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body(Map.of("error", ex.getMessage()));
        }
    }

}
