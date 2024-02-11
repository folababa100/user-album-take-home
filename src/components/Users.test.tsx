import { render, screen, waitFor } from '@testing-library/react';
import { afterEach, describe, expect, it, Mocked, vi } from 'vitest';
import axios from 'axios';
import Users from './Users';

vi.mock('axios');
const mockedAxios = axios as Mocked<typeof axios>;

describe('Users Component', () => {
  it('fetches and displays users', async () => {
    mockedAxios.get.mockResolvedValue({
      data: [
        {
          id: 1,
          name: 'John Doe',
          address: {
            street: '123 Main St',
            suite: 'Apt. 1',
            city: 'Anytown',
            zipcode: '12345',
          },
        },
      ],
    });

    render(<Users />);

    await waitFor(() => {
      expect(
        screen.getByText('John Doe - 123 Main St, Apt. 1, Anytown, 12345'),
      ).toBeInTheDocument();
    });
  });
});

afterEach(() => {
  vi.clearAllMocks();
});
