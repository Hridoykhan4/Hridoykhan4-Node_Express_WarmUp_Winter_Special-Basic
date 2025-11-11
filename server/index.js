const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;
// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://final-recap-firebase.web.app",
      "https://final-recap-firebase.firebaseapp.com",
      "https://winter-coffee-server.vercel.app",
    ],
  })
);

const uri = `mongodb+srv://${process.env.DB_simpleUser}:${process.env.DB_pass}@cluster3.hxc1zsd.mongodb.net/?appName=Cluster3`;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    /*     const userCollection = client.db("usersDB").collection("users");
    const jobCollection = client.db("jobPortalLastRecap").collection("allJobs"); */

    const coffeeCollection = client
      .db("expressoCoffee")
      .collection("allcoffees");
    const usersCollection = client
      .db("expressoCoffee")
      .collection("coffee-users");

    app.get("/coffees", async (req, res) => {
      res.send(await coffeeCollection.find().toArray());
    });

    app.get("/coffees/:id", async (req, res) => {
      res.send(
        await coffeeCollection.findOne({ _id: new ObjectId(req.params.id) })
      );
    });

    app.post("/coffees", async (req, res) => {
      const newCoffee = req.body;
      res.send(await coffeeCollection.insertOne(newCoffee));
    });

    app.delete("/coffees/:id", async (req, res) => {
      res.send(
        await coffeeCollection.deleteOne({ _id: new ObjectId(req.params.id) })
      );
    });

    app.put("/coffees/:id", async (req, res) => {
      res.send(
        await coffeeCollection.updateOne(
          { _id: new ObjectId(req.params.id) },
          { $set: req.body }
        )
      );
    });

    /* Users APIs */

    app.post("/users", async (req, res) => {
      console.log(req.body);
      res.send(await usersCollection.insertOne(req.body));
    });

    app.get("/users", async (req, res) => {
      res.send(await usersCollection.find().toArray());
    });

    app.delete("/users/:id", async (req, res) => {
      const result = await usersCollection.deleteOne({
        _id: new ObjectId(req.params.id),
      });
      res.send(result);
    });

    app.patch("/users/:email", async (req, res) => {
      const filter = { email: req.params.email };
      const { lastSignInTime: creationTime } = req.body;
      res.send(
        await usersCollection.updateOne(filter, { $set: { creationTime } })
      );
    });

    /*     app.post("/users", async (req, res) => {
      const user = req.body;
      console.log(user);
      const result = await userCollection.insertOne(user);
      res.send(result);
    });
    app.get("/users", async (req, res) => {
      const result = await userCollection.find().sort({ age: -1 }).toArray();
      res.send(result);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });
 */
    /*   app.put("/users", async (req, res) => {
      res.send(
        await userCollection.updateMany(
          { age: { $lt: 40 } },
          { $set: { name: "Make Allah pleased" } }
        )
      );
    }); */

    /* const users = [
      { id: 1, name: "Shabana", email: "Shabana@gmail.com" },
      { id: 2, name: "Aslam", email: "aslam@gmail.com" },
      { id: 3, name: "kutta", email: "kutta@gmail.com" },
    ];
     */
    /* app.get("/users", (req, res) => {
      res.send(users);
    });
     */
    /* app.post('/users', (req, res) => {
      const newUser = req.body;
      newUser.id = users.length + 1
      users.push(newUser)
     res.send(newUser)
    }) */

    /*    app.patch("/users/:prevName", async (req, res) => {
      const prevName = req.params.prevName;
      const { name } = req.body;
      const query = { name: { $regex: prevName, $options: "i" } };
      const result = await userCollection.updateOne(query, { $set: { name: name } });
      console.log(result);
      res.send(result || {});
    }); */

    /*    app.get("/users", async (req, res) => {
      const result = await userCollection.find().toArray();
      res.send(result);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      const result = await userCollection.insertOne(user);
      user._id = result.insertedId;
      res.send(user);
    });

    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const result = await userCollection.deleteOne({ _id: new ObjectId(id) });
      res.send(result);
    });

    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await userCollection.findOne(query);
      res.send(result);
    });


    app.put("/users/:id", async(req, res) => {
      const id = req.params.id;
      const user = req.body;
      console.log(user);
      const query = {_id: new ObjectId(id)};
      const updatedUser = {$set: {...user}}
      const result = await userCollection.updateOne(query, updatedUser);
      res.send(result);
    }) */

    /*     app.get("/jobs/job", async (req, res) => {
      let { title } = req?.query;
        title = title?.trim().replace(/\s+/g, " ");
      const matched = await jobCollection
        .find({ title: { $regex: title, $options: "i" } })
        .toArray();
      res.send(matched);
    });
 */

    // await client.connect();
    // await client.db("admin").command({ ping: 1 });
    /*     console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    ); */
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

/**
 * DB End
 */

app.get("/", (req, res) => {
  res.send("Coffee crud revive!");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
