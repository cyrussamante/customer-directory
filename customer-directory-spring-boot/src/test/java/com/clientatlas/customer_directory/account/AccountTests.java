package com.clientatlas.customer_directory;

import com.clientatlas.customer_directory.account.AccountController;
import org.junit.jupiter.api.Test;

import java.util.Map;

import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.junit.jupiter.api.Assertions.assertTrue;

public class AccountTests {

    @Test
    public void testAccount() {
        AccountController accountController = new AccountController();
        Map<String, String> result = accountController.account();
        assertNotNull(result);
        assertTrue(result.containsKey("message")
                && 
                result.containsValue("account service is up and running!"));
    }
}
