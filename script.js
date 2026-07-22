

const usernameInput = document.getElementById("username");
const searchBtn = document.getElementById("searchBtn");

const loading = document.querySelector(".loading");
const error = document.querySelector(".error");
const profileCard = document.querySelector(".profile-card");

const avatar = document.getElementById("avatar");
const name = document.getElementById("name");
const login = document.getElementById("login");
const bio = document.getElementById("bio");

const repos = document.getElementById("repos");
const followers = document.getElementById("followers");
const following = document.getElementById("following");

const locationText = document.getElementById("location");
const company = document.getElementById("company");
const profileLink = document.getElementById("profileLink");


searchBtn.addEventListener("click", searchUser);

usernameInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchUser();
    }

});

function searchUser() {

    const username = usernameInput.value.trim();

    if (username === "") {

        alert("Please enter a GitHub username.");
        return;

    }

    console.log(username);

}

async function searchUser() {

    const username = usernameInput.value.trim();

    if (username === "") {
        alert("Please enter a GitHub username.");
        return;
    }

    profileCard.classList.add("hidden");
    error.classList.add("hidden");

    loading.classList.remove("hidden");

    try {

        const response = await fetch(`https://api.github.com/users/${username}`);

        if (!response.ok) {
            throw new Error("User Not Found");
        }

        const data = await response.json();

        console.log(data);

        displayProfile(data);

    }

    catch (err) {

        loading.classList.add("hidden");
        error.classList.remove("hidden");

    }

}


function displayProfile(data) {

   
    loading.classList.add("hidden");

   
    profileCard.classList.remove("hidden");

   
    avatar.src = data.avatar_url;
    avatar.alt = data.login;


    name.textContent = data.name || "No Name";
    login.textContent = `@${data.login}`;
    bio.textContent = data.bio || "No bio available.";

   
    repos.textContent = data.public_repos;
    followers.textContent = data.followers;
    following.textContent = data.following;

   
    locationText.textContent = data.location || "Not Available";
    company.textContent = data.company || "Not Available";


    profileLink.href = data.html_url;
}