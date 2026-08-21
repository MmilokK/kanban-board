import type { CSSProperties } from 'react';
import styles from './SubtaskProgressIndicator.module.scss';

type SubtaskProgressIndicatorProps = {
  completed: number;
  total: number;
  percentage: number;
  isCompleted: boolean;
};

type ProgressStyle = CSSProperties & {
  '--subtask-progress': string;
};

export function SubtaskProgressIndicator({
  completed,
  total,
  percentage,
  isCompleted,
}: SubtaskProgressIndicatorProps) {
  if (total === 0) {
    return null;
  }

  const style: ProgressStyle = {
    '--subtask-progress': `${percentage}%`,
  };

  return (
    <div className={styles.progress} aria-label={`Выполнено подзадач ${completed} из ${total}`}>
      <span className={styles.circle} style={style} aria-hidden="true">
        <span className={styles.circleInner}>{isCompleted ? '✓' : ''}</span>
      </span>

      <span className={styles.text}>
        {completed} из {total} подзадач
      </span>
    </div>
  );
}
