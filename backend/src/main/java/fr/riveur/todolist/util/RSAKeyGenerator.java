package fr.riveur.todolist.util;

import java.security.KeyPair;
import java.security.KeyPairGenerator;
import java.security.NoSuchAlgorithmException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RSAKeyGenerator {

    public static Logger logger = LoggerFactory.getLogger(RSAKeyGenerator.class);

    public static KeyPair generateKeyPair() {

        logger.info("Generating RSA key pair");

        KeyPair pair;

        try {
            KeyPairGenerator generator = KeyPairGenerator.getInstance("RSA");
            generator.initialize(2048);
            pair = generator.generateKeyPair();
        } catch (NoSuchAlgorithmException e) {
            throw new IllegalStateException();
        }
        return pair;
    }
}
