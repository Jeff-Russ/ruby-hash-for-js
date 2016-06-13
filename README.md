# JS Hash

# WARNING  
This is not any sort of release as of now. It's still in early stages of design.  

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

## Getter and Setter Methods 

These methods are not in the Ruby Hash class and provide smarter ways to assign new properties to a Hash object in the JavaScript environment.  
    
### h`get`(key) 
* Returns value of key containing data.  
   
### h`get`(innerhash_name)
* Returns a new hash containing the contents of inner hash.  
   
### h`get`() -no argument-  
* Returns a copy of the entire hash object h.  
    
### h`set`(key, value) 
* Assigns a new value to existing key or creates a new one.  
* TODO: make all-uppercase keys create constants automatically.  
   
### h`set`(key, value, 'const') 
* Assigns a new readonly value to existing key or creates a new one.   
   
### h`set`(innerhash_name, hash_obj)
* Creates a new key with innerhash_name and assigns it to the result of running `new Hash(hash_obj)`.  
   
### h`set`(function_variable)  
* Adds a new method to the Hash object as non-enumerable and write-protected.  
   
### h`set`(function(...){...})  
* Same as above.  
   
### h`const`(key, value)  
* Same as `h.set(key, value, 'const')`  

NOTE: that since any inner object is also a Hash object, they will also have Hash methods available to them. So, for example, 
if you have a hash with two nested hashes you can do these:  

```javascript
var inner1 = hash.get(inner);
var inner2 = hash.inner.get(innerinner);
``` 

## Size Information Methods
  
### h`isEmpty`()  
* Return true if hash h contains no data key-value pairs (excludes methods)  
  
### h`length`()  
* Returns number data key-value pairs (excludes methods). TODO: add optional  
  
### Mass Assignment & Deletion Methods
    
### h1`mergeIn`(h2) 
* Add the contents of h2 to h1. TODO: add an optional passed function to solve conflicts.

### h1`mergeOut`(h2)
* Return a new hash containing the contents of h1 and h2. TODO: add an optional passed function to solve conflicts.

### h`clear`(optional_boolean)  
* Remove all key-value pairs from hash h. Without the `optional_boolean` the operation is recursive. Provide the argument `false` to prevent inner hashes from being deleted.  
  
## Mapping Enumeration Methods
  
The `this` keyword available inside the passed function in each method below. As is the case in Ruby Hashes, when the value of a 
key-value pair is passed is to the function, assignment to it does not effect the hash data. You must assign to this[key] or hashname[key]. TODO: provide some way to traverse the hash ommitting certain data types to prevent deletion of inner hashes, etc.  
  
### h`each`(function(key, value){...})  
* Applies a function to each key-value pair passing both the key as string and the value as parameters.   
  
### h`eachKey`(function(key){...})  
* Applies a function to each key-value pair passing the key as string parameter. 

### h`eachValue`(function(value){...})  
* Applies a function to each key-value pair passing the value as parameter.  

## Deletion Methods
  
### h`delete`(key)  
* Delete key-value pair and return value from hash h whose key is equal to key
  
The `this` keyword available inside the passed function in each method below.  
  
### h`deleteIf`(function(key, value){...})  
* Delete every key-value pair from hash h for which passed function evaluates to true.   
  
### h`keepIf`(function(key, value){...})  
* Delete every key-value pair from hash h for which passed function evaluates to false. 


## JavaScript Concerns Methods  
    
### h`toJson`() 
* Returns hash object as a JSON string. Of course this also works as a method for nested hashes.  

### h`toJson`(key) 
* Returns sub-hash as a JSON string.  TODO: test test test

### h`logJson`()
* Same as above but it also logs to `console.log`. 
   
### h`logJson`(key)
* Take a guess...   
   
### h`defineProperty`(prop, desc)  
* Define a property with descriptor (runs `Object.defineProperty(this, prop, desc)`)  
  
### h`logDescriptor`()  
* prints output of `Object.getOwnPropertyDescriptor(this, prop)`  




