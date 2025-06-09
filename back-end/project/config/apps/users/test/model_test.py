import pytest
from django.core.exceptions import ValidationError
from django.db import IntegrityError
from django.contrib.auth import get_user_model
from apps.users.models import TourManagerProfile

User = get_user_model()

@pytest.mark.django_db
class TestCustomUserAndTourManagerProfile:

    def test_create_normal_user(self):
        user = User.objects.create_user(
            username="normaluser",
            email="normal@example.com",
            phone_number="09120000001",
            password="StrongPass123!",
            role='user',
        )
        assert user.role == 'user'
        assert user.is_verified is False
        assert not hasattr(user, 'tour_manager_profile')

    def test_create_tour_manager_creates_profile(self):
        user = User.objects.create_user(
            username="tourmanager",
            email="tourmanager@example.com",
            phone_number="09120000002",
            password="StrongPass123!",
            role='tour_manager',
        )
        assert user.role == 'tour_manager'
        assert hasattr(user, 'tour_manager_profile')
        profile = user.tour_manager_profile
        assert profile.company_name == ''
        assert profile.company_address == ''
        assert profile.company_registration_number == ''

    def test_tour_manager_profile_not_duplicated_on_save(self):
        user = User.objects.create_user(
            username="withprofile",
            email="withprofile@example.com",
            phone_number="09120000003",
            password="StrongPass123!",
            role='tour_manager',
        )
        # حذف پروفایل ساخته شده توسط سیگنال
        TourManagerProfile.objects.filter(user=user).delete()

        TourManagerProfile.objects.create(
            user=user,
            company_name="Example Company",
            company_address="Tehran",
            company_registration_number="123456"
        )

        user.save()
        profiles = TourManagerProfile.objects.filter(user=user)
        assert profiles.count() == 1

    def test_unique_email_and_phone_number_validationerror(self):
        User.objects.create_user(
            username="firstuser",
            email="duplicate@example.com",
            phone_number="09120000004",
            password="StrongPass123!"
        )

        with pytest.raises(ValidationError):
            User.objects.create_user(
                username="seconduser",
                email="duplicate@example.com", 
                phone_number="09120000005",
                password="StrongPass123!"
            )

        with pytest.raises(ValidationError):
            User.objects.create_user(
                username="thirduser",
                email="another@example.com",
                phone_number="09120000004",  # شماره تلفن تکراری
                password="StrongPass123!"
            )

    def test_str_methods(self):
        user = User.objects.create_user(
            username="testuser",
            email="test@example.com",
            phone_number="09120000006",
            password="StrongPass123!"
        )
        assert str(user) == "testuser"

        profile = TourManagerProfile.objects.create(
            user=user,
            company_name="Test Company",
            company_address="Isfahan",
            company_registration_number="998877"
        )
        assert str(profile) == "testuser - Test Company"

    def test_invalid_role_raises_valueerror(self):
        with pytest.raises(ValueError):
            User.objects.create_user(
                username="invalidroleuser",
                email="invalidrole@example.com",
                phone_number="09120000007",
                password="StrongPass123!",
                role='admin'  # نقش نامعتبر
            )

    def test_invalid_phone_number_length_raises_validationerror(self):
        user = User(
            username="badphone",
            email="badphone@example.com",
            phone_number="123",  # شماره کوتاه
            password="StrongPass123!"
        )
        with pytest.raises(ValidationError):
            user.full_clean()

    def test_phone_number_uniqueness_validationerror(self):
        User.objects.create_user(
            username="user1",
            email="user1@example.com",
            phone_number="09120000008",
            password="StrongPass123!"
        )
        with pytest.raises(ValidationError):
            user = User(
                username="user2",
                email="user2@example.com",
                phone_number="09120000008",  # شماره تلفن تکراری
                password="StrongPass123!"
            )
            user.full_clean()

    def test_empty_email_raises_valueerror(self):
        with pytest.raises(ValueError):
            User.objects.create_user(
                username="noemail",
                email=None,
                phone_number="09120000009",
                password="StrongPass123!"
            )

    def test_tour_manager_profile_without_user_raises_integrityerror(self):
        with pytest.raises(IntegrityError):
            TourManagerProfile.objects.create(
                user=None,
                company_name="No User Company",
                company_address="Nowhere",
                company_registration_number="000000"
            )

    def test_password_set_and_check(self):
        user = User.objects.create_user(
            username="passwordtest",
            email="passwordtest@example.com",
            phone_number="09120000010",
            password="OldPass123!"
        )
        assert user.check_password("OldPass123!")
        user.set_password("NewPass123!")
        user.save()
        user.refresh_from_db()
        assert user.check_password("NewPass123!")

    def test_is_active_default_true(self):
        user = User.objects.create_user(
            username="activeuser",
            email="activeuser@example.com",
            phone_number="09120000011",
            password="StrongPass123!"
        )
        assert user.is_active is True

    def test_signal_creates_profile_only_once(self):
        user = User.objects.create_user(
            username="signaluser",
            email="signaluser@example.com",
            phone_number="09120000012",
            password="StrongPass123!",
            role='tour_manager',
        )
        profiles_before = TourManagerProfile.objects.filter(user=user).count()
        assert profiles_before == 1

        # ذخیره مجدد نباید پروفایل جدید بسازد
        user.save()
        profiles_after = TourManagerProfile.objects.filter(user=user).count()
        assert profiles_after == 1
