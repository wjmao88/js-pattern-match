# js-pattern-match

example

```
match([1,2])(
  incaseVal(1)(n => 'is 1'),
  incaseTuple([1,2])(t => `is tuple ${t}`),
  incase(v => v === 1)(n => 'is 1'),
)
// 'is tuple [1,2]'
```
