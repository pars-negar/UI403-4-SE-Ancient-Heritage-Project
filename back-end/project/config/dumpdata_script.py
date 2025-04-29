import os
from django.core.management import call_command
import django

# تنظیم DJANGO_SETTINGS_MODULE به فایل تنظیمات پروژه
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings')

# بارگذاری تنظیمات Django
django.setup()

with open('config/backup.json', 'w', encoding='utf-8') as f:
    call_command('dumpdata', '--indent', '2', '--natural-foreign', '--natural-primary', stdout=f)
