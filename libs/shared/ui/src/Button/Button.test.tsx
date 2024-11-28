import { render } from '@testing-library/react';
import { Button } from './Button';

describe('Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Button />);
    expect(baseElement).toBeTruthy();
  });

  it('should apply the provided className', () => {
    const { container } = render(<Button className="custom-class" />);
    const button = container.querySelector('button');
    expect(button).toHaveClass('custom-class');
  });

  // Add more tests as needed...
});
