package dev.juanes.utils;

import dev.juanes.datatypes.Currency;
import dev.juanes.model.Seller;

import java.math.BigDecimal;
import java.util.UUID;

public class SellerUtils {
    public static Seller createWithoutId() {
        Seller seller = new Seller();
        seller.setSite("http://127.0.0.1/");
        seller.setTitle("title one");
        seller.setNickname("juan");
        seller.setPrice(BigDecimal.valueOf(100.0));
        seller.setCurrency(Currency.COP);
        return seller;
    }

    public static Seller createWithRandomId() {
        Seller seller = createWithoutId();
        seller.setId(UUID.randomUUID().toString());
        return seller;
    }

    public static Seller createWithId(String id) {
        Seller seller = createWithoutId();
        seller.setId(id);
        return seller;
    }
}
