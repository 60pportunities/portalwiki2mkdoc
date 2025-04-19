const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs-extra");
const path = require("path");
const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use(express.static("."));

app.post("/add-repo", (req, res) => {
  const { name, url } = req.body;
  const reposFilePath = path.join(__dirname, "repos.json");

  fs.readJson(reposFilePath)
    .then(repos => {
      const repoExists = repos.some(repo => repo.name === name && repo.html_url === url);
      if (!repoExists) {
        const newRepo = {
          id: Date.now(),
          name: name,
          full_name: name,
          html_url: url,
          description: "",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          pushed_at: new Date().toISOString(),
          stargazers_count: 0,
          watchers_count: 0,
          language: "N/A",
          forks_count: 0,
          open_issues_count: 0,
          license: null,
          default_branch: "main",
          owner: {
            login: "unknown",
            avatar_url: ""
          },
          _InnerSourceMetadata: {
            participation: [],
            logo: "",
            score: 0,
            topics: []
          }
        };
        repos.push(newRepo);
        return fs.writeJson(reposFilePath, repos, { spaces: 2 });
      } else {
        throw new Error("Repositório já existe.");
      }
    })
    .then(() => res.json({ success: true }))
    .catch(error => res.json({ success: false, message: error.message }));
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});