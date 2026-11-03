// Scroll progress through the homepage 3D section: 0 when its top reaches the top of the
// viewport, 1 when the last chapter is in place. Shared by the chapter tracker and the scene.
export function heroProgress(section: HTMLElement, stage: HTMLElement): { p: number; inView: boolean } {
  const r = section.getBoundingClientRect();
  const h = stage.offsetHeight || window.innerHeight;
  const span = r.height - h;
  const p = span > 0 ? Math.min(1, Math.max(0, -r.top / span)) : 0;
  return { p, inView: r.bottom > -40 && r.top < window.innerHeight + 40 };
}

export const HERO_CHAPTERS = 5;
