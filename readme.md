# LS Collection
Manage browser localStorage key as an object collection.

### Dependency
- undescore js

### Usages
```markup
<script src="underscore.min.js"></script>
<script src="ls-collection.js"></script>
```

### Methods
- insert
- getAll
- find
- findWhere
- where
- delete
- flash

Create an instance of lsCollection
```js
var todos = new lsCollection('todos');
```

`insert` - it returns inserted object
```js
todos.insert({title:"Task 01",status:0})
//output: {title:"Task 01", status:0, _id:1595166010878}
todos.insert({title:"Task 02",status:1})
//output: {title:"Task 02", status:1, _id:1595165132214}
```

`getAll` - it returns array or empty array when no data exist
```js
todos.getAll()
/** output: 
  [
    {title:"Task 01", status:0, _id:1595166010878},
    {title:"Task 02", status:1, _id:1595165132214}
  ]
**/
```

`find` - it returns object or undefined when data not found
```js
todos.find(1595166010878) // pass unique identifier _id
//output: {title:"Task 01", status:0, _id:1595166010878}
```


`findWhere` - it returns object or undefined when data not found
```js
todos.find({_id:1595166010878})
//output: {title:"Task 01", status:0, _id:1595166010878}
```

`where` - it returns array or empty array when data not found
```js
todos.find({status:1})
//output: [{title:"Task 02", status:1, _id:1595165132214}]
```

`delete` - it returns true/false
```js
todos.delete(1595166010878)
//output: true
```

`falsh` - it deletes all and returns nothing
```js
todos.falsh()
```