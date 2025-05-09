# استفاده از تصویر پایه Python
FROM python:3.12-slim

# تنظیم دایرکتوری کاری
WORKDIR /app

# کپی فایل‌های نیازمندی‌ها
COPY requirements.txt requirements.txt

# نصب وابستگی‌ها
RUN pip install --no-cache-dir -r requirements.txt

# کپی بقیه فایل‌های پروژه
COPY . .

# پورت 8000 رو باز کن
EXPOSE 8000

# اجرای سرور Django
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
