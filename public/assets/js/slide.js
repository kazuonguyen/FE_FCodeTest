/* ---------- SPLIDE SLIDER --------- */

let splide = new Splide(".splide", {
    type: "loop",
    drag: "free",
    snap: true,
    perPage: 1,
    perMove: 1,
    gap: 20,
    arrows: false,
    pauseOnHover: true,
    autoplay: true,
});

splide.mount();
