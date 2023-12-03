import { render, screen } from '@testing-library/react'
import LoginForm from '.'
import { BrowserRouter as Router } from 'react-router-dom'
// import '../../../src/matchMedia.mock';



describe('Login Form Test', () => {
beforeAll(() => {
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
    });
    test('field login form render correctly', async () => {
        render(
            <Router> 
                <LoginForm />
            </Router>
        );
        const title = screen.getByText('Login Form')
        expect(title).toBeDefined();
    })
    test('field email input correctly', async () => {
        render(
            <Router> 
                <LoginForm />
            </Router>
        );
        const email = screen.getByPlaceholderText('email')
        expect(email).toBeDefined();
    })
    test('field password input correctly', async () => {
        render(
            <Router> 
                <LoginForm />
            </Router>
        );
        const password = screen.getByPlaceholderText('password')
        expect(password).toBeDefined();
    })
    test('login button render correctly', async () => {
        render(
            <Router> 
                <LoginForm />
            </Router>
        );
        const loginButton = screen.getByText('LOGIN')
        expect(loginButton).toBeDefined();
    })
    test('Register button render correctly', async () => {
        render(
            <Router> 
                <LoginForm />
            </Router>
        );
        const registerButton = screen.getByText('Register here')
        expect(registerButton).toBeDefined();
    })
})