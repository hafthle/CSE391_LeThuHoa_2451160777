// May tinh don gian
// Chay: node calculator.js

function calculate(num1, operator, num2) {
    // kiem tra input co phai so khong
    if (isNaN(Number(num1)) || isNaN(Number(num2))) {
        return "Loi: Input khong phai so";
    }

    let a = Number(num1);
    let b = Number(num2);

    // chia cho 0
    if ((operator === "/" || operator === "%") && b === 0) {
        return "Loi: Khong the chia cho 0";
    }

    switch (operator) {
        case "+":  return a + b;
        case "-":  return a - b;
        case "*":  return a * b;
        case "/":  return a / b;
        case "%":  return a % b;
        case "**": return a ** b;
        default:
            return "Loi: Operator '" + operator + "' khong hop le";
    }
}

// test theo dung de bai
console.log(calculate(10, "+", 5));       // → 15
console.log(calculate(10, "/", 0));       // → Loi: Khong the chia cho 0
console.log(calculate(10, "^", 5));       // → Loi: Operator '^' khong hop le
console.log(calculate("abc", "+", 5));    // → Loi: Input khong phai so
console.log(calculate(2, "**", 10));      // → 1024
