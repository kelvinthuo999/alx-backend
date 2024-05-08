#!/usr/bin/env python3
"""LRUCache module"""

from base_caching import BaseCaching


class LRUCache(BaseCaching):
    """LRUCache class"""

    def __init__(self):
        """Initialize"""
        super().__init__()
        self.queue = []

    def put(self, key, item):
        """Add an item in the cache"""
        if key is None or item is None:
            return

        if len(self.cache_data) >= self.MAX_ITEMS:
            discarded_key = self.queue.pop(0)
            del self.cache_data[discarded_key]
            print("DISCARD:", discarded_key)

        if key in self.cache_data:
            self.queue.remove(key)
        self.cache_data[key] = item
        self.queue.append(key)

    def get(self, key):
        """Get an item by key"""
        if key is None or key not in self.cache_data:
            return None

        self.queue.remove(key)
        self.queue.append(key)
        return self.cache_data[key]
