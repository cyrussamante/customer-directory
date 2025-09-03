package com.clientatlas.customer_directory.account.controller;

import com.clientatlas.customer_directory.account.dto.AuthRequest;
import com.clientatlas.customer_directory.account.service.AccountService;
import com.clientatlas.customer_directory.domain.user.User;
import com.clientatlas.customer_directory.security.jwt.TokenService;

import jakarta.servlet.http.HttpServletResponse;
import org.apache.tomcat.util.http.SameSiteCookies;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
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
        try {
            User user = accountService.authenticate(authRequest.getEmail(), authRequest.getPassword());
            String token = tokenService.generateToken(user);

            ResponseCookie cookie = ResponseCookie.from("token", token)
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(3600)
                    .sameSite(SameSiteCookies.STRICT.toString())
                    .build();

            response.addHeader(HttpHeaders.SET_COOKIE, cookie.toString());
            Map<String, String> bodyResponse = new HashMap<>();
            bodyResponse.put("access_token", token);
            bodyResponse.put("token_type", "Bearer");
            bodyResponse.put("expires_in", "3600");
            System.out.println("worked");
            return bodyResponse;
        } catch (Exception e) {
            System.out.println("test!!");
            ResponseCookie expiredCookie = ResponseCookie.from("token", "")
                    .httpOnly(true)
                    .secure(true)
                    .path("/")
                    .maxAge(0)
                    .sameSite("Strict")
                    .build();
            response.addHeader(HttpHeaders.SET_COOKIE, expiredCookie.toString());
        }
        return Collections.singletonMap("error", "Invalid credentials");
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

    @PostMapping("/logout")
    public ResponseEntity<Void> logout(HttpServletResponse response) {
        return accountService.logout(response);
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

    @PutMapping("/users/{id}")
    public User updateUser(@PathVariable UUID id, @RequestBody User user) {
        return accountService.putUser(id, user);
    }

    @GetMapping("/me")
    public ResponseEntity<User> getCurrentUser() {
       return accountService.getCurrentUser();
    }

}
