package dev.juanes.services;

import dev.juanes.config.exception.ValidationException;
import dev.juanes.model.Seller;
import dev.juanes.repository.ISellersRepository;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor(onConstructor_ = @Autowired)
public class SellerServices {
    private final ISellersRepository repository;

    public Seller save(Seller seller) throws ValidationException {
        if (Objects.isNull(seller) || Objects.nonNull(seller.getId()))
            throw new ValidationException("Can't save seller with id");
        return repository.save(seller);
    }

    public List<Seller> findAll() {
        return repository.findAll();
    }

    public Seller update(Seller seller) throws ValidationException {
        if (Objects.isNull(seller) || Objects.isNull(seller.getId()))
            throw new ValidationException("Can't update seller without id");
        return repository.save(seller);
    }
}
