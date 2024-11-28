import { render, screen } from '@testing-library/react';
import { expect, test } from 'vitest';
import Page from '../src/app/(admin)/page';

test('Page', () => {
  render(<Page />);
  expect(screen.getByText('ADMIN DASHBOARD')).toBeDefined();
});
