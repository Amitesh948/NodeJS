const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));
app.get("/api/users", (req, res) => {
  res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = parseInt(req.params.id);
    const user = users.find((user) => user.id === id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  })
  .patch((req, res) => {
    res.json({ status: "Update feature pending..." });
  })
  .delete((req, res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex((user) => user.id === id);

    if (index === -1) {
      return res.status(404).json({ message: "User not found" });
    }
    users.splice(index, 1);
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users, null, 2), (err) => {
      if (err) {
        console.error("Error deleting user:", err);
        return res.status(500).json({ message: "Failed to delete user" });
      }
      res.json({ message: `User with ID ${id} deleted successfully` });
    });
  });

  app.post("/api/users", (req, res) => {
    const body = req.body;
    users.push({ id: users.length + 1, ...body });
  
    fs.writeFile('./MOCK_DATA.json', JSON.stringify(users), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).json({ status: "error", message: "Failed to write data to file" });
      }
      res.json({ status: "success", id: users.length });
    });
  });


app.get("/users", (req, res) => {
  const html = `<ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
  </ul>`;
  res.send(html);
});

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
