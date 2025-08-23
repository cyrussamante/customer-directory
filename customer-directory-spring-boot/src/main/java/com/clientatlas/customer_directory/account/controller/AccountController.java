package com.clientatlas.customer_directory.account.controller;

import com.clientatlas.customer_directory.account.service.AccountService;
import com.clientatlas.customer_directory.domain.user.User;
import com.clientatlas.customer_directory.security.jwt.TokenService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import java.net.URI;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;
import java.util.List;

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
    public Map<String, String> token(Authentication authentication) {
        String token = tokenService.generateToken(authentication);
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

}
