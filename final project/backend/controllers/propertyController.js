const Property = require('../models/Property.js');
const fs = require('fs');
const path = require('path');

exports.getProperties = async (req, res) => {
  try {
    const { location, maxPrice, type } = req.query;
    let filter = {};
    if (location) filter.location = { $regex: location, $options: 'i' };
    if (maxPrice) filter.price = { $lte: parseInt(maxPrice) };
    if (type) filter.type = type;

    const properties = await Property.find(filter).populate('ownerId', 'name email');
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getPropertyById = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id).populate('ownerId', 'name email');
    if (!property) return res.status(404).json({ message: 'Property not found' });
    property.views += 1;
    await property.save();
    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createProperty = async (req, res) => {
  try {
    if (req.user.type !== 'owner') {
      return res.status(403).json({ message: 'Only owners can list properties' });
    }

    const { title, location, price, type, description, amenities } = req.body;

    let imagePaths = [];
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map(file => `/uploads/${file.filename}`);
    } else {

      imagePaths = [
        "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80"
      ];
    }

    const property = new Property({
      title,
      location,
      price,
      type,
      description,
      amenities: amenities ? amenities.split(',').map(a => a.trim()) : [],
      images: imagePaths,
      ownerId: req.user.id,
      isNew: true,
    });

    await property.save();
    res.status(201).json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not the owner' });
    }

    const { title, location, price, type, description, amenities } = req.body;

    if (title) property.title = title;
    if (location) property.location = location;
    if (price) property.price = price;
    if (type) property.type = type;
    if (description) property.description = description;
    if (amenities) property.amenities = amenities.split(',').map(a => a.trim());

    if (req.files && req.files.length > 0) {

      if (property.images && property.images.length > 0) {
        property.images.forEach(oldPath => {
          if (oldPath.startsWith('/uploads/')) {
            const fullPath = path.join(__dirname, '..', oldPath);
            if (fs.existsSync(fullPath)) {
              fs.unlinkSync(fullPath);
            }
          }
        });
      }

      property.images = req.files.map(file => `/uploads/${file.filename}`);
    }

    property.isNew = true;
    await property.save();

    res.json(property);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: 'Property not found' });
    if (property.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'You are not the owner' });
    }

  
    if (property.images && property.images.length > 0) {
      property.images.forEach(oldPath => {
        if (oldPath.startsWith('/uploads/')) {
          const fullPath = path.join(__dirname, '..', oldPath);
          if (fs.existsSync(fullPath)) {
            fs.unlinkSync(fullPath);
          }
        }
      });
    }

    await property.deleteOne();
    res.json({ message: 'Property deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};