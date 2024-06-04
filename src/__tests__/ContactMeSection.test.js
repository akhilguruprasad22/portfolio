import { jest } from '@jest/globals';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ContactMeSection from '../components/ContactMeSection.js';
import { AlertProvider } from '../context/alertContext.js';

describe('Contact Form', () => {

    it('Checks form submission post entering valid values', async () => {
        const onSubmit = jest.fn();
        const user = userEvent.setup();
        
        render(
        <AlertProvider>
            <ContactMeSection onSubmit={onSubmit}/>
        </AlertProvider>
        );

        screen.onsubmit = onSubmit;

        user.type(getName(), 'Tester');
        await waitFor(() => {
            expect(getName().value).toBe('Tester');
        });

        user.type(getEmail(), 'tester@email.com');
        await waitFor(() => {
            expect(getEmail().value).toBe('tester@email.com');
        });

        user.selectOptions(getType(), 'feedback');
        await waitFor(() => {
            expect(getType().value).toBe('feedback');
        });

        user.type(getComment(), '1234567890987654321012345');
        await waitFor(() => {
            expect(getComment().value).toBe('1234567890987654321012345');
        });

        user.click(screen.getByText(/Submit/));
        

        await waitFor(() => {
            expect(onSubmit).toHaveBeenCalledTimes(1);
        });
        
        expect(onSubmit).toHaveBeenCalledWith({
            firstName: "Tester",
            comment: "1234567890987654321012345",
            email: "tester@email.com",
            type: "feedback"
        });
        
    });

    it('Checks display of error messages upon validation', async () => {
        const onSubmit = jest.fn();
        const user = userEvent.setup();

        const {container} = render(
            <AlertProvider>
                <ContactMeSection onSubmit={onSubmit}/>
            </AlertProvider>
            );
        
        user.type(getName(), 'Test1');
        user.type(getComment(), '12345678909876543210');
        user.click(screen.getByText(/Submit/));
        
        await waitFor(() => {
            expect(container.querySelectorAll('.chakra-form__error-message').length).toBe(3);
        });
    });
});

function getName() { 
    return screen.getByLabelText(/Name/); 
}

function getEmail() {
    return screen.getByLabelText('Email Address');
}

function getType() {  
    return screen.getByRole('combobox');
}
function getComment() {  
    return screen.getByLabelText('Your Message');
}