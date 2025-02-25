var { LRUCache } = require('lru-cache');
var wrappy = require('wrappy');
var once = require('once');

var options = {
  ttlAutopurge: true,
  ttl: 1000 * 60 * 5,
};
var cache = new LRUCache(options);

function inflight(key, cb) {
  if (cache.has(key)) {
    const cached = cache.get(key);
    cached.push(cb);
    cache.set(key, cached);
    return null;
  } else {
    cache.set(key, [cb]);
    return makeres(key);
  }
}

function makeres(key) {
  return once(function RES() {
    var cbs = cache.get(key);
    var len = cbs.length;
    var args = slice(arguments);

    try {
      for (var i = 0; i < len; i++) {
        cbs[i].apply(null, args);
      }
    } finally {
      if (cbs.length > len) {
        // added more in the interim.
        // de-zalgo, just in case, but don't call again.
        cbs.splice(0, len);
        process.nextTick(function () {
          RES.apply(null, args);
        });
      } else {
        cache.delete(key);
      }
    }
  });
}

function slice(args) {
  var length = args.length;
  var array = [];

  for (var i = 0; i < length; i++) array[i] = args[i];
  return array;
}

module.exports = wrappy(inflight);
