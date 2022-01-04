const username = 'admin';
const password = 'admin';
const theme = 'gin';

describe(theme, () => {
    beforeEach(() => {

        // some stuff
    })
    it('Login', () => {
        cy.visit('/user');
        // cy.get('input[name=name]').type(username);
        // cy.get('input[name=pass]').type(password);
        // cy.get('[data-drupal-selector="edit-submit"]').click()
      
    })

    it('Admin overview', () =>{
        cy.login(username, password)
        cy.visit('/admin/content')
        cy.matchImageSnapshot();
    })

    it('Node add article', () =>{
        cy.login(username, password)
        cy.visit('/node/add/article')
        cy.viewport(1280, 1024)
        cy.matchImageSnapshot({
            capture: 'fullPage'
        });
    })
})
