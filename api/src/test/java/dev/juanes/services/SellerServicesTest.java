package dev.juanes.services;

import dev.juanes.config.exception.ValidationException;
import dev.juanes.model.Seller;
import dev.juanes.repository.ISellersRepository;
import dev.juanes.utils.SellerUtils;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertFalse;
import static org.junit.jupiter.api.Assertions.assertThrows;

@ExtendWith(MockitoExtension.class)
class SellerServicesTest {
    @Mock
    private ISellersRepository repository;
    @InjectMocks
    private SellerServices services;

    private static Seller createSeller(String id) {
        Seller seller = new Seller();
        seller.setId(id);
        return seller;
    }

    @Test
    void save() throws Exception {
        Seller seller = SellerUtils.createWithRandomId();
        Mockito.when(repository.save(Mockito.any(Seller.class))).thenReturn(seller);
        Seller returnSeller = services.save(SellerUtils.createWithoutId());
        assertEquals(seller, returnSeller);
        Mockito.verify(repository).save(Mockito.any(Seller.class));
    }

    @Test
    void saveWithId() {
        Throwable thrown = assertThrows(ValidationException.class, () -> services.save(SellerUtils.createWithRandomId()));
        assertEquals("Can't save seller with id", thrown.getMessage());
    }

    @Test
    void saveNull() {
        Throwable thrown = assertThrows(ValidationException.class, () -> services.save(null));
        assertEquals("Can't save seller with id", thrown.getMessage());
    }

    @Test
    void findAll() {
        Mockito.when(repository.findAll()).thenReturn(List.of(SellerUtils.createWithRandomId(), SellerUtils.createWithRandomId()));
        List<Seller> sellers = services.findAll();
        assertFalse(sellers.isEmpty());
        Mockito.verify(repository).findAll();
    }

    @Test
    void update() throws Exception {
        Seller mockSellerUpdated = SellerUtils.createWithRandomId();
        mockSellerUpdated.setSite("Other Site");
        Seller mockSellerPreUpdated = SellerUtils.createWithId(mockSellerUpdated.getId());
        mockSellerPreUpdated.setSite("Site");
        Mockito.when(repository.save(mockSellerPreUpdated)).thenReturn(mockSellerUpdated);
        Seller returnSeller = services.update(mockSellerPreUpdated);
        assertEquals(returnSeller, mockSellerUpdated);
        Mockito.verify(repository).save(mockSellerPreUpdated);
    }

    @Test
    void updateWithoutId() {
        Throwable thrown = assertThrows(ValidationException.class, () -> services.update(SellerUtils.createWithoutId()));
        assertEquals("Can't update seller without id", thrown.getMessage());
    }

    @Test
    void updateNull() {
        Throwable thrown = assertThrows(ValidationException.class, () -> services.update(null));
        assertEquals("Can't update seller without id", thrown.getMessage());
    }
}