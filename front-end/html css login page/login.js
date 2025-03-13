document.querySelector(".login-btn").addEventListener("click", function(event)
{
    event.preventDefault;

    const username = document.querySelector("input[type='text']").value.trim();
    const password = document.querySelector("input[type='password']").value.trim();

    if (!username || !password) {
        alert("لطفا نام کاربری و رمز عبور را وارد کنید");
        return;
    }

    const apiUrl = "127.0.0.1:8000/api/login/"; 

    const data = {
        username: username,
        password: password
    };

    fetch(apiUrl, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.success) {
            alert("ورود موفقیت‌آمیز بود!");
            window.location.href = "dashboard.html"; // Redirect on success
        } else {
            alert("نام کاربری یا رمز عبور اشتباه است");
        }
    })
    .catch(error => {
        console.error("خطا در ارتباط با سرور:", error);
        alert("مشکلی در ارتباط با سرور پیش آمده است");
    });
});














// document.getElementsByClassName("right-panel").addEventListener('DOMContentLoaded', function() {
//     const loginForm = document.querySelector('form');
//     loginForm.addEventListener('submit', async function(event) {
//         event.preventDefault();

//         const formData = new FormData(loginForm);
//         const response = await fetch('/login/', {
//             method: 'POST',
//             body: formData,
//             headers: {
//                 'X-CSRFToken': document.querySelector('[name=csrfmiddlewaretoken]').value
//             }
//         });

//         if (response.ok) {
//             alert('Login successful!');
//             // Redirect to a success page or dashboard
//             window.location.href = '/dashboard/';
//         } else {
//             alert('Login failed. Please check your username and password.');
//         }
//     });
// });
