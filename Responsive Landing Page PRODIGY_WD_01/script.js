window.addEventListener("scroll", function () {
    const navbar = document.getElementById("navbar");
    if (window.scrollY > 0) {
        navbar.classList.add("scrolled");
        console.log("scroll");
    } else {
        navbar.classList.remove("scrolled");
        console.log("scroll1");
    }
});
