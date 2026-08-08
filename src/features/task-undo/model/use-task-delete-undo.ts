import { useCallback, useEffect, useRef, useState } from 'react';

import type { DeletedTaskSnapshot } from '../../../entities/task/model/deleted-task-snapshot';

const UNDO_TIMEOUT_MS = 5000;

type UseTaskDeleteUndoParams = {
  onRestore: (snapshot: DeletedTaskSnapshot) => void;
};

export function useTaskDeleteUndo({ onRestore }: UseTaskDeleteUndoParams) {
  const [deletedTask, setDeletedTask] = useState<DeletedTaskSnapshot | null>(null);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = useCallback(() => {
    if (timeoutRef.current === null) {
      return;
    }

    clearTimeout(timeoutRef.current);

    timeoutRef.current = null;
  }, []);

  const dismiss = useCallback(() => {
    clearTimer();
    setDeletedTask(null);
  }, [clearTimer]);

  const registerDeletion = useCallback(
    (snapshot: DeletedTaskSnapshot) => {
      clearTimer();

      setDeletedTask(snapshot);

      timeoutRef.current = setTimeout(() => {
        setDeletedTask(null);
        timeoutRef.current = null;
      }, UNDO_TIMEOUT_MS);
    },
    [clearTimer],
  );

  const undo = useCallback(() => {
    if (!deletedTask) {
      return;
    }

    clearTimer();

    onRestore(deletedTask);

    setDeletedTask(null);
  }, [clearTimer, deletedTask, onRestore]);

  useEffect(() => {
    return () => {
      clearTimer();
    };
  }, [clearTimer]);

  return {
    deletedTask,
    registerDeletion,
    undo,
    dismiss,
  };
}
