import pytest
from django.db import connection

@pytest.fixture(autouse=True)
def clear_database():
    with connection.cursor() as cursor:
        cursor.execute('TRUNCATE TABLE users_customuser CASCADE;')
