const isJson = (item: DataTransferItem): boolean => 
  item.kind === 'file' &&
  item.type === 'application/json'
;

const hasJson = (event: DataTransfer | null): boolean => {
  if (!event) return false;
  return Array.from(event.items).some(isJson);
};

export default (fn: (raw: string) => void) => {
  const reader = new FileReader();

  reader.addEventListener('error', console.error);
  reader.addEventListener('load', () => fn(reader.result as string));

  document.body.addEventListener('dragover', event => {
    event.preventDefault();

    if (event.dataTransfer) {
      event.dataTransfer.dropEffect = hasJson(event.dataTransfer) ?
        'link' :
        'none';
    }
  });

  document.body.addEventListener('drop', event => {
    event.preventDefault();

    if (event.dataTransfer && hasJson(event.dataTransfer)) {
      const json = Array.from(event.dataTransfer.items).find(isJson);
      const file = json?.getAsFile();

      if (file) reader.readAsText(file);
    }
  });
};
