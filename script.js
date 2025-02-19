document.getElementById("createFileButton").addEventListener("click", async () => {
    let title = document.getElementById("fileName").value.trim();
    let content = document.getElementById("fileContent").value.trim();

    if (!title || !content) {
        alert("❌ Заполните все поля!");
        return;
    }

    const repoOwner = "desertbloomfarm";
    const repoName = "desertbloomfarm.github.io";

    const issueData = {
        title: `Создать файл: ${title}.html`,
        body: `**Содержимое файла:**\n\n\`\`\`html\n${content}\n\`\`\`\n\n_Этот файл создан автоматически._`
    };

    const response = await fetch(`https://api.github.com/repos/${repoOwner}/${repoName}/issues`, {
        method: "POST",
        headers: {
            "Accept": "application/vnd.github.v3+json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(issueData)
    });

    if (response.ok) {
        alert(`✅ Запрос успешно отправлен в GitHub Issues!`);
    } else {
        alert(`❌ Ошибка: ${response.status} \n${await response.text()}`);
    }
});
