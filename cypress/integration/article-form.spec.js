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
        cy.scrollTo('bottom');
        cy.compareSnapshot({ fullPage: true });
    });

    it('Scheduled content overview', () => {
        cy.visit('/admin/content/scheduled');
        cy.compareSnapshot({ fullPage: true });
    });

    it('Files overview', () => {
        cy.visit('/admin/content/files');
        cy.get('#view-filename-table-column a').click();
        cy.get('.views-field-filesize').invoke('html', '99.9 KB');
        cy.get('.views-field-created, .views-field-changed').invoke('html', 'Mon, 07/08/2019 - 08:27');
        cy.get('h1.page-title').click();
        cy.compareSnapshot({ fullPage: true });
    });

    it('Node add', () => {
        cy.visit('/node/add');
        cy.compareSnapshot({ fullPage: true });
    });

    it('Node add article', () => {
        cy.visit('/node/add/article');
        cy.get('#edit-author summary span').invoke('html', 'Authored on 2022-01-01');
        cy.compareSnapshot({ fullPage: true });
    });

    it('Token browser', () => {
        cy.visit('/node/add/article');
        cy.get('#edit-field-meta-tags-0 [role=button]').click();
        cy.get('#edit-field-meta-tags-0-metatag-async-widget-customize-meta-tags').click();
        cy.get('.token-dialog').click();
        cy.get('.token-tree', { timeout: 10000 }).should('be.visible');
        cy.compareSnapshot();
    });

    it('Add paragraphs modal', () => {
        cy.visit('/node/add/article');
        cy.get('#edit-author summary span').invoke('html', 'Authored on 2022-01-01');
        cy.get('#field-paragraphs-values > tbody > tr > td > div > ul > li > button').last().click();
        cy.compareSnapshot();
    });

    it('Add mulitple paragraphs', () => {
        cy.visit('/node/add/article');
        cy.get('[data-drupal-selector="edit-field-paragraphs"] .field-multiple-table > tbody > tr:last-of-type .paragraphs-features__add-in-between__button').contains('+ Text').click();
        cy.get('[data-drupal-selector="edit-field-paragraphs-0-subform"]').should('be.visible');

        cy.get('[data-drupal-selector="edit-field-paragraphs"] .field-multiple-table > tbody > tr:last-of-type .paragraphs-features__add-in-between__button').last().click();
        cy.get('.paragraphs-add-dialog.ui-dialog-content [name="field_paragraphs_quote_add_more"]').click();
        cy.get('[data-drupal-selector="edit-field-paragraphs-1-subform"]').should('be.visible');

        cy.get('[data-drupal-selector="edit-field-paragraphs"] .field-multiple-table > tbody > tr:last-of-type .paragraphs-features__add-in-between__button').last().click();
        cy.get('.paragraphs-add-dialog.ui-dialog-content [name="field_paragraphs_link_add_more"]').click();
        cy.get('[data-drupal-selector="edit-field-paragraphs-2-subform"]').should('be.visible');

        cy.get('[data-drupal-selector="edit-field-paragraphs"] .field-multiple-table > tbody > tr:last-of-type .paragraphs-features__add-in-between__button').last().click();
        cy.get('.paragraphs-add-dialog.ui-dialog-content [name="field_paragraphs_twitter_add_more"]').click();
        cy.get('[data-drupal-selector="edit-field-paragraphs-3-subform"]').should('be.visible');

        cy.get('[data-drupal-selector="edit-field-paragraphs"] .field-multiple-table > tbody > tr:last-of-type .paragraphs-features__add-in-between__button').contains('+ Gallery').click();
        cy.get('[data-drupal-selector="edit-field-paragraphs-4-subform"]').should('be.visible');

        cy.get('[data-drupal-selector="edit-field-paragraphs"] .field-multiple-table > tbody > tr:last-of-type .paragraphs-features__add-in-between__button').contains('+ Image').click();
        cy.get('[data-drupal-selector="edit-field-paragraphs-5-subform"]').should('be.visible');

        cy.get('[data-drupal-selector="edit-field-paragraphs"] .field-multiple-table > tbody > tr:last-of-type .paragraphs-features__add-in-between__button').last().click();
        cy.get('.paragraphs-add-dialog.ui-dialog-content [name="field_paragraphs_video_add_more"]').click();
        cy.get('#edit-author summary span').invoke('html', 'Authored on 2022-01-01').then(() => {
            cy.compareSnapshot({ fullPage: true });
        });
    });

    it('Linkit dialog', () => {
        cy.visit('/node/add/article');
        cy.get('#edit-author summary span').invoke('html', 'Authored on 2022-01-01');
        cy.get('[data-drupal-selector="edit-field-paragraphs"] .field-multiple-table > tbody > tr:last-of-type .paragraphs-features__add-in-between__button').contains('+ Text').click();
        cy.get('[data-drupal-selector="edit-field-paragraphs-0-subform"]').should('be.visible');
        cy.get('iframe.cke_wysiwyg_frame').click();
        // @todo https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.get('.cke_button__drupallink').wait(1000).click();
        cy.get('[data-drupal-selector="edit-attributes-href"]').should('be.visible');
        cy.get('#edit-author summary span').invoke('html', 'Authored on 2022-01-01').then(() => {
            cy.compareSnapshot();
        });
    });

    it('Paragraphs modified content message', () => {
        cy.visit('/node/add/article');
        cy.get('#edit-author summary span').invoke('html', 'Authored on 2022-01-01');
        cy.get('[data-drupal-selector="edit-field-paragraphs"] .field-multiple-table > tbody > tr:last-of-type .paragraphs-features__add-in-between__button').contains('+ Text').click();
        cy.get('[data-drupal-selector="edit-field-paragraphs-0-subform"]').should('be.visible');
        cy.get('[data-drupal-selector="edit-field-paragraphs"] .field-multiple-table > tbody > tr:last-of-type .paragraphs-features__add-in-between__button').contains('+ Text').click();
        cy.get('[data-drupal-selector="edit-field-paragraphs-1-subform"]').should('be.visible');
        // @todo https://www.cypress.io/blog/2019/01/22/when-can-the-test-click/
        // eslint-disable-next-line cypress/no-unnecessary-waiting
        cy.get('[data-drupal-selector="edit-field-paragraphs-1-subform"] .cke_button__bulletedlist').wait(1000).click();
        cy.get('[name="field_paragraphs_1_collapse"]').click();
        cy.get('[data-drupal-selector="edit-field-paragraphs-1"] .paragraphs-icon-changed').should('be.visible');
        cy.get('#edit-author summary span').invoke('html', 'Authored on 2022-01-01').then(() => {
            cy.get('.ajax-new-content').invoke('removeAttr', 'style').then(() => {
                cy.compareSnapshot({ fullPage: true });
            });
        });
    });

});
