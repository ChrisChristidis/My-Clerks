async function getUserInfo (page, cardsToDisplay, cardsCanFitToWindow) {

    const data = await fetch(
        "https://randomuser.me/api/?inc=picture,name,email,phone,location&page=" + page + "&noinfo&results=" + cardsToDisplay
    )
        .then((response) => response.json())
        .catch((error) => console.error("Unable to get users info.", error));

    data.results.forEach((el) => {

        // Create the users cards
        const card = document.createElement("div");

        if (cardsCanFitToWindow) {
            card.classList.add("card", "d-inline-block");
        } else {
            card.classList.add("card", "d-none");
        }

        // Create the users' info
        const image = document.createElement("img");
        image.classList.add("image");
        image.setAttribute("src", el.picture.thumbnail);

        const name = document.createElement("div");
        name.classList.add("name");
        name.innerHTML = el.name.last;

        const email = document.createElement("div");
        email.classList.add("email");
        email.innerHTML = el.email;

        const phone = document.createElement("div");
        phone.classList.add("phone");
        phone.innerHTML = el.phone;

        const location = document.createElement("div");
        location.classList.add("location");
        location.innerHTML = el.location.street.number + " " + el.location.street.name;

        card.appendChild(image);
        card.appendChild(name);
        card.appendChild(email);
        card.appendChild(phone);
        card.appendChild(location);

        document.querySelector(".profile-cards").appendChild(card);
    })

    if (cardsCanFitToWindow) {
        // Fetch the rest of Users from page 2, to prevent duplicate users
        getUserInfo(2, 50 - cardsToDisplay, false);
    }
}