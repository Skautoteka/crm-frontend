beforeEach(() => {
  cy.login('jakub@jakub', '1234');
  cy.visit('/');
});

describe('Note Management', () => {
  const name = Math.random().toString();
  it('should add note to task', () => {
    cy.get('#unassigned').click();
    cy.get('.skt-tasks-content__tasks-card').first().click();
    cy.get('.skt-ui-side-content-header__container').contains('Szczegóły zadania');
    cy.get('#add-note-header').find('.skt-ui-simple-button').click({ force: true });

    cy.get('[ng-reflect-name="name"]').type(name);

    cy.get('#save-note-btn').click();

    cy.get('.skt-ui-notification--success').contains('Poprawnie dodano notatke');

    cy.get('.skt-tasks-notes').find('.skt-tasks-notes__card-info').contains(name);
  });

  it('should edit note', () => {
    cy.get('#unassigned').click();
    cy.get('.skt-tasks-content__tasks-card').first().click();
    cy.get('.skt-ui-side-content-header__container').contains('Szczegóły zadania');

    cy.get('.skt-tasks-notes').find('.skt-tasks-notes__card-info').contains(name).click();

    cy.get('[ng-reflect-name="playerNumber"]').type('0');
    cy.get('[ng-reflect-name="content"]').type('Testowa treść');
    cy.get('[ng-reflect-name="evaluation"]').type('3');
    cy.get('[ng-reflect-name="teamId"]').click();
    cy.get('[ng-reflect-name="teamId"]').type('Lech Poznań');
    cy.get('.skt-ui-input-search__option').should('have.descendants', '.skt-ui-input-search__option-label').click();

    cy.get('#save-note-btn').click();

    cy.get('.skt-ui-notification--success').contains('Poprawnie zaktualizowano notatkę');

    cy.get('.skt-tasks-notes').find('.skt-tasks-notes__card-info').contains(name).click();

    cy.get('[ng-reflect-name="content"]')
      .find('.skt-ui-input__textarea')
      .should('have.attr', 'ng-reflect-model', 'Testowa treść');

    cy.get('.skt-ui-modal-container__close').click();
  });
});
