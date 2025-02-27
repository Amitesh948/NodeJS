const express = require("express");
const mongoose = require("mongoose");

const app = express();
const PORT = 8000;

app.use(express.json());

app.use(express.urlencoded({ extended: false }));

mongoose.connect('mongodb://127.0.0.1:27017/demo-project-1')
.then(()=>{
    console.log("MongoDB Connected");
})
.catch((err)=>{
    console.log(err);
});
const userSchema = new mongoose.Schema({
    first_name: {type :String, required: true},
    last_name: {type :String},
    email: {type :String, required: true, unique: true},
    gender: {type : String},
    job_title: {type :String},
},{timestamps : true});

const User = mongoose.model("user", userSchema);
app.get("/api/users", async(req, res) => {
    const allDBUsers = await User.find({});

    return res.json(allDBUsers);
});

app.get("/users", async(req, res) => {
    const allDBUsers = await User.find({});
    const html = `<ul>
      ${allDBUsers.map((user) => `<li>${user.first_name} </li>`).join("")}
    </ul>`;
    res.send(html);
  });

app.post("/api/users", async (req, res) => {
    const body = req.body;
    console.log(body);
    
    try {
        const newUser = new User({
            first_name: body.first_name,
            last_name: body.last_name,
            email: body.email,
            gender: body.gender,
            job_title: body.job_title,
        });
        
      await newUser.save();
      
      res.status(201).json({ msg: "User created successfully", user: newUser });
    } catch (err) {
      console.error("Error creating user:", err);
      res.status(500).json({ msg: "Error saving user" });
    }
  });

  app
  .route("/api/users/:id")
  .get(async(req, res) => {
   const user = await User.findById(req.params.id);


    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  })
  .patch(async(req, res) => {
    const user =  await User.findByIdAndUpdate(req.params.id , {last_name : "Updated Name"});
    res.json({ status: "Update feature pending..." });
  })
  .delete(async(req, res) => {
    const user =  await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json({status : "User deleted successfully"});

  });

  app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`));
