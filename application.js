const form = document.getElementById("applicationForm");
const success = document.getElementById("success");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const nickname = document.getElementById("nickname").value.trim();
    const age = Number(document.getElementById("age").value);
    const experience = document.getElementById("experience").value.trim();
    const device = document.getElementById("device").value;
    const reason = document.getElementById("reason").value.trim();
    const time = document.getElementById("time").value.trim();
    const telegram = document.getElementById("telegram").value.trim();
    const rules = document.getElementById("rules").checked;

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

    if (age < 13) {
        alert("⚠️ Для участия в тестировании необходимо указать возраст 13 лет или старше.");
        return;
    }

    if (!telegram.startsWith("@")) {
        alert("⚠️ Укажи Telegram в формате @username.");
        return;
    }

    const application = {
        name,
        nickname,
        age,
        experience,
        device,
        reason,
        time,
        telegram
    };

    try {
        const response = await fetch("ТУТ_БУДЕТ_АДРЕС_BACKEND", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(application)
        });

        if (!response.ok) {
            throw new Error("Ошибка сервера");
        }

        form.style.display = "none";
        success.style.display = "block";

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    } catch (error) {
        console.error(error);

        alert(
            "❌ Не удалось отправить заявку. Попробуй ещё раз позже."
        );
    }
});
