Feature: Rays

Scenario: Creating and querying a ray
  Given origin <- point(1, 2, 3)
    And direction <- vector(4, 5, 6)
  When  r <- ray(origin, direction)
  Then  r.origin = origin
    And r.direction = direction

Scenario: Computing a point from a distance
  Given r <- ray(point 2 3 4, vector 1 0 0)
  Then  position(r, 0.0) = point(2.0, 3.0, 4.0)
    And position(r, 1.0) = point(3.0, 3.0, 4.0)
    And position(r, -1.0) = point(1.0, 3.0, 4.0)
    And position(r, 2.5) = point(4.5, 3.0, 4.0)

Scenario: A ray intersects a sphere at two points
  Given r <- ray(point 0 0 -5, vector 0 0 1)
    And s <- sphere
  When  xs <- intersect(s, r)
  Then  xs.count = 2
    And xs[0].t = 4.0
    And xs[1].t = 6.0

Scenario: A ray intersects a sphere at a tangent
  Given r <- ray(point 0 1 -5, vector 0 0 1)
    And s <- sphere
  When  xs <- intersect(s, r)
  Then  xs.count = 2
    And xs[0].t = 5.0
    And xs[1].t = 5.0

Scenario: A ray misses a sphere
  Given r <- ray(point 0 2 -5, vector 0 0 1)
    And s <- sphere
  When  xs <- intersect(s, r)
  Then  xs.count = 0

Scenario: A ray originates inside a sphere
  Given r <- ray(point 0 0 0, vector 0 0 1)
    And s <- sphere
  When  xs <- intersect(s, r)
  Then  xs.count = 2
    And xs[0].t = -1.0
    And xs[1].t = 1.0

Scenario: A sphere is behind a ray
  Given r <- ray(point 0 0 5, vector 0 0 1)
    And s <- sphere
  When  xs <- intersect(s, r)
  Then  xs.count = 2
    And xs[0].t = -6.0
    And xs[1].t = -4.0
  
Scenario: An intersection encapsulates t and object
  Given s <- sphere
  When  i <- intersection(3.5, s)
  Then  i.t = 3.5
    And i.object = s

Scenario: Aggregating intersections
  Given s <- sphere
    And i1 <- intersection(1.0, s)
    And i2 <- intersection(2.0, s)
  When  xs <- intersections(i1, i2) 
  Then  xs.count = 2
    And xs[0].t = 1.0
    And xs[1].t = 2.0

Scenario: Intersect sets the object on the intersection
  Given r <- ray(point 0 0 -5, vector 0 0 1)
    And s <- sphere
  When  xs <- intersect(s, r)
  Then  xs.count = 2
    And xs[0].object = s
    And xs[1].object = s