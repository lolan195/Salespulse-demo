
// SALES DATA

const sales = [
  { orderId: "ORD001", product: "Keyboard", quantity: 2, unitPrice: 750, unitCost: 500 },
  { orderId: "ORD002", product: "Mouse", quantity: 3, unitPrice: 400, unitCost: 220 },
  { orderId: "ORD003", product: "Monitor", quantity: 1, unitPrice: 8500, unitCost: 6900 },
  { orderId: "ORD004", product: "Keyboard", quantity: 1, unitPrice: 750, unitCost: 500 },
  { orderId: "ORD005", product: "Laptop Stand", quantity: 2, unitPrice: 1200, unitCost: 800 },
  { orderId: "ORD006", product: "Mouse", quantity: 0, unitPrice: 400, unitCost: 220 },
  { orderId: "ORD007", product: "Monitor", quantity: 1, unitPrice: -8500, unitCost: 6900 },
  { orderId: "ORD008", product: "Webcam", quantity: 2, unitPrice: 1800, unitCost: 1200 }
];


// 1. DATA VALIDATION

let total = sales.length;

let valid = sales.filter(s => s.quantity > 0 && s.unitPrice > 0);

let invalid = sales.filter(s => s.quantity <= 0 || s.unitPrice <= 0);

console.log("===== DATA VALIDATION =====");

console.log("Total Records:", total);
console.log("Valid Records:", valid.length);
console.log("Invalid Records:", invalid.length);

console.log("Invalid IDs:", invalid.map(s => s.orderId));


// 2. SALES CALCULATIONS

let revenue = 0;
let profit = 0;

valid.forEach(s => {
    revenue += s.quantity * s.unitPrice;
    profit += s.quantity * (s.unitPrice - s.unitCost);
});

let orders = valid.length;
let average = revenue / orders;

console.log("\n===== SALES SUMMARY =====");

console.log("Total Revenue: ₹", revenue);
console.log("Total Orders:", orders);
console.log("Average Order Value: ₹", average.toFixed(2));
console.log("Estimated Gross Profit: ₹", profit);


// 3. PRODUCT ANALYSIS

let products = {};

valid.forEach(s => {

    if (!products[s.product]) {
        products[s.product] = {
            revenue: 0,
            quantity: 0
        };
    }

    products[s.product].revenue += s.quantity * s.unitPrice;
    products[s.product].quantity += s.quantity;

});


// 4. HIGHEST REVENUE PRODUCT

let highestRevenue = Object.entries(products)
    .sort((a, b) => b[1].revenue - a[1].revenue)[0];

console.log("\n===== PRODUCT ANALYSIS =====");

console.log("Highest Revenue Product:", highestRevenue[0]);
console.log("Revenue: ₹", highestRevenue[1].revenue);


// 5. HIGHEST QUANTITY PRODUCT

let highestQuantity = Math.max(
    ...Object.values(products).map(p => p.quantity)
);

let highestProducts = Object.entries(products)
    .filter(p => p[1].quantity === highestQuantity)
    .map(p => p[0]);

console.log("Highest Quantity Product:", highestProducts.join(", "));
console.log("Quantity Sold:", highestQuantity);


// 6. FINAL COMPARISON

console.log("\n===== FINAL COMPARISON =====");

console.log(
    "Are they the same product?",
    highestProducts.includes(highestRevenue[0])
);
