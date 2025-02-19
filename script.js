document.getElementById("createFileButton").addEventListener("click", async () => {
    let title = document.getElementById("fileName").value.trim();
    let content = document.getElementById("fileContent").value.trim();

    if (!title || !content) {
        alert("❌ Заполните все поля!");
        return;
    }

    const repoOwner = "desertbloomfarm";
    const repoName = "desertbloomfarm.github.io";

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
        alert(`✅ Файл ${title}.html успешно отправлен в GitHub Actions!`);
    } else {
        alert(`❌ Ошибка: ${response.status} \n${await response.text()}`);
    }
});
