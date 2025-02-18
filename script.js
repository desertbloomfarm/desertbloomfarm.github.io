const owner = "desertbloomfarm";  // Твой GitHub логин
const repo = "desertbloomfarm.github.io"; // Название репозитория


document.getElementById("saveBtn").addEventListener("click", async () => {
    const title = document.getElementById("title").value.trim();
    const content = document.getElementById("content").value;

    if (!title || !content) {
        alert("Введите название и содержимое страницы!");
        return;
    }

    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/dispatches`, {
        method: "POST",
        headers: {
            "Accept": "application/vnd.github.v3+json",
            "Authorization": `Bearer YOUR_PERSONAL_ACCESS_TOKEN`
        },
        body: JSON.stringify({
            event_type: "save_page",
            client_payload: { title, content }
        })
    });

    if (response.ok) {
        alert("Запрос отправлен в GitHub Actions. Подождите...");
    } else {
        alert("Ошибка при отправке запроса в GitHub Actions!");
    }
});
