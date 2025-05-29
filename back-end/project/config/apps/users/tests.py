from django.test import TestCase
from apps.users.models import CustomUser, TourManagerProfile


class CustomUserModelTest(TestCase):
    
    def setUp(self):
        self.user = CustomUser.objects.create_user(
            username="testuser",
            phone_number="09123456789",
            email="testuser@example.com",
            password="Test@1234",
            role="user"
        )
        self.tour_manager = CustomUser.objects.create_user(
            username="tourmanager",
            phone_number="09123456788",
            email="tourmanager@example.com",
            password="Test@1234",
            role="tour_manager"
        )
        self.tour_manager_profile = TourManagerProfile.objects.create(
            user=self.tour_manager,
            company_name="Test Company",
            company_address="Test Address",
            company_registration_number="123456"
        )

    def test_user_creation(self):
        self.assertEqual(self.user.username, "testuser")
        self.assertEqual(self.user.phone_number, "09123456789")
        self.assertEqual(self.user.email, "testuser@example.com")
        self.assertFalse(self.user.is_verified)
        self.assertEqual(str(self.user), "testuser")

    def test_tour_manager_creation(self):
        self.assertEqual(self.tour_manager.username, "tourmanager")
        self.assertEqual(self.tour_manager.phone_number, "09123456788")
        self.assertEqual(self.tour_manager.email, "tourmanager@example.com")
        self.assertEqual(self.tour_manager.role, "tour_manager")
        self.assertEqual(str(self.tour_manager), "tourmanager")

    def test_tour_manager_profile_creation(self):
        self.assertEqual(self.tour_manager_profile.user.username, "tourmanager")
        self.assertEqual(self.tour_manager_profile.company_name, "Test Company")
        self.assertEqual(self.tour_manager_profile.company_address, "Test Address")
        self.assertEqual(self.tour_manager_profile.company_registration_number, "123456")
        self.assertEqual(str(self.tour_manager_profile), "Test Company")



