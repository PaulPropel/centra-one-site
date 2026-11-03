// The homepage 3D scene: 2,400 instanced cubes that morph between five formations as the
// visitor scrolls through the hero chapters.
//
//   0  Warehouse racking (40 bays x 6 levels x 10 rows), a few amber and red bins
//   1  Sales skyline (20 x 20 columns, height = sales)
//   2  The skyline dimmed, one column (BioGuard) pulsing red with a ring
//   3  Centra AI core, a Fibonacci sphere
//   4  The C1 mark, sampled from the logo
//
// Loaded lazily from Hero3D.astro after first paint. If WebGL is unavailable or the context
// is lost, onFail() is called and the page keeps its static background.
import {
  ACESFilmicToneMapping,
  BoxGeometry,
  Color,
  DirectionalLight,
  DynamicDrawUsage,
  Fog,
  GridHelper,
  HemisphereLight,
  InstancedMesh,
  type LineBasicMaterial,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  Plane,
  Raycaster,
  Scene,
  TorusGeometry,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { heroProgress } from "./hero-progress";

export interface Hero3DOptions {
  section: HTMLElement;
  stage: HTMLElement;
  canvas: HTMLCanvasElement;
  logoUrl: string;
  reduce: boolean;
  onReady: () => void;
  onFail: () => void;
}

const N = 2400;

export function initHero3D(o: Hero3DOptions): () => void {
  const { section, stage, canvas, reduce } = o;

  let renderer: WebGLRenderer;
  try {
    renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
  } catch {
    o.onFail();
    return () => {};
  }
  renderer.setClearColor(0x000000, 0);
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;

  const scene = new Scene();
  scene.fog = new Fog(0x05060a, 13, 30);
  const camera = new PerspectiveCamera(32, 1, 0.1, 100);

  scene.add(new HemisphereLight(0xc9d3ff, 0x080a14, 1.15));
  const key = new DirectionalLight(0xffffff, 2.3);
  key.position.set(5, 10, 7);
  scene.add(key);
  const rim = new DirectionalLight(0x8a6cff, 2.8);
  rim.position.set(-9, 4, -8);
  scene.add(rim);

  const grid = new GridHelper(36, 72, 0x2b3a8f, 0x161d42);
  const gridMat = grid.material as LineBasicMaterial;
  gridMat.transparent = true;
  gridMat.opacity = 0.16;
  gridMat.depthWrite = false;
  scene.add(grid);

  const geo = new BoxGeometry(1, 1, 1);
  const mat = new MeshStandardMaterial({ color: 0xffffff, roughness: 0.36, metalness: 0.2 });
  const mesh = new InstancedMesh(geo, mat, N);
  mesh.instanceMatrix.setUsage(DynamicDrawUsage);
  mesh.frustumCulled = false;
  const white = new Color(1, 1, 1);
  for (let i = 0; i < N; i++) mesh.setColorAt(i, white);
  const instanceColor = mesh.instanceColor!;
  instanceColor.setUsage(DynamicDrawUsage);
  scene.add(mesh);

  const ringGeo = new TorusGeometry(0.42, 0.022, 12, 72);
  const ringMat = new MeshBasicMaterial({ color: 0xff5a4f, transparent: true, opacity: 0, depthWrite: false });
  const ring = new Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.visible = false;
  scene.add(ring);

  // Deterministic per-instance noise, so the scene looks the same on every visit.
  const rnd = (i: number, s: number) => {
    const x = Math.sin(i * 127.1 + s * 311.7) * 43758.5453;
    return x - Math.floor(x);
  };
  const C = (h: number) => new Color(h);
  const blueA = C(0x1a1aff);
  const blueB = C(0x6e8bff);
  const violet = C(0xa78bfa);
  const ice = C(0xe8edff);
  const amber = C(0xffb340);
  const red = C(0xff5a4f);
  const dim = C(0x1a2046);
  const navy = C(0x141a38);
  const tc = new Color();
  const put = (arr: Float32Array, i: number, c: Color) => {
    arr[i * 3] = c.r;
    arr[i * 3 + 1] = c.g;
    arr[i * 3 + 2] = c.b;
  };

  // Formation A: warehouse racking.
  const PA = new Float32Array(N * 3);
  const SA = new Float32Array(N);
  const CA = new Float32Array(N * 3);
  const cols = 40;
  const levels = 6;
  const sp = 0.27;
  for (let i = 0; i < N; i++) {
    const c = i % cols;
    const l = Math.floor(i / cols) % levels;
    const r = Math.floor(i / (cols * levels));
    const pair = Math.floor(r / 2);
    const side = r % 2;
    PA[i * 3] = (c - (cols - 1) / 2) * sp;
    PA[i * 3 + 1] = l * sp + 0.14;
    PA[i * 3 + 2] = (pair - 2) * 1.2 + side * sp - sp / 2;
    const filled = rnd(i, 1) > 0.15;
    SA[i] = filled ? 0.21 : 0.05;
    const k = rnd(i, 2);
    if (!filled) put(CA, i, dim);
    else if (k < 0.028) put(CA, i, amber);
    else if (k < 0.036) put(CA, i, red);
    else put(CA, i, tc.copy(blueA).lerp(blueB, rnd(i, 3)));
  }

  // Formation B: sales skyline, 20 x 20 columns whose heights add up to N.
  const G = 20;
  const gsp = 0.3;
  const raw = new Array<number>(G * G);
  let rawSum = 0;
  for (let j = 0; j < G * G; j++) {
    const x = (j % G) - (G - 1) / 2;
    const z = Math.floor(j / G) - (G - 1) / 2;
    let h =
      0.55 +
      0.32 * Math.sin(x * 0.55 + 0.8) * Math.cos(z * 0.45 - 0.3) +
      0.95 * Math.exp(-((x - 3.5) * (x - 3.5) + (z + 2.5) * (z + 2.5)) / 10) +
      0.6 * Math.exp(-((x + 4.5) * (x + 4.5) + (z - 3.5) * (z - 3.5)) / 12);
    if (h < 0.08) h = 0.08;
    raw[j] = h;
    rawSum += h;
  }
  const heights = raw.map((h) => Math.max(1, Math.round((h / rawSum) * N)));
  let total = heights.reduce((a, b) => a + b, 0);
  const order = raw.map((_, j) => j).sort((a, b) => raw[b] - raw[a]);
  let ptr = 0;
  while (total < N) {
    heights[order[ptr % order.length]] += 1;
    total += 1;
    ptr += 1;
  }
  ptr = 0;
  let guard = 0;
  while (total > N && guard < 200000) {
    const j = order[ptr % order.length];
    if (heights[j] > 1) {
      heights[j] -= 1;
      total -= 1;
    }
    ptr += 1;
    guard += 1;
  }
  const maxH = Math.max(1, ...heights);

  const jRed = 16 * G + 14;
  const jAmber = [14 * G + 5, 17 * G + 9, 11 * G + 16];
  const PB = new Float32Array(N * 3);
  const SB = new Float32Array(N);
  const CB = new Float32Array(N * 3);
  const CC = new Float32Array(N * 3);
  const isRed = new Uint8Array(N);
  let ii = 0;
  for (let j = 0; j < G * G && ii < N; j++) {
    const cx = ((j % G) - (G - 1) / 2) * gsp;
    const cz = (Math.floor(j / G) - (G - 1) / 2) * gsp;
    const hn = heights[j] / maxH;
    for (let lv = 0; lv < heights[j] && ii < N; lv++) {
      PB[ii * 3] = cx;
      PB[ii * 3 + 1] = lv * 0.26 + 0.13;
      PB[ii * 3 + 2] = cz;
      SB[ii] = 0.22;
      if (hn < 0.5) tc.copy(blueA).lerp(blueB, hn * 2);
      else tc.copy(blueB).lerp(violet, (hn - 0.5) * 2);
      if (lv === heights[j] - 1) tc.lerp(ice, 0.35);
      put(CB, ii, tc);
      if (j === jRed) {
        put(CC, ii, red);
        isRed[ii] = 1;
      } else if (jAmber.includes(j)) put(CC, ii, amber);
      else {
        tc.lerp(navy, 0.72);
        put(CC, ii, tc);
      }
      ii += 1;
    }
  }
  const redX = ((jRed % G) - (G - 1) / 2) * gsp;
  const redZ = (Math.floor(jRed / G) - (G - 1) / 2) * gsp;
  ring.position.set(redX, 0.03, redZ);

  // Formation D: Centra AI core, a Fibonacci sphere.
  const golden = Math.PI * (3 - Math.sqrt(5));
  const sY = new Float32Array(N);
  const sR = new Float32Array(N);
  const sT = new Float32Array(N);
  const SD = new Float32Array(N);
  const CD = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const y = 1 - (i / (N - 1)) * 2;
    sY[i] = y;
    sR[i] = Math.sqrt(Math.max(0, 1 - y * y));
    sT[i] = golden * i;
    SD[i] = 0.085 + 0.05 * rnd(i, 5);
    const f = (y + 1) / 2;
    if (f < 0.5) tc.copy(blueA).lerp(blueB, f * 2);
    else tc.copy(blueB).lerp(violet, (f - 0.5) * 2);
    if (rnd(i, 6) > 0.92) tc.lerp(ice, 0.7);
    put(CD, i, tc);
  }
  const SR = 2.3;
  const CY = 1.7;

  // Formation E: the C1 mark, sampled from the logo (a small sphere until it loads).
  const LY = 2.1;
  const LH = 2.0;
  const PE = new Float32Array(N * 3);
  const SE = new Float32Array(N);
  const CE = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    PE[i * 3] = Math.cos(sT[i]) * sR[i] * 1.5;
    PE[i * 3 + 1] = sY[i] * 1.5 + LY;
    PE[i * 3 + 2] = Math.sin(sT[i]) * sR[i] * 1.5;
    SE[i] = 0.07;
    put(CE, i, ice);
  }
  const buildLogo = (pts: Array<[number, number]>, S: number) => {
    const M = pts.length;
    const layers = M >= N ? 1 : Math.ceil(N / M);
    const pitch = (LH * 2) / (S - 1);
    for (let i = 0; i < N; i++) {
      let p: [number, number];
      let layer: number;
      if (M >= N) {
        p = pts[Math.floor((i * M) / N)];
        layer = 0;
      } else {
        p = pts[i % M];
        layer = Math.floor(i / M);
      }
      PE[i * 3] = p[0] * LH;
      PE[i * 3 + 1] = -p[1] * LH + LY;
      PE[i * 3 + 2] = (layer - (layers - 1) / 2) * pitch * 1.1;
      SE[i] = pitch * 0.92;
      const depthT = layers > 1 ? layer / (layers - 1) : 0;
      tc.copy(ice).lerp(blueB, depthT * 0.8);
      put(CE, i, tc);
    }
  };
  const img = new Image();
  img.decoding = "async";
  img.onload = () => {
    try {
      const S = 72;
      const cv = document.createElement("canvas");
      cv.width = S;
      cv.height = S;
      const g2 = cv.getContext("2d", { willReadFrequently: true });
      if (!g2) return;
      g2.drawImage(img, 0, 0, S, S);
      const d = g2.getImageData(0, 0, S, S).data;
      const pts: Array<[number, number]> = [];
      for (let y = 0; y < S; y++) {
        for (let x = 0; x < S; x++) {
          const q = (y * S + x) * 4;
          if (d[q + 3] > 180 && d[q] > 190 && d[q + 1] > 190 && d[q + 2] > 190) {
            pts.push([(x / (S - 1)) * 2 - 1, (y / (S - 1)) * 2 - 1]);
          }
        }
      }
      if (pts.length > 60) buildLogo(pts, S);
    } catch {
      // Keep the sphere stand-in.
    }
  };
  img.src = o.logoUrl;

  // Camera path: [x, y, z, lookX, lookY, lookZ] per formation, plus a sideways view offset on
  // wide screens so the scene sits to the right of the chapter copy.
  const camK = [
    [7.4, 5.8, 9.6, 0, 0.5, 0],
    [8.2, 5.4, 8.6, 0, 1.5, 0],
    [redX + 3.4, 2.9, redZ + 4.4, redX, 0.9, redZ],
    [0, 2.0, 10.8, 0, CY, 0],
    [0, 1.3, 10.4, 0, 1.3, 0],
  ];
  const offK = [0.2, 0.2, 0.17, 0.18, 0];
  const colArr = [CA, CB, CC, CD, CE];

  const posOf = (k: number, i: number, rot: number, sway: number, out: number[]) => {
    if (k === 0) {
      out[0] = PA[i * 3];
      out[1] = PA[i * 3 + 1];
      out[2] = PA[i * 3 + 2];
    } else if (k === 1 || k === 2) {
      out[0] = PB[i * 3];
      out[1] = PB[i * 3 + 1];
      out[2] = PB[i * 3 + 2];
    } else if (k === 3) {
      const a = sT[i] + rot;
      out[0] = Math.cos(a) * sR[i] * SR;
      out[1] = sY[i] * SR + CY;
      out[2] = Math.sin(a) * sR[i] * SR;
    } else {
      const x = PE[i * 3];
      const y = PE[i * 3 + 1];
      const z = PE[i * 3 + 2];
      const cs = Math.cos(sway);
      const sn = Math.sin(sway);
      out[0] = x * cs + z * sn;
      out[1] = y;
      out[2] = -x * sn + z * cs;
    }
  };
  const sclOf = (k: number, i: number) => (k === 0 ? SA[i] : k <= 2 ? SB[i] : k === 3 ? SD[i] : SE[i]);

  // Instance matrices are written directly: translate * rotate(x = spin/2, y = spin) * scale.
  const mArr = mesh.instanceMatrix.array as Float32Array;
  const writeMatrix = (i: number, x: number, y: number, z: number, s: number, spin: number) => {
    const m = i * 16;
    if (spin === 0) {
      mArr[m] = s;
      mArr[m + 1] = 0;
      mArr[m + 2] = 0;
      mArr[m + 4] = 0;
      mArr[m + 5] = s;
      mArr[m + 6] = 0;
      mArr[m + 8] = 0;
      mArr[m + 9] = 0;
      mArr[m + 10] = s;
    } else {
      const a = Math.cos(spin * 0.5);
      const b = Math.sin(spin * 0.5);
      const c = Math.cos(spin);
      const d = Math.sin(spin);
      mArr[m] = c * s;
      mArr[m + 1] = b * d * s;
      mArr[m + 2] = -a * d * s;
      mArr[m + 4] = 0;
      mArr[m + 5] = a * s;
      mArr[m + 6] = b * s;
      mArr[m + 8] = d * s;
      mArr[m + 9] = -b * c * s;
      mArr[m + 10] = a * c * s;
    }
    mArr[m + 3] = 0;
    mArr[m + 7] = 0;
    mArr[m + 11] = 0;
    mArr[m + 12] = x;
    mArr[m + 13] = y;
    mArr[m + 14] = z;
    mArr[m + 15] = 1;
  };

  const pa = [0, 0, 0];
  const pb = [0, 0, 0];
  const delays = new Float32Array(N);
  const spins = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    delays[i] = rnd(i, 9) * 0.4;
    spins[i] = (rnd(i, 11) - 0.5) * Math.PI * 2;
  }
  const camP = new Vector3();
  const camT = new Vector3();
  const ray = new Raycaster();
  const ndc = new Vector2();
  const hit = new Vector3();
  const floorPlane = new Plane(new Vector3(0, 1, 0), -0.4);
  const colors = instanceColor.array as Float32Array;
  const clamp01 = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v);
  const smooth = (e0: number, e1: number, x: number) => {
    const t = clamp01((x - e0) / (e1 - e0));
    return t * t * (3 - 2 * t);
  };
  const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  let W = 1;
  let H = 1;
  let wide = true;
  let pTarget = 0;
  let pS = 0;
  let mx = 0;
  let my = 0;
  let tmx = 0;
  let tmy = 0;
  let failed = false;
  let ready = false;
  let pointerSeen = false;

  const resize = () => {
    W = Math.max(1, stage.clientWidth);
    H = Math.max(1, stage.clientHeight);
    wide = W > 900;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, wide ? 2 : 1.5));
    renderer.setSize(W, H, false);
    camera.aspect = W / H;
    camera.updateProjectionMatrix();
  };
  const onMove = (e: PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const r = canvas.getBoundingClientRect();
    if (r.width > 0 && r.height > 0) {
      pointerSeen = true;
      tmx = ((e.clientX - r.left) / r.width) * 2 - 1;
      tmy = -((e.clientY - r.top) / r.height) * 2 + 1;
    }
  };

  let raf = 0;
  let running = false;
  const fail = () => {
    if (failed) return;
    failed = true;
    stopLoop();
    o.onFail();
  };
  const onLost = (e: Event) => {
    e.preventDefault();
    fail();
  };

  let lastTime = 0;
  const frame = (now: number) => {
    const time = now / 1000;
    // Frame-rate independent easing (about 0.1 and 0.06 per frame at 60 fps).
    const dt = lastTime ? Math.min(0.1, Math.max(0, time - lastTime)) : 1 / 60;
    lastTime = time;
    const kScroll = 1 - Math.exp(-dt * 6.3);
    const kMouse = 1 - Math.exp(-dt * 3.7);
    const { p } = heroProgress(section, stage);
    pTarget = p;
    pS = reduce ? pTarget : pS + (pTarget - pS) * kScroll;
    mx += (tmx - mx) * kMouse;
    my += (tmy - my) * kMouse;
    const P = pS * 4;
    const seg = Math.min(3, Math.floor(P));
    const u = P - seg;
    const t = reduce ? (u < 0.5 ? 0 : 1) : smooth(0.2, 0.8, u);
    const te = ease(t);

    const k0 = camK[seg];
    const k1 = camK[seg + 1];
    const par = reduce ? 0 : 1;
    camP.set(
      k0[0] + (k1[0] - k0[0]) * te + mx * 0.6 * par,
      k0[1] + (k1[1] - k0[1]) * te + my * 0.4 * par,
      k0[2] + (k1[2] - k0[2]) * te,
    );
    camT.set(k0[3] + (k1[3] - k0[3]) * te, k0[4] + (k1[4] - k0[4]) * te, k0[5] + (k1[5] - k0[5]) * te);
    camera.position.copy(camP);
    camera.lookAt(camT);
    const off = wide ? offK[seg] + (offK[seg + 1] - offK[seg]) * te : 0;
    camera.setViewOffset(W, H, -W * off, 0, W, H);

    const wA = seg === 0 ? 1 - t : 0;
    const wC = seg === 1 ? t : seg === 2 ? 1 - t : 0;
    const wGrid = seg <= 1 ? 1 : seg === 2 ? 1 - t : 0;
    let lift = false;
    if (wA > 0.01 && !reduce && pointerSeen) {
      ndc.set(mx, my);
      ray.setFromCamera(ndc, camera);
      lift = ray.ray.intersectPlane(floorPlane, hit) !== null;
    }

    const rot = reduce ? 0 : time * 0.22;
    const sway = reduce ? 0 : Math.sin(time * 0.45) * 0.32;
    const cFrom = colArr[seg];
    const cTo = colArr[seg + 1];
    const pulse = 0.5 + 0.5 * Math.sin(time * 5);
    for (let i = 0; i < N; i++) {
      const ti = reduce ? t : clamp01(t * 1.4 - delays[i]);
      const ei = ease(ti);
      posOf(seg, i, rot, sway, pa);
      posOf(seg + 1, i, rot, sway, pb);
      const x = pa[0] + (pb[0] - pa[0]) * ei;
      let y = pa[1] + (pb[1] - pa[1]) * ei;
      const z = pa[2] + (pb[2] - pa[2]) * ei;
      const s0 = sclOf(seg, i);
      let s = s0 + (sclOf(seg + 1, i) - s0) * ei;
      const q = i * 3;
      let cr = cFrom[q] + (cTo[q] - cFrom[q]) * ei;
      let cg = cFrom[q + 1] + (cTo[q + 1] - cFrom[q + 1]) * ei;
      let cb = cFrom[q + 2] + (cTo[q + 2] - cFrom[q + 2]) * ei;
      if (seg === 0 && !reduce) y += Math.sin(time * 1.3 + PA[q] * 0.9 + PA[q + 2] * 0.7) * 0.02 * (1 - ei);
      if (lift) {
        const dx = PA[q] - hit.x;
        const dz = PA[q + 2] - hit.z;
        const g = Math.exp(-(dx * dx + dz * dz) / 0.8) * (1 - ei);
        if (g > 0.002) {
          y += g * 0.6;
          s *= 1 + g * 0.35;
          cr += g * 0.5;
          cg += g * 0.5;
          cb += g * 0.4;
        }
      }
      if (wC > 0 && isRed[i]) s *= 1 + 0.28 * pulse * wC;
      const spin = ei > 0 && ei < 1 ? Math.sin(ei * Math.PI) * spins[i] : 0;
      writeMatrix(i, x, y, z, s, spin);
      colors[q] = cr;
      colors[q + 1] = cg;
      colors[q + 2] = cb;
    }
    mesh.instanceMatrix.needsUpdate = true;
    instanceColor.needsUpdate = true;
    ring.visible = wC > 0.01;
    ringMat.opacity = wC * (0.6 + 0.4 * Math.sin(time * 4));
    ring.scale.setScalar(1 + 0.12 * Math.sin(time * 4));
    grid.visible = wGrid > 0.01;
    gridMat.opacity = 0.16 * wGrid;
    renderer.render(scene, camera);

    if (!ready) {
      ready = true;
      o.onReady();
    }
  };

  const loop = (now: number) => {
    if (!running) return;
    raf = requestAnimationFrame(loop);
    try {
      frame(now);
    } catch {
      fail();
    }
  };
  function startLoop() {
    if (running || failed) return;
    running = true;
    lastTime = 0;
    raf = requestAnimationFrame(loop);
  }
  function stopLoop() {
    running = false;
    cancelAnimationFrame(raf);
  }

  // Only render while the hero is on screen.
  const io = new IntersectionObserver(
    (entries) => {
      if (entries.some((e) => e.isIntersecting)) startLoop();
      else stopLoop();
    },
    { rootMargin: "80px 0px" },
  );
  const ro = new ResizeObserver(resize);

  window.addEventListener("pointermove", onMove, { passive: true });
  canvas.addEventListener("webglcontextlost", onLost);
  ro.observe(stage);
  resize();
  pS = heroProgress(section, stage).p;
  io.observe(section);

  return () => {
    stopLoop();
    io.disconnect();
    ro.disconnect();
    window.removeEventListener("pointermove", onMove);
    canvas.removeEventListener("webglcontextlost", onLost);
    geo.dispose();
    mat.dispose();
    ringGeo.dispose();
    ringMat.dispose();
    grid.geometry.dispose();
    gridMat.dispose();
    renderer.dispose();
  };
}
