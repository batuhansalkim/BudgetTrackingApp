const express = require('express');
const router = express.Router();
const Goal = require('../models/Goal');
const auth = require('../middleware/auth');

// Tüm hedefleri getir
router.get('/', auth, async (req, res) => {
  try {
    const goals = await Goal.find({ user: req.user.id })
      .sort({ createdAt: -1 });
    
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Yeni hedef ekle
router.post('/', auth, async (req, res) => {
  try {
    const { title, targetAmount, currentAmount, deadline, icon, description } = req.body;

    const goal = new Goal({
      user: req.user.id,
      title,
      targetAmount,
      currentAmount: currentAmount || 0,
      deadline,
      icon,
      description
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Hedef güncelle
router.put('/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true }
    );

    if (!goal) {
      return res.status(404).json({ message: 'Hedef bulunamadı' });
    }

    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

// Hedef sil
router.delete('/:id', auth, async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!goal) {
      return res.status(404).json({ message: 'Hedef bulunamadı' });
    }

    res.json({ message: 'Hedef silindi' });
  } catch (error) {
    res.status(500).json({ message: 'Sunucu hatası', error: error.message });
  }
});

module.exports = router;