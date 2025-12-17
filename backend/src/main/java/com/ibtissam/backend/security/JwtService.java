package com.ibtissam.backend.security;

import com.ibtissam.backend.model.User;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.util.Date;

@Service
public class JwtService {

    @PostConstruct
    public void init() {
        System.out.println("JWT Secret: " + secretKey);
    }

    @Value("${jwt.secret}")
    private String secretKey;

    public String generateToken(String email) {
        byte[] keyBytes = secretKey.getBytes();
        return Jwts.builder()
                .setSubject(email) // utiliser l'email directement
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 86400000)) // 24h
                .signWith(Keys.hmacShaKeyFor(keyBytes))
                .compact();
    }


    public String extractEmail(String token) {
        byte[] keyBytes = secretKey.getBytes();
        Claims claims = Jwts.parserBuilder()
                .setSigningKey(Keys.hmacShaKeyFor(keyBytes))
                .build()
                .parseClaimsJws(token)
                .getBody();
        return claims.getSubject();
    }
}