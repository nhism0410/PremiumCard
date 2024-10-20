const express = require('express');
const router = express.Router();
const Item = require('../models/Item');
const multer = require('multer');
const path = require('path');

// GET all items
router.get('/', async (req, res) => {
  try {
    const items = await Item.find({});
    res.status(200).json(items);
  } catch (error) {
    console.error('Error fetching items:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST new item

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads'); // Specify the uploads directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append time to filename to avoid duplicates
  },
});
const upload = multer({ storage: storage });

// routes/items.js
router.post('/add', upload.single('image'), async (req, res) => {
  const { name, cost,description ,category, fromAddress, toAddress, itemAddress, hash, status, contractIndex } = req.body;

  // Check for missing fields
  if (!name || !cost || !category || !fromAddress || !toAddress || !itemAddress || !hash || !status || !description ) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  try {
    const newItem = new Item({
      name,
      cost,
      description,
      category, // Add category here
      fromAddress,
      toAddress,
      itemAddress,
      hash,
      status,
      contractIndex,
      image: req.file ? `uploads/${req.file.filename}` : null
    });

    const savedItem = await newItem.save();
    res.status(201).json({ message: 'Item created successfully', item: savedItem });
  } catch (error) {
    console.error('Error adding item:', error.message); // Log the error message
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
// POST update item status
router.post('/update', async (req, res) => {
  try {
    const { index, status, category, rating, isRated, buyer } = req.body;

    const updateData = { status, category };
    if (rating !== undefined) {
      updateData.rating = rating;
    }
    if (isRated !== undefined) {
      updateData.isRated = isRated;
    }
    if (buyer !== undefined) {
      updateData.buyer = buyer;
    }

    const updatedItem = await Item.findByIdAndUpdate(index, updateData, { new: true });

    if (!updatedItem) {
      return res.status(404).json({ error: "Item not found" });
    }

    res.json(updatedItem);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET item by id
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ error: 'Item not found' });
    }
    res.status(200).json(item);
  } catch (error) {
    console.error('Error fetching item:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
