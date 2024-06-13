import express from 'express';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';
import Post from '../mongodb/models/post.js';

dotenv.config();

const router = express.Router();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Get all posts
router.get('/', async(req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json({ success: true, data: posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ success: false, message: 'Failed to fetch posts' });
    }
});

// Create a new post
router.post('/', async(req, res) => {
    try {
        const { name, photo, prompt } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newPost = await Post.create({
            name,
            prompt,
            photo: photoUrl.url,
        });

        res.status(200).json({ success: true, data: newPost });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ success: false, message: 'Unable to create post' });
    }
});

export default router;