import { useState } from 'react';
import type {
  CreateTaskCommentInput,
  TaskComment,
  UpdateTaskCommentInput,
} from '../../../entities/task/model/types';
import type { CommentId } from '../../../shared/model/entity-ids';
import styles from './TaskComments.module.scss';

type TaskCommentsProps = {
  comments: TaskComment[];
  canEdit?: boolean;
  onAdd: (input: CreateTaskCommentInput) => void;
  onUpdate: (commentId: CommentId, input: UpdateTaskCommentInput) => void;
  onDelete: (commentId: CommentId) => void;
};

function formatCommentDate(value: string): string {
  return new Intl.DateTimeFormat('ru-RU', {
    dateStyle: 'medium',
    timeStyle: 'short',
  }).format(new Date(value));
}

export function TaskComments({
  comments,
  canEdit = true,
  onAdd,
  onUpdate,
  onDelete,
}: TaskCommentsProps) {
  const [newCommentText, setNewCommentText] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<CommentId | null>(null);
  const [editingText, setEditingText] = useState('');

  function handleAdd() {
    if (!canEdit || !newCommentText.trim()) return;

    onAdd({
      text: newCommentText,
    });

    setNewCommentText('');
  }

  function startEditing(comment: TaskComment) {
    if (!canEdit) return;

    setEditingCommentId(comment.id);
    setEditingText(comment.text);
  }

  function cancelEditing() {
    setEditingCommentId(null);
    setEditingText('');
  }

  function saveEditing(commentId: CommentId) {
    if (!canEdit || !editingText.trim()) return;

    onUpdate(commentId, {
      text: editingText,
    });

    cancelEditing();
  }

  return (
    <section className={styles.container} aria-labelledby="task-comments-title">
      <header className={styles.header}>
        <h3 id="task-comments-title">Комментарии</h3>

        <span>{comments.length}</span>
      </header>

      {comments.length === 0 ? (
        <p className={styles.emptyState}>Комментариев пока нет.</p>
      ) : (
        <ul className={styles.list}>
          {comments.map((comment) => {
            const isEditing = canEdit && editingCommentId === comment.id;

            return (
              <li key={comment.id} className={styles.comment}>
                {isEditing ? (
                  <div className={styles.editForm}>
                    <label>
                      Комментарий
                      <textarea
                        value={editingText}
                        onChange={(event) => {
                          setEditingText(event.currentTarget.value);
                        }}
                      />
                    </label>

                    <div className={styles.editActions}>
                      <button
                        type="button"
                        disabled={!editingText.trim()}
                        onClick={() => {
                          saveEditing(comment.id);
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
                    <p className={styles.text}>{comment.text}</p>

                    <div className={styles.meta}>
                      <time dateTime={comment.createdAt}>
                        {formatCommentDate(comment.createdAt)}
                      </time>

                      {comment.updatedAt !== comment.createdAt && <span>изменён</span>}
                    </div>

                    {canEdit && (
                      <div className={styles.actions}>
                        <button
                          type="button"
                          aria-label={`Изменить комментарий ${comment.text}`}
                          onClick={() => {
                            startEditing(comment);
                          }}
                        >
                          Изменить
                        </button>

                        <button
                          type="button"
                          aria-label={`Удалить комментарий ${comment.text}`}
                          onClick={() => {
                            onDelete(comment.id);
                          }}
                        >
                          Удалить
                        </button>
                      </div>
                    )}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      )}

      {canEdit && (
        <div className={styles.create}>
          <label htmlFor="new-task-comment">Новый комментарий</label>

          <textarea
            id="new-task-comment"
            value={newCommentText}
            onChange={(event) => {
              setNewCommentText(event.currentTarget.value);
            }}
            placeholder="Напиши комментарий..."
          />

          <button type="button" disabled={!newCommentText.trim()} onClick={handleAdd}>
            Добавить комментарий
          </button>
        </div>
      )}
    </section>
  );
}
