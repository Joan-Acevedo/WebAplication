package com.example.WebAplication.service;

import com.example.WebAplication.model.Property;
import com.example.WebAplication.repository.PropertyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class PropertyService {

    @Autowired
    private PropertyRepository propertyRepository;

    public List<Property> getAllProperties() {
        return propertyRepository.findAll();
    }

    public Optional<Property> getPropertyById(Long id) {
        return propertyRepository.findById(id);
    }

    public Property createProperty(Property property) {
        return propertyRepository.save(property);
    }

    public Property updateProperty(Long id, Property updatedProperty) {
        return propertyRepository.findById(id).map(property -> {
            property.setAddress(updatedProperty.getAddress());
            property.setPrice(updatedProperty.getPrice());
            property.setSize(updatedProperty.getSize());
            property.setDescription(updatedProperty.getDescription());
            return propertyRepository.save(property);
        }).orElseThrow(() -> new RuntimeException("Property not found"));
    }

    public void deleteProperty(Long id) {
        propertyRepository.deleteById(id);
    }
}
