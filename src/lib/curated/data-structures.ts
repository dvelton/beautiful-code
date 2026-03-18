import type { CuratedExample } from '../../types';

export const dataStructures: CuratedExample[] = [
{
    id: "linked-list-reversal",
    title: "Linked List In-Place Reversal",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["linked-list", "pointers", "in-place", "reversal", "three-pointer"],
    code: `def reverse_linked_list(head):
    """Reverse a linked list in-place using three pointers"""
    prev = None
    current = head
    
    while current:
        next_node = current.next  # Store next before we lose it
        current.next = prev       # Reverse the link
        prev = current           # Move prev forward
        current = next_node      # Move current forward
    
    return prev  # prev is now the new head

# Example usage with a simple Node class
class ListNode:
    def __init__(self, val=0, next=None):
        self.val = val
        self.next = next
        
    def __str__(self):
        result = []
        current = self
        while current:
            result.append(str(current.val))
            current = current.next
        return " -> ".join(result)

# Create: 1 -> 2 -> 3 -> 4 -> None
head = ListNode(1, ListNode(2, ListNode(3, ListNode(4))))
print(f"Original: {head}")

reversed_head = reverse_linked_list(head)
print(f"Reversed: {reversed_head}")`,
    explanation: "This technique reverses a chain of connected elements by carefully repositioning three 'fingers' as you walk through the chain. You keep track of where you came from, where you are now, and where you're going next. At each step, you flip the arrow to point backwards instead of forwards, then slide all three fingers forward one position.",
    whyElegant: "Uses only three variables to completely reverse a data structure that could have millions of elements, requiring no extra memory and touching each element exactly once.",
    keyInsight: "Reversing a chain requires three pointers because you need to remember the past, present, and future simultaneously to avoid losing connections.",
    analogy: "Like walking through a line of people holding hands, having each person turn around to face the opposite direction - you need to coordinate with the person behind you, the person you're currently helping turn, and know who's next.",
    sourceNote: "Classic algorithm found in Cracking the Coding Interview and countless computer science curricula worldwide."
  },
  {
    id: "balanced-parentheses-stack",
    title: "Stack-Based Balanced Parentheses Checker",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["stack", "parsing", "matching", "brackets", "validation"],
    code: `def is_balanced(s):
    """Check if parentheses, brackets, and braces are properly balanced"""
    stack = []
    mapping = {')': '(', ']': '[', '}': '{'}
    
    for char in s:
        if char in mapping:  # Closing bracket
            if not stack or stack[-1] != mapping[char]:
                return False
            stack.pop()
        elif char in '([{':  # Opening bracket
            stack.append(char)
    
    return len(stack) == 0

# Test cases
test_cases = [
    "()",           # True
    "()[]{}",       # True  
    "(]",           # False
    "([)]",         # False
    "{[()]}",       # True
    "(((",          # False
    ")))",          # False
]

for test in test_cases:
    result = is_balanced(test)
    print(f"'{test}' -> {result}")`,
    explanation: "This uses a stack (like a stack of plates) to match opening and closing brackets. When you see an opening bracket, you put it on the stack. When you see a closing bracket, you check if it matches the most recent opening bracket on top of the stack. If everything matches perfectly, the stack will be empty at the end.",
    whyElegant: "Solves the complex problem of nested bracket matching with a simple rule: every closing bracket must match the most recent unmatched opening bracket.",
    keyInsight: "A stack naturally handles nested structures because the most recently opened bracket should be the first one closed (Last In, First Out).",
    analogy: "Like checking if parentheses in a math equation are balanced - you need to match each closing parenthesis with its corresponding opening one, working from the inside out.",
    sourceNote: "Fundamental parsing algorithm used in compilers, text editors, and mathematical expression evaluators."
  },
  {
    id: "queue-from-stacks",
    title: "Queue Implementation Using Two Stacks",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["queue", "stack", "fifo", "lifo", "data-structure-transformation"],
    code: `class QueueFromStacks:
    """Implement a queue using two stacks"""
    
    def __init__(self):
        self.inbox = []   # For new items
        self.outbox = []  # For items ready to be removed
    
    def enqueue(self, item):
        """Add item to the back of the queue"""
        self.inbox.append(item)
    
    def dequeue(self):
        """Remove and return item from the front of the queue"""
        if not self.outbox:
            # Move all items from inbox to outbox (this reverses order)
            while self.inbox:
                self.outbox.append(self.inbox.pop())
        
        if not self.outbox:
            raise IndexError("Queue is empty")
            
        return self.outbox.pop()
    
    def peek(self):
        """Look at the front item without removing it"""
        if not self.outbox:
            while self.inbox:
                self.outbox.append(self.inbox.pop())
                
        if not self.outbox:
            raise IndexError("Queue is empty")
            
        return self.outbox[-1]
    
    def is_empty(self):
        return len(self.inbox) == 0 and len(self.outbox) == 0

# Example usage
queue = QueueFromStacks()
queue.enqueue("first")
queue.enqueue("second") 
queue.enqueue("third")

print(f"Front item: {queue.peek()}")      # "first"
print(f"Removed: {queue.dequeue()}")      # "first"
print(f"Removed: {queue.dequeue()}")      # "second"
queue.enqueue("fourth")
print(f"Removed: {queue.dequeue()}")      # "third"`,
    explanation: "This creates a first-in-first-out line using two last-in-first-out containers. New items go into one container (inbox), and when you need to remove items, you flip them into the second container (outbox) which reverses their order. This way, the first item that went in becomes the first item that comes out.",
    whyElegant: "Transforms the behavior of one data structure (stack) into another (queue) using the mathematical principle that two negatives make a positive - two reversals restore original order.",
    keyInsight: "Two stacks can simulate a queue because flipping items twice returns them to their original order, making the oldest item accessible first.",
    analogy: "Like using two buckets where you pour new items into one bucket, and when someone wants the oldest item, you pour everything into the second bucket (which flips the order) so the oldest is now on top.",
    sourceNote: "Popular interview question that demonstrates creative problem-solving with fundamental data structures."
  },
  {
    id: "lru-cache-ordered-dict",
    title: "LRU Cache with OrderedDict",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["lru-cache", "ordered-dict", "cache-eviction", "least-recently-used", "O(1)"],
    code: `from collections import OrderedDict

class LRUCache:
    """Least Recently Used cache with O(1) get and put operations"""
    
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = OrderedDict()
    
    def get(self, key):
        """Get value and mark as most recently used"""
        if key not in self.cache:
            return -1
        
        # Move to end (most recent)
        value = self.cache.pop(key)
        self.cache[key] = value
        return value
    
    def put(self, key, value):
        """Put value and mark as most recently used"""
        if key in self.cache:
            # Update existing key
            self.cache.pop(key)
        elif len(self.cache) >= self.capacity:
            # Remove least recently used (first item)
            self.cache.popitem(last=False)
        
        # Add as most recent
        self.cache[key] = value

# Example usage
cache = LRUCache(3)

cache.put("a", 1)
cache.put("b", 2) 
cache.put("c", 3)
print(f"Get 'a': {cache.get('a')}")  # 1, moves 'a' to most recent

cache.put("d", 4)  # Evicts 'b' (least recently used)
print(f"Get 'b': {cache.get('b')}")  # -1 (not found)
print(f"Get 'c': {cache.get('c')}")  # 3
print(f"Get 'd': {cache.get('d')}")  # 4
print(f"Get 'a': {cache.get('a')}")  # 1

# Show internal state
print(f"Cache contents: {dict(cache.cache)}")`,
    explanation: "This creates a smart storage system that remembers the order items were accessed and automatically removes the least recently used item when space runs out. Every time you access an item, it moves to the 'front of the line' for keeping. When you need to make room, the item at the 'back of the line' gets removed.",
    whyElegant: "Achieves both fast lookups (like a hash table) and fast removal of oldest items (like a queue) by combining the best features of both data structures.",
    keyInsight: "OrderedDict provides O(1) access, insertion, and deletion while maintaining insertion order, making it perfect for LRU cache implementation.",
    analogy: "Like organizing your desk where frequently used items stay within reach, and when your desk gets full, you put away the things you haven't touched in the longest time.",
    sourceNote: "Common caching strategy used in operating systems, web browsers, and database management systems."
  },
  {
    id: "trie-insert-search",
    title: "Trie (Prefix Tree) Insert and Search",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["trie", "prefix-tree", "string-search", "autocomplete", "dictionary"],
    code: `class TrieNode:
    """Node in a trie (prefix tree)"""
    def __init__(self):
        self.children = {}  # character -> TrieNode
        self.is_word = False

class Trie:
    """Prefix tree for efficient string storage and search"""
    
    def __init__(self):
        self.root = TrieNode()
    
    def insert(self, word):
        """Insert a word into the trie"""
        node = self.root
        
        for char in word:
            if char not in node.children:
                node.children[char] = TrieNode()
            node = node.children[char]
        
        node.is_word = True
    
    def search(self, word):
        """Return True if word is in the trie"""
        node = self._find_node(word)
        return node is not None and node.is_word
    
    def starts_with(self, prefix):
        """Return True if any word starts with prefix"""
        return self._find_node(prefix) is not None
    
    def _find_node(self, prefix):
        """Helper: find the node representing this prefix"""
        node = self.root
        
        for char in prefix:
            if char not in node.children:
                return None
            node = node.children[char]
            
        return node
    
    def get_words_with_prefix(self, prefix):
        """Return all words that start with prefix"""
        words = []
        prefix_node = self._find_node(prefix)
        
        if prefix_node:
            self._collect_words(prefix_node, prefix, words)
        
        return words
    
    def _collect_words(self, node, current_word, words):
        """Helper: recursively collect all words from a node"""
        if node.is_word:
            words.append(current_word)
        
        for char, child_node in node.children.items():
            self._collect_words(child_node, current_word + char, words)

# Example usage
trie = Trie()

# Insert words
words = ["cat", "cats", "car", "card", "care", "careful", "dog", "dodge"]
for word in words:
    trie.insert(word)

# Search
print(f"Search 'cat': {trie.search('cat')}")       # True
print(f"Search 'ca': {trie.search('ca')}")         # False
print(f"Starts with 'ca': {trie.starts_with('ca')}")  # True

# Get all words with prefix
print(f"Words starting with 'car': {trie.get_words_with_prefix('car')}")`,
    explanation: "This creates a tree where each path from root to a node represents a word prefix. Words are stored by sharing common beginnings - like how 'cat' and 'car' share 'ca'. To find a word, you follow the path letter by letter. To find all words with a prefix, you go to that prefix's node and collect everything below it.",
    whyElegant: "Eliminates redundant storage of common prefixes while enabling lightning-fast prefix searches and autocomplete features that scale with prefix length, not dictionary size.",
    keyInsight: "Tries trade space for time by sharing common prefixes, making searches proportional to word length rather than dictionary size.",
    analogy: "Like a filing system where folders are shared - 'California' and 'Canada' both go in the 'CA' folder, and 'Carolina' goes in the 'CAR' subfolder under 'CA'.",
    sourceNote: "Fundamental data structure in text processing, used in autocomplete, spell checkers, and IP routing tables."
  },
  {
    id: "union-find-path-compression",
    title: "Union-Find with Path Compression and Union by Rank",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["union-find", "disjoint-set", "path-compression", "union-by-rank", "connectivity"],
    code: `class UnionFind:
    """Disjoint set union with path compression and union by rank"""
    
    def __init__(self, n):
        self.parent = list(range(n))  # Each element is its own parent initially
        self.rank = [0] * n          # Height of tree rooted at i
        self.components = n          # Number of connected components
    
    def find(self, x):
        """Find root of x with path compression"""
        if self.parent[x] != x:
            # Path compression: make x point directly to root
            self.parent[x] = self.find(self.parent[x])
        return self.parent[x]
    
    def union(self, x, y):
        """Union two sets containing x and y"""
        root_x = self.find(x)
        root_y = self.find(y)
        
        if root_x == root_y:
            return False  # Already connected
        
        # Union by rank: attach smaller tree under bigger tree
        if self.rank[root_x] < self.rank[root_y]:
            self.parent[root_x] = root_y
        elif self.rank[root_x] > self.rank[root_y]:
            self.parent[root_y] = root_x
        else:
            self.parent[root_y] = root_x
            self.rank[root_x] += 1
        
        self.components -= 1
        return True
    
    def connected(self, x, y):
        """Check if x and y are in the same connected component"""
        return self.find(x) == self.find(y)
    
    def get_components(self):
        """Return number of connected components"""
        return self.components

# Example: Social network connections
print("Social Network Example:")
friends = UnionFind(6)  # People 0, 1, 2, 3, 4, 5

# Add friendships
friendships = [(0, 1), (1, 2), (3, 4), (4, 5)]
for person1, person2 in friendships:
    friends.union(person1, person2)
    print(f"Connected {person1} and {person2}")

print(f"\\nConnected components: {friends.get_components()}")
print(f"Are 0 and 2 connected? {friends.connected(0, 2)}")  # True (through 1)
print(f"Are 0 and 3 connected? {friends.connected(0, 3)}")  # False

# Example: Network connectivity
print("\\nNetwork Connectivity Example:")
network = UnionFind(5)
connections = [(0, 1), (2, 3), (1, 4), (3, 4)]

for a, b in connections:
    if network.union(a, b):
        print(f"Added connection {a}-{b}")
    else:
        print(f"Connection {a}-{b} already exists")
        
print(f"Final components: {network.get_components()}")`,
    explanation: "This data structure efficiently tracks groups of connected items and can quickly tell if two items belong to the same group. It uses two clever optimizations: when finding a group leader, it shortens all paths to the leader (path compression), and when merging groups, it attaches the smaller group under the larger one (union by rank) to keep trees shallow.",
    whyElegant: "Achieves nearly constant time operations for connectivity queries through two simple optimizations that prevent the data structure from becoming inefficiently deep.",
    keyInsight: "Path compression flattens trees during searches, while union by rank keeps trees balanced, together making operations almost O(1) in practice.",
    analogy: "Like organizing people into groups where each group has a leader, and you optimize by making everyone point directly to their leader (path compression) and always putting smaller groups under larger group leaders (union by rank).",
    sourceNote: "Essential algorithm for network connectivity, image processing (connected components), and Kruskal's minimum spanning tree algorithm."
  },
  {
    id: "skip-list-probabilistic",
    title: "Skip List with Probabilistic Level Assignment",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["skip-list", "probabilistic", "randomized", "multi-level", "search-structure"],
    code: `import random
from typing import Optional

class SkipListNode:
    """Node in a skip list with multiple forward pointers"""
    def __init__(self, key, value, level):
        self.key = key
        self.value = value
        self.forward = [None] * (level + 1)  # Array of forward pointers

class SkipList:
    """Probabilistic data structure for fast search, insert, delete"""
    
    def __init__(self, max_level=16, p=0.5):
        self.max_level = max_level
        self.p = p  # Probability of promoting to next level
        self.level = 0
        
        # Create header node with maximum level
        self.header = SkipListNode(float('-inf'), None, max_level)
    
    def random_level(self):
        """Generate random level for new node"""
        level = 0
        while random.random() < self.p and level < self.max_level:
            level += 1
        return level
    
    def search(self, key):
        """Search for a key in the skip list"""
        current = self.header
        
        # Start from highest level and work down
        for i in range(self.level, -1, -1):
            # Move forward while next key is less than search key
            while (current.forward[i] and 
                   current.forward[i].key < key):
                current = current.forward[i]
        
        # Move to level 0 and check if we found the key
        current = current.forward[0]
        return current.value if current and current.key == key else None
    
    def insert(self, key, value):
        """Insert a key-value pair"""
        update = [None] * (self.max_level + 1)
        current = self.header
        
        # Find insertion point at each level
        for i in range(self.level, -1, -1):
            while (current.forward[i] and 
                   current.forward[i].key < key):
                current = current.forward[i]
            update[i] = current
        
        current = current.forward[0]
        
        # If key already exists, update value
        if current and current.key == key:
            current.value = value
            return
        
        # Create new node with random level
        new_level = self.random_level()
        new_node = SkipListNode(key, value, new_level)
        
        # If new level is higher than current max, update headers
        if new_level > self.level:
            for i in range(self.level + 1, new_level + 1):
                update[i] = self.header
            self.level = new_level
        
        # Update forward pointers
        for i in range(new_level + 1):
            new_node.forward[i] = update[i].forward[i]
            update[i].forward[i] = new_node
    
    def display(self):
        """Display the skip list structure"""
        for level in range(self.level, -1, -1):
            print(f"Level {level}: ", end="")
            current = self.header.forward[level]
            while current:
                print(f"({current.key}:{current.value})", end=" -> ")
                current = current.forward[level]
            print("None")

# Example usage
skip_list = SkipList()

# Insert some key-value pairs
data = [(3, "three"), (6, "six"), (7, "seven"), (9, "nine"), (12, "twelve"), (19, "nineteen")]
for key, value in data:
    skip_list.insert(key, value)

print("Skip List Structure:")
skip_list.display()

print("\\nSearch Results:")
for key in [6, 8, 12, 20]:
    result = skip_list.search(key)
    print(f"Search {key}: {result if result else 'Not found'}")`,
    explanation: "This creates multiple 'express lanes' above a regular sorted list. When inserting a new item, you flip coins to decide how many levels up it should appear. Higher levels act like express lanes that skip over many lower-level items. When searching, you start at the top level and drop down levels as needed, like taking highway exits.",
    whyElegant: "Uses randomization to achieve the performance benefits of balanced trees without the complexity of rebalancing operations, naturally maintaining logarithmic search times through probabilistic level assignment.",
    keyInsight: "Random promotion creates naturally balanced express lanes that provide logarithmic search performance without deterministic balancing.",
    analogy: "Like a highway system with multiple levels - local roads connect everything, state highways skip some exits, and interstates skip most exits, letting you travel fast by staying high until you need to exit.",
    sourceNote: "Invented by William Pugh in 1989 as a probabilistic alternative to balanced trees, used in Redis and LevelDB."
  },
  {
    id: "bloom-filter-bit-array",
    title: "Bloom Filter with Multiple Hash Functions",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["bloom-filter", "probabilistic", "bit-array", "hash-functions", "membership-test"],
    code: `import hashlib
from typing import List

class BloomFilter:
    """Space-efficient probabilistic data structure for membership testing"""
    
    def __init__(self, size: int, hash_count: int):
        self.size = size
        self.hash_count = hash_count
        self.bit_array = [0] * size
        self.items_added = 0
    
    def _hash_functions(self, item: str) -> List[int]:
        """Generate multiple hash values for an item"""
        hashes = []
        
        # Use different hash algorithms or seeds
        for i in range(self.hash_count):
            # Create different hash by appending counter
            hash_input = f"{item}{i}".encode('utf-8')
            hash_value = int(hashlib.md5(hash_input).hexdigest(), 16)
            hashes.append(hash_value % self.size)
        
        return hashes
    
    def add(self, item: str):
        """Add an item to the bloom filter"""
        hash_values = self._hash_functions(item)
        
        for hash_val in hash_values:
            self.bit_array[hash_val] = 1
        
        self.items_added += 1
    
    def might_contain(self, item: str) -> bool:
        """Check if item might be in the set (no false negatives)"""
        hash_values = self._hash_functions(item)
        
        for hash_val in hash_values:
            if self.bit_array[hash_val] == 0:
                return False  # Definitely not in set
        
        return True  # Might be in set (could be false positive)
    
    def estimated_false_positive_rate(self) -> float:
        """Estimate current false positive probability"""
        # Fraction of bits set to 1
        bits_set = sum(self.bit_array)
        if bits_set == 0:
            return 0.0
        
        # Formula: (bits_set / total_bits)^hash_count
        return (bits_set / self.size) ** self.hash_count
    
    def display_stats(self):
        """Show filter statistics"""
        bits_set = sum(self.bit_array)
        print(f"Items added: {self.items_added}")
        print(f"Bits set: {bits_set}/{self.size} ({bits_set/self.size*100:.1f}%)")
        print(f"Estimated false positive rate: {self.estimated_false_positive_rate():.4f}")

# Example usage
bloom = BloomFilter(size=100, hash_count=3)

# Add some items
websites = ["google.com", "github.com", "stackoverflow.com", "python.org"]
for site in websites:
    bloom.add(site)
    print(f"Added: {site}")

print("\\nMembership Tests:")

# Test known items (should all return True)
for site in websites:
    result = bloom.might_contain(site)
    print(f"'{site}' might be present: {result}")

# Test unknown items (might have false positives)
unknown_sites = ["facebook.com", "twitter.com", "linkedin.com", "amazon.com"]
for site in unknown_sites:
    result = bloom.might_contain(site)
    status = "FALSE POSITIVE!" if result else "Correctly absent"
    print(f"'{site}' might be present: {result} ({status})")

print()
bloom.display_stats()

# Show bit array visualization
print(f"\\nBit array: {''.join(map(str, bloom.bit_array[:20]))}...")`,
    explanation: "This creates a memory-efficient way to track whether you've seen something before, but it's not perfect - it can sometimes say 'yes, I've seen it' when it hasn't (false positive), but it will never say 'no' when it has actually seen it (no false negatives). It works by using multiple hash functions to set bits in an array when adding items and checking those same bits when testing membership.",
    whyElegant: "Achieves extremely compact membership testing with controllable error rates by cleverly trading accuracy for space efficiency using probabilistic bit-setting.",
    keyInsight: "Multiple hash functions distributing items across a bit array creates a space-efficient probabilistic membership test with tunable false positive rates.",
    analogy: "Like marking multiple checkboxes on a form when you visit a website - later you can quickly check if you've been somewhere by seeing if all the right boxes are marked, though occasionally you might get confused if different sites marked the same boxes.",
    sourceNote: "Invented by Burton Howard Bloom in 1970, widely used in databases, web crawlers, and distributed systems for efficient membership testing."
  },
  {
    id: "circular-buffer-mod-arithmetic",
    title: "Circular Buffer with Modular Arithmetic",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["circular-buffer", "ring-buffer", "modular-arithmetic", "fixed-size", "wraparound"],
    code: `class CircularBuffer:
    """Fixed-size buffer that overwrites oldest data when full"""
    
    def __init__(self, capacity):
        self.capacity = capacity
        self.buffer = [None] * capacity
        self.head = 0  # Next write position
        self.tail = 0  # Next read position  
        self.size = 0  # Current number of items
    
    def is_empty(self):
        """Check if buffer is empty"""
        return self.size == 0
    
    def is_full(self):
        """Check if buffer is full"""
        return self.size == self.capacity
    
    def put(self, item):
        """Add item to buffer, overwriting oldest if full"""
        self.buffer[self.head] = item
        self.head = (self.head + 1) % self.capacity
        
        if self.is_full():
            # Buffer is full, overwrite oldest (advance tail)
            self.tail = (self.tail + 1) % self.capacity
        else:
            self.size += 1
    
    def get(self):
        """Remove and return oldest item"""
        if self.is_empty():
            raise IndexError("Buffer is empty")
        
        item = self.buffer[self.tail]
        self.buffer[self.tail] = None  # Clear for clarity
        self.tail = (self.tail + 1) % self.capacity
        self.size -= 1
        
        return item
    
    def peek(self):
        """Return oldest item without removing it"""
        if self.is_empty():
            raise IndexError("Buffer is empty")
        return self.buffer[self.tail]
    
    def display(self):
        """Show buffer state with visual representation"""
        print(f"Buffer (size={self.size}, head={self.head}, tail={self.tail}):")
        
        display_buffer = []
        for i in range(self.capacity):
            value = self.buffer[i]
            if i == self.head and i == self.tail:
                marker = "HT" if self.size > 0 else "E"
            elif i == self.head:
                marker = "H"
            elif i == self.tail:
                marker = "T"
            else:
                marker = " "
            
            display_buffer.append(f"[{value}]{marker}")
        
        print("  " + " ".join(display_buffer))
        print("  H=head(write), T=tail(read), E=empty")

# Example usage - Data logging system
print("Circular Buffer Example - Data Logger:")
logger = CircularBuffer(5)

# Fill buffer
print("\\n1. Adding initial data:")
for i in range(7):  # More than capacity
    data_point = f"data_{i}"
    logger.put(data_point)
    print(f"Added {data_point}")
    logger.display()

print("\\n2. Reading some data:")
for _ in range(3):
    item = logger.get()
    print(f"Retrieved: {item}")
    logger.display()

print("\\n3. Adding more data:")
for i in range(7, 10):
    data_point = f"data_{i}" 
    logger.put(data_point)
    print(f"Added {data_point}")
    logger.display()

# Example usage - Audio buffer
print("\\n\\nCircular Buffer Example - Audio Streaming:")
audio_buffer = CircularBuffer(4)

# Simulate audio streaming
samples = ["♪", "♫", "♪♪", "♫♫", "♪♫", "♫♪"]
print("Simulating audio sample buffer:")

for sample in samples:
    audio_buffer.put(sample)
    print(f"Buffered: {sample}")
    
    # Process every other sample
    if len([x for x in audio_buffer.buffer if x is not None]) >= 2:
        processed = audio_buffer.get()
        print(f"  -> Played: {processed}")
    
    audio_buffer.display()`,
    explanation: "This creates a fixed-size storage that acts like a circular track. You have a write pointer and a read pointer that move around the circle. When you run out of space, new data overwrites the oldest data automatically. The magic is using modular arithmetic (%) to wrap pointers back to the beginning when they reach the end.",
    whyElegant: "Provides constant-time operations for a sliding window of recent data while elegantly handling wraparound using modular arithmetic instead of complex boundary checking.",
    keyInsight: "Modular arithmetic (%) automatically handles wraparound in fixed-size arrays, enabling efficient circular data structures without boundary checks.",
    analogy: "Like a circular parking lot with entrance and exit gates that move around the circle - when you reach the last parking spot, the next car goes to the first spot, automatically overwriting the oldest parked car.",
    sourceNote: "Fundamental data structure used in audio processing, network buffers, and real-time systems where bounded memory and overwrite behavior are desired."
  },
  {
    id: "segment-tree-range-query",
    title: "Segment Tree for Range Sum Queries",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["segment-tree", "range-query", "binary-tree", "divide-conquer", "preprocessing"],
    code: `class SegmentTree:
    """Binary tree for efficient range queries and updates"""
    
    def __init__(self, arr):
        self.n = len(arr)
        # Tree needs 4*n space in worst case
        self.tree = [0] * (4 * self.n)
        self.build(arr, 0, 0, self.n - 1)
    
    def build(self, arr, node, start, end):
        """Build the segment tree recursively"""
        if start == end:
            # Leaf node - single element
            self.tree[node] = arr[start]
        else:
            # Internal node - sum of children
            mid = (start + end) // 2
            left_child = 2 * node + 1
            right_child = 2 * node + 2
            
            self.build(arr, left_child, start, mid)
            self.build(arr, right_child, mid + 1, end)
            
            # Current node value is sum of its children
            self.tree[node] = self.tree[left_child] + self.tree[right_child]
    
    def query_range(self, left, right):
        """Query sum of elements from index left to right (inclusive)"""
        return self._query(0, 0, self.n - 1, left, right)
    
    def _query(self, node, start, end, left, right):
        """Internal recursive query method"""
        if right < start or left > end:
            # No overlap
            return 0
        
        if left <= start and end <= right:
            # Complete overlap - return this node's value
            return self.tree[node]
        
        # Partial overlap - query both children
        mid = (start + end) // 2
        left_child = 2 * node + 1
        right_child = 2 * node + 2
        
        left_sum = self._query(left_child, start, mid, left, right)
        right_sum = self._query(right_child, mid + 1, end, left, right)
        
        return left_sum + right_sum
    
    def update(self, index, value):
        """Update element at index to new value"""
        self._update(0, 0, self.n - 1, index, value)
    
    def _update(self, node, start, end, index, value):
        """Internal recursive update method"""
        if start == end:
            # Leaf node - update the value
            self.tree[node] = value
        else:
            mid = (start + end) // 2
            left_child = 2 * node + 1
            right_child = 2 * node + 2
            
            if index <= mid:
                self._update(left_child, start, mid, index, value)
            else:
                self._update(right_child, mid + 1, end, index, value)
            
            # Update current node as sum of children
            self.tree[node] = self.tree[left_child] + self.tree[right_child]
    
    def display_tree(self):
        """Display tree structure for debugging"""
        def print_level(node, start, end, level=0):
            if start <= end:
                indent = "  " * level
                range_str = f"[{start},{end}]" if start != end else f"[{start}]"
                print(f"{indent}Node {node}: {range_str} = {self.tree[node]}")
                
                if start != end:
                    mid = (start + end) // 2
                    print_level(2*node+1, start, mid, level+1)
                    print_level(2*node+2, mid+1, end, level+1)
        
        print("Segment Tree Structure:")
        print_level(0, 0, self.n-1)

# Example usage
print("Segment Tree Example:")
arr = [1, 3, 5, 7, 9, 11]
seg_tree = SegmentTree(arr)

print(f"Original array: {arr}")
seg_tree.display_tree()

print("\\nRange Sum Queries:")
queries = [(1, 3), (2, 4), (0, 5), (1, 1)]
for left, right in queries:
    result = seg_tree.query_range(left, right)
    subarray = arr[left:right+1]
    print(f"Sum of range [{left}, {right}]: {result} (elements: {subarray})")

print("\\nUpdate Operations:")
print("Updating index 2 from 5 to 10")
seg_tree.update(2, 10)
arr[2] = 10  # Update our reference array too

print(f"Updated array: {arr}")

print("\\nRange Sum Queries After Update:")
for left, right in queries:
    result = seg_tree.query_range(left, right)
    subarray = arr[left:right+1]
    print(f"Sum of range [{left}, {right}]: {result} (elements: {subarray})")`,
    explanation: "This builds a binary tree where each node represents a range of the original array and stores the sum of that range. Leaf nodes represent single elements, and each internal node represents the sum of its children's ranges. To answer range queries, you navigate the tree and combine results from nodes that together cover your query range.",
    whyElegant: "Preprocesses range information into a tree structure that enables both range queries and updates in logarithmic time, dramatically faster than scanning arrays repeatedly.",
    keyInsight: "By storing precomputed range sums in a binary tree structure, complex range operations become simple tree traversals with logarithmic complexity.",
    analogy: "Like an organizational hierarchy where each manager knows the total budget of everyone under them - to find the budget for a department, you ask the right managers and combine their totals instead of counting every individual employee.",
    sourceNote: "Classic data structure used in competitive programming and databases for efficient range query processing, with variations for min/max, GCD, and other associative operations."
  },
{
    id: "fenwick-tree-prefix-sum",
    title: "Fenwick Tree Prefix Sum",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["fenwick-tree", "binary-indexed-tree", "prefix-sum", "range-queries", "update-queries"],
    code: `class FenwickTree:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)
    
    def update(self, i, delta):
        """Add delta to position i (1-indexed)"""
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)  # Add lowest set bit
    
    def query(self, i):
        """Get prefix sum from 1 to i"""
        result = 0
        while i > 0:
            result += self.tree[i]
            i -= i & (-i)  # Remove lowest set bit
        return result
    
    def range_query(self, left, right):
        """Get sum from left to right (1-indexed)"""
        return self.query(right) - self.query(left - 1)

# Example usage
ft = FenwickTree(8)
for i, val in enumerate([3, 2, -1, 6, 5, 4, -3, 1], 1):
    ft.update(i, val)

print(f"Sum[1..5] = {ft.range_query(1, 5)}")  # 15
ft.update(3, 4)  # Change -1 to 3 (+4 delta)
print(f"Sum[1..5] = {ft.range_query(1, 5)}")  # 19`,
    explanation: "A Fenwick tree lets you quickly calculate running totals and update individual numbers in a list. Think of keeping track of scores in a tournament - you need to know subtotals for different ranges of players and update scores as games finish. Instead of recalculating everything each time, the Fenwick tree uses a clever binary pattern to store partial sums that can be combined quickly.",
    whyElegant: "It achieves O(log n) updates and range queries using only an array and bit manipulation, with no explicit tree structure needed. The key insight is that any number can be expressed as a sum of powers of 2, so we can store cumulative information at positions corresponding to these binary patterns.",
    keyInsight: "Binary representation of indices naturally creates a hierarchy of partial sums that can be efficiently maintained and queried.",
    analogy: "Like a cash register with separate drawers for $1, $2, $4, $8, $16 bills - to make any amount, you combine the right drawers, and when money comes in, you know exactly which drawers need updating based on the binary representation of the amount.",
    sourceNote: "Fenwick tree (Binary Indexed Tree) - classical data structure for efficient prefix sum queries"
  },
  {
    id: "persistent-array-structural-sharing",
    title: "Persistent Array via Structural Sharing",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["persistent-data-structures", "structural-sharing", "immutability", "copy-on-write", "functional-programming"],
    code: `class PersistentArray:
    def __init__(self, data=None, parent=None, index=None, value=None):
        if data is not None:
            self._data = list(data)
            self._parent = None
            self._changes = {}
        else:
            self._data = None
            self._parent = parent
            self._changes = {index: value} if index is not None else {}
    
    def get(self, index):
        """Get value at index, checking changes first"""
        if index in self._changes:
            return self._changes[index]
        elif self._parent:
            return self._parent.get(index)
        else:
            return self._data[index]
    
    def set(self, index, value):
        """Create new version with updated value"""
        return PersistentArray(parent=self, index=index, value=value)
    
    def to_list(self):
        """Convert to regular list for display"""
        if self._data:
            result = self._data[:]
            for i, v in self._changes.items():
                result[i] = v
            return result
        else:
            # Reconstruct from parent chain
            parent_list = self._parent.to_list()
            for i, v in self._changes.items():
                parent_list[i] = v
            return parent_list

# Example usage
v1 = PersistentArray([1, 2, 3, 4, 5])
print(f"v1: {v1.to_list()}")  # [1, 2, 3, 4, 5]

v2 = v1.set(2, 99)  # New version
print(f"v1: {v1.to_list()}")  # [1, 2, 3, 4, 5] - unchanged
print(f"v2: {v2.to_list()}")  # [1, 2, 99, 4, 5]

v3 = v2.set(0, -1)
print(f"v3: {v3.to_list()}")  # [-1, 2, 99, 4, 5]
print(f"v1 still: {v1.to_list()}")  # [1, 2, 3, 4, 5]`,
    explanation: "A persistent array lets you create new versions of a list without copying all the data. When you 'change' an element, it creates a new version that remembers only what's different, sharing the unchanged parts with the original. This way you can keep multiple versions of your data without using much extra memory.",
    whyElegant: "Instead of copying entire arrays for each modification, it creates a chain of minimal change records. Each version only stores what's different from its parent, allowing O(1) updates while preserving all previous versions with minimal memory overhead.",
    keyInsight: "Immutable data structures can be efficient by sharing unchanged portions and only storing deltas between versions.",
    analogy: "Like editing a document with track changes - instead of saving a complete new copy for every edit, you keep one original document and a list of what changed in each version, so you can reconstruct any version by applying the relevant changes.",
    sourceNote: "Persistent data structures with structural sharing - fundamental technique in functional programming languages"
  },
  {
    id: "rope-string-concatenation",
    title: "Rope for String Concatenation",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["rope", "string-concatenation", "tree-structure", "text-editing", "balanced-tree"],
    code: `class RopeNode:
    def __init__(self, text=None, left=None, right=None):
        self.left = left
        self.right = right
        self.text = text
        self.weight = len(text) if text else (left.weight if left else 0)
    
    def __str__(self):
        if self.text:
            return self.text
        return str(self.left) + str(self.right)
    
    def __len__(self):
        if self.text:
            return len(self.text)
        left_len = len(self.left) if self.left else 0
        right_len = len(self.right) if self.right else 0
        return left_len + right_len

class Rope:
    def __init__(self, text=""):
        self.root = RopeNode(text) if text else None
    
    def concat(self, other):
        """Concatenate two ropes"""
        if not self.root:
            return other
        if not other.root:
            return self
        
        new_rope = Rope()
        new_rope.root = RopeNode(left=self.root, right=other.root)
        return new_rope
    
    def char_at(self, index):
        """Get character at index"""
        return self._char_at_helper(self.root, index)
    
    def _char_at_helper(self, node, index):
        if node.text:
            return node.text[index]
        
        if index < node.weight:
            return self._char_at_helper(node.left, index)
        else:
            return self._char_at_helper(node.right, index - node.weight)
    
    def __str__(self):
        return str(self.root) if self.root else ""

# Example usage
r1 = Rope("Hello")
r2 = Rope(" ")
r3 = Rope("World")
r4 = Rope("!")

# Build up string efficiently
result = r1.concat(r2).concat(r3).concat(r4)
print(f"Result: '{result}'")  # Hello World!
print(f"Character at index 6: '{result.char_at(6)}'")  # W

# Show internal structure efficiency
long_rope = Rope("A" * 1000).concat(Rope("B" * 1000))
print(f"Length: {len(long_rope)}, char at 1500: '{long_rope.char_at(1500)}'")`,
    explanation: "A rope is a way to efficiently work with very long strings, especially when you need to concatenate (join) them together frequently. Instead of creating one giant string in memory, it builds a tree structure where each leaf contains a piece of text, and joining strings just means creating new tree nodes that point to the existing pieces.",
    whyElegant: "Concatenation becomes O(1) instead of O(n) because you're just creating new tree nodes rather than copying characters. The tree structure allows efficient random access while avoiding the expensive memory operations of traditional string concatenation.",
    keyInsight: "Tree structures can make expensive linear operations like string concatenation practically free by deferring the actual work until it's needed.",
    analogy: "Like a book with chapters - instead of rewriting the entire book when you want to add a new chapter, you just update the table of contents to include the new chapter, and readers can still find any page by following the chapter references.",
    sourceNote: "Rope data structure - used in text editors for efficient string manipulation with large documents"
  },
  {
    id: "van-emde-boas-tree",
    title: "van Emde Boas Tree Concept",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["van-emde-boas", "integer-sets", "universe-size", "recursive-structure", "o-log-log-n"],
    code: `import math

class VEBTree:
    def __init__(self, universe_size):
        self.universe_size = universe_size
        self.min_val = None
        self.max_val = None
        
        if universe_size > 2:
            cluster_size = int(math.ceil(math.sqrt(universe_size)))
            self.cluster_count = int(math.ceil(universe_size / cluster_size))
            
            # Recursive structure: clusters and summary
            self.clusters = [VEBTree(cluster_size) for _ in range(self.cluster_count)]
            self.summary = VEBTree(self.cluster_count)
    
    def high(self, x):
        """Get high part of index"""
        cluster_size = int(math.ceil(math.sqrt(self.universe_size)))
        return x // cluster_size
    
    def low(self, x):
        """Get low part of index"""
        cluster_size = int(math.ceil(math.sqrt(self.universe_size)))
        return x % cluster_size
    
    def index(self, high, low):
        """Combine high and low parts"""
        cluster_size = int(math.ceil(math.sqrt(self.universe_size)))
        return high * cluster_size + low
    
    def insert(self, x):
        """Insert element x"""
        if self.min_val is None:
            self.min_val = self.max_val = x
            return
        
        if x < self.min_val:
            x, self.min_val = self.min_val, x
        
        if self.universe_size > 2:
            h, l = self.high(x), self.low(x)
            if self.clusters[h].min_val is None:
                self.summary.insert(h)
            self.clusters[h].insert(l)
        
        if x > self.max_val:
            self.max_val = x
    
    def member(self, x):
        """Check if x is in the set"""
        if self.min_val is None:
            return False
        if x == self.min_val or x == self.max_val:
            return True
        if self.universe_size <= 2:
            return False
        
        h, l = self.high(x), self.low(x)
        return self.clusters[h].member(l)

# Example usage - simplified demonstration
veb = VEBTree(16)  # Universe size 16 (0-15)
elements = [2, 3, 4, 5, 7, 14, 15]

for elem in elements:
    veb.insert(elem)

print("Elements in VEB tree:")
for i in range(16):
    if veb.member(i):
        print(f"  {i} is present")

print(f"Min: {veb.min_val}, Max: {veb.max_val}")`,
    explanation: "A van Emde Boas tree is designed for super-fast operations on sets of integers when you know the range of possible values ahead of time. It recursively divides the problem into smaller subproblems, like splitting phone numbers into area codes and local numbers, allowing incredibly fast lookups, insertions, and finding the next/previous element.",
    whyElegant: "It achieves O(log log n) time complexity for operations by recursively partitioning the universe into √n clusters of size √n, creating a recursive structure that processes operations much faster than traditional binary trees' O(log n).",
    keyInsight: "Recursive square-root partitioning can achieve better than logarithmic performance for integer operations when the universe size is known.",
    analogy: "Like organizing a massive phone book by first sorting by area code, then within each area code by the first few digits, then within those by the remaining digits - this hierarchical breakdown makes finding any number much faster than scanning linearly or even using a regular tree.",
    sourceNote: "van Emde Boas tree - advanced data structure for integer operations with O(log log n) complexity"
  },
  {
    id: "hash-map-open-addressing",
    title: "Hash Map Open Addressing",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["hash-map", "open-addressing", "linear-probing", "collision-resolution", "cache-friendly"],
    code: `class OpenAddressHashMap:
    def __init__(self, initial_capacity=8):
        self.capacity = initial_capacity
        self.size = 0
        self.keys = [None] * self.capacity
        self.values = [None] * self.capacity
        self.deleted = [False] * self.capacity  # Tombstone markers
    
    def _hash(self, key):
        """Simple hash function"""
        return hash(key) % self.capacity
    
    def _find_slot(self, key):
        """Find slot for key using linear probing"""
        index = self._hash(key)
        original_index = index
        
        while True:
            if self.keys[index] is None and not self.deleted[index]:
                return index, False  # Empty slot
            if self.keys[index] == key and not self.deleted[index]:
                return index, True   # Found existing key
            
            index = (index + 1) % self.capacity
            if index == original_index:
                return None, False   # Table full
    
    def _resize(self):
        """Resize when load factor gets too high"""
        old_keys = self.keys
        old_values = self.values
        old_deleted = self.deleted
        
        self.capacity *= 2
        self.size = 0
        self.keys = [None] * self.capacity
        self.values = [None] * self.capacity
        self.deleted = [False] * self.capacity
        
        # Rehash all elements
        for i in range(len(old_keys)):
            if old_keys[i] is not None and not old_deleted[i]:
                self.put(old_keys[i], old_values[i])
    
    def put(self, key, value):
        """Insert or update key-value pair"""
        if self.size >= self.capacity * 0.7:  # Load factor check
            self._resize()
        
        index, found = self._find_slot(key)
        if index is None:
            raise Exception("Hash table full")
        
        if not found:
            self.size += 1
        
        self.keys[index] = key
        self.values[index] = value
        self.deleted[index] = False
    
    def get(self, key):
        """Get value for key"""
        index, found = self._find_slot(key)
        if found:
            return self.values[index]
        raise KeyError(key)
    
    def delete(self, key):
        """Delete key-value pair"""
        index, found = self._find_slot(key)
        if found:
            self.deleted[index] = True  # Mark as deleted
            self.size -= 1
        else:
            raise KeyError(key)

# Example usage
hashmap = OpenAddressHashMap()
hashmap.put("apple", 5)
hashmap.put("banana", 3)
hashmap.put("cherry", 8)

print(f"apple: {hashmap.get('apple')}")
print(f"banana: {hashmap.get('banana')}")

hashmap.delete("banana")
try:
    hashmap.get("banana")
except KeyError:
    print("banana not found after deletion")`,
    explanation: "Open addressing is a way to handle hash map collisions (when two keys hash to the same spot) by simply looking for the next available slot in the array. If your key hashes to position 5 but it's taken, you check position 6, then 7, and so on until you find an empty spot. This keeps everything in one contiguous array instead of using linked lists.",
    whyElegant: "It achieves better cache performance than separate chaining because all data stays in a single array with good locality. The linear probing strategy is simple yet effective, and the tombstone deletion mechanism allows efficient removal without breaking probe sequences.",
    keyInsight: "Keeping hash table data in contiguous memory with linear probing provides better cache performance than pointer-based collision resolution.",
    analogy: "Like looking for parking in a busy area - if your preferred spot is taken, you drive to the next space, then the next, until you find an empty one. When you leave, you put up a 'was parked here' sign so people know to keep looking past that spot for their own cars.",
    sourceNote: "Open addressing hash tables - common implementation strategy focusing on cache efficiency"
  },
  {
    id: "cuckoo-hashing",
    title: "Cuckoo Hashing",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["cuckoo-hashing", "worst-case-constant-time", "two-hash-functions", "displacement", "guaranteed-lookup"],
    code: `class CuckooHashMap:
    def __init__(self, capacity=8):
        self.capacity = capacity
        self.table1 = [None] * capacity
        self.table2 = [None] * capacity
        self.size = 0
        self.max_iterations = 10  # Prevent infinite loops
    
    def _hash1(self, key):
        return hash(key) % self.capacity
    
    def _hash2(self, key):
        # Different hash function
        return (hash(str(key) + "salt") % self.capacity)
    
    def _insert_helper(self, key, value, table_num=1, iteration=0):
        """Helper for insertion with displacement"""
        if iteration > self.max_iterations:
            return False  # Need to resize
        
        if table_num == 1:
            pos = self._hash1(key)
            if self.table1[pos] is None:
                self.table1[pos] = (key, value)
                return True
            
            # Displace existing item
            old_key, old_value = self.table1[pos]
            self.table1[pos] = (key, value)
            
            # Try to place displaced item in table2
            return self._insert_helper(old_key, old_value, 2, iteration + 1)
        
        else:  # table_num == 2
            pos = self._hash2(key)
            if self.table2[pos] is None:
                self.table2[pos] = (key, value)
                return True
            
            # Displace existing item
            old_key, old_value = self.table2[pos]
            self.table2[pos] = (key, value)
            
            # Try to place displaced item back in table1
            return self._insert_helper(old_key, old_value, 1, iteration + 1)
    
    def put(self, key, value):
        """Insert key-value pair"""
        # Check if key already exists
        if self.get_internal(key) is not None:
            # Update existing
            pos1 = self._hash1(key)
            pos2 = self._hash2(key)
            
            if self.table1[pos1] and self.table1[pos1][0] == key:
                self.table1[pos1] = (key, value)
            elif self.table2[pos2] and self.table2[pos2][0] == key:
                self.table2[pos2] = (key, value)
            return
        
        # Try insertion
        if self._insert_helper(key, value):
            self.size += 1
        else:
            # Resize and retry (simplified)
            self._resize()
            self.put(key, value)
    
    def get_internal(self, key):
        """Internal get that returns the value or None"""
        pos1 = self._hash1(key)
        if self.table1[pos1] and self.table1[pos1][0] == key:
            return self.table1[pos1][1]
        
        pos2 = self._hash2(key)
        if self.table2[pos2] and self.table2[pos2][0] == key:
            return self.table2[pos2][1]
        
        return None
    
    def get(self, key):
        """Get value for key"""
        value = self.get_internal(key)
        if value is not None:
            return value
        raise KeyError(key)
    
    def _resize(self):
        """Double capacity and rehash everything"""
        old_table1 = self.table1
        old_table2 = self.table2
        
        self.capacity *= 2
        self.table1 = [None] * self.capacity
        self.table2 = [None] * self.capacity
        self.size = 0
        
        # Rehash all items
        for table in [old_table1, old_table2]:
            for item in table:
                if item:
                    self.put(item[0], item[1])

# Example usage
cuckoo = CuckooHashMap()
cuckoo.put("red", 1)
cuckoo.put("blue", 2)
cuckoo.put("green", 3)
cuckoo.put("yellow", 4)

print(f"red: {cuckoo.get('red')}")
print(f"blue: {cuckoo.get('blue')}")

# Show the displacement behavior
cuckoo.put("orange", 5)
print(f"orange: {cuckoo.get('orange')}")`,
    explanation: "Cuckoo hashing guarantees that you can always find any item in exactly 2 lookups by using two hash tables and two different hash functions. When you insert an item, if both spots are full, you kick out one of the existing items (like a cuckoo bird pushing eggs out of a nest) and find a new spot for the displaced item. This creates a chain reaction until everyone finds a home.",
    whyElegant: "It provides worst-case O(1) lookup time by guaranteeing that every element can be found in at most two locations. The displacement strategy during insertion ensures that lookups remain blazingly fast even as the table fills up.",
    keyInsight: "Using two hash functions and allowing displacement during insertion guarantees worst-case constant-time lookups.",
    analogy: "Like musical chairs with two rooms - everyone gets exactly two possible seats (one in each room). When someone new arrives and both their seats are taken, they kick someone out, who then has to find their other seat, potentially kicking out someone else, until everyone settles into one of their two allowed positions.",
    sourceNote: "Cuckoo hashing - provides worst-case O(1) lookup guarantees through strategic displacement"
  },
  {
    id: "radix-tree-compression",
    title: "Radix Tree Compression",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["radix-tree", "patricia-tree", "compressed-trie", "string-compression", "path-compression"],
    code: `class RadixNode:
    def __init__(self, key="", value=None, is_end=False):
        self.key = key           # Compressed path
        self.value = value       # Value if this is a word ending
        self.is_end = is_end    # Is this a complete word?
        self.children = {}      # Child nodes
    
    def __repr__(self):
        return f"Node('{self.key}', end={self.is_end}, children={list(self.children.keys())})"

class RadixTree:
    def __init__(self):
        self.root = RadixNode()
    
    def insert(self, word, value=None):
        """Insert word with optional value"""
        if value is None:
            value = word
        
        node = self.root
        i = 0
        
        while i < len(word):
            char = word[i]
            
            if char not in node.children:
                # No child with this character, create new node with remaining suffix
                remaining = word[i:]
                node.children[char] = RadixNode(remaining, value, True)
                return
            
            child = node.children[char]
            
            # Find common prefix between remaining word and child's key
            j = 0
            while (j < len(child.key) and 
                   i + j < len(word) and 
                   child.key[j] == word[i + j]):
                j += 1
            
            if j == len(child.key):
                # Child's key is completely matched, continue with this child
                node = child
                i += j
            elif j == 0:
                # No match at all - shouldn't happen with proper insertion
                raise ValueError("Insertion error")
            else:
                # Partial match - need to split the child node
                # Create new intermediate node
                common_prefix = child.key[:j]
                old_suffix = child.key[j:]
                new_word_suffix = word[i + j:]
                
                # Create new intermediate node
                intermediate = RadixNode(common_prefix)
                
                # Move old child down with remaining suffix
                old_child = RadixNode(old_suffix, child.value, child.is_end)
                old_child.children = child.children
                intermediate.children[old_suffix[0]] = old_child
                
                # Add new branch for our word
                if new_word_suffix:
                    intermediate.children[new_word_suffix[0]] = RadixNode(new_word_suffix, value, True)
                else:
                    intermediate.is_end = True
                    intermediate.value = value
                
                # Replace child with intermediate node
                node.children[char] = intermediate
                return
    
    def search(self, word):
        """Search for word, return value if found"""
        node = self.root
        i = 0
        
        while i < len(word):
            char = word[i]
            
            if char not in node.children:
                return None
            
            child = node.children[char]
            
            # Check if word matches child's key
            if i + len(child.key) > len(word):
                return None  # Word too short
            
            if word[i:i + len(child.key)] != child.key:
                return None  # Mismatch
            
            i += len(child.key)
            node = child
        
        return node.value if node.is_end else None
    
    def words_with_prefix(self, prefix):
        """Find all words with given prefix"""
        node = self.root
        i = 0
        
        # Navigate to prefix
        while i < len(prefix):
            char = prefix[i]
            if char not in node.children:
                return []
            
            child = node.children[char]
            
            if i + len(child.key) <= len(prefix):
                if prefix[i:i + len(child.key)] != child.key:
                    return []
                i += len(child.key)
                node = child
            else:
                # Prefix ends in middle of child's key
                if not child.key.startswith(prefix[i:]):
                    return []
                break
        
        # Collect all words from this point
        results = []
        self._collect_words(node, prefix, results)
        return results
    
    def _collect_words(self, node, current_word, results):
        """Recursively collect all words from node"""
        if node.is_end:
            results.append(current_word)
        
        for child in node.children.values():
            self._collect_words(child, current_word + child.key, results)

# Example usage
radix = RadixTree()
words = ["car", "card", "care", "careful", "cars", "cat", "cats"]

for word in words:
    radix.insert(word)

print("Searching:")
print(f"'car': {radix.search('car')}")
print(f"'card': {radix.search('card')}")
print(f"'caring': {radix.search('caring')}")

print("\\nWords with prefix 'car':")
for word in radix.words_with_prefix("car"):
    print(f"  {word}")`,
    explanation: "A radix tree compresses tries (prefix trees) by merging chains of single-child nodes into single nodes that store multiple characters. Instead of having one node per character, it stores common prefixes as complete strings in nodes, dramatically reducing memory usage and improving performance for sparse data.",
    whyElegant: "It eliminates wasteful single-child chains by compressing paths, reducing both memory usage and traversal time. The automatic path compression means you get the benefits of prefix trees without paying for empty intermediate nodes.",
    keyInsight: "Path compression in trees eliminates redundant single-child nodes by storing multiple characters per node, dramatically improving space and time efficiency.",
    analogy: "Like replacing a long hallway with many doors (where each door leads to another single door) with a single express elevator that stops only at floors where there are actually multiple choices to make - you skip all the unnecessary intermediate steps.",
    sourceNote: "Radix tree (Patricia tree) - compressed trie structure for efficient string storage and prefix matching"
  },
  {
    id: "wavelet-tree",
    title: "Wavelet Tree",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["wavelet-tree", "rank-queries", "range-queries", "bit-vectors", "succinct-data-structures"],
    code: `class WaveletTree:
    def __init__(self, sequence, alphabet=None):
        if alphabet is None:
            alphabet = sorted(set(sequence))
        
        self.alphabet = alphabet
        self.sequence = sequence
        self.left_child = None
        self.right_child = None
        self.bitmap = []
        
        if len(alphabet) == 1:
            # Leaf node - just store the character
            self.char = alphabet[0]
            return
        
        # Split alphabet in half
        mid = len(alphabet) // 2
        left_alphabet = alphabet[:mid]
        right_alphabet = alphabet[mid:]
        
        # Create bitmap: 0 for left half, 1 for right half
        left_seq = []
        right_seq = []
        
        for char in sequence:
            if char in left_alphabet:
                self.bitmap.append(0)
                left_seq.append(char)
            else:
                self.bitmap.append(1)
                right_seq.append(char)
        
        # Build children recursively
        if left_seq:
            self.left_child = WaveletTree(left_seq, left_alphabet)
        if right_seq:
            self.right_child = WaveletTree(right_seq, right_alphabet)
    
    def rank(self, char, pos):
        """Count occurrences of char in sequence[0:pos]"""
        if pos <= 0:
            return 0
        
        # Handle boundary
        pos = min(pos, len(self.sequence))
        
        if hasattr(self, 'char'):
            # Leaf node
            return pos if self.char == char else 0
        
        # Find which side of alphabet char belongs to
        mid = len(self.alphabet) // 2
        left_alphabet = self.alphabet[:mid]
        
        if char in left_alphabet:
            # Count zeros up to pos and recurse left
            zeros_before = self._count_zeros_before(pos)
            return self.left_child.rank(char, zeros_before) if self.left_child else 0
        else:
            # Count ones up to pos and recurse right
            ones_before = self._count_ones_before(pos)
            return self.right_child.rank(char, ones_before) if self.right_child else 0
    
    def _count_zeros_before(self, pos):
        """Count zeros in bitmap before position pos"""
        return sum(1 for i in range(min(pos, len(self.bitmap))) if self.bitmap[i] == 0)
    
    def _count_ones_before(self, pos):
        """Count ones in bitmap before position pos"""
        return sum(1 for i in range(min(pos, len(self.bitmap))) if self.bitmap[i] == 1)
    
    def access(self, pos):
        """Get character at position pos"""
        if hasattr(self, 'char'):
            return self.char
        
        if pos >= len(self.bitmap):
            return None
        
        if self.bitmap[pos] == 0:
            # Go left
            zeros_before = self._count_zeros_before(pos)
            return self.left_child.access(zeros_before) if self.left_child else None
        else:
            # Go right
            ones_before = self._count_ones_before(pos)
            return self.right_child.access(ones_before) if self.right_child else None
    
    def range_rank(self, char, left, right):
        """Count occurrences of char in sequence[left:right]"""
        return self.rank(char, right) - self.rank(char, left)

# Example usage
text = "abracadabra"
wt = WaveletTree(list(text))

print(f"Text: {text}")
print(f"Alphabet: {wt.alphabet}")

# Test rank queries
print(f"\\nRank queries:")
print(f"rank('a', 5) = {wt.rank('a', 5)}")  # Count 'a's in "abrac"
print(f"rank('b', 8) = {wt.rank('b', 8)}")  # Count 'b's in "abracada"

# Test access
print(f"\\nAccess queries:")
print(f"access(0) = '{wt.access(0)}'")  # First character
print(f"access(4) = '{wt.access(4)}'")  # Fifth character

# Test range queries
print(f"\\nRange queries:")
print(f"range_rank('a', 2, 7) = {wt.range_rank('a', 2, 7)}")  # 'a's in "acada"`,
    explanation: "A wavelet tree lets you answer complex questions about sequences very quickly, like 'how many times does character X appear in positions 10-50?' It works by recursively splitting the alphabet in half and creating a binary tree where each level asks 'is this character in the left or right half of the alphabet?' The path down the tree encodes each character's identity.",
    whyElegant: "It provides O(log σ) time for rank and access queries (where σ is alphabet size) using a recursive binary partitioning scheme. The bitmap at each node efficiently encodes which characters belong to left vs right subtrees, enabling complex range queries on sequences.",
    keyInsight: "Recursive alphabet partitioning with bitmaps enables efficient rank and range queries on sequences by encoding character positions hierarchically.",
    analogy: "Like a sorting office that splits mail by asking binary questions - first 'A-M or N-Z?', then within A-M ask 'A-F or G-M?', and so on. Each letter's location is encoded by the sequence of left/right decisions needed to find it, allowing quick counting and searching within any range of positions.",
    sourceNote: "Wavelet tree - succinct data structure for rank/select queries on sequences over large alphabets"
  },
  {
    id: "finger-tree-intuition",
    title: "Finger Tree Intuition",
    language: "Haskell",
    category: "Data Structure Design Moments",
    conceptTags: ["finger-tree", "persistent", "functional", "amortized-constant", "deque", "monoidal"],
    code: `-- Simplified finger tree structure for intuition
data FingerTree a = Empty
                  | Single a
                  | Deep (Digit a) (FingerTree (Node a)) (Digit a)

-- Digits store 1-4 elements for fast access
data Digit a = One a | Two a a | Three a a a | Four a a a a

-- Nodes group elements for the recursive middle
data Node a = Node2 a a | Node3 a a a

-- Basic operations intuition
class Measured a where
  measure :: a -> Int  -- Size measure for this example

-- Smart constructor that maintains finger tree properties
deep :: Digit a -> FingerTree (Node a) -> Digit a -> FingerTree a
deep left middle right = Deep left middle right

-- Add to left end (amortized O(1))
infixr 5 <|
(<|) :: a -> FingerTree a -> FingerTree a
a <| Empty = Single a
a <| Single b = Deep (One a) Empty (One b)
a <| Deep (One b) m right = Deep (Two a b) m right
a <| Deep (Two b c) m right = Deep (Three a b c) m right
a <| Deep (Three b c d) m right = Deep (Four a b c d) m right
a <| Deep (Four b c d e) m right = 
    Deep (Two a b) (Node3 c d e <| m) right

-- Add to right end (amortized O(1))
infixl 5 |>
(|>) :: FingerTree a -> a -> FingerTree a
Empty |> a = Single a
Single a |> b = Deep (One a) Empty (One b)
Deep left m (One a) |> b = Deep left m (Two a b)
Deep left m (Two a b) |> c = Deep left m (Three a b c)
Deep left m (Three a b c) |> d = Deep left m (Four a b c d)
Deep left m (Four a b c d) |> e = 
    Deep left (m |> Node3 b c d) (Two d e)

-- Convert to list for display
toList :: FingerTree a -> [a]
toList Empty = []
toList (Single x) = [x]
toList (Deep left middle right) = 
    digitToList left ++ concatMap nodeToList (toList middle) ++ digitToList right

digitToList :: Digit a -> [a]
digitToList (One a) = [a]
digitToList (Two a b) = [a, b]
digitToList (Three a b c) = [a, b, c]
digitToList (Four a b c d) = [a, b, c, d]

nodeToList :: Node a -> [a]
nodeToList (Node2 a b) = [a, b]
nodeToList (Node3 a b c) = [a, b, c]

-- Example usage (conceptual)
exampleTree :: FingerTree Int
exampleTree = 1 <| 2 <| 3 <| Empty |> 4 |> 5

-- Result: FingerTree containing [1,2,3,4,5] with O(1) access to ends`,
    explanation: "A finger tree is like having multiple 'fingers' (fast access points) at both ends of a sequence, allowing you to quickly add, remove, or access elements from either side. It uses a recursive structure where the middle contains compressed groups of elements, while keeping the ends easily accessible. This makes it perfect for implementing efficient queues, deques, and sequences.",
    whyElegant: "It provides amortized O(1) access to both ends while maintaining persistence (immutability). The recursive structure with digits (1-4 elements) at the boundaries and nodes (2-3 elements) in the middle creates perfect balance between shallow access and efficient storage.",
    keyInsight: "Maintaining fast access to both ends of a structure while preserving immutability requires carefully balanced recursive grouping.",
    analogy: "Like a rope with thick, easy-to-grab handles on both ends, but a thinner, more compressed middle section. You can quickly grab and manipulate either end, while the middle efficiently stores the bulk of the content without getting in the way.",
    sourceNote: "Finger tree - fundamental persistent data structure in functional programming, used in libraries like Data.Sequence"
  },
  {
    id: "disjoint-sparse-table-rmq",
    title: "Disjoint Sparse Table for RMQ",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["sparse-table", "range-minimum-query", "rmq", "disjoint-intervals", "preprocessing", "log-time"],
    code: `import math

class DisjointSparseTable:
    def __init__(self, arr):
        self.n = len(arr)
        self.arr = arr
        self.levels = math.ceil(math.log2(self.n)) + 1 if self.n > 1 else 1
        
        # Build sparse table with disjoint intervals
        self.table = [[0] * self.n for _ in range(self.levels)]
        
        # Level 0 is the original array
        self.table[0] = arr[:]
        
        # Build each level
        for level in range(1, self.levels):
            block_size = 1 << level  # 2^level
            
            for i in range(0, self.n, block_size):
                # For each block, compute prefix and suffix minimums
                mid = min(i + block_size // 2, self.n)
                right = min(i + block_size, self.n)
                
                # Fill suffix minimums for left half
                if mid > i:
                    self.table[level][mid - 1] = self.arr[mid - 1]
                    for j in range(mid - 2, i - 1, -1):
                        self.table[level][j] = min(self.table[level][j + 1], self.arr[j])
                
                # Fill prefix minimums for right half  
                if mid < right:
                    self.table[level][mid] = self.arr[mid]
                    for j in range(mid + 1, right):
                        self.table[level][j] = min(self.table[level][j - 1], self.arr[j])
    
    def query(self, left, right):
        """Range minimum query for [left, right] inclusive"""
        if left == right:
            return self.arr[left]
        
        # Find the level where left and right are in different halves
        level = math.floor(math.log2(left ^ right)) + 1
        
        # Query the suffix of left block and prefix of right block
        return min(self.table[level][left], self.table[level][right])
    
    def print_table(self):
        """Debug function to show the table structure"""
        print("Disjoint Sparse Table:")
        for level in range(self.levels):
            print(f"Level {level}: {self.table[level]}")

# Example usage
arr = [4, 2, 3, 7, 1, 5, 3, 3, 9, 6, 2, 8]
dst = DisjointSparseTable(arr)

print(f"Array: {arr}")
print()

# Test various range queries
queries = [(0, 3), (2, 7), (1, 5), (4, 8), (0, 11), (5, 9)]

for left, right in queries:
    result = dst.query(left, right)
    subarray = arr[left:right+1]
    expected = min(subarray)
    print(f"RMQ({left}, {right}): {result} (subarray: {subarray}, expected: {expected})")
    assert result == expected, f"Mismatch: got {result}, expected {expected}"

# Show internal structure
print("\\nInternal structure:")
dst.print_table()`,
    explanation: "A disjoint sparse table preprocesses an array to answer range minimum queries (find the smallest element in any range) very quickly. Unlike regular sparse tables, it uses disjoint (non-overlapping) intervals at each level, where each range is split into a left suffix and right prefix that meet in the middle. This allows O(1) queries without needing overlapping ranges.",
    whyElegant: "It achieves O(1) range minimum queries with O(n log n) preprocessing by cleverly partitioning ranges into disjoint intervals. Each query reduces to finding the minimum of two precomputed values: a suffix from the left block and a prefix from the right block.",
    keyInsight: "Disjoint interval partitioning allows constant-time range queries by ensuring every possible query spans exactly two precomputed partial results.",
    analogy: "Like organizing a library where each floor covers different decades, and within each floor, books are arranged so you can instantly find the 'best' book in any range by checking just two strategically placed summary cards - one for the left section and one for the right section of your query range.",
    sourceNote: "Disjoint sparse table - advanced RMQ data structure offering O(1) queries with simpler analysis than standard sparse tables"
  },
{
    id: "btree-split-merge",
    title: "B-tree Split and Merge",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["trees", "balanced-trees", "database-indexing", "splitting", "merging"],
    code: `class BTreeNode:
    def __init__(self, is_leaf=False):
        self.keys = []
        self.children = []
        self.is_leaf = is_leaf
        self.min_keys = 1  # Usually t-1 where t is minimum degree

class BTree:
    def __init__(self, min_degree=3):
        self.root = BTreeNode(is_leaf=True)
        self.min_degree = min_degree
        self.max_keys = 2 * min_degree - 1
    
    def split_child(self, parent, child_index):
        """Split a full child node"""
        full_child = parent.children[child_index]
        new_child = BTreeNode(is_leaf=full_child.is_leaf)
        
        mid_index = self.min_degree - 1
        mid_key = full_child.keys[mid_index]
        
        # Move right half of keys to new node
        new_child.keys = full_child.keys[mid_index + 1:]
        full_child.keys = full_child.keys[:mid_index]
        
        # Move right half of children if not leaf
        if not full_child.is_leaf:
            new_child.children = full_child.children[mid_index + 1:]
            full_child.children = full_child.children[:mid_index + 1]
        
        # Insert mid key and new child into parent
        parent.keys.insert(child_index, mid_key)
        parent.children.insert(child_index + 1, new_child)
    
    def merge_children(self, parent, left_index):
        """Merge two adjacent children with separator key"""
        left_child = parent.children[left_index]
        right_child = parent.children[left_index + 1]
        separator_key = parent.keys[left_index]
        
        # Merge separator and right child into left child
        left_child.keys.append(separator_key)
        left_child.keys.extend(right_child.keys)
        
        if not left_child.is_leaf:
            left_child.children.extend(right_child.children)
        
        # Remove separator key and right child from parent
        parent.keys.pop(left_index)
        parent.children.pop(left_index + 1)`,
    explanation: "A B-tree automatically keeps itself balanced by splitting nodes when they get too full and merging nodes when they get too empty. When a node has too many keys, it splits in half and promotes the middle key to its parent. When a node has too few keys, it merges with a sibling using a key from the parent as glue.",
    whyElegant: "The split and merge operations maintain perfect balance automatically without complex rotations, making B-trees ideal for databases where consistent performance matters more than optimal height.",
    keyInsight: "B-trees solve the database problem by trading optimal height for guaranteed consistent access times through predictable split/merge operations.",
    analogy: "Like a filing cabinet that automatically creates new drawers when one gets too full, and combines drawers when they're nearly empty, always keeping everything organized and easy to find.",
    sourceNote: "B-trees were invented by Rudolf Bayer and Ed McCreight at Boeing in 1972 for database indexing"
  },

  {
    id: "red-black-rotation",
    title: "Red-Black Tree Rotation",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["trees", "balanced-trees", "rotations", "color-coding", "invariants"],
    code: `class RBNode:
    def __init__(self, data, color='RED'):
        self.data = data
        self.color = color  # 'RED' or 'BLACK'
        self.left = None
        self.right = None
        self.parent = None

class RedBlackTree:
    def __init__(self):
        self.nil = RBNode(None, 'BLACK')  # Sentinel node
        self.root = self.nil
    
    def left_rotate(self, x):
        """Rotate left around node x"""
        y = x.right  # y becomes new root of subtree
        
        # Move y's left subtree to x's right
        x.right = y.left
        if y.left != self.nil:
            y.left.parent = x
        
        # Link y to x's parent
        y.parent = x.parent
        if x.parent == self.nil:
            self.root = y
        elif x == x.parent.left:
            x.parent.left = y
        else:
            x.parent.right = y
        
        # Put x as y's left child
        y.left = x
        x.parent = y
    
    def right_rotate(self, y):
        """Rotate right around node y"""
        x = y.left  # x becomes new root of subtree
        
        # Move x's right subtree to y's left
        y.left = x.right
        if x.right != self.nil:
            x.right.parent = y
        
        # Link x to y's parent
        x.parent = y.parent
        if y.parent == self.nil:
            self.root = x
        elif y == y.parent.left:
            y.parent.left = x
        else:
            y.parent.right = x
        
        # Put y as x's right child
        x.right = y
        y.parent = x
    
    def fix_insert_violations(self, node):
        """Fix red-black violations after insertion"""
        while node.parent.color == 'RED':
            if node.parent == node.parent.parent.left:
                uncle = node.parent.parent.right
                if uncle.color == 'RED':
                    # Case 1: Uncle is red - recolor
                    node.parent.color = 'BLACK'
                    uncle.color = 'BLACK'
                    node.parent.parent.color = 'RED'
                    node = node.parent.parent
                else:
                    # Case 2 & 3: Uncle is black - rotate
                    if node == node.parent.right:
                        node = node.parent
                        self.left_rotate(node)
                    node.parent.color = 'BLACK'
                    node.parent.parent.color = 'RED'
                    self.right_rotate(node.parent.parent)
        self.root.color = 'BLACK'`,
    explanation: "Red-black trees use rotations to maintain balance after insertions and deletions. A rotation changes the structure of the tree while preserving the search order. Combined with strategic recoloring of nodes, rotations ensure the tree stays roughly balanced without being perfectly balanced.",
    whyElegant: "Rotations are local operations that fix global imbalance, requiring only pointer adjustments while maintaining the binary search property throughout the entire tree.",
    keyInsight: "Red-black rotations prove that you can maintain near-perfect balance with simple local operations rather than global reorganization.",
    analogy: "Like reorganizing a family tree by having people change places while keeping all the parent-child relationships valid - you can fix the whole tree's balance by just swapping a few positions.",
    sourceNote: "Red-black trees were invented by Rudolf Bayer in 1972 and refined by Leo Guibas and Robert Sedgewick in 1978"
  },

  {
    id: "avl-balance-factor",
    title: "AVL Tree Balance Factor",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["trees", "balanced-trees", "height-tracking", "invariants", "rotations"],
    code: `class AVLNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
        self.height = 1  # Height of subtree rooted at this node

class AVLTree:
    def get_height(self, node):
        """Get height of node (0 for None)"""
        if not node:
            return 0
        return node.height
    
    def get_balance_factor(self, node):
        """Calculate balance factor: height(left) - height(right)"""
        if not node:
            return 0
        return self.get_height(node.left) - self.get_height(node.right)
    
    def update_height(self, node):
        """Update height based on children's heights"""
        if not node:
            return
        left_height = self.get_height(node.left)
        right_height = self.get_height(node.right)
        node.height = max(left_height, right_height) + 1
    
    def right_rotate(self, y):
        """Right rotation for left-heavy imbalance"""
        x = y.left
        T2 = x.right
        
        # Perform rotation
        x.right = y
        y.left = T2
        
        # Update heights
        self.update_height(y)
        self.update_height(x)
        
        return x  # New root of subtree
    
    def left_rotate(self, x):
        """Left rotation for right-heavy imbalance"""
        y = x.right
        T2 = y.left
        
        # Perform rotation
        y.left = x
        x.right = T2
        
        # Update heights
        self.update_height(x)
        self.update_height(y)
        
        return y  # New root of subtree
    
    def insert(self, root, data):
        """Insert and rebalance using balance factors"""
        # Standard BST insertion
        if not root:
            return AVLNode(data)
        
        if data < root.data:
            root.left = self.insert(root.left, data)
        else:
            root.right = self.insert(root.right, data)
        
        # Update height of current node
        self.update_height(root)
        
        # Get balance factor
        balance = self.get_balance_factor(root)
        
        # Rebalance if needed (balance factor > 1 or < -1)
        # Left Left Case
        if balance > 1 and data < root.left.data:
            return self.right_rotate(root)
        
        # Right Right Case
        if balance < -1 and data > root.right.data:
            return self.left_rotate(root)
        
        # Left Right Case
        if balance > 1 and data > root.left.data:
            root.left = self.left_rotate(root.left)
            return self.right_rotate(root)
        
        # Right Left Case
        if balance < -1 and data < root.right.data:
            root.right = self.right_rotate(root.right)
            return self.left_rotate(root)
        
        return root  # No rotation needed`,
    explanation: "An AVL tree tracks the height difference between left and right subtrees for every node, called the balance factor. If this difference ever exceeds 1 in either direction, the tree performs rotations to restore balance. This simple numeric check ensures the tree is always nearly perfectly balanced.",
    whyElegant: "A single integer (balance factor) captures the entire health of a subtree, enabling precise local decisions that maintain global balance with mathematical certainty.",
    keyInsight: "AVL trees prove that perfect balance can be maintained by tracking just one number per node and acting decisively when it goes out of bounds.",
    analogy: "Like a tightrope walker who constantly checks if they're leaning too far left or right and immediately corrects their position - the balance factor is the inner ear of the tree.",
    sourceNote: "AVL trees were invented by Soviet mathematicians Georgy Adelson-Velsky and Evgenii Landis in 1962"
  },

  {
    id: "splay-tree-access",
    title: "Splay Tree Access",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["trees", "adaptive-structures", "splaying", "locality", "amortization"],
    code: `class SplayNode:
    def __init__(self, data):
        self.data = data
        self.left = None
        self.right = None
        self.parent = None

class SplayTree:
    def __init__(self):
        self.root = None
    
    def right_rotate(self, x):
        """Rotate right around x"""
        y = x.left
        x.left = y.right
        if y.right:
            y.right.parent = x
        y.parent = x.parent
        if not x.parent:
            self.root = y
        elif x == x.parent.right:
            x.parent.right = y
        else:
            x.parent.left = y
        y.right = x
        x.parent = y
    
    def left_rotate(self, x):
        """Rotate left around x"""
        y = x.right
        x.right = y.left
        if y.left:
            y.left.parent = x
        y.parent = x.parent
        if not x.parent:
            self.root = y
        elif x == x.parent.left:
            x.parent.left = y
        else:
            x.parent.right = y
        y.left = x
        x.parent = y
    
    def splay(self, node):
        """Move node to root using splaying operations"""
        while node.parent:
            parent = node.parent
            grandparent = parent.parent
            
            if not grandparent:
                # Zig case: parent is root
                if node == parent.left:
                    self.right_rotate(parent)
                else:
                    self.left_rotate(parent)
            
            elif ((node == parent.left) == (parent == grandparent.left)):
                # Zig-zig case: same direction
                if parent == grandparent.left:
                    self.right_rotate(grandparent)
                    self.right_rotate(parent)
                else:
                    self.left_rotate(grandparent)
                    self.left_rotate(parent)
            
            else:
                # Zig-zag case: different directions
                if node == parent.left:
                    self.right_rotate(parent)
                    self.left_rotate(grandparent)
                else:
                    self.left_rotate(parent)
                    self.right_rotate(grandparent)
    
    def search(self, data):
        """Search for data and splay the accessed node"""
        node = self._search_node(self.root, data)
        if node:
            self.splay(node)
        return node
    
    def _search_node(self, node, data):
        """Internal search without splaying"""
        if not node or node.data == data:
            return node
        
        if data < node.data:
            return self._search_node(node.left, data)
        else:
            return self._search_node(node.right, data)
    
    def access(self, data):
        """Access an element (search and bring to root)"""
        found = self.search(data)
        return found is not None`,
    explanation: "A splay tree moves every accessed element to the root through a series of rotations called 'splaying'. This means frequently accessed items naturally migrate toward the top, making the tree adapt to usage patterns. The tree isn't balanced in the traditional sense, but performs well when some items are accessed much more than others.",
    whyElegant: "Splay trees eliminate the need for balance information by using access patterns themselves as the balancing mechanism - the tree organizes itself based on actual usage.",
    keyInsight: "Splay trees prove that optimal performance comes not from perfect balance, but from adapting structure to match real-world access patterns.",
    analogy: "Like a messy desk where the papers you use most often naturally end up on top - the tree reorganizes itself so popular items are always within easy reach.",
    sourceNote: "Splay trees were developed by Daniel Sleator and Robert Tarjan at Bell Labs in 1985"
  },

  {
    id: "two-three-tree-promotion",
    title: "2-3 Tree Promotion",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["trees", "balanced-trees", "promotion", "splitting", "multi-way-nodes"],
    code: `class Node23:
    def __init__(self, is_leaf=True):
        self.keys = []  # 1 or 2 keys for internal nodes
        self.children = []  # 2 or 3 children for internal nodes
        self.is_leaf = is_leaf
        self.parent = None

class Tree23:
    def __init__(self):
        self.root = Node23(is_leaf=True)
    
    def split_node(self, node, new_key, new_child=None):
        """Split a 4-node (3 keys) and promote middle key"""
        # Insert new key in sorted order
        keys = sorted(node.keys + [new_key])
        
        # Create new right sibling
        right_sibling = Node23(is_leaf=node.is_leaf)
        right_sibling.keys = [keys[2]]  # Rightmost key
        
        # Split children if internal node
        if not node.is_leaf:
            # Find where new child should go
            children = node.children[:]
            if new_child:
                insert_pos = 0
                for i, key in enumerate(node.keys):
                    if new_key < key:
                        break
                    insert_pos = i + 1
                children.insert(insert_pos + 1, new_child)
            
            # Distribute children
            right_sibling.children = children[2:]  # Right 2 children
            node.children = children[:2]  # Left 2 children
        
        # Update left node (original)
        node.keys = [keys[0]]  # Leftmost key
        
        # The middle key (keys[1]) gets promoted
        promoted_key = keys[1]
        
        return promoted_key, right_sibling
    
    def insert_into_parent(self, left_child, promoted_key, right_child):
        """Insert promoted key into parent node"""
        if left_child == self.root:
            # Create new root
            new_root = Node23(is_leaf=False)
            new_root.keys = [promoted_key]
            new_root.children = [left_child, right_child]
            left_child.parent = new_root
            right_child.parent = new_root
            self.root = new_root
            return
        
        parent = left_child.parent
        right_child.parent = parent
        
        # Find insertion position
        insert_pos = 0
        for i, key in enumerate(parent.keys):
            if promoted_key < key:
                break
            insert_pos = i + 1
        
        # Insert key and child
        parent.keys.insert(insert_pos, promoted_key)
        parent.children.insert(insert_pos + 1, right_child)
        
        # Check if parent is now overfull (3 keys)
        if len(parent.keys) == 3:
            # Split parent and promote again
            promoted, new_right = self.split_node(parent, parent.keys[1])
            parent.keys = [parent.keys[0]]  # Fix left node
            self.insert_into_parent(parent, promoted, new_right)
    
    def insert(self, key):
        """Insert a key into the 2-3 tree"""
        leaf = self._find_leaf(key)
        
        if len(leaf.keys) < 2:
            # Simple insertion - leaf has room
            leaf.keys.append(key)
            leaf.keys.sort()
        else:
            # Leaf is full (2 keys) - need to split
            promoted_key, right_sibling = self.split_node(leaf, key)
            self.insert_into_parent(leaf, promoted_key, right_sibling)
    
    def _find_leaf(self, key):
        """Find the leaf where key should be inserted"""
        node = self.root
        while not node.is_leaf:
            if key <= node.keys[0]:
                node = node.children[0]
            elif len(node.keys) == 1 or key <= node.keys[1]:
                node = node.children[1]
            else:
                node = node.children[2]
        return node`,
    explanation: "In a 2-3 tree, nodes can hold 1-2 keys and have 2-3 children. When a node gets too full (3 keys), it splits by promoting the middle key up to its parent. This promotion might cause the parent to become too full, leading to a chain reaction of splits that can reach the root, growing the tree upward.",
    whyElegant: "The promotion mechanism ensures all leaves stay at the same level by growing the tree from the bottom up, maintaining perfect balance through a simple splitting rule.",
    keyInsight: "2-3 trees maintain perfect balance by promoting overflow upward rather than rotating sideways, proving that growth can be more elegant than rebalancing.",
    analogy: "Like a corporate hierarchy where departments can only manage 2-3 direct reports - when a manager gets overwhelmed, they promote someone up the chain rather than shuffling people around.",
    sourceNote: "2-3 trees were developed by John Hopcroft in 1970 as a teaching tool for understanding B-trees"
  },

  {
    id: "treap-implicit-key",
    title: "Treap with Implicit Key",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["trees", "randomized-structures", "implicit-keys", "priorities", "heap-property"],
    code: `import random

class TreapNode:
    def __init__(self, data):
        self.data = data
        self.priority = random.random()  # Random priority for heap property
        self.size = 1  # Size of subtree (for implicit indexing)
        self.left = None
        self.right = None

class ImplicitTreap:
    def __init__(self):
        self.root = None
    
    def get_size(self, node):
        """Get size of subtree rooted at node"""
        return node.size if node else 0
    
    def update_size(self, node):
        """Update size based on children"""
        if node:
            node.size = 1 + self.get_size(node.left) + self.get_size(node.right)
    
    def split(self, node, position):
        """Split treap at position into two treaps"""
        if not node:
            return None, None
        
        left_size = self.get_size(node.left)
        
        if position <= left_size:
            # Split goes through left subtree
            left_tree, node.left = self.split(node.left, position)
            self.update_size(node)
            return left_tree, node
        else:
            # Split goes through right subtree
            node.right, right_tree = self.split(node.right, position - left_size - 1)
            self.update_size(node)
            return node, right_tree
    
    def merge(self, left_tree, right_tree):
        """Merge two treaps maintaining heap property by priority"""
        if not left_tree:
            return right_tree
        if not right_tree:
            return left_tree
        
        # Higher priority becomes root
        if left_tree.priority > right_tree.priority:
            left_tree.right = self.merge(left_tree.right, right_tree)
            self.update_size(left_tree)
            return left_tree
        else:
            right_tree.left = self.merge(left_tree, right_tree.left)
            self.update_size(right_tree)
            return right_tree
    
    def insert(self, position, data):
        """Insert data at given position (0-indexed)"""
        new_node = TreapNode(data)
        left_tree, right_tree = self.split(self.root, position)
        
        # Merge: left + new_node + right
        temp = self.merge(left_tree, new_node)
        self.root = self.merge(temp, right_tree)
    
    def delete(self, position):
        """Delete element at given position"""
        left_tree, temp = self.split(self.root, position)
        temp, right_tree = self.split(temp, 1)  # Split off single element
        
        # Merge back without the deleted element
        self.root = self.merge(left_tree, right_tree)
        
        return temp.data if temp else None
    
    def get(self, position):
        """Get element at given position"""
        def find_by_position(node, pos):
            if not node:
                return None
            
            left_size = self.get_size(node.left)
            
            if pos == left_size:
                return node.data
            elif pos < left_size:
                return find_by_position(node.left, pos)
            else:
                return find_by_position(node.right, pos - left_size - 1)
        
        return find_by_position(self.root, position)
    
    def to_list(self):
        """Convert treap to list (in-order traversal)"""
        result = []
        
        def inorder(node):
            if node:
                inorder(node.left)
                result.append(node.data)
                inorder(node.right)
        
        inorder(self.root)
        return result`,
    explanation: "A treap with implicit keys doesn't store traditional search keys. Instead, it uses the position in the sequence as the implicit key. Each node tracks the size of its subtree, allowing logarithmic-time access to any position. Random priorities maintain the heap property, keeping the tree balanced without explicit balancing operations.",
    whyElegant: "By combining random priorities with position-based splitting, implicit treaps provide all array operations (insert, delete, random access) in logarithmic time without complex balancing algorithms.",
    keyInsight: "Implicit treaps prove that randomization can replace deterministic balancing, turning tree maintenance from an algorithmic challenge into a probabilistic guarantee.",
    analogy: "Like a deck of cards where each card has a random 'importance' number, and you always keep the most important cards on top - the randomness naturally keeps the deck well-shuffled and balanced.",
    sourceNote: "Treaps were invented by Cecilia Aragon and Raimund Seidel in 1989, with implicit key variants developed for competitive programming"
  },

  {
    id: "suffix-automaton-construction",
    title: "Suffix Automaton Construction",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["automata", "string-processing", "suffix-structures", "state-machines", "incremental-construction"],
    code: `class SAMNode:
    def __init__(self):
        self.transitions = {}  # Character -> next state
        self.link = None      # Suffix link to longest proper suffix
        self.length = 0       # Length of longest string ending at this state
        self.is_terminal = False

class SuffixAutomaton:
    def __init__(self):
        self.nodes = []
        self.last = 0  # Index of last added state
        
        # Create initial state
        initial = SAMNode()
        initial.length = 0
        self.nodes.append(initial)
    
    def add_character(self, char):
        """Incrementally add a character to the automaton"""
        # Create new state for current suffix
        curr = len(self.nodes)
        new_node = SAMNode()
        new_node.length = self.nodes[self.last].length + 1
        self.nodes.append(new_node)
        
        # Add transitions from previous states
        p = self.last
        while p != -1 and char not in self.nodes[p].transitions:
            self.nodes[p].transitions[char] = curr
            p = self.nodes[p].link if p != 0 else -1
        
        if p == -1:
            # char not found in any previous state
            new_node.link = 0
        else:
            # Found existing transition
            q = self.nodes[p].transitions[char]
            
            if self.nodes[p].length + 1 == self.nodes[q].length:
                # Perfect suffix link
                new_node.link = q
            else:
                # Need to split state q
                clone = len(self.nodes)
                cloned_node = SAMNode()
                cloned_node.length = self.nodes[p].length + 1
                cloned_node.transitions = self.nodes[q].transitions.copy()
                cloned_node.link = self.nodes[q].link
                self.nodes.append(cloned_node)
                
                # Update links
                self.nodes[q].link = clone
                new_node.link = clone
                
                # Update transitions pointing to q
                while p != -1 and self.nodes[p].transitions.get(char) == q:
                    self.nodes[p].transitions[char] = clone
                    p = self.nodes[p].link if p != 0 else -1
        
        self.last = curr
    
    def build_from_string(self, s):
        """Build suffix automaton from string"""
        for char in s:
            self.add_character(char)
        
        # Mark terminal states
        curr = self.last
        while curr != 0:
            self.nodes[curr].is_terminal = True
            curr = self.nodes[curr].link
    
    def contains_substring(self, substring):
        """Check if substring exists in the original string"""
        curr = 0  # Start from initial state
        
        for char in substring:
            if char not in self.nodes[curr].transitions:
                return False
            curr = self.nodes[curr].transitions[char]
        
        return True
    
    def count_distinct_substrings(self):
        """Count number of distinct substrings"""
        total = 0
        
        def dfs(node_idx, visited):
            if node_idx in visited:
                return 0
            visited.add(node_idx)
            
            count = len(self.nodes[node_idx].transitions)
            for next_state in self.nodes[node_idx].transitions.values():
                count += dfs(next_state, visited)
            
            return count
        
        return dfs(0, set())
    
    def get_all_suffixes(self):
        """Get all suffixes represented by terminal states"""
        suffixes = []
        
        def collect_paths(node_idx, path):
            if self.nodes[node_idx].is_terminal:
                suffixes.append(path)
            
            for char, next_state in self.nodes[node_idx].transitions.items():
                collect_paths(next_state, path + char)
        
        collect_paths(0, "")
        return suffixes`,
    explanation: "A suffix automaton is a compressed trie of all suffixes of a string, built incrementally by adding one character at a time. Each state represents a set of substrings, and transitions represent extending those substrings by one character. The automaton uses suffix links to efficiently handle overlapping patterns without storing duplicate information.",
    whyElegant: "The suffix automaton compresses exponentially many substrings into linear space while maintaining the ability to answer complex string queries in optimal time through its state machine structure.",
    keyInsight: "Suffix automata prove that the entire structure of a string's substrings can be captured in a minimal state machine that grows incrementally with perfect efficiency.",
    analogy: "Like a GPS navigation system that learns every possible route by incrementally adding roads - it can instantly tell you if any path exists and how many different ways you can get somewhere.",
    sourceNote: "Suffix automata were developed by Anatoly Blumer, Janet Blumer, Andrzej Ehrenfeucht, David Haussler, and Ross McConnell in 1985"
  },

  {
    id: "palindrome-tree-eertree",
    title: "Palindrome Tree (Eertree)",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["trees", "palindromes", "string-processing", "suffix-structures", "dual-trees"],
    code: `class EertreeNode:
    def __init__(self, length):
        self.length = length    # Length of palindrome
        self.edges = {}        # Character -> next node
        self.link = None       # Suffix link to longest proper suffix palindrome
        self.count = 0         # Number of occurrences

class PalindromeTree:
    def __init__(self):
        self.string = ""
        self.nodes = []
        
        # Two roots: odd-length and even-length palindromes
        odd_root = EertreeNode(-1)   # Represents empty odd palindrome
        even_root = EertreeNode(0)   # Represents empty even palindrome
        
        odd_root.link = odd_root     # Self-loop for odd root
        even_root.link = odd_root    # Even root links to odd root
        
        self.nodes.extend([odd_root, even_root])
        self.last_node = even_root   # Last added palindrome
    
    def get_suffix_palindrome(self, node, pos):
        """Find the longest suffix palindrome ending at position pos"""
        while True:
            if node.length == -1:
                # Odd root case - can always extend
                break
            
            # Check if we can extend this palindrome
            left_pos = pos - node.length - 1
            if left_pos >= 0 and self.string[left_pos] == self.string[pos]:
                break
            
            # Move to suffix link
            node = node.link
        
        return node
    
    def add_character(self, char):
        """Add character and update palindrome tree"""
        pos = len(self.string)
        self.string += char
        
        # Find longest suffix palindrome that can be extended
        curr_node = self.get_suffix_palindrome(self.last_node, pos)
        
        # Check if palindrome already exists
        if char in curr_node.edges:
            self.last_node = curr_node.edges[char]
            self.last_node.count += 1
            return
        
        # Create new palindrome
        new_node = EertreeNode(curr_node.length + 2)
        new_node.count = 1
        curr_node.edges[char] = new_node
        self.nodes.append(new_node)
        
        if new_node.length == 1:
            # Single character - link to even root
            new_node.link = self.nodes[1]  # even_root
        else:
            # Find suffix link for new palindrome
            suffix_node = self.get_suffix_palindrome(curr_node.link, pos)
            new_node.link = suffix_node.edges[char]
        
        self.last_node = new_node
    
    def build_from_string(self, s):
        """Build palindrome tree from string"""
        for char in s:
            self.add_character(char)
        
        # Calculate actual counts using suffix links
        for i in range(len(self.nodes) - 1, 1, -1):  # Reverse topological order
            node = self.nodes[i]
            if node.link:
                node.link.count += node.count
    
    def get_all_palindromes(self):
        """Get all distinct palindromes with their counts"""
        palindromes = []
        
        def extract_palindrome(node_idx, visited):
            if node_idx in visited or node_idx <= 1:  # Skip roots
                return
            visited.add(node_idx)
            
            node = self.nodes[node_idx]
            
            # Reconstruct palindrome using length and position
            if node.length > 0:
                # Find a position where this palindrome occurs
                pos = self.find_occurrence(node_idx)
                if pos != -1:
                    start = pos - node.length + 1
                    palindrome = self.string[start:pos + 1]
                    palindromes.append((palindrome, node.count))
            
            # Recursively visit children
            for child in node.edges.values():
                child_idx = self.nodes.index(child)
                extract_palindrome(child_idx, visited)
        
        extract_palindrome(0, set())  # Start from odd root
        extract_palindrome(1, set())  # Start from even root
        return palindromes
    
    def find_occurrence(self, node_idx):
        """Find a position where the palindrome occurs"""
        node = self.nodes[node_idx]
        length = node.length
        
        # Search for palindrome in string
        for i in range(length - 1, len(self.string)):
            start = i - length + 1
            if start >= 0:
                substring = self.string[start:i + 1]
                if substring == substring[::-1]:  # Check if palindrome
                    return i
        return -1
    
    def count_palindromic_substrings(self):
        """Count total palindromic substrings"""
        total = 0
        for i in range(2, len(self.nodes)):  # Skip roots
            total += self.nodes[i].count
        return total`,
    explanation: "A palindrome tree (eertree) stores all palindromic substrings of a string in a compact tree structure. It has two roots - one for odd-length palindromes and one for even-length palindromes. Each node represents a unique palindrome, and suffix links connect palindromes to their longest palindromic suffixes.",
    whyElegant: "The eertree captures all palindromic structure in linear space by cleverly using two trees and suffix links, enabling efficient palindrome queries while building incrementally.",
    keyInsight: "Palindrome trees prove that even the most complex string patterns can be organized into elegant tree structures that reveal hidden relationships between substrings.",
    analogy: "Like a family tree that traces palindromic inheritance - each palindrome knows its longest palindromic ancestor, creating a genealogy of symmetrical patterns.",
    sourceNote: "The Eertree was invented by Mikhail Rubinchik and Arseny Shur in 2014, named 'eertree' as a palindrome of 'tree'"
  },

  {
    id: "cartesian-tree-from-array",
    title: "Cartesian Tree from Array",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["trees", "cartesian-trees", "stack-construction", "range-queries", "heap-property"],
    code: `class CartesianNode:
    def __init__(self, value, index):
        self.value = value    # Value from array
        self.index = index    # Original position in array
        self.left = None      # Left child
        self.right = None     # Right child

class CartesianTree:
    def __init__(self):
        self.root = None
    
    def build_from_array(self, arr):
        """Build Cartesian tree from array using stack in O(n) time"""
        if not arr:
            return None
        
        stack = []  # Stack of nodes
        nodes = []  # All nodes for reference
        
        for i, value in enumerate(arr):
            new_node = CartesianNode(value, i)
            nodes.append(new_node)
            
            # Maintain heap property: parent value >= child value
            last_popped = None
            
            # Pop elements from stack that are greater than current
            while stack and stack[-1].value > value:
                last_popped = stack.pop()
            
            # Set relationships
            if last_popped:
                new_node.left = last_popped
            
            if stack:
                stack[-1].right = new_node
            
            stack.append(new_node)
        
        # Root is the first element remaining in stack
        self.root = stack[0] if stack else None
        return self.root
    
    def build_recursive(self, arr, start=0, end=None):
        """Alternative recursive construction (O(n log n) average, O(n²) worst)"""
        if end is None:
            end = len(arr) - 1
        
        if start > end:
            return None
        
        # Find minimum element in range (for min-heap property)
        min_idx = start
        for i in range(start + 1, end + 1):
            if arr[i] < arr[min_idx]:
                min_idx = i
        
        # Create root with minimum element
        root = CartesianNode(arr[min_idx], min_idx)
        
        # Recursively build left and right subtrees
        root.left = self.build_recursive(arr, start, min_idx - 1)
        root.right = self.build_recursive(arr, min_idx + 1, end)
        
        return root
    
    def inorder_indices(self, node=None):
        """Get indices in inorder traversal (should match original array order)"""
        if node is None:
            node = self.root
        
        result = []
        
        def inorder(n):
            if n:
                inorder(n.left)
                result.append(n.index)
                inorder(n.right)
        
        inorder(node)
        return result
    
    def range_minimum_query(self, node, left, right, query_left, query_right):
        """Answer range minimum queries using the Cartesian tree"""
        if not node or right < query_left or left > query_right:
            return float('inf'), -1
        
        if query_left <= left and right <= query_right:
            return node.value, node.index
        
        # Split range at root position
        root_pos = node.index
        
        left_min, left_idx = float('inf'), -1
        right_min, right_idx = float('inf'), -1
        
        if node.left:
            left_min, left_idx = self.range_minimum_query(
                node.left, left, root_pos - 1, query_left, query_right
            )
        
        if node.right:
            right_min, right_idx = self.range_minimum_query(
                node.right, root_pos + 1, right, query_left, query_right
            )
        
        # Include root if it's in query range
        candidates = []
        if query_left <= root_pos <= query_right:
            candidates.append((node.value, node.index))
        if left_min != float('inf'):
            candidates.append((left_min, left_idx))
        if right_min != float('inf'):
            candidates.append((right_min, right_idx))
        
        if candidates:
            return min(candidates)
        return float('inf'), -1
    
    def visualize(self, node=None, level=0):
        """Print tree structure for debugging"""
        if node is None:
            node = self.root
        
        if not node:
            return
        
        # Print right subtree first (higher on screen)
        self.visualize(node.right, level + 1)
        
        # Print current node
        print("  " * level + f"({node.value}@{node.index})")
        
        # Print left subtree
        self.visualize(node.left, level + 1)

# Example usage demonstrating the construction
def demonstrate_cartesian_tree():
    arr = [3, 2, 6, 1, 9, 7]
    ct = CartesianTree()
    
    print(f"Original array: {arr}")
    
    # Build using stack method
    ct.build_from_array(arr)
    print("Cartesian tree (stack construction):")
    ct.visualize()
    
    # Verify inorder traversal gives original order
    indices = ct.inorder_indices()
    print(f"Inorder indices: {indices}")
    print(f"Should be: {list(range(len(arr)))}")`,
    explanation: "A Cartesian tree built from an array maintains both the original array order (through inorder traversal) and the heap property (parent values are smaller/larger than children). The brilliant stack-based construction algorithm builds the tree in linear time by maintaining a stack of potential parents and using the heap property to determine parent-child relationships.",
    whyElegant: "The stack construction elegantly solves a seemingly quadratic problem in linear time by recognizing that each element can be the right child of at most one previous element.",
    keyInsight: "Cartesian trees prove that you can simultaneously preserve array order and heap structure, bridging the gap between sequential and hierarchical data organization.",
    analogy: "Like organizing a line of people by height where everyone can see over the people in front of them - the tree structure naturally emerges from the height relationships while preserving the original ordering.",
    sourceNote: "Cartesian trees were introduced by Jean Vuillemin in 1980, with the linear-time stack construction discovered later"
  },

  {
    id: "kinetic-heaps-concept",
    title: "Kinetic Heaps Concept",
    language: "Python",
    category: "Data Structure Design Moments",
    conceptTags: ["heaps", "kinetic-data-structures", "time-varying", "event-driven", "motion"],
    code: `import heapq
from dataclasses import dataclass
from typing import List, Tuple
import math

@dataclass
class KineticObject:
    """Object with linear motion: position = start + velocity * time"""
    id: int
    start_pos: float    # Initial position
    velocity: float     # Rate of change
    
    def position_at_time(self, time: float) -> float:
        return self.start_pos + self.velocity * time

@dataclass 
class Event:
    """Event when two objects' order changes"""
    time: float
    obj1_id: int
    obj2_id: int
    
    def __lt__(self, other):
        return self.time < other.time

class KineticHeap:
    def __init__(self, objects: List[KineticObject], current_time: float = 0):
        self.objects = {obj.id: obj for obj in objects}
        self.current_time = current_time
        self.event_queue = []  # Priority queue of future events
        
        # Build initial heap based on current positions
        self._rebuild_heap()
        self._schedule_all_events()
    
    def _rebuild_heap(self):
        """Rebuild heap based on current positions"""
        positions = []
        for obj_id, obj in self.objects.items():
            pos = obj.position_at_time(self.current_time)
            positions.append((pos, obj_id))
        
        # Sort by position to get current heap order
        positions.sort()
        self.heap_order = [obj_id for _, obj_id in positions]
    
    def _schedule_all_events(self):
        """Schedule all potential order-change events"""
        self.event_queue.clear()
        
        # Check all adjacent pairs in current heap order
        for i in range(len(self.heap_order) - 1):
            obj1_id = self.heap_order[i]
            obj2_id = self.heap_order[i + 1]
            
            collision_time = self._find_collision_time(obj1_id, obj2_id)
            if collision_time > self.current_time:
                event = Event(collision_time, obj1_id, obj2_id)
                heapq.heappush(self.event_queue, event)
    
    def _find_collision_time(self, obj1_id: int, obj2_id: int) -> float:
        """Find when two objects will have same position"""
        obj1 = self.objects[obj1_id]
        obj2 = self.objects[obj2_id]
        
        # Solve: obj1.start + obj1.vel * t = obj2.start + obj2.vel * t
        # (obj1.start - obj2.start) = (obj2.vel - obj1.vel) * t
        
        velocity_diff = obj2.velocity - obj1.velocity
        position_diff = obj1.start_pos - obj2.start_pos
        
        if abs(velocity_diff) < 1e-9:  # Parallel motion
            return float('inf')
        
        collision_time = position_diff / velocity_diff
        return collision_time if collision_time > self.current_time else float('inf')
    
    def advance_to_time(self, target_time: float):
        """Process all events up to target time"""
        while (self.event_queue and 
               self.event_queue[0].time <= target_time):
            
            event = heapq.heappop(self.event_queue)
            self.current_time = event.time
            
            # Swap the two objects that just collided
            self._handle_collision(event.obj1_id, event.obj2_id)
        
        self.current_time = target_time
    
    def _handle_collision(self, obj1_id: int, obj2_id: int):
        """Handle collision between two objects"""
        # Find positions of objects in heap order
        try:
            pos1 = self.heap_order.index(obj1_id)
            pos2 = self.heap_order.index(obj2_id)
            
            # Swap if they're adjacent
            if abs(pos1 - pos2) == 1:
                self.heap_order[pos1], self.heap_order[pos2] = obj2_id, obj1_id
                
                # Reschedule events involving these objects
                self._reschedule_events_around(min(pos1, pos2))
        except ValueError:
            pass  # Objects not found in current order
    
    def _reschedule_events_around(self, position: int):
        """Reschedule events around a position that changed"""
        # Remove old events involving these objects (simplified)
        # In practice, would use more sophisticated event management
        
        # Schedule new events for new adjacencies
        for i in range(max(0, position - 1), min(len(self.heap_order) - 1, position + 2)):
            if i + 1 < len(self.heap_order):
                obj1_id = self.heap_order[i]
                obj2_id = self.heap_order[i + 1]
                
                collision_time = self._find_collision_time(obj1_id, obj2_id)
                if collision_time > self.current_time:
                    event = Event(collision_time, obj1_id, obj2_id)
                    heapq.heappush(self.event_queue, event)
    
    def get_minimum(self) -> int:
        """Get object with minimum position at current time"""
        if not self.heap_order:
            return None
        
        # The minimum is the first object in heap order
        return self.heap_order[0]
    
    def get_positions_at_current_time(self) -> List[Tuple[int, float]]:
        """Get all object positions at current time"""
        positions = []
        for obj_id, obj in self.objects.items():
            pos = obj.position_at_time(self.current_time)
            positions.append((obj_id, pos))
        return sorted(positions, key=lambda x: x[1])
    
    def insert_object(self, obj: KineticObject):
        """Insert new moving object"""
        self.objects[obj.id] = obj
        
        # Find correct position in current heap order
        current_pos = obj.position_at_time(self.current_time)
        
        # Simple insertion - rebuild for simplicity
        # Production implementation would be more efficient
        self._rebuild_heap()
        self._schedule_all_events()

# Example demonstrating kinetic heap behavior
def demonstrate_kinetic_heap():
    # Create objects with different starting positions and velocities
    objects = [
        KineticObject(1, start_pos=10, velocity=-1),  # Moving left
        KineticObject(2, start_pos=5, velocity=2),    # Moving right fast  
        KineticObject(3, start_pos=0, velocity=1),    # Moving right slow
        KineticObject(4, start_pos=15, velocity=-0.5) # Moving left slow
    ]
    
    kh = KineticHeap(objects, current_time=0)
    
    # Show evolution over time
    for t in [0, 2, 4, 6, 8, 10]:
        kh.advance_to_time(t)
        positions = kh.get_positions_at_current_time()
        minimum_obj = kh.get_minimum()
        
        print(f"Time {t}:")
        for obj_id, pos in positions:
            marker = " <-- MIN" if obj_id == minimum_obj else ""
            print(f"  Object {obj_id}: position {pos:.1f}{marker}")
        print()`,
    explanation: "Kinetic heaps maintain a heap property over objects whose positions change continuously over time according to known motion equations. Instead of constantly updating positions, they precompute when objects will change order and schedule these 'collision events' in advance. The heap structure is maintained by processing only the necessary events as time advances.",
    whyElegant: "Kinetic heaps transform continuous motion into discrete events, maintaining data structure invariants without constant updates by predicting exactly when changes will occur.",
    keyInsight: "Kinetic data structures prove that time-varying problems can be solved efficiently by scheduling the future rather than continuously monitoring the present.",
    analogy: "Like a race track timing system that doesn't need to constantly check runner positions - it calculates when runners will pass each other and only updates the leaderboard at those precise moments.",
    sourceNote: "Kinetic data structures were introduced by Leonidas Guibas, John Hershberger, and others in the 1990s for computational geometry applications"
  },
{
    id: 'link-cut-tree-access',
    title: 'The Tree That Rewires Itself When You Look at It',
    language: 'Python',
    category: 'Data Structure Design Moments' as const,
    conceptTags: ['dynamic trees', 'amortized', 'splay'],
    code: `class Node:
    def __init__(self, val):
        self.val = val
        self.left = self.right = self.parent = None
        self.reversed = False

def splay(x):
    while not is_root(x):
        p = x.parent
        if not is_root(p):
            g = p.parent
            if (g.left == p) == (p.left == x):
                rotate(p)  # zig-zig
            else:
                rotate(x)  # zig-zag
        rotate(x)

def access(x):
    splay(x)
    x.right = None  # detach preferred child
    while x.parent:
        y = x.parent
        splay(y)
        y.right = x  # make x the preferred child
        x = y
    splay(x)`,
    explanation: 'A link-cut tree maintains a forest of nodes where you can quickly cut edges and link new ones. When you "access" a node, the tree restructures itself so that the path from that node to the root becomes a single fast-access chain. Nodes you visit frequently stay near the top.',
    whyElegant: 'The tree literally reshapes itself around your queries. Frequently accessed paths compress into straight lines, like a hiking trail that gets wider and smoother the more people walk on it.',
    keyInsight: 'By restructuring the tree around each access, the cost of future accesses on the same path drops to nearly free.',
    analogy: 'Like a library that moves every book you check out to the front desk — the more you use something, the faster it is to find.',
    sourceNote: 'Daniel Sleator and Robert Tarjan, 1983',
  },
  {
    id: 'top-tree-concept',
    title: 'Summarizing an Entire Tree in Constant Time',
    language: 'Python',
    category: 'Data Structure Design Moments' as const,
    conceptTags: ['tree contraction', 'clustering', 'dynamic trees'],
    code: `# Top tree clusters: each cluster summarizes a connected subtree
class Cluster:
    def __init__(self, boundary_a, boundary_b, summary):
        self.boundary = (boundary_a, boundary_b)
        self.summary = summary

def compress(cluster_a, cluster_b):
    """Merge two clusters sharing a boundary node."""
    shared = set(cluster_a.boundary) & set(cluster_b.boundary)
    new_boundary = (
        (set(cluster_a.boundary) | set(cluster_b.boundary)) - shared
    )
    a, b = tuple(new_boundary) if len(new_boundary) == 2 else (list(new_boundary)[0], list(new_boundary)[0])
    return Cluster(a, b, cluster_a.summary + cluster_b.summary)

def rake(child_cluster, spine_cluster):
    """Attach a side cluster onto the spine."""
    return Cluster(
        spine_cluster.boundary[0],
        spine_cluster.boundary[1],
        spine_cluster.summary + child_cluster.summary,
    )`,
    explanation: 'A top tree takes an entire tree and hierarchically compresses it into a single summary node using two operations: compress (merge along a path) and rake (fold in side branches). You can then answer questions about any path in the tree by looking at just a few cluster summaries.',
    whyElegant: 'Two operations — compress and rake — are enough to reduce any tree to a single point. The whole structure collapses like a folding telescope, and any path query can be answered by unfolding just the relevant sections.',
    keyInsight: 'Any tree can be reduced to a single cluster by repeatedly merging paths and folding in branches.',
    analogy: 'Like a manager who only needs to read department summaries instead of every employee report — the hierarchy compresses detail into digestible chunks.',
    sourceNote: 'Alstrup, Holm, de Lichtenberg, and Thorup, 2005',
  },
  {
    id: 'sqrt-decomposition-queries',
    title: 'The Square Root Trick That Balances Everything',
    language: 'Python',
    category: 'Data Structure Design Moments' as const,
    conceptTags: ['sqrt decomposition', 'block queries', 'trade-off'],
    code: `import math

class SqrtDecomposition:
    def __init__(self, arr):
        self.arr = arr[:]
        self.n = len(arr)
        self.block = int(math.ceil(math.sqrt(self.n)))
        self.blocks = [0] * self.block
        for i in range(self.n):
            self.blocks[i // self.block] += arr[i]

    def update(self, i, val):
        self.blocks[i // self.block] += val - self.arr[i]
        self.arr[i] = val

    def query(self, l, r):
        total = 0
        while l <= r and l % self.block != 0:
            total += self.arr[l]; l += 1
        while l + self.block - 1 <= r:
            total += self.blocks[l // self.block]; l += self.block
        while l <= r:
            total += self.arr[l]; l += 1
        return total`,
    explanation: 'Instead of looking at every element to answer a range query, you divide the array into blocks of size roughly equal to the square root of the total length. Each block stores a pre-computed summary. To answer a query, you combine a few individual elements at the edges and whole block summaries in the middle.',
    whyElegant: 'The square root is the magic number where the cost of scanning individual elements and the cost of scanning blocks balance perfectly. Neither dominates, so both update and query take about the same moderate time.',
    keyInsight: 'Splitting data into square-root-sized blocks gives both updates and queries the same moderate cost, because the square root is where the two opposing costs meet.',
    analogy: 'Like organizing a 100-page document into 10-page chapters — you can jump to the right chapter quickly, then scan a few pages within it.',
    sourceNote: 'Classical technique, widely used in competitive programming',
  },
  {
    id: 'fractional-cascading-search',
    title: 'Searching Many Sorted Lists at the Speed of One',
    language: 'Python',
    category: 'Data Structure Design Moments' as const,
    conceptTags: ['fractional cascading', 'binary search', 'augmentation'],
    code: `def build_cascaded(lists):
    """Build fractional cascading structure from k sorted lists."""
    k = len(lists)
    augmented = [None] * k
    augmented[k - 1] = [(v, 0, None) for v in lists[k - 1]]

    for i in range(k - 2, -1, -1):
        # Take every other element from the next level
        promoted = augmented[i + 1][::2]
        merged = []
        a, b = 0, 0
        orig = [(v, 0, None) for v in lists[i]]
        prom = [(v, 1, pos * 2) for pos, (v, _, _) in enumerate(promoted)]
        combined = sorted(orig + prom, key=lambda x: x[0])
        augmented[i] = combined
    return augmented

def cascaded_search(augmented, target):
    """Search for target across all lists with one binary search."""
    import bisect
    results = []
    keys = [x[0] for x in augmented[0]]
    pos = bisect.bisect_left(keys, target)
    results.append(pos)
    for level in augmented[1:]:
        keys = [x[0] for x in level]
        pos = bisect.bisect_left(keys, target)
        results.append(pos)
    return results`,
    explanation: 'If you need to search for the same value in many sorted lists, you could do a separate binary search in each one. Fractional cascading threads the lists together by promoting every other element from one list into the next, creating shortcuts. After the first binary search, each subsequent list only needs a constant-time step.',
    whyElegant: 'The first search does the heavy lifting; every search after that rides the coattails of the previous one. By weaving the lists together with promoted elements, you turn k separate binary searches into one binary search plus k constant-time lookups.',
    keyInsight: 'Promoting a fraction of each list into the one above creates bridges that let one binary search answer queries across all lists.',
    analogy: 'Like a building where every other step on each staircase connects to the next staircase — once you find your floor on the first staircase, you can step across to the same floor on every other staircase instantly.',
    sourceNote: 'Bernard Chazelle and Leonidas Guibas, 1986',
  },
  {
    id: 'cache-oblivious-btree',
    title: 'The Tree That Runs Fast on Any Computer',
    language: 'Python',
    category: 'Data Structure Design Moments' as const,
    conceptTags: ['cache-oblivious', 'van Emde Boas layout', 'memory hierarchy'],
    code: `def veb_layout(arr, start=0, end=None):
    """Lay out a complete binary tree in van Emde Boas order
       for cache-oblivious access."""
    if end is None:
        end = len(arr) - 1
    if start > end:
        return []
    if start == end:
        return [arr[start]]

    n = end - start + 1
    h = n.bit_length()
    top_h = h // 2
    bottom_h = h - top_h
    top_size = (1 << top_h) - 1

    # Recursively lay out top tree, then each bottom subtree
    mid = start + top_size
    result = veb_layout(arr, start, start + top_size - 1)

    i = mid
    while i <= end:
        subtree_end = min(i + (1 << bottom_h) - 2, end)
        result.extend(veb_layout(arr, i, subtree_end))
        i = subtree_end + 1

    return result

# Usage: veb_layout(sorted_array) produces an ordering that
# minimizes cache misses on ANY cache size`,
    explanation: 'Most data structures are tuned for a specific cache size. A cache-oblivious B-tree uses a special memory layout — the van Emde Boas layout — that recursively interleaves the top half and bottom halves of the tree. This arrangement happens to be efficient on any computer, regardless of its cache size, without needing to know what that size is.',
    whyElegant: 'The layout is fractal — the same pattern repeats at every scale. Because of this self-similarity, it matches well with any cache size, from tiny L1 caches to large disk blocks. You get good performance everywhere without tuning for anywhere.',
    keyInsight: 'A recursively self-similar memory layout automatically adapts to every level of the memory hierarchy without knowing the cache sizes.',
    analogy: 'Like a Russian nesting doll where each layer fits perfectly inside the next — no matter which layer you open, the proportions are always right.',
    sourceNote: 'Prokop, 1999; based on ideas from van Emde Boas',
  },
  {
    id: 'x-fast-trie',
    title: 'Finding Your Neighbor by Hashing the Search Path',
    language: 'Python',
    category: 'Data Structure Design Moments' as const,
    conceptTags: ['x-fast trie', 'hashing', 'predecessor query'],
    code: `class XFastTrie:
    def __init__(self, universe_bits):
        self.w = universe_bits
        # One hash table per level of the binary trie
        self.levels = [dict() for _ in range(self.w + 1)]
        self.head = None  # linked list of leaves

    def _prefix(self, x, level):
        return x >> (self.w - level)

    def successor(self, x):
        # Binary search on the levels to find the
        # lowest ancestor that exists
        lo, hi = 0, self.w
        while lo < hi:
            mid = (lo + hi) // 2
            if self._prefix(x, mid) in self.levels[mid]:
                lo = mid + 1
            else:
                hi = mid
        # lo is the level where the trie diverges
        # Follow the pointer at that level to find
        # the nearest leaf in the linked list
        ancestor_prefix = self._prefix(x, lo - 1)
        node = self.levels[lo - 1].get(ancestor_prefix)
        if node:
            return node.get('successor')
        return None`,
    explanation: 'An x-fast trie stores numbers and can find the next larger or smaller number extremely quickly. It keeps a hash table at every level of a binary tree over the numbers. To find a successor, it binary searches the levels using hash lookups — each step cuts the remaining levels in half — then follows a pointer to the answer.',
    whyElegant: 'Binary search usually needs a sorted array, but here it searches the levels of a trie using hash tables. The combination of two classic ideas — binary search and hashing — produces successor queries in O(log log n) time, which is astonishingly fast.',
    keyInsight: 'Binary searching the depth of a trie with hash tables at each level finds predecessors in doubly-logarithmic time.',
    analogy: 'Like finding your seat in a stadium by first checking which section (hashed by row), then which row within that section — you narrow down by halves using signs at each level.',
    sourceNote: 'Dan Willard, 1983',
  },
  {
    id: 'y-fast-trie',
    title: 'Saving Space by Splitting Into Buckets',
    language: 'Python',
    category: 'Data Structure Design Moments' as const,
    conceptTags: ['y-fast trie', 'bucketing', 'predecessor query'],
    code: `import bisect, math

class YFastTrie:
    def __init__(self, universe_bits):
        self.w = universe_bits
        self.bucket_size = self.w  # ~log(U) elements per bucket
        self.representatives = []  # sorted list of bucket reps
        self.buckets = {}  # rep -> sorted list of elements

    def insert(self, x):
        if not self.representatives:
            self.representatives.append(x)
            self.buckets[x] = [x]
            return

        # Find the right bucket
        i = bisect.bisect_right(self.representatives, x)
        rep = self.representatives[max(0, i - 1)]
        bucket = self.buckets[rep]
        bisect.insort(bucket, x)

        # Split if too large
        if len(bucket) > 2 * self.bucket_size:
            mid = len(bucket) // 2
            new_rep = bucket[mid]
            self.buckets[new_rep] = bucket[mid:]
            self.buckets[rep] = bucket[:mid]
            bisect.insort(self.representatives, new_rep)

    def successor(self, x):
        i = bisect.bisect_left(self.representatives, x)
        for j in [max(0, i - 1), i]:
            if j < len(self.representatives):
                rep = self.representatives[j]
                bucket = self.buckets[rep]
                k = bisect.bisect_right(bucket, x)
                if k < len(bucket):
                    return bucket[k]
        return None`,
    explanation: 'A y-fast trie improves on x-fast tries by grouping elements into small sorted buckets of about log(n) elements each. Only one representative per bucket goes into the x-fast trie. To find a successor, you use the trie to locate the right bucket, then do a quick search within that small bucket.',
    whyElegant: 'By introducing one level of indirection — buckets with representatives — the space drops from O(n log n) to O(n) while keeping the same fast query time. The trick is that small sorted buckets are cheap to search, so you only need the expensive trie structure for the representatives.',
    keyInsight: 'Grouping elements into small buckets and only indexing the representatives gives linear space with doubly-logarithmic query time.',
    analogy: 'Like a hotel where only floor numbers are listed in the lobby directory — you find the right floor quickly, then just walk down the hallway to find your room.',
    sourceNote: 'Dan Willard, 1983',
  },
  {
    id: 'fusion-tree-concept',
    title: 'Packing Multiple Comparisons Into One Machine Word',
    language: 'Python',
    category: 'Data Structure Design Moments' as const,
    conceptTags: ['fusion tree', 'word-level parallelism', 'bit tricks'],
    code: `def sketch(keys, bits_to_extract):
    """Compress each key by extracting only the distinguishing bits.
    This is the core idea: we don't need all the bits, just the ones
    where the keys actually differ."""
    sketched = []
    for k in keys:
        compressed = 0
        for i, bit_pos in enumerate(bits_to_extract):
            if k & (1 << bit_pos):
                compressed |= (1 << i)
        sketched.append(compressed)
    return sketched

def parallel_compare(query_sketch, packed_sketches, num_keys, sketch_bits):
    """Simulate comparing query against all keys at once using
    bit-parallel operations on a single machine word."""
    # Pack the query sketch into each slot
    query_packed = 0
    for i in range(num_keys):
        query_packed |= query_sketch << (i * (sketch_bits + 1))
    # XOR finds differences, leading zeros find the rank
    diff = packed_sketches ^ query_packed
    return diff  # Position of first zero-block gives the rank

# In a real fusion tree on a w-bit machine, B^(1/5) keys
# fit in one node, and all B comparisons happen in O(1)
# word operations`,
    explanation: 'A fusion tree stores a small number of keys in each node and uses bit tricks to compare a search value against all of them simultaneously in a single operation. It extracts only the bits where keys differ (the "sketch"), packs those compressed keys into one machine word, and uses word-level parallelism to find where the query fits among them.',
    whyElegant: 'The insight is that most bits in similar keys are identical and can be ignored. By compressing keys to just their distinguishing bits, several keys fit in a single machine word, and one XOR operation does what would otherwise take multiple comparisons.',
    keyInsight: 'Extracting only the bits where keys differ lets you pack multiple keys into one word and compare against all of them at once.',
    analogy: 'Like sorting students by just the first letter of their last name instead of spelling out the whole name — most of the information is redundant for the comparison you need to make.',
    sourceNote: 'Michael Fredman and Dan Willard, 1993',
  },
  {
    id: 'exponential-search-tree',
    title: 'A Tree Whose Branching Factor Keeps Growing',
    language: 'Python',
    category: 'Data Structure Design Moments' as const,
    conceptTags: ['exponential tree', 'adaptive search', 'interpolation'],
    code: `class ExpSearchTree:
    """Exponential search tree: nodes at depth d have
    degree 2^(2^d). The root has degree 4, its children
    have degree 16, their children degree 256, and so on."""

    def __init__(self):
        self.keys = []     # sorted keys at this node
        self.children = [] # child subtrees

    def search(self, x):
        # Exponential search: check positions 1, 2, 4, 8, ...
        # then binary search the narrowed range
        if not self.keys:
            return False
        bound = 1
        while bound < len(self.keys) and self.keys[bound] < x:
            bound *= 2
        lo = bound // 2
        hi = min(bound, len(self.keys) - 1)

        # Binary search in [lo, hi]
        while lo <= hi:
            mid = (lo + hi) // 2
            if self.keys[mid] == x:
                return True
            elif self.keys[mid] < x:
                lo = mid + 1
            else:
                hi = mid - 1

        # Recurse into the appropriate child
        if lo < len(self.children):
            return self.children[lo].search(x)
        return False`,
    explanation: 'An exponential search tree has nodes whose branching factor grows exponentially with depth. The root might have 4 children, the next level 16, then 256, and so on. Within each node, exponential search (checking positions 1, 2, 4, 8...) quickly narrows down the right child. This gives optimal search times for integer keys.',
    whyElegant: 'The tree adapts its shape to the distribution of queries. Shallow nodes have few children (cheap to maintain), while deeper nodes have many (but are rarely reached). The exponential growth in branching means the tree has very few levels even for large datasets.',
    keyInsight: 'A tree with exponentially increasing branching factor at each level achieves optimal integer search bounds because most queries terminate near the root.',
    analogy: 'Like a tournament bracket where the first round has 4 players, the second has 16, and the third has 256 — most games are decided early, and only the closest matches go deep.',
    sourceNote: 'Arne Andersson, 1996',
  },
  {
    id: 'veb-priority-queue',
    title: 'A Priority Queue That Operates in Double-Log Time',
    language: 'Python',
    category: 'Data Structure Design Moments' as const,
    conceptTags: ['van Emde Boas', 'priority queue', 'recursive universe'],
    code: `class VEBTree:
    def __init__(self, universe):
        self.u = universe
        self.min = self.max = None
        if universe > 2:
            self.sqrt_u = int(universe ** 0.5)
            self.summary = VEBTree(self.sqrt_u)
            self.cluster = [VEBTree(self.sqrt_u)
                           for _ in range(self.sqrt_u)]

    def high(self, x): return x // self.sqrt_u
    def low(self, x):  return x % self.sqrt_u
    def index(self, h, l): return h * self.sqrt_u + l

    def insert(self, x):
        if self.min is None:
            self.min = self.max = x
            return
        if x < self.min:
            x, self.min = self.min, x
        if self.u > 2:
            h, l = self.high(x), self.low(x)
            if self.cluster[h].min is None:
                self.summary.insert(h)
            self.cluster[h].insert(l)
        if x > self.max:
            self.max = x

    def extract_min(self):
        if self.min is None:
            return None
        result = self.min
        if self.min == self.max:
            self.min = self.max = None
            return result
        if self.u <= 2:
            self.min = self.max
            self.max = self.min
            return result
        first_cluster = self.summary.min
        x = self.index(first_cluster,
                       self.cluster[first_cluster].min)
        self.cluster[first_cluster].extract_min()
        if self.cluster[first_cluster].min is None:
            self.summary.extract_min()
        self.min = x
        return result`,
    explanation: 'A van Emde Boas tree works as a priority queue for integers drawn from a known range. It splits the universe of possible values into clusters of square-root size, and each cluster is itself a smaller van Emde Boas tree. Inserting or extracting the minimum takes O(log log n) time — for a million elements, that is about 4 steps instead of 20.',
    whyElegant: 'The recursive structure is the key. At each level, the universe size is square-rooted, so it shrinks incredibly fast. A universe of 2^32 becomes 2^16, then 2^8, then 2^4, then 2^2 — just five levels for four billion possible values.',
    keyInsight: 'Recursively dividing the universe by its square root yields a tree of depth log-log-n, making every operation doubly logarithmic.',
    analogy: 'Like a library where sections are divided into sub-sections that are divided into shelves — but each division is so aggressive that even a library of a billion books only has four levels of signs to follow.',
    sourceNote: 'Peter van Emde Boas, 1975',
  },
];
