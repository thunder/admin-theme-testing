// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
import { addMatchImageSnapshotCommand } from 'cypress-image-snapshot/command';

addMatchImageSnapshotCommand({
    capture: 'fullPage',
    customDiffConfig: { threshold: 0.0 },
    failureThreshold: 0.00,
    failureThresholdType: 'percent',
});

Cypress.Commands.add('compareSnapshot', (maybeName, maybeOptions) => {
    const options = typeof maybeName === 'string' ? maybeOptions : maybeName;
    const name = typeof maybeName === 'string' ? maybeName : null;
    const taskTitle = cy.state('runnable').fullTitle();
    const browserName = Cypress.config('browser').name;
    const viewportWidth = Cypress.config('viewportWidth');

    let snapshotTitle = `${taskTitle}-${browserName}-${viewportWidth}`;
    if (name) {
        snapshotTitle = `${snapshotTitle}-${maybeName}`;
    }

    cy.sanitizeTitle(snapshotTitle).then((title) => {
        cy.matchImageSnapshot(title, options);        
    });
});

Cypress.Commands.add('setResolution', (size) => {
    if (Cypress._.isArray(size)) {
        cy.viewport(size[0], size[1]);
     } else {
         cy.viewport(size);
    }
});

Cypress.Commands.add('sanitizeTitle', (string) => {
    return string
        .replace(/[^a-z0-9_-]/gi, '_')
        .replace(/^_/, '')
        .toLowerCase();
});
