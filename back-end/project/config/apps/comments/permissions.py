from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    فقط صاحب کامنت می‌تونه آن را ویرایش یا حذف کند. بقیه فقط خواندن دارند.
    """

    def has_object_permission(self, request, view, obj):
        # خواندن همیشه آزاد است
        if request.method in permissions.SAFE_METHODS:
            return True

        # فقط صاحب نظر می‌تونه ویرایش یا حذف کنه
        return obj.user == request.user

