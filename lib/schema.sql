-- Agency Portfolio Database Schema
-- Run this SQL to set up the database

CREATE DATABASE IF NOT EXISTS agency_portfolio;
USE agency_portfolio;

-- Projects table
CREATE TABLE IF NOT EXISTS projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  live_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  business_name VARCHAR(255),
  business_type VARCHAR(100),
  email VARCHAR(255) NOT NULL,
  message TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customization requests table
CREATE TABLE IF NOT EXISTS customization_requests (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  dream_website TEXT,
  color_mood VARCHAR(100),
  features JSON,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Seed data for projects
INSERT INTO projects (name, category, description, image_url, live_url) VALUES
(
  'La Petite Bakery',
  'Bakery',
  'A warm, inviting website for an artisan French bakery featuring an elegant menu display, online ordering system, and a gallery showcasing their handcrafted pastries and sourdough breads.',
  '/images/projects/bakery.jpg',
  '#'
),
(
  'Bloom Boutique',
  'Boutique',
  'A chic, minimalist e-commerce site for a curated women''s fashion boutique. Features a lookbook gallery, size guide, and seamless shopping experience with Instagram integration.',
  '/images/projects/boutique.jpg',
  '#'
),
(
  'Corner Café',
  'Café',
  'A cozy digital home for a neighborhood café with daily specials, an interactive menu, online table reservations, and a blog featuring their coffee sourcing stories.',
  '/images/projects/cafe.jpg',
  '#'
),
(
  'The Linen Room',
  'Boutique',
  'An elegant website for a luxury home textiles boutique showcasing their handwoven linen collections, care guides, and a sophisticated product catalog with zoom details.',
  '/images/projects/linen.jpg',
  '#'
),
(
  'Saffron Kitchen',
  'Café',
  'A vibrant, appetite-inspiring website for an Indian fusion restaurant featuring an interactive menu, chef''s specials, catering services, and integrated online ordering.',
  '/images/projects/kitchen.jpg',
  '#'
),
(
  'Urban Cuts Salon',
  'Salon',
  'A sleek, modern website for a trendy hair salon with online appointment booking, stylist profiles, a before-and-after gallery, and loyalty program integration.',
  '/images/projects/salon.jpg',
  '#'
);
