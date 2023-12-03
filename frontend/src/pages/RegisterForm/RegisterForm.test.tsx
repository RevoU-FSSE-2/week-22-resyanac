import { render, screen } from '@testing-library/react'
import RegisterForm from '.'
import { BrowserRouter as Router } from 'react-router-dom';


describe('Register Form Test', () => {
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
    test('field Register form render correctly', async () => {
        render(
            <Router> 
                <RegisterForm />
            </Router>
        );
        const title = screen.getByText('Register Form')
        expect(title).toBeDefined();
    })
    test('field name render correctly', async () => {
        render(
            <Router> 
                <RegisterForm />
            </Router>
        );
        const name = screen.getByPlaceholderText('name')
        expect(name).toBeDefined();
    })
    test('field email render correctly', async () => {
        render(
            <Router> 
                <RegisterForm />
            </Router>
        );
        const email = screen.getByPlaceholderText('email')
        expect(email).toBeDefined();
    })
    test('field password render correctly', async () => {
        render(
            <Router> 
                <RegisterForm />
            </Router>
        );
        const password = screen.getByPlaceholderText('password')
        expect(password).toBeDefined();
    })
    test('Register button render correctly', async () => {
        render(
            <Router> 
                <RegisterForm />
            </Router>
        );
        const registerButton = screen.getByText('Register')
        expect(registerButton).toBeDefined();
    })
    test('Register - Login button render correctly', async () => {
        render(
            <Router> 
                <RegisterForm />
            </Router>
        );
        const loginButton = screen.getByText('Login')
        expect(loginButton).toBeDefined();
    })
})