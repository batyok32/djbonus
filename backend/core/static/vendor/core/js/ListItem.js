const allListItems = document.querySelectorAll(".litem");

for (let i = 0; i < allListItems.length; i++) {
    allListItems[i].addEventListener("click", fn, false);
}
let test = document.getElementById("test");

function fn() {
    console.log("CLICKED");
    let oldValue = this.getAttribute("data-open");
    const ptag = this.querySelector("p.pitem");
    if (ptag.classList.contains("d-none")) {
        ptag.classList.remove("d-none");
    } else {
        ptag.classList.add("d-none");
    }
    const icon = this.querySelector("i.arrowIcon");
    const iconUpClass = "bi-arrow-up-short";
    const iconDownClass = "bi-arrow-down-short";
    if (icon.classList.contains(iconUpClass)) {
        icon.classList.remove(iconUpClass);
        icon.classList.add(iconDownClass);
    } else {
        icon.classList.remove(iconDownClass);
        icon.classList.add(iconUpClass);
    }

    this.setAttribute("data-open", !oldValue);
}
