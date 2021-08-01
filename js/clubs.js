async function getClubs(filter) {
    let clubs = await (await fetch("https://campagne-api.waba359.repl.co/clubs/clubs.json")).json();
    let clublist = document.getElementById("clubs");
    clublist.innerHTML = "";
    for (let club of clubs.clubs) {
        if (filter == "" || filter.includes("S" + club.status) || filter.includes("T" + club.type)) {
            let hyperlink = document.createElement("a");
            let clubwrapper = document.createElement("div");
            let thumbnail = document.createElement("img");
            let text = document.createElement("div");
            let name = document.createElement("h3");
            let teacher = document.createElement("p");
            let desc = document.createElement("p");
            hyperlink.href = club.id + "/"
            clubwrapper.classList.add("club");
            if (club.thumbnail != "") {
                thumbnail.src = "https://campagne-api.waba359.repl.co/clubs/logos/" + club.thumbnail;
                thumbnail.alt = club.name + " Logo";
            } else {
                thumbnail.src = "https://campagne-api.waba359.repl.co/temp/default.png";
                thumbnail.classList.add("noimg");
            }
            thumbnail.draggable = false;
            thumbnail.style.borderColor = "var(--status" + club.status + ")";
            text.classList.add("text");
            name.innerHTML = club.name;
            teacher.innerHTML = club.teacher;
            desc.innerHTML = club.desc.substring(0, 140) + "...";
            text.appendChild(name);
            text.appendChild(teacher);
            text.appendChild(document.createElement("hr"));
            text.appendChild(desc);
            clubwrapper.appendChild(thumbnail);
            clubwrapper.appendChild(text);
            hyperlink.appendChild(clubwrapper)
            clublist.appendChild(hyperlink);
        }
    }
}

function update() {
    let checkboxes = document.getElementById("checkBoxes");
    let options = checkboxes.getElementsByTagName("label");
    filter = [];
    for (let option of options) {
        input = option.getElementsByTagName("input")[0];
        if (input.checked) {
            filter.push(input.value);
        }
    }
    getClubs(filter);
}