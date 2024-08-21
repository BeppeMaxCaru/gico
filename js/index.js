const lightIcon = document.getElementById("light-icon");
const darkIcon = document.getElementById("dark-icon");

const intro1 = document.getElementById("intro1");
const intro2 = document.getElementById("intro2");

//Check if dark mode is preferred
const darkModeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
let darkMode = darkModeMediaQuery.matches;

//Set dark-mode class on body if dark-mode is true and pick icon
if (darkMode) {
    document.body.classList.add("dark-mode");
    darkIcon.setAttribute("display", "none");
} else {
    lightIcon.setAttribute("display", "none");
}

//Toggle between dark and light mode
function toggleDarkMode() {
    //Toggle dark mode variable
    darkMode = !darkMode;

    //Toggle dark-mode class on body
    document.body.classList.toggle("dark-mode");

    //Toggle light and dark icons
    if (darkMode) {
        lightIcon.setAttribute("display", "block");
        darkIcon.setAttribute("display", "none");
        intro1.setAttribute("style", "text-align: center; font-family: Arial, Helvetica, sans-serif; color: rgb(255, 255, 255)");
        intro2.setAttribute("style", "text-align: center; font-family: Arial, Helvetica, sans-serif; color: rgb(255, 255, 255)");
    } else {
        lightIcon.setAttribute("display", "none");
        darkIcon.setAttribute("display", "block");
        intro1.setAttribute("style", "text-align: center; font-family: Arial, Helvetica, sans-serif; color: rgb(0, 0, 0)");
        intro2.setAttribute("style", "text-align: center; font-family: Arial, Helvetica, sans-serif; color: rgb(0, 0, 0)");
    }
}
