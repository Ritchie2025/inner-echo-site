// CMS Dashboard Implementation for Inner Echo Website

// This file contains the implementation for the Content Management System (CMS)
// dashboard for Inner Echo, allowing for easy content updates without coding knowledge.

// Main CMS configuration
const cmsConfig = {
  // Site information
  site: {
    title: 'Inner Echo CMS',
    logo: '/images/logo.jpg',
    primaryColor: '#2d5d46', // Inner Echo green
  },
  
  // User roles and permissions
  roles: {
    admin: {
      name: 'Administrator',
      permissions: ['read', 'write', 'publish', 'manage_users', 'manage_settings']
    },
    editor: {
      name: 'Editor',
      permissions: ['read', 'write', 'publish']
    },
    contributor: {
      name: 'Contributor',
      permissions: ['read', 'write']
    }
  },
  
  // Content models
  contentModels: {
    services: {
      name: 'Services',
      fields: [
        { name: 'title', type: 'string', required: true, label: 'Service Title' },
        { name: 'slug', type: 'string', required: true, label: 'URL Slug' },
        { name: 'description', type: 'richtext', required: true, label: 'Service Description' },
        { name: 'shortDescription', type: 'text', required: true, label: 'Short Description' },
        { name: 'price', type: 'number', required: true, label: 'Price (in USD)' },
        { name: 'duration', type: 'string', required: true, label: 'Duration' },
        { name: 'image', type: 'image', required: false, label: 'Service Image' },
        { name: 'featured', type: 'boolean', required: false, label: 'Featured Service' },
        { name: 'order', type: 'number', required: false, label: 'Display Order' }
      ],
      listDisplay: ['title', 'price', 'duration', 'featured', 'order']
    },
    
    team: {
      name: 'Team Members',
      fields: [
        { name: 'name', type: 'string', required: true, label: 'Full Name' },
        { name: 'position', type: 'string', required: true, label: 'Position' },
        { name: 'bio', type: 'richtext', required: true, label: 'Biography' },
        { name: 'photo', type: 'image', required: false, label: 'Profile Photo' },
        { name: 'email', type: 'string', required: false, label: 'Email Address' },
        { name: 'order', type: 'number', required: false, label: 'Display Order' }
      ],
      listDisplay: ['name', 'position', 'order']
    },
    
    testimonials: {
      name: 'Testimonials',
      fields: [
        { name: 'quote', type: 'text', required: true, label: 'Testimonial Quote' },
        { name: 'author', type: 'string', required: true, label: 'Author Name' },
        { name: 'service', type: 'reference', required: false, label: 'Service', reference: 'services' },
        { name: 'featured', type: 'boolean', required: false, label: 'Featured Testimonial' },
        { name: 'order', type: 'number', required: false, label: 'Display Order' }
      ],
      listDisplay: ['author', 'featured', 'order']
    },
    
    faq: {
      name: 'FAQ Items',
      fields: [
        { name: 'question', type: 'string', required: true, label: 'Question' },
        { name: 'answer', type: 'richtext', required: true, label: 'Answer' },
        { name: 'category', type: 'select', required: false, label: 'Category', options: [
          'General', 'Services', 'Booking', 'Payment', 'Cancellation'
        ]},
        { name: 'featured', type: 'boolean', required: false, label: 'Featured FAQ' },
        { name: 'order', type: 'number', required: false, label: 'Display Order' }
      ],
      listDisplay: ['question', 'category', 'featured', 'order']
    },
    
    pages: {
      name: 'Pages',
      fields: [
        { name: 'title', type: 'string', required: true, label: 'Page Title' },
        { name: 'slug', type: 'string', required: true, label: 'URL Slug' },
        { name: 'content', type: 'richtext', required: true, label: 'Page Content' },
        { name: 'metaTitle', type: 'string', required: false, label: 'Meta Title' },
        { name: 'metaDescription', type: 'text', required: false, label: 'Meta Description' }
      ],
      listDisplay: ['title', 'slug']
    },
    
    blogPosts: {
      name: 'Blog Posts',
      fields: [
        { name: 'title', type: 'string', required: true, label: 'Post Title' },
        { name: 'slug', type: 'string', required: true, label: 'URL Slug' },
        { name: 'content', type: 'richtext', required: true, label: 'Post Content' },
        { name: 'excerpt', type: 'text', required: true, label: 'Excerpt' },
        { name: 'featuredImage', type: 'image', required: false, label: 'Featured Image' },
        { name: 'publishDate', type: 'date', required: true, label: 'Publish Date' },
        { name: 'author', type: 'reference', required: true, label: 'Author', reference: 'team' },
        { name: 'tags', type: 'array', required: false, label: 'Tags' }
      ],
      listDisplay: ['title', 'publishDate', 'author']
    },
    
    emergencyNotices: {
      name: 'Emergency Notices',
      fields: [
        { name: 'title', type: 'string', required: true, label: 'Notice Title' },
        { name: 'content', type: 'richtext', required: true, label: 'Notice Content' },
        { name: 'active', type: 'boolean', required: true, label: 'Active' },
        { name: 'startDate', type: 'date', required: false, label: 'Start Date' },
        { name: 'endDate', type: 'date', required: false, label: 'End Date' },
        { name: 'location', type: 'select', required: true, label: 'Display Location', options: [
          'All Pages', 'Home Page', 'Services Page', 'Booking Page', 'Footer'
        ]}
      ],
      listDisplay: ['title', 'active', 'location']
    },
    
    settings: {
      name: 'Site Settings',
      singleton: true,
      fields: [
        { name: 'siteName', type: 'string', required: true, label: 'Site Name' },
        { name: 'tagline', type: 'string', required: false, label: 'Tagline' },
        { name: 'contactEmail', type: 'string', required: true, label: 'Contact Email' },
        { name: 'contactPhone', type: 'string', required: false, label: 'Contact Phone' },
        { name: 'address', type: 'text', required: false, label: 'Business Address' },
        { name: 'socialLinks', type: 'object', required: false, label: 'Social Media Links' },
        { name: 'footerText', type: 'richtext', required: false, label: 'Footer Text' },
        { name: 'cancellationPolicy', type: 'richtext', required: true, label: 'Cancellation Policy' },
        { name: 'privacyPolicy', type: 'richtext', required: false, label: 'Privacy Policy' },
        { name: 'termsOfService', type: 'richtext', required: false, label: 'Terms of Service' }
      ]
    }
  },
  
  // Dashboard layout
  dashboard: {
    sections: [
      {
        title: 'Content Management',
        items: [
          { label: 'Services', icon: 'spa', model: 'services' },
          { label: 'Team Members', icon: 'people', model: 'team' },
          { label: 'FAQ Items', icon: 'question_answer', model: 'faq' },
          { label: 'Emergency Notices', icon: 'warning', model: 'emergencyNotices' },
          { label: 'Pages', icon: 'description', model: 'pages' },
          { label: 'Blog Posts', icon: 'post_add', model: 'blogPosts' },
          { label: 'Testimonials', icon: 'format_quote', model: 'testimonials' }
        ]
      },
      {
        title: 'Website Settings',
        items: [
          { label: 'Site Settings', icon: 'settings', model: 'settings' },
          { label: 'User Management', icon: 'manage_accounts', action: 'manageUsers' },
          { label: 'Media Library', icon: 'photo_library', action: 'mediaLibrary' }
        ]
      },
      {
        title: 'Analytics & Reports',
        items: [
          { label: 'Booking Statistics', icon: 'analytics', action: 'bookingStats' },
          { label: 'Payment Reports', icon: 'payments', action: 'paymentReports' },
          { label: 'Website Traffic', icon: 'trending_up', action: 'websiteTraffic' }
        ]
      }
    ]
  },
  
  // Initial admin user
  initialUser: {
    email: 'lritchie.cbo@gmail.com',
    name: 'Lathonya Ritchie',
    role: 'admin'
  }
};

