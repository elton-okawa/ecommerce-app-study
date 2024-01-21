# Transactions

I've just encountered a case where an `User` must be created together with a `Cart` and if one of them fails, the other one must not be applied.

At the moment, both are different `Aggregate`, how should I handle them?

> Transactions should not cross aggregate boundaries, Martin Fowler.

From this sentence, we can conclude that I need to tweak the modeling to achieve the idea.

References:

- https://martinfowler.com/bliki/DDD_Aggregate.html
