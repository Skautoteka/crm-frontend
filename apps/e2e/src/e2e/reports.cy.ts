beforeEach(() => {
  cy.login('jakub@jakub', '1234');
  cy.visit('/');
});

describe('Reports Management', () => {
  const name = Math.random().toString();
  const secondName = Math.random().toString();

  it('should add report to task', () => {
    cy.get('#unassigned').click();
    cy.get('.skt-tasks-content__tasks-card').first().click();
    cy.get('.skt-ui-side-content-header__container').contains('Szczegóły zadania');
    cy.get('#add-report-header').find('.skt-ui-simple-button').click({ force: true });

    cy.get('[ng-reflect-name="name"]').type(name);
    cy.get('[ng-reflect-name="playerId"]').click();
    cy.get('[ng-reflect-name="playerId"]').type('Cristiano');
    cy.get('.skt-ui-input-search__option').should('have.descendants', '.skt-ui-input-search__option-label').click();
    cy.get('[ng-reflect-name="regionId"]').click();
    cy.get('[ng-reflect-name="regionId"]').type('Podlaskie');
    cy.get('.skt-ui-input-search__option').should('have.descendants', '.skt-ui-input-search__option-label').click();

    cy.get('#save-report-btn').click();

    cy.get('.skt-ui-notification--success').contains('Poprawnie dodano raport');

    cy.get('.skt-tasks-reports').find('.skt-tasks-reports__card-info').contains(name);
  });

  it('should validate and edit note', () => {
    cy.get('#unassigned').click();
    cy.get('.skt-tasks-content__tasks-card').first().click();
    cy.get('.skt-ui-side-content-header__container').contains('Szczegóły zadania');

    cy.get('.skt-tasks-reports').find('.skt-tasks-reports__card-info').contains(name).click();

    cy.get('[ng-reflect-name="lastName"]')
      .find('.skt-ui-input__input')
      .should('have.attr', 'ng-reflect-model', 'Ronaldo');

    cy.get('[ng-reflect-name="physicalDescription"]').type('Testowy opis fizyczny');
    cy.get('[ng-reflect-name="evaluation"]').type('3');
    cy.get('[ng-reflect-name="formationId"]').click();
    cy.get('[ng-reflect-name="formationId"]').type('Ustawienie 4-4-2');
    cy.get('.skt-ui-input-search__option').should('have.descendants', '.skt-ui-input-search__option-label').click();

    cy.get('#save-report-btn').click();

    cy.get('.skt-ui-notification--success').contains('Poprawnie zaktualizowano raport');

    cy.get('.skt-tasks-reports').find('.skt-tasks-reports__card-info').contains(name).click();

    cy.get('[ng-reflect-name="physicalDescription"]')
      .find('.skt-ui-input__textarea')
      .should('have.attr', 'ng-reflect-model', 'Testowy opis fizyczny');

    cy.get('.skt-ui-modal-container__close').click();
  });

  it('validate new report in report tab', () => {
    cy.get('.skt-ui-sidenav-menu-element__label').contains('Raporty').click();

    cy.get('.skt-ui-table__table-body').find('skt-ui-table-row-cell').contains(name).click();

    cy.get('.skt-ui-side-content-header__container').contains('Szczegóły raportu');
  });

  it('create report in report tab', () => {
    cy.get('.skt-ui-sidenav-menu-element__label').contains('Raporty').click();
    cy.get('.skt-ui-content__header').find('.skt-ui-button__button').contains('Dodaj nowy raport').click();

    cy.get('[ng-reflect-name="name"]').type(secondName);
    cy.get('[ng-reflect-name="playerId"]').click();
    cy.get('[ng-reflect-name="playerId"]').type('Cristiano');
    cy.get('.skt-ui-input-search__option').should('have.descendants', '.skt-ui-input-search__option-label').click();
    cy.get('[ng-reflect-name="regionId"]').click();
    cy.get('[ng-reflect-name="regionId"]').type('Podlaskie');
    cy.get('.skt-ui-input-search__option').should('have.descendants', '.skt-ui-input-search__option-label').click();

    cy.get('#save-report-btn').click();

    cy.get('.skt-ui-table__table-body').find('skt-ui-table-row-cell').contains(secondName);
  });
});
