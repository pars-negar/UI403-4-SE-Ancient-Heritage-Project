from rest_framework import permissions


# ✅ دسترسی ادمین (Superuser)
class IsAdminUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.is_superuser
        )


# ✅ دسترسی کاربران عادی
class IsNormalUser(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == 'user'
        )


# ✅ دسترسی مسئولان تور
class IsTourManager(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and
            request.user.is_authenticated and
            request.user.role == 'tour_manager'
        )


# ✅ فقط سازنده یا ادمین اجازه ویرایش/حذف شیء رو داره
class IsOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(
            request.user and request.user.is_authenticated and (
                request.user.is_superuser or obj.created_by == request.user
            )
        )


# ✅ فقط نویسنده نظر بتونه ویرایش/حذفش کنه (برای نظرها)
class IsCommentOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:  # GET, HEAD, OPTIONS
            return True
        return obj.user == request.user


# ✅ فقط سازنده رزرو یا ادمین بتونه اون رزرو رو ببینه یا تغییر بده
class IsReservationOwnerOrAdmin(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        return bool(
            request.user and (
                request.user.is_superuser or obj.user == request.user
            )
        )


# ✅ فقط خواندن برای همه، نوشتن فقط توسط ادمین یا تور منیجر
class IsAdminOrTourManagerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:  # GET, HEAD, OPTIONS
            return True
        return request.user and request.user.is_authenticated and (
            request.user.is_superuser or request.user.role == 'tour_manager'
        )


# ✅ فقط مشاهده برای همه - ویرایش فقط برای صاحب شیء
class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.user == request.user


# ✅ فقط کاربران عادی اجازه‌ی ثبت‌نام در تور
class IsNormalUserOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(
            request.user and request.user.is_authenticated and
            request.user.role == 'user'
        )


class IsNotAuthenticated(permissions.BasePermission):
    def has_permission(self, request, view):
        return not request.user or not request.user.is_authenticated
    
    
class IsAdminOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        # فقط ادمین ها اجازه POST, PUT, DELETE دارند
        return request.user and request.user.is_authenticated and request.user.is_superuser