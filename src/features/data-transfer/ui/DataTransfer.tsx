import { useRef, useState } from 'react';
import type { AppState } from '../../../entities/board/model/app-state';
import styles from './DataTransfer.module.scss';
import { readTextFile } from '../lib/download-json';
import { parseImportData } from '../model/export-format';

type DataTransferProps = {
  onExport: () => void;

  onImport: (state: AppState) => void;
};

type ImportStatus =
  | {
      type: 'success';
      message: string;
    }
  | {
      type: 'error';
      message: string;
    }
  | null;

export function DataTransfer({ onExport, onImport }: DataTransferProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const [importStatus, setImportStatus] = useState<ImportStatus>(null);

  async function handleFile(file: File) {
    const source = await readTextFile(file);

    const result = parseImportData(source);

    if (!result.success) {
      setImportStatus({
        type: 'error',
        message: result.error,
      });

      return;
    }

    const confirmed = window.confirm('Импорт заменит текущие доски, колонки и задачи. Продолжить?');

    if (!confirmed) {
      return;
    }

    onImport(result.state);

    setImportStatus({
      type: 'success',
      message: 'Данные успешно импортированы.',
    });

    if (inputRef.current) {
      inputRef.current.value = '';
    }
  }

  return (
    <section className={styles.container} aria-labelledby="data-transfer-title">
      <div className={styles.heading}>
        <div>
          <h2 id="data-transfer-title">Данные</h2>

          <p>Сохрани резервную копию или восстанови данные из JSON-файла.</p>
        </div>

        <div className={styles.actions}>
          <button type="button" onClick={onExport}>
            Экспорт JSON
          </button>

          <button
            type="button"
            onClick={() => {
              inputRef.current?.click();
            }}
          >
            Импорт JSON
          </button>

          <input
            ref={inputRef}
            className={styles.fileInput}
            type="file"
            accept=".json,application/json"
            aria-label="Выбрать JSON-файл для импорта"
            onChange={(event) => {
              const file = event.currentTarget.files?.[0];

              if (!file) {
                return;
              }

              handleFile(file);
            }}
          />
        </div>
      </div>

      {importStatus && (
        <p
          className={importStatus.type === 'error' ? styles.error : styles.success}
          role={importStatus.type === 'error' ? 'alert' : 'status'}
        >
          {importStatus.message}
        </p>
      )}
    </section>
  );
}
