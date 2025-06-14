# Agri Plant 🪴  
A responsive gardening-themed eCommerce platform built with Django, PostgreSQL, React, React Router, and Tailwind CSS. Features include product listings, JWT auth, Razorpay checkout, protected routes, and an admin panel.

---

## 🌿 Features

- **JWT Authentication**: Signup, Login, Logout
- **Product Browsing**: Categorized (Seeds, Equipment, Household Items)
- **Cart & Checkout**: Zustand-powered cart, Razorpay integration
- **Order History**: Accessible via user profile
- **Admin Panel**: Product/category CRUD, view orders
- **Responsive UI**: Tailwind-first, mobile-optimized
- **Dev Ready**: Organized folders, `.env.sample`, clean code

---

## 📦 Tech Stack

### Frontend
- React, React Router
- Zustand (State Management)
- Tailwind CSS
- Razorpay (Frontend Integration)

### Backend
- Django & Django REST Framework
- PostgreSQL
- JWT via djangorestframework-simplejwt
- Razorpay (Order & Payment Verification)

---

## 🚀 Getting Started

### Backend Setup

```bash
cd backend
python -m venv env
source env/bin/activate  # or .\env\Scripts\activate on Windows
pip install -r requirements.txt
cp .env.sample .env
python manage.py migrate
python manage.py runserver
# agri-plant-ecommerce
