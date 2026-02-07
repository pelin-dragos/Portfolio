Feature: Navigation Functionality
  Background:
    Given că sunt logat în aplicație cu username-ul "standard_user" și parola "secret_sauce"

  Scenario: Navigare la pagina de produse
    When navighează la pagina de produse
    Then ar trebui să văd lista de produse
    And ar trebui să văd cel puțin un produs

  Scenario: Navigare la coșul de cumpărături
    When click pe iconița coșului
    Then ar trebui să fiu redirectat la pagina de coș
    And URL-ul ar trebui să conțină "cart"

  Scenario: Navigare înapoi de la coș
    Given că sunt pe pagina de coș
    When click pe butonul "Continue Shopping" din navigare
    Then ar trebui să revin la pagina de produse

  @smoke
  Scenario: Verificare navigare meniu
    When navighează prin aplicație
    Then toate link-urile din meniu ar trebui să fie accesibile

