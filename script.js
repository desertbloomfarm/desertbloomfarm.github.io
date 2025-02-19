document.addEventListener("DOMContentLoaded", function () {
    const createPageBtn = document.getElementById("createPageBtn");

    if (!createPageBtn) {
        console.error("❌ Ошибка: Кнопка не найдена! Проверьте HTML.");
        return;
    }

    createPageBtn.addEventListener("click", async function () {
        const title = prompt("Введите имя файла (без .html):");
        if (!title) return alert("Имя файла не может быть пустым!");

        const content = prompt("Введите содержимое файла:");
        if (!content) return alert("Содержимое не может быть пустым!");

        const repoOwner = "desertbloomfarm";
        const repoName = "desertbloomfarm.github.io";

        try {
            const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/dispatches`, {
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

            if (response.status === 204) {
                alert(`✅ Файл ${title}.html успешно создан!`);
            } else {
                alert(`❌ Ошибка: ${response.status} \n${await response.text()}`);
            }
        } catch (error) {
            console.error("❌ Ошибка запроса:", error);
            alert("Ошибка при отправке запроса.");
        }
    });
});
