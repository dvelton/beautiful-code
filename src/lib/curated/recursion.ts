import type { CuratedExample } from '../../types';

export const recursion: CuratedExample[] = [
  {
    id: 'tower-of-hanoi',
    title: 'Tower of Hanoi',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['divide-and-conquer', 'classic', 'exponential'],
    code: `def hanoi(n, src, dst, aux):
    if n == 1:
        print(f"Move disk 1 from {src} to {dst}")
        return
    hanoi(n - 1, src, aux, dst)
    print(f"Move disk {n} from {src} to {dst}")
    hanoi(n - 1, aux, dst, src)

hanoi(3, 'A', 'C', 'B')`,
    explanation: 'To move a tower of disks, you move everything above the bottom disk out of the way, move the bottom disk, then stack everything back on top. The function calls itself to handle the smaller towers.',
    whyElegant: 'Three lines of logic solve a puzzle that stumps most people by hand. Like packing for a move: put everything in storage, move the big furniture, then unpack.',
    keyInsight: 'A seemingly impossible task becomes trivial when you trust a smaller version of yourself to handle it.',
    analogy: 'A kid unstacking pancakes onto a spare plate, moving the bottom pancake, then restacking.',
    sourceNote: 'Invented by mathematician Edouard Lucas in 1883.',
  },
  {
    id: 'merge-sort',
    title: 'Merge Sort',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['divide-and-conquer', 'sorting', 'O(n log n)'],
    code: `def merge_sort(xs):
    if len(xs) <= 1:
        return xs
    mid = len(xs) // 2
    left = merge_sort(xs[:mid])
    right = merge_sort(xs[mid:])
    return merge(left, right)

def merge(a, b):
    result = []
    i = j = 0
    while i < len(a) and j < len(b):
        if a[i] <= b[j]:
            result.append(a[i]); i += 1
        else:
            result.append(b[j]); j += 1
    return result + a[i:] + b[j:]`,
    explanation: 'Split the list in half, sort each half separately, then merge the two sorted halves by comparing their front elements one at a time. Each half gets sorted the same way, by splitting again.',
    whyElegant: 'Sorting a huge mess becomes manageable when you keep halving it. Like organizing a messy bookshelf by splitting books into two piles, sorting each pile, then interleaving them back.',
    keyInsight: 'Merging two sorted lists is easy, so reduce every sorting problem to that.',
    analogy: 'Two people each holding a sorted hand of cards, comparing top cards and laying them into one pile.',
    sourceNote: 'John von Neumann, 1945.',
  },
  {
    id: 'tree-depth',
    title: 'Tree Depth via Recursion',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['tree-traversal', 'base-case', 'max'],
    code: `class Node:
    def __init__(self, val, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def depth(node):
    if node is None:
        return 0
    return 1 + max(depth(node.left), depth(node.right))

tree = Node(1, Node(2, Node(4)), Node(3))
print(depth(tree))  # 3`,
    explanation: 'To find how deep a tree goes, ask the left side and right side how deep they are, take the bigger number, and add one for yourself. An empty spot has depth zero.',
    whyElegant: 'The whole measurement happens in one line. Like asking each branch of a family tree how many generations it has, and taking the longest answer.',
    keyInsight: 'The depth of a tree is just one more than the deeper of its two subtrees.',
    analogy: 'Measuring the height of a real tree by asking each main branch how tall it is, then adding the trunk.',
    sourceNote: 'Fundamental tree algorithm found in every CS textbook.',
  },
  {
    id: 'flatten-nested-list',
    title: 'Flatten Nested List',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['nested-structures', 'list-processing', 'type-check'],
    code: `def flatten(lst):
    result = []
    for item in lst:
        if isinstance(item, list):
            result.extend(flatten(item))
        else:
            result.append(item)
    return result

print(flatten([1, [2, [3, 4], 5], [6]]))
# [1, 2, 3, 4, 5, 6]`,
    explanation: 'Walk through each item. If it is a list, flatten that list first and add all its contents. If it is a plain value, just add it. Lists within lists within lists all get unpacked.',
    whyElegant: 'No matter how deeply things are nested, the same two-case logic unravels everything. Like opening a box that contains more boxes: keep opening until you find actual objects.',
    keyInsight: 'A nested structure is either a value or a container of more nested structures; handle both and you handle any depth.',
    analogy: 'Unpacking Russian nesting dolls: open each one, and if there is another doll inside, keep opening.',
    sourceNote: 'Standard recursive list-processing pattern.',
  },
  {
    id: 'recursive-descent-parser',
    title: 'Recursive Descent Parser for Arithmetic',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['parsing', 'grammar', 'mutual-recursion'],
    code: `class Parser:
    def __init__(self, text):
        self.text = text
        self.pos = 0

    def number(self):
        start = self.pos
        while self.pos < len(self.text) and self.text[self.pos].isdigit():
            self.pos += 1
        return int(self.text[start:self.pos])

    def factor(self):
        if self.text[self.pos] == '(':
            self.pos += 1
            result = self.expr()
            self.pos += 1
            return result
        return self.number()

    def term(self):
        result = self.factor()
        while self.pos < len(self.text) and self.text[self.pos] in '*/':
            op = self.text[self.pos]; self.pos += 1
            right = self.factor()
            result = result * right if op == '*' else result // right
        return result

    def expr(self):
        result = self.term()
        while self.pos < len(self.text) and self.text[self.pos] in '+-':
            op = self.text[self.pos]; self.pos += 1
            right = self.term()
            result = result + right if op == '+' else result - right
        return result

print(Parser("3+4*2").expr())  # 11`,
    explanation: 'Each grammar rule (expression, term, factor) becomes a function. An expression calls the term function, which calls the factor function, which might call expression again for parenthesised groups. The grammar\'s structure becomes the program\'s structure.',
    whyElegant: 'The code mirrors the grammar rule-for-rule. Reading a math expression works the same way your brain does: handle multiplication before addition, and parentheses first of all.',
    keyInsight: 'When the grammar is recursive, the parser writes itself: each grammar rule becomes a function that calls the others.',
    analogy: 'Reading a sentence by first finding clauses, then finding words within clauses, then finding letters within words.',
    sourceNote: 'Niklaus Wirth, "Compiler Construction," 1996; the pattern dates to the 1960s.',
  },
  {
    id: 'memoised-fibonacci',
    title: 'Memoised Recursive Fibonacci',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['memoisation', 'dynamic-programming', 'exponential-to-linear'],
    code: `from functools import lru_cache

@lru_cache(maxsize=None)
def fib(n):
    if n < 2:
        return n
    return fib(n - 1) + fib(n - 2)

print([fib(i) for i in range(10)])
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`,
    explanation: 'Fibonacci adds the previous two numbers to get the next one. Without memoisation, the same sub-problems get recalculated billions of times. The decorator remembers every answer so each value is computed only once.',
    whyElegant: 'One line of decoration transforms an impossibly slow exponential algorithm into a fast linear one without changing the logic at all. Like writing answers in the margin of a textbook so you never re-derive the same formula.',
    keyInsight: 'Remembering past answers turns an exponential recursion into a linear scan.',
    analogy: 'A student who writes each homework answer on a sticky note so they never rework the same problem twice.',
    sourceNote: 'Richard Bellman introduced memoisation as part of dynamic programming in the 1950s.',
  },
  {
    id: 'mutual-recursion-even-odd',
    title: 'Mutual Recursion for Even/Odd',
    language: 'Haskell',
    category: 'Recursion & Self-Reference',
    conceptTags: ['mutual-recursion', 'parity', 'co-dependence'],
    code: `isEven :: Int -> Bool
isEven 0 = True
isEven n = isOdd (n - 1)

isOdd :: Int -> Bool
isOdd 0 = False
isOdd n = isEven (n - 1)

-- isEven 4 -> isOdd 3 -> isEven 2 -> isOdd 1 -> isEven 0 -> True`,
    explanation: 'To check if a number is even, ask whether one less is odd. To check if something is odd, ask whether one less is even. The two functions call each other back and forth until they reach zero.',
    whyElegant: 'Two functions that can\'t exist without each other, like a conversation where each person\'s answer depends on the other\'s previous answer.',
    keyInsight: 'Two concepts that define each other can each become a function that calls the other.',
    analogy: 'Two friends playing hot potato, tossing a ball back and forth, counting down until someone is holding it at zero.',
    sourceNote: 'Classic example of mutual recursion from introductory functional programming courses.',
  },
  {
    id: 'recursive-zip',
    title: 'Recursive Zip',
    language: 'Haskell',
    category: 'Recursion & Self-Reference',
    conceptTags: ['list-processing', 'pattern-matching', 'pairs'],
    code: `myZip :: [a] -> [b] -> [(a, b)]
myZip [] _          = []
myZip _ []          = []
myZip (x:xs) (y:ys) = (x, y) : myZip xs ys

-- myZip [1,2,3] ["a","b","c"] = [(1,"a"), (2,"b"), (3,"c")]`,
    explanation: 'Take the first item from each list and pair them up. Then do the same for the rest of both lists. If either list runs out, stop.',
    whyElegant: 'Three lines handle every case: one list empty, the other empty, or both have elements. Like a zipper on a jacket: teeth from both sides interlock one pair at a time.',
    keyInsight: 'Pairing two sequences element-by-element is just taking one pair and recursing on the tails.',
    analogy: 'A zipper on a coat, where teeth from the left and right side click together one by one from bottom to top.',
    sourceNote: 'Standard Haskell Prelude function; the pattern appears in every functional language.',
  },
  {
    id: 'flatten-via-reduce',
    title: 'Flatten via Reduce and Recursion',
    language: 'JavaScript',
    category: 'Recursion & Self-Reference',
    conceptTags: ['reduce', 'higher-order', 'nested-structures'],
    code: `const flatten = (arr) =>
  arr.reduce(
    (acc, item) =>
      acc.concat(Array.isArray(item) ? flatten(item) : item),
    []
  );

console.log(flatten([1, [2, [3, 4], 5], [6]]));
// [1, 2, 3, 4, 5, 6]`,
    explanation: 'Walk through the array, building up a flat result. When you encounter a nested array, flatten it first (recursion), then concatenate. Plain values get added directly.',
    whyElegant: 'A single expression handles arbitrarily deep nesting by combining two powerful ideas: reduce for accumulation and recursion for depth. Like using the same tool to unwrap any number of packaging layers.',
    keyInsight: 'Reduce handles the breadth and recursion handles the depth; together they flatten any nesting.',
    analogy: 'A conveyor belt that unwraps packages: if a package contains more packages, those go back on the belt.',
    sourceNote: 'Common JavaScript pattern predating Array.prototype.flat().',
  },
  {
    id: 'ackermann-function',
    title: 'Ackermann Function',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['computability', 'fast-growing', 'non-primitive'],
    code: `def ackermann(m, n):
    if m == 0:
        return n + 1
    if n == 0:
        return ackermann(m - 1, 1)
    return ackermann(m - 1, ackermann(m, n - 1))

# ackermann(0, n) = n + 1
# ackermann(1, n) = n + 2
# ackermann(2, n) = 2n + 3
# ackermann(3, n) = 2^(n+3) - 3
# ackermann(4, 2) = 2^65536 - 3`,
    explanation: 'Three simple rules, but the function grows absurdly fast. Even small inputs produce numbers too large to write down. It proves that some computable functions grow faster than any loop-based counter could track.',
    whyElegant: 'Deceptively simple rules produce inconceivably large numbers. Like a recipe with three ingredients that somehow produces enough food to fill a stadium.',
    keyInsight: 'Simple recursive rules can generate growth rates that outrun every primitive recursive function.',
    analogy: 'A snowball that doubles in size every time it rolls, then the doubling rate itself starts doubling.',
    sourceNote: 'Wilhelm Ackermann, 1928; simplified by Rozsa Peter and Raphael Robinson.',
  },
  {
    id: 'mccarthy-91',
    title: 'McCarthy\'s 91 Function',
    language: 'Haskell',
    category: 'Recursion & Self-Reference',
    conceptTags: ['nested-recursion', 'convergence', 'verification'],
    code: `mc91 :: Int -> Int
mc91 n
  | n > 100   = n - 10
  | otherwise = mc91 (mc91 (n + 11))

-- For any n <= 100, mc91 n = 91
-- mc91 99 -> mc91(mc91 110) -> mc91 100 -> mc91(mc91 111) -> mc91 101 -> 91`,
    explanation: 'For numbers above 100, subtract 10. For anything else, add 11 and feed the result back into the function twice in a row. Every input at or below 100 eventually returns 91, no matter what.',
    whyElegant: 'A function that calls itself inside itself, yet always converges to the same answer for a huge range of inputs. Like a whirlpool: no matter where you drop a leaf, it ends up in the same spot.',
    keyInsight: 'Nested self-application can create a stable fixed point that absorbs an entire range of inputs.',
    analogy: 'A marble maze where every entrance below a certain level funnels every marble to the same exit.',
    sourceNote: 'John McCarthy, 1970; used as a benchmark for formal program verification.',
  },
  {
    id: 'recursive-tree-map',
    title: 'Recursive Map over a Tree',
    language: 'Haskell',
    category: 'Recursion & Self-Reference',
    conceptTags: ['tree-traversal', 'functor', 'transformation'],
    code: `data Tree a = Leaf | Node (Tree a) a (Tree a)
  deriving Show

treeMap :: (a -> b) -> Tree a -> Tree b
treeMap _ Leaf         = Leaf
treeMap f (Node l x r) = Node (treeMap f l) (f x) (treeMap f r)

example :: Tree Int
example = Node (Node Leaf 1 Leaf) 2 (Node Leaf 3 Leaf)

-- treeMap (*10) example
-- = Node (Node Leaf 10 Leaf) 20 (Node Leaf 30 Leaf)`,
    explanation: 'Apply a function to every value in a tree. For an empty spot, leave it empty. For a node, transform its value and do the same for the left and right branches.',
    whyElegant: 'The shape of the tree is perfectly preserved while every value gets transformed. Like painting every room in a house a new colour without moving any walls.',
    keyInsight: 'Mapping over a tree is the same operation applied at every level, preserving structure while transforming content.',
    analogy: 'A building where every room gets new wallpaper, but the floor plan stays exactly the same.',
    sourceNote: 'The Functor instance for trees; foundational in functional programming.',
  },
  {
    id: 'n-queens-backtracking',
    title: 'Backtracking N-Queens',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['backtracking', 'constraint-satisfaction', 'combinatorial'],
    code: `def queens(n):
    def safe(board, row, col):
        for r, c in enumerate(board):
            if c == col or abs(r - row) == abs(c - col):
                return False
        return True

    def solve(board, row):
        if row == n:
            yield list(board)
            return
        for col in range(n):
            if safe(board, row, col):
                board.append(col)
                yield from solve(board, row + 1)
                board.pop()

    return list(solve([], 0))

print(len(queens(8)))  # 92 solutions`,
    explanation: 'Place queens one row at a time. For each row, try every column. If a queen is safe (no other queen in the same column or diagonal), place it and move to the next row. If you get stuck, back up and try a different column.',
    whyElegant: 'The algorithm explores a tree of possibilities, pruning dead ends early. Like navigating a hedge maze by always turning back the moment you hit a wall, systematically trying every path.',
    keyInsight: 'Backtracking turns a brute-force search into an efficient exploration by abandoning bad choices immediately.',
    analogy: 'Trying to seat guests at a dinner table where certain pairs argue: place one, check for conflicts, swap seats if needed.',
    sourceNote: 'The eight queens puzzle dates to 1848; this backtracking form is a standard CS exercise.',
  },
  {
    id: 'sudoku-solver',
    title: 'Sudoku Solver',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['backtracking', 'constraint-propagation', 'puzzle'],
    code: `def solve(board):
    empty = next(((r, c) for r in range(9) for c in range(9)
                  if board[r][c] == 0), None)
    if not empty:
        return True
    row, col = empty
    for num in range(1, 10):
        if valid(board, row, col, num):
            board[row][col] = num
            if solve(board):
                return True
            board[row][col] = 0
    return False

def valid(board, row, col, num):
    if num in board[row]:
        return False
    if any(board[r][col] == num for r in range(9)):
        return False
    br, bc = 3 * (row // 3), 3 * (col // 3)
    return not any(board[br+r][bc+c] == num
                   for r in range(3) for c in range(3))`,
    explanation: 'Find an empty cell, try numbers 1 through 9. If a number doesn\'t violate any rule (row, column, or 3x3 box), place it and move to the next empty cell. If nothing works, erase and go back.',
    whyElegant: 'The entire puzzle-solving strategy boils down to try, check, and undo. The recursion automatically manages a search through billions of possibilities without any explicit bookkeeping.',
    keyInsight: 'Recursive backtracking turns a constraint-satisfaction puzzle into a depth-first search with automatic undo.',
    analogy: 'Filling in a crossword with pencil: write a letter, see if it fits with the crossing words, and erase if it creates a contradiction.',
    sourceNote: 'Peter Norvig\'s "Solving Every Sudoku Puzzle" popularised this approach.',
  },
  {
    id: 'hofstadter-g-sequence',
    title: 'Hofstadter G Sequence',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['self-reference', 'nested-recursion', 'integer-sequence'],
    code: `def g(n):
    if n == 0:
        return 0
    return n - g(g(n - 1))

print([g(i) for i in range(15)])
# [0, 1, 1, 2, 3, 3, 4, 4, 5, 6, 6, 7, 8, 8, 9]`,
    explanation: 'To get the value at position n, first compute g at position n-1, then feed that result back into g, and subtract from n. The function calls itself inside itself, producing a strange, almost-regular sequence.',
    whyElegant: 'A function defined in terms of itself applied twice creates a sequence that dances close to n times the golden ratio, connecting recursion to one of mathematics\' most famous constants.',
    keyInsight: 'Nested self-reference can produce sequences with deep connections to irrational numbers.',
    analogy: 'A mirror reflecting another mirror: the image inside the image creates a pattern that almost repeats but never quite does.',
    sourceNote: 'Douglas Hofstadter, "Godel, Escher, Bach," 1979.',
  },
  {
    id: 'recursive-power-set',
    title: 'Recursive Power Set',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['combinatorics', 'subsets', 'exponential'],
    code: `def power_set(s):
    if not s:
        return [[]]
    first, *rest = s
    without = power_set(rest)
    with_first = [[first] + subset for subset in without]
    return without + with_first

print(power_set([1, 2, 3]))
# [[], [3], [2], [2,3], [1], [1,3], [1,2], [1,2,3]]`,
    explanation: 'Every subset either includes the first element or it doesn\'t. Generate all subsets of everything except the first element, then make a copy of each subset with the first element added. Combine both groups.',
    whyElegant: 'A binary choice at each element mirrors how subsets work: each item is either in or out. The code structure directly reflects the mathematical definition.',
    keyInsight: 'The power set of n items is built from the power set of n-1 items by doubling: each existing subset spawns a copy that includes the new element.',
    analogy: 'Packing for a trip: for each item in your closet, you either put it in the suitcase or leave it, producing every possible packing combination.',
    sourceNote: 'Standard combinatorics; appears in every discrete mathematics course.',
  },
  {
    id: 'cps-factorial',
    title: 'CPS Transform of Factorial',
    language: 'JavaScript',
    category: 'Recursion & Self-Reference',
    conceptTags: ['continuation-passing', 'tail-calls', 'control-flow'],
    code: `function factorial(n, k) {
  if (n === 0) return k(1);
  return factorial(n - 1, (result) => k(n * result));
}

factorial(5, (x) => console.log(x)); // 120`,
    explanation: 'Instead of returning a value, each step passes its result to a "continuation" function that says what to do next. The chain of continuations builds up like a to-do list, then unwinds when the base case fires.',
    whyElegant: 'Explicit continuations turn implicit call-stack management into visible data. Like writing a chain of post-it notes: "when you get the answer, multiply by 5 and hand it to the next note."',
    keyInsight: 'Making the "what happens next" explicit as a function parameter gives you full control over the order and flow of computation.',
    analogy: 'A relay race where each runner is handed instructions: "run your leg, then pass the baton AND the scoreboard to the next runner."',
    sourceNote: 'Continuation-passing style originates from denotational semantics (Strachey & Wadsworth, 1970s).',
  },
  {
    id: 'fix-point-combinator',
    title: 'Fix Point Combinator',
    language: 'Haskell',
    category: 'Recursion & Self-Reference',
    conceptTags: ['fixed-point', 'lambda-calculus', 'self-application'],
    code: `fix :: (a -> a) -> a
fix f = let x = f x in x

factorial :: Int -> Int
factorial = fix (\\rec n -> if n == 0 then 1 else n * rec (n - 1))

-- fix f produces the value x such that x = f x
-- factorial 5 = 120`,
    explanation: 'The fix combinator finds a value that, when you apply a function to it, gives you back the same value. It enables recursion without ever naming the function. You hand it a recipe that expects to receive "itself" as an ingredient.',
    whyElegant: 'Recursion is typically a built-in language feature. Here it emerges from a single, general concept: finding a fixed point. Like a feedback loop that stabilises itself.',
    keyInsight: 'Recursion is not a primitive: it can be derived from the concept of a function that is its own output.',
    analogy: 'A photo of someone holding a photo of themselves holding a photo, going infinitely deep, all created by one rule.',
    sourceNote: 'Haskell Curry\'s Y combinator; this lazy version is from the Haskell Prelude.',
  },
  {
    id: 'quine-python',
    title: 'Quine in Python',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['quine', 'self-reference', 'fixed-point'],
    code: `s = 's = %r\\nprint(s %% s)'
print(s % s)`,
    explanation: 'A quine is a program that prints its own source code. This one stores its own template in a variable, then uses string formatting to insert the variable\'s value back into the template, reproducing the full program.',
    whyElegant: 'The program is a fixed point of the print function: the output equals the input. Like a sentence that describes itself, such as "This sentence has thirty-six letters."',
    keyInsight: 'Self-reproduction requires a part that serves as both data and instructions, mirroring how DNA works.',
    analogy: 'A recipe card whose first instruction is "copy this recipe card exactly."',
    sourceNote: 'Named after Willard Van Orman Quine; this compact Python form is widely cited.',
  },
  {
    id: 'self-printing-structure',
    title: 'Self-Printing Program Structure',
    language: 'JavaScript',
    category: 'Recursion & Self-Reference',
    conceptTags: ['quine', 'self-reference', 'introspection'],
    code: `(function f() {
  console.log('(' + f + ')()');
})()`,
    explanation: 'A JavaScript function can convert itself to a string using its own name. This function prints the code needed to recreate and call itself, producing a program whose output is its own source.',
    whyElegant: 'The language\'s ability to stringify functions creates a natural mirror. The function looks at its own reflection and speaks what it sees.',
    keyInsight: 'When a language can inspect its own functions as strings, self-printing becomes a matter of framing rather than encoding.',
    analogy: 'A parrot that can look in a mirror and perfectly repeat the description of what it sees, including the description of repeating.',
    sourceNote: 'Classic JavaScript quine exploiting Function.prototype.toString().',
  },
  {
    id: 'recursive-pretty-printer',
    title: 'Recursive Pretty-Printer',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['pretty-printing', 'indentation', 'nested-structures'],
    code: `def pretty(data, indent=0):
    prefix = '  ' * indent
    if isinstance(data, dict):
        lines = ['{']
        for k, v in data.items():
            lines.append(f'{prefix}  {k!r}: {pretty(v, indent + 1).lstrip()}')
        lines.append(f'{prefix}}}')
        return '\\n'.join(lines)
    if isinstance(data, list):
        lines = ['[']
        for item in data:
            lines.append(f'{prefix}  {pretty(item, indent + 1).lstrip()},')
        lines.append(f'{prefix}]')
        return '\\n'.join(lines)
    return f'{prefix}{data!r}'

print(pretty({'a': [1, {'b': 2}]}))`,
    explanation: 'To display nested data nicely, check what kind of value you have. Dictionaries and lists get printed with their contents indented one level deeper. Plain values print themselves. Each nesting level adds more indentation.',
    whyElegant: 'The code\'s recursion mirrors the data\'s nesting. Every level of the output is produced by the same function at a deeper call depth, so the program\'s shape matches the shape of what it prints.',
    keyInsight: 'Recursive data structures deserve recursive printers; the indentation level tracks the call depth naturally.',
    analogy: 'Writing an outline for a school essay: each sub-point gets indented further, and sub-sub-points further still.',
    sourceNote: 'Pattern used in Python\'s pprint module and every JSON formatter.',
  },
  {
    id: 'recursive-json-serialiser',
    title: 'Recursive JSON Serialiser',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['serialisation', 'type-dispatch', 'recursive-data'],
    code: `def to_json(obj):
    if obj is None:
        return 'null'
    if isinstance(obj, bool):
        return 'true' if obj else 'false'
    if isinstance(obj, (int, float)):
        return str(obj)
    if isinstance(obj, str):
        return '"' + obj.replace('\\\\', '\\\\\\\\').replace('"', '\\\\"') + '"'
    if isinstance(obj, list):
        return '[' + ', '.join(to_json(x) for x in obj) + ']'
    if isinstance(obj, dict):
        pairs = [to_json(k) + ': ' + to_json(v) for k, v in obj.items()]
        return '{' + ', '.join(pairs) + '}'
    raise TypeError(f'Cannot serialise {type(obj)}')

print(to_json({'name': 'Ada', 'scores': [10, 20], 'active': True}))`,
    explanation: 'Each Python type maps to a JSON representation. Strings get quoted, numbers stay as-is, lists and dicts recursively serialise their contents. The function dispatches on type and calls itself for compound values.',
    whyElegant: 'Translating between two nested formats is a natural fit for recursion: every container holds things that might be containers themselves.',
    keyInsight: 'Serialisation of recursive data structures requires recursive processing; the serialiser\'s structure mirrors the data\'s structure.',
    analogy: 'A translator at a conference who translates each speaker, and when a speaker quotes another speaker, translates that quote too.',
    sourceNote: 'Simplified version of Python\'s json.dumps() logic.',
  },
  {
    id: 'peano-arithmetic-types',
    title: 'Peano Arithmetic in Types',
    language: 'TypeScript',
    category: 'Recursion & Self-Reference',
    conceptTags: ['type-level', 'peano-numbers', 'dependent-types'],
    code: `type Zero = [];
type Succ<N extends unknown[]> = [unknown, ...N];

type One = Succ<Zero>;           // [unknown]
type Two = Succ<One>;            // [unknown, unknown]
type Three = Succ<Two>;          // [unknown, unknown, unknown]

type Add<A extends unknown[], B extends unknown[]> = [...A, ...B];
type Five = Add<Two, Three>;     // length 5

type Length<T extends unknown[]> = T['length'];
type Result = Length<Five>;      // 5`,
    explanation: 'Numbers are represented as arrays of a certain length. Zero is an empty array. Adding one means prepending an element. Addition is concatenation. The compiler itself does the arithmetic at compile time, with no code running.',
    whyElegant: 'Arithmetic happens entirely in the type checker, before the program ever runs. The compiler becomes a calculator. Like writing math problems on a blueprint and having the architect solve them before construction starts.',
    keyInsight: 'TypeScript\'s type system is powerful enough to encode natural number arithmetic using tuple lengths.',
    analogy: 'Counting with building blocks: zero is no blocks, three is three blocks, and adding means pushing two stacks together.',
    sourceNote: 'Giuseppe Peano\'s axioms (1889) encoded in TypeScript\'s structural type system.',
  },
  {
    id: 'structural-induction',
    title: 'Structural Induction as Code',
    language: 'Haskell',
    category: 'Recursion & Self-Reference',
    conceptTags: ['induction', 'proof', 'algebraic-data'],
    code: `data Nat = Zero | Succ Nat deriving Show

add :: Nat -> Nat -> Nat
add Zero     m = m
add (Succ n) m = Succ (add n m)

-- Proof that add n Zero = n (by structural induction):
-- Base case:  add Zero Zero = Zero           (by definition)
-- Inductive:  assume add n Zero = n
--             add (Succ n) Zero = Succ (add n Zero)  (by definition)
--                               = Succ n              (by hypothesis)

mul :: Nat -> Nat -> Nat
mul Zero     _ = Zero
mul (Succ n) m = add m (mul n m)

-- toInt (mul (Succ (Succ Zero)) (Succ (Succ (Succ Zero)))) = 6`,
    explanation: 'Natural numbers are defined as either Zero or the successor of another natural number. Addition peels off one successor at a time. The code IS the proof: each pattern-match case corresponds to a case in a mathematical induction proof.',
    whyElegant: 'The program is simultaneously executable code and a mathematical proof. Running it computes; reading it proves. Like a recipe that also serves as a chemistry explanation.',
    keyInsight: 'In languages with algebraic data types, writing a correct recursive function IS performing structural induction.',
    analogy: 'Proving dominoes will all fall by showing the first one falls and each one knocks over the next.',
    sourceNote: 'Peano arithmetic; the code-as-proof perspective comes from the Curry-Howard correspondence.',
  },
  {
    id: 'catamorphism-list',
    title: 'Catamorphism over a List',
    language: 'Haskell',
    category: 'Recursion & Self-Reference',
    conceptTags: ['catamorphism', 'fold', 'recursion-scheme'],
    code: `-- A catamorphism tears down a structure
cata :: b -> (a -> b -> b) -> [a] -> b
cata z _ []     = z
cata z f (x:xs) = f x (cata z f xs)

mySum    = cata 0 (+)
myLength = cata 0 (\\_ acc -> acc + 1)
myConcat = cata [] (++)

-- mySum [1,2,3]    = 6
-- myLength [1,2,3] = 3`,
    explanation: 'A catamorphism collapses a data structure into a single value. For a list, you provide what to do with an empty list (the base value) and how to combine an element with the collapsed rest. Every fold is a catamorphism.',
    whyElegant: 'Sum, length, and concatenation are all the same pattern with different combining functions. One skeleton, many behaviors. Like a factory assembly line that can produce different products by swapping out one station.',
    keyInsight: 'Every recursive consumption of a data structure follows the same shape: provide one handler per constructor.',
    analogy: 'Crushing a stack of cardboard boxes one at a time into a recycling bale.',
    sourceNote: 'Erik Meijer, "Functional Programming with Bananas, Lenses, Envelopes and Barbed Wire," 1991.',
  },
  {
    id: 'anamorphism-list',
    title: 'Anamorphism Generating a List',
    language: 'Haskell',
    category: 'Recursion & Self-Reference',
    conceptTags: ['anamorphism', 'unfold', 'recursion-scheme'],
    code: `-- An anamorphism builds up a structure from a seed
ana :: (b -> Maybe (a, b)) -> b -> [a]
ana f seed = case f seed of
  Nothing     -> []
  Just (a, b) -> a : ana f b

countdown :: Int -> [Int]
countdown = ana (\\n -> if n <= 0 then Nothing else Just (n, n - 1))

-- countdown 5 = [5, 4, 3, 2, 1]

fibs :: [Int]
fibs = ana (\\(a, b) -> Just (a, (b, a + b))) (0, 1)

-- take 8 fibs = [0, 1, 1, 2, 3, 5, 8, 13]`,
    explanation: 'An anamorphism builds a list from a starting value (a seed). At each step, a function either produces a list element and a new seed, or signals that the list is done. It is the reverse of a fold.',
    whyElegant: 'Where a catamorphism tears down, an anamorphism builds up. The two are perfect duals. Like a fold in reverse: instead of crushing a structure, you grow one from a seed.',
    keyInsight: 'Every recursive list generation follows the same pattern: produce one element and a new seed, or stop.',
    analogy: 'A plant growing from a seed: at each step it produces a new leaf and a slightly changed seed for the next step.',
    sourceNote: 'Dual of catamorphism; from Meijer et al., "Bananas" paper, 1991.',
  },
  {
    id: 'hylomorphism',
    title: 'Hylomorphism (Build Then Fold)',
    language: 'Haskell',
    category: 'Recursion & Self-Reference',
    conceptTags: ['hylomorphism', 'fusion', 'recursion-scheme'],
    code: `-- A hylomorphism = anamorphism followed by catamorphism
-- The intermediate structure is never materialised (deforestation)
hylo :: (a -> c -> c) -> c -> (b -> Maybe (a, b)) -> b -> c
hylo f z g seed = case g seed of
  Nothing     -> z
  Just (a, b) -> f a (hylo f z g b)

factorial :: Int -> Int
factorial = hylo (*) 1 coalg
  where coalg 0 = Nothing
        coalg n = Just (n, n - 1)

-- factorial 5 = 5 * 4 * 3 * 2 * 1 * 1 = 120`,
    explanation: 'A hylomorphism first unfolds a seed into a structure, then folds that structure into a result. The two processes happen in lockstep, so the intermediate structure never actually gets built in memory.',
    whyElegant: 'Building something up just to tear it down sounds wasteful, but fusing the two steps eliminates the middle structure entirely. Like a translator who hears a sentence and speaks the translation simultaneously, word by word, without writing anything down.',
    keyInsight: 'An unfold followed by a fold can be fused into a single recursive pass that never materialises the intermediate structure.',
    analogy: 'An interpreter translating a speech in real time: they hear a phrase, translate it, and speak, never writing the whole speech down first.',
    sourceNote: 'Meijer et al., 1991; "hylomorphism" from Greek hyle (matter) + morphe (form).',
  },
  {
    id: 'paramorphism',
    title: 'Paramorphism with Context',
    language: 'Haskell',
    category: 'Recursion & Self-Reference',
    conceptTags: ['paramorphism', 'context', 'recursion-scheme'],
    code: `-- A paramorphism is a fold that also sees the remaining structure
para :: b -> (a -> [a] -> b -> b) -> [a] -> b
para z _ []     = z
para z f (x:xs) = f x xs (para z f xs)

-- Suffixes of a list
suffixes :: [a] -> [[a]]
suffixes = para [[]] (\\x xs acc -> (x:xs) : acc)

-- suffixes [1,2,3] = [[1,2,3],[2,3],[3],[]]

-- Sliding pairs
pairs :: [a] -> [(a, a)]
pairs = para [] (\\x xs acc -> case xs of
  (y:_) -> (x, y) : acc
  []    -> acc)

-- pairs [1,2,3,4] = [(1,2),(2,3),(3,4)]`,
    explanation: 'A normal fold only sees each element and the accumulated result. A paramorphism also gets to peek at the remaining list. This extra context makes some operations much easier to express.',
    whyElegant: 'Small extension, large payoff. Giving the fold function one extra piece of information (the tail) opens up a whole class of algorithms. Like a reader who can look ahead one paragraph while summarising the current one.',
    keyInsight: 'Sometimes a fold needs to see not just the current element but also what comes after it.',
    analogy: 'Reading a book with one finger on the current page and another bookmarking the rest of the chapter.',
    sourceNote: 'Lambert Meertens, 1992; extends catamorphism with structural context.',
  },
  {
    id: 'zygomorphism',
    title: 'Zygomorphism with Accumulator',
    language: 'Haskell',
    category: 'Recursion & Self-Reference',
    conceptTags: ['zygomorphism', 'paired-fold', 'recursion-scheme'],
    code: `-- A zygomorphism runs two folds in tandem;
-- the main fold can depend on the auxiliary fold's result
zygo :: (a -> b -> b) -> (a -> b -> c -> c) -> b -> c -> [a] -> c
zygo _ _ _  c0 []     = c0
zygo f g b0 c0 (x:xs) = g x (f x bRest) (zygo f g b0 c0 xs)
  where bRest = foldr f b0 xs

-- Check if a list is sorted, using an auxiliary fold for the running max
isSorted :: [Int] -> Bool
isSorted = zygo max' check minBound True
  where max'  x b   = max x b
        check x m acc = (x <= m || m == minBound) && acc`,
    explanation: 'Two folds run side by side over the same list. The auxiliary fold computes extra information that the main fold needs. Each fold sees the current element and uses the other fold\'s accumulated result.',
    whyElegant: 'Instead of making two separate passes over the data, both computations happen in a single traversal. Like two workers on the same assembly line, one checking quality while the other assembles.',
    keyInsight: 'When one fold depends on information from another, you can fuse them into a single pass with a zygomorphism.',
    analogy: 'Two friends reading the same book together: one tracks characters and the other tracks plot twists, sharing notes as they go.',
    sourceNote: 'Malcolm, 1990; a generalisation of catamorphism with an auxiliary algebra.',
  },
  {
    id: 'histomorphism',
    title: 'Histomorphism with History',
    language: 'Haskell',
    category: 'Recursion & Self-Reference',
    conceptTags: ['histomorphism', 'course-of-values', 'recursion-scheme'],
    code: `-- A histomorphism gives each step access to ALL previous results
data Cofree f a = a :< f (Cofree f a)

extract :: Cofree f a -> a
extract (a :< _) = a

-- List histomorphism: each step sees the full history of prior results
histo :: b -> (a -> Cofree Maybe b -> b) -> [a] -> b
histo z _ []     = z
histo z f (x:xs) = f x history
  where history = histo z f xs :< case xs of
          []    -> Nothing
          (_:_) -> Just history

-- Fibonacci via histomorphism: look back two steps
fib :: Int -> Int
fib n = histo 0 alg [1..n]
  where alg _ (a :< Just (b :< _)) = a + b
        alg _ (a :< Nothing)       = a + 1`,
    explanation: 'A normal fold only sees the result from the previous step. A histomorphism preserves the entire history of all prior results, letting each step look as far back as it needs.',
    whyElegant: 'Dynamic programming problems become natural when the fold carries its full history. Like writing an essay where every paragraph can reference any earlier paragraph, not just the previous one.',
    keyInsight: 'When a computation depends on multiple prior results, packaging the full history into the recursion makes the pattern explicit.',
    analogy: 'A student taking an exam who can flip back through all their previous answers, not just the last one.',
    sourceNote: 'Uustalu and Vene, 1999; the dual of a futumorphism.',
  },
  {
    id: 'recursive-grammar-parsing',
    title: 'Recursive Grammar Parsing',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['grammar', 'parsing', 'BNF'],
    code: `def parse(grammar, symbol, tokens, pos):
    """Try each alternative for a grammar symbol."""
    if symbol not in grammar:
        # Terminal: match literal token
        if pos < len(tokens) and tokens[pos] == symbol:
            return pos + 1
        return None
    for alt in grammar[symbol]:
        result = pos
        for sym in alt:
            result = parse(grammar, sym, tokens, result)
            if result is None:
                break
        if result is not None:
            return result
    return None

grammar = {
    'S':    [['NP', 'VP']],
    'NP':   [['the', 'N']],
    'VP':   [['V', 'NP']],
    'N':    [['cat'], ['dog']],
    'V':    [['chased']],
}
tokens = 'the cat chased the dog'.split()
print(parse(grammar, 'S', tokens, 0))  # 5 (all tokens consumed)`,
    explanation: 'Each grammar rule becomes a recursive attempt to match tokens. A non-terminal tries each of its alternative expansions. A terminal checks if the next token matches. The grammar itself drives the recursion.',
    whyElegant: 'The parser is a direct interpreter for the grammar: write down the rules, and the recursion does the rest. The grammar is the program.',
    keyInsight: 'A grammar is a recursive specification; parsing it is simply executing that specification against a token stream.',
    analogy: 'Following an instruction manual where some steps say "see page 12," which in turn says "see page 7," building meaning step by step.',
    sourceNote: 'Recursive descent parsing; foundational technique from compiler theory.',
  },
  {
    id: 'peg-parser-combinator',
    title: 'PEG Parser Combinator',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['PEG', 'parser-combinators', 'composable'],
    code: `def literal(expected):
    def parse(text, pos):
        if text[pos:pos+len(expected)] == expected:
            return expected, pos + len(expected)
        return None
    return parse

def sequence(*parsers):
    def parse(text, pos):
        results = []
        for p in parsers:
            r = p(text, pos)
            if r is None: return None
            val, pos = r
            results.append(val)
        return results, pos
    return parse

def choice(*parsers):
    def parse(text, pos):
        for p in parsers:
            r = p(text, pos)
            if r is not None: return r
        return None
    return parse

greeting = sequence(
    choice(literal('hello'), literal('hi')),
    literal(' world')
)
print(greeting('hello world', 0))  # (['hello', ' world'], 11)`,
    explanation: 'Build parsers from small pieces. A literal matches exact text. Sequence chains parsers one after another. Choice tries alternatives until one works. Complex grammars are assembled by combining these simple building blocks.',
    whyElegant: 'Parsers are values you can store, pass around, and combine with operators. The grammar reads almost like a specification. Like building with LEGO: small standardised pieces snap together into anything.',
    keyInsight: 'When parsers are first-class functions, building a grammar is just function composition.',
    analogy: 'Snapping LEGO bricks together: each brick is a tiny parser, and you build the final structure by connecting them.',
    sourceNote: 'Bryan Ford, "Parsing Expression Grammars," 2004.',
  },
  {
    id: 'packrat-memoisation',
    title: 'Packrat Memoisation',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['memoisation', 'PEG', 'linear-time'],
    code: `def packrat(grammar):
    memo = {}

    def parse(symbol, text, pos):
        key = (symbol, pos)
        if key in memo:
            return memo[key]

        if symbol not in grammar:
            result = (pos + 1) if pos < len(text) and text[pos] == symbol else None
        else:
            result = None
            for alt in grammar[symbol]:
                p = pos
                for sym in alt:
                    r = parse(sym, text, p)
                    if r is None:
                        p = None; break
                    p = r
                if p is not None:
                    result = p; break
        memo[key] = result
        return result

    return parse

grammar = {'S': [['a', 'S', 'b'], ['a', 'b']]}
parse = packrat(grammar)
print(parse('S', 'aaabbb', 0))  # 6`,
    explanation: 'A packrat parser remembers every result it has computed for every position in the text. If the same rule is tried at the same position again, the cached answer is returned instantly. This guarantees the parser never does redundant work.',
    whyElegant: 'Adding a dictionary of past results converts an exponential backtracking parser into a linear-time one. The same idea as memoised Fibonacci, applied to parsing.',
    keyInsight: 'Memoising parser results by (rule, position) pairs guarantees linear-time parsing for any PEG grammar.',
    analogy: 'A student who writes each homework answer on a sticky note stuck to the textbook page, so they never rework the same problem.',
    sourceNote: 'Bryan Ford, "Packrat Parsing," 2002.',
  },
  {
    id: 'earley-chart-parser',
    title: 'Earley Chart Parser Concept',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['earley', 'chart-parsing', 'general-CFG'],
    code: `def earley(grammar, start, tokens):
    n = len(tokens)
    chart = [set() for _ in range(n + 1)]
    chart[0].add((start, tuple(grammar[start][0]), 0, 0))

    for i in range(n + 1):
        agenda = list(chart[i])
        while agenda:
            rule, rhs, dot, origin = agenda.pop()
            if dot < len(rhs):
                sym = rhs[dot]
                if sym in grammar:  # predict
                    for alt in grammar[sym]:
                        item = (sym, tuple(alt), 0, i)
                        if item not in chart[i]:
                            chart[i].add(item)
                            agenda.append(item)
                elif i < n and tokens[i] == sym:  # scan
                    chart[i+1].add((rule, rhs, dot+1, origin))
            else:  # complete
                for r2, rhs2, d2, o2 in list(chart[origin]):
                    if d2 < len(rhs2) and rhs2[d2] == rule:
                        item = (r2, rhs2, d2+1, o2)
                        if item not in chart[i]:
                            chart[i].add(item)
                            agenda.append(item)

    return any(r == start and d == len(rhs) and o == 0
               for r, rhs, d, o in chart[n])

grammar = {'S': [['N', 'V', 'N']], 'N': [['a']], 'V': [['b']]}
print(earley(grammar, 'S', list('aba')))  # True`,
    explanation: 'The parser maintains a chart of partial parse results at each position. Three operations repeat: predict what rules could start here, scan to match the next token, and complete to advance rules that were waiting for a sub-parse to finish.',
    whyElegant: 'Three simple operations (predict, scan, complete) handle any context-free grammar, including ambiguous ones. The chart acts as shared memory, avoiding redundant work across all possible parses.',
    keyInsight: 'By recording partial parses in a chart, you can handle any context-free grammar in cubic time without ever backtracking.',
    analogy: 'Detectives working a case by pinning evidence to a shared corkboard, each building on what the others have already found.',
    sourceNote: 'Jay Earley, "An Efficient Context-Free Parsing Algorithm," 1968.',
  },
  {
    id: 'cyk-chart-parsing',
    title: 'CYK Chart Parsing',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['CYK', 'dynamic-programming', 'CNF'],
    code: `def cyk(grammar, terminals, sentence):
    n = len(sentence)
    table = [[set() for _ in range(n)] for _ in range(n)]

    # Base case: single tokens
    for i, word in enumerate(sentence):
        for lhs, rhs_list in grammar.items():
            for rhs in rhs_list:
                if rhs == [word]:
                    table[i][i].add(lhs)

    # Fill diagonals for increasing span lengths
    for span in range(2, n + 1):
        for i in range(n - span + 1):
            j = i + span - 1
            for k in range(i, j):
                for lhs, rhs_list in grammar.items():
                    for rhs in rhs_list:
                        if len(rhs) == 2:
                            B, C = rhs
                            if B in table[i][k] and C in table[k+1][j]:
                                table[i][j].add(lhs)

    return 'S' in table[0][n-1]

grammar = {
    'S': [['NP','VP']], 'VP': [['V','NP']],
    'NP': [['she'],['fish']], 'V': [['eats']],
}
print(cyk(grammar, {}, ['she','eats','fish']))  # True`,
    explanation: 'The CYK algorithm fills a triangular table. Each cell represents a span of the sentence. Single words are filled first, then the algorithm checks which grammar rules can combine adjacent spans, building up to the full sentence.',
    whyElegant: 'A bottom-up table-filling approach that handles every possible parse simultaneously. The table is both the workspace and the answer: if the start symbol appears in the top corner, the sentence is valid.',
    keyInsight: 'By building parses bottom-up from single words to the whole sentence, CYK systematically covers every possible parse tree.',
    analogy: 'Building a pyramid of blocks: the bottom row is individual words, and each higher row combines pairs from below.',
    sourceNote: 'Cocke, Younger, and Kasami; independently discovered 1960s.',
  },
  {
    id: 'knuth-attribute-grammar',
    title: 'Knuth\'s Attribute Grammar',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['attribute-grammar', 'semantic-analysis', 'tree-decoration'],
    code: `class Node:
    def __init__(self, op, left=None, right=None, value=None):
        self.op = op
        self.left = left
        self.right = right
        self.value = value
        self.result = None  # synthesised attribute

def evaluate(node):
    """Synthesised attribute evaluation via recursive tree walk."""
    if node.op == 'num':
        node.result = node.value
    elif node.op == '+':
        evaluate(node.left)
        evaluate(node.right)
        node.result = node.left.result + node.right.result
    elif node.op == '*':
        evaluate(node.left)
        evaluate(node.right)
        node.result = node.left.result * node.right.result
    return node.result

tree = Node('+', Node('*', Node('num', value=3), Node('num', value=4)),
                 Node('num', value=5))
print(evaluate(tree))  # 17  (3*4 + 5)`,
    explanation: 'Each node in a parse tree gets decorated with computed attributes. Leaf nodes have inherent values. Internal nodes compute their attributes from their children\'s attributes. The recursion flows bottom-up, carrying meaning upward.',
    whyElegant: 'The grammar rules define structure; the attributes define meaning. Decorating the tree is a single recursive walk that turns syntax into semantics.',
    keyInsight: 'Attribute grammars separate what a program looks like (syntax) from what it means (semantics), connecting them through recursive tree decoration.',
    analogy: 'A teacher grading a nested outline: each sub-heading gets a score, and the top-level heading\'s score is computed from its sub-scores.',
    sourceNote: 'Donald Knuth, "Semantics of Context-Free Languages," 1968.',
  },
  {
    id: 'dfs-cycle-detection',
    title: 'Circular Reference Detection via DFS Colouring',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['DFS', 'graph-colouring', 'cycle-detection'],
    code: `def has_cycle(graph):
    WHITE, GRAY, BLACK = 0, 1, 2
    color = {node: WHITE for node in graph}

    def dfs(node):
        color[node] = GRAY
        for neighbor in graph[node]:
            if color[neighbor] == GRAY:
                return True  # back edge = cycle
            if color[neighbor] == WHITE and dfs(neighbor):
                return True
        color[node] = BLACK
        return False

    return any(color[n] == WHITE and dfs(n) for n in graph)

graph = {'a': ['b'], 'b': ['c'], 'c': ['a'], 'd': ['b']}
print(has_cycle(graph))  # True (a -> b -> c -> a)`,
    explanation: 'Colour each node white (unvisited), gray (currently being explored), or black (fully explored). If you encounter a gray node during traversal, you have found a cycle because you have circled back to something you are still in the middle of exploring.',
    whyElegant: 'Three colours are all you need to distinguish "haven\'t seen it," "currently exploring it," and "done with it." The gray colour acts as a breadcrumb trail for the current recursive path.',
    keyInsight: 'A back edge to a gray node means the recursion has encountered its own ancestor, which is exactly what a cycle is.',
    analogy: 'Exploring a cave system with chalk: mark the entrance of each tunnel you enter, and if you see your own chalk mark ahead of you, you have gone in a circle.',
    sourceNote: 'Standard DFS colouring from Cormen et al., "Introduction to Algorithms" (CLRS).',
  },
  {
    id: 'tarjan-bridge-finding',
    title: 'Tarjan\'s Bridge-Finding',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['DFS', 'bridges', 'low-link'],
    code: `def find_bridges(graph):
    disc = {}
    low = {}
    bridges = []
    timer = [0]

    def dfs(u, parent):
        disc[u] = low[u] = timer[0]
        timer[0] += 1
        for v in graph[u]:
            if v not in disc:
                dfs(v, u)
                low[u] = min(low[u], low[v])
                if low[v] > disc[u]:
                    bridges.append((u, v))
            elif v != parent:
                low[u] = min(low[u], disc[v])

    for node in graph:
        if node not in disc:
            dfs(node, None)
    return bridges

graph = {0: [1,2], 1: [0,2], 2: [0,1,3], 3: [2,4], 4: [3]}
print(find_bridges(graph))  # [(3, 4), (2, 3)]`,
    explanation: 'Each node tracks two things: when it was first discovered, and the earliest-discovered node reachable from its subtree. If a child can\'t reach anything discovered before its parent, the edge between them is a bridge: removing it would disconnect the graph.',
    whyElegant: 'A single DFS pass finds every critical connection in a network. The low-link value is a compact summary of "how far back can my descendants reach," computed entirely during the recursive unwinding.',
    keyInsight: 'An edge is a bridge when the subtree below it has no back edge reaching above it; the low-link value detects this in one pass.',
    analogy: 'A network of islands connected by bridges: if removing one bridge strands an island, it is a critical bridge. DFS finds all of them in one walk.',
    sourceNote: 'Robert Tarjan, "A Note on Finding the Bridges of a Graph," 1974.',
  },
  {
    id: 'centroid-decomposition',
    title: 'Recursive Centroid Decomposition',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['divide-and-conquer', 'tree', 'centroid'],
    code: `def centroid_decomposition(adj, n):
    size = [0] * n
    removed = [False] * n

    def get_size(v, parent):
        size[v] = 1
        for u in adj[v]:
            if u != parent and not removed[u]:
                get_size(u, v)
                size[v] += size[u]

    def get_centroid(v, parent, tree_size):
        for u in adj[v]:
            if u != parent and not removed[u] and size[u] > tree_size // 2:
                return get_centroid(u, v, tree_size)
        return v

    def build(v):
        get_size(v, -1)
        c = get_centroid(v, -1, size[v])
        removed[c] = True
        for u in adj[c]:
            if not removed[u]:
                build(u)
        return c

    return build(0)

adj = {0:[1,2], 1:[0,3,4], 2:[0], 3:[1], 4:[1]}
print(centroid_decomposition(adj, 5))  # 1 (centroid)`,
    explanation: 'Find the center node of a tree (the centroid, whose removal splits the tree into roughly equal halves). Remove it, then recursively decompose each remaining subtree. This divide-and-conquer approach creates a new tree of centroids with logarithmic depth.',
    whyElegant: 'Each split is as balanced as possible, guaranteeing logarithmic depth. Path queries that would take linear time on the original tree become logarithmic on the centroid tree.',
    keyInsight: 'Repeatedly splitting a tree at its balance point produces a decomposition of logarithmic depth, enabling fast path queries.',
    analogy: 'Splitting a loaf of bread at the middle, then splitting each half at its middle, and so on, so no piece is ever much bigger than any other.',
    sourceNote: 'Used in competitive programming; related to balanced tree decompositions in Megiddo and Hakimi, 1981.',
  },
  {
    id: 'closest-pair-points',
    title: 'Divide-and-Conquer Closest Pair of Points',
    language: 'Python',
    category: 'Recursion & Self-Reference',
    conceptTags: ['divide-and-conquer', 'geometry', 'O(n log n)'],
    code: `import math

def closest_pair(points):
    def dist(p, q):
        return math.hypot(p[0]-q[0], p[1]-q[1])

    def rec(pts):
        if len(pts) <= 3:
            return min(dist(pts[i], pts[j])
                       for i in range(len(pts))
                       for j in range(i+1, len(pts)))
        mid = len(pts) // 2
        mx = pts[mid][0]
        d = min(rec(pts[:mid]), rec(pts[mid:]))
        strip = [p for p in pts if abs(p[0] - mx) < d]
        strip.sort(key=lambda p: p[1])
        for i in range(len(strip)):
            for j in range(i+1, min(i+8, len(strip))):
                d = min(d, dist(strip[i], strip[j]))
        return d

    return rec(sorted(points))

pts = [(2,3),(12,30),(40,50),(5,1),(12,10),(3,4)]
print(f"{closest_pair(pts):.4f}")  # 1.4142`,
    explanation: 'Sort points by x-coordinate and split them in half. Find the closest pair in each half recursively. Then check if there is an even closer pair straddling the dividing line, but only among points within a narrow strip. A geometric argument limits the strip check to at most 7 comparisons per point.',
    whyElegant: 'The strip check looks like it could ruin the divide-and-conquer speedup, but geometry guarantees it stays fast. The insight that at most 7 neighbors need checking turns a potential bottleneck into a constant.',
    keyInsight: 'Geometric structure limits the cross-boundary comparisons to O(n), preserving the O(n log n) runtime of the divide-and-conquer framework.',
    analogy: 'Finding the two closest houses in a city by splitting the map in half, solving each side, then only checking houses near the dividing line.',
    sourceNote: 'Shamos and Hoey, "Closest-Point Problems," 1975.',
  },
];