// Server-side implementation (Node.js with Express)
/*
const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');

const app = express();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware
app.use(bodyParser.json());
app.use(express.static('public'));

// Database connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/inner_echo_cms', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// User model
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, required: true, enum: ['admin', 'editor', 'contributor'] },
  createdAt: { type: Date, default: Date.now },
  lastLogin: { type: Date }
});

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  
  if (!token) {
    return res.status(401).json({ error: 'Authentication required' });
  }
  
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid token' });
  }
};

// Authorization middleware
const authorize = (requiredPermissions) => {
  return (req, res, next) => {
    const userRole = req.user.role;
    const userPermissions = cmsConfig.roles[userRole].permissions;
    
    const hasPermission = requiredPermissions.every(permission => 
      userPermissions.includes(permission)
    );
    
    if (!hasPermission) {
      return res.status(403).json({ error: 'Insufficient permissions' });
    }
    
    next();
  };
};

// Authentication routes
app.post('/api/cms/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    // Update last login
    user.lastLogin = new Date();
    await user.save();
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, email: user.email, name: user.name, role: user.role },
      JWT_SECRET,
      { expiresIn: '8h' }
    );
    
    res.json({
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role
      }
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User management routes
app.get('/api/cms/users', authenticate, authorize(['manage_users']), async (req, res) => {
  try {
    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/cms/users', authenticate, authorize(['manage_users']), async (req, res) => {
  try {
    const { email, name, password, role } = req.body;
    
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }
    
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create new user
    const user = new User({
      email,
      name,
      password: hashedPassword,
      role
    });
    
    await user.save();
    
    res.status(201).json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Content model routes
// Generate dynamic routes for each content model
Object.entries(cmsConfig.contentModels).forEach(([modelName, modelConfig]) => {
  // Define mongoose schema for this model
  const fields = {};
  
  modelConfig.fields.forEach(field => {
    switch (field.type) {
      case 'string':
      case 'text':
        fields[field.name] = { type: String, required: field.required };
        break;
      case 'number':
        fields[field.name] = { type: Number, required: field.required };
        break;
      case 'boolean':
        fields[field.name] = { type: Boolean, required: field.required, default: false };
        break;
      case 'date':
        fields[field.name] = { type: Date, required: field.required };
        break;
      case 'richtext':
        fields[field.name] = { type: String, required: field.required };
        break;
      case 'image':
        fields[field.name] = { type: String, required: field.required };
        break;
      case 'reference':
        fields[field.name] = { type: mongoose.Schema.Types.ObjectId, ref: field.reference, required: field.required };
        break;
      case 'array':
        fields[field.name] = { type: [String], required: field.required, default: [] };
        break;
      case 'object':
        fields[field.name] = { type: Object, required: field.required, default: {} };
        break;
      case 'select':
        fields[field.name] = { type: String, required: field.required, enum: field.options };
        break;
    }
  });
  
  // Add common fields
  fields.createdBy = { type: mongoose.Schema.Types.ObjectId, ref: 'User' };
  fields.updatedBy = { type: mongoose.Schema.Types.ObjectId, ref: 'User' };
  fields.createdAt = { type: Date, default: Date.now };
  fields.updatedAt = { type: Date, default: Date.now };
  
  // Create mongoose model
  const ModelSchema = new mongoose.Schema(fields);
  const Model = mongoose.model(modelName, ModelSchema);
  
  // Create CRUD routes for this model
  
  // GET all items
  app.get(`/api/cms/${modelName}`, authenticate, authorize(['read']), async (req, res) => {
    try {
      const items = await Model.find();
      res.json(items);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // GET single item
  app.get(`/api/cms/${modelName}/:id`, authenticate, authorize(['read']), async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // POST new item
  app.post(`/api/cms/${modelName}`, authenticate, authorize(['write']), async (req, res) => {
    try {
      const newItem = new Model({
        ...req.body,
        createdBy: req.user.id,
        updatedBy: req.user.id
      });
      
      await newItem.save();
      res.status(201).json(newItem);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // PUT update item
  app.put(`/api/cms/${modelName}/:id`, authenticate, authorize(['write']), async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      // Update fields
      Object.keys(req.body).forEach(key => {
        item[key] = req.body[key];
      });
      
      // Update metadata
      item.updatedBy = req.user.id;
      item.updatedAt = new Date();
      
      await item.save();
      res.json(item);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // DELETE item
  app.delete(`/api/cms/${modelName}/:id`, authenticate, authorize(['write']), async (req, res) => {
    try {
      const item = await Model.findById(req.params.id);
      
      if (!item) {
        return res.status(404).json({ error: 'Item not found' });
      }
      
      await item.remove();
      res.json({ message: 'Item deleted successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
});

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'public/uploads/');
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    // Accept images and PDFs
    if (file.mimetype.startsWith('image/') || file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only images and PDFs are allowed'));
    }
  }
});

// File upload route
app.post('/api/cms/upload', authenticate, authorize(['write']), upload.single('file'), (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    const fileUrl = `/uploads/${req.file.filename}`;
    
    res.json({
      url: fileUrl,
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Media library route
app.get('/api/cms/media', authenticate, authorize(['read']), async (req, res) => {
  try {
    const fs = require('fs');
    const uploadsDir = path.join(__dirname, 'public/uploads');
    
    fs.readdir(uploadsDir, (err, files) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      
      const mediaFiles = files.map(filename => {
        const stats = fs.statSync(path.join(uploadsDir, filename));
        const ext = path.extname(filename).toLowerCase();
        
        return {
          url: `/uploads/${filename}`,
          filename,
          type: ext === '.pdf' ? 'pdf' : 'image',
          size: stats.size,
          createdAt: stats.birthtime
        };
      });
      
      res.json(mediaFiles);
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Initialize admin user
const initializeAdmin = async () => {
  try {
    const { email, name, role } = cmsConfig.initialUser;
    
    // Check if admin user already exists
    const existingUser = await User.findOne({ email });
    
    if (existingUser) {
      console.log('Admin user already exists');
      return;
    }
    
    // Generate random password
    const generatePassword = () => {
      const length = 12;
      const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+';
      let password = '';
      
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
      }
      
      return password;
    };
    
    const password = generatePassword();
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Create admin user
    const adminUser = new User({
      email,
      name,
      password: hashedPassword,
      role
    });
    
    await adminUser.save();
    
    console.log('Admin user created successfully');
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Please save this password securely and change it after first login');
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Start server
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`CMS server running on port ${PORT}`);
  
  // Initialize database models and admin user
  mongoose.connection.once('open', () => {
    console.log('Connected to database');
    initializeAdmin();
  });
});
*/
