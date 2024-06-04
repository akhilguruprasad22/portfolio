import { render, screen } from '@testing-library/react';
import LandingSection from '../components/LandingSection.js';

describe('Landing Section', () => {
    it('Displays right text and socials', () => {
        render(<LandingSection />);
        expect(screen.getByText(/Akhil/)).toBeInTheDocument();
        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByText(/Software Developer/)).toBeInTheDocument();

        expect(screen.getAllByRole('link')).toHaveLength(4);
    });
});
