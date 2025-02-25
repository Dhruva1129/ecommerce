const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const { authenticate, authorizeRole } = require("./middleware");  // Correct path to auth middleware

// Add a new product (Only Admin)
router.post("/add", authenticate, authorizeRole("admin"), async (req, res) => {
    const { customId, name, category, description, price, image } = req.body;

    try {
        // Check if product with the customId already exists
        const existingProduct = await Product.findOne({ customId });
        if (existingProduct) {
            return res.status(400).json({ message: "Product with this ID already exists" });
        }

        const product = new Product({ customId, name, category, description, price, image});
        await product.save();
        res.status(201).json({ message: "Product added successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error adding product", error });
    }
});

// Get all products
router.get("/", authenticate, async (req, res) => {
    try {
        const products = await Product.find(); // Fetch products from the database
        res.status(200).json(products); // Send back the products
    } catch (error) {
        res.status(500).json({ message: "Error fetching products", error });
    }
});

// Update a product's details (like quantity or other fields)
// Update product by customId (Admin only)
router.put("/update/:customId", authenticate, async (req, res) => {
    const { customId } = req.params;
    const { name, description, price } = req.body;

    try {
        const product = await Product.findOne({ customId });
        if (!product) {
            return res.status(404).json({ message: "Product not found" });
        }

        // Update product details
        product.name = name;
        product.description = description;
        product.price = price;
        await product.save();

        res.status(200).json({ message: "Product updated successfully", product });
    } catch (error) {
        res.status(500).json({ message: "Error updating product", error });
    }
});


// Delete a product by customId (Admin only)
router.delete("/delete/:customId", authenticate, authorizeRole("admin"), async (req, res) => {
    const { customId } = req.params;

    try {
        const deletedProduct = await Product.findOneAndDelete({ customId });
        if (!deletedProduct) {
            return res.status(404).json({ message: "Product not found" });
        }
        res.status(200).json({ message: "Product deleted successfully", deletedProduct });
    } catch (error) {
        res.status(500).json({ message: "Error deleting product", error });
    }
});

module.exports = router;
