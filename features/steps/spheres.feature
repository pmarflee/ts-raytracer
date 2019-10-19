Feature: Spheres

Scenario: A sphere's default transformation
  Given s <- sphere
  Then  s.transform = identity_matrix

Scenario: Changing a sphere's transformation
  Given s <- sphere
    And t <- translation(2, 3, 4)
  When  set_transform(s, t) 
  Then  s.transform = t

Scenario: Intersecting a scaled sphere with a ray
  Given r <- ray(point 0 0 -5, vector 0 0 1)
    And s <- sphere
  When  set_transform(s, scaling 2 2 2)
    And xs <- intersect(s, r)
  Then  xs.count = 2
    And xs[0].t = 3.0
    And xs[1].t = 7.0

Scenario: Intersecting a translated sphere with a ray
  Given r <- ray(point 0 0 -5, vector 0 0 1)
    And s <- sphere
  When  set_transform(s, translation 5 0 0)
    And xs <- intersect(s, r)
  Then  xs.count = 0

Scenario: The normal on a sphere at a point on the x axis
  Given s <- sphere
  When  n <- normal_at(s, point 1 0 0)
  Then  n = vector(1, 0, 0)

Scenario: The normal on a sphere at a point on the y axis
  Given s <- sphere
  When  n <- normal_at(s, point 0 1 0)
  Then  n = vector(0, 1, 0)

Scenario: The normal on a sphere at a point on the z axis
  Given s <- sphere
  When  n <- normal_at(s, point 0 0 1)
  Then  n = vector(0, 0, 1)

Scenario: The normal on a sphere at a nonaxial point
  Given s <- sphere
  When  n <- normal_at(s, point √3 / 3 √3 / 3 √3 / 3)
  Then  n = vector(√3 / 3, √3 / 3, √3 / 3)

Scenario: The normal is a normalized vector
  Given s <- sphere
  When  n <- normal_at(s, point √3 / 3 √3 / 3 √3 / 3)
  When  n = normalize(n)