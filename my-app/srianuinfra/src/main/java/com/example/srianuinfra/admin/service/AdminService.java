package com.example.srianuinfra.admin.service;

import com.example.srianuinfra.admin.model.Admin;
import com.example.srianuinfra.admin.repository.AdminRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AdminService {

    @Autowired
    private AdminRepository adminRepository;

    public Admin save(Admin admin) {
        return adminRepository.save(admin);
    }

    public List<Admin> getAll() {
        return adminRepository.findAll();
    }

    public Optional<Admin> getById(Integer id) {
        return adminRepository.findById(id);
    }

    public Optional<Admin> getByEmail(String email) {
        return adminRepository.findByEmail(email);
    }

    public void delete(Integer id) {
        adminRepository.deleteById(id);
    }
}