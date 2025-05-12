# استفاده از تصویر پایه Python
FROM python:3.12-slim

# تنظیم مسیر کاری به دایرکتوری پروژه که manage.py در آن است
WORKDIR /app

# کپی کردن requirements.txt و نصب وابستگی‌ها
COPY requirements.txt requirements.txt
RUN pip install --no-cache-dir -r requirements.txt

# کپی کردن تمام فایل‌ها به کانتینر
COPY . .

# اجرای دستورات Django
RUN python manage.py collectstatic --noinput

# اجرای Gunicorn برای اجرای اپلیکیشن Django
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
