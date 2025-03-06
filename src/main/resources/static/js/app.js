document.addEventListener("DOMContentLoaded", async () => {
    const form = document.getElementById("propertyForm");
    const propertyList = document.getElementById("propertyList");

    async function loadProperties() {
        propertyList.innerHTML = "";
        const properties = await api.getAll();
        properties.forEach(property => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${property.id}</td>
                <td>${property.address}</td>
                <td>${property.price}</td>
                <td>${property.size}</td>
                <td>${property.description}</td>
                <td class="actions">
                    <button onclick="editProperty(${property.id})">Editar</button>
                    <button onclick="deleteProperty(${property.id})">Eliminar</button>
                </td>
            `;
            propertyList.appendChild(row);
        });
    }

    window.editProperty = async (id) => {
        const property = await api.getById(id);
        document.getElementById("propertyId").value = property.id;
        document.getElementById("address").value = property.address;
        document.getElementById("price").value = property.price;
        document.getElementById("size").value = property.size;
        document.getElementById("description").value = property.description;
    };

    window.deleteProperty = async (id) => {
        if (confirm("¿Seguro que deseas eliminar esta propiedad?")) {
            await api.delete(id);
            loadProperties();
        }
    };

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const property = {
            address: document.getElementById("address").value,
            price: parseFloat(document.getElementById("price").value),
            size: parseFloat(document.getElementById("size").value),
            description: document.getElementById("description").value
        };

        if (!validateForm(property)) return;

        const propertyId = document.getElementById("propertyId").value;
        if (propertyId) {
            await api.update(propertyId, property);
        } else {
            await api.create(property);
        }

        form.reset();
        loadProperties();
    });

    loadProperties();
});
