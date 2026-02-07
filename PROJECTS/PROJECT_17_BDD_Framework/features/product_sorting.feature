Feature: Product Sorting
  Background:
    Given că sunt logat în aplicație cu username-ul "standard_user" și parola "secret_sauce"
    And că sunt pe pagina de produse

  Scenario: Sortare produse după nume A-Z
    When selectez opțiunea de sortare "Name (A to Z)"
    Then produsele ar trebui să fie sortate alfabetic A-Z
    And primul produs ar trebui să înceapă cu o literă mai devreme în alfabet

  Scenario: Sortare produse după nume Z-A
    When selectez opțiunea de sortare "Name (Z to A)"
    Then produsele ar trebui să fie sortate alfabetic Z-A
    And primul produs ar trebui să înceapă cu o literă mai târzie în alfabet

  Scenario: Sortare produse după preț Low to High
    When selectez opțiunea de sortare "Price (low to high)"
    Then produsele ar trebui să fie sortate după preț crescător
    And primul produs ar trebui să aibă cel mai mic preț

  Scenario: Sortare produse după preț High to Low
    When selectez opțiunea de sortare "Price (high to low)"
    Then produsele ar trebui să fie sortate după preț descrescător
    And primul produs ar trebui să aibă cel mai mare preț

  @smoke
  Scenario Outline: Sortare cu diferite opțiuni
    When selectez opțiunea de sortare "<sort_option>"
    Then produsele ar trebui să fie sortate conform "<sort_option>"

    Examples:
      | sort_option            |
      | Name (A to Z)          |
      | Name (Z to A)          |
      | Price (low to high)    |
      | Price (high to low)    |

