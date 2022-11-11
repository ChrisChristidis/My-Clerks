document.addEventListener('DOMContentLoaded', function () {

    var color = "";
    var numOfCards = Math.floor(window.innerWidth / 350);

    // Fetch Users and display the amount of cards can fit in this window width
    getUserInfo(1, numOfCards, true);

    // Find the previous card can be displayed
    document.querySelector(".arrow.left").addEventListener("click", () => {
        showPrevious(color);
    });

    // Find the next card can be displayed
    document.querySelector(".arrow.right").addEventListener("click", () => {
        showNextCard(color);
    });

    // On input focus move the label in top border
    document.querySelector("#choose_bg_color").addEventListener("focus", () => {
        document.querySelector("label").classList.add("label-in-border");
    });

    // On input focusout, apply bg color to every card's info that is displayed and if its value is empty, move the label into the input like placeholder
    document.querySelector("#choose_bg_color").addEventListener("focusout", (e) => {
        changeBgColor();
        if (e.target.value == "") {
            document.querySelector("label").classList.remove("label-in-border");
        }
    });

    window.addEventListener("keydown", (event) => {
        // Apply background color to every card's info that is displayed
        if (event.key == "Enter") {
            changeBgColor();
        }

        // if left/right arrows are pressed outside of the input
        if (event.target.getAttribute("id") !== "choose_bg_color") {
            // Next card
            if (event.key == "ArrowRight") {
                document.querySelector(".arrow.right").click();
            }

            // Previous card
            if (event.key == "ArrowLeft") {
                document.querySelector(".arrow.left").click();
            }
        }
    });

    // This event is active only for mobile/tablet devices
    window.addEventListener("orientationchange", () => {
        if (numOfCards < Math.floor(window.innerHeight / 350)) {
            // Landscape orientation
            for (let i = 0; i < Math.floor(window.innerHeight / 350) - numOfCards; i++) {
                showNextCard(color, true);
            }
            numOfCards = Math.floor(window.innerHeight / 350);
        } else if (numOfCards > Math.floor(window.innerHeight / 350) && numOfCards <= document.querySelectorAll(".card").length) {
            // Portrait orientation
            for (let i = 0; i < numOfCards - Math.floor(window.innerHeight / 350); i++) {
                hideNextCard();
            }
            numOfCards = Math.floor(window.innerHeight / 350);
        }

        // Prevent window resize from being triggered, after orientation change
        window.removeEventListener("resize", resizeWindow);
    });

    window.addEventListener("resize", resizeWindow);

    function resizeWindow () {
        if (numOfCards < Math.floor(window.innerWidth / 350)) {
            for (let i = 0; i < Math.floor(window.innerWidth / 350) - numOfCards; i++) {
                showNextCard(color, true);
            }
            numOfCards = Math.floor(window.innerWidth / 350);
        } else if (numOfCards > Math.floor(window.innerWidth / 350) && numOfCards <= document.querySelectorAll(".card").length) {
            for (let i = 0; i < numOfCards - Math.floor(window.innerWidth / 350); i++) {
                hideNextCard();
            }
            numOfCards = Math.floor(window.innerWidth / 350);
        }
    }

    function changeBgColor () {
        const cards = document.querySelectorAll(".card.d-inline-block");
        color = document.querySelector("#choose_bg_color").value;

        if (color !== "" && CSS.supports('background-color', color)) {
            // Hide error message
            document.querySelector(".error-text").classList.add("d-none");
            document.querySelector("label").classList.remove("error-label");
            document.querySelector("input").classList.remove("error-input");

            document.querySelector(".color-display").style.backgroundColor = color;
            cards.forEach((card) => {
                applyBgColor(card, color);
            });
        } else if (color == "") {
            // Hide error message
            document.querySelector(".error-text").classList.add("d-none");
            document.querySelector("label").classList.remove("error-label");
            document.querySelector("input").classList.remove("error-input");

            document.querySelector(".color-display").removeAttribute("style");
            cards.forEach((card) => {
                removeBgColor(card);
            });
        } else {
            // Show error message
            document.querySelector(".error-text").classList.remove("d-none");
            document.querySelector("label").classList.add("error-label");
            document.querySelector("input").classList.add("error-input");
        }
    }

    function applyBgColor (element, color) {
        Array.from(element.childNodes).filter((el) => { return el.matches("div") }).forEach((child) => {
            child.style.backgroundColor = color;
        });
    }

    function removeBgColor (element) {
        Array.from(element.childNodes).filter((el) => { return el.matches("div") }).forEach((child) => {
            child.removeAttribute("style");
        });
    }

    function showPrevious (color) {

        const first = document.querySelector(".d-inline-block");

        // If there is not any card hidden on the left, do nothing
        if (!first.previousElementSibling) {
            return;
        } else if (first.previousElementSibling.classList.contains("arrow")) {
            return;
        }

        // Show previous card
        first.previousElementSibling.classList.remove("d-none");
        first.previousElementSibling.classList.add("d-inline-block");
        // Apply background color
        if (color !== "") {
            applyBgColor(first.previousElementSibling, color);
        } else {
            removeBgColor(first.previousElementSibling);
        }

        // Hide the most right card that is displayed
        const last = Array.from(
            document.querySelectorAll('.d-inline-block')
        ).pop();

        last.classList.remove("d-inline-block");
        last.classList.add("d-none");

    }

    function showNextCard (color, isWindowEvent = false) {
        const last = Array.from(
            document.querySelectorAll('.card.d-inline-block')
        ).pop();

        if (!last) {
            return;
        }

        // If there is not any card hidden on the right, do nothing
        if (!last.nextElementSibling) {
            return;
        } else if (!last.nextElementSibling || last.nextElementSibling.classList.contains("arrow")) {
            return;
        }

        // Show next card
        last.nextElementSibling.classList.remove("d-none");
        last.nextElementSibling.classList.add("d-inline-block");
        // Apply background color
        if (color !== "") {
            applyBgColor(last.nextElementSibling, color);
        } else {
            removeBgColor(last.nextElementSibling);
        }

        // Hide the most left card that is displayed
        if (!isWindowEvent) {
            hidePreviousCard();
        }
    }

    // Hide the most right card that is displayed, after resize or orientation change
    function hideNextCard () {
        const last = Array.from(
            document.querySelectorAll('.d-inline-block')
        ).pop();

        if (!last) {
            return;
        }

        last.classList.remove("d-inline-block");
        last.classList.add("d-none");
    }

    // Hide the most left card that is displayed, after resize or orientation change
    function hidePreviousCard () {
        const first = document.querySelector(".d-inline-block");

        first.classList.remove("d-inline-block");
        first.classList.add("d-none");
    }

});