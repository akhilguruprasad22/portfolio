import { render, screen, waitFor } from '@testing-library/react';
import ProjectsSection from '../components/ProjectsSection.js';
import { AlertProvider } from '../context/alertContext.js';
import nock from 'nock';

describe('ProjectsSection', () => {

    it('Checks loader', () => {
        render(
            <AlertProvider>
                <ProjectsSection />
            </AlertProvider>
        );
        expect(screen.getByRole('img', {hidden: true})).toBeInTheDocument();
    });

    it('Checks successful fetch', async () => {

        const scope = nock("https://api.github.com", { allowUnmocked: true }) //allowUnmocked allows the preflight reqs to pass through
            .defaultReplyHeaders({
                "access-control-allow-origin": "*",
            })
            .persist()
            .get(/.*/)
            .reply(200,
                [{
                    "id": 218411064,
                    "name": "Batch-Scheduling-Model-for-distributed-systems",
                    "html_url": "https://github.com/akhilguruprasad22/Batch-Scheduling-Model-for-distributed-systems",
                    "description": "Implementation of IEEE paper on scheduling of jobs in an distributed environment",
                    "updated_at": "2023-11-26T13:59:20Z"
                }]
            );

        render(
            <AlertProvider>
                <ProjectsSection />
            </AlertProvider>
        );

        await waitFor(async() => {
            expect(screen.getAllByRole('heading').length).toBe(1);
        });
        
        expect(scope.isDone()).toBe(true); //make sure the request has been intercepted
        expect(screen.getByRole('button')).toBeInTheDocument();

        nock.cleanAll();

    });

    it('Checks unsuccessful fetch', async () => {

        const scope = nock("https://api.github.com", { allowUnmocked: true }) //allowUnmocked allows the preflight reqs to pass through
            .defaultReplyHeaders({
                "access-control-allow-origin": "*",
            })
            .persist()
            .get(/.*/)
            .replyWithError('successful error');

        render(
            <AlertProvider>
                <ProjectsSection />
            </AlertProvider>
        );

        await waitFor(async() => {
            expect(scope.isDone()).toBe(true);
        });

        expect(screen.getByRole('img', {hidden: true})).toBeInTheDocument();

    });
});