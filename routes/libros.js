const express = require("express");
const router = express.Router();

const libro = require("../controllers/librosController");

router.get("/", libro.getLibros);
router.get("/:id", libro.getLibro);
router.post("/", libro.createLibro);
router.put("/:id", libro.updateLibro);
router.delete("/:id", libro.deleteLibro);

module.exports = router;