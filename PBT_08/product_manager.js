
// ========== DỮ LIỆU SẢN PHẨM ==========
const products = [
    { id: 1, name: "iPhone 16", price: 25990000, category: "phone", stock: 15, rating: 4.5 },
    { id: 2, name: "MacBook Pro", price: 45990000, category: "laptop", stock: 8, rating: 4.8 },
    { id: 3, name: "AirPods Pro", price: 6990000, category: "accessory", stock: 50, rating: 4.3 },
    { id: 4, name: "iPad Air", price: 16990000, category: "tablet", stock: 0, rating: 4.6 },
    { id: 5, name: "Samsung S24", price: 22990000, category: "phone", stock: 20, rating: 4.4 },
    { id: 6, name: "Dell XPS 15", price: 35990000, category: "laptop", stock: 5, rating: 4.7 },
    { id: 7, name: "Galaxy Buds", price: 3490000, category: "accessory", stock: 100, rating: 4.1 },
    { id: 8, name: "Xiaomi Pad 6", price: 7990000, category: "tablet", stock: 25, rating: 4.2 },
    { id: 9, name: "Pixel 9", price: 19990000, category: "phone", stock: 12, rating: 4.6 },
    { id: 10, name: "ThinkPad X1", price: 32990000, category: "laptop", stock: 3, rating: 4.5 }
];
//hàm format tiền VNĐ
function vnd(price) {
    return price.toLocaleString('vi-VN') + 'đ';
}
//1. Lọc sản phẩm còn hàng (stock > 0) 
function getInStock(products) {
    return products.filter(product => product.stock > 0);
}

//2. Lọc theo category VÀ khoảng giá 
function filterProducts(products, category, minPrice, maxPrice) {
    return products.filter(product => 
        product.category === category && 
        product.price >= minPrice && 
        product.price <= maxPrice
    );
}

// 3. Sắp xếp theo giá (tăng/giảm) 
function sortByPrice(products, order = "asc") {
    // Sử dụng spread operator để không mutate mảng gốc
    return [...products].sort((a, b) => {
        if (order === "asc") {
            return a.price - b.price;
        } else {
            return b.price - a.price;
        }
    });
}

// 4.Tìm sản phẩm rẻ nhất mỗi category
function cheapestByCategory(products) {
    return products.reduce((result, product) => {
        const category = product.category;
        
        // Nếu category chưa có trong result, thêm sản phẩm hiện tại
        if (!result[category]) {
            result[category] = product;
        } 
        // Nếu sản phẩm hiện tại rẻ hơn, cập nhật
        else if (product.price < result[category].price) {
            result[category] = product;
        }
        
        return result;
    }, {});
}

//5. Tính tổng giá trị kho 
function totalInventoryValue(products) {
    return products.reduce((total, product) => {
        return total + (product.price * product.stock);
    }, 0);
}

//6. Tạo mảng chỉ chứa name và formattedPrice 
function formatProductList(products) {
    return products.map(product => ({
        name: product.name,
        formattedPrice: product.price.toLocaleString('vi-VN') + 'đ'
    }));
}

// 7. Tính rating trung bình toàn bộ
function averageRating(products) {
    const sum = products.reduce((total, product) => {
        return total + product.rating;
    }, 0);
    
    // Làm tròn 2 chữ số sau dấu phẩy
    return Math.round((sum / products.length) * 100) / 100;
}

// 8. Tìm sản phẩm theo keyword
function searchProducts(products, keyword) {
    const lowerKeyword = keyword.toLowerCase();
    return products.filter(product => 
        product.name.toLowerCase().includes(lowerKeyword)
    );
}

// TEST FUNCTIONS 
console.log("=== 1. IN-STOCK PRODUCTS ===");
const available = getInStock(products);
console.log(`Con hang: ${available.length} san pham`);
console.log(available.map(p => `${p.name} (stock: ${p.stock})`));

console.log("\n=== 2. PHONES 15-25 TRIEU ===");
const midPhones = filterProducts(products, "phone", 15000000, 25000000);
console.log(midPhones.map(p => `${p.name}: ${vnd(p.price)}`));

console.log("\n=== 3. SAP XEP GIA TANG DAN ===");
console.log(sortByPrice(products, "asc").map(p => `${p.name}: ${vnd(p.price)}`));

console.log("\n=== 3b. SAP XEP GIA GIAM DAN ===");
console.log(sortByPrice(products, "desc").map(p => `${p.name}: ${vnd(p.price)}`));

console.log("\n=== 4. CHEAPEST BY CATEGORY ===");
const reTatDanh = cheapestByCategory(products);
Object.entries(reTatDanh).forEach(([cat, p]) => {
    console.log(`${cat}: ${p.name} — ${vnd(p.price)}`);
});

console.log("\n=== 5. TOTAL INVENTORY VALUE ===");
console.log(vnd(totalInventoryValue(products)));

console.log("\n=== 6. FORMATTED PRODUCT LIST ===");
console.log(formatProductList(products));

console.log("\n=== 7. AVERAGE RATING ===");
console.log("Rating TB:", averageRating(products));

console.log("\n=== 8. TIM THEO KEYWORD ===");
console.log(searchProducts(products, "pro").map(p => p.name));
console.log(searchProducts(products, "PAD").map(p => p.name));

console.log("\n=== 9. KIEM TRA MANG GOC KHONG BI THAY DOI ===");
sortByPrice(products, "asc");
console.log("San pham dau tien van la:", products[0].name);
