(function () {
  const DISHES = window.DISHES || {};
  const FRAMES = window.FRAMES || [];
  const FPS = window.FILM_FPS || 15;
  const N = FRAMES.length;
  const DUR = (N - 1) / FPS;
  const MEALS = ["breakfast", "lunch", "dinner"];
  const LABEL = { breakfast: "Breakfast", lunch: "Lunch", dinner: "Dinner" };
  const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (id) => document.getElementById(id);
  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };
  const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
  const lerp = (a, b, t) => a + (b - a) * t;

  // ---- the film ------------------------------------------------------------
  // Frames stay compressed in memory; only those near the current position are
  // decoded (plus every 10th as a fallback), so the picture is full-resolution
  // without holding hundreds of bitmaps. One sharp frame is painted at a time.
  const canvas = $("film"), ctx = canvas.getContext("2d", { alpha: false });
  const blobs = new Array(N), cache = new Map(), pending = new Set();
  const KEY = 10, AHEAD = 30, BEHIND = 14, KEEP = 70, MAXJOBS = 6;
  let W = 0, H = 0, loaded = 0, dirty = true, lastDrawn = null, dir = 1, lastI = 0;
  function resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    W = canvas.width = Math.round(window.innerWidth * dpr);
    H = canvas.height = Math.round(window.innerHeight * dpr);
    dirty = true;
  }
  function decode(i) {
    if (!blobs[i] || cache.has(i) || pending.has(i)) return;
    pending.add(i);
    createImageBitmap(blobs[i]).then((bm) => { cache.set(i, bm); dirty = true; }, () => {}).then(() => pending.delete(i));
  }
  function want(i) {
    // nearest first, leaning the way the scroll is going
    for (let d = 0; d <= AHEAD && pending.size < MAXJOBS; d++) {
      const f = i + d * dir, b = i - d * dir;
      if (f >= 0 && f < N) decode(f);
      if (d <= BEHIND && b >= 0 && b < N && pending.size < MAXJOBS) decode(b);
    }
    if (cache.size > KEEP + N / KEY) {
      cache.forEach((bm, k) => { if (k % KEY && Math.abs(k - i) > KEEP / 2) { bm.close(); cache.delete(k); } });
    }
  }
  function nearest(i) {
    for (let d = 0; d < N; d++) {
      if (cache.has(i - d)) return cache.get(i - d);
      if (cache.has(i + d)) return cache.get(i + d);
    }
    return null;
  }
  function paint(t) {
    const i = clamp(Math.round(t * FPS), 0, N - 1);
    if (i !== lastI) { dir = i > lastI ? 1 : -1; lastI = i; }
    want(i);
    const im = nearest(i);
    if (!im || (im === lastDrawn && !dirty)) return;
    lastDrawn = im; dirty = false;
    const s = Math.max(W / im.width, H / im.height);
    const w = im.width * s, h = im.height * s;
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(im, (W - w) / 2, (H - h) / 2, w, h);
  }
  async function loadPack(k) {
    try {
      const buf = await (await fetch("pack" + k + ".webp")).arrayBuffer();
      FRAMES.forEach((f, i) => {
        if (f[0] !== k) return;
        blobs[i] = new Blob([buf.slice(f[1], f[1] + f[2])], { type: "image/webp" });
        loaded++;
        if (i % KEY === 0) decode(i);
      });
      dirty = true;
    } catch (e) { /* the poster stays up if a pack fails */ }
    $("loaderBar").style.width = Math.round((loaded / N) * 100) + "%";
    if (loaded >= N) $("loader").classList.add("done");
  }
  async function loadFilm() {
    const packs = [...new Set(FRAMES.map((f) => f[0]))];
    await loadPack(packs[0]);
    for (let p = 1; p < packs.length; p += 3) await Promise.all(packs.slice(p, p + 3).map(loadPack));
  }

  // ---- cards ---------------------------------------------------------------
  const canHover = window.matchMedia("(hover: hover)").matches;
  MEALS.forEach((meal) => {
    const grid = document.querySelector("#" + meal + " .grid");
    (DISHES[meal] || []).forEach((dish, i) => {
      const card = el("button", "card");
      card.type = "button";
      card.style.setProperty("--d", (i % 4) * 0.09 + "s");
      card.setAttribute("aria-label", dish.name + ", view recipe");
      card.appendChild(el("span", "n", (i < 9 ? "0" : "") + (i + 1) + "  /  " + (dish.time || "")));
      card.appendChild(el("h3", null, dish.name));
      card.appendChild(el("p", null, dish.blurb || ""));
      const foot = el("div", "foot");
      foot.appendChild(el("span", null, dish.level || ""));
      foot.appendChild(el("span", "go", "View recipe"));
      card.appendChild(foot);
      card.addEventListener("click", () => openRecipe(meal, dish, card));
      if (canHover && !REDUCED) {
        card.addEventListener("pointermove", (e) => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
          card.classList.add("tilt");
          card.style.setProperty("--ry", ((x - 0.5) * 9).toFixed(2) + "deg");
          card.style.setProperty("--rx", ((0.5 - y) * 7).toFixed(2) + "deg");
          card.style.setProperty("--mx", (x * 100).toFixed(1) + "%");
          card.style.setProperty("--my", (y * 100).toFixed(1) + "%");
        });
        card.addEventListener("pointerleave", () => {
          card.classList.remove("tilt");
          card.style.setProperty("--ry", "0deg");
          card.style.setProperty("--rx", "0deg");
        });
      }
      grid.appendChild(card);
    });
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); } });
  }, { rootMargin: "0px 0px -6% 0px" });
  document.querySelectorAll(".card").forEach((c) => io.observe(c));

  // ---- recipe drawer -------------------------------------------------------
  const drawer = $("drawer"), scrim = $("scrim");
  let lastFocus = null;
  function openRecipe(meal, dish, from) {
    lastFocus = from;
    $("rMeal").textContent = LABEL[meal];
    $("rName").textContent = dish.name;
    $("rBlurb").textContent = dish.blurb || "";
    const meta = $("rMeta"); meta.textContent = "";
    [["Time", dish.time], ["Serves", dish.serves], ["Level", dish.level]].forEach(([k, v]) => { if (v) meta.appendChild(el("li", null, k + ": " + v)); });
    (dish.tags || []).forEach((t) => meta.appendChild(el("li", "tag", t)));
    const ing = $("rIngredients"); ing.textContent = "";
    (dish.ingredients || []).forEach((text) => {
      const li = el("li"), label = el("label"), box = el("input");
      box.type = "checkbox";
      label.appendChild(box); label.appendChild(el("span", null, text));
      li.appendChild(label); ing.appendChild(li);
    });
    const steps = $("rSteps"); steps.textContent = "";
    (dish.steps || []).forEach((text) => { const li = el("li"); li.appendChild(el("span", null, text)); steps.appendChild(li); });
    drawer.hidden = false; scrim.hidden = false;
    drawer.scrollTop = 0;
    document.documentElement.classList.add("locked");
    requestAnimationFrame(() => requestAnimationFrame(() => { drawer.classList.add("open"); scrim.classList.add("open"); }));
    $("rClose").focus({ preventScroll: true });
  }
  function closeRecipe() {
    if (drawer.hidden) return;
    drawer.classList.remove("open"); scrim.classList.remove("open");
    document.documentElement.classList.remove("locked");
    setTimeout(() => { drawer.hidden = true; scrim.hidden = true; }, 560);
    if (lastFocus) lastFocus.focus({ preventScroll: true });
  }
  $("rClose").addEventListener("click", closeRecipe);
  scrim.addEventListener("click", closeRecipe);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeRecipe(); });

  // ---- scroll -> film time -------------------------------------------------
  // The film, in seconds: 0-3.4 sunrise kitchen · dip through black · 4.1-10.6 golden
  // afternoon: out over the skyline and back to the island · dip through black ·
  // 11.3-16.3 dusk kitchen, out over the night city · 16.3-18.5 the night kitchen.
  // Each meal: [as its title scrolls in, as the title settles, at the end of its cards]
  const SEC = [[0.55, 1.05, 3.0], [7.9, 8.3, 8.85], [14.65, 15.2, 16.35]];
  // Hour of day as a function of film time, for the clock, the rail and the grade.
  const HOUR_AT = [[0, 6.6], [3.37, 7.9], [4.07, 11.3], [8.9, 13.7], [9.6, 18.3], [12.5, 19.7], [DUR, 22]];
  const START_H = HOUR_AT[0][1], END_H = HOUR_AT[HOUR_AT.length - 1][1];
  const MEAL_H = SEC.map((s) => s.map(hourAt));
  function hourAt(sec) {
    let i = 0;
    while (i < HOUR_AT.length - 2 && sec > HOUR_AT[i + 1][0]) i++;
    const a = HOUR_AT[i], b = HOUR_AT[i + 1];
    return lerp(a[1], b[1], clamp((sec - a[0]) / (b[0] - a[0]), 0, 1));
  }
  let anchors = [];
  function measure() {
    const vh = window.innerHeight;
    const max = Math.max(1, document.documentElement.scrollHeight - vh);
    anchors = [[0, 0]];
    MEALS.forEach((meal, i) => {
      const sec = $(meal), intro = sec.querySelector(".intro");
      const top = intro.getBoundingClientRect().top + window.scrollY;
      const bottom = sec.getBoundingClientRect().bottom + window.scrollY;
      anchors.push([top - vh * 0.8, SEC[i][0]]);
      anchors.push([top, SEC[i][1]]);
      anchors.push([bottom - vh, SEC[i][2]]);
    });
    const endTop = $("end").getBoundingClientRect().top + window.scrollY;
    anchors.push([endTop - vh * 0.5, DUR]);
    anchors.push([max, DUR]);
    for (let i = 1; i < anchors.length; i++) anchors[i][0] = Math.max(anchors[i][0], anchors[i - 1][0] + 1);
  }
  function sample(y) {
    let i = 0;
    while (i < anchors.length - 2 && y > anchors[i + 1][0]) i++;
    const a = anchors[i], b = anchors[i + 1];
    return lerp(a[1], b[1], clamp((y - a[0]) / (b[0] - a[0]), 0, 1));
  }

  // ---- colour grade: a tint over the film that follows the hour -------------
  // [hour, r, g, b, strength]
  const GRADE = [
    [6.6, 255, 150, 70, 0.22], [7.9, 255, 176, 96, 0.16], [9.5, 255, 200, 140, 0.12],
    [11.3, 255, 185, 110, 0.14], [13.7, 255, 170, 95, 0.18], [16, 255, 160, 90, 0.14],
    [18.3, 255, 140, 60, 0.28], [19.7, 150, 110, 120, 0.16], [22, 40, 60, 120, 0.30]
  ];
  const grade = $("grade");
  function setGrade(h) {
    let i = 0;
    while (i < GRADE.length - 2 && h > GRADE[i + 1][0]) i++;
    const a = GRADE[i], b = GRADE[i + 1];
    const t = clamp((h - a[0]) / (b[0] - a[0]), 0, 1);
    const c = [1, 2, 3].map((k) => Math.round(lerp(a[k], b[k], t)));
    grade.style.background = "rgb(" + c.join(",") + ")";
    grade.style.opacity = lerp(a[4], b[4], t).toFixed(3);
  }

  const clock = $("clock"), fill = $("railFill");
  const stops = [...document.querySelectorAll(".stop")];
  const navLinks = [...document.querySelectorAll(".top nav a")];
  const depth = [...document.querySelectorAll(".depth")];
  const FADE_AT = window.innerWidth < 700 ? 0.42 : 0.2;
  const topBar = document.querySelector(".top");
  const pct = (h) => ((h - START_H) / (END_H - START_H)) * 100;
  stops.forEach((s, i) => { s.style.top = pct(MEAL_H[i][1]) + "%"; });
  function fmt(h) {
    const m = Math.round((h * 60) / 5) * 5;
    let hh = Math.floor(m / 60) % 24; const mm = m % 60;
    const ap = hh >= 12 ? "PM" : "AM";
    hh = hh % 12 || 12;
    return hh + ":" + (mm < 10 ? "0" : "") + mm + " " + ap;
  }
  let target = 0, cur = 0, shownHour = -1;
  function onScroll() {
    const y = window.scrollY;
    target = sample(y);
    topBar.classList.toggle("scrolled", y > 40);
    if (REDUCED) return;
    const vh = window.innerHeight;
    depth.forEach((d) => {
      const r = d.parentElement.getBoundingClientRect();
      if (r.bottom < -200 || r.top > vh + 200) return;
      const p = (r.top + r.height / 2 - vh / 2) / vh;
      const a = Math.abs(p);
      d.style.transform = "translate3d(0," + (p * -60).toFixed(1) + "px," + (-a * 220).toFixed(1) + "px) rotateX(" + (p * 8).toFixed(2) + "deg)";
      d.style.opacity = clamp(1 - Math.max(0, a - FADE_AT) * 2.2, 0, 1).toFixed(3);
    });
  }
  function showHour(h) {
    if (Math.abs(h - shownHour) < 0.01) return;
    shownHour = h;
    clock.textContent = fmt(h);
    fill.style.height = clamp(pct(h), 0, 100) + "%";
    setGrade(h);
    MEALS.forEach((m, i) => {
      const on = h >= MEAL_H[i][0] - 0.2 && h <= MEAL_H[i][2] + 0.3;
      stops[i].classList.toggle("on", on);
      navLinks[i].classList.toggle("on", on);
    });
  }
  let last = performance.now();
  function tick(now) {
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (REDUCED) cur = target;
    else {
      // ease toward the scroll position: fast enough to feel direct, soft enough to hide scroll-wheel steps
      cur += (target - cur) * (1 - Math.exp(-dt * 14));
      if (Math.abs(target - cur) < 0.0015) cur = target;
    }
    paint(cur);
    showHour(hourAt(cur));
    requestAnimationFrame(tick);
  }
  const refresh = () => { resize(); measure(); onScroll(); };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", refresh);
  window.addEventListener("load", refresh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);
  refresh();
  cur = target;
  requestAnimationFrame(tick);
  loadFilm();
})();
