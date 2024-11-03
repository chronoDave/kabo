import clamp from '../math/clamp';

export type RGB = {
  r: number;
  g: number;
  b: number;
};

export default class Colour {
  private readonly _r: number;
  private readonly _g: number;
  private readonly _b: number;

  static fromHex(hex: string): Colour {
    const expanded = hex.replace(
      /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
      (_, r, g, b) => [r, r, g, g, b, b].join('')
    );

    const c = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(expanded);

    if (!c) throw new Error(`Invalid hex colour: ${hex}`);
    return new Colour({
      r: parseInt(c[1], 16),
      g: parseInt(c[2], 16),
      b: parseInt(c[3], 16)
    });
  }

  /**
   * Relative luminance
   * @see https://en.wikipedia.org/wiki/Relative_luminance
   * */
  get luminance(): number {
    const c = [this._r, this._g, this._b].map(x => {
      const v = x / 255;

      if (v <= 0.03928) return v / 12.92;
      return Math.pow((v + 0.055) / 1.055, 2.4);
    });

    return c[0] * 0.2126 + c[1] * 0.7152 + c[2] * 0.0722;
  }

  get hex(): string {
    const raw = [this._r, this._g, this._b]
      .map(x => x.toString(16).padStart(2, '0'));

    return `#${raw.join('')}`;
  }

  constructor(rgb: RGB) {
    this._r = clamp(0, 255, rgb.r);
    this._g = clamp(0, 255, rgb.g);
    this._b = clamp(0, 255, rgb.b);
  }

  contrast(colour: Colour): number {
    const a = colour.luminance;
    const b = this.luminance;

    return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
  }
}