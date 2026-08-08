export function downloadJson(json: string, filename: string): void {
  const blob = new Blob([json], {
    type: 'application/json',
  });

  const url = URL.createObjectURL(blob);

  const anchor = document.createElement('a');

  anchor.href = url;
  anchor.download = filename;

  document.body.append(anchor);

  anchor.click();

  anchor.remove();

  URL.revokeObjectURL(url);
}

export function createExportFilename(date = new Date()): string {
  const year = date.getFullYear();

  const month = String(date.getMonth() + 1).padStart(2, '0');

  const day = String(date.getDate()).padStart(2, '0');

  const hours = String(date.getHours()).padStart(2, '0');

  const minutes = String(date.getMinutes()).padStart(2, '0');

  return ['kanban-board', year, month, day, `${hours}${minutes}`].join('-') + '.json';
}

export function readTextFile(file: File): Promise<string> {
  return file.text();
}
