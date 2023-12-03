import { render, screen } from '@testing-library/react'
import AddForm from '.'
import { BrowserRouter as Router } from 'react-router-dom';


describe('Add Form Test', () => {
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
                <AddForm />
            </Router>
        );
        const title = screen.getByText('Add New Category')
        expect(title).toBeDefined();
    })
    test('field item name render correctly', async () => {
        render(
            <Router> 
                <AddForm />
            </Router>
        );
        const name = screen.getByPlaceholderText('Name')
        expect(name).toBeDefined();
    })
        test('field item status render correctly', async () => {
        render(
            <Router> 
                <AddForm />
            </Router>
        );
        const status = screen.getByText('Select Option')
        expect(status).toBeDefined();
    })
     test('submit button render correctly', async () => {
        render(
            <Router> 
                <AddForm />
            </Router>
        );
        const submitButton = screen.getByText('SUBMIT')
        expect(submitButton).toBeDefined();
    })
    test('back button render correctly', async () => {
        render(
            <Router> 
                <AddForm />
            </Router>
        );
        const backButton = screen.getByText('BACK')
        expect(backButton).toBeDefined();
    })
})