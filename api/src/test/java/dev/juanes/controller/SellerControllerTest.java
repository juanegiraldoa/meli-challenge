package dev.juanes.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import dev.juanes.config.exception.ValidationException;
import dev.juanes.model.Seller;
import dev.juanes.services.SellerServices;
import dev.juanes.utils.SellerUtils;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.math.BigDecimal;
import java.util.List;

@WebMvcTest(SellerController.class)
class SellerControllerTest {
    @Autowired
    private MockMvc mvc;
    @MockitoBean
    private SellerServices services;
    @Autowired
    private ObjectMapper objectMapper;

    @Test
    void save() throws Exception {
        BDDMockito.given(services.save(BDDMockito.any(Seller.class))).willReturn(SellerUtils.createWithRandomId());
        mvc.perform(MockMvcRequestBuilders.post("/seller")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsBytes(SellerUtils.createWithoutId())))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.id").exists())
                .andExpect(MockMvcResultMatchers.jsonPath("$.timestamp").exists());
    }

    @Test
    void saveNull() throws Exception {
        BDDMockito.given(services.save(BDDMockito.any(Seller.class))).willThrow(ValidationException.class);
        mvc.perform(MockMvcRequestBuilders.post("/seller")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(""))
                .andExpect(MockMvcResultMatchers.status().isBadRequest());
    }

    @Test
    void update() throws Exception {
        Seller sellerPreUpdate = SellerUtils.createWithRandomId();
        Seller sellerUpdated = SellerUtils.createWithId(sellerPreUpdate.getId());
        sellerUpdated.setPrice(BigDecimal.valueOf(200));
        BDDMockito.given(services.update(sellerPreUpdate)).willReturn(sellerUpdated);
        mvc.perform(MockMvcRequestBuilders.put("/seller")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsBytes(sellerPreUpdate)))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.price").value(BigDecimal.valueOf(200)));
    }

    @Test
    void findAll() throws Exception {
        BDDMockito.given(services.findAll()).willReturn(List.of(SellerUtils.createWithRandomId()));
        mvc.perform(MockMvcRequestBuilders.get("/seller"))
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data.[0]").exists());
    }
}