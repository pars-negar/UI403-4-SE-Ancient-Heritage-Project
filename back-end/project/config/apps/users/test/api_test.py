import pytest
from hypothesis import given, strategies as st
from accounts.serializers import UserRegisterSerializer
from django.contrib.auth import get_user_model
import re

User = get_user_model()

# استراتژی تولید شماره تلفن معتبر (11 رقم و با 0 شروع)
valid_phone_strategy = st.from_regex(r'^\d{11}$', fullmatch=True)

# استراتژی تولید شماره تلفن نامعتبر (هر رشته‌ای غیر از 11 رقم)
invalid_phone_strategy = st.text(min_size=1, max_size=15).filter(lambda x: not re.fullmatch(r'\d{11}', x))

# استراتژی تولید ایمیل معتبر
valid_email_strategy = st.emails()

# استراتژی تولید ایمیل نامعتبر
invalid_email_strategy = st.text(min_size=1, max_size=20).filter(lambda x: not re.fullmatch(r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$', x))

# استراتژی تولید پسورد معتبر
valid_password_strategy = st.from_regex(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$', fullmatch=True)

# استراتژی تولید پسورد نامعتبر (هر رشته‌ای که شرط بالا رو نداشته باشد)
invalid_password_strategy = st.text(min_size=1, max_size=20).filter(lambda x: not re.fullmatch(r'^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$', x))

# استراتژی نام کاربری (هر رشته‌ای غیر تکراری ساده)
username_strategy = st.text(min_size=3, max_size=20)

# ترکیب استراتژی برای داده‌های معتبر
valid_data_strategy = st.fixed_dictionaries({
    'username': username_strategy,
    'email': valid_email_strategy,
    'phone_number': valid_phone_strategy,
    'password': valid_password_strategy,
})

# ترکیب استراتژی برای داده‌های نامعتبر - هر فیلد می‌تونه اشتباه باشه
invalid_data_strategy = st.fixed_dictionaries({
    'username': username_strategy,
    'email': invalid_email_strategy,
    'phone_number': invalid_phone_strategy,
    'password': invalid_password_strategy,
})

@pytest.mark.django_db
@given(data=valid_data_strategy)
def test_user_register_serializer_valid(data):
    serializer = UserRegisterSerializer(data=data)
    assert serializer.is_valid(), f"داده معتبر ولی خطا گرفت: {serializer.errors}"

@pytest.mark.django_db
@given(data=invalid_data_strategy)
def test_user_register_serializer_invalid(data):
    serializer = UserRegisterSerializer(data=data)
    # انتظار میره که داده نامعتبر خطا بده
    assert not serializer.is_valid(), "داده نامعتبر ولی قبول شد!"

