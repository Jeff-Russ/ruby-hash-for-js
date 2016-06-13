#!/usr/bin/env node

exports.Hash = function(arg1) {
  // see below Object.defineProperties for constructor with args

  Object.defineProperties(this, {
    // see below Object.defineProperties for constructor with args

    // DEPENDENCIES ===========================================================

    mergeHashes: // needs optional block to solve conflicts
    { value: function(src, dest) {

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
      }
    },

    // Getter and Setter Methods ==============================================

    get:
    { value: function(arg)
      { if (arg === undefined) { return mergeHashes(this, {}); }
        else if (this.hasOwnProperty(arg)) {
          var type = typeof this[arg];
          if (type === 'object') {return mergeHashes(this[arg], {});}
          if (type !== 'function') {return this[arg];}
        }
      }
    },
    set:
    { value: function(prop, value, constant)
      { if (typeof value === 'object') {
          this[prop] = new Hash(value);
          return;
        } else if (typeof value !== 'function') {
          var desc = {
            value: value,
            enumerable: true,
            writable: constant !== "const",
          };
        }
        else var desc = { value: value };
        desc.configurable === true;
        Object.defineProperty(this, prop, desc);
      }
    },
    const:
    { value: function(prop, value)
      { var type = typeof value;
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
      }
    },

    // Size Information Methods ===============================================
    
    isEmpty:
    { value: function()
      { var count = 0;
        for (var p in this) {
          if (this.hasOwnProperty(p) && typeof this[p] !== 'function') { count++;}
        }
        return count === 0;
      }
    },
    length:
    { value: function()
      { var count = 0;
        for (var p in this) {
          if (this.hasOwnProperty(p) && typeof this[p] !== 'function') { count++;}
        }
        return count;
      }
    },

    // Mass Assignment & Deletion Methods ====================================

    mergeIn: { // needs optional block to solve conflicts
      value: function(hash, opt_func) { return this.mergeHashes(hash, this); }
    },
    mergeOut: { // needs optional block to solve conflicts
      value: function(hash, opt_func)
      { var copy = this.mergeHashes(this, {});
        return this.mergeHashes(hash, copy);
      }
    },
    clear:
    { value: function(recurse_bool)
      { if (recurse_bool === undefined) { var recurse = true; } // default is to resurse
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
      }
    },

    // Mapping Enumeration Methods ============================================

    each:
    { value: function(fn)
      { for (var prop in this) {
          if (this.hasOwnProperty(prop)) { fn.call(this, prop, this[prop]); }
        }
      }
    },
    eachKey:
    { value: function(fn)
      { for (var prop in this) {
          if (this.hasOwnProperty(prop)) { fn.call(this, prop); }
        }
      }
    },
    eachValue:
    { value: function(fn)
      { for (var prop in this) {
          if (this.hasOwnProperty(prop)) { fn.call(this, this[prop]); }
        }
      }
    },

    // Deletion Methods =======================================================

    delete:
    { value: function(prop)
      { var type = typeof this[prop], val;
        if (this.hasOwnProperty(prop) && type !== 'object' && type !== 'function') {
          val = this[prop];
          delete this[prop];
        }
        return val;
      }
    },
    deleteIf:
    { value: function(func, recurse_bool)
      { if (recurse_bool === undefined) { var recurse = true; } // default is to resurse
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
      }
    },
    keepIf:
    { value: function(func, recurse_bool)
      { if (recurse_bool === undefined) { var recurse = true; } // default is to resurse
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
      }
    },

    // JavaScript Concerns Methods ============================================

    toJson:
    { value: function(prop)
      { if (prop === undefined) return JSON.stringify(this);
        else return JSON.stringify(this[prop]);
      }
    },
    logJson:
    { value: function(prop)
      { var json;
        if (prop === undefined) {
          json = JSON.stringify(this);
          console.log(json);
        } else {
          json = JSON.stringify(this[prop]);
          console.log(json);
        }
        return json;
      }
    },
    defineProperty: // define a property with descriptor
    { value: function(prop, desc) {
        Object.defineProperty(this, prop, desc);
      }
    },
    logDescriptor:
    { value: function(prop)
      { if (prop === undefined) { console.log(this); }
        else  {
          console.log ('\n'+prop+': ')
          console.log (Object.getOwnPropertyDescriptor(this, prop));
        }
      }
    },

  });
  // constructor with args:
  if (arg1 instanceof Object) { this.mergeHashes(arg1, this); }
}

//_______________________________________________________________________
exports.globalize = function(){
  for(var p in this){if(this.hasOwnProperty(p))global[p]=global[p]||this[p];}};