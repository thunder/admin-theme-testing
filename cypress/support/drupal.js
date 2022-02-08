// Helper for drupal specific tasks.
Cypress.Commands.add('login', (user, password) => {
    return cy.request({
        method: 'POST',
        url: '/user/login', 
        form: true,
        body: { 
            name: user,
            pass: password,
            form_id: 'user_login_form' 
        }
    });
});
  
Cypress.Commands.add('logout', () => {
    return cy.request('/user/logout');
});

Cypress.Commands.add('drupalFormSubmit', (url, values) => {
    cy.visit(url);
    cy.get('[name=form_build_id]').invoke('val').then((formBuildId) => {
        cy.get('[name=form_token]').invoke('val').then((formToken) => {
            cy.request({
                method: 'POST',
                url,
                form: true,
                body: {
                    form_build_id: formBuildId,
                    form_token: formToken,
                    ...values
                }
            });    
        });
    });
});
