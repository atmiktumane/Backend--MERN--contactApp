// mongoDb gives response data as promise,
// in order to handle promise, we use try-catch block in controllers to handle exceptions
// instead of try-catch block, we can use express-async-handler.
const asyncHandler = require("express-async-handler");

const Contact = require("../models/contactModel");

//@desc Get all contacts
//route GET "/api/contacts"
//access Private
const getContacts = asyncHandler(async (req, res) => {
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
});

//@desc Create new contact
//route POST "/api/contacts"
//access Private
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
        user_id: req.user.id,
    })
    res.status(201).json(contact);
});

//@desc Get contact w.r.t id
//route GET "/api/contact/:id"
//access Private
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
//access Private
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
//access Private
const deleteContact = asyncHandler(async (req, res) => {
    try {
        const contact = await Contact.findById(req.params.id);

        // if (contact) {
        //     await contact.remove();
        //     res.status(200).json(contact);
        //     console.log("Removed the Contact successfully");
        // }
        // else {
        //     res.status(404);
        //     throw new Error("Contact not found");
        // }


        // Use deleteOne to delete the user by ID
        const result = await Contact.deleteOne({ _id: req.params.id });

        if (result.deletedCount === 1) {
            console.log(`User with ID ${req.params.id} has been deleted.`);
            res.status(200).json(contact);
        } else {
            console.log(`User with ID ${req.params.id} not found.`);
        }
    } catch (err) {
        console.error("Error deleting contact: ", err);

    }

});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};
