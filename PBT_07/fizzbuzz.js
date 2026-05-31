// ========== FIZZBUZZ ==========
// Chay: node fizzbuzz.js

// --- Version 1: Classic ---
console.log("=== Classic FizzBuzz (1-100) ===");

for (let i = 1; i <= 100; i++) {
    const ket = (i % 15 === 0 ? "FizzBuzz" :
                 i % 3  === 0 ? "Fizz" :
                 i % 5  === 0 ? "Buzz" : i);
    console.log(`${i}: ${ket}`);
}


// --- Version 2: Custom rules ---
console.log("\n=== Custom FizzBuzz ===");

// rules la mang cac { divisor, word }
// ghep tat ca tu khop lai, neu khong khop thi in so
const customFizzBuzz = (n, rules) => {
    for (let i = 1; i <= n; i++) {
        const tag = rules
            .filter(r => i % r.divisor === 0)
            .map(r => r.word)
            .join("");

        console.log(tag ? `${i}: ${tag}` : i);
    }
};

// test voi 3 rules
console.log("\nTest den 30 (Fizz/3, Buzz/5, Jazz/7):");
customFizzBuzz(30, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" },
]);

// test case 105 = FizzBuzzJazz
console.log("\nTest den 105 (kiem tra so chia het ca 3/5/7):");
customFizzBuzz(105, [
    { divisor: 3, word: "Fizz" },
    { divisor: 5, word: "Buzz" },
    { divisor: 7, word: "Jazz" },
]);
