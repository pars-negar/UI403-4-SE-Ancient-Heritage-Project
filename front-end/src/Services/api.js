// services/api.js

// فرض: API شما لوکال هست یا در آینده روی سرور خواهد بود
export const fetchTours = async () => {
    try {
      const response = await fetch("http://localhost:5000/tours"); // یا آدرس واقعی API
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("خطا در دریافت تورها:", error);
      return [];
    }
  };
  