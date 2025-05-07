FROM python:3.11-slim

# نصب git و distutils
RUN apt-get update && apt-get install -y git python3-distutils

# سایر دستورات نصب
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]
