export type ClassName = string | null | false | undefined;

export default (...classNames: ClassName[]): string => classNames
  .filter(x => typeof x === 'string')
  .join(' ');
