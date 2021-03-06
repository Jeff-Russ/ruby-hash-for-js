# JS Hash

# WARNING  
This is not any sort of release as of now. It's still in early stages of design.  

## Ruby Style Hashes for JavaScript

[on GitHub](http://github.com/Jeff-Russ/ruby-hash-for-js)  
	
This is a JavaScript implementation of the Ruby `Hash` class. Objects made from the `Hash` constructor provided here create hash objects that contain most of the methods of the Ruby hashes.   

### Why?  

Hashes can be declared in Ruby with a syntax very similar to how you would declare an object literal in JavaScript. The difference is that in Ruby, you are left with a data container that has many helpful methods available on it. Adding methods in object literal notation causes the methods themselves to be treated as enumerable data. Also, you wouldn't want to keep defining the same methods over and over every time you make a new object.  

This `Hash` class allows you to construct object with the object literal notation with all of the convenient methods already added and configured to stay out of the way, giving the appearance of a pure data object.  

## Structure of a Hash object

Conceptually, these `Hash` objects have two sides, the enumerable data side and the non-enumerable method side. The data side will only allow:  
1. Strings
2. Booleans
3. Numbers
4. Null
5. Undefined
6. Other `Hash` objects

When you create object that has nested objects, the `Hash` constructor method is called recursively so that these inner object also have the same helpful methods directly available to them. You can also add inner objects later, of course, and the objects will still become `Hash` objects themselves.  

TODO: If the `Hash` class comes across a function definition, it will redefine it with a custom descriptor, preventing it from being enumerable.  

Objects added to a hash Object are essentially stripped of their prototypal  baggage if any is found. TODO: Functions will survive but will be protected from accidental reassignment and enumeration.  

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
    
#### `get`  
- `h.get()`without any argument returns a copy of the entire hash object h. 
- `h.get(key)` returns value of key containing data.  
- `h.get(nested_hash_name)` returns a new hash containing the contents of inner hash.  
    
#### `set`  
- `h.set(key, value)` assigns a new value to existing key or creates a new one. TODO: make all-uppercase keys create constants automatically.  
- `h.set(key, value, 'const')` assigns a new readonly value to existing key or creates a new one.   
- `h.set(innerhash_name, hash_obj)` creates a new key with innerhash_name and assigns it to the result of running `new Hash(hash_obj)`.  
- `h.set(function_variable)` adds a new method to the Hash object as non-enumerable and write-protected. TODO: test this  
- `h.set(function(...){...})` Same as above.  
- `h.const(key, value)` Same as `h.set(key, value, 'const')`  

NOTE: that since any inner object is also a Hash object, they will also have Hash methods available to them. So, for example, 
if you have a hash with two nested hashes you can do these:  

```javascript
var inner1 = hash.get(inner);
var inner2 = hash.inner.get(innerinner);
``` 

## Size Information Methods
  
#### `isEmpty`  
- `h.isEmpty()` returns true if hash h contains no data key-value pairs (excludes methods)  

#### `length`  
- `h.length()` returns number data key-value pairs (excludes methods). TODO: add optional  
  
### Mass Assignment & Deletion Methods
    
#### `mergeIn`
- `h1.mergeIn(h2)` add the contents of h2 to h1. TODO: add an optional passed function to solve conflicts.  

#### `mergeOut`  
- `h1.mergeOut(h2)` return a new hash containing the contents of h1 and h2. TODO: add an optional passed function to solve conflicts.

#### `clear`  
- `h.clear(optional_boolean)` removes all key-value pairs from hash h. Without the `optional_boolean` the operation is recursive. Provide the argument `false` to prevent inner hashes from being deleted.  
  
## Mapping Enumeration Methods
  
The `this` keyword available inside the passed function in each method below. As is the case in Ruby Hashes, when the value of a 
key-value pair is passed is to the function, assignment to it does not effect the hash data. You must assign to this[key] or hashname[key]. TODO: provide some way to traverse the hash ommitting certain data types to prevent deletion of inner hashes, etc.  
  
#### `each`  
- `h.each(function(key, value){...})` applies a function to each key-value pair passing both the key as string and the value as parameters.   

#### `eachKey`  
- `h.eachKey(function(key){...})` applies a function to each key-value pair passing the key as string parameter.  

#### `eachValue`  
- `h.eachValue(function(value){...})` applies a function to each key-value pair passing the value as parameter.  

## Other Enumeration Methods

TODO: say something here!  

## Deletion Methods
  
#### `delete`  
- `h.delete(key)` delete key-value pair and return value from hash h whose key is equal to key
  
The `this` keyword available inside the passed function in each method below:  
  
#### `deleteIf`  
- `h.deleteIf(function(key, value){...})` deletes every key-value pair from hash h for which a passed function evaluates to true.   
  
#### `keepIf`  
- `h.keepIf(function(key, value){...})` deletes every key-value pair from hash h for which a passed function evaluates to false. 


## JavaScript Concerns Methods  
    
#### `toJson`  
- `h.toJson()` returns hash object as a JSON string. Of course this also works as a method for nested hashes.  
- `h.toJson(key)` returns sub-hash as a JSON string.  TODO: test test test
   
#### `defineProperty`  
- `h.defineProperty(prop, desc)` define a property with descriptor (runs `Object.defineProperty(this, prop, desc)`)  
  
#### `logDescriptor`  
- `h.logDescriptor()` prints output of `Object.getOwnPropertyDescriptor(this, prop)`  


[](
http://stackoverflow.com/questions/310870/use-of-prototype-vs-this-in-javascript
http://thecodeship.com/web-development/methods-within-constructor-vs-prototype-in-javascript/
https://www.shortcutfoo.com/app/dojos/ruby-hashes/cheatsheet
http://www.2ality.com/2011/12/fake-operator-overloading.html
)

