package com.example.srianuinfra.admin.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "admin")
public class Admin {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(nullable = false, unique = true, length = 250)
    private String email;

    @Column(nullable = false, length = 50)
    private String password;
}