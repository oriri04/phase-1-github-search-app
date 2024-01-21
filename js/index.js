// app.js
document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();
  
    const searchInput = document.getElementById('searchInput').value;
  
    // Clear previous results
    document.getElementById('userList').innerHTML = '';
    document.getElementById('repoList').innerHTML = '';
  
    // Search for users
    searchUsers(searchInput)
      .then(users => {
        displayUsers(users);
      })
      .catch(error => {
        console.error('Error searching for users:', error);
      });
  });
  
  function searchUsers(query) {
    const apiUrl = `https://api.github.com/search/users?q=${query}`;
  
    return fetch(apiUrl)
      .then(response => response.json())
      .then(data => data.items)
      .catch(error => {
        console.error('Error fetching user data:', error);
      });
  }
  
  function displayUsers(users) {
    const userList = document.getElementById('userList');
  
    users.forEach(user => {
      const userElement = document.createElement('div');
      userElement.innerHTML = `
        <img src="${user.avatar_url}" alt="${user.login}" width="50" height="50">
        <p>Username: ${user.login}</p>
        <a href="${user.html_url}" target="_blank">Profile</a>
      `;
      userElement.addEventListener('click', function () {
        fetchUserRepos(user.login);
      });
  
      userList.appendChild(userElement);
    });
  }
  
  function fetchUserRepos(username) {
    const apiUrl = `https://api.github.com/users/${username}/repos`;
  
    fetch(apiUrl)
      .then(response => response.json())
      .then(repos => {
        displayUserRepos(repos);
      })
      .catch(error => {
        console.error('Error fetching user repositories:', error);
      });
  }
  
  function displayUserRepos(repos) {
    const repoList = document.getElementById('repoList');
    repoList.innerHTML = '';
  
    if (repos.length === 0) {
      repoList.innerHTML = '<p>No repositories found.</p>';
      return;
    }
  
    const repoHeader = document.createElement('h2');
    repoHeader.textContent = 'User Repositories:';
    repoList.appendChild(repoHeader);
  
    repos.forEach(repo => {
      const repoElement = document.createElement('div');
      repoElement.innerHTML = `
        <p>Repository: ${repo.name}</p>
        <p>Description: ${repo.description || 'No description'}</p>
        <p>Language: ${repo.language || 'Not specified'}</p>
        <hr>
      `;
      repoList.appendChild(repoElement);
    });
  }
  