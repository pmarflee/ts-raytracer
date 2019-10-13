Feature: Spheres

Scenario: A sphere's default transformation
  Given s <- sphere
  Then  s.transform = identity_matrix

Scenario: Changing a sphere's transformation
  Given s <- sphere
    And t <- translation(2, 3, 4)
  When  set_transform(s, t) 
  Then  s.transform = t