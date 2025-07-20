package dev.juanes.controller;

import dev.juanes.config.exception.ValidationException;
import dev.juanes.config.rest.response.ApiResponse;
import dev.juanes.dto.SellerDTO;
import dev.juanes.model.Seller;
import dev.juanes.services.SellerServices;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.List;

@Controller
@RequestMapping(path = "seller")
@AllArgsConstructor(onConstructor_ = @Autowired)
public class SellerController {
    private final SellerServices services;

    @PostMapping
    public ResponseEntity<ApiResponse> save(@RequestBody SellerDTO body) throws ValidationException {
        final Seller response = services.save(body.parse());
        return ResponseEntity.ok(new ApiResponse(new SellerDTO(response)));
    }

    @PutMapping
    public ResponseEntity<ApiResponse> update(@RequestBody SellerDTO body) throws ValidationException {
        final Seller response = services.update(body.parse());
        return ResponseEntity.ok(new ApiResponse(new SellerDTO(response)));
    }

    @GetMapping
    public ResponseEntity<ApiResponse> findAll() {
        final List<Seller> response = services.findAll();
        return ResponseEntity.ok(new ApiResponse(response.stream().map(SellerDTO::new).toList()));
    }
}
