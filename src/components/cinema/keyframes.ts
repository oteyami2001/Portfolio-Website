/**
 * Framer Motion may hardware-accelerate scroll-linked transforms with WAAPI
 * ScrollTimelines. Keyframe offsets must then span exactly [0, 1]; otherwise the
 * browser fills implicit keyframes with the element's base value (e.g. opacity 1),
 * making faded-out content reappear. This pads input/output ranges to 0 and 1.
 */
export function span<T>(input: number[], output: T[]): [number[], T[]] {
  const i = [...input];
  const o = [...output];
  if (i[0] > 0) { i.unshift(0); o.unshift(o[0]); }
  if (i[i.length - 1] < 1) { i.push(1); o.push(o[o.length - 1]); }
  for (let k = 1; k < i.length; k++) if (i[k] < i[k - 1]) i[k] = i[k - 1];
  return [i, o];
}
