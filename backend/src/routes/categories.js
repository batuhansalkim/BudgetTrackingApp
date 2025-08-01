const express = require('express');
const router = express.Router();
const Category = require('../models/Category');
const auth = require('../middleware/auth');

// Tüm kategorileri getir
router.get('/', auth, async (req, res) => {
  try {
    const categories = await Category.find({ user: req.user.id })
      .sort({ name: 1 });
    
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Yeni kategori ekle
router.post('/', auth, async (req, res) => {
  try {
    const { name, icon, color, type } = req.body;

    const category = new Category({
      user: req.user.id,
      name,
      icon,
      color,
      type
    });

    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Kategori güncelle
router.put('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!category) {
      return res.status(404).json({ message: 'Kategori bulunamadı' });
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Kategori sil
router.delete('/:id', auth, async (req, res) => {
  try {
    const category = await Category.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!category) {
      return res.status(404).json({ message: 'Kategori bulunamadı' });
    }

    res.json({ message: 'Kategori silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

module.exports = router; 