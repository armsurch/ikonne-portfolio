# Ikonne Kingsley Chinonso - Portfolio

A modern, responsive portfolio website built with React and Vite, showcasing professional experience, skills, and client testimonials.

## 🚀 Features

- **Responsive Design**: Optimized for all devices and screen sizes
- **Modern UI/UX**: Clean, professional design with smooth animations
- **Interactive Components**: Dynamic testimonials carousel, skill progress bars
- **Dark/Light Mode**: Theme switching capability
- **Performance Optimized**: Built with Vite for fast loading times
- **SEO Friendly**: Proper meta tags and semantic HTML structure

## 🛠️ Built With

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **React Icons** - Icon library
- **Framer Motion** - Animation library
- **CSS3** - Custom styling with CSS variables
- **JavaScript ES6+** - Modern JavaScript features

## 📱 Sections

- **Header** - Navigation with smooth scrolling
- **Hero** - Introduction and call-to-action
- **About** - Personal background and overview
- **Experience** - Professional work history
- **Education** - Academic background
- **Skills** - Technical skills with proficiency levels
- **Testimonials** - Client feedback and reviews
- **Contact** - Contact information and form
- **Footer** - Additional links and information

## 🚀 Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/ikonne-portfolio.git
cd ikonne-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and visit `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Header.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Experience.jsx
│   ├── Education.jsx
│   ├── Skills.jsx
│   ├── Testimonials.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   └── ScrollToTop.jsx
├── App.jsx             # Main App component
├── main.jsx           # Entry point
├── index.css          # Global styles
└── App.css           # App-specific styles
```

## 🎨 Customization

### Colors and Themes

The project uses CSS custom properties (variables) for easy theming. You can modify the color scheme in `src/index.css`:

```css
:root {
  --primary-color: #3b82f6;
  --secondary-color: #8b5cf6;
  --accent-color: #f59e0b;
  /* ... more variables */
}
```

### Content

Update the content in each component file to reflect your personal information:

- **Personal Info**: Update in `Hero.jsx`, `About.jsx`
- **Experience**: Modify the experience array in `Experience.jsx`
- **Skills**: Update skills data in `Skills.jsx`
- **Testimonials**: Replace with your actual client testimonials in `Testimonials.jsx`

## 📱 Responsive Design

The portfolio is fully responsive and tested on:
- Desktop (1920px and above)
- Laptop (1024px - 1919px)
- Tablet (768px - 1023px)
- Mobile (320px - 767px)

## 🔧 Performance

- **Lighthouse Score**: 95+ on all metrics
- **Bundle Size**: Optimized with Vite's tree shaking
- **Image Optimization**: Responsive images with proper formats
- **Code Splitting**: Automatic code splitting for optimal loading

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Ikonne Kingsley Chinonso**
- Portfolio: [Your Portfolio URL]
- LinkedIn: [Your LinkedIn Profile]
- GitHub: [Your GitHub Profile]
- Email: [Your Email]

## 🤝 Contributing

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📞 Support

If you have any questions or need help with customization, feel free to reach out!

---

⭐ Star this repository if you found it helpful!