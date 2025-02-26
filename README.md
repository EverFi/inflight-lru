# inflight-lru

## Description
This package is intended as a replacement for the [deprecated inflight](https://github.com/isaacs/inflight-DEPRECATED-DO-NOT-USE) using the suggested [LRU Cache](https://www.npmjs.com/package/lru-cache) underneath instead.
It maintains the same API structure as the old inflight so it can be set as a resolution in the package.json for use with yarn:

```
{
  "resolutions": {
    "inflight": "npm:inflight@^1.0.0",
  }
}
```

## Releases
This package is published manually, please be sure to tag the commit you publish
