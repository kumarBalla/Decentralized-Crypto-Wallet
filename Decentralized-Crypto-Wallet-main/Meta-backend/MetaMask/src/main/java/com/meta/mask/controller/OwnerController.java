package com.meta.mask.controller;

import com.meta.mask.model.Owner;
import com.meta.mask.service.OwnerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/owners")
@CrossOrigin(origins = "*")
public class OwnerController {

    @Autowired
    private OwnerService ownerService;

    @PostMapping("/register")
    public Owner register(@RequestBody Owner owner) {
        return ownerService.registerOwner(owner);
    }

    @PostMapping("/login")
    public Owner login(@RequestBody Owner owner) {
        return ownerService.login(owner.getEmail(), owner.getPassword());
    }


    @GetMapping("/all")
    public List<Owner> all() {
        return ownerService.getAllOwners();
    }
}
