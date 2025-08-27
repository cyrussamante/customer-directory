package com.clientatlas.customer_directory.data.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.parameters.P;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

public class ImageController {

    @PostMapping()
    public ResponseEntity<String> uploadImage(@PathVariable UUID id, @RequestParam("file") MultipartFile file) {
        try {
            Path path = Paths.get("uploads/");
            if (Files.notExists(path)) {
                Files.createDirectories(path);
            }

            String fileName = file.getOriginalFilename();
            Path filePath = path.resolve(fileName);
            Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING)'
            String imageURL = "/uploads/" + fileName;
            return ResponseEntity.ok(imageURL);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Error - " + e.getMessage());
        }
    }
}
