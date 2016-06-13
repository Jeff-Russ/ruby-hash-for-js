#!/usr/bin/env node

//______require('thisfile').globalize();_________________________________
exports.globalize = function(){
  for(var p in this){ if(this.hasOwnProperty(p) && p !== 'globalize')
    global[p] = global[p] || this[p];}};
//_______________________________________________________________________


exports.Hash = function(arg1) {
  if (arg1 instanceof Object) {
    exports.Hash.prototype.mergeHashes(arg1, this);
  }
}
var HashProto = exports.Hash.prototype;

// DEPENDENCIES ===========================================================

// needs optional block to solve conflicts
HashProto.mergeHashes = function(src, dest) {
  for (var prop in src) {
    if (src.hasOwnProperty(prop) && dest[prop] === undefined) {
      var type = typeof src[prop];

      if (type === 'object') {
        dest[prop] = new Hash(src[prop]);

      } else if (type !== 'function' && prop === prop.toUpperCase()) {
        Object.defineProperty(this,prop,{
          configurable: true,
          enumerable: true,
        });
      } else if (type !== 'function') {
        dest[prop] = src[prop];
      } else {
        Object.defineProperty(this,prop,{
          value: src[prop],
          configurable:true,
        });
      }
    }
  }
  return dest;
};

// Getter and Setter Methods ==============================================

HashProto.get = function(arg) {
  if (arg === undefined) { return mergeHashes(this, {}); }
  else if (this.hasOwnProperty(arg)) {
    var type = typeof this[arg];
    if (type === 'object') {return mergeHashes(this[arg], {});}
    if (type !== 'function') {return this[arg];}
  }
};

HashProto.set = function(prop, value, constant) {
  if (typeof value === 'object') {
    this[prop] = new Hash(value);
    return;
  } else if (typeof value !== 'function') {
    var desc = {
      value: value,
      enumerable: true,
      writable: constant !== "const",
    };
  } else var desc = { value: value };
  desc.configurable === true;
  Object.defineProperty(this, prop, desc);
};

HashProto.const = function(prop, value) {
  var type = typeof value;
  if (type === 'object' || type === 'function') {
    console.error("Hash.const can't be used for adding "+type+'s');
    return; 
  } else {
    var desc = {
      value: value,
      configurable: true,
      writable: false,
      enumerable: true,
    };
    Object.defineProperty(this, prop, desc);
  }
};

// Size Information Methods ===============================================
  
HashProto.isEmpty = function() {
  var count = 0;
  for (var p in this) {
    if (this.hasOwnProperty(p) && typeof this[p] !== 'function') { count++;}
  }
  return count === 0;
};

HashProto.length = function() {
  var count = 0;
  for (var p in this) {
    if (this.hasOwnProperty(p) && typeof this[p] !== 'function') { count++;}
  }
  return count;
};

// Mass Assignment & Deletion Methods ====================================

// needs optional block to solve conflicts
HashProto.mergeIn = function(hash, opt_func) {
  return this.mergeHashes(hash, this);
};

// needs optional block to solve conflicts
HashProto.mergeOut = function(hash, opt_func) {
  var copy = this.mergeHashes(this, {});
  return this.mergeHashes(hash, copy);
};

HashProto.clear = function(recurse_bool) {
  // default is to resurse:
  if (recurse_bool === undefined) { var recurse = true; }
  else { var recurse = recurse_bool; }

  if (recurse) {
    for (var p in this) {
      if (this.hasOwnProperty(p) && typeof this[p] !== 'function') {
        delete this[p];
      }
    }
  } else {
    for (var p in this) {
      if (this.hasOwnProperty(p) && typeof this[p] !== 'function' &&
          typeof this[p] !== 'object') {
        delete this[p];
      }
    }
  }
};

// Mapping Enumeration Methods ============================================

HashProto.each = function(fn) {
  for (var prop in this) {
    if (this.hasOwnProperty(prop)) { fn.call(this, prop, this[prop]); }
  }
};

HashProto.eachKey = function(fn) {
  for (var prop in this) {
    if (this.hasOwnProperty(prop)) { fn.call(this, prop); }
  }
};

HashProto.eachValue = function(fn) {
  for (var prop in this) {
    if (this.hasOwnProperty(prop)) { fn.call(this, this[prop]); }
  }
};

// Other Enumeration Methods ==============================================

HashProto.isAny = function(fn) {
  var bool = false;
  for (var prop in this) {
    if (this.hasOwnProperty(prop)) {
      if (fn.call(this, prop, this[prop])) {
        return true;
      }
    }
  }
  return false;
};

HashProto.getRejected = function(fn) {
  var ret = {};
  for (var prop in this) {
    if (this.hasOwnProperty(prop)) {
      if (! fn.call(this, prop, this[prop])) {
        ret[prop] = this[prop];
      }
    }
  }
  return ret;
};

// Deletion Methods =======================================================

HashProto.delete = function(prop) {
  var type = typeof this[prop], val;
  if (this.hasOwnProperty(prop) && type !== 'object' && type !== 'function') {
    val = this[prop];
    delete this[prop];
  }
  return val;
};

HashProto.deleteIf = function(func, recurse_bool) {
  // default is to resurse:
  if (recurse_bool === undefined) { var recurse = true; }
  else { var recurse = recurse_bool; }

  if (recurse) {
    for (var p in this) {
      if (this.hasOwnProperty(p) && typeof this[p] !== 'function') {
        if (func.call(this, p, this[p])) delete this[p];
      }
    }
  } else {
    for (var p in this) {
      if (this.hasOwnProperty(p) && typeof this[p] !== 'function' &&
          typeof this[p] !== 'object') {
        if (func.call(this, p, this[p])) delete this[p];
      }
    }
  }
};

HashProto.keepIf = function(func, recurse_bool) {
  if (recurse_bool === undefined) { var recurse = true; } // default is to resurse
  else { var recurse = recurse_bool; }

  if (recurse) {
    for (var p in this) {
      if (this.hasOwnProperty(p) && typeof this[p] !== 'function') {
        if (! func.call(this, p, this[p])) delete this[p];
      }
    }
  } else {
    for (var p in this) {
      if (this.hasOwnProperty(p) && typeof this[p] !== 'function' &&
          typeof this[p] !== 'object') {
        if (! func.call(this, p, this[p])) delete this[p];
      }
    }
  }
};

// JavaScript Concerns Methods ============================================

HashProto.toJson = function(prop) {
  if (prop === undefined) return JSON.stringify(this);
  else return JSON.stringify(this[prop]);
};

HashProto.logJson = function(prop) {
  var json;
  if (prop === undefined) {
    json = JSON.stringify(this);
    console.log(json);
  } else {
    json = JSON.stringify(this[prop]);
    console.log(json);
  }
  return json;
};

HashProto.defineProperty = function(prop, desc) {
  // define a property with descriptor
  Object.defineProperty(this, prop, desc);
}

HashProto.logDescriptor = function(prop) {
  if (prop === undefined) { console.log(this); }
  else {
    console.log ('\n'+prop+': ')
    console.log (Object.getOwnPropertyDescriptor(this, prop));
  }
};

