const form = document.getElementById("applicationForm");
const success = document.getElementById("success");

form.addEventListener("submit", async function (event) {
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

    const button = form.querySelector(".submit-button");

    button.disabled = true;
    button.textContent = "⏳ Отправляем...";

    try {
        const response = await fetch(
            "https://blestrussia.pythonanywhere.com/application",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    name: name,
                    age: age,
                    experience: experience,
                    device: device,
                    reason: reason,
                    time: time,
                    telegram: telegram
                })
            }
        );

        const result = await response.json();

        if (!response.ok || !result.success) {
            throw new Error(result.message || "Ошибка отправки");
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
            "❌ Не удалось отправить заявку. Попробуй ещё раз."
        );

        button.disabled = false;
        button.textContent = "🚀 Отправить заявку";
    }
});
