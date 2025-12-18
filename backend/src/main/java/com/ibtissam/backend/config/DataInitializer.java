package com.ibtissam.backend.config;

import com.ibtissam.backend.model.User;
import com.ibtissam.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInitializer implements CommandLineRunner {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {

        if (userRepository.findByEmail("test@mail.com").isEmpty()) {
            User user = new User();
            user.setEmail("test@mail.com");
            user.setPassword(passwordEncoder.encode("123456"));
            userRepository.save(user);
        }
    }
}
