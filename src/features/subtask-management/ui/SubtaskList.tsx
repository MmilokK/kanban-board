import { useState } from 'react';

import type {
  CreateSubtaskInput,
  Subtask,
  UpdateSubtaskInput,
} from '../../../entities/task/model/types';

import type { SubtaskId } from '../../../shared/model/entity-ids';

import styles from './SubtaskList.module.scss';

type SubtaskListProps = {
  subtasks: Subtask[];

  onAdd: (input: CreateSubtaskInput) => void;

  onUpdate: (subtaskId: SubtaskId, input: UpdateSubtaskInput) => void;

  onToggle: (subtaskId: SubtaskId) => void;

  onDelete: (subtaskId: SubtaskId) => void;
};

export function SubtaskList({ subtasks, onAdd, onUpdate, onToggle, onDelete }: SubtaskListProps) {
  const [newTitle, setNewTitle] = useState('');

  const [newDescription, setNewDescription] = useState('');

  const [editingSubtaskId, setEditingSubtaskId] = useState<SubtaskId | null>(null);

  const [editingTitle, setEditingTitle] = useState('');

  const [editingDescription, setEditingDescription] = useState('');

  const completedCount = subtasks.filter((subtask) => subtask.isCompleted).length;

  function handleAdd() {
    if (!newTitle.trim()) {
      return;
    }

    onAdd({
      title: newTitle,
      description: newDescription,
    });

    setNewTitle('');
    setNewDescription('');
  }

  function startEditing(subtask: Subtask) {
    setEditingSubtaskId(subtask.id);

    setEditingTitle(subtask.title);

    setEditingDescription(subtask.description);
  }

  function cancelEditing() {
    setEditingSubtaskId(null);

    setEditingTitle('');
    setEditingDescription('');
  }

  function saveEditing(subtaskId: SubtaskId) {
    if (!editingTitle.trim()) {
      return;
    }

    onUpdate(subtaskId, {
      title: editingTitle,

      description: editingDescription,
    });

    cancelEditing();
  }

  return (
    <section className={styles.container} aria-labelledby="subtasks-title">
      <header className={styles.header}>
        <h3 id="subtasks-title">Подзадачи</h3>

        <span>
          {completedCount} из {subtasks.length}
        </span>
      </header>

      {subtasks.length === 0 ? (
        <p className={styles.emptyState}>Подзадач пока нет.</p>
      ) : (
        <ul className={styles.list}>
          {subtasks.map((subtask) => {
            const isEditing = editingSubtaskId === subtask.id;

            return (
              <li key={subtask.id} className={styles.item}>
                {isEditing ? (
                  <div className={styles.editForm}>
                    <label>
                      Название
                      <input
                        type="text"
                        value={editingTitle}
                        onChange={(event) => {
                          setEditingTitle(event.currentTarget.value);
                        }}
                      />
                    </label>

                    <label>
                      Описание
                      <textarea
                        value={editingDescription}
                        onChange={(event) => {
                          setEditingDescription(event.currentTarget.value);
                        }}
                      />
                    </label>

                    <div className={styles.editActions}>
                      <button
                        type="button"
                        disabled={!editingTitle.trim()}
                        onClick={() => {
                          saveEditing(subtask.id);
                        }}
                      >
                        Сохранить
                      </button>

                      <button type="button" onClick={cancelEditing}>
                        Отмена
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className={styles.subtask}>
                      <input
                        id={`subtask-${subtask.id}`}
                        type="checkbox"
                        checked={subtask.isCompleted}
                        onChange={() => {
                          onToggle(subtask.id);
                        }}
                      />

                      <label htmlFor={`subtask-${subtask.id}`} className={styles.subtaskContent}>
                        <span
                          className={subtask.isCompleted ? styles.completedTitle : styles.title}
                        >
                          {subtask.title}
                        </span>

                        {subtask.description && (
                          <span
                            className={
                              subtask.isCompleted ? styles.completedDescription : styles.description
                            }
                          >
                            {subtask.description}
                          </span>
                        )}
                      </label>
                    </div>

                    <div className={styles.actions}>
                      <button
                        type="button"
                        aria-label={`Редактировать подзадачу ${subtask.title}`}
                        onClick={() => {
                          startEditing(subtask);
                        }}
                      >
                        Редактировать
                      </button>

                      <button
                        type="button"
                        aria-label={`Удалить подзадачу ${subtask.title}`}
                        onClick={() => {
                          onDelete(subtask.id);
                        }}
                      >
                        Удалить
                      </button>
                    </div>
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}

      <div className={styles.create}>
        <h4>Новая подзадача</h4>

        <label>
          Название
          <input
            type="text"
            value={newTitle}
            onChange={(event) => {
              setNewTitle(event.currentTarget.value);
            }}
          />
        </label>

        <label>
          Описание
          <textarea
            value={newDescription}
            onChange={(event) => {
              setNewDescription(event.currentTarget.value);
            }}
          />
        </label>

        <button type="button" disabled={!newTitle.trim()} onClick={handleAdd}>
          Добавить подзадачу
        </button>
      </div>
    </section>
  );
}
