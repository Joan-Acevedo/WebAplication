function validateForm(property) {
    if (!property.address.trim() || property.price <= 0 || property.size <= 0 || !property.description.trim()) {
        alert("Todos los campos son obligatorios y deben ser válidos.");
        return false;
    }
    return true;
}
