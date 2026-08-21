import { describe, expect, it } from 'vitest';
import { APP_SCHEMA_VERSION } from '../../../entities/board/model/app-state';
import { createDemoAppState } from '../../../entities/board/model/demo-board';
import {
  createExportData,
  EXPORT_FORMAT,
  EXPORT_FORMAT_VERSION,
  parseImportData,
  serializeExportData,
} from './export-format';

describe('Создание данных для экспорта', () => {
  it('создаёт экспорт текущего состояния', () => {
    const state = createDemoAppState();

    const exportedAt = new Date('2026-08-08T10:00:00.000Z');

    const result = createExportData(state, exportedAt);

    expect(result).toEqual({
      format: EXPORT_FORMAT,

      version: EXPORT_FORMAT_VERSION,

      exportedAt: '2026-08-08T10:00:00.000Z',

      schemaVersion: APP_SCHEMA_VERSION,

      data: state,
    });
  });
});

describe('Сериализация экспорта', () => {
  it('создаёт валидный JSON', () => {
    const exportData = createExportData(createDemoAppState(), new Date('2026-08-08T10:00:00.000Z'));

    const json = serializeExportData(exportData);

    expect(() => JSON.parse(json)).not.toThrow();

    expect(JSON.parse(json)).toEqual(exportData);
  });

  it('форматирует JSON для чтения человеком', () => {
    const json = serializeExportData(createExportData(createDemoAppState()));

    expect(json).toContain('\n  "format"');
  });
});

describe('Импорт данных', () => {
  it('импортирует корректный export', () => {
    const state = createDemoAppState();

    const source = JSON.stringify(createExportData(state, new Date('2026-08-08T10:00:00.000Z')));

    const result = parseImportData(source);

    expect(result).toEqual({
      success: true,
      state,
    });
  });

  it('отклоняет некорректный JSON', () => {
    const result = parseImportData('{ broken json');

    expect(result).toEqual({
      success: false,
      error: 'Файл содержит некорректный JSON.',
    });
  });

  it('отклоняет посторонний JSON-файл', () => {
    const result = parseImportData(
      JSON.stringify({
        hello: 'world',
      }),
    );

    expect(result).toEqual({
      success: false,
      error: 'Файл не является экспортом Kanban Board.',
    });
  });

  it('отклоняет повреждённое состояние приложения', () => {
    const exportData = createExportData(createDemoAppState());

    const corruptedData = {
      ...exportData,

      data: {
        ...exportData.data,
        boards: null,
      },
    };

    const result = parseImportData(JSON.stringify(corruptedData));

    expect(result.success).toBe(false);
  });
});
