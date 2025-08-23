package com.clientatlas.customer_directory.account;

import com.clientatlas.customer_directory.domain.User;
import com.clientatlas.customer_directory.domain.UserRole;
import com.clientatlas.customer_directory.repository.UserRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;

import java.net.URI;
import java.util.Map;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class AccountTests {

//    @Test
//    public void testAccount() {
//        AccountController accountController = new AccountController();
//        Map<String, String> result = accountController.account();
//        assertNotNull(result);
//        assertTrue(result.containsKey("message")
//                &&
//                result.containsValue("account service is up and running!"));
//    }
}
