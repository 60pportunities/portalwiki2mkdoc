document.addEventListener("DOMContentLoaded", function() {
  // Existing code

  // Add event listener for form submission
  document.getElementById("add-repo-form").addEventListener("submit", function(event) {
    event.preventDefault();
    const repoName = document.getElementById("repo-name").value;
    const repoURL = document.getElementById("repo-url").value;

    fetch("/add-repo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ name: repoName, url: repoURL })
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        alert("Repositório adicionado com sucesso!");
        location.reload();
      } else {
        alert("Erro ao adicionar repositório.");
      }
    })
    .catch(error => console.error("Erro:", error));
  });
});
