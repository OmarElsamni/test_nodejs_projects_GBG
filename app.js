const express = require('express');
const app = express();

const html = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Samni Elwensh - App Runner</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        :root {
            --primary: #667eea;
            --secondary: #764ba2;
            --accent: #f093fb;
            --dark: #1a1a2e;
            --light: #f8f9fa;
        }
        
        html {
            scroll-behavior: smooth;
        }
        
        body {
            font-family: 'Poppins', sans-serif;
            background: var(--dark);
            color: var(--light);
            overflow-x: hidden;
            position: relative;
        }
        
        /* Animated Background */
        .animated-bg {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            background: linear-gradient(-45deg, #1a1a2e, #16213e, #0f3460, #533483);
            background-size: 400% 400%;
            animation: gradientShift 15s ease infinite;
        }
        
        @keyframes gradientShift {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
        }
        
        /* Floating Particles */
        .particles {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            z-index: -1;
            pointer-events: none;
        }
        
        .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            animation: float 20s infinite ease-in-out;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0) translateX(0); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) translateX(100px); opacity: 0; }
        }
        
        /* Sticky Header */
        header {
            position: sticky;
            top: 0;
            z-index: 1000;
            background: rgba(26, 26, 46, 0.8);
            backdrop-filter: blur(10px);
            padding: 20px 0;
            box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
            transition: all 0.3s ease;
        }
        
        header.scrolled {
            padding: 15px 0;
            box-shadow: 0 4px 30px rgba(102, 126, 234, 0.3);
        }
        
        .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 30px;
        }
        
        nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .logo {
            font-size: 28px;
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: pulse 2s ease-in-out infinite;
            cursor: pointer;
        }
        
        @keyframes pulse {
            0%, 100% { transform: scale(1); }
            50% { transform: scale(1.05); }
        }
        
        .nav-links {
            display: flex;
            list-style: none;
            gap: 40px;
        }
        
        .nav-links a {
            text-decoration: none;
            color: var(--light);
            font-weight: 500;
            position: relative;
            padding: 5px 0;
            transition: color 0.3s;
        }
        
        .nav-links a::after {
            content: '';
            position: absolute;
            bottom: 0;
            left: 0;
            width: 0;
            height: 2px;
            background: linear-gradient(90deg, var(--primary), var(--accent));
            transition: width 0.3s ease;
        }
        
        .nav-links a:hover::after {
            width: 100%;
        }
        
        .nav-links a:hover {
            color: var(--accent);
        }
        
        /* Hero Section */
        .hero {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            text-align: center;
            padding: 100px 20px;
            position: relative;
        }
        
        .hero-content {
            max-width: 900px;
            animation: fadeInUp 1s ease-out;
        }
        
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(30px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
        
        .hero h1 {
            font-size: 72px;
            font-weight: 800;
            margin-bottom: 30px;
            background: linear-gradient(135deg, var(--primary), var(--accent), var(--primary));
            background-size: 200% 200%;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            animation: gradientText 5s ease infinite;
        }
        
        @keyframes gradientText {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
        
        .hero p {
            font-size: 22px;
            color: rgba(255, 255, 255, 0.8);
            margin-bottom: 40px;
            line-height: 1.8;
        }
        
        .btn {
            display: inline-block;
            padding: 18px 50px;
            background: linear-gradient(135deg, var(--primary), var(--secondary));
            color: white;
            text-decoration: none;
            border-radius: 50px;
            font-weight: 600;
            font-size: 18px;
            transition: all 0.4s ease;
            box-shadow: 0 8px 30px rgba(102, 126, 234, 0.4);
            position: relative;
            overflow: hidden;
        }
        
        .btn::before {
            content: '';
            position: absolute;
            top: 0;
            left: -100%;
            width: 100%;
            height: 100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
            transition: left 0.5s;
        }
        
        .btn:hover::before {
            left: 100%;
        }
        
        .btn:hover {
            transform: translateY(-5px) scale(1.05);
            box-shadow: 0 15px 40px rgba(102, 126, 234, 0.6);
        }
        
        /* Stats Section */
        .stats {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
            gap: 30px;
            padding: 80px 20px;
            margin: 40px 0;
        }
        
        .stat-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            padding: 40px;
            border-radius: 20px;
            text-align: center;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.4s ease;
            position: relative;
            overflow: hidden;
        }
        
        .stat-card::before {
            content: '';
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: radial-gradient(circle, rgba(102, 126, 234, 0.1), transparent);
            transform: scale(0);
            transition: transform 0.6s;
        }
        
        .stat-card:hover::before {
            transform: scale(1);
        }
        
        .stat-card:hover {
            transform: translateY(-10px);
            border-color: var(--primary);
            box-shadow: 0 20px 40px rgba(102, 126, 234, 0.3);
        }
        
        .stat-number {
            font-size: 48px;
            font-weight: 800;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            margin-bottom: 10px;
        }
        
        .stat-label {
            font-size: 18px;
            color: rgba(255, 255, 255, 0.7);
        }
        
        /* Features Section */
        .features {
            padding: 100px 20px;
        }
        
        .section-title {
            text-align: center;
            font-size: 48px;
            font-weight: 800;
            margin-bottom: 60px;
            background: linear-gradient(135deg, var(--primary), var(--accent));
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        
        .features-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
            gap: 40px;
        }
        
        .feature-card {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            padding: 50px 40px;
            border-radius: 25px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
            position: relative;
            overflow: hidden;
        }
        
        .feature-card::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
            opacity: 0;
            transition: opacity 0.4s;
        }
        
        .feature-card:hover::after {
            opacity: 1;
        }
        
        .feature-card:hover {
            transform: translateY(-15px) rotate(1deg);
            border-color: var(--primary);
            box-shadow: 0 25px 50px rgba(102, 126, 234, 0.4);
        }
        
        .feature-icon {
            font-size: 64px;
            margin-bottom: 25px;
            display: inline-block;
            animation: bounce 2s ease-in-out infinite;
            filter: drop-shadow(0 5px 15px rgba(102, 126, 234, 0.5));
        }
        
        @keyframes bounce {
            0%, 100% { transform: translateY(0); }
            50% { transform: translateY(-10px); }
        }
        
        .feature-card h3 {
            font-size: 28px;
            margin-bottom: 20px;
            color: var(--light);
            font-weight: 700;
        }
        
        .feature-card p {
            color: rgba(255, 255, 255, 0.7);
            line-height: 1.8;
            font-size: 16px;
        }
        
        /* Contributors Section */
        .contributors {
            padding: 80px 20px;
            text-align: center;
        }
        
        .contributors-list {
            display: flex;
            flex-wrap: wrap;
            justify-content: center;
            gap: 20px;
            margin-top: 40px;
        }
        
        .contributor-badge {
            background: rgba(255, 255, 255, 0.05);
            backdrop-filter: blur(10px);
            padding: 15px 30px;
            border-radius: 50px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: all 0.3s ease;
            display: inline-block;
        }
        
        .contributor-badge:hover {
            transform: scale(1.1);
            background: rgba(102, 126, 234, 0.2);
            border-color: var(--primary);
        }
        
        /* Footer */
        footer {
            background: rgba(26, 26, 46, 0.9);
            backdrop-filter: blur(10px);
            padding: 50px 20px;
            text-align: center;
            border-top: 1px solid rgba(255, 255, 255, 0.1);
            margin-top: 80px;
        }
        
        footer p {
            color: rgba(255, 255, 255, 0.6);
            margin: 10px 0;
            font-size: 14px;
        }
        
        /* Scroll Animations */
        .fade-in {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
        }
        
        .fade-in.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Responsive */
        @media (max-width: 768px) {
            .hero h1 {
                font-size: 42px;
            }
            
            .hero p {
                font-size: 18px;
            }
            
            .nav-links {
                gap: 20px;
                font-size: 14px;
            }
            
            .section-title {
                font-size: 36px;
            }
            
            .features-grid {
                grid-template-columns: 1fr;
            }
            
            .stats {
                grid-template-columns: 1fr;
            }
        }
    </style>
