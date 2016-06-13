# JS Hash

## Ruby Style Hashes for JavaScript

[on GitHub](http://github.com/Jeff-Russ/ruby-hash-for-js)  
	
This is a JavaScript implementation of the Ruby `Hash` class. Objects made from the `Hash` constructor provided here create `Hash` objects that contain most of the methods of the Ruby `Hash` objects while keeping the appearance and behavior as if they only contain data.  

### Why?  

JavaScript Object Literal notation is a great way to define objects as data containers but adding methods to them causes the methods themselves to be treated as data. JavaScript has rather unfriendly ways of preventing this that you most certainly would not one to do EVERY time you create a data object. This `Hash` class comes loaded with most of what you would need and stays out of the way. It also provides a friendly interface to add more methods.  

## Structure of a Hash object

Conceptually, these `Hash` object have two sides, the enumerable data side and the non-enumerable write-protected method side. The data side will only allow:  
 
1. Strings
2. Booleans
3. Numbers
4. Null
5. Undefined
6. Other `Hash` objects

When you create object with nested objects, the `Hash` constructor method is called recursively. You can also add inner objects later, of course, and the objects will become `Hash` objects themselves. If the `Hash` class comes across a function definition, it will redefine it with a custom descriptor, preventing it from being enumerable.  

Objects added to a hash Object are essentially stripped of their prototypal  baggage. Functions will survive but will be protected from accidental reassignment and enumeration.  

## Creating a new hash

Where before you would have done this:  

```javascript
var hash = {
	key1: true,
	nested_ob: {
		inner_key: "nested",
		doubnest_ob: {
			doubnext_key: "double nested",
		}
	},
	key2: 1.5,
	key3: -2,
	func: function() {
		console.log("I will be added as enumerable! BAD!");
	}
};
```

Now you'll do this:

```javascript
var hash = new Hash({
	key1: true,
	nested_ob: {
		inner_key: "nested",
		doubnest_ob: {
			doubnext_key: "double nested",
		}
	},
	key2: 1.5,
	key3: -2,
	func: function() {
		console.log("I will be added, but not enumerable!)");
	}
});
```


# JS Hash Built-in Methods

### Size Information Methods
  
> __h.isEmpty()__  
>> Return true if hash h contains no data key-value pairs (excludes methods)  
  
> __h.length()__  
>> Returns number data key-value pairs (excludes methods)  
>> TODO: add optional  
  
### Basic Assignment & Deletion Methods
    
> __h1.mergeIn(h2)__ 
>> Add the contents of h2 to h1.  
>> TODO: add an optional passed function to solve conflicts.

> __h1.mergeOut(h2)__
>> Return a new hash containing the contents of h1 and h2.  
>> TODO: add an optional passed function to solve conflicts.

> __h.clear(optional_boolean)__  
>> Remove all key-value pairs from hash h.
>> Without the `optional_boolean` the operation is recursive. Provide the argument `false` to prevent inner hashes from being deleted.  
  
### Mapping Enumeration Methods
  
The `this` keyword available inside the passed function in each method below. As is the case in Ruby Hashes, when the value of a 
key-value pair is passed is to the function, assignment to it does not effect the hash data. You must assign to this[key] or hashname[key]. TODO: provide some way to traverse the hash ommitting certain data types to prevent deletion of inner hashes, etc.  
  
> __h.each(function(key, value){...})__  
>> Applies a function to each key-value pair passing both the key as string and the value as parameters.   
  
> __h.eachKey(function(key){...})__  
>> Applies a function to each key-value pair passing the key as string parameter. 
>> 
> __h.eachValue(function(value){...})__  
>> Applies a function to each key-value pair passing the value as parameter.  

### Deletion Enumeration Methods
  
The `this` keyword available inside the passed function in each method below.  
  
> __h.deleteIf(function(key, value){...})__  
>> Delete every key-value pair from hash h for which passed function evaluates to true.   
  
> __h.keepIf(function(key, value){...})__  
>> Delete every key-value pair from hash h for which passed function evaluates to false. 





