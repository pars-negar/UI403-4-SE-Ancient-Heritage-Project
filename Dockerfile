# === ساخت اپ فرانت (Vue/React) ===
FROM node:18 as frontend-build
WORKDIR /frontend
COPY front-end/ ./
RUN npm install
RUN npm run build

# === ساخت اپ بک‌اند (Django) ===
FROM python:3.12-slim as backend

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /app

# نصب پیش‌نیازهای سیستمی
RUN apt-get update \
    && apt-get install -y build-essential libpq-dev gcc \
    && apt-get clean

# کپی requirements و نصب پکیج‌ها
COPY back-end/project/config/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
RUN pip install gunicorn

# کپی پروژه Django
# کپی پروژه Django
COPY back-end/ .

# تغییر دایرکتوری کاری به دایرکتوری manage.py
WORKDIR /app/project/config

# جمع‌آوری فایل‌های استاتیک
RUN python manage.py collectstatic --noinput

# پورت پیش‌فرض اپ
EXPOSE 8000

# اجرای سرور با Gunicorn
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]