</head>
<body>
    <div class="animated-bg"></div>
    <div class="particles" id="particles"></div>
    
    <header id="header">
        <div class="container">
            <nav>
                <div class="logo">🚀 Samni Elwensh</div>
                <ul class="nav-links">
                    <li><a href="#home">Home</a></li>
                    <li><a href="#features">Features</a></li>
                    <li><a href="#stats">Stats</a></li>
                    <li><a href="#contributors">Contributors</a></li>
                </ul>
            </nav>
        </div>
    </header>
    
    <section class="hero" id="home">
        <div class="hero-content">
            <h1>Welcome to App Runner!</h1>
            <p>Deploy and scale web applications with ease. Experience the power of AWS App Runner with a beautiful, modern interface that adapts to your needs.</p>
            <a href="#features" class="btn">Get Started</a>
        </div>
    </section>
    
    <section class="stats" id="stats">
        <div class="stat-card fade-in">
            <div class="stat-number" data-target="99.9">0</div>
            <div class="stat-label">Uptime %</div>
        </div>
        <div class="stat-card fade-in">
            <div class="stat-number" data-target="1000">0</div>
            <div class="stat-label">Deployments</div>
        </div>
        <div class="stat-card fade-in">
            <div class="stat-number" data-target="50">0</div>
            <div class="stat-label">Countries</div>
        </div>
        <div class="stat-card fade-in">
            <div class="stat-number" data-target="24">0</div>
            <div class="stat-label">Support Hours</div>
        </div>
    </section>
    
    <section class="features" id="features">
        <h2 class="section-title fade-in">Amazing Features</h2>
        <div class="features-grid">
            <div class="feature-card fade-in">
                <div class="feature-icon">⚡</div>
                <h3>Fast Deployment</h3>
                <p>Deploy your applications quickly and efficiently with automated processes and best practices built-in. Get your app live in minutes, not hours.</p>
            </div>
            
            <div class="feature-card fade-in">
                <div class="feature-icon">📈</div>
                <h3>Auto Scaling</h3>
                <p>Scale your application automatically based on demand. Handle traffic spikes without manual intervention. Always stay ahead of your users' needs.</p>
            </div>
            
            <div class="feature-card fade-in">
                <div class="feature-icon">🔒</div>
                <h3>Secure & Reliable</h3>
                <p>Built on AWS infrastructure with enterprise-grade security and 99.99% uptime guarantee. Sleep well knowing your app is protected.</p>
            </div>
        </div>
    </section>
    
    <section class="contributors" id="contributors">
        <h2 class="section-title fade-in">Our Contributors</h2>
        <div class="contributors-list">
            <span class="contributor-badge">Patol</span>
            <span class="contributor-badge">Omar Elsamni</span>
            <span class="contributor-badge">Ali Abdelazim</span>
            <span class="contributor-badge">Patol Abdullah</span>
            <span class="contributor-badge">Mennah Ahmed</span>
        </div>
    </section>
    
    <footer>
        <p>&copy; 2024 App Runner Application. Powered by AWS.</p>
        <p>Made with ❤️ by the Samni Elwensh Team</p>
    </footer>
    
    <script>
        // Create floating particles
        function createParticles() {
            const particlesContainer = document.getElementById('particles');
            for (let i = 0; i < 50; i++) {
                const particle = document.createElement('div');
                particle.className = 'particle';
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                particle.style.animationDelay = Math.random() * 20 + 's';
                particle.style.width = particle.style.height = (Math.random() * 4 + 2) + 'px';
                particlesContainer.appendChild(particle);
            }
        }
        
        // Header scroll effect
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
        
        // Scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);
        
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });
        
        // Animated counters
        function animateCounter(element) {
            const target = parseInt(element.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const timer = setInterval(() => {
                current += step;
                if (current >= target) {
                    element.textContent = target + (target === 99.9 ? '' : '+');
                    clearInterval(timer);
                } else {
                    element.textContent = Math.floor(current) + (target === 99.9 ? '' : '+');
                }
            }, 16);
        }
        
        const counterObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target.querySelector('.stat-number');
                    if (counter && !counter.classList.contains('counted')) {
                        counter.classList.add('counted');
                        animateCounter(counter);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        document.querySelectorAll('.stat-card').forEach(card => {
            counterObserver.observe(card);
        });
        
        // Smooth scroll for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
        
        // Initialize
        createParticles();
    </script>
</body>
</html>
`;

app.get('/', (req, res) => res.send(html));
app.listen(process.env.PORT || 3000);