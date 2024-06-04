import { render, screen, fireEvent, waitFor, getAllByRole } from '@testing-library/react';
import Header from '../components/Header';
import { BrowserRouter } from 'react-router-dom';

describe('Header', () => {
    it('Displays links', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );
        expect(screen.getAllByRole('link')).toHaveLength(3);
    });

    it('Post Nav Click checks classname', () => {
        render(
            <BrowserRouter>
                <Header />
            </BrowserRouter>
        );

        const links = screen.getAllByRole('link');

        expect(links[2].classList.contains('active')).toBe(false);
        fireEvent.click(links[2]);
        expect(links[2].classList.contains('active')).toBe(true);
    });
});