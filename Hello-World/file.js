const fs = require("fs");

const filePath = "test.txt"; 

fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
        console.error("Error reading file:", err);
        return;
    }

    console.log("File read completed");

    setTimeout(() => console.log("setTimeout executed"), 0);
    setImmediate(() => console.log("setImmediate executed"));
});
