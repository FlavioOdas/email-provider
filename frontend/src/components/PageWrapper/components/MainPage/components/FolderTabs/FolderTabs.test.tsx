import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import FolderTabs from './index';

test('renders FolderTabs component with correct props', () => {
  const activeTab = 'inbox';
  const setComposeEmail = jest.fn();
  const setActiveTab = jest.fn();
  const { getByText } = render(
    <FolderTabs
      activeTab={activeTab}
      setComposeEmail={setComposeEmail}
      setActiveTab={setActiveTab}
    />
  );

  const composeButton = getByText('Compose');
  const inboxTab = getByText('inbox');
  const sentTab = getByText('sent');
  const trashTab = getByText('trash');

  expect(composeButton).toBeInTheDocument();
  expect(inboxTab).toBeInTheDocument();
  expect(sentTab).toBeInTheDocument();
  expect(trashTab).toBeInTheDocument();

  fireEvent.click(composeButton);
  expect(setComposeEmail).toHaveBeenCalledTimes(1);
  expect(setComposeEmail).toHaveBeenCalledWith(true);

  fireEvent.click(inboxTab);
  expect(setActiveTab).toHaveBeenCalledTimes(1);
  expect(setActiveTab).toHaveBeenCalledWith('inbox');

  fireEvent.click(sentTab);
  expect(setActiveTab).toHaveBeenCalledTimes(2);
  expect(setActiveTab).toHaveBeenCalledWith('sent');

  fireEvent.click(trashTab);
  expect(setActiveTab).toHaveBeenCalledTimes(3);
  expect(setActiveTab).toHaveBeenCalledWith('trash');
});
