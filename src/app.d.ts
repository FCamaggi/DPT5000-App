// See https://kit.svelte.dev/docs/types#app
declare global {
  namespace App {
    interface Error {}
    interface Locals {}
    interface PageData {}
    interface PageState {}
    interface Platform {}
  }
}

export {};

declare module '*.pdf' {
  const content: string;
  export default content;
}

declare module '@tailwindcss/typography' {
  const plugin: any;
  export default plugin;
}

declare module 'motion' {
  export function animate(
    element: string | Element,
    keyframes: Record<string, any>,
    options?: Record<string, any>
  ): void;
}
