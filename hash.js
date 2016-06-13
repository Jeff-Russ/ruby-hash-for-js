#!/usr/bin/env node

exports.Hash = function(arg1) {
  // see below Object.defineProperties for constructor with args

  Object.defineProperties(this, {
    // see below Object.defineProperties for constructor with args

    mergeIn: // needs optional block to solve conflicts
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
    mergeIn: { // needs optional block to solve conflicts
      value: function(hash, opt_func) { return this.mergeHashes(hash, this); }
    },
    mergeOut: { // needs optional block to solve conflicts
      value: function(hash, opt_func)
      { var copy = this.mergeHashes(this, {});
        return this.mergeHashes(hash, copy);
      }
    },

    );
  // constructor with args:
  if (arg1 instanceof Object) { this.mergeIn(arg1, this); }
}

//_______________________________________________________________________
exports.globalize = function(){
  for(var p in this){if(this.hasOwnProperty(p))global[p]=global[p]||this[p];}};