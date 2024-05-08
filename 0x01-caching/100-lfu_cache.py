#!/usr/bin/python3
"""Defines a class LFUCache that inherits from BaseCaching"""

BaseCaching = __import__('base_caching').BaseCaching


class LFUCache(BaseCaching):
    """Defines a class LFUCache that inherits from BaseCaching"""

    def __init__(self):
        """Constructor"""
        super().__init__()
        self.lfu_keys = []
        self.lfu_count = {}

    def put(self, key, item):
        """Add an item in the cache"""
        if key is None or item is None:
            return

        if key in self.cache_data:
            self.cache_data[key] = item
            return

        if len(self.cache_data) >= BaseCaching.MAX_ITEMS:
            least_frequent = min(self.lfu_count.values())
            least_frequent_keys = [k for k, v in self.lfu_count.items() if v == least_frequent]
            lru_key = min(least_frequent_keys, key=lambda k: self.lfu_keys.index(k))
            del self.cache_data[lru_key]
            del self.lfu_count[lru_key]
            self.lfu_keys.remove(lru_key)
            print("DISCARD:", lru_key)

        self.cache_data[key] = item
        self.lfu_count[key] = 0
        self.lfu_keys.append(key)

    def get(self, key):
        """Retrieve an item from the cache"""
        if key is None or key not in self.cache_data:
            return None

        self.lfu_count[key] += 1
        return self.cache_data[key]
