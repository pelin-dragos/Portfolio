Feature: Logout Functionality
  Background:
    Given că sunt logat în aplicație cu username-ul "standard_user" și parola "secret_sauce"

  Scenario: Logout reușit
    Given că sunt logat în aplicație
    When click pe butonul de logout
    Then ar trebui să fiu delogat
    And ar trebui să fiu redirectat la pagina de login
    And URL-ul ar trebui să conțină "index.html"

  Scenario: Verificare logout - acces restricționat
    Given că am făcut logout
    When încerc să accesez pagina de produse direct
    Then ar trebui să fiu redirectat la pagina de login
    And nu ar trebui să pot accesa pagina de produse fără login

  @smoke
  Scenario: Logout din meniu
    Given că sunt pe pagina de produse
    When deschid meniul
    And click pe opțiunea "Logout"
    Then ar trebui să fiu delogat cu succes

