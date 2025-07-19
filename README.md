# 📱 Bank Insight – Frontend

A simple React + Vite application that allows searching for customer information using **BVN** or **Phone Number**. It connects to a Spring Boot backend to fetch the data.

---

## 🚀 Features

- Search by **BVN** or **Phone Number**
- Displays: First Name, Last Name, Other Name, Gender, Date of Birth, Email, BVN, Phone Number, Address, Account Type, Status (Active/Dormant), and Balance
- Clean UI with **Bootstrap**
- Handles loading and error states

---

## 🛠️ Tech Stack

- React (with Vite)
- Bootstrap 5
- Axios (for API calls)

---

## 📦 Getting Started

### 1. Clone the Project

```bash
git clone https://github.com/your-username/bank-insight-frontend.git
cd bank-insight-frontend
2. Install Dependencies
npm install

3. Run the App
npm run dev

The app should now be running at:
👉 http://localhost:5173

🌐 Backend API
Make sure your backend is running and accessible at:
http://localhost:8080

Example API Endpoint:
GET /customer/search?bvn=12345678901
GET /customer/search?phone=08012345678
🧪 Search Behavior
If the input is 11 digits, it's treated as a BVN.

Otherwise, it's treated as a phone number.

The app calls the backend accordingly and displays the result.

📁 File Structure
src/
├── App.jsx
├── main.jsx
├── SearchForm.jsx
├── assets/

⚙️ Optional: Environment Variables
You can configure the API base URL using .env:
VITE_API_URL=http://localhost:8080
Then in your axios call:
axios.get(`${import.meta.env.VITE_API_URL}/customer/search`, ...)

📄 License
MIT — Free to use and modify.

✍️ Author
Made with ❤️ by Abdulmumuni Ajoge Adavize

```
