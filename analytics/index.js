const express = require("express");
const fs = require("fs")
const app = express();

const PORT = process.env.PORT || 5000;

app.get("/", async(req, res) => {
    // add time and number of users
        fs.readFile("analytics.json", "utf8", (err, data) => {
        if (err) return res.status(500).send("bad!");
        data = JSON.parse(data);
        data.details.push(contact);
        fs.writeFile("contacts.json", JSON.stringify(data), (err) => {
            if (err) return res.status(500).send("bad!");
            return res.status(201).send("successful");
        });
    });
})

app.listen(PORT, () => {
    console.log(`server connected to port ${PORT}`);
});
