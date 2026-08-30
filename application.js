const form = document.getElementById("applicationForm");
const success = document.getElementById("success");

form.addEventListener("submit", function (event) {
    event.preventDefault();

    // Получаем данные формы
    const name = document.getElementById("name").value.trim();
    const nickname = document.getElementById("nickname").value.trim();
    const age = document.getElementById("age").value;
    const experience = document.getElementById("experience").value.trim();
    const device = document.getElementById("device").value;
    const reason = document.getElementById("reason").value.trim();
    const time = document.getElementById("time").value.trim();
    const telegram = document.getElementById("telegram").value.trim();
    const rules = document.getElementById("rules").checked;

    // Проверка заполнения
    if (
        !name ||
        !nickname ||
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

    // Проверка возраста
    if (Number(age) < 13) {
        alert(
            "⚠️ Для участия в тестировании необходимо указать возраст 13 лет или старше."
        );
        return;
    }

    if (Number(age) > 100) {
        alert("⚠️ Проверь правильность указанного возраста.");
        return;
    }

    // Проверка Telegram
    if (!telegram.startsWith("@")) {
        alert("⚠️ Укажи Telegram в формате @username.");
        return;
    }

    // Создание заявки
    const application = {
        name: name,
        nickname: nickname,
        age: age,
        experience: experience,
        device: device,
        reason: reason,
        time: time,
        telegram: telegram,
        date: new Date().toLocaleString("ru-RU")
    };

    // Пока сохраняем заявку в браузере
    localStorage.setItem(
        "blest_application",
        JSON.stringify(application)
    );

    // Вывод в консоль для проверки
    console.log("🧪 Новая заявка BLEST RUSSIA:");
    console.log(application);

    // Скрываем форму
    form.style.display = "none";

    // Показываем сообщение об успехе
    success.style.display = "block";

    // Прокручиваем страницу вверх
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});
