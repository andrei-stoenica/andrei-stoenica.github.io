(function () {
    "use strict";

    const storageKey = "andrei-site-theme";
    const root = document.documentElement;
    const switcher = document.querySelector(".theme-switcher");
    const toggle = document.querySelector(".theme-toggle");
    const options = document.querySelectorAll(".theme-option");

    const themes = ["1", "2", "3", "4"];

    function setTheme(theme) {
        if (!themes.includes(theme)) {
            theme = "1";
        }

        root.dataset.theme = theme;
        localStorage.setItem(storageKey, theme);

        options.forEach(function (option) {
            option.setAttribute(
                "aria-pressed",
                option.dataset.theme === theme ? "true" : "false"
            );
        });
    }

    setTheme(localStorage.getItem(storageKey) || "1");

    toggle.addEventListener("click", function () {
        const open = switcher.dataset.open === "true";

        switcher.dataset.open = String(!open);
        toggle.setAttribute("aria-expanded", String(!open));
    });

    options.forEach(function (option) {
        option.addEventListener("click", function () {
            setTheme(option.dataset.theme);

            switcher.dataset.open = "false";
            toggle.setAttribute("aria-expanded", "false");
        });
    });

    document.addEventListener("click", function (event) {
        if (!switcher.contains(event.target)) {
            switcher.dataset.open = "false";
            toggle.setAttribute("aria-expanded", "false");
        }
    });

    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            switcher.dataset.open = "false";
            toggle.setAttribute("aria-expanded", "false");
            toggle.focus();
        }
    });
})();
