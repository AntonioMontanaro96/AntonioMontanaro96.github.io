get = id => document.getElementById(id);

function author_node(author) {
    var span = document.createElement("span");
    var a = document.createElement("a");
    var sup = document.createElement("sup");
    a.textContent = author.name;
    // If the author email contains a "@" symbol, make it a mailto link
    if (author.email.includes("@"))
        a.href = "mailto:" + author.email;
    else
        a.href = author.email;
    sup.textContent = author.footnote.map(String).join(",");
    sup.textContent += author.affiliations.map(String).join(",");
    span.appendChild(a);
    span.appendChild(sup);
    return span
}

function affiliations_node(affiliations) {
    var span = document.createElement("span");
    span.innerHTML = affiliations.map((affiliation, index) =>
        "<sup>" + (index + 1).toString() + "</sup>" + affiliation
    ).join(", ");
    return span
}

function footnote_node(footnotes) {
    var span = document.createElement("span");
    // footnotes is a list of pairs of the form [symbol, footnote]
    // Then make a string of the form "<sup>symbol</sup> footnote"
    // Then join the strings with ", "
    span.innerHTML = footnotes.map(footnote =>
        "<sup>" + footnote[0] + "</sup>" + footnote[1]
    ).join(", ");
    return span
}

function make_site(paper) {
    document.title = paper.title;
    get("title").textContent = paper.title;
    get("conference").textContent = paper.conference;

    // Randomly swap the first two authors
    if (Math.random() < 0.5) {
        var temp = paper.authors[0];
        paper.authors[0] = paper.authors[1];
        paper.authors[1] = temp;
    }
    
    paper.authors.map((author, index) => {
        node = author_node(author);
        get("author-list").appendChild(node);
        if (index == paper.authors.length - 1) return;
        node.innerHTML += ", "
    })
    get("affiliation-list").appendChild(affiliations_node(paper.affiliations));
    get("footnote-list").appendChild(footnote_node(paper.footnotes));
    get("abstract").textContent = paper.abstract;

    // Populate the button list with the URLs from the paper
    buttonlist = get("button-list");
    for (var button in paper.URLs) {
        node = document.createElement("a");
        node.href = paper.URLs[button];

        img = document.createElement("img");
        img.src = "assets/logos/arXiv.svg";
        node.appendChild(img);

        span = document.createElement("span");
        span.textContent = button;
        node.appendChild(span);

        buttonlist.appendChild(node);
    }

    // Create the citation node at the end of the page in the bibtex div
    // and add a copy button to the bibtex div
    bibtex = get("bibtex");
    bibtextext = document.createElement("div");
    bibtextext.id = "bibtex-text";
    bibtextext.textContent = atob(paper.base64bibtex);
    var button = document.createElement("button");
    button.id = "copy-button";
    button.textContent = "Copy";
    button.onclick = () => {
        var range = document.createRange();
        range.selectNode(bibtextext);
        window.getSelection().removeAllRanges();
        window.getSelection().addRange(range);
        document.execCommand("copy");
        window.getSelection().removeAllRanges();
    }
    bibtex.appendChild(button);
    bibtex.appendChild(bibtextext);
}

function set_slider(root) {
    const slidesContainer = root.querySelector(".slides-container");
    const slide = root.querySelector(".slide");
    const prevButton = root.querySelector(".slide-arrow-prev");
    const nextButton = root.querySelector(".slide-arrow-next");
    nextButton.addEventListener("click", (event) => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft += slideWidth;
    });
    prevButton.addEventListener("click", () => {
        const slideWidth = slide.clientWidth;
        slidesContainer.scrollLeft -= slideWidth;
    });
}
function create_videos3() {
    // For each video in assets/videos create a video element
    // add them to the videostrailer div
    videostrailer = document.getElementById("videostrailer3")

    const videolist = [
        "assets/videos/cp_pados_planet5.mp4",
    ]

    for (var videopath of videolist) {
        var video = document.createElement("video");
        video.src = videopath;
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.controls = true;
        video.width = 600;
        video.height = 600;
        // set video speed to that is takes 4 seconds to play the video
        video.onloadedmetadata = function () {
            this.playbackRate = this.duration/6;
        }
        videostrailer.appendChild(video);
    }

}

function create_videos() {
    const videostrailer = document.getElementById("videostrailer");

    const filelist = [
        "assets/videos/flower_frames_modif.PNG",
        "assets/videos/short_cubism.mp4",
        "assets/videos/flower_frames_modif.PNG",
    ];

    for (let filepath of filelist) {
        let ext = filepath.split('.').pop().toLowerCase();

        if (ext === "mp4" || ext === "webm" || ext === "ogg") {
            // Create video
            let video = document.createElement("video");
            video.src = filepath;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.controls = false;
            video.width = 300;
            video.height = 300;

            // Prevent right-click save
            video.addEventListener('contextmenu', e => e.preventDefault());

            // Playback speed tweak
            video.onloadedmetadata = function () {
                this.playbackRate = this.duration;
            }

            videostrailer.appendChild(video);
        } else {
            // Create image
            let img = document.createElement("img");
            img.src = filepath;
            img.width = 300;
            img.height = 300;
            img.style.display = "block";

            videostrailer.appendChild(img);
        }
    }
}


function create_videos() {
    const videostrailer = document.getElementById("videostrailer");

    const mediaList = [
        "assets/videos/sea_feame_modif.PNG",
        "assets/videos/flowerflow.jpg",
        "assets/videos/flower_frames_modif.PNG",
    ];

    mediaList.forEach(mediaPath => {
        const ext = mediaPath.split('.').pop().toLowerCase();

        let element;
        if (ext === "mp4") {
            element = document.createElement("video");
            element.src = mediaPath;
            element.autoplay = true;
            element.loop = true;
            element.muted = true;
            element.controls = false;
            element.onloadedmetadata = function () {
                this.playbackRate = this.duration; // your speed setting
            };
        } else if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) {
            element = document.createElement("img");
            element.src = mediaPath;
            element.alt = "Media preview";
        }

        if (element) {
            element.width = 300;
            element.height = 500;
            videostrailer.appendChild(element);
        }
    });
}

function create_videos2() {
    const videostrailer = document.getElementById("videostrailer2");

    const mediaList = [
        "assets/videos/blacksculpts_modif.PNG",
        "assets/videos/img_to_3d.mp4",
        "assets/videos/marm_apollo.png",
    ];

    mediaList.forEach(mediaPath => {
        const ext = mediaPath.split('.').pop().toLowerCase();

        let element;
        if (ext === "mp4") {
            element = document.createElement("video");
            element.src = mediaPath;
            element.autoplay = true;
            element.loop = true;
            element.muted = true;
            element.controls = false;
            element.onloadedmetadata = function () {
                this.playbackRate = this.duration/4; // your speed setting
            };
        } else if (["png", "jpg", "jpeg", "gif", "webp"].includes(ext)) {
            element = document.createElement("img");
            element.src = mediaPath;
            element.alt = "Media preview";
        }

        if (element) {
            element.width = 300;
            element.height = 300;
            videostrailer.appendChild(element);
        }
    });
}


// </script>

fetch("./paper.json").then(response => response.json()).then(json => make_site(json));

sliders = document.getElementsByClassName("slider-wrapper")
for (var i = 0; i < sliders.length; i++) set_slider(sliders[i])

create_videos();
create_videos2();
create_videos3();