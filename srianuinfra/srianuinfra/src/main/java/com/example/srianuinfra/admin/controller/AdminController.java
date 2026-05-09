package com.example.srianuinfra.admin.controller;

import com.example.srianuinfra.admin.model.Admin;
import com.example.srianuinfra.admin.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    @Autowired
    private AdminService adminService;

    @PostMapping("/save")
    public ResponseEntity<Admin> save(@RequestBody Admin admin) {
        return ResponseEntity.ok(adminService.save(admin));
    }

    @GetMapping("/all")
    public ResponseEntity<List<Admin>> getAll() {
        return ResponseEntity.ok(adminService.getAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<Admin> getById(@PathVariable Integer id) {
        return adminService.getById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Integer id) {
        adminService.delete(id);
        return ResponseEntity.noContent().build();
    }
}