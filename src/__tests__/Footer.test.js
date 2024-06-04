import { render, screen } from '@testing-library/react';
import Footer from '../components/Footer.js';

describe('Footer', () => {
    it('Displays credits and owner text', () => {
        render(<Footer />);
        expect(screen.getByText(/Artwork by/)).toBeInTheDocument();
        expect(screen.getByText(/Akhil/)).toBeInTheDocument();
    });
});