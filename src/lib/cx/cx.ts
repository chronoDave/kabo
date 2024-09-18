export type ClassName = string | null | false;

export default (...classNames: ClassName[]): string => classNames
  .filter(x => typeof x === 'string')
  .join(' ');
