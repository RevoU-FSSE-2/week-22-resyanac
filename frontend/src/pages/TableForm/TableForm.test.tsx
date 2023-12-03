import { render, screen } from '@testing-library/react'
import TableForm from '.'
import { BrowserRouter as Router } from 'react-router-dom';

// Configure jest-fetch-mock
global.fetch = jest.fn().mockResolvedValue({
    json: async () => ({ token: 'mockedToken' })
})

describe('Table Form Test', () => {
Object.defineProperty(window, 'matchMedia', {
            writable: true,
            value: jest.fn().mockImplementation(query => ({
                matches: false,
                media: query,
                onchange: null,
                addListener: jest.fn(),
                removeListener: jest.fn(),
                addEventListener: jest.fn(),
                removeEventListener: jest.fn(),
                dispatchEvent: jest.fn(),
            })),
        });
    test('field Table form render correctly', async () => {
        render(
            <Router> 
                <TableForm />
            </Router>
        );
        const title = screen.getByText('Category Table')
        expect(title).toBeDefined();
    })
    test('Table-add category button render correctly', async () => {
        render(
            <Router> 
                <TableForm />
            </Router>
        );
        const addButton = screen.getByText('Add New Category')
        expect(addButton).toBeDefined();
    })
    test('Table-logout button render correctly', async () => {
        render(
            <Router> 
                <TableForm />
            </Router>
        );
        const logoutButton = screen.getByText('Logout')
        expect(logoutButton).toBeDefined();
    })
    test('Table-Action render correctly', async () => {
        render(
            <Router> 
                <TableForm />
            </Router>
        );
        const actionButton = screen.getByText('Action')
        expect(actionButton).toBeDefined();
    })
    test('Table-Id render correctly', async () => {
        render(
            <Router> 
                <TableForm />
            </Router>
        );
        const idButton = screen.getByText('Id')
        expect(idButton).toBeDefined();
    })
    test('Table-Name render correctly', async () => {
        render(
            <Router> 
                <TableForm />
            </Router>
        );
        const nameButton = screen.getByText('Name')
        expect(nameButton).toBeDefined();
    })
    test('Table-Status render correctly', async () => {
        render(
            <Router> 
                <TableForm />
            </Router>
        );
        const statusButton = screen.getByText('Status')
        expect(statusButton).toBeDefined();
    })
    test('Table-Profile button render correctly', async () => {
        render(
            <Router> 
                <TableForm />
            </Router>
        );
        const profileButton = screen.getByText('Profile')
        expect(profileButton).toBeDefined();
    })

})