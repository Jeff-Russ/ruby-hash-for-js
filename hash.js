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
    // Basic Assignment & Deletion Methods ====================================

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
    // Size Information Methods ===============================================

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
    // Deletion Enumeration Methods ===========================================

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
    );
  // constructor with args:
  if (arg1 instanceof Object) { this.mergeHashes(arg1, this); }
}

//_______________________________________________________________________
exports.globalize = function(){
  for(var p in this){if(this.hasOwnProperty(p))global[p]=global[p]||this[p];}};