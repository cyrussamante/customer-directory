package com.clientatlas.customer_directory.data.controller;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.Collections;
import java.util.Map;
import java.util.UUID;

@RestController
@RequestMapping("/images")
public class ImageController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Value("${file.default-dir}")
    private String defaultDir;

    @GetMapping
    public Map<String, String> data() {
        return Collections.singletonMap("message", "image service is up and running!");
    }

    @PostMapping("/upload")
    public ResponseEntity<Map<String, String>> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            String fileName = saveImage(file);
            String pathName = "/images/" + fileName;
            return ResponseEntity.ok(Collections.singletonMap("imageUrl", pathName));
        } catch (IOException e) {
            return ResponseEntity.status(500)
                    .body(Collections.singletonMap("error", "Error with image upload: " + e.getMessage()));
        }
    }

    public String saveImage(MultipartFile file) throws IOException{
        Path uploadPath = Paths.get(uploadDir);
        if (Files.notExists(uploadPath)) {
            Files.createDirectories(uploadPath);
        }

        String fileName = UUID.randomUUID().toString() + "." + file.getOriginalFilename();
        Path filePath = uploadPath.resolve(fileName);
        Files.copy(file.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
        return fileName;
    }

    @GetMapping("/{filename}")
    public ResponseEntity<byte[]> getImage(@PathVariable String filename) {
        try {
            Path uploadedPath = Paths.get(uploadDir).resolve(filename); // check uploaded paths
            if (Files.exists(uploadedPath)) {
                byte[] imageBytes = Files.readAllBytes(uploadedPath);
                return ResponseEntity.ok().body(imageBytes);
            }

            ClassPathResource defaultImage = new ClassPathResource("static/images/" + filename);
            if (defaultImage.exists()) { // check default paths
                byte[] imageBytes = defaultImage.getInputStream().readAllBytes();
                return ResponseEntity.ok().body(imageBytes);
            }

            return ResponseEntity.status(404).body(null);

        } catch (IOException e) {
            return ResponseEntity.status(500).body(null);
        }
    }


}
