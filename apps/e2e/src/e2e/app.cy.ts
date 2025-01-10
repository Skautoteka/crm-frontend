beforeEach(() => {
  cy.login('jakub@jakub', '1234');
  cy.visit('/');
});

describe('Task Management', () => {
  it('should add a new task', () => {
    cy.get('#add-task-btn').click();
    cy.get('[ng-reflect-name="hostTeamId"]').type('Lech Poznan');
    cy.get('.skt-ui-input-search__modal').should('have.descendants', '.skt-ui-input-search__option').click();

    cy.get('[ng-reflect-name="guestTeamId"]').type('Barcelona');
    cy.get('.skt-ui-input-search__modal').should('have.descendants', '.skt-ui-input-search__option').click();

    cy.get('[ng-reflect-name="status"]').click();
    cy.get('.skt-ui-input-select__modal').should('have.descendants', '.skt-ui-input-select__option').click();

    cy.get('#save-task-btn').click();

    cy.get('.skt-ui-notification--success').contains('Poprawnie dodano zadanie');

    cy.get('.skt-tasks-content__tasks')
      .find('.skt-tasks-content__tasks-card')
      .find('.skt-ui-list-card__content')
      .last()
      .find('.skt-ui-label')
      .find('.skt-ui-label__value')
      .contains('Lech Poznan vs Barcelona');
  });

  it('should display tasks list', () => {
    cy.get('.skt-tasks-content__tasks').should('have.length.greaterThan', 0);
  });

  it('should validate empty task submission', () => {
    cy.get('#add-task-btn').click();
    cy.get('#save-task-btn').click();
    cy.get('.skt-ui-notification--failure').contains('Wypełnij poprawnie formularz');
  });

  it('should display task details', () => {
    cy.get('.skt-tasks-content__tasks-card').first().click();
    cy.get('.skt-ui-side-content-header__container').contains('Szczegóły zadania');
  });

  it('should delete a task', () => {
    cy.get('.skt-tasks-content__tasks')
      .children('.skt-tasks-content__tasks-card')
      .its('length')
      .then(initialCount => {
        cy.get('.skt-tasks-content__tasks-card').first().click();
        cy.get('.skt-ui-simple-button__text').contains('Usuń raport').click();
        cy.get('.skt-ui-button__button').contains('Tak, usuwam').click();

        cy.get('.skt-tasks-content__tasks')
          .children('.skt-tasks-content__tasks-card')
          .its('length')
          .should('eq', initialCount - 1);
      });
  });
});

describe('Task Management', () => {
  it('should add note to task', () => {
    cy.get('.skt-tasks-content__tasks-card').first().click();
    cy.get('.skt-ui-side-content-header__container').contains('Szczegóły zadania');
  });
});