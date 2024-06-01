const express = require("express");
const {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
} = require("../controllers/contactController");

const router = express.Router();

// get all contacts
router.route("/").get(getContacts);

// create new contact
router.route("/").post(createContact);

// get contact w.r.t id
router.route("/:id").get(getContact);

// update contact w.r.t id
router.route("/:id").put(updateContact);

// delete contact w.r.t id
router.route("/:id").delete(deleteContact);

module.exports = router;
