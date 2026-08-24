"""Procedural painterly sky generator for the STAIL hero + contact panels."""
import numpy as np
from PIL import Image, ImageFilter

rng = np.random.default_rng(11)


def lerp(a, b, t):
    return a + (b - a) * t


def smoothstep(e0, e1, x):
    t = np.clip((x - e0) / (e1 - e0), 0, 1)
    return t * t * (3 - 2 * t)


def fbm(w, h, octaves=6, base=4, persistence=0.55, seed=0):
    r = np.random.default_rng(seed)
    out = np.zeros((h, w), dtype=np.float64)
    amp, total = 1.0, 0.0
    for o in range(octaves):
        gw, gh = base * (2 ** o), max(2, int(base * (2 ** o) * h / w))
        grid = r.random((gh, gw))
        layer = np.asarray(
            Image.fromarray((grid * 255).astype(np.uint8)).resize((w, h), Image.BICUBIC),
            dtype=np.float64,
        ) / 255.0
        out += amp * layer
        total += amp
        amp *= persistence
    return out / total


def vertical_gradient(w, h, stops):
    """stops: list of (t, (r,g,b)) sorted by t in [0,1]."""
    ys = np.linspace(0, 1, h)
    ts = [s[0] for s in stops]
    img = np.zeros((h, w, 3), dtype=np.float64)
    for c in range(3):
        col = np.interp(ys, ts, [s[1][c] for s in stops])
        img[:, :, c] = col[:, None]
    return img


