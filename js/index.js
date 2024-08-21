window.addEventListener("DOMContentLoaded", () => {
    const githubForm = document.getElementById("github-form");
    const userList = document.getElementById("user-list");
    const reposList = document.getElementById("repos-list");
    const search = document.getElementById("search");
  
    githubForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const query = search.value;
      if (query) {
        fetch(`https://api.github.com/search/users?q=${query}`)
          .then((response) => response.json())
          .then((data) => {
            if (data.items.length === 0) {
              alert("No users found.");
            } else {
              userList.innerHTML = data.items.map(user => `
                <li>
                  <img src='${user.avatar_url}' alt='${user.login}' data-username='${user.login}' class='user-image'/>
                  <div>
                    <h4>${user.login}</h4>
                    <p>${user.login}</p>
                  </div>
                </li>
              `).join('');
            }
          });
      }
    });
  
    // Event delegation to handle clicks on user images
    userList.addEventListener("click", (event) => {
      if (event.target.classList.contains("user-image")) {
        const username = event.target.getAttribute("data-username");
        fetch(`https://api.github.com/users/${username}/repos`)
          .then((response) => response.json())
          .then((repos) => {
            reposList.innerHTML = repos.map(repo => `
              <li>
                <h4><a href='${repo.html_url}' target='_blank'>${repo.name}</a></h4>
                <p>${repo.description || "No description"}</p>
              </li>
            `).join('');
          });
      }
    });
  });
  