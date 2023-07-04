const express = require("express");
const router = new express.Router();
const Contact = require("../../model/contact");
const jwt = require("jsonwebtoken");
const upload = require("../../multer/multer");
const path = require("path");
const fs = require("fs");

const authenticateToken = async (req, res, next) => {
  const token = req.headers.authorization;
  try {
    if (!token) {
      return res.status(401).json({
        status: "failed",
        message: "No User!!!",
      });
    }

    jwt.verify(token, process.env.SECRET_KEY, async (err, jwtObj) => {
      if (err) {
        return res.status(403).json({
          status: "failed",
          message: "Invalid User!!!",
        });
      }
      req.user = jwtObj._doc;
      next();
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
};

router.get("/contact", authenticateToken, async (req, res) => {
  try {
    const contacts = await Contact.find({ user: req.user._id });
    res.status(200).json({
      status: "success",
      data: contacts,
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
});

router.delete("/contact", authenticateToken, async (req, res) => {
  try {
    for (_id in req.body) {
      const cont = await Contact.findById(_id);
      if (cont.user === req.user._id) {
        await Contact.findByIdAndDelete(_id);
      } else {
        throw new Error("Access Denied!!!");
      }
    }
    res.json({
      status: "success",
      data: req.body,
    });
  } catch (e) {
    res.status(403).json({
      status: "failed",
      message: e.message,
    });
  }
});

router.post(
  "/upload",
  authenticateToken,
  upload.single("csv"),
  async (req, res) => {
    try {
      const location = path.join(__dirname, "../../multer/uploads/abc.csv");
      const fileData = fs.readFileSync(location, "utf-8");
      const arr = fileData.split("\n");
      let n = arr.length - 1;
      if (arr.length >= 10) {
        n = 10;
      }

      for (let i = 1; i <= n; i++) {
        const newArr = arr[i].split(",");
        newArr[newArr.length - 1] = newArr[newArr.length - 1].trim();
        const newContact = new Contact({
          name: newArr[0],
          designation: newArr[1],
          company: newArr[2],
          industry: newArr[3],
          email: newArr[4],
          phNo: newArr[5],
          country: newArr[6],
          user: req.user._id,
        });
        await newContact.save();
      }
      fs.unlinkSync(location);

      res.json({
        status: "success",
      });
    } catch (e) {
      res.status(500).json({
        status: "failed",
        message: e.message,
      });
    }
  }
);

router.post("/download", authenticateToken, async (req, res) => {
  try {
    const location = path.join(__dirname, "../../multer/uploads/contact.csv");
    fs.writeFileSync(
      location,
      "name,designation,company,industry,email,phNo,country\n"
    );

    const contacts = [];

    for (key in req.body) {
      const obj = await Contact.findById(key);
      contacts.push(obj);
    }

    contacts.forEach((obj, idx) => {
      if (idx === contacts.length - 1) {
        return fs.appendFileSync(
          location,
          `${obj.name},${obj.designation},${obj.company},${obj.industry},${obj.email},${obj.phNo},${obj.country}`
        );
      }
      fs.appendFileSync(
        location,
        `${obj.name},${obj.designation},${obj.company},${obj.industry},${obj.email},${obj.phNo},${obj.country}\n`
      );
    });
    res.json({
      status: "success",
      link: "http://localhost:8000/api/Contacts",
    });
  } catch (e) {
    res.status(500).json({
      status: "failed",
      message: e.message,
    });
  }
});

router.get("/Contacts", (req, res) => {
  const location = path.join(__dirname, "../../multer/uploads/contact.csv");
  res.sendFile(location);
});

module.exports = router;