package com.clientatlas.customer_directory.account.controller;

import com.clientatlas.customer_directory.account.dto.AuthRequest;
import com.clientatlas.customer_directory.account.service.AccountService;
import com.clientatlas.customer_directory.domain.user.User;
import com.clientatlas.customer_directory.security.jwt.TokenService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.*;

@RestController
@RequestMapping("/account")
public class AccountController {

    private final TokenService tokenService;
    private final AccountService accountService;


    public AccountController(TokenService tokenService, AccountService accountService) {
        this.tokenService = tokenService;
        this.accountService = accountService;
    }

    @PostMapping("/token")
    public Map<String, String> token(@RequestBody AuthRequest authRequest) {
        User user = accountService.authenticate(authRequest.getEmail(), authRequest.getPassword());
        String token = tokenService.generateToken(user);
        Map<String, String> response = new HashMap<>();
        response.put("access_token", token);
        response.put("token_type", "Bearer");
        response.put("expires_in", "3600");
        return response;
    }
    
    @GetMapping
    public Map<String, String> account() {
        return Collections.singletonMap("message", "account service is up and running!");
    }

    @PostMapping("/register")
    public ResponseEntity<User> register(@RequestBody User newUser) {
        User savedUser = accountService.registerUser(newUser);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedUser.getId())
                .toUri();
        return ResponseEntity.created(location).build();
    }

    @GetMapping("/users")
    public List<User> getAllUsers() {
        return accountService.getAllUsers();
    }

    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUser(@PathVariable UUID id) {
        return accountService.getUser(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound()
                        .build());
    }

    @DeleteMapping("/users/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable UUID id) {
        boolean deleted = accountService.deleteUser(id);
        if (deleted) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PatchMapping("/users/{id}")
    public ResponseEntity<User> patchUser(@PathVariable UUID id, @RequestBody Map<String, Object> updatedData) {
        User updatedUser = accountService.patchUser(id, updatedData);
        return updatedUser == null ? ResponseEntity.notFound().build() : ResponseEntity.ok(updatedUser);
    }

}
