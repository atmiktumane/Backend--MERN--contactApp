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
router.route("/").get(getContacts).post(createContact);

// get contact w.r.t id
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
