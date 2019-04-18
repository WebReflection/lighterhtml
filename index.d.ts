type TemplateFunction<T> = (template: TemplateStringsArray, ...values: any[]) => T;

interface Tag<T> extends TemplateFunction<any> {
  for: (object: object, id?: string) => Tag<T>;
}

export declare const html: Tag<HTMLElement>;
export declare const svg: Tag<SVGElement>;
export declare function render(node: HTMLElement, renderer: () => any): any;
export declare function hook(hook: Function) : {
  html: Tag<HTMLElement>
  svg: Tag<SVGElement>
};
