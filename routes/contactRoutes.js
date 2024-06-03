const express = require("express");
const {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

// Protecting Contact Routes using validateToken Middleware
router.use(validateToken);

// get all contacts
router.route("/").get(getContacts).post(createContact);

// get contact w.r.t id
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
