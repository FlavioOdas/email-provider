import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import TabItem from './index';

describe('TabItem component', () => {
  const mockHandleTabChange = jest.fn();

  it('should render the title passed as prop', () => {
    const { getByText } = render(
      <TabItem
        title="inbox"
        activeTab="inbox"
        handleTabChange={mockHandleTabChange}
      />
    );
    expect(getByText('inbox')).toBeInTheDocument();
  });

  it("should have 'active' class if activeTab matches the title", () => {
    const { getByTestId } = render(
      <TabItem
        title="inbox"
        activeTab="inbox"
        handleTabChange={mockHandleTabChange}
      />
    );
    expect(getByTestId('inbox')).toHaveClass('active');
  });

  it("should not have 'active' class if activeTab does not match the title", () => {
    const { getByTestId } = render(
      <TabItem
        title="inbox"
        activeTab="sent"
        handleTabChange={mockHandleTabChange}
      />
    );
    expect(getByTestId('inbox')).not.toHaveClass('active');
  });

  it('should call handleTabChange when clicked', () => {
    const { getByTestId } = render(
      <TabItem
        title="inbox"
        activeTab="sent"
        handleTabChange={mockHandleTabChange}
      />
    );
    fireEvent.click(getByTestId('inbox'));
    expect(mockHandleTabChange).toHaveBeenCalledWith('inbox');
  });
});
