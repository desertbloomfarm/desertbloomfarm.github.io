const owner = "desertbloomfarm";  // Твой GitHub логин
const repo = "desertbloomfarm.github.io"; // Название репозитория

document.getElementById("saveBtn").addEventListener("click", async () => {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Введите название и содержимое страницы!");
        console.error("Ошибка: title или content пустые.");
        return;
    }

    console.log("📤 Отправка запроса в GitHub API...");
    console.log("🔹 Заголовок страницы:", title);
    console.log("🔹 Длина контента:", content.length, "символов");

    try {
        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/dispatches`, {
            method: "POST",
            headers: {
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                event_type: "save_page",
                client_payload: { title, content }
            })
        });

        console.log("🔄 Статус запроса:", response.status, response.statusText);

        if (response.status === 204) {
            alert("✅ Страница успешно отправлена в GitHub Actions!");
            console.log("✅ Запрос успешно обработан.");
        } else {
            const result = await response.json();
            alert("❌ Ошибка при отправке запроса!");
            console.error("❌ Ошибка GitHub API:", result);
        }
    } catch (error) {
        alert("⚠️ Ошибка сети или кода, проверьте консоль!");
        console.error("⚠️ Ошибка во время выполнения запроса:", error);
    }
});
