// mongoDb gives response data as promise,
// in order to handle promise, we use try-catch block in controllers to handle exceptions
// instead of try-catch block, we can use express-async-handler.
const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

//@desc Get all contacts
//route GET "/api/contacts"
//access Public
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
});

//@desc Create new contact
//route POST "/api/contacts"
//access Public
const createContact = asyncHandler(async (req, res) => {
    // console.log("Request body : ", req.body);

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(404);
        throw new Error("All the Fields are required");
    }

    const contact = await Contact.create({
        name,
        email,
        phone,
    })
    res.status(201).json(contact);
});

//@desc Get contact w.r.t id
//route GET "/api/contact/:id"
//access Public
const getContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

//@desc Update contact w.r.t id
//route PUT "/api/contacts/:id"
//access Public
const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);

    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true },
    )
    res.status(200).json(updatedContact);
});

//@desc Delete contact w.r.t id
//route DELETE "/api/contacts/:id"
//access Public
const deleteContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    await Contact.remove();
    res.status(200).json(contact);
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};
