
console.log("Start");

setTimeout(() => console.log("Timeout executed"), 0);

for (let i = 0; i < 100000; i++) {} // Heavy computation

console.log("End");