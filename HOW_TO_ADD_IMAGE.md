# How to Add Your Professional Photo

## Method 1: Using Public Folder (Recommended)

1. **Add your image to the public folder:**
   - Place your professional photo in `Front/public/` folder
   - Name it something like `profile-photo.jpg` or `ikonne-photo.jpg`

2. **Update the About component:**
   - Open `src/components/About.jsx`
   - Find the comment that says "To add your actual photo..."
   - Replace the entire `<div className="image-placeholder">` section with:
   ```jsx
   <img src="/profile-photo.jpg" alt="Ikonne Kingsley - Electrical Engineer" />
   ```

## Method 2: Import Method

1. **Add your image to src folder:**
   - Create a folder `src/assets/images/`
   - Place your photo there

2. **Import and use:**
   ```jsx
   import profilePhoto from '../assets/images/profile-photo.jpg';
   
   // Then use:
   <img src={profilePhoto} alt="Ikonne Kingsley - Electrical Engineer" />
   ```

## Image Requirements

- **Format:** JPG, PNG, or WebP
- **Size:** Recommended 800x1000 pixels (4:5 aspect ratio)
- **File size:** Keep under 500KB for fast loading
- **Style:** Professional, well-lit, business casual or formal attire

## Tips for Best Results

- Use a high-quality, professional photo
- Ensure good lighting and clear background
- The image will be automatically cropped to fit the container
- Consider using a photo editing tool to optimize the image size

The placeholder will be automatically replaced once you add your image!