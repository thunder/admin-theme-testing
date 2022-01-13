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

    it('Content overview', () => {
        cy.visit('/admin/content');
        cy.get('#view-title-table-column a').click();
        cy.get('td.views-field.views-field-changed').invoke('html', '01/01/2018 - 00:00');
        cy.compareSnapshot();
    });

    it('Scheduled content overview', () => {
        cy.visit('/admin/content/scheduled');
        cy.compareSnapshot();
    });

    it('Files overview', () => {
        cy.visit('/admin/content/files');
        cy.get('.views-field-filesize').invoke('html', '99.9 KB');
        cy.get('.views-field-created, .views-field-changed').invoke('html', 'Mon, 07/08/2019 - 08:27');
        cy.get('#view-filename-table-column a').click();
        cy.get('h1.page-title').click();
        cy.compareSnapshot();
    });

    it('Node add article', () => {
        cy.visit('/node/add/article');
        cy.compareSnapshot();
    });
});
