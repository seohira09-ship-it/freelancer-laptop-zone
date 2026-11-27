const WHATSAPP_NUMBER = "923154034549";

const PRODUCTS = [
    {
        id: "flz-101",
        brand: "HP",
        title: "HP EliteBook 840 G8",
        processor: "Intel Core i7 (11th Gen)",
        ram: "16GB",
        storage: "256GB SSD",
        color: "Silver",
        condition: "Verified Stock",
        image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "flz-102",
        brand: "Dell",
        title: "Dell Latitude 5420",
        processor: "Intel Core i7 (11th Gen)",
        ram: "16GB",
        storage: "256GB SSD",
        color: "Black",
        condition: "Verified Stock",
        image: "https://images.unsplash.com/photo-1593642632823-8f785ba67e45?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "flz-103",
        brand: "Lenovo",
        title: "Lenovo ThinkPad T14",
        processor: "Intel Core i7 (10th Gen)",
        ram: "8GB",
        storage: "256GB SSD",
        color: "Black",
        condition: "Tested Stock",
        image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "flz-104",
        brand: "Toshiba",
        title: "Toshiba Dynabook Portege",
        processor: "Intel Core i7 (8th Gen)",
        ram: "8GB",
        storage: "256GB SSD",
        color: "Silver",
        condition: "Available Stock",
        image: "https://images.unsplash.com/photo-1544731612-de7f96afe55f?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "flz-105",
        brand: "HP",
        title: "HP ProBook 450 G7",
        processor: "Intel Core i7 (10th Gen)",
        ram: "16GB",
        storage: "256GB SSD",
        color: "Silver",
        condition: "Tested Stock",
        image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=600&q=80"
    },
    {
        id: "flz-106",
        brand: "Dell",
        title: "Dell Latitude 7490",
        processor: "Intel Core i7 (8th Gen)",
        ram: "8GB",
        storage: "256GB SSD",
        color: "Black",
        condition: "Available Stock",
        image: "https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?auto=format&fit=crop&w=600&q=80"
    }
];

function getWhatsAppOrderLink(laptopTitle, specs) {
    const message = encodeURIComponent(
        `Hello Freelancer Laptop Zone! I am interested in this laptop:\n\nLaptop: ${laptopTitle}\nSpecs: ${specs}\n\nPlease share the latest price and availability.`
    );
    return `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;
}

function renderCardHTML(p) {
    const specsString = `${p.processor} | ${p.ram} | ${p.storage} | ${p.color}`;
    const waLink = getWhatsAppOrderLink(p.title, specsString);

    return `
        <div class="product-card">
            <span class="badge-condition">${p.condition}</span>
            <img src="${p.image}" alt="${p.title}" class="product-img">
            <div class="product-details">
                <span class="product-brand">${p.brand}</span>
                <h3 class="product-title">${p.title}</h3>
                <ul class="spec-list">
                    <li><i class="fa-solid fa-microchip" style="color: var(--primary-orange);"></i> ${p.processor}</li>
                    <li><i class="fa-solid fa-memory" style="color: var(--primary-orange);"></i> ${p.ram} / ${p.storage}</li>
                    <li><i class="fa-solid fa-palette" style="color: var(--primary-orange);"></i> Color: ${p.color}</li>
                </ul>
                <div class="card-actions">
                    <a href="${waLink}" target="_blank" rel="noopener noreferrer" class="btn btn-whatsapp">
                        <i class="fa-brands fa-whatsapp"></i> Inquire Price
                    </a>
                    <a href="guides.html" class="btn btn-outline">
                        <i class="fa-solid fa-book-open"></i> Buying Guide
                    </a>
                </div>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
    const homeGrid = document.getElementById("home-featured-grid");
    if (homeGrid) {
        homeGrid.innerHTML = PRODUCTS.slice(0, 4).map(renderCardHTML).join("");
    }

    const shopGrid = document.getElementById("shop-products-grid");
    if (shopGrid) {
        const params = new URLSearchParams(window.location.search);
        const brandParam = params.get("brand");
        if (brandParam && document.getElementById("filter-brand")) {
            document.getElementById("filter-brand").value = brandParam;
            applyFilters();
        } else {
            renderShopProducts(PRODUCTS);
        }
    }
});

function renderShopProducts(items) {
    const container = document.getElementById("shop-products-grid");
    if (!container) return;
    if (items.length === 0) {
        container.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">No laptops found matching your selected filters.</p>`;
        return;
    }
    container.innerHTML = items.map(renderCardHTML).join("");
}

function applyFilters() {
    const search = document.getElementById("search-input").value.toLowerCase();
    const brand = document.getElementById("filter-brand").value;
    const ram = document.getElementById("filter-ram").value;
    const color = document.getElementById("filter-color").value;

    const filtered = PRODUCTS.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(search) || p.processor.toLowerCase().includes(search);
        const matchesBrand = brand === "all" || p.brand.toLowerCase() === brand.toLowerCase();
        const matchesRam = ram === "all" || p.ram === ram;
        const matchesColor = color === "all" || p.color.toLowerCase() === color.toLowerCase();
        return matchesSearch && matchesBrand && matchesRam && matchesColor;
    });

    renderShopProducts(filtered);
}

function resetFilters() {
    document.getElementById("search-input").value = "";
    document.getElementById("filter-brand").value = "all";
    document.getElementById("filter-ram").value = "all";
    document.getElementById("filter-color").value = "all";
    renderShopProducts(PRODUCTS);
}

function handleWholesaleSubmit(e) {
    e.preventDefault();
    const name = document.getElementById("ws-name").value;
    const phone = document.getElementById("ws-phone").value;
    const qty = document.getElementById("ws-qty").value;
    const details = document.getElementById("ws-details").value;

    const message = encodeURIComponent(
        `WHOLESALE BULK INQUIRY\n\nName: ${name}\nContact: ${phone}\nQuantity: ${qty}\nRequirements: ${details}`
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, "_blank");
}

function toggleMobileMenu() {
    document.getElementById("nav-links").classList.toggle("open");
}