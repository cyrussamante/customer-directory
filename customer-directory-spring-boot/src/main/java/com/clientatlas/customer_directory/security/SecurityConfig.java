package com.clientatlas.customer_directory.security;

import org.springframework.beans.factory.annotation.Value;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;
import org.springframework.security.provisioning.InMemoryUserDetailsManager;
import org.springframework.security.web.SecurityFilterChain;

import java.security.interfaces.RSAPublicKey;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${rsa.public-key}")
    RSAPublicKey rsaPublicKey;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http
                .sessionManagement(
                        session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .csrf(AbstractHttpConfigurer::disable)
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/account/**").permitAll()
                        .anyRequest().authenticated())
                .oauth2ResourceServer((resourceServer) ->
                        resourceServer.jwt((customizer) -> customizer.decoder(jwtDecoder())))
                .httpBasic(Customizer.withDefaults())
                .build();
    }


    // TODO: Replace this with actual user db
    @Bean
    public InMemoryUserDetailsManager users() {
        return new InMemoryUserDetailsManager(
                User.withUsername("client")
                        .password("{noop}DoNotTell")
                        .authorities("read", "write")
                        .build()
        );
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withPublicKey(rsaPublicKey).build();
    }
}
