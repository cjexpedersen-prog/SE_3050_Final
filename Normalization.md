First Normal Form:
Each table has a primary key and each field contains a single value. The composite address attribute is represented by Street, StreetNumber, Zip, City, State, and Country. The multivalued attributes email and type have their own tables with primary and foreign keys for reference. First Normal Form is satisfied.

Second Normal Form:
First Normal Form is satisfied. Each non key attribute depends on a candidate key. Core tables have single column primary keys so there is no dependency on only part of a composite key. Supporting tables use composite keys but contain no non key attributes. Second Normal Form is satisfied.

Third Normal Form:
Second Normal Form is satisfied. Non-key attributes do not depend transitively on a key through another non-key attribute. Third Normal Form is satisfied.
