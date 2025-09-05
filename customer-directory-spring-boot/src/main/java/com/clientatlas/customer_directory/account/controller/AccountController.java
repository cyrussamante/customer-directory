package com.clientatlas.customer_directory.account.controller;

import com.clientatlas.customer_directory.account.dto.AuthRequest;
import com.clientatlas.customer_directory.account.service.AccountService;
import com.clientatlas.customer_directory.domain.user.User;
import com.clientatlas.customer_directory.security.jwt.TokenService;

import jakarta.servlet.http.HttpServletResponse;
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
    public Map<String, String> token(@RequestBody AuthRequest authRequest, HttpServletResponse response) {
        User user = accountService.authenticate(authRequest.getEmail(), authRequest.getPassword());
        String token = tokenService.generateToken(user);

        Map<String, String> bodyResponse = new HashMap<>();
        bodyResponse.put("access_token", token);
        bodyResponse.put("token_type", "Bearer");
        bodyResponse.put("expires_in", "3600");
        return bodyResponse;
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
        return ResponseEntity.created(location).body(savedUser);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
       return accountService.getCurrentUser();
    }

}
