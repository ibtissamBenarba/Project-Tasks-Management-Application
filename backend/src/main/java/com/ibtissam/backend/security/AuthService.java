package com.ibtissam.backend.security;

import com.ibtissam.backend.dto.LoginRequest;
import com.ibtissam.backend.dto.LoginResponse;
import com.ibtissam.backend.model.User;
import com.ibtissam.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;

    public LoginResponse login(LoginRequest request) {
        // Authenticate user
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.email(),
                        request.password()
                )
        );

        // Générer le token JWT avec l'email
        String token = jwtService.generateToken(request.email());
        return new LoginResponse(token);
    }
}

