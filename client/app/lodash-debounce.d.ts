declare module "lodash.debounce" {
  type Func = (...args: any[]) => any;
  function debounce(func: Func, wait?: number, options?: any): Func & {
    cancel(): void;
    flush(): void;
  };
  export default debounce;
}
