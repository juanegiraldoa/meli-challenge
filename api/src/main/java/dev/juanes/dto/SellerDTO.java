package dev.juanes.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import dev.juanes.datatypes.Currency;
import dev.juanes.model.Seller;

import java.math.BigDecimal;

@JsonInclude(JsonInclude.Include.NON_NULL)
public record SellerDTO(
        String id,
        String site,
        String title,
        String nickname,
        BigDecimal price,
        Currency currency) {
    public SellerDTO(Seller in) {
        this(in.getId(), in.getSite(), in.getTitle(), in.getNickname(), in.getPrice(), in.getCurrency());
    }

    public Seller parse() {
        Seller out = new Seller();
        out.setId(id);
        out.setSite(site);
        out.setTitle(title);
        out.setNickname(nickname);
        out.setPrice(price);
        out.setCurrency(currency);
        return out;
    }
}
