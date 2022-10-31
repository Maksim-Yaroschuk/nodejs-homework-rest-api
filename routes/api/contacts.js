const express = require("express");
const db = require("../../models/contacts");

const router = express.Router();

router.get("/", async (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: await db.listContacts(),
  });
});

router.get("/:contactId", async (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: await db.getContactById(req.params.contactId),
  });
});

router.post("/", async (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: await db.addContact(req.body),
  });
});

router.delete("/:contactId", async (req, res, next) => {
  res.json({
    status: "deleted",
    code: 204,
    data: await db.removeContact(req.params.contactId),
  });
});

router.put("/:contactId", async (req, res, next) => {
  res.json({
    status: "success",
    code: 200,
    data: await db.updateContact(req.params.contactId, req.body),
  });
});

module.exports = router;
