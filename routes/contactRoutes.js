const express = require("express");

const router = express.Router();

// get all contacts
router.route("/").get((req, res) => {
    res.status(200).json({ message: "Get all contacts" });
})

// create new contact
router.route("/").post((req, res) => {
    res.status(201).json({ message: "Created new contact" });
})

// get contact w.r.t id
router.route("/:id").get((req, res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}` });
})

// update contact w.r.t id
router.route("/:id").put((req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` });
})

// delete contact w.r.t id
router.route("/:id").delete((req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` });
})

module.exports = router;