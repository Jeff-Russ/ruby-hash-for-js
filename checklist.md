This file is just for development purposes

[](
1. Basics I
	h1 == h2 Return true if h1 and h2 contain the same number of keys and if each key-value pair is equal
	h[key] Element Reference - retrieve the value object corresponding to the key object of hash h
	h[key] = value Set the value of key of hash h
DONE h.clear Remove all key-value pairs from hash h
	h.empty? Return true if hash h contains no key-value pairs
	h.length Return the number of key-value pairs in hash h (option 1)
2. Enumerating I
	h.delete_if Delete every key-value pair from hash h for which block evaluates to true
	h.each Call block once for each key in hash h, passing the key-value pair as parameters (option 1)
	h.each_key Call block once for each key in hash h, passing the key as a parameter
	h.each_value Call block once for each key in hash h, passing the value as a parameter
	h.keep_if Delete every key-value pair from h for which block evaluates to false
3. Enumerating II
	h.any? Pass each key, value of hash h to a block and return true if given block ever returns a value other than false or nil.
	h.each_pair Call block once for each key in hash h, passing the key-value pair as parameters (option 2)
	h.reject Return a new hash consisting of entries for which the block returns false of hash h
	h.reject! Equivalent to delete_if, but return nil if no changes were made to hash h
	h.select Return a new hash consistent of entries for which the block returns true for hash h
	h.select! Equivalent to keep_if, but return true if no changes were made to hash h
4. Keys I
	h.delete(key) Delete key-value pair and return value from hash h whose key is equal to key
	h.has_key?(key) Return true if the given key is present in hash h (option 1)
	h.include?(key) Return true if the given key is present in hash h (option 2)
	h.key(value) Return the key of an occurrence of a given value in hash h
	h.key?(key) Return true if the given key is present in hash h (option 3)
	h.keys Return a new array populated with the keys from hash h
	h.member?(key) Return true if the given key is present in hash h (option 4)
5. Values I
	h.default Return default value of hash h
	h.default = obj Set default value of hash h to obj
	h.default_proc If hash h was invoked with a block, return that block
	h.default_proc = block Set default proc of hash h to be executed on each failed key lookup of h
	h.fetch(key) Return a value from hash h for key. Raise exception if key not found.
	h.has_value?(value) Return true if the given value is present for some key in hash h (option 1)
	h.value?(value) Return true if the given value is present for some key in hash h (option 2)
	h.values Return a new array populated with the values from hash h
	h.values_at(key1, key2) Return an array containing the values associated with the given keys key1 and key2 of hash h
6. General I
	h1.eql?(h2)Return true if h1 and h2 are both hashes with the same content
	h.flatten Return a new array that is a one-dimensional flattening of hash h
	h.invert Return a new hash created by using hash h's values as keys, and the keys as values
	h1.merge(h2) Return a new hash containing the contents of h1 and h2 (use an optional block to solve conflicts)
	h1.merge!(h2) Add the contents of h2 to h1 (use an optional block to solve conflicts)
	h.shift Remove a key-value pair from hash h and return it as the two item array [key,value]
	h.size Return the number of key-value pairs in hash h (option 2)
	h.to_a Convert hash h to a nested array of [key,value] arrays
7. General II
	h.assoc(obj) Search through hash h comparing obj with each key and return the key-value pair as a two element array
	h.compare_by_identity Make hash h compare its keys by their identity (exact same objects)
	h.compare_by_identity? Return true if hash h will compare its keys by identity
	h.hash Compute a hash-code for hash h
	h.to_s Return the contents of hash h as string
	h.rassoc(obj) Search through the hash comparing obj with the values of hash h. Return first k-v pair (two element array) that matches
	h.rehash Rebuild hash h based on the current hash values for each key
)