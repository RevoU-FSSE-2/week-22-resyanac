// import { render, screen } from '@testing-library/react'
// import Profile from '.'
// import { BrowserRouter as Router } from 'react-router-dom';

// global.fetch = jest.fn().mockResolvedValue({
//     json: async () => ({ token: 'mockedToken' })
// })

// describe('Profile Test', () => {
// Object.defineProperty(window, 'matchMedia', {
//             writable: true,
//             value: jest.fn().mockImplementation(query => ({
//                 matches: false,
//                 media: query,
//                 onchange: null,
//                 addListener: jest.fn(),
//                 removeListener: jest.fn(),
//                 addEventListener: jest.fn(),
//                 removeEventListener: jest.fn(),
//                 dispatchEvent: jest.fn(),
//             })),
//         });
//     test('title profile render correctly', async () => {
//         render(
//             <Router> 
//                 <Profile />
//             </Router>
//         );
//         const title = screen.getByText('User Profile')
//         expect(title).toBeDefined();
//     })
//     test('back button render correctly', async () => {
//         render(
//             <Router> 
//                 <Profile/>
//             </Router>
//         );
//         const backButton = screen.getByText('Back')
//         expect(backButton).toBeDefined();
//     })
//     test('User ID head render correctly', async () => {
//         render(
//             <Router> 
//                 <Profile />
//             </Router>
//         );
//         const user = screen.queryByText('User ID:')
//         expect(user).toBeDefined();
//     })
//     test('Login as head render correctly', async () => {
//         render(
//             <Router> 
//                 <Profile />
//             </Router>
//         );
//         const loginAs = screen.queryByText('Login as:')
//         expect(loginAs).toBeDefined();
//     })
//     test('Email head render correctly', async () => {
//         render(
//             <Router> 
//                 <Profile />
//             </Router>
//         );
//         const email = screen.queryByText('Email:')
//         expect(email).toBeDefined();
//     })
// })