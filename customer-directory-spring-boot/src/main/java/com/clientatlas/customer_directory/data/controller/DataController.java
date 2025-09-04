package com.clientatlas.customer_directory.data.controller;

import org.springframework.web.bind.annotation.*;
import java.util.Collections;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class DataController {

    @GetMapping
    public Map<String, String> data() {
        return Collections.singletonMap("message", "data service is up and running!");
    }
    
}