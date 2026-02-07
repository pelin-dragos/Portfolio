Feature: Shopping Cart Functionality
  Background:
    Given că sunt logat în aplicație cu username-ul "standard_user" și parola "secret_sauce"

  Scenario: Adăugare produs în coș
    Given că sunt pe pagina de produse
    When click pe butonul "Add to cart" pentru primul produs
    Then produsul ar trebui să fie adăugat în coș
    And badge-ul coșului ar trebui să afișeze "1"

  Scenario: Adăugare multiple produse în coș
    Given că sunt pe pagina de produse
    When adaug primul produs în coș
    And adaug al doilea produs în coș
    Then badge-ul coșului ar trebui să afișeze "2"
    And ambele produse ar trebui să fie în coș

  Scenario: Ștergere produs din coș
    Given că am adăugat un produs în coș
    When accesez pagina de coș
    And click pe butonul "Remove"
    Then produsul ar trebui să fie șters din coș
    And coșul ar trebui să fie gol

  Scenario: Verificare preț total în coș
    Given că am adăugat produse în coș
    When accesez pagina de coș
    Then ar trebui să văd prețul total calculat corect

  @smoke
  Scenario: Coș gol
    Given că sunt pe pagina de coș
    When coșul este gol
    Then ar trebui să văd mesajul că coșul este gol
    And butonul de checkout ar trebui să fie dezactivat

