const username = 'admin';
const password = 'admin';
const theme = 'gin';

describe(theme, () => {
    beforeEach(() => {
        cy.login(username, password);
    });

    it('Disable autosave', () => {
        cy.drupalFormSubmit('/admin/config/content/autosave_form', { form_id: 'autosave_form_admin_settings' });
    });

    it('Admin overview', () => {
        cy.visit('/admin/content');
        cy.get('#view-title-table-column a').click();
        cy.get('td.views-field.views-field-changed').invoke('html', '01/01/2018 - 00:00');
        cy.compareSnapshot();
    });

    it('Node add article', () => {
        cy.visit('/node/add/article');
        cy.compareSnapshot();
    });
});
