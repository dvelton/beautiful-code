import type { CuratedExample } from '../../types';

export const pythonPatterns: CuratedExample[] = [
  {
    id: 'zip-matrix-transpose',
    title: 'Matrix Transpose with zip(*matrix)',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['matrix', 'transpose', 'unpacking'],
    code: `matrix = [[1, 2, 3],
          [4, 5, 6],
          [7, 8, 9]]

transposed = list(zip(*matrix))
# [(1, 4, 7), (2, 5, 8), (3, 6, 9)]`,
    explanation:
      'This takes a grid of numbers arranged in rows and flips it so that rows become columns and columns become rows. The asterisk unpacks each row and zip lines up elements at matching positions across all of them.',
    whyElegant:
      'A matrix transpose that mathematicians denote with a tiny superscript T becomes a single expression. No index tracking, no nested loops, just zip and an asterisk doing the heavy lifting.',
    keyInsight:
      'The asterisk operator unpacks a list of lists into separate arguments, letting zip reassemble them column by column.',
    analogy:
      'A teacher collects homework row by row, then re-sorts the stack by question number instead of by student name.',
    sourceNote:
      'Built-in zip has been in Python since version 2.0 (2000); the *-unpacking transpose is a well-known Pythonic idiom.',
  },
  {
    id: 'list-comprehension-nested-loops',
    title: 'List Comprehension Replacing Nested Loops',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['comprehension', 'iteration', 'filtering'],
    code: `# Instead of:
result = []
for x in range(5):
    for y in range(5):
        if x != y:
            result.append((x, y))

# Write:
pairs = [(x, y) for x in range(5) for y in range(5) if x != y]`,
    explanation:
      'This builds a list of all coordinate pairs where the two values are different. The comprehension reads left to right: for each x, for each y, keep the pair only if x and y are not the same.',
    whyElegant:
      'Six lines of loops, conditions, and appending collapse into one readable line. The intent is right there in the expression instead of scattered across a block of code.',
    keyInsight:
      'A list comprehension expresses what you want to collect, not the mechanical steps to collect it.',
    analogy:
      'Telling a store clerk to grab every shirt-and-pants combination except where both are the same color, instead of walking the aisles yourself with a shopping cart.',
    sourceNote:
      'List comprehensions were introduced in Python 2.0 (2000), inspired by set-builder notation in mathematics and similar features in Haskell.',
  },
  {
    id: 'generator-pipeline',
    title: 'Generator Pipeline for Streaming Data',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['generator', 'pipeline', 'lazy evaluation'],
    code: `def read_lines(path):
    with open(path) as f:
        yield from f

def strip_lines(lines):
    for line in lines:
        yield line.strip()

def non_empty(lines):
    for line in lines:
        if line:
            yield line

pipeline = non_empty(strip_lines(read_lines("data.txt")))
for clean_line in pipeline:
    process(clean_line)`,
    explanation:
      'Each function in the chain produces values one at a time instead of building a whole list in memory. The file is read line by line, whitespace is trimmed, and blank lines are skipped, all without loading the entire file at once.',
    whyElegant:
      'Each generator does one small job and hands off to the next, like a factory assembly line. The whole file could be a terabyte and memory usage stays constant because only one line exists in memory at a time.',
    keyInsight:
      'Generators turn a batch process into a streaming pipeline where data flows through transformations one piece at a time.',
    analogy:
      'A bucket brigade passing water from a well to a fire: no one person carries the whole supply, each just passes one bucket to the next.',
    sourceNote:
      'Generators were introduced in Python 2.2 (2001) via PEP 255; yield from was added in Python 3.3 via PEP 380.',
  },
  {
    id: 'walrus-operator-while',
    title: 'Walrus Operator in a While Loop',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['walrus operator', 'assignment expression', 'loops'],
    code: `import re

# Read and process chunks until the file is exhausted
with open("data.bin", "rb") as f:
    while chunk := f.read(8192):
        process(chunk)

# Another common use: regex search in a loop
while m := re.search(r"ERROR (\\w+)", get_next_log_line()):
    print(f"Found error code: {m.group(1)}")`,
    explanation:
      'The := operator assigns a value and returns it in the same expression. The while loop reads a chunk, assigns it to the variable, and checks whether it is truthy, all in one line. When the read returns empty bytes, the loop stops.',
    whyElegant:
      'Without the walrus operator you would need to read once before the loop, then read again at the bottom. The := eliminates that awkward duplication by combining assignment and testing.',
    keyInsight:
      'The walrus operator lets you capture a value and test it in one expression, removing the need for priming reads or redundant calls.',
    analogy:
      'Tasting soup as you ladle it: you scoop, taste, and decide whether to keep serving in one motion instead of scooping, putting the ladle down, picking up a spoon, tasting, then picking up the ladle again.',
    sourceNote:
      'The walrus operator was introduced in Python 3.8 (2019) via PEP 572, one of the most debated PEPs in Python history.',
  },
  {
    id: 'enumerate-index-tracking',
    title: 'Enumerate for Index Tracking',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['enumerate', 'iteration', 'indexing'],
    code: `names = ["Alice", "Bob", "Charlie"]

for i, name in enumerate(names, start=1):
    print(f"{i}. {name}")
# 1. Alice
# 2. Bob
# 3. Charlie`,
    explanation:
      'This loops through a list and gives you both the position number and the item at each step. The start parameter lets you begin counting from 1 instead of 0, which is handy for human-readable output.',
    whyElegant:
      'No manual counter variable, no range(len(...)) gymnastics. enumerate packages up the bookkeeping so the loop body focuses on the actual work.',
    keyInsight:
      'enumerate pairs each item with its index, eliminating manual counter management and off-by-one mistakes.',
    analogy:
      'A race official handing out numbered bibs as runners line up, so each runner automatically knows their position without counting heads.',
    sourceNote:
      'enumerate was added in Python 2.3 (2003) via PEP 279 to replace the common pattern of using range(len(seq)).',
  },
  {
    id: 'counter-frequency',
    title: 'Counter for Frequency Counting',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['Counter', 'collections', 'frequency'],
    code: `from collections import Counter

words = "the cat sat on the mat the cat".split()
freq = Counter(words)
# Counter({'the': 3, 'cat': 2, 'sat': 1, 'on': 1, 'mat': 1})

print(freq.most_common(2))
# [('the', 3), ('cat', 2)]`,
    explanation:
      'Counter takes any iterable and counts how many times each item appears. You get a dictionary-like object where keys are items and values are counts. The most_common method returns the top entries sorted by frequency.',
    whyElegant:
      'Counting things is one of the most common tasks in programming, and Counter does it in a single call. No manual dictionary, no if-key-exists checks, no incrementing.',
    keyInsight:
      'Counter turns any iterable into a frequency table in one step, including ranked retrieval of the most common items.',
    analogy:
      'A poll worker who tallies votes by dropping each ballot into a labeled bucket, then stacking the buckets by height to see who won.',
    sourceNote:
      'collections.Counter was added in Python 2.7 and 3.1 (2009), designed by Raymond Hettinger.',
  },
  {
    id: 'groupby-sorted-data',
    title: 'groupby on Sorted Data',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['groupby', 'itertools', 'grouping'],
    code: `from itertools import groupby

data = [("fruit", "apple"), ("veggie", "carrot"),
        ("fruit", "banana"), ("veggie", "pea")]

for key, group in groupby(sorted(data), key=lambda x: x[0]):
    items = [item[1] for item in group]
    print(f"{key}: {items}")
# fruit: ['apple', 'banana']
# veggie: ['carrot', 'pea']`,
    explanation:
      'This groups a list of tagged items by their category. Because groupby only groups consecutive matches, the data is sorted first. Then for each category, it collects all the items that belong to it.',
    whyElegant:
      'Sorting followed by groupby is a clean two-step recipe for categorization. Each group is generated lazily, so even large datasets use minimal memory.',
    keyInsight:
      'groupby clusters consecutive identical keys, so sorting first guarantees that all items in the same category end up adjacent.',
    analogy:
      'Sorting a deck of playing cards by suit, then splitting the sorted deck into four piles at each suit boundary.',
    sourceNote:
      'itertools.groupby has been available since Python 2.4 (2004); its design mirrors the SQL GROUP BY clause and the Unix uniq command.',
  },
  {
    id: 'lru-cache-memoisation',
    title: 'lru_cache for Automatic Memoisation',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['lru_cache', 'memoisation', 'recursion', 'functools'],
    code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print(fib(100))  # 354224848179261915075 — instant`,
    explanation:
      'This decorator remembers the result of every call so the same calculation never runs twice. The naive recursive Fibonacci would take astronomical time for fib(100), but with caching each value is computed exactly once.',
    whyElegant:
      'One decorator line transforms an exponentially slow function into a linear-time one. The algorithm stays readable and recursive while the performance becomes practical.',
    keyInsight:
      'lru_cache adds a transparent results dictionary to any function, trading a small amount of memory for potentially massive time savings.',
    analogy:
      'A student who writes each homework answer on a sticky note and checks the notes before re-solving a problem, turning hours of rework into seconds of lookup.',
    sourceNote:
      'functools.lru_cache was added in Python 3.2 (2011) via PEP 3136; maxsize=None gives an unbounded cache.',
  },
  {
    id: 'defaultdict-grouping',
    title: 'defaultdict for Effortless Grouping',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['defaultdict', 'collections', 'grouping'],
    code: `from collections import defaultdict

words = ["apple", "banana", "avocado", "blueberry", "cherry"]
by_letter = defaultdict(list)

for word in words:
    by_letter[word[0]].append(word)

# {'a': ['apple', 'avocado'], 'b': ['banana', 'blueberry'], 'c': ['cherry']}`,
    explanation:
      'defaultdict creates a missing dictionary entry automatically the first time you access it. Here, every new first letter gets an empty list without you having to check whether the key already exists.',
    whyElegant:
      'The if-key-not-in-dict-create-empty-list dance disappears entirely. Every access just works, and the grouping logic reads as a simple loop with an append.',
    keyInsight:
      'defaultdict eliminates key-existence checks by generating a default value on first access, keeping loops clean and focused on the real work.',
    analogy:
      'A filing cabinet where pulling open a drawer that does not exist yet causes a new empty drawer to appear automatically, ready for your first document.',
    sourceNote:
      'collections.defaultdict was added in Python 2.5 (2006), created by Guido van Rossum to simplify a very common dictionary pattern.',
  },
  {
    id: 'dict-comprehension-invert',
    title: 'Dict Comprehension to Invert a Mapping',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['dict comprehension', 'mapping', 'inversion'],
    code: `original = {"a": 1, "b": 2, "c": 3}
inverted = {v: k for k, v in original.items()}
# {1: 'a', 2: 'b', 3: 'c'}`,
    explanation:
      'This swaps every key-value pair so that values become keys and keys become values. The comprehension walks through each pair and builds a new dictionary with the positions reversed.',
    whyElegant:
      'Inverting a dictionary is a one-liner that reads almost like English: for every value and key, make value the new key. No temporary variables, no manual looping.',
    keyInsight:
      'A dict comprehension with swapped k and v positions creates a reverse lookup table in a single expression.',
    analogy:
      'Flipping a phone book so you can look up a person by their number instead of looking up a number by their name.',
    sourceNote:
      'Dict comprehensions were added in Python 2.7 and 3.0, modeled after the earlier list comprehension syntax from Python 2.0.',
  },
  {
    id: 'args-kwargs-flexible-signatures',
    title: 'Flexible Function Signatures with *args and **kwargs',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['args', 'kwargs', 'unpacking', 'functions'],
    code: `def log(message, *tags, **metadata):
    tag_str = ", ".join(tags)
    meta_str = " ".join(f"{k}={v}" for k, v in metadata.items())
    print(f"[{tag_str}] {message} | {meta_str}")

log("User login", "auth", "info", user="alice", ip="10.0.0.1")
# [auth, info] User login | user=alice ip=10.0.0.1`,
    explanation:
      'The *tags parameter collects any extra positional arguments into a tuple, and **metadata collects any extra keyword arguments into a dictionary. This lets the function accept a flexible number of inputs without defining every parameter upfront.',
    whyElegant:
      'One function signature handles any combination of tags and metadata without overloading or parameter lists that stretch across the screen. Callers add context naturally as keyword arguments.',
    keyInsight:
      '*args and **kwargs let a function accept open-ended input, making APIs flexible without sacrificing readability at the call site.',
    analogy:
      'A restaurant order where you pick one main dish, add as many sides as you want, and attach special instructions like no-salt or extra-spicy.',
    sourceNote:
      'Variable-length argument lists have been in Python since its earliest releases; the *args/**kwargs convention is part of the Python data model.',
  },
  {
    id: 'contextlib-suppress',
    title: 'contextlib.suppress for Clean Error Ignoring',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['contextlib', 'error handling', 'context manager'],
    code: `from contextlib import suppress
import os

# Instead of:
try:
    os.remove("temp.txt")
except FileNotFoundError:
    pass

# Write:
with suppress(FileNotFoundError):
    os.remove("temp.txt")`,
    explanation:
      'This silences a specific error if it occurs, doing nothing instead of crashing. If the file exists it gets deleted; if it does not exist the error is quietly swallowed. Any other type of error still raises normally.',
    whyElegant:
      'The try/except/pass pattern is four lines of boilerplate to say I do not care if this fails in one specific way. suppress says the same thing in one line and makes the intent unmistakable.',
    keyInsight:
      'suppress replaces the try/except/pass pattern with a context manager that makes intentional error ignoring explicit and concise.',
    analogy:
      'Telling your assistant to shred a document if it is in the drawer, and not to bother you if the drawer is empty.',
    sourceNote:
      'contextlib.suppress was added in Python 3.4 (2014) via PEP 463 discussions, designed by Raymond Hettinger.',
  },
  {
    id: 'chained-comparisons',
    title: 'Chained Comparisons',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['comparison', 'readability', 'operators'],
    code: `age = 25

# Instead of: if age >= 18 and age <= 65:
if 18 <= age <= 65:
    print("Working age")

# Works with any chain of comparisons
x, y = 5, 50
if 0 < x < 10 < y < 100:
    print("Both in range")`,
    explanation:
      'Python lets you chain comparison operators the way you would in mathematics. Instead of writing two separate conditions joined by and, you write the whole range check as a single flowing expression.',
    whyElegant:
      'The code reads like a mathematical inequality, which is exactly what it is. There is no repetition of the variable and no logical operator cluttering the intent.',
    keyInsight:
      'Chained comparisons eliminate redundant variable mentions and mirror mathematical notation, making range checks instantly readable.',
    analogy:
      'Checking that a temperature is between 60 and 80 degrees by glancing at where the mercury sits on the thermometer, rather than reading the number twice and comparing it to each bound separately.',
    sourceNote:
      'Chained comparisons have been in Python since version 1.0, a direct inheritance from the ABC language that influenced Python.',
  },
  {
    id: 'star-unpacking-rest',
    title: 'Star Unpacking with *rest',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['unpacking', 'destructuring', 'assignment'],
    code: `first, *middle, last = [1, 2, 3, 4, 5]
# first=1, middle=[2, 3, 4], last=5

head, *tail = "hello"
# head='h', tail=['e', 'l', 'l', 'o']

name, _, _, email = ["Alice", "Smith", "42", "alice@example.com"]
# Underscore discards values you do not need`,
    explanation:
      'The asterisk in front of a variable name tells Python to collect whatever is left over into a list. You can place it at the beginning, middle, or end of the assignment to grab the extras wherever they fall.',
    whyElegant:
      'One line of unpacking replaces index arithmetic and slicing. The code declares exactly which parts of a sequence matter and which get swept into a catch-all.',
    keyInsight:
      'Star unpacking lets you name the pieces you care about and sweep the rest into a single variable, no slicing required.',
    analogy:
      'Dealing cards where the first player gets one, the last player gets one, and everything in between goes into a draw pile.',
    sourceNote:
      'Extended iterable unpacking was added in Python 3.0 (2008) via PEP 3132.',
  },
  {
    id: 'any-all-generators',
    title: 'any() and all() with Generator Expressions',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['any', 'all', 'short-circuit', 'generators'],
    code: `files = ["report.pdf", "data.csv", "image.png", "notes.txt"]

has_spreadsheet = any(f.endswith(".csv") for f in files)
# True

all_text = all(f.endswith(".txt") for f in files)
# False — stops checking at the first non-.txt file`,
    explanation:
      'any returns True as soon as it finds one item that passes the test; all returns False as soon as it finds one that fails. Neither reads the entire list if it can decide early, because the generator produces items one at a time.',
    whyElegant:
      'These two functions replace entire loops that set a flag variable. The generator inside means no intermediate list is built and evaluation short-circuits the moment the answer is known.',
    keyInsight:
      'any and all with generators give you short-circuiting boolean tests over collections without building intermediate lists or writing flag-variable loops.',
    analogy:
      'A fire inspector checking doors in a hallway: any asks did I find at least one locked door, and stops walking as soon as the answer is yes; all asks are every door unlocked, and stops at the first locked one.',
    sourceNote:
      'any() and all() were added as builtins in Python 2.5 (2006); their combination with generator expressions was an immediate best-practice recommendation.',
  },
  {
    id: 'sorted-key-function',
    title: 'Custom Sorting with sorted() and key',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['sorting', 'key function', 'lambda'],
    code: `students = [
    {"name": "Alice", "grade": 88},
    {"name": "Bob", "grade": 95},
    {"name": "Charlie", "grade": 72},
]

by_grade = sorted(students, key=lambda s: s["grade"], reverse=True)
# [{'name': 'Bob', ...}, {'name': 'Alice', ...}, {'name': 'Charlie', ...}]`,
    explanation:
      'The key parameter tells sorted which value to compare when deciding order. Here, a small function extracts the grade from each student dictionary, and reverse=True puts the highest grades first.',
    whyElegant:
      'You never touch the comparison logic directly. You just point sorted at the field you care about and it handles the rest. The original list is untouched; you get a new sorted copy.',
    keyInsight:
      'The key function separates what to sort from how to sort, letting you reorder complex objects by any attribute without writing a custom comparator.',
    analogy:
      'Telling a librarian to arrange books by page count: you specify the criterion and the librarian does the actual rearranging.',
    sourceNote:
      'The key parameter for sorted() was introduced in Python 2.4 (2004) as a cleaner replacement for the older cmp parameter.',
  },
  {
    id: 'itemgetter-sort-key',
    title: 'itemgetter as a Fast Sort Key',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['itemgetter', 'operator', 'sorting', 'performance'],
    code: `from operator import itemgetter

rows = [("Alice", 88), ("Bob", 95), ("Charlie", 72)]

by_score = sorted(rows, key=itemgetter(1), reverse=True)
# [('Bob', 95), ('Alice', 88), ('Charlie', 72)]

# Multi-key sort
data = [("Math", "B"), ("English", "A"), ("Math", "A")]
ordered = sorted(data, key=itemgetter(0, 1))
# [('English', 'A'), ('Math', 'A'), ('Math', 'B')]`,
    explanation:
      'itemgetter creates a callable that extracts an item at a given index or key. When used as a sort key it is faster than a lambda because it is implemented in C. Passing multiple indices creates a multi-level sort.',
    whyElegant:
      'itemgetter(1) is shorter and faster than lambda x: x[1], and multi-key sorting with itemgetter(0, 1) avoids chaining multiple sorts or writing a tuple-returning lambda.',
    keyInsight:
      'itemgetter is a C-speed replacement for index-access lambdas and supports multi-key extraction in a single call.',
    analogy:
      'A sorting machine with adjustable slots: you tell it which column numbers matter and it sorts the cards by reading just those columns, faster than a human scanning each card.',
    sourceNote:
      'operator.itemgetter was added in Python 2.4 (2004) alongside the key parameter for sorted(), both designed by Raymond Hettinger.',
  },
  {
    id: 'namedtuple-lightweight-records',
    title: 'namedtuple for Lightweight Records',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['namedtuple', 'collections', 'data structures'],
    code: `from collections import namedtuple

Point = namedtuple("Point", ["x", "y"])
p = Point(3, 4)

print(p.x, p.y)        # 3 4
print(p[0], p[1])      # 3 4 — still works like a tuple
distance = (p.x ** 2 + p.y ** 2) ** 0.5  # 5.0`,
    explanation:
      'namedtuple creates a simple class where each field has a name. You access values by name like p.x instead of by index like p[0], but it still behaves like a regular tuple for comparison, iteration, and unpacking.',
    whyElegant:
      'You get the clarity of named fields without writing a full class. The resulting objects are immutable, memory-efficient, and self-documenting.',
    keyInsight:
      'namedtuple gives tuples readable field names while keeping their immutability, low memory footprint, and compatibility with tuple operations.',
    analogy:
      'Switching from numbered lockers to labeled mailboxes: the storage works the same way, but now you reach for a name instead of trying to remember which number belongs to whom.',
    sourceNote:
      'collections.namedtuple was added in Python 2.6 (2008), created by Raymond Hettinger as a lightweight alternative to full class definitions.',
  },
  {
    id: 'chain-flattening',
    title: 'chain.from_iterable for Flattening',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['chain', 'itertools', 'flattening'],
    code: `from itertools import chain

nested = [[1, 2], [3, 4], [5, 6]]
flat = list(chain.from_iterable(nested))
# [1, 2, 3, 4, 5, 6]`,
    explanation:
      'chain.from_iterable takes a list of lists and produces a single flat sequence by walking through each inner list in order. It does not build intermediate lists; it yields items one at a time.',
    whyElegant:
      'Flattening one level of nesting is a single function call with no loops or list concatenation. The lazy evaluation means memory stays flat even if the nested structure is enormous.',
    keyInsight:
      'chain.from_iterable concatenates multiple iterables lazily, flattening one level of nesting without copying data.',
    analogy:
      'Opening a box of envelopes and tipping all the letters out onto one pile, going envelope by envelope so you never need a second table.',
    sourceNote:
      'itertools.chain has been available since Python 2.3 (2003); from_iterable was added as a classmethod to handle already-grouped data.',
  },
  {
    id: 'product-nested-loops',
    title: 'product for Cartesian Combinations',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['product', 'itertools', 'combinatorics'],
    code: `from itertools import product

sizes = ["S", "M", "L"]
colors = ["red", "blue"]

combos = list(product(sizes, colors))
# [('S', 'red'), ('S', 'blue'), ('M', 'red'),
#  ('M', 'blue'), ('L', 'red'), ('L', 'blue')]`,
    explanation:
      'product generates every possible pairing of items from two or more lists, the same result as nested for-loops but expressed as a single call. Each tuple in the output contains one item from each input list.',
    whyElegant:
      'Nested loops for generating combinations are boilerplate. product makes the intent explicit: give me every combination. Adding a third dimension is just another argument, not another level of indentation.',
    keyInsight:
      'product replaces nested for-loops with a single call that generates the Cartesian product of any number of iterables.',
    analogy:
      'A restaurant menu that lets you pick one starter, one main, and one dessert: product is the complete list of every possible three-course meal.',
    sourceNote:
      'itertools.product was added in Python 2.6 (2008), designed to replace the common nested-loop pattern for generating combinations.',
  },
  {
    id: 'zip-longest-uneven',
    title: 'zip_longest for Uneven Sequences',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['zip_longest', 'itertools', 'padding'],
    code: `from itertools import zip_longest

names = ["Alice", "Bob", "Charlie"]
scores = [88, 95]

paired = list(zip_longest(names, scores, fillvalue=0))
# [('Alice', 88), ('Bob', 95), ('Charlie', 0)]`,
    explanation:
      'Regular zip stops at the shortest list, which silently drops data. zip_longest keeps going until the longest list is exhausted, filling in a default value wherever a shorter list runs out.',
    whyElegant:
      'One parameter, fillvalue, handles the entire edge case of mismatched lengths. No manual padding, no length checks, no silent data loss.',
    keyInsight:
      'zip_longest pairs up sequences of different lengths by padding the shorter ones, preventing silent data loss from regular zip.',
    analogy:
      'Seating guests at a dinner table where some rows have empty chairs: zip_longest puts a placeholder card at every empty seat instead of removing the chair entirely.',
    sourceNote:
      'itertools.zip_longest was added in Python 3.0 (2008); in Python 2 it was called izip_longest.',
  },
  {
    id: 'comprehension-vs-map-filter',
    title: 'Comprehension vs map/filter',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['comprehension', 'map', 'filter', 'readability'],
    code: `numbers = range(1, 11)

# Functional style
squares_of_evens = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numbers)))

# Comprehension style — same result, reads left to right
squares_of_evens = [x ** 2 for x in numbers if x % 2 == 0]
# [4, 16, 36, 64, 100]`,
    explanation:
      'Both lines produce the same result: square every even number from 1 to 10. The map/filter version nests functions inside each other and reads inside-out. The comprehension reads in natural order: transform, source, condition.',
    whyElegant:
      'The comprehension puts the transformation, the data source, and the filter in one left-to-right line. You do not need to mentally unwind nested function calls to understand what is happening.',
    keyInsight:
      'Comprehensions replace nested map/filter calls with a single left-to-right expression that shows the transform, source, and condition in reading order.',
    analogy:
      'Reading a recipe that says take the even eggs, square them versus reading one that says square the result of filtering the result of cracking each egg.',
    sourceNote:
      'Guido van Rossum has stated that comprehensions are preferred over map/filter in idiomatic Python, and considered removing map and filter from Python 3.',
  },
  {
    id: 'pathlib-chaining',
    title: 'pathlib.Path Chaining',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['pathlib', 'filesystem', 'method chaining'],
    code: `from pathlib import Path

config = Path.home() / ".config" / "myapp" / "settings.json"

config.parent.mkdir(parents=True, exist_ok=True)
config.write_text('{"theme": "dark"}')

print(config.stem)      # settings
print(config.suffix)    # .json
print(config.exists())  # True`,
    explanation:
      'Path objects let you build file paths by joining pieces with the / operator, the same symbol used in actual file paths. Methods like mkdir, write_text, and exists work directly on the path object without needing separate os calls.',
    whyElegant:
      'The / operator for path joining reads like an actual directory structure. Every operation you need, from creating directories to reading files, lives on the path object itself.',
    keyInsight:
      'pathlib turns file paths into objects with methods, replacing scattered os.path calls with chainable, readable operations.',
    analogy:
      'A GPS that lets you say go home, then config, then myapp, then settings instead of making you type out the full address every time and call a separate phone number for each navigation step.',
    sourceNote:
      'pathlib was added in Python 3.4 (2014) via PEP 428, designed to replace the procedural os.path module with an object-oriented API.',
  },
  {
    id: 'f-string-formatting',
    title: 'f-string Formatting Power',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['f-string', 'formatting', 'string interpolation'],
    code: `name = "World"
pi = 3.14159265

print(f"Hello, {name}!")               # Hello, World!
print(f"{name:>20}")                   #                World
print(f"{pi:.2f}")                     # 3.14
print(f"{1_000_000:,}")               # 1,000,000
print(f"{'yes' if pi > 3 else 'no'}")  # yes
print(f"{name!r}")                     # 'World'`,
    explanation:
      'f-strings let you embed any Python expression directly inside a string by wrapping it in curly braces. Format specifiers after a colon control alignment, decimal places, thousand separators, and more.',
    whyElegant:
      'Variables and expressions sit right where they appear in the output, so you can read the string naturally instead of matching positional placeholders to an argument list at the end.',
    keyInsight:
      'f-strings embed expressions at the point of use, eliminating the mental mapping between placeholders and values that older formatting methods require.',
    analogy:
      'A form letter where you write the recipient name directly in the blank instead of putting a number there and attaching a separate key at the bottom of the page.',
    sourceNote:
      'f-strings were added in Python 3.6 (2016) via PEP 498, quickly becoming the preferred string formatting method.',
  },
  {
    id: 'dataclass-auto-boilerplate',
    title: 'dataclass for Auto-Generated Boilerplate',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['dataclass', 'classes', 'boilerplate'],
    code: `from dataclasses import dataclass

@dataclass
class Employee:
    name: str
    department: str
    salary: float
    active: bool = True

alice = Employee("Alice", "Engineering", 95000)
bob = Employee("Bob", "Engineering", 95000)

print(alice)          # Employee(name='Alice', department='Engineering', ...)
print(alice == bob)   # False — compares field by field`,
    explanation:
      'The @dataclass decorator automatically writes the constructor, the string representation, and the equality comparison for you based on the fields you declare. You just list the fields and their types.',
    whyElegant:
      'A plain class with the same behavior would need a hand-written __init__, __repr__, and __eq__. dataclass generates all three from a list of annotated fields, keeping the class body focused on what the data looks like rather than how to manage it.',
    keyInsight:
      'dataclass trades field annotations for auto-generated __init__, __repr__, and __eq__, eliminating repetitive class boilerplate.',
    analogy:
      'An office form where you fill in the field labels and the system automatically generates the input boxes, the print layout, and the duplicate-detection logic.',
    sourceNote:
      'dataclasses were added in Python 3.7 (2018) via PEP 557, inspired by the attrs third-party library.',
  },
  {
    id: 'slots-memory-optimization',
    title: '__slots__ for Memory-Efficient Objects',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['__slots__', 'memory', 'optimization', 'classes'],
    code: `class Point:
    __slots__ = ("x", "y")

    def __init__(self, x, y):
        self.x = x
        self.y = y

p = Point(3, 4)
print(p.x, p.y)  # 3 4
# p.z = 5  # AttributeError — no extra attributes allowed
# Uses roughly 40% less memory than a regular class`,
    explanation:
      'By default, every Python object carries a hidden dictionary for storing attributes, which uses a lot of memory. __slots__ tells Python exactly which attributes the class will have, so it can use a compact fixed layout instead.',
    whyElegant:
      'One line at the top of the class trades flexibility for efficiency. When you have millions of small objects, the memory savings are dramatic and the code change is minimal.',
    keyInsight:
      '__slots__ replaces the per-instance attribute dictionary with a fixed-size memory layout, cutting memory use significantly for small, frequent objects.',
    analogy:
      'A custom toolbox with shaped cutouts for exactly three tools versus a general-purpose bag that can hold anything but wastes space on the bag itself.',
    sourceNote:
      '__slots__ was introduced in Python 2.2 (2001) as part of the new-style class system; memory savings are well-documented for large object populations.',
  },
  {
    id: 'property-decorator',
    title: '@property for Controlled Attribute Access',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['property', 'encapsulation', 'descriptor'],
    code: `class Circle:
    def __init__(self, radius):
        self._radius = radius

    @property
    def radius(self):
        return self._radius

    @radius.setter
    def radius(self, value):
        if value < 0:
            raise ValueError("Radius cannot be negative")
        self._radius = value

    @property
    def area(self):
        return 3.14159 * self._radius ** 2

c = Circle(5)
print(c.area)    # 78.53975
c.radius = 10    # Uses the setter with validation`,
    explanation:
      'The @property decorator lets you define methods that behave like simple attributes. Reading c.area calls a function behind the scenes, and setting c.radius runs validation logic, but the caller never sees the difference.',
    whyElegant:
      'You start with a plain attribute and add validation or computation later without changing how callers use the class. The interface stays clean: c.area instead of c.get_area().',
    keyInsight:
      '@property lets you swap a plain attribute for computed or validated access without changing the public interface of the class.',
    analogy:
      'A thermostat that looks like a simple dial but internally checks safety limits and calculates energy costs every time you turn it.',
    sourceNote:
      'The property builtin has existed since Python 2.2 (2001); the decorator syntax with @property was added in Python 2.4 (2004).',
  },
  {
    id: 'ternary-expression',
    title: 'Ternary Expression as a Value',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['ternary', 'conditional expression', 'inline'],
    code: `age = 20
status = "adult" if age >= 18 else "minor"

# Directly in function calls
print("Welcome" if logged_in else "Please sign in")

# In data structures
labels = [("even" if x % 2 == 0 else "odd") for x in range(5)]
# ['even', 'odd', 'even', 'odd', 'even']`,
    explanation:
      'The ternary expression picks one of two values based on a condition, all in a single line. Unlike an if/else block, it produces a value that you can assign, pass to a function, or embed in a list.',
    whyElegant:
      'A four-line if/else block that just assigns one of two values becomes a single expression. The value flows directly into wherever it is needed without a temporary variable.',
    keyInsight:
      'The ternary expression turns a conditional choice into a value, letting you embed decisions inside assignments, arguments, and data structures.',
    analogy:
      'A fork in a conveyor belt that sends each package left or right based on its weight, without stopping the belt to make the decision.',
    sourceNote:
      'The conditional expression was added in Python 2.5 (2006) via PEP 308, after years of debate about Python lacking a ternary operator.',
  },
  {
    id: 'dict-setdefault',
    title: 'dict.setdefault for Atomic Get-or-Create',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['dictionary', 'setdefault', 'grouping'],
    code: `contacts = {}

contacts.setdefault("Alice", []).append("alice@work.com")
contacts.setdefault("Alice", []).append("alice@home.com")
contacts.setdefault("Bob", []).append("bob@work.com")

# {'Alice': ['alice@work.com', 'alice@home.com'], 'Bob': ['bob@work.com']}`,
    explanation:
      'setdefault looks up a key and returns its value if it exists. If the key is missing, it inserts the default value first, then returns it. This lets you append to a list that may or may not exist yet, in a single call.',
    whyElegant:
      'The check-then-create-then-append dance becomes a single chained expression. Every call is safe whether the key is new or old, with no conditional logic visible.',
    keyInsight:
      'setdefault combines key lookup and default insertion into one atomic operation, eliminating the if-key-not-in-dict pattern.',
    analogy:
      'A coat check where the attendant either hands you your existing bag or gives you a new empty bag with your name on it, then you drop your coat in, all in one smooth motion.',
    sourceNote:
      'dict.setdefault has been in Python since version 2.0 (2000); for heavy grouping use, defaultdict from collections is often preferred.',
  },
  {
    id: 'bisect-sorted-insert',
    title: 'bisect for Maintaining Sorted Order',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['bisect', 'binary search', 'sorted data'],
    code: `import bisect

grades = [60, 70, 80, 90]
letters = ["F", "D", "C", "B", "A"]

def grade_letter(score):
    return letters[bisect.bisect(grades, score)]

print(grade_letter(85))  # B
print(grade_letter(92))  # A
print(grade_letter(55))  # F`,
    explanation:
      'bisect uses binary search to find where a value would fit in a sorted list. Here it maps numeric scores to letter grades by finding which bucket a score falls into. The lookup takes the same time regardless of how many grade boundaries you define.',
    whyElegant:
      'A chain of if/elif comparisons for grade boundaries becomes a single function call. Adding new boundaries is just adding numbers to the list, not adding more conditional branches.',
    keyInsight:
      'bisect turns a sorted list into a constant-time lookup table, replacing chains of if/elif range checks with a single binary search.',
    analogy:
      'A librarian who finds where a new book belongs on a sorted shelf by repeatedly halving the search area, rather than checking every book from left to right.',
    sourceNote:
      'The bisect module has been in Python since version 1.4 (1996); it is implemented in C for speed in CPython.',
  },
  {
    id: 'heapq-nlargest',
    title: 'heapq.nlargest for Top-N Selection',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['heapq', 'top-n', 'selection', 'performance'],
    code: `import heapq

sales = [
    {"rep": "Alice", "amount": 50000},
    {"rep": "Bob", "amount": 75000},
    {"rep": "Charlie", "amount": 60000},
    {"rep": "Diana", "amount": 90000},
    {"rep": "Eve", "amount": 45000},
]

top_3 = heapq.nlargest(3, sales, key=lambda s: s["amount"])
# [{'rep': 'Diana', ...}, {'rep': 'Bob', ...}, {'rep': 'Charlie', ...}]`,
    explanation:
      'heapq.nlargest picks the top N items from a collection without sorting the entire thing. It uses a heap data structure to track only the largest items seen so far, which is much faster when N is small relative to the total size.',
    whyElegant:
      'Sorting a million records to grab the top three is wasteful. nlargest does the minimum amount of work needed, and the code is a single readable function call with a key parameter.',
    keyInsight:
      'heapq.nlargest extracts the top N items in O(n log k) time, avoiding the O(n log n) cost of a full sort when you only need a few winners.',
    analogy:
      'A talent show judge who keeps a shortlist of the best three acts seen so far, only swapping in a new act when it beats the weakest one on the list.',
    sourceNote:
      'The heapq module has been in Python since version 2.3 (2003); nlargest and nsmallest were added to provide a convenient top-N interface.',
  },
  {
    id: 'partial-function-binding',
    title: 'partial for Pre-Filling Function Arguments',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['partial', 'functools', 'currying'],
    code: `from functools import partial

def power(base, exponent):
    return base ** exponent

square = partial(power, exponent=2)
cube = partial(power, exponent=3)

print(square(5))  # 25
print(cube(3))    # 27`,
    explanation:
      'partial takes an existing function and locks in some of its arguments, creating a new simpler function. Here power takes two arguments, but square and cube each take only one because the exponent is already filled in.',
    whyElegant:
      'Instead of writing wrapper functions or lambdas, partial creates specialized versions of general functions in one line. The intent is clear: this is power with the exponent pre-set.',
    keyInsight:
      'partial freezes some arguments of a function, producing a new callable with a simpler signature and a more specific purpose.',
    analogy:
      'A coffee machine where you save a preset for your usual order: one button now does what used to require selecting size, strength, and milk every time.',
    sourceNote:
      'functools.partial was added in Python 2.5 (2006), inspired by the mathematical concept of partial application from functional programming.',
  },
  {
    id: 'islice-lazy-window',
    title: 'islice for Lazy Sequence Slicing',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['islice', 'itertools', 'lazy evaluation', 'infinite'],
    code: `from itertools import islice

def fibonacci():
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

first_ten = list(islice(fibonacci(), 10))
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]

# Skip first 5, take next 5
middle = list(islice(fibonacci(), 5, 10))
# [5, 8, 13, 21, 34]`,
    explanation:
      'islice takes a slice from a generator without consuming the whole thing. Since fibonacci() is infinite, you cannot convert it to a list and use normal slicing. islice pulls exactly the items you ask for and stops.',
    whyElegant:
      'Infinite sequences become practical because islice lets you grab a window from them. The generator keeps its lazy nature and no items outside the slice are ever computed.',
    keyInsight:
      'islice applies list-style slicing to generators and iterators without materializing them, making even infinite sequences safely addressable.',
    analogy:
      'Recording a live radio broadcast: you press record at minute five and stop at minute ten, capturing exactly those five minutes without needing to record the entire broadcast.',
    sourceNote:
      'itertools.islice has been available since Python 2.3 (2003); it is the standard tool for taking finite windows from potentially infinite iterators.',
  },
  {
    id: 'deque-efficient-queue',
    title: 'deque for O(1) Appends and Pops on Both Ends',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['deque', 'collections', 'queue', 'performance'],
    code: `from collections import deque

# Efficient queue (FIFO)
queue = deque(["task1", "task2", "task3"])
queue.append("task4")
next_task = queue.popleft()  # "task1" — O(1)

# Sliding window with maxlen
last_five = deque(maxlen=5)
for i in range(10):
    last_five.append(i)
# deque([5, 6, 7, 8, 9], maxlen=5)`,
    explanation:
      'A regular list is slow when you remove items from the front because every remaining item has to shift over. A deque (double-ended queue) handles both ends equally fast. The maxlen option automatically drops old items when new ones are added.',
    whyElegant:
      'Switching from list to deque turns an O(n) popleft into O(1), and the maxlen parameter gives you a self-managing sliding window with zero bookkeeping code.',
    keyInsight:
      'deque provides constant-time operations on both ends and an optional maxlen that turns it into an automatic sliding window.',
    analogy:
      'A revolving door that lets people in from one side and out from the other equally fast, versus a narrow hallway where everyone has to shuffle forward whenever the first person leaves.',
    sourceNote:
      'collections.deque was added in Python 2.4 (2004); its C implementation guarantees O(1) append and pop on both ends.',
  },
  {
    id: 'contextmanager-decorator',
    title: 'contextmanager Decorator for Custom Contexts',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['contextmanager', 'contextlib', 'with statement'],
    code: `from contextlib import contextmanager
import time

@contextmanager
def timer(label):
    start = time.perf_counter()
    yield
    elapsed = time.perf_counter() - start
    print(f"{label}: {elapsed:.3f}s")

with timer("Data processing"):
    total = sum(range(10_000_000))
# Data processing: 0.234s`,
    explanation:
      'The @contextmanager decorator turns a generator function into a context manager that works with the with statement. Everything before yield runs at entry, everything after yield runs at exit. You get setup and teardown in a single function.',
    whyElegant:
      'Writing a full class with __enter__ and __exit__ for a simple timer is overkill. The decorator version puts the setup and cleanup in one linear function, separated by a single yield.',
    keyInsight:
      '@contextmanager converts a generator with a single yield into a context manager, letting you write setup-teardown logic as a plain function.',
    analogy:
      'A stage manager who dims the lights before the actor walks on, waits for the performance, then brings the lights back up, all written as one sequence of instructions instead of two separate scripts.',
    sourceNote:
      'contextlib.contextmanager was added in Python 2.5 (2006) alongside the with statement itself, via PEP 343.',
  },
  {
    id: 'enter-exit-protocol',
    title: 'The __enter__/__exit__ Protocol',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['context manager', 'protocol', 'resource management'],
    code: `class ManagedFile:
    def __init__(self, path, mode="r"):
        self.path = path
        self.mode = mode

    def __enter__(self):
        self.file = open(self.path, self.mode)
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()
        return False

with ManagedFile("log.txt", "w") as f:
    f.write("Hello, managed world!")
# File is guaranteed closed, even if write raises an error`,
    explanation:
      'When you use a with block, Python calls __enter__ at the start and __exit__ at the end, no matter what happens in between. This guarantees that resources like files or connections get cleaned up even if an error occurs.',
    whyElegant:
      'The resource lifecycle is embedded in the object itself. Users cannot forget to clean up because the with block does it automatically. Error handling and normal flow share the same cleanup path.',
    keyInsight:
      'The __enter__/__exit__ protocol guarantees resource cleanup by tying it to block scope, making resource leaks structurally impossible when using with.',
    analogy:
      'A hotel room that automatically locks itself and switches off all the lights when you step out, whether you leave normally or get pulled away by an emergency.',
    sourceNote:
      'The context manager protocol was introduced in Python 2.5 (2006) via PEP 343, designed to replace try/finally blocks for resource management.',
  },
  {
    id: 'reduce-folding',
    title: 'reduce for Folding a Sequence into One Value',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['reduce', 'functools', 'folding', 'accumulation'],
    code: `from functools import reduce

# Flatten nested lists
nested = [[1, 2], [3, 4], [5]]
flat = reduce(lambda acc, x: acc + x, nested, [])
# [1, 2, 3, 4, 5]

# Build a nested dictionary from a path
keys = ["user", "settings", "theme"]
result = reduce(lambda d, k: {k: d}, reversed(keys), "dark")
# {'user': {'settings': {'theme': 'dark'}}}`,
    explanation:
      'reduce takes a function and applies it to the first two items, then to that result and the third item, and so on until only one value remains. The nested dictionary example wraps each key around the accumulated value, building from the inside out.',
    whyElegant:
      'reduce collapses a sequence into a single value using any combining function. The nested dict construction shows its power: a loop version would need careful index management, but reduce handles the folding naturally.',
    keyInsight:
      'reduce repeatedly applies a two-argument function across a sequence, folding it down to a single accumulated result.',
    analogy:
      'Rolling a snowball down a hill, picking up more snow with each rotation until you have one large ball made from the entire slope.',
    sourceNote:
      'reduce was a builtin in Python 2; it was moved to functools in Python 3 (2008) because Guido van Rossum felt explicit loops were often clearer.',
  },
  {
    id: 'tee-iterator-branching',
    title: 'tee for Branching an Iterator',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['tee', 'itertools', 'lookahead'],
    code: `from itertools import tee

prices = iter([10.5, 20.0, 15.75, 30.0, 25.5])
current, lookahead = tee(prices)
next(lookahead, None)

for price, next_price in zip(current, lookahead):
    direction = "UP" if next_price > price else "DOWN"
    print(f"{price} -> {next_price}: {direction}")
# 10.5 -> 20.0: UP
# 20.0 -> 15.75: DOWN
# 15.75 -> 30.0: UP
# 30.0 -> 25.5: DOWN`,
    explanation:
      'tee duplicates an iterator into two independent copies. By advancing one copy by one step, you create a current-and-next pairing that lets you compare each element with the one that follows it.',
    whyElegant:
      'Comparing adjacent items in a stream usually requires tracking a previous variable manually. tee creates a shifted copy, and zip pairs them up, turning a stateful problem into a stateless one.',
    keyInsight:
      'tee creates independent copies of an iterator, enabling lookahead and adjacent-pair comparisons without manual state tracking.',
    analogy:
      'Two people reading the same book at different speeds: one is always one page ahead, so you can compare what happens on consecutive pages without flipping back and forth.',
    sourceNote:
      'itertools.tee was added in Python 2.4 (2004), named after the Unix tee command that duplicates a data stream.',
  },
  {
    id: 'combinations-permutations',
    title: 'combinations and permutations for Counting',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['combinations', 'permutations', 'itertools', 'combinatorics'],
    code: `from itertools import combinations, permutations

team = ["Alice", "Bob", "Charlie", "Diana"]

# Pairs regardless of order — 6 possible
pairs = list(combinations(team, 2))
# [('Alice', 'Bob'), ('Alice', 'Charlie'), ...]

# Ordered arrangements of 3 items — 24 possible
podiums = list(permutations(["gold", "silver", "bronze"]))
# [('gold', 'silver', 'bronze'), ('gold', 'bronze', 'silver'), ...]`,
    explanation:
      'combinations gives you every way to choose k items from a group where order does not matter. permutations gives you every possible ordering of items where position does matter. Both produce results lazily.',
    whyElegant:
      'Generating combinations and permutations by hand requires nested loops and careful index management. These functions get it right in one call and produce results lazily so memory is not wasted.',
    keyInsight:
      'combinations and permutations generate all possible selections or arrangements from an iterable, replacing error-prone manual nested loops.',
    analogy:
      'combinations is choosing three friends for a road trip regardless of who sits where; permutations is assigning them to driver, navigator, and DJ.',
    sourceNote:
      'itertools.combinations and permutations were added in Python 2.6 (2008), rounding out the combinatorics toolkit in itertools.',
  },
  {
    id: 'typevar-generics',
    title: 'TypeVar for Generic Functions',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['TypeVar', 'generics', 'typing', 'type safety'],
    code: `from typing import TypeVar, List

T = TypeVar("T")

def first(items: List[T]) -> T:
    return items[0]

name = first(["Alice", "Bob"])   # inferred type: str
number = first([1, 2, 3])       # inferred type: int`,
    explanation:
      'TypeVar creates a placeholder type that gets filled in when the function is called. If you pass a list of strings, the return type is automatically understood to be a string. This helps tools catch type mistakes before the code runs.',
    whyElegant:
      'One function definition works correctly for any element type, and the type checker understands that the return type matches the input element type. No duplication, no loss of type safety.',
    keyInsight:
      'TypeVar lets you write functions that are generic over element types while preserving the relationship between input and output types for static analysis.',
    analogy:
      'A vending machine with a slot shaped like whatever you put in: insert a coin and get a coin-shaped receipt; insert a token and get a token-shaped receipt.',
    sourceNote:
      'TypeVar was introduced with the typing module in Python 3.5 (2015) via PEP 484, bringing generic type support to Python.',
  },
  {
    id: 'field-default-factory',
    title: 'field(default_factory=) for Safe Mutable Defaults',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['dataclass', 'field', 'mutable defaults'],
    code: `from dataclasses import dataclass, field

@dataclass
class ShoppingCart:
    owner: str
    items: list = field(default_factory=list)
    discounts: dict = field(default_factory=dict)

cart1 = ShoppingCart("Alice")
cart2 = ShoppingCart("Bob")
cart1.items.append("Book")

print(cart2.items)  # [] — each cart gets its own list`,
    explanation:
      'Using a plain mutable default like items=[] would make every instance share the same list, a notorious Python gotcha. field(default_factory=list) creates a fresh empty list for each new object, so one cart never accidentally leaks into another.',
    whyElegant:
      'The mutable default trap has bitten every Python developer at least once. default_factory makes the safe behavior the obvious path, and the intent reads clearly: create a new list for each instance.',
    keyInsight:
      'default_factory calls its argument to produce a fresh default for each instance, preventing the shared mutable default trap that catches every Python beginner.',
    analogy:
      'Giving every new employee their own empty notebook instead of sharing one notebook that everyone writes in and wonders why pages keep appearing that they did not write.',
    sourceNote:
      'dataclasses.field was introduced alongside dataclasses in Python 3.7 (2018) via PEP 557.',
  },
  {
    id: 'init-subclass-plugin-registry',
    title: '__init_subclass__ for Plugin Registration',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['__init_subclass__', 'plugins', 'metaprogramming'],
    code: `class Plugin:
    registry = {}

    def __init_subclass__(cls, name=None, **kwargs):
        super().__init_subclass__(**kwargs)
        Plugin.registry[name or cls.__name__] = cls

class MarkdownRenderer(Plugin, name="markdown"):
    def render(self, text):
        return text

class HTMLRenderer(Plugin, name="html"):
    def render(self, text):
        return f"<p>{text}</p>"

print(Plugin.registry)
# {'markdown': <class 'MarkdownRenderer'>, 'html': <class 'HTMLRenderer'>}
renderer = Plugin.registry["html"]()`,
    explanation:
      'Every time a new class inherits from Plugin, __init_subclass__ runs automatically and registers the new class by name. Plugin authors just write a subclass and it appears in the registry without any manual registration step.',
    whyElegant:
      'The registration is invisible to plugin authors. They do not call a register function or add a decorator. Subclassing alone is enough, and the base class handles all the bookkeeping.',
    keyInsight:
      '__init_subclass__ hooks into class creation, enabling automatic registration or validation of subclasses without metaclasses or decorators.',
    analogy:
      'A membership club where signing up happens automatically when you walk through the door. No forms, no staff interaction, just show up and you are on the list.',
    sourceNote:
      '__init_subclass__ was added in Python 3.6 (2016) via PEP 487, designed to handle the most common metaclass use cases without the complexity of full metaclasses.',
  },
  {
    id: 'singledispatch-overloading',
    title: 'singledispatch for Type-Based Function Overloading',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['singledispatch', 'functools', 'dispatch', 'polymorphism'],
    code: `from functools import singledispatch

@singledispatch
def format_value(value):
    return str(value)

@format_value.register(int)
def _(value):
    return f"{value:,}"

@format_value.register(float)
def _(value):
    return f"{value:.2f}"

@format_value.register(list)
def _(value):
    return " | ".join(str(v) for v in value)

print(format_value(1000000))    # 1,000,000
print(format_value(3.14159))    # 3.14
print(format_value([1, 2, 3]))  # 1 | 2 | 3`,
    explanation:
      'singledispatch routes a function call to a different implementation based on the type of the first argument. Integers get comma formatting, floats get two decimal places, and lists get pipe-separated output, all through one function name.',
    whyElegant:
      'Instead of a chain of isinstance checks inside one function, each type gets its own clean implementation. Adding a new type is just registering another function, not modifying existing code.',
    keyInsight:
      'singledispatch replaces isinstance chains with registered type-specific implementations, making function behavior extensible by type without modifying existing code.',
    analogy:
      'A post office with specialized counters: letters go to one window, packages to another, and international mail to a third, but you just walk in and hand over your item.',
    sourceNote:
      'functools.singledispatch was added in Python 3.4 (2014) via PEP 443, bringing generic function dispatch to the standard library.',
  },
  {
    id: 'class-getitem-subscript',
    title: '__class_getitem__ for Subscriptable Classes',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['__class_getitem__', 'metaprogramming', 'generics'],
    code: `class Tag:
    def __class_getitem__(cls, name):
        def wrap(text):
            return f"<{name}>{text}</{name}>"
        return wrap

bold = Tag["b"]
italic = Tag["i"]

print(bold("hello"))    # <b>hello</b>
print(italic("world"))  # <i>world</i>`,
    explanation:
      '__class_getitem__ is called when you use square brackets on a class name itself, like Tag["b"]. Here it returns a function that wraps text in the specified HTML tag. The class acts as a factory indexed by tag name.',
    whyElegant:
      'The square bracket syntax on a class looks like parameterization, which is exactly what is happening. No instance is created; the class itself becomes a callable factory indexed by a key.',
    keyInsight:
      '__class_getitem__ lets you use ClassName[x] syntax to parameterize a class, enabling clean generic-style APIs without full metaclass machinery.',
    analogy:
      'A vending machine where pressing a letter on the keypad returns a different product: the machine itself is the interface, and the letter selects the variant.',
    sourceNote:
      '__class_getitem__ was added in Python 3.7 (2018) via PEP 560, primarily to support generic types but usable for any class-level subscript pattern.',
  },
  {
    id: 'cached-property',
    title: 'cached_property for Lazy One-Time Computation',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['cached_property', 'functools', 'lazy evaluation'],
    code: `from functools import cached_property

class DataReport:
    def __init__(self, raw_data):
        self.raw_data = raw_data

    @cached_property
    def summary(self):
        print("Computing summary...")
        return {
            "count": len(self.raw_data),
            "total": sum(self.raw_data),
            "average": sum(self.raw_data) / len(self.raw_data),
        }

report = DataReport([10, 20, 30, 40, 50])
print(report.summary)  # Computing summary... then result
print(report.summary)  # Returns cached result, no recomputation`,
    explanation:
      'cached_property works like @property but the result is computed only once and stored. The second and all later accesses return the stored value instantly, without re-running the function.',
    whyElegant:
      'Expensive computations happen lazily on first access and never again. There is no manual caching boilerplate, no _summary = None pattern, no if-not-computed check.',
    keyInsight:
      'cached_property computes a value on first access and replaces itself with the result, giving you lazy evaluation with zero boilerplate.',
    analogy:
      'A lookup table that starts blank and fills in each answer the first time someone asks the question, then gives the same answer instantly for every repeat question.',
    sourceNote:
      'functools.cached_property was added in Python 3.8 (2019); it was previously a popular third-party recipe and was included in Django before joining the standard library.',
  },
  {
    id: 'ast-literal-eval-safe',
    title: 'ast.literal_eval for Safe String Parsing',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['ast', 'security', 'parsing', 'eval'],
    code: `import ast

user_input = '{"name": "Alice", "scores": [95, 87, 92]}'
data = ast.literal_eval(user_input)

print(data["name"])    # Alice
print(data["scores"])  # [95, 87, 92]

# Rejects anything that is not a literal data structure
# ast.literal_eval("__import__('os').system('rm -rf /')")
# Raises ValueError — only dicts, lists, strings, numbers, etc. allowed`,
    explanation:
      'ast.literal_eval parses a string containing a Python literal (like a dictionary, list, number, or string) and returns the actual data structure. Unlike eval(), it refuses to execute arbitrary code, making it safe to use on untrusted input.',
    whyElegant:
      'eval() is powerful but dangerous because it executes anything. literal_eval gives you the data-parsing part without the code-execution risk. One function call turns a string into structured data, safely.',
    keyInsight:
      'ast.literal_eval provides the data-parsing power of eval() with none of the security risk, by restricting input to literal values only.',
    analogy:
      'A bank teller who accepts deposit slips but refuses to execute any instructions written on them. The numbers go through; the commands do not.',
    sourceNote:
      'ast.literal_eval has been available since Python 2.6 (2008); it is the standard recommendation for parsing data from untrusted strings.',
  },
  {
    id: 'textwrap-dedent',
    title: 'textwrap.dedent for Clean Multi-Line Strings',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['textwrap', 'strings', 'formatting', 'indentation'],
    code: `import textwrap

def help_text():
    return textwrap.dedent("""
        Usage: myapp [OPTIONS] FILE

        Options:
          -v, --verbose    Enable verbose output
          -o, --output     Specify output file
          -h, --help       Show this message
    """).strip()

print(help_text())
# Prints cleanly aligned text without leading indentation`,
    explanation:
      'When you write a multi-line string inside an indented function, the string picks up that indentation as unwanted leading whitespace. dedent strips the common leading whitespace from every line, giving you clean output while keeping your source code properly indented.',
    whyElegant:
      'Without dedent, you either break your indentation to left-align the string or live with extra whitespace in the output. dedent lets you keep both the code and the output clean.',
    keyInsight:
      'textwrap.dedent removes common leading whitespace from multi-line strings, letting you indent string content with your code without polluting the output.',
    analogy:
      'A printing press that automatically trims the left margin of every page to match the content, no matter how far right the original text was positioned on the plate.',
    sourceNote:
      'textwrap.dedent has been in the standard library since Python 2.3 (2003); it is commonly used for docstrings, help text, and SQL templates.',
  },
  {
    id: 'struct-pack-unpack',
    title: 'struct.pack/unpack for Binary Data',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['struct', 'binary', 'serialization', 'networking'],
    code: `import struct

# Pack values into 10 bytes of binary data
packed = struct.pack("!HI4s", 443, 3000000, b"ping")
print(len(packed))  # 10

# Unpack them back into Python values
port, size, label = struct.unpack("!HI4s", packed)
print(port, size, label)  # 443 3000000 b'ping'`,
    explanation:
      'struct converts between Python values and compact binary representations. The format string specifies the byte order and types: ! means network byte order, H is a 2-byte unsigned integer, I is a 4-byte unsigned integer, and 4s is a 4-byte string.',
    whyElegant:
      'A compact format string replaces pages of bit-shifting and byte-slicing code. Packing and unpacking are exact inverses of each other, and the format string serves as documentation for the binary layout.',
    keyInsight:
      'struct.pack and unpack translate between Python values and raw bytes using a format string that describes the binary layout, replacing manual byte manipulation.',
    analogy:
      'A shipping manifest that specifies exactly how to pack items into a box and how to unpack them at the destination, so both ends agree on what goes where.',
    sourceNote:
      'The struct module has been in Python since version 1.5 (1998); its format codes are modeled after C struct declarations.',
  },
  {
    id: 'io-stringio-memory-file',
    title: 'io.StringIO for In-Memory File Operations',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['StringIO', 'io', 'testing', 'in-memory'],
    code: `from io import StringIO
import csv

buffer = StringIO()
writer = csv.writer(buffer)
writer.writerow(["name", "age"])
writer.writerow(["Alice", 30])
writer.writerow(["Bob", 25])

csv_text = buffer.getvalue()
print(csv_text)
# name,age
# Alice,30
# Bob,25`,
    explanation:
      'StringIO creates a file-like object that lives entirely in memory. Any code that expects to write to a file can write to a StringIO instead. You can then retrieve the accumulated text with getvalue(), no disk access required.',
    whyElegant:
      'You get all the file-writing APIs without touching the filesystem. This is perfect for generating text in memory, capturing output for testing, or feeding text to libraries that expect file objects.',
    keyInsight:
      'StringIO provides the full file interface backed by memory instead of disk, making file-oriented code testable and usable without actual files.',
    analogy:
      'A whiteboard that pretends to be a notebook: you write on it with the same pen, but nothing goes into a drawer and you can erase it instantly.',
    sourceNote:
      'StringIO has been in the standard library since Python 1.5 (1998); it was moved to the io module in Python 3.',
  },
  {
    id: 'calendar-monthrange',
    title: 'calendar.monthrange for Month Boundaries',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['calendar', 'dates', 'stdlib'],
    code: `import calendar

first_weekday, num_days = calendar.monthrange(2024, 2)
print(f"Feb 2024: starts on weekday {first_weekday}, has {num_days} days")
# Feb 2024: starts on weekday 3, has 29 days (leap year!)

print(calendar.isleap(2024))  # True
print(calendar.isleap(2023))  # False`,
    explanation:
      'monthrange returns two numbers for any given month: the weekday the month starts on (0=Monday) and the total number of days. It automatically handles leap years, so February 2024 correctly shows 29 days.',
    whyElegant:
      'Calculating the number of days in a month while accounting for leap years is trickier than it looks. monthrange does the math in one call, including the edge case that trips up most manual implementations.',
    keyInsight:
      'calendar.monthrange gives you the weekday start and day count for any month in one call, handling leap years and month-length variations automatically.',
    analogy:
      'A wall calendar that you can ask how many days are on any page and what day of the week the page starts, without flipping through it yourself.',
    sourceNote:
      'The calendar module has been in Python since version 1.4 (1996); it provides both computational and display-oriented date utilities.',
  },
  {
    id: 'decimal-precision',
    title: 'decimal.Decimal for Exact Arithmetic',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['Decimal', 'precision', 'money', 'floating point'],
    code: `from decimal import Decimal

# Floating-point surprise
print(0.1 + 0.2)  # 0.30000000000000004

# Decimal gets it right
print(Decimal("0.1") + Decimal("0.2"))  # 0.3

# Critical for financial calculations
price = Decimal("19.99")
tax = price * Decimal("0.08")
total = price + tax
print(f"Total: \${total:.2f}")  # Total: $21.59`,
    explanation:
      'Regular floating-point numbers cannot represent 0.1 exactly, which leads to tiny rounding errors that accumulate. Decimal stores numbers as exact decimal digits, so 0.1 + 0.2 equals exactly 0.3, which matters for anything involving money.',
    whyElegant:
      'Switching from float to Decimal eliminates an entire class of subtle bugs. The code looks almost identical, but the arithmetic is exact where it counts.',
    keyInsight:
      'Decimal stores numbers as exact decimal fractions, eliminating the rounding errors inherent in binary floating-point that make financial calculations unreliable.',
    analogy:
      'Using a ruler marked in tenths of an inch versus one marked in sixteenths: the decimal ruler hits 0.1 exactly, while the other one can only approximate it.',
    sourceNote:
      'The decimal module was added in Python 2.4 (2004) via PEP 327, implementing the IBM General Decimal Arithmetic Specification.',
  },
  {
    id: 'fractions-exact',
    title: 'fractions.Fraction for Exact Rational Arithmetic',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['Fraction', 'rational', 'exact arithmetic'],
    code: `from fractions import Fraction

a = Fraction(1, 3)
b = Fraction(1, 6)

print(a + b)        # 1/2
print(a * b)        # 1/18
print(a - b)        # 1/6

print(Fraction(0.75))     # 3/4
print(Fraction("3.14"))   # 157/50`,
    explanation:
      'Fraction represents numbers as a numerator and denominator, performing all arithmetic exactly. One-third plus one-sixth equals exactly one-half, with no rounding. You can also convert decimals and floats into their exact fractional form.',
    whyElegant:
      'Rational arithmetic with fractions is lossless. There is no rounding at any step, and the results are always fully reduced. Converting from floats and strings works seamlessly.',
    keyInsight:
      'Fraction performs exact rational arithmetic with automatic simplification, keeping numerator and denominator as integers so no precision is ever lost.',
    analogy:
      'Cutting a pizza into exact slices instead of measuring with a ruler: one-third plus one-sixth gives you exactly half a pizza, no crumbs left over.',
    sourceNote:
      'The fractions module was added in Python 2.6 (2008) via PEP 3141, as part of the numeric tower defined in the numbers module.',
  },
  {
    id: 're-finditer-streaming',
    title: 're.finditer for Streaming Pattern Matches',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['regex', 'finditer', 'pattern matching', 'streaming'],
    code: `import re

text = "Orders: #1001 on 2024-01-15, #1002 on 2024-02-20, #1003 on 2024-03-10"
pattern = re.compile(r"#(\\d+) on (\\d{4}-\\d{2}-\\d{2})")

for match in re.finditer(pattern, text):
    order_id, date = match.groups()
    print(f"Order {order_id} placed on {date}")
# Order 1001 placed on 2024-01-15
# Order 1002 placed on 2024-02-20
# Order 1003 placed on 2024-03-10`,
    explanation:
      'finditer walks through a string and yields each match one at a time, giving you access to captured groups, positions, and the full match object. Unlike findall, it does not build a list of all matches upfront.',
    whyElegant:
      'Each match arrives as a rich object with groups, start and end positions, and the matched text. Processing happens in a loop, so memory usage stays constant even when scanning a massive document.',
    keyInsight:
      're.finditer yields match objects lazily, giving you full match details one at a time without materializing all matches into a list.',
    analogy:
      'A metal detector on a beach that beeps each time it finds something, letting you dig up one item at a time instead of scanning the whole beach first and going back to dig up everything at once.',
    sourceNote:
      're.finditer has been available since Python 2.2 (2001); it is the preferred alternative to findall when you need match positions or groups.',
  },
  {
    id: 'subprocess-run-capture',
    title: 'subprocess.run for Shell Command Execution',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['subprocess', 'shell', 'process management'],
    code: `import subprocess

result = subprocess.run(
    ["grep", "-r", "TODO", "src/"],
    capture_output=True,
    text=True,
    timeout=10,
)

if result.returncode == 0:
    for line in result.stdout.splitlines():
        print(line)
else:
    print(f"Error: {result.stderr}")`,
    explanation:
      'subprocess.run executes an external command and waits for it to finish. capture_output=True collects both standard output and error output as strings. timeout prevents the call from hanging forever if the command gets stuck.',
    whyElegant:
      'One function call replaces os.system, os.popen, and the older subprocess.Popen for the common case of run a command and get its output. The return object gives you exit code, stdout, and stderr in one place.',
    keyInsight:
      'subprocess.run is the single recommended way to run external commands, bundling execution, output capture, and timeout into one clean call.',
    analogy:
      'Sending an assistant to run an errand with a timer: they come back with the result, any problems they encountered, and whether they finished successfully, all in one report.',
    sourceNote:
      'subprocess.run was added in Python 3.5 (2015) via PEP 0; it was designed to be the one obvious way to run subprocesses, replacing several older APIs.',
  },
  {
    id: 'os-walk-directory-tree',
    title: 'os.walk for Directory Tree Traversal',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['os.walk', 'filesystem', 'directory traversal'],
    code: `import os

python_files = []
for dirpath, dirnames, filenames in os.walk("project/"):
    for filename in filenames:
        if filename.endswith(".py"):
            python_files.append(os.path.join(dirpath, filename))

print(f"Found {len(python_files)} Python files")`,
    explanation:
      'os.walk visits every directory in a tree, yielding three things at each stop: the current directory path, the list of subdirectories, and the list of files. You decide what to do with each batch of files as you go.',
    whyElegant:
      'Manually writing recursive directory traversal is error-prone and verbose. os.walk handles the recursion and yields clean triples, letting you focus on which files you care about.',
    keyInsight:
      'os.walk traverses an entire directory tree top-down, yielding directory paths and file lists at each level so you never have to write the recursion yourself.',
    analogy:
      'A building inspector who walks every floor and every room, handing you a list of what is on each floor as they go, so you can decide which rooms to enter without managing the stairways yourself.',
    sourceNote:
      'os.walk has been in Python since version 2.3 (2003), replacing the older os.path.walk which had a less convenient callback-based API.',
  },
  {
    id: 'shutil-copytree-filtered',
    title: 'shutil.copytree with Filtering',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['shutil', 'filesystem', 'copying', 'filtering'],
    code: `import shutil

shutil.copytree(
    "project/",
    "deploy/",
    ignore=shutil.ignore_patterns("*.pyc", "__pycache__", ".git"),
)`,
    explanation:
      'copytree duplicates an entire directory structure in one call. The ignore parameter takes a function that returns file and directory names to skip. ignore_patterns is a built-in helper that accepts glob patterns for common exclusions.',
    whyElegant:
      'Recursive directory copying with exclusions would be dozens of lines of os.walk and conditional logic. copytree with ignore_patterns does it in one call with a readable list of patterns to skip.',
    keyInsight:
      'shutil.copytree copies an entire directory tree in one call, and ignore_patterns provides glob-based filtering to exclude files without writing a custom walk.',
    analogy:
      'A moving company that packs and transports your entire house to a new address but skips anything you put a do-not-pack sticker on.',
    sourceNote:
      'shutil.copytree has been in Python since version 2.3 (2003); the ignore parameter was added in Python 2.6 (2008) for filtering support.',
  },
  {
    id: 'tempfile-named-temporary',
    title: 'tempfile.NamedTemporaryFile for Safe Scratch Files',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['tempfile', 'temporary files', 'cleanup'],
    code: `import tempfile
import json

data = {"users": ["Alice", "Bob"], "count": 2}

with tempfile.NamedTemporaryFile(mode="w", suffix=".json", delete=False) as tmp:
    json.dump(data, tmp, indent=2)
    print(f"Written to {tmp.name}")

# File persists after the block because delete=False
# Clean up manually when done: os.unlink(tmp.name)`,
    explanation:
      'NamedTemporaryFile creates a file in the system temp directory with a unique name, avoiding collisions with other programs. The suffix parameter controls the file extension. With delete=False, the file survives the with block so other processes can read it.',
    whyElegant:
      'You get a unique, collision-free filename without inventing a naming scheme or worrying about race conditions. The context manager handles creation and optionally cleanup in one construct.',
    keyInsight:
      'NamedTemporaryFile provides a collision-free scratch file with automatic naming, optional cleanup, and context manager support.',
    analogy:
      'A hotel that gives you a room with a unique number, keeps it as long as you need it, and cleans it up after you check out, unless you ask to keep it longer.',
    sourceNote:
      'The tempfile module has been in Python since version 1.5 (1998); NamedTemporaryFile was added in Python 2.3 (2003) to provide a named counterpart to TemporaryFile.',
  },
  {
    id: 'mock-patch-testing',
    title: 'mock.patch for Isolating Tests',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['mock', 'testing', 'unittest', 'patching'],
    code: `from unittest.mock import patch

def get_temperature(city):
    import requests
    response = requests.get(f"https://api.weather.com/{city}")
    return response.json()["temp"]

with patch("requests.get") as mock_get:
    mock_get.return_value.json.return_value = {"temp": 72}
    temp = get_temperature("Seattle")
    print(f"Temperature: {temp}F")  # Temperature: 72F
    mock_get.assert_called_once()`,
    explanation:
      'patch temporarily replaces a real module or function with a mock object during testing. Here, the actual HTTP request to the weather API is replaced with a fake that returns a predetermined response. After the with block, the original is restored.',
    whyElegant:
      'Tests become fast, deterministic, and independent of external services. The mock records every call made to it so you can verify your code interacted with the API correctly without actually calling it.',
    keyInsight:
      'mock.patch replaces real dependencies with controllable fakes during testing, making tests fast, repeatable, and independent of external services.',
    analogy:
      'A fire drill where the alarm sounds but there is no fire: you test that everyone follows the procedure without needing actual danger, and you can check who went where afterward.',
    sourceNote:
      'unittest.mock was added to the standard library in Python 3.3 (2012); it was previously a widely-used third-party library by Michael Foord.',
  },
  {
    id: 'timeit-benchmarking',
    title: 'timeit.timeit for Micro-Benchmarking',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['timeit', 'benchmarking', 'performance'],
    code: `import timeit

list_time = timeit.timeit(
    stmt="[x**2 for x in range(1000)]",
    number=10000,
)

map_time = timeit.timeit(
    stmt="list(map(lambda x: x**2, range(1000)))",
    number=10000,
)

print(f"List comprehension: {list_time:.3f}s")
print(f"Map + lambda:       {map_time:.3f}s")`,
    explanation:
      'timeit runs a code snippet thousands of times and reports the total elapsed time. By running the same code many times, it averages out system noise and gives you a reliable comparison between approaches. Here it compares a list comprehension against map with a lambda.',
    whyElegant:
      'Guessing which approach is faster is unreliable. timeit gives you actual numbers with minimal setup. The code under test is passed as a string so timeit can control the timing precisely.',
    keyInsight:
      'timeit provides reliable micro-benchmarks by running code thousands of times, eliminating guesswork about which approach is actually faster.',
    analogy:
      'A race official who makes two runners sprint the same track a thousand times each and reports the total time, so a single lucky start does not skew the results.',
    sourceNote:
      'The timeit module has been in Python since version 2.3 (2003); it deliberately disables garbage collection during timing to reduce measurement noise.',
  },
  {
    id: 'pprint-pformat',
    title: 'pprint.pformat for Readable Data Formatting',
    language: 'Python',
    category: 'Python Idiomatic Patterns',
    conceptTags: ['pprint', 'formatting', 'debugging', 'logging'],
    code: `from pprint import pformat

config = {
    "database": {"host": "localhost", "port": 5432, "name": "myapp"},
    "cache": {"backend": "redis", "ttl": 300},
    "features": ["auth", "search", "notifications"],
}

formatted = pformat(config, width=60, sort_dicts=True)
print(formatted)

# Useful for logging
import logging
logging.debug("Config loaded: %s", pformat(config))`,
    explanation:
      'pformat takes a nested data structure and returns a nicely indented string representation. Unlike print, which puts everything on one long line, pformat breaks the output across lines at the width you specify and optionally sorts dictionary keys.',
    whyElegant:
      'Debugging nested data by staring at a one-line dump is painful. pformat gives you a human-readable layout in one call, and because it returns a string instead of printing directly, you can use it in logging, assertions, or anywhere else.',
    keyInsight:
      'pformat renders nested data structures as indented, width-limited strings, turning unreadable one-line dumps into clear, loggable output.',
    analogy:
      'An accountant who takes a shoebox full of crumpled receipts and arranges them in a neat, labeled spreadsheet so anyone can read them at a glance.',
    sourceNote:
      'The pprint module has been in Python since version 1.5 (1998); pformat was added alongside pprint to return formatted strings instead of printing directly.',
  },
];
