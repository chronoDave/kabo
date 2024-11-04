import file from './file';

export type ImageOptions = {
  fileTypes: string[];
  multiple?: boolean;
};

export default async (options?: ImageOptions) => {
  const files = await file({
    accept: options?.fileTypes
      .map(x => `image/${x}`)
      .join(', ') ?? 'image/*',
    multiple: options?.multiple
  });

  return new Promise<string | null>(resolve => {
    if (!files) {
      resolve(null);
    } else {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        resolve(reader.result as string | null);
      }, false);
  
      reader.readAsDataURL(files[0]);
    }
  });
};
