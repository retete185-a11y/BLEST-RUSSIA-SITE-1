```javascript
const form = document.getElementById("applicationForm");
const success = document.getElementById("success");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value;
    const experience = document.getElementById("experience").value.trim();
    const device = document.getElementById("device").value;
    const reason = document.getElementById("reason").value.trim();
    const time = document.getElementById("time").value.trim();
    const telegram = document.getElementById("telegram").value.trim();
    const rules = document.getElementById("rules").checked;

    if (
        !name ||
        !age ||
        !experience ||
        !device ||
        !reason ||
        !time ||
        !telegram ||
        !rules
    ) {
        alert("⚠️ Заполни все поля анкеты.");
        return;
    }

    if (Number(age) < 13) {
        alert("⚠️ Для участия в тестировании необходимо указать возраст 13 лет или старше.");
        return;
    }

    const application = {
        name: name,
        age: age,
        experience: experience,
        device: device,
        reason: reason,
        time: time,
        telegram: telegram,
        date: new Date().toLocaleString("ru-RU")
    };

    console.log("Новая заявка:", application);

    form.style.display = "none";
    success.style.display = "block";

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
```
