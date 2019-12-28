export type TemplateFunction<T> = (
  template: TemplateStringsArray,
  ...values: any[]
) => T;

export interface Tag<T> extends TemplateFunction<Hole> {
  for(object: object, id?: string): TemplateFunction<T>;
  node: TemplateFunction<T>;
}

export declare const html: Tag<HTMLElement>;
export declare const svg: Tag<SVGElement>;
export type Renderable = Hole | HTMLElement | SVGElement;
export declare function render<T extends Node>(
  node: T,
  renderer: (() => Renderable) | Renderable,
): T;
export declare function custom(
  // TODO: This should be defined in `domtagger`
  overrides: {
    /**
     * Used to provide a custom algorithm for converting a lighterhtml template
     * to a valid HTML text.
     *
     * @param stringify The default HTML template tag to valid HTML text conversion implementation.
     */
    convert?(
      stringify: (template: TemplateStringsArray) => string,
    ): (template: TemplateStringsArray) => string;

    /**
     * Used to postprocess the result of `convert`.
     *
     * @param transform The default transformation.
     */
    transform?(
      transform: (markup: string) => string,
    ): (markup: string) => string;
  } & {
    [override: string]: (
      defaultConversion: (...args: any) => (value: any) => void,
    ) => (...args: any) => (value: any) => void;
  },
): {
  html: Tag<HTMLElement>;
  svg: Tag<SVGElement>;
  render<T extends Node>(node: T, renderer: (() => Hole) | Hole): T;
};

/**
 * Used for internal purposes, should be created using
 * the `html` or `svg` template tags.
 */
export class Hole {
  constructor(type: string, args: readonly [TemplateStringsArray, ...any[]]);

  readonly type: string;
  readonly args: readonly [TemplateStringsArray, ...any[]];
}
