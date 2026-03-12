package com.meta.mask.service;

import com.meta.mask.model.Owner;
import com.meta.mask.repository.OwnerRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Transactional
public class OwnerService {

    @Autowired
    private OwnerRepository ownerRepo;

    public Owner registerOwner(Owner owner) {
        if (ownerRepo.findByEmail(owner.getEmail()).isPresent()) {
            throw new RuntimeException("Email already registered");
        }
        return ownerRepo.save(owner);
    }

    public Owner login(String email, String password) {
        Owner owner = ownerRepo.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));
        if (!owner.getPassword().equals(password))
            throw new RuntimeException("Invalid credentials");
        return owner;
    }

    public List<Owner> getAllOwners() {
        return ownerRepo.findAll();
    }

    public Owner getById(Long id) {
        return ownerRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Owner not found"));
    }
}
