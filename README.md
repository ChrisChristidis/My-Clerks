### My-Clerks ###

# How to run
Fire up a browser and go to https://chrischristidis.github.io/My-Clerks/

- In this application, there are 50 cards of random users with their personal info.
- Change the background of their personal info, by adding a valid color (empty value is valid) in the input at the top of the page.
- Apply the background color by pressing enter or by focusing out of the input.
- Use the arrows from the keyboard to go to the next or previous card, when you are not focused in the input.
- The application is made mobile first, is responsive and it is tested in chrome and safari, for mobile, tablet and desktop.

# index.html
- Includes the js and CSS the appplication needs to be functional.
- Has all static elements and their classes.

# GetUserInfo.js
Contains the asynchronous function getUserInfo().
- Fetches the necessary users' info asynchronously, for the amount of cards the window can fit.
- Creates the users' cards dynamically.
- Fetches the rest of the users' info to have 50 users in total, by calling the function getUserInfo one more time.

# MyClerks.js
Contains the functionality of the application.
On load:
- Calls the function getUserInfo().
- Adds functionality for left/right arrow (onClick).
- Adds functionality for input and its label (focus/focusout).
- Adds functionality for key press (left/right arrow & Enter).
- Adds functionality for orientation change for mobile/tablet mode.
- Adds functionality for window resize for desktop mode.
Also contains the functions resizeWindow, changeBgColor, applyBgColor, removeBgColor, showPreviousCard, showNextCard, hidePreviousCard, hideNextCard.

# MyClerks.css
- Contains some Common classes.
- Contains the CSS for mobile/tablet mode.
- Contains the CSS for desktop mode.
@media(min-width: 768px) is used, beacause the size of the CSS for desktop is really small. If the size of the CSS was bigger, MyClerks.css would have splitted into two files and they would have loaded, only when they were needed (mobile CSS would always load, tablet CSS only when window width is more than 768px and desktop CSS only when window width is more than 1200px).