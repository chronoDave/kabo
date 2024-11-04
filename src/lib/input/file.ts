export type FileOptions = {
  accept?: string;
  multiple?: boolean;
};

export default async (options?: FileOptions) => new Promise<FileList | null>(resolve => {
  const el = document.createElement('input');
  el.type = 'file';
  if (typeof options?.accept === 'string') el.accept = options.accept;
  if (options?.multiple) el.multiple = true;
  el.addEventListener('change', () => resolve(el.files), false);
  el.click();
});
