import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { SubtaskProgressIndicator } from './SubtaskProgressIndicator';

describe('Индикатор прогресса подзадач', () => {
  it('показывает количество выполненных подзадач', () => {
    render(
      <SubtaskProgressIndicator completed={2} total={4} percentage={50} isCompleted={false} />,
    );

    expect(screen.getByText('2 из 4 подзадач')).toBeInTheDocument();

    expect(screen.getByLabelText('Выполнено подзадач 2 из 4')).toBeInTheDocument();
  });

  it('показывает отметку когда выполнены все подзадачи', () => {
    render(<SubtaskProgressIndicator completed={4} total={4} percentage={100} isCompleted />);

    expect(screen.getByText('✓')).toBeInTheDocument();
  });

  it('ничего не показывает без подзадач', () => {
    const { container } = render(
      <SubtaskProgressIndicator completed={0} total={0} percentage={0} isCompleted={false} />,
    );

    expect(container).toBeEmptyDOMElement();
  });
});
