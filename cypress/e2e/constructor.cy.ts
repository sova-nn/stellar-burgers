/// <reference types="cypress" />
describe('Добавление ингредиентов в конструктор', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.viewport(1300, 800);
        cy.visit('/');

        cy.get('[data-cy=ingredients]').as('ingredients');
        cy.get('[data-cy=buns]').as('buns');
        cy.get('[data-cy=stuffing]').as('stuffing');
        cy.get('[data-cy=constructor-ingredients]').as('constructorIngredients');
        cy.get('[data-cy=sauces]').as('sauces');
    });

    it('Добавление ингредиента', () => {
        cy.get('@buns').contains('Добавить').click();
        cy.get('[data-cy=constructor-bun-top]').as('constructorBunTop');
        cy.get('[data-cy=constructor-bun-bottom]').as('constructorBunBottom');

        cy.get('@constructorBunTop').contains('Ингредиент 1').should('exist');
        cy.get('@constructorBunBottom').contains('Ингредиент 1').should('exist');

        cy.get('@stuffing').contains('Добавить').click();
        cy.get('@constructorIngredients').contains('Ингредиент 2').should('exist');

        cy.get('@sauces').contains('Добавить').click();
        cy.get('@constructorIngredients').contains('Ингредиент 4').should('exist');
    });
});

describe('Проверка модалки заказа', () => {
    beforeEach(() => {
        cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
        cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
        cy.intercept('POST', 'api/orders', { fixture: 'order.json' }).as(
            'postOrder'
        );

        window.localStorage.setItem(
            'refreshToken',
            JSON.stringify('test-refreshToken')
        );

        cy.setCookie('accessToken', 'test-accessToken');
        cy.viewport(1300, 800);
        cy.visit('/');

        cy.get('[data-cy=buns]').as('buns');
        cy.get('[data-cy=stuffing]').as('stuffing');
        cy.get('[data-cy=constructor-ingredients]').as('constructorIngredients');
        cy.get('[data-cy=sauces]').as('sauces');
        cy.get('[data-cy=burger-constructor]').as('burgerConstructor');
    });

    afterEach(() => {
        cy.clearLocalStorage();
        cy.clearCookies();
    });

    it('Заказывает бургер', () => {
        cy.get('@buns').contains('Добавить').click();
        cy.get('@stuffing').contains('Добавить').click();
        cy.get('@sauces').contains('Добавить').click();
        cy.get('[data-cy=order-sum] button').click();

        cy.wait('@postOrder').then(() => {
            cy.get('@postOrder')
                .its('response.body.order.ingredients')
                .should('deep.equal', ['1', '2', '5', '1']);

            cy.get('[data-cy=order-number]').contains('12345').should('exist');
        });
    });
});

