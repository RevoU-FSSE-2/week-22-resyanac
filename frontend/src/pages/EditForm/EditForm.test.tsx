import { render, screen } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom';
import EditForm from '.';


describe('Edit Form Test', () => {
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
    test('title render correctly', async () => {
        render(
            <Router> 
                <EditForm />
            </Router>
        );
        const title = screen.getByText('Edit Category')
        expect(title).toBeDefined();
    })
    test('field item name render correctly', async () => {
        render(
            <Router> 
                <EditForm />
            </Router>
        );
        const name = screen.getByPlaceholderText('name')
        expect(name).toBeDefined();
    })
    test('field item status render correctly', async () => {
        render(
            <Router> 
                <EditForm />
            </Router>
        );
        const status = screen.getByText('Select a status option')
        expect(status).toBeDefined();
    })
    test('submit button render correctly', async () => {
        render(
            <Router> 
                <EditForm />
            </Router>
        );
        const submitButton = screen.getByText('Submit')
        expect(submitButton).toBeDefined();
    })
    test('back button render correctly', async () => {
        render(
            <Router> 
                <EditForm/>
            </Router>
        );
        const backButton = screen.getByText('Back')
        expect(backButton).toBeDefined();
    })
})