def make_sky(w, h, seed, cloud_amount=0.5, warm=False, meadow=True, clear_center=True):
    # --- gradient sky ---
    if warm:
        stops = [
            (0.0, (46, 110, 200)),
            (0.45, (110, 168, 228)),
            (0.75, (182, 210, 235)),
            (1.0, (238, 226, 205)),
        ]
    else:
        stops = [
            (0.0, (36, 108, 208)),
            (0.4, (86, 152, 224)),
            (0.72, (152, 198, 240)),
            (1.0, (214, 232, 248)),
        ]
    sky = vertical_gradient(w, h, stops)

    # --- sun glow, upper right ---
    yy, xx = np.mgrid[0:h, 0:w].astype(np.float64)
    cx, cy = w * 0.82, h * 0.06
    d = np.sqrt((xx - cx) ** 2 + (yy - cy) ** 2) / (w * 0.55)
    glow = np.clip(1 - d, 0, 1) ** 2.6
    for c, g in zip(range(3), (255, 250, 235)):
        sky[:, :, c] += glow * (g - sky[:, :, c]) * 0.38

    # --- clouds: two FBM layers ---
    ys = np.linspace(0, 1, h)[:, None] * np.ones((1, w))
    xs = np.linspace(0, 1, w)[None, :] * np.ones((h, 1))

    # far wispy layer
    n1 = fbm(w, h, octaves=6, base=6, persistence=0.55, seed=seed)
    far = smoothstep(0.52, 0.62, n1) * 0.5
    # near cumulus layer
    n2 = fbm(w, h, octaves=7, base=3, persistence=0.52, seed=seed + 99)
    thr = 0.56 - cloud_amount * 0.07
    near = smoothstep(thr, thr + 0.13, n2)

    # keep the title zone (center-upper) clearer
    if clear_center:
        clear = np.exp(-(((xs - 0.5) / 0.34) ** 2) - (((ys - 0.34) / 0.30) ** 2))
        near *= 1 - clear * 0.85
        far *= 1 - clear * 0.6

    # clouds thin out near the very top, denser mid-sky
    band = smoothstep(0.02, 0.25, ys) * (1 - smoothstep(0.68, 0.95, ys))
    near *= band
    far *= smoothstep(0.0, 0.15, ys) * (1 - smoothstep(0.75, 1.0, ys))

    # cloud shading: light tops, soft blue-gray bases
    near_blur = np.asarray(
        Image.fromarray((near * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(w // 240)),
        dtype=np.float64,
    ) / 255.0
    shadow = np.roll(near_blur, int(h * 0.018), axis=0) * (1 - near_blur * 0.55)

    cloud_col = np.array((255, 255, 255), dtype=np.float64)
    shade_col = np.array((150, 172, 205), dtype=np.float64)
    alpha = np.clip(far * 0.55 + near_blur * 0.95, 0, 1)
    for c in range(3):
        sky[:, :, c] = sky[:, :, c] * (1 - alpha) + cloud_col[c] * alpha
        sky[:, :, c] -= shadow * (sky[:, :, c] - shade_col[c]) * 0.30

    img = Image.fromarray(np.clip(sky, 0, 255).astype(np.uint8))
    img = img.filter(ImageFilter.GaussianBlur(1.2))

    # --- meadow strip ---
    if meadow:
        mh = int(h * 0.16)
        m = np.zeros((mh, w, 3), dtype=np.float64)
        mys = np.linspace(0, 1, mh)[:, None]
        top = np.array((132, 158, 74), dtype=np.float64)
        bot = np.array((94, 122, 52), dtype=np.float64)
        for c in range(3):
            m[:, :, c] = lerp(top[c], bot[c], mys)[:, 0][:, None]
        # mottle
        mn = fbm(w, mh, octaves=5, base=10, persistence=0.6, seed=seed + 7)
        m += ((mn - 0.5) * 60)[:, :, None]
        # golden light patches
        gn = fbm(w, mh, octaves=4, base=5, persistence=0.6, seed=seed + 13)
        gold = smoothstep(0.55, 0.75, gn)
        gold_col = np.array((214, 196, 108), dtype=np.float64)
        for c in range(3):
            m[:, :, c] = m[:, :, c] * (1 - gold * 0.55) + gold_col[c] * gold * 0.55
        meadow_img = Image.fromarray(np.clip(m, 0, 255).astype(np.uint8))

        # bokeh flowers
        from PIL import ImageDraw
        fl = Image.new("RGBA", (w, mh), (0, 0, 0, 0))
        dr = ImageDraw.Draw(fl)
        r2 = np.random.default_rng(seed + 21)
        for _ in range(int(w / 6)):
            x = r2.integers(0, w)
            y = r2.integers(int(mh * 0.15), mh)
            rad = int(r2.integers(2, 7) * (0.6 + y / mh))
            col = [(255, 252, 235), (250, 226, 120), (245, 245, 250), (232, 180, 200)][r2.integers(0, 4)]
            a = int(120 + 100 * (y / mh))
            dr.ellipse((x - rad, y - rad, x + rad, y + rad), fill=col + (a,))
        fl = fl.filter(ImageFilter.GaussianBlur(3.2))
        meadow_img = meadow_img.convert("RGBA")
        meadow_img.alpha_composite(fl)
        meadow_img = meadow_img.convert("RGB").filter(ImageFilter.GaussianBlur(2.4))

        # soft fade where meadow meets sky
        img.paste(meadow_img, (0, h - mh))
        fade_h = int(mh * 0.5)
        fade = img.crop((0, h - mh - fade_h, w, h - mh + fade_h)).filter(
            ImageFilter.GaussianBlur(6)
        )
        mask = Image.new("L", (w, fade_h * 2), 0)
        md = np.tile(
            (np.sin(np.linspace(0, np.pi, fade_h * 2)) * 255).astype(np.uint8)[:, None],
            (1, w),
        )
        mask = Image.fromarray(md)
        img.paste(fade, (0, h - mh - fade_h), mask)

    # --- grain ---
    arr = np.asarray(img, dtype=np.float64)
    arr += rng.normal(0, 2.2, arr.shape)
    return Image.fromarray(np.clip(arr, 0, 255).astype(np.uint8))


hero = make_sky(2400, 1440, seed=5, cloud_amount=0.62, meadow=True)
hero.save("/Users/zaid/Github/stail-labs/public/img/hero-sky.jpg", quality=86, optimize=True)

contact = make_sky(2000, 1240, seed=31, cloud_amount=0.42, warm=True, meadow=False, clear_center=False)
contact.save("/Users/zaid/Github/stail-labs/public/img/contact-sky.jpg", quality=86, optimize=True)
print("saved")
