//@desc Get all contacts
//route GET "/api/contacts"
//access Public
const getContacts = (req, res) => {
    res.status(200).json({ message: "Get all contacts" });
};

//@desc Create new contact
//route POST "/api/contacts"
//access Public
const createContact = (req, res) => {
    console.log("Request body : ", req.body);

    const { name, email, phone } = req.body;

    if (!name || !email || !phone) {
        res.status(404);
        throw new Error("All the Fields are required");
    }
    res.status(201).json({ message: "Created new contact" });
};

//@desc Get contact w.r.t id
//route GET "/api/contact/:id"
//access Public
const getContact = (req, res) => {
    res.status(200).json({ message: `Get contact for ${req.params.id}` });
};

//@desc Update contact w.r.t id
//route PUT "/api/contacts/:id"
//access Public
const updateContact = (req, res) => {
    res.status(200).json({ message: `Update contact for ${req.params.id}` });
};

//@desc Delete contact w.r.t id
//route DELETE "/api/contacts/:id"
//access Public
const deleteContact = (req, res) => {
    res.status(200).json({ message: `Delete contact for ${req.params.id}` });
};

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact,
};
