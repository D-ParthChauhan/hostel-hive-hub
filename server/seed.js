const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User'); // Ensure this path matches your file structure
const { Subreddit } = require('./models/Community'); // Ensure this path matches

// Adjust this URI if you are using MongoDB Atlas instead of local
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/hostelHiveDB';

const seed = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('🌱 Connected to DB for seeding...');

    // --- 1. Create Master Council Member ---
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('admin123', salt);

    const adminUser = {
      name: 'General Secretary',
      email: 'gsec@hostel5.iitb.ac.in',
      password: hashedPassword,
      role: 'council',
      roomNumber: 'Penthouse'
    };

    // Remove existing admin to avoid duplicates/conflicts during re-seeding
    await User.deleteMany({ email: adminUser.email });
    
    const newAdmin = new User(adminUser);
    await newAdmin.save();
    console.log(`✅ Master Council User Created: ${adminUser.email} / admin123`);

    // --- 2. Create Default Subreddits ---
    const subs = [
      { name: 'General', description: 'General discussions about hostel life' },
      { name: 'Mess', description: 'Food reviews, complaints, and menu updates' },
      { name: 'Sports', description: 'Cricket, Football, GC updates, and gear' },
      { name: 'Tech', description: 'Coding, Hackathons, and tech support' }
    ];

    // Optional: Clear existing subreddits to reset state
    await Subreddit.deleteMany({});
    
    // Insert subreddits
    // Note: We need a valid user ID for 'createdBy'. We'll use the admin we just created.
    const subsWithCreator = subs.map(sub => ({ ...sub, createdBy: newAdmin._id }));
    await Subreddit.insertMany(subsWithCreator);
    console.log('✅ Default Subreddits Created');

    console.log('🎉 Seeding completed successfully!');
    process.exit(0);
  } catch (e) {
    console.error('❌ Seeding Error:', e);
    process.exit(1);
  }
};

seed();