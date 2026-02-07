Feature: Login Functionality
  Scenario: Login reușit cu credențiale valide
    Given că sunt pe pagina de login
    When introduc username-ul "standard_user"
    And introduc parola "secret_sauce"
    And click pe butonul de login
    Then ar trebui să fiu logat cu succes
    And ar trebui să văd pagina de produse

  Scenario: Login eșuat cu credențiale invalide
    Given că sunt pe pagina de login
    When introduc username-ul "invalid_user"
    And introduc parola "invalid_password"
    And click pe butonul de login
    Then ar trebui să văd un mesaj de eroare
    And nu ar trebui să fiu logat

  Scenario: Login cu câmpuri goale
    Given că sunt pe pagina de login
    When click pe butonul de login fără să completez credențialele
    Then ar trebui să văd un mesaj de eroare
    And nu ar trebui să fiu logat

  @smoke
  Scenario Outline: Login cu diferite tipuri de utilizatori
    Given că sunt pe pagina de login
    When introduc username-ul "<username>"
    And introduc parola "<password>"
    And click pe butonul de login
    Then ar trebui să văd "<expected_result>"

    Examples:
      | username              | password      | expected_result           |
      | standard_user         | secret_sauce  | pagina de produse         |
      | locked_out_user       | secret_sauce  | mesaj de eroare           |
      | problem_user          | secret_sauce  | pagina de produse         |

