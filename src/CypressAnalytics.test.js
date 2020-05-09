import React from 'react';
import { render } from '@testing-library/react';
import CypressAnalytics from './CypressAnalytics';

test('renders learn react link', () => {
  const { getByText } = render(<CypressAnalytics />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
