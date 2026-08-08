import { z } from 'zod';

import { APP_SCHEMA_VERSION, type AppState } from '../../../entities/board/model/app-state';
import { createExportFilename, downloadJson } from '../lib/download-json';
import { migratePersistedBoardState } from '../../../entities/board/model/board-storage';
import { appStateSchema } from '../../../entities/board/model/board-schema';

export type ImportResult =
  | {
      success: true;
      state: AppState;
    }
  | {
      success: false;
      error: string;
    };

export const EXPORT_FORMAT = 'kanban-board-export' as const;

export const EXPORT_FORMAT_VERSION = 1 as const;

export const exportEnvelopeSchema = z.object({
  format: z.literal(EXPORT_FORMAT),

  version: z.literal(EXPORT_FORMAT_VERSION),

  exportedAt: z.string().datetime(),

  schemaVersion: z.number(),

  data: z.unknown(),
});

export type ExportEnvelope = z.infer<typeof exportEnvelopeSchema>;

export type CurrentExportEnvelope = {
  format: typeof EXPORT_FORMAT;
  version: typeof EXPORT_FORMAT_VERSION;
  exportedAt: string;
  schemaVersion: typeof APP_SCHEMA_VERSION;
  data: AppState;
};

export function createExportData(state: AppState, exportedAt = new Date()): CurrentExportEnvelope {
  return {
    format: EXPORT_FORMAT,

    version: EXPORT_FORMAT_VERSION,

    exportedAt: exportedAt.toISOString(),

    schemaVersion: APP_SCHEMA_VERSION,

    data: state,
  };
}

export function serializeExportData(exportData: CurrentExportEnvelope): string {
  return JSON.stringify(exportData, null, 2);
}

export function exportAppData(state: AppState): void {
  const now = new Date();

  const exportData = createExportData(state, now);

  const json = serializeExportData(exportData);

  const filename = createExportFilename(now);

  downloadJson(json, filename);
}

export function parseImportData(source: string): ImportResult {
  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(source);
  } catch {
    return {
      success: false,
      error: 'Файл содержит некорректный JSON.',
    };
  }

  const envelopeResult = exportEnvelopeSchema.safeParse(parsedJson);

  if (!envelopeResult.success) {
    return {
      success: false,
      error: 'Файл не является экспортом Kanban Board.',
    };
  }

  const envelope = envelopeResult.data;

  let migratedState: unknown;

  try {
    migratedState = migratePersistedBoardState(envelope.data, envelope.schemaVersion);
  } catch {
    return {
      success: false,
      error: 'Не удалось обновить данные из старой версии.',
    };
  }

  const stateResult = appStateSchema.safeParse(migratedState);

  if (!stateResult.success) {
    return {
      success: false,
      error: 'Структура данных в файле повреждена или не поддерживается.',
    };
  }

  return {
    success: true,
    state: stateResult.data,
  };
}
