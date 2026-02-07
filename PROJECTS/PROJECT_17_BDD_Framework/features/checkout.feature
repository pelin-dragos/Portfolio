Feature: Checkout Process
  Background:
    Given că sunt logat în aplicație cu username-ul "standard_user" și parola "secret_sauce"
    And că am adăugat un produs în coș

  Scenario: Proces checkout complet
    Given că sunt pe pagina de coș
    When click pe butonul "Checkout" la checkout
    Then ar trebui să fiu pe pagina de checkout
    When completez formularul cu numele "John", prenumele "Doe" și codul poștal "12345"
    And click pe butonul "Continue" la checkout
    Then ar trebui să văd pagina de overview
    And ar trebui să văd produsul în lista de comenzi
    When click pe butonul "Finish" la checkout
    Then ar trebui să văd mesajul de succes "Thank you for your order"
    And comanda ar trebui să fie finalizată

  Scenario: Validare formular checkout - câmpuri goale
    Given că sunt pe pagina de checkout
    When click pe butonul "Continue" fără să completez formularul
    Then ar trebui să văd un mesaj de eroare "Error: First Name is required"

  Scenario: Validare formular checkout - nume lipsă
    Given că sunt pe pagina de checkout
    When completez formularul cu prenumele "Doe" și codul poștal "12345" dar fără nume
    And click pe butonul "Continue" la checkout
    Then ar trebui să văd un mesaj de eroare la checkout

  Scenario: Calculare corectă preț total
    Given că am produse în coș cu preț total de "$50.00"
    When accesez pagina de checkout overview
    Then subtotal-ul ar trebui să fie "$50.00"
    And tax-ul ar trebui să fie calculat corect
    And total-ul final ar trebui să fie corect

