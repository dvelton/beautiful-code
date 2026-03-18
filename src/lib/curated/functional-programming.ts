import type { CuratedExample } from '../../types';

export const functionalProgramming: CuratedExample[] = [
{
    id: "haskell-infinite-fibonacci",
    title: "Infinite Fibonacci with zipWith",
    language: "Haskell",
    category: "Functional Programming Gems",
    conceptTags: ["lazy-evaluation", "infinite-sequences", "recursion", "self-reference"],
    code: `fibs = 0 : 1 : zipWith (+) fibs (tail fibs)

-- Usage:
take 10 fibs  -- [0,1,1,2,3,5,8,13,21,34]`,
    explanation: "This creates an infinite sequence of Fibonacci numbers by defining the sequence in terms of itself. The sequence starts with 0 and 1, then each subsequent number is the sum of adding the current sequence to itself shifted by one position. Haskell's lazy evaluation means it only calculates values when needed.",
    whyElegant: "It captures the mathematical essence of Fibonacci in one line: each number is the sum of the two before it. The definition is circular but mathematically sound, letting the computer figure out the mechanics while you express the pure concept.",
    keyInsight: "Self-referential definitions can be both mathematically beautiful and computationally practical when laziness delays evaluation.",
    analogy: "Like defining a recipe that says 'to make today's soup, combine yesterday's soup with the day-before's soup' – it seems circular, but if you start with two base soups, the recipe generates an infinite variety.",
    sourceNote: "Classic Haskell idiom demonstrating lazy evaluation and infinite data structures"
  },
  {
    id: "haskell-foldr-map",
    title: "Implementing map with foldr",
    language: "Haskell",
    category: "Functional Programming Gems",
    conceptTags: ["higher-order-functions", "fold", "map", "reduction"],
    code: `map' :: (a -> b) -> [a] -> [b]
map' f = foldr (\\x acc -> f x : acc) []

-- Usage:
map' (*2) [1,2,3,4]  -- [2,4,6,8]`,
    explanation: "This shows how the fundamental 'map' operation (applying a function to every item in a list) can be built using 'foldr' (reduce from the right). It processes each element by applying the function and prepending the result to the accumulated list.",
    whyElegant: "It reveals that map is just a special case of the more general fold operation. Instead of needing separate concepts, you see how one fundamental pattern (folding) can express many different list transformations.",
    keyInsight: "Complex operations often decompose into simpler, more fundamental patterns – map is really just fold with a specific combining function.",
    analogy: "Like realizing that 'doubling every number in a list' is just a special case of 'combining every number with something' – where the combining rule is 'double it and add to results.'",
    sourceNote: "Demonstrates the universality of fold operations in functional programming"
  },
  {
    id: "haskell-point-free",
    title: "Point-free style composition",
    language: "Haskell",
    category: "Functional Programming Gems",
    conceptTags: ["composition", "point-free", "higher-order-functions", "tacit-programming"],
    code: `-- Traditional style:
sumSquares xs = sum (map (\\x -> x * x) xs)

-- Point-free style:
sumSquares = sum . map (^2)

-- Function composition:
process = reverse . sort . filter (> 0) . map (*2)`,
    explanation: "Point-free style writes functions without mentioning their arguments explicitly. Instead of saying 'take x and do this to x', you compose operations that will be applied. The dot operator (.) composes functions, creating pipelines where data flows from right to left.",
    whyElegant: "It focuses on the transformation pipeline rather than the data being transformed. You describe what happens (the operations) without getting bogged down in variable names and parameter passing.",
    keyInsight: "Sometimes the clearest way to express a computation is to describe the transformations, not the data being transformed.",
    analogy: "Like describing a factory assembly line by naming the stations (paint, assemble, test) rather than tracking each individual widget – you focus on the process, not the items flowing through it.",
    sourceNote: "Fundamental concept in functional programming for creating clean, composable code"
  },
  {
    id: "clojure-threading-macro",
    title: "Threading macro pipeline",
    language: "Clojure",
    category: "Functional Programming Gems",
    conceptTags: ["macros", "pipelines", "data-transformation", "readability"],
    code: `(-> data
    (filter pos?)
    (map #(* % %))
    (reduce +)
    Math/sqrt)

;; Equivalent to:
;; (Math/sqrt (reduce + (map #(* % %) (filter pos? data))))`,
    explanation: "The threading macro (->) takes a value and passes it as the first argument to each successive function. It transforms deeply nested function calls into a readable top-to-bottom pipeline, making data transformations read like a recipe.",
    whyElegant: "It eliminates the 'inside-out' reading problem of nested function calls. Instead of parsing from the deepest level outward, you read naturally from top to bottom, following the data's journey through transformations.",
    keyInsight: "Syntax can dramatically improve readability by matching the natural flow of thought – data flowing through a series of transformations.",
    analogy: "Like following a river downstream through different processing stations (filter plant, treatment facility, storage tank) rather than trying to trace backwards from the final destination.",
    sourceNote: "Clojure's threading macros are widely copied in other languages for their readability benefits"
  },
  {
    id: "clojure-reduce-map-building",
    title: "Building maps with reduce",
    language: "Clojure",
    category: "Functional Programming Gems",
    conceptTags: ["reduce", "map-construction", "key-value", "aggregation"],
    code: `(defn word-frequencies [words]
  (reduce (fn [freqs word]
            (assoc freqs word (inc (get freqs word 0))))
          {}
          words))

;; Usage:
(word-frequencies ["cat" "dog" "cat" "bird" "dog" "cat"])
;; => {"cat" 3, "dog" 2, "bird" 1}`,
    explanation: "This builds a map (dictionary) by starting with an empty map and using reduce to process each item. For each word, it looks up the current count (defaulting to 0), increments it, and stores it back. Reduce accumulates the growing map through each step.",
    whyElegant: "It shows how complex data structures can be built incrementally using simple, composable operations. The pattern of 'start with empty, add one piece at a time' handles arbitrarily complex aggregations.",
    keyInsight: "Reduce is not just for computing single values – it's perfect for building any data structure incrementally.",
    analogy: "Like counting votes by starting with an empty tally sheet and processing each ballot one at a time, updating the count for each candidate as you go.",
    sourceNote: "Common pattern in Clojure for aggregating data into maps and other collections"
  },
  {
    id: "elm-update-pattern",
    title: "Elm's Model-Msg-Update architecture",
    language: "Elm",
    category: "Functional Programming Gems",
    conceptTags: ["architecture", "state-management", "pattern-matching", "immutability"],
    code: `type Msg = Increment | Decrement | Reset

type alias Model = Int

update : Msg -> Model -> Model
update msg model =
    case msg of
        Increment -> model + 1
        Decrement -> model - 1
        Reset -> 0

-- Usage in larger app:
-- newModel = update Increment currentModel`,
    explanation: "Elm's architecture manages application state through pure functions. Messages describe what happened, the model represents current state, and update is a pure function that takes a message and current model to produce a new model. All changes flow through this single pipeline.",
    whyElegant: "It makes state changes completely predictable and debuggable. Every possible change is explicitly defined, there's no hidden mutation, and you can trace any state by replaying the sequence of messages that created it.",
    keyInsight: "Constraining how state can change (through explicit messages and pure functions) actually makes applications more powerful and reliable.",
    analogy: "Like a bank ledger where every transaction is recorded with a specific type (deposit, withdrawal, transfer) and the balance is recalculated from these entries – you always know how you got to any state.",
    sourceNote: "Elm's architecture pattern has influenced React Redux and many other state management systems"
  },
  {
    id: "fsharp-railway-programming",
    title: "Railway-oriented programming with Result",
    language: "F#",
    category: "Functional Programming Gems",
    conceptTags: ["error-handling", "monads", "result-type", "composition"],
    code: `type Result<'T,'E> = Success of 'T | Failure of 'E

let bind f result =
    match result with
    | Success x -> f x
    | Failure e -> Failure e

let (>>=) = bind

// Chain operations:
validateInput data
>>= parseData
>>= processData  
>>= saveToDatabase`,
    explanation: "This pattern treats computations that might fail as traveling on railway tracks. Successful results stay on the 'success track' and continue to the next operation. Failures switch to the 'failure track' and skip all subsequent operations, carrying the error to the end.",
    whyElegant: "It eliminates the need for nested if-else error checking. You write the happy path naturally, and errors are automatically propagated without cluttering the main logic. Each step either continues the success or passes along the failure.",
    keyInsight: "Error handling becomes composable when you treat success and failure as two parallel tracks that operations can switch between.",
    analogy: "Like a subway system where trains either stay on the express track (success) or get automatically switched to the local track (failure) – once on the local track, they bypass all express stops but still reach the destination.",
    sourceNote: "Scott Wlaschin's railway-oriented programming pattern for elegant error handling in functional languages"
  },
  {
    id: "scala-for-comprehension",
    title: "For-comprehension desugaring",
    language: "Scala",
    category: "Functional Programming Gems",
    conceptTags: ["for-comprehension", "monads", "syntactic-sugar", "flatMap"],
    code: `// For-comprehension syntax:
val result = for {
  x <- List(1, 2, 3)
  y <- List(10, 20)
  if x > 1
} yield x * y

// Desugars to:
val result = List(1, 2, 3)
  .flatMap(x => List(10, 20)
  .filter(_ => x > 1)
  .map(y => x * y))

// Result: List(20, 40, 30, 60)`,
    explanation: "Scala's for-comprehension is syntactic sugar that makes working with nested computations look like imperative loops. Under the hood, it translates to chains of flatMap, map, and filter operations. This bridges the gap between readable syntax and powerful functional abstractions.",
    whyElegant: "It gives you the best of both worlds: the intuitive syntax of imperative loops with the composability and safety of functional operations. Complex nested computations become as readable as simple loops.",
    keyInsight: "Good syntax can make powerful abstractions accessible by hiding complexity while preserving all the underlying benefits.",
    analogy: "Like having a universal remote that looks simple with just a few buttons, but each button actually orchestrates a complex sequence of device operations – you get simplicity without losing power.",
    sourceNote: "Scala's for-comprehensions demonstrate how syntax can make monadic programming accessible"
  },
  {
    id: "ocaml-pattern-matching",
    title: "Pattern matching on lists",
    language: "OCaml",
    category: "Functional Programming Gems",
    conceptTags: ["pattern-matching", "recursion", "list-processing", "structural-decomposition"],
    code: `let rec sum_list lst =
  match lst with
  | [] -> 0
  | head :: tail -> head + sum_list tail

let rec map_list f lst =
  match lst with
  | [] -> []
  | head :: tail -> f head :: map_list f tail

(* Usage: *)
sum_list [1; 2; 3; 4]  (* 10 *)
map_list (fun x -> x * 2) [1; 2; 3]  (* [2; 4; 6] *)`,
    explanation: "Pattern matching lets you break down data structures by their shape and handle each case explicitly. For lists, you match either an empty list or a head element followed by the remaining tail. This naturally leads to recursive solutions that process one element at a time.",
    whyElegant: "It mirrors how you naturally think about lists: 'either it's empty, or it has a first item and some remaining items.' The code structure directly reflects the data structure, making both the problem and solution crystal clear.",
    keyInsight: "When your code structure mirrors your data structure, complex operations become simple recursive patterns.",
    analogy: "Like opening a nesting doll: you either find it empty (base case) or find a doll with more dolls inside (recursive case) – the natural way to handle it matches exactly how it's constructed.",
    sourceNote: "Pattern matching is a fundamental technique in ML-family languages for elegant data processing"
  },
  {
    id: "sml-mutual-recursion",
    title: "Mutual recursion for even/odd",
    language: "SML",
    category: "Functional Programming Gems",
    conceptTags: ["mutual-recursion", "pattern-matching", "mathematical-definition", "complementary-functions"],
    code: `fun even 0 = true
  | even n = odd (n - 1)
and odd 0 = false  
  | odd n = even (n - 1)

(* Usage: *)
even 4   (* true *)
odd 4    (* false *)
even 7   (* false *)
odd 7    (* true *)`,
    explanation: "This defines even and odd numbers using mutual recursion – each function calls the other. An even number is either 0 (base case) or what you get when you subtract 1 from an odd number. An odd number is never 0, but it's what you get when you subtract 1 from an even number.",
    whyElegant: "It directly encodes the mathematical definition: even and odd are complementary concepts defined in terms of each other. The code reads exactly like the mathematical relationship, with no extra machinery or complex logic.",
    keyInsight: "Some concepts are most naturally defined in terms of their complement – mutual recursion captures these symmetric relationships perfectly.",
    analogy: "Like defining 'inside' and 'outside' for a building: you're inside if you're not outside, and you're outside if you're not inside – each concept makes sense only in relation to the other.",
    sourceNote: "Classic example of mutual recursion in Standard ML, demonstrating how complementary mathematical concepts can be encoded directly"
  },
{
    id: "erlang-list-comprehension",
    title: "Erlang List Comprehension",
    language: "Erlang",
    category: "Functional Programming Gems",
    conceptTags: ["list-comprehension", "filtering", "mapping", "declarative"],
    code: `% Transform and filter in one elegant expression
Numbers = [1, 2, 3, 4, 5],
Doubled = [X*2 || X <- Numbers, X > 2].
% Result: [6, 8, 10]`,
    explanation: "List comprehensions let you create new lists by describing what you want rather than how to get it. You specify a transformation (X*2), a source list (Numbers), and optional conditions (X > 2). Erlang processes each element, applies your transformation, but only keeps results that meet your criteria.",
    whyElegant: "Combines filtering and mapping into a single, readable expression that mirrors mathematical set notation. No explicit loops, no temporary variables, no multi-step process—just a declarative description of the desired result.",
    keyInsight: "List comprehensions turn imperative 'how to do it' code into declarative 'what I want' expressions.",
    analogy: "Like giving a shopping assistant instructions: 'Get me all the apples that are red, but make them into apple juice.' You describe the end result and conditions, not the step-by-step process of walking through the store.",
    sourceNote: "Classic Erlang syntax showcasing the language's declarative approach to list processing."
  },
  {
    id: "elixir-pipe-operator",
    title: "Elixir Pipe Operator Chain",
    language: "Elixir",
    category: "Functional Programming Gems",
    conceptTags: ["pipe-operator", "data-transformation", "composition", "readability"],
    code: `# Data flows left-to-right through transformations
"hello world"
|> String.upcase()
|> String.split()
|> Enum.map(&String.reverse/1)
|> Enum.join("-")
# Result: "OLLEH-DLROW"`,
    explanation: "The pipe operator (|>) feeds the result of one function as the first argument to the next function. Instead of nesting function calls inside each other, you create a clear pipeline where data flows from left to right through each transformation step. Each step receives the output of the previous step.",
    whyElegant: "Eliminates deeply nested function calls and intermediate variables, creating a clear visual flow that matches how we think about sequential transformations. The code reads like a recipe: take this, do that, then do this other thing.",
    keyInsight: "Pipes turn nested function composition into a readable left-to-right data transformation pipeline.",
    analogy: "Like an assembly line in a factory where raw materials enter on the left and move through each station (uppercase, split, reverse, join) until the finished product emerges on the right.",
    sourceNote: "Elixir's signature pipe operator, inspired by Unix shell pipes but applied to functional data transformation."
  },
  {
    id: "racket-define-syntax",
    title: "Racket Define-Syntax Macro",
    language: "Racket",
    category: "Functional Programming Gems",
    conceptTags: ["macros", "syntax-extension", "metaprogramming", "DSL"],
    code: `; Create custom syntax that transforms at compile time
(define-syntax when-not
  (syntax-rules ()
    [(when-not condition body ...)
     (if (not condition) (begin body ...) (void))]))

; Usage:
(when-not (< x 0)
  (display "x is non-negative")
  (newline))`,
    explanation: "Macros let you create your own syntax by defining transformation rules. When the compiler sees your custom syntax, it automatically replaces it with standard code before compilation. The syntax-rules pattern matches the structure you define and transforms it into the replacement code.",
    whyElegant: "Extends the language itself with domain-specific constructs that feel native. No runtime overhead since transformation happens at compile time. Creates more expressive, readable code by eliminating boilerplate patterns.",
    keyInsight: "Macros allow you to program the programming language itself, creating custom syntax that transforms into standard code.",
    analogy: "Like creating a new recipe shortcut: instead of writing 'preheat oven, grease pan, mix ingredients,' you create a macro called 'quick-bake' that automatically expands to all those steps when you use it.",
    sourceNote: "Racket's hygienic macro system demonstrating compile-time code transformation."
  },
  {
    id: "common-lisp-loop",
    title: "Common Lisp Loop Facility",
    language: "Common Lisp",
    category: "Functional Programming Gems",
    conceptTags: ["loop-macro", "iteration", "collection", "DSL"],
    code: `; Powerful loop macro with English-like syntax
(loop for x in '(1 2 3 4 5 6)
      when (evenp x)
      collect (* x x)
      into squares
      finally (return squares))
; Result: (4 16 36)`,
    explanation: "The loop macro provides a mini-language for iteration that reads almost like English. You can specify what to iterate over (for x in list), conditions (when evenp), actions (collect), and destinations (into squares). The macro compiles this into efficient imperative code while maintaining declarative readability.",
    whyElegant: "Combines the power of imperative loops with functional expressiveness. The English-like syntax makes complex iteration logic immediately understandable, while the macro generates optimized machine code.",
    keyInsight: "Domain-specific languages can make complex iteration patterns as readable as natural language while maintaining performance.",
    analogy: "Like having a super-intelligent assistant who understands instructions in plain English: 'Go through this list, when you find even numbers, square them and collect the results in a basket.'",
    sourceNote: "Common Lisp's sophisticated loop macro showcasing the power of domain-specific syntax within Lisp."
  },
  {
    id: "haskell-state-monad",
    title: "Haskell State Monad",
    language: "Haskell",
    category: "Functional Programming Gems",
    conceptTags: ["monads", "state-threading", "pure-functions", "composition"],
    code: `import Control.Monad.State

-- Thread a counter through computations
increment :: State Int Int
increment = do
  n <- get
  put (n + 1)
  return n

-- Chain stateful computations
example :: State Int [Int]
example = do
  a <- increment
  b <- increment  
  c <- increment
  return [a, b, c]

-- Run: runState example 0 => ([0,1,2], 3)`,
    explanation: "The State monad lets you write code that appears to use mutable state while remaining purely functional. It automatically threads state through a sequence of computations, updating and passing the state from one step to the next without explicit state management.",
    whyElegant: "Provides the convenience of mutable state with the safety of pure functions. The do-notation makes stateful computations look imperative while maintaining functional purity and composability.",
    keyInsight: "Monads can encapsulate complex patterns like state threading, making impure-looking code purely functional under the hood.",
    analogy: "Like a relay race where each runner (function) receives a baton (state), does their work, and passes an updated baton to the next runner—all coordinated automatically by the monad.",
    sourceNote: "Haskell's State monad demonstrating how monads encapsulate stateful computation patterns."
  },
  {
    id: "haskell-maybe-chaining",
    title: "Haskell Maybe Chaining",
    language: "Haskell",
    category: "Functional Programming Gems",
    conceptTags: ["maybe-monad", "null-safety", "chaining", "error-handling"],
    code: `-- Chain operations that might fail
safeDivide :: Float -> Float -> Maybe Float
safeDivide x 0 = Nothing
safeDivide x y = Just (x / y)

-- Chain computations, short-circuit on Nothing
calculation :: Maybe Float
calculation = 
  Just 20.0 >>= safeDivide 4.0 >>= safeDivide 2.0
-- Result: Just 2.5

-- If any step fails: Just 20.0 >>= safeDivide 0.0 >>= safeDivide 2.0
-- Result: Nothing`,
    explanation: "The Maybe type represents values that might not exist (Nothing) or do exist (Just value). The bind operator (>>=) chains these computations together, automatically handling the 'null check' logic. If any step in the chain returns Nothing, the entire chain short-circuits to Nothing.",
    whyElegant: "Eliminates explicit null checking and nested if-statements. The chain continues as long as values exist, but gracefully handles failure at any point without verbose error handling code.",
    keyInsight: "Maybe chaining turns explicit null-checking into implicit flow control, making error-prone operations safe and composable.",
    analogy: "Like an assembly line that automatically stops if any station can't do its job—you don't need workers constantly checking 'did the previous step work?' because the system handles it.",
    sourceNote: "Haskell's Maybe monad showcasing elegant null-safety through monadic chaining."
  },
  {
    id: "javascript-currying",
    title: "Currying in JavaScript",
    language: "JavaScript",
    category: "Functional Programming Gems",
    conceptTags: ["currying", "partial-application", "higher-order-functions", "closure"],
    code: `// Transform multi-argument function into chain of single-argument functions
const add = a => b => c => a + b + c;

// Create specialized versions
const add5 = add(5);
const add5and3 = add5(3);

// Usage
const result1 = add5and3(2); // 10
const result2 = add(1)(2)(3); // 6

// Practical example: customizable validation
const validate = rule => message => value => 
  rule(value) ? { valid: true } : { valid: false, error: message };

const validateLength = validate(s => s.length >= 3)("Too short");
const isValidName = validateLength("Alice"); // { valid: true }`,
    explanation: "Currying transforms a function that takes multiple arguments into a series of functions that each take a single argument. Each function returns another function that remembers the previous arguments through closures, until all arguments are provided and the final result is computed.",
    whyElegant: "Enables partial application and function specialization without complex machinery. Creates reusable, configurable functions by 'baking in' some arguments while leaving others to be provided later.",
    keyInsight: "Currying turns multi-argument functions into a pipeline of single-argument functions, enabling elegant partial application and specialization.",
    analogy: "Like a vending machine that requires multiple coins: instead of inserting all coins at once, you insert them one by one, and the machine remembers each coin until you've inserted enough to dispense the product.",
    sourceNote: "JavaScript arrow functions showcasing currying's power for creating specialized, reusable functions."
  },
  {
    id: "javascript-partial-application",
    title: "Partial Application with Bind",
    language: "JavaScript",
    category: "Functional Programming Gems",
    conceptTags: ["partial-application", "bind", "function-specialization", "reusability"],
    code: `// Original function
const multiply = (multiplier, value) => multiplier * value;

// Create specialized functions using bind
const double = multiply.bind(null, 2);
const triple = multiply.bind(null, 3);
const quadruple = multiply.bind(null, 4);

// Usage
console.log(double(5));     // 10
console.log(triple(4));     // 12
console.log(quadruple(3));  // 12

// Practical example: logging with context
const log = (level, message, data) => 
  console.log(\`[\${level.toUpperCase()}] \${message}\`, data);

const logError = log.bind(null, 'error');
const logInfo = log.bind(null, 'info');

logError('Database connection failed', { host: 'localhost' });`,
    explanation: "Partial application using bind creates a new function by 'pre-filling' some arguments of an existing function. The bind method creates a new function where the first parameter (null for 'this') is followed by the arguments you want to pre-fill. When called, this new function only needs the remaining arguments.",
    whyElegant: "Transforms general-purpose functions into specialized tools without rewriting code. Creates a family of related functions from a single implementation, reducing duplication and increasing reusability.",
    keyInsight: "Partial application turns generic functions into specialized tools by pre-filling arguments, creating reusable function variants.",
    analogy: "Like pre-setting a coffee machine: instead of selecting 'large', 'dark roast', 'extra shot' every time, you create preset buttons that remember these preferences and just need you to press 'start'.",
    sourceNote: "JavaScript's bind method demonstrating partial application for creating specialized function variants."
  },
  {
    id: "javascript-memoization",
    title: "Memoization Higher-Order Function",
    language: "JavaScript",
    category: "Functional Programming Gems",
    conceptTags: ["memoization", "caching", "higher-order-functions", "optimization"],
    code: `// Generic memoization wrapper
const memoize = (fn) => {
  const cache = new Map();
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache.has(key)) {
      return cache.get(key);
    }
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
};

// Expensive function example
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

// First call: computed and cached
console.log(fibonacci(40)); // ~1 second

// Second call: instant retrieval from cache
console.log(fibonacci(40)); // ~0 milliseconds`,
    explanation: "Memoization is a caching technique wrapped in a higher-order function that remembers the results of expensive function calls. When the memoized function is called with the same arguments again, it returns the cached result instead of recomputing it, dramatically improving performance for recursive or expensive operations.",
    whyElegant: "Transforms any function into a cached version without changing the original function's code. Provides automatic performance optimization while maintaining the function's interface and behavior—a transparent speed boost.",
    keyInsight: "Memoization wraps any function with automatic caching, trading memory for speed without changing the function's interface.",
    analogy: "Like a librarian who remembers every book request: the first time you ask for a specific book, they go find it; but if you ask for the same book again, they immediately hand you the copy they kept nearby.",
    sourceNote: "JavaScript higher-order function demonstrating memoization as a transparent performance optimization technique."
  },
  {
    id: "javascript-trampolining",
    title: "Trampolining for Stack Safety",
    language: "JavaScript",
    category: "Functional Programming Gems",
    conceptTags: ["trampolining", "tail-recursion", "stack-safety", "continuation"],
    code: `// Trampoline function that bounces between thunks
const trampoline = (fn) => {
  while (typeof fn === 'function') {
    fn = fn();
  }
  return fn;
};

// Convert recursive function to return thunks
const sum = (n, acc = 0) => {
  if (n === 0) return acc;
  return () => sum(n - 1, acc + n); // Return thunk instead of recursive call
};

const factorial = (n, acc = 1) => {
  if (n <= 1) return acc;
  return () => factorial(n - 1, n * acc);
};

// Safe execution of deep recursion
console.log(trampoline(sum(10000))); // 50005000 - no stack overflow
console.log(trampoline(factorial(1000))); // Huge number - no stack overflow`,
    explanation: "Trampolining converts recursive calls into a loop to avoid stack overflow. Instead of calling itself directly, a recursive function returns a 'thunk' (a function that will make the next call). The trampoline function repeatedly calls these thunks in a loop, keeping the call stack flat while maintaining recursive logic.",
    whyElegant: "Preserves the natural recursive structure of algorithms while eliminating stack overflow risk. The transformation is minimal—just wrap the recursive call in a function—yet provides unlimited recursion depth.",
    keyInsight: "Trampolining turns recursion into iteration by bouncing function calls through a loop, eliminating stack overflow while preserving recursive logic.",
    analogy: "Like a relay race where runners pass a baton but never run together: instead of all runners being on the track at once (stack buildup), only one runner runs at a time while the others wait their turn.",
    sourceNote: "JavaScript trampolining technique for converting recursive functions into stack-safe iterative execution."
  },
{
    id: "cps-factorial",
    title: "CPS transform of factorial",
    language: "JavaScript",
    category: "Functional Programming Gems",
    conceptTags: ["continuation-passing-style", "recursion", "control-flow"],
    code: `// Regular factorial
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

// Continuation-passing style factorial
function factorialCPS(n, cont) {
  if (n <= 1) {
    return cont(1);
  }
  return factorialCPS(n - 1, (result) => cont(n * result));
}

// Usage
factorialCPS(5, (result) => console.log(result)); // 120`,
    explanation: "Instead of returning values directly, continuation-passing style (CPS) passes the result to a continuation function. Each recursive call receives a function that represents 'what to do with the result.' The computation builds up a chain of nested functions that execute in reverse order when the base case is reached.",
    whyElegant: "CPS makes the flow of control explicit and gives you complete power over how results are handled. It transforms recursion from implicit stack operations into explicit function composition, revealing the true structure of the computation.",
    keyInsight: "CPS turns the call stack inside-out, making continuation chains visible and controllable.",
    analogy: "Like a relay race where each runner doesn't just pass the baton, but also whispers instructions about what the final runner should do with it when they reach the finish line.",
    sourceNote: "CPS is fundamental to compilers and interpreters, used in Scheme and other functional languages for tail-call optimization."
  },
  {
    id: "church-numerals",
    title: "Church numerals in lambda calculus",
    language: "JavaScript",
    category: "Functional Programming Gems",
    conceptTags: ["lambda-calculus", "encoding", "church-encoding"],
    code: `// Church numeral encoding: n = λf.λx.f^n(x)
const zero = f => x => x;
const one = f => x => f(x);
const two = f => x => f(f(x));
const three = f => x => f(f(f(x)));

// Generic church numeral generator
const toChurch = n => f => x => {
  let result = x;
  for (let i = 0; i < n; i++) {
    result = f(result);
  }
  return result;
};

// Church arithmetic
const succ = n => f => x => f(n(f)(x));
const add = m => n => f => x => m(f)(n(f)(x));
const mult = m => n => f => m(n(f));

// Convert back to JavaScript number
const toJS = n => n(x => x + 1)(0);

console.log(toJS(add(two)(three))); // 5`,
    explanation: "Church numerals represent numbers purely as functions. The number n is encoded as a function that applies another function f exactly n times to an input x. Zero applies f zero times (returns x unchanged), one applies f once, two applies f twice, and so on. All arithmetic can be expressed as function composition.",
    whyElegant: "This shows that numbers are not primitive - they emerge from pure function application. With just functions and function composition, you can build all of arithmetic without any built-in number system.",
    keyInsight: "Numbers are just patterns of repeated application encoded as higher-order functions.",
    analogy: "Like describing numbers by how many times you'd turn a crank: zero turns means 'don't turn it,' three turns means 'turn it, then turn it, then turn it again.'",
    sourceNote: "Invented by Alonzo Church in lambda calculus, demonstrating the expressive power of pure functional computation."
  },
  {
    id: "y-combinator-js",
    title: "Y combinator in JavaScript",
    language: "JavaScript",
    category: "Functional Programming Gems",
    conceptTags: ["y-combinator", "fixed-point", "anonymous-recursion"],
    code: `// The Y combinator enables recursion without self-reference
const Y = f => (x => f(x(x)))(x => f(x(x)));

// Anonymous factorial using Y combinator
const factorial = Y(f => n => n <= 1 ? 1 : n * f(n - 1));

// Anonymous fibonacci using Y combinator
const fibonacci = Y(f => n => n <= 1 ? n : f(n - 1) + f(n - 2));

// Step-by-step breakdown
const factorialGenerator = f => n => n <= 1 ? 1 : n * f(n - 1);
const selfApplying = x => factorialGenerator(x(x));
const anonymousFactorial = selfApplying(selfApplying);

console.log(factorial(5)); // 120
console.log(fibonacci(10)); // 55`,
    explanation: "The Y combinator creates recursive functions without explicit self-reference. It takes a function that expects another function as its first parameter, and returns a version that can call itself recursively. The magic happens through self-application: a function that passes itself to itself, creating an infinite loop of potential recursion that only actualizes when called.",
    whyElegant: "It achieves the impossible: anonymous recursion. You can create recursive behavior without naming functions or explicit self-reference, using only function application and higher-order functions.",
    keyInsight: "Self-application creates recursion: a function passing itself to itself enables infinite self-reference without explicit naming.",
    analogy: "Like a hall of mirrors where each mirror shows the reflection of looking into the next mirror, creating infinite depth from finite structure.",
    sourceNote: "Discovered by Haskell Curry, the Y combinator is a fixed-point combinator that demonstrates recursion is expressible in pure lambda calculus."
  },
  {
    id: "fixed-point-combinator",
    title: "Fixed-point combinator intuition",
    language: "Haskell",
    category: "Functional Programming Gems",
    conceptTags: ["fixed-point", "recursion", "laziness"],
    code: `-- The fixed-point combinator: fix f = f (fix f)
fix :: (a -> a) -> a
fix f = f (fix f)

-- Using fix for factorial
factorial :: Integer -> Integer
factorial = fix (\\f n -> if n <= 1 then 1 else n * f (n - 1))

-- Using fix for fibonacci
fibonacci :: Integer -> Integer
fibonacci = fix (\\f n -> if n <= 2 then 1 else f (n - 1) + f (n - 2))

-- The infinite list of factorials
factorials :: [Integer]
factorials = fix (\\fs -> 1 : zipWith (*) [2..] fs)

-- Demonstrating the fixed-point property
-- factorial = fix factorialF
-- factorial = factorialF (fix factorialF)
-- factorial = factorialF factorial`,
    explanation: "A fixed-point combinator finds a function that is unchanged when another function is applied to it. The equation 'fix f = f (fix f)' means that fix finds a value x such that f(x) = x. For recursive functions, this creates a self-referential loop where the function receives itself as an argument, enabling recursion without explicit naming.",
    whyElegant: "It reveals that recursion is fundamentally about finding fixed points. The recursive structure emerges naturally from the mathematical property that f(x) = x, making recursion a consequence of function application rather than a special language feature.",
    keyInsight: "Recursion is just finding a function that equals itself when passed through a transformation.",
    analogy: "Like a function that describes 'how to make a copy of yourself' - when you apply it to itself, you get another copy that can make more copies.",
    sourceNote: "Fixed-point combinators are fundamental in denotational semantics and demonstrate that recursion can be expressed in pure lambda calculus."
  },
  {
    id: "unfold-dual-fold",
    title: "unfold as the dual of fold",
    language: "Haskell",
    category: "Functional Programming Gems",
    conceptTags: ["unfold", "fold", "duality", "corecursion"],
    code: `-- fold consumes a list into a value
foldr :: (a -> b -> b) -> b -> [a] -> b
foldr f z []     = z
foldr f z (x:xs) = f x (foldr f z xs)

-- unfold generates a list from a seed value
unfoldr :: (b -> Maybe (a, b)) -> b -> [a]
unfoldr f seed = case f seed of
  Nothing      -> []
  Just (x, s') -> x : unfoldr f s'

-- Examples showing the duality
-- Generate countdown using unfold
countdown :: Int -> [Int]
countdown = unfoldr (\\n -> if n < 0 then Nothing else Just (n, n-1))

-- Generate fibonacci sequence using unfold
fibs :: [Int]
fibs = unfoldr (\\(a,b) -> Just (a, (b, a+b))) (0,1)

-- Fold and unfold are inverses for some operations
numbers = [1,2,3,4,5]
summed = foldr (+) 0 numbers          -- 15
reconstructed = unfoldr (\\n -> if n <= 0 then Nothing 
                                else Just (1, n-1)) summed  -- [1,1,1,1,1]`,
    explanation: "While fold tears down a data structure by consuming elements and accumulating a result, unfold builds up a data structure by repeatedly applying a function to a seed value. Unfold takes a generator function that either says 'stop' (Nothing) or produces the next element along with a new seed (Just). They represent opposite directions of computation: consumption versus generation.",
    whyElegant: "This duality reveals a fundamental symmetry in computation. Every way of tearing something apart (fold) has a corresponding way of building it up (unfold). They form a perfect pair of inverse operations that expose the recursive structure from both directions.",
    keyInsight: "Unfold generates infinite possibilities from finite rules, while fold collapses infinite possibilities into finite results.",
    analogy: "Fold is like eating an onion layer by layer until nothing remains; unfold is like growing an onion by adding layer after layer from a tiny seed.",
    sourceNote: "Unfold is the categorical dual of fold, representing corecursion and coinduction in functional programming and category theory."
  },
  {
    id: "writer-monad",
    title: "Haskell Writer monad for logging",
    language: "Haskell",
    category: "Functional Programming Gems",
    conceptTags: ["writer-monad", "logging", "monoids"],
    code: `import Control.Monad.Writer

-- Writer monad combines a value with a log (any Monoid)
type Logged = Writer String

-- Basic logging operations
loggedAdd :: Int -> Int -> Logged Int
loggedAdd x y = do
  tell ("Adding " ++ show x ++ " and " ++ show y)
  return (x + y)

loggedMultiply :: Int -> Int -> Logged Int
loggedMultiply x y = do
  tell ("Multiplying " ++ show x ++ " and " ++ show y)
  return (x * y)

-- Complex computation with accumulated logging
complexCalculation :: Int -> Logged Int
complexCalculation n = do
  tell "Starting complex calculation"
  doubled <- loggedMultiply n 2
  tell "Doubled the input"
  result <- loggedAdd doubled 10
  tell "Added 10 to result"
  tell "Calculation complete"
  return result

-- Run the computation
runCalculation :: (Int, String)
runCalculation = runWriter (complexCalculation 5)
-- Result: (20, "Starting complex calculationMultiplying 5 and 2Doubled the inputAdding 10 and 10Added 10 to resultCalculation complete")`,
    explanation: "The Writer monad automatically accumulates a 'log' alongside your computation. Every operation can write to this log using 'tell', and the monad ensures all log entries are collected and combined. The log can be any type that forms a Monoid (like strings that concatenate, or lists that append), making it flexible for different kinds of accumulation.",
    whyElegant: "It separates the concern of logging from the main computation logic. You write your code naturally, sprinkling in log statements, and the monad handles threading the accumulated log through every step without cluttering your main logic with manual log passing.",
    keyInsight: "Writer threads an invisible accumulator through computations, collecting side-channel information without disrupting the main flow.",
    analogy: "Like a scientist taking notes while performing an experiment - the notes accumulate automatically without interfering with the actual experimental steps.",
    sourceNote: "Writer monad is useful for debugging, audit trails, and any scenario where you need to accumulate information alongside the main computation."
  },
  {
    id: "reader-monad",
    title: "Haskell Reader monad for config",
    language: "Haskell",
    category: "Functional Programming Gems",
    conceptTags: ["reader-monad", "dependency-injection", "environment"],
    code: `import Control.Monad.Reader

-- Configuration environment
data Config = Config 
  { dbUrl :: String
  , apiKey :: String
  , debugMode :: Bool
  } deriving (Show)

type App = Reader Config

-- Functions that need configuration
connectToDatabase :: App String
connectToDatabase = do
  url <- asks dbUrl
  debug <- asks debugMode
  if debug
    then return ("DEBUG: Connecting to " ++ url)
    else return ("Connected to database")

makeApiCall :: String -> App String
makeApiCall endpoint = do
  key <- asks apiKey
  url <- asks dbUrl
  return ("Calling " ++ url ++ "/" ++ endpoint ++ " with key " ++ key)

-- Composing operations that all need config
appLogic :: App String
appLogic = do
  dbResult <- connectToDatabase
  apiResult <- makeApiCall "users"
  return (dbResult ++ "\\n" ++ apiResult)

-- Running with configuration
main :: IO ()
main = do
  let config = Config "postgres://localhost" "secret123" True
  let result = runReader appLogic config
  putStrLn result`,
    explanation: "The Reader monad threads a read-only environment (like configuration) through a computation without having to pass it explicitly to every function. Functions can 'ask' for the environment or parts of it using 'asks', and the monad automatically provides the same environment to all nested computations.",
    whyElegant: "It eliminates configuration parameter passing throughout your entire application. Instead of threading config through dozens of function parameters, you write functions that implicitly have access to the environment, making code cleaner and more modular.",
    keyInsight: "Reader provides implicit access to shared context, eliminating the tedium of explicit parameter threading.",
    analogy: "Like ambient air that's available everywhere you go - you don't need to carry it with you or pass it around, but any function can 'breathe it in' when needed.",
    sourceNote: "Reader monad is excellent for dependency injection, configuration management, and any scenario with shared context."
  },
  {
    id: "core-async-channels",
    title: "Clojure core.async channel",
    language: "Clojure",
    category: "Functional Programming Gems",
    conceptTags: ["csp", "channels", "go-blocks", "concurrency"],
    code: `(require '[clojure.core.async :refer [go chan >! <! >!! <!! close!]])

; Create a channel
(def my-channel (chan))

; Producer go block - puts values onto channel
(go
  (>! my-channel "Hello")
  (>! my-channel "World")
  (>! my-channel "from")
  (>! my-channel "core.async")
  (close! my-channel))

; Consumer go block - takes values from channel
(go
  (loop []
    (when-let [value (<! my-channel)]
      (println "Received:" value)
      (recur))))

; Pipeline example - transforming data through channels
(def input-chan (chan))
(def output-chan (chan))

; Transform numbers through pipeline
(go (>! input-chan 1)
    (>! input-chan 2)
    (>! input-chan 3)
    (close! input-chan))

(go (loop []
      (when-let [n (<! input-chan)]
        (>! output-chan (* n n))  ; square the number
        (recur)))
    (close! output-chan))

(go (loop []
      (when-let [result (<! output-chan)]
        (println "Squared:" result)
        (recur))))`,
    explanation: "Core.async implements Communicating Sequential Processes (CSP) where independent go blocks communicate through channels. Channels are like pipes that can carry values between concurrent processes. Go blocks are lightweight threads that can put values onto channels (>!) or take values from channels (<!), blocking until the operation completes.",
    whyElegant: "It transforms concurrent programming from shared state and locks into message passing between isolated processes. Complex coordination becomes simple channel operations, and backpressure and synchronization happen naturally through the channel semantics.",
    keyInsight: "Channels turn concurrent coordination into simple data flow, replacing locks and shared state with message passing.",
    analogy: "Like a pneumatic tube system in a bank - different departments (go blocks) can send messages (values) to each other through tubes (channels) without directly interacting.",
    sourceNote: "Inspired by Go's channels and Tony Hoare's CSP, core.async brings structured concurrency to Clojure without OS threads."
  },
  {
    id: "dependent-types-idris",
    title: "Idris dependent type hello world",
    language: "Idris",
    category: "Functional Programming Gems",
    conceptTags: ["dependent-types", "types-as-values", "proofs"],
    code: `-- Vector with length encoded in the type
data Vect : Nat -> Type -> Type where
  Nil  : Vect Z a
  (::) : a -> Vect k a -> Vect (S k) a

-- Safe head function - only works on non-empty vectors
safeHead : Vect (S n) a -> a
safeHead (x :: xs) = x

-- Append preserves length at the type level
append : Vect n a -> Vect m a -> Vect (n + m) a
append Nil       ys = ys
append (x :: xs) ys = x :: append xs ys

-- Type-safe indexing - index must be less than length
index : (i : Fin n) -> Vect n a -> a
index FZ     (x :: xs) = x
index (FS k) (x :: xs) = index k xs

-- Example usage
myVector : Vect 3 String
myVector = ["hello", "dependent", "types"]

-- This compiles - we know the vector has length 3
firstElement : String
firstElement = safeHead myVector

-- This would cause a compile error:
-- emptyHead = safeHead Nil  -- Type error: expected Vect (S n) a, got Vect Z a`,
    explanation: "Dependent types allow types to depend on values. Here, vectors carry their length as part of their type (Vect n a means 'vector of length n containing elements of type a'). This enables the type system to statically verify properties like 'this vector is non-empty' or 'this index is within bounds', preventing runtime errors at compile time.",
    whyElegant: "It moves runtime checks into the type system, making certain classes of bugs impossible. The compiler can prove mathematical properties about your data structures, and functions can have preconditions encoded directly in their types.",
    keyInsight: "When types can depend on values, the type system becomes powerful enough to express and verify program properties.",
    analogy: "Like a box that changes its label based on what's inside - if you put 3 items in, it automatically becomes a 'Box of 3 things' and the type system remembers that forever.",
    sourceNote: "Dependent types are featured in languages like Idris, Agda, and Coq, enabling theorem proving and extremely safe programming."
  },
  {
    id: "agda-proof-program",
    title: "Agda proof as program",
    language: "Agda",
    category: "Functional Programming Gems",
    conceptTags: ["curry-howard", "proofs-as-programs", "type-theory"],
    code: `-- Proving that addition is commutative: m + n ≡ n + m
module CommutativeAddition where

data ℕ : Set where
  zero : ℕ
  suc  : ℕ → ℕ

_+_ : ℕ → ℕ → ℕ
zero  + n = n
suc m + n = suc (m + n)

data _≡_ {A : Set} (x : A) : A → Set where
  refl : x ≡ x

-- Right identity: n + 0 ≡ n
right-identity : (n : ℕ) → n + zero ≡ n
right-identity zero = refl
right-identity (suc n) rewrite right-identity n = refl

-- Right successor: n + suc m ≡ suc (n + m)
right-suc : (n m : ℕ) → n + suc m ≡ suc (n + m)
right-suc zero m = refl
right-suc (suc n) m rewrite right-suc n m = refl

-- The main theorem: addition is commutative
+-comm : (m n : ℕ) → m + n ≡ n + m
+-comm zero n = right-identity n
+-comm (suc m) n rewrite +-comm m n | right-suc n m = refl

-- Usage: the proof is a program
example : 2 + 3 ≡ 3 + 2
example = +-comm 2 3`,
    explanation: "In Agda, proofs are programs and propositions are types. The theorem 'addition is commutative' becomes a function type, and proving it means writing a function that constructs a value of that type. The proof works by induction: for zero, we use right-identity; for successor, we use the induction hypothesis and right-successor property.",
    whyElegant: "It unifies mathematics and programming through the Curry-Howard correspondence. Logical proofs become functional programs, and running a program is the same as verifying a mathematical proof. Type-checking ensures the proof is correct.",
    keyInsight: "Proofs and programs are the same thing - mathematical theorems correspond exactly to program types.",
    analogy: "Like solving a jigsaw puzzle where the pieces are logical steps, and when all pieces fit together perfectly, you've both completed the picture (proof) and built a machine (program).",
    sourceNote: "Agda is a dependently-typed functional programming language and proof assistant, embodying the Curry-Howard correspondence."
  },
{
    id: "purescript-aff-monad",
    title: "PureScript Aff monad",
    language: "PureScript",
    category: "Functional Programming Gems",
    conceptTags: ["async", "effects", "monads", "purity"],
    code: `import Effect.Aff (Aff, launchAff_)
import Effect.Console (log)
import Effect.Class (liftEffect)
import Data.HTTP.Method (Method(..))
import Affjax as AX
import Affjax.ResponseFormat as ResponseFormat

fetchUserData :: String -> Aff String
fetchUserData userId = do
  response <- AX.request AX.defaultRequest
    { url = "https://api.example.com/users/" <> userId
    , method = Left GET
    , responseFormat = ResponseFormat.string
    }
  case response of
    Left err -> pure "Error fetching user"
    Right res -> pure res.body

main :: Effect Unit
main = launchAff_ do
  userData <- fetchUserData "123"
  liftEffect \\$ log userData`,
    explanation: "The Aff monad in PureScript handles asynchronous operations while maintaining functional purity. Unlike JavaScript promises that can have side effects anywhere, Aff clearly separates pure computations from async effects. You write async code that looks synchronous using do-notation, and the type system guarantees that effects are properly managed.",
    whyElegant: "Combines the familiar async/await pattern with mathematical guarantees about side effects, making async code both readable and reliable.",
    keyInsight: "Async effects become predictable and composable when wrapped in a monad that preserves functional purity.",
    analogy: "Like having a special envelope system for mailing letters - you can write the letter content (pure logic) separately from handling the postal delivery (async effects), but the envelope (Aff monad) ensures everything gets delivered correctly.",
    sourceNote: "PureScript's approach to controlled effects through the Aff monad"
  },
  {
    id: "elm-task-chaining",
    title: "Elm Task chaining",
    language: "Elm",
    category: "Functional Programming Gems",
    conceptTags: ["async", "chaining", "error-handling", "tasks"],
    code: `import Http
import Task exposing (Task, andThen)

type alias User = { id : Int, name : String, email : String }
type alias Profile = { bio : String, avatar : String }

fetchUser : Int -> Task Http.Error User
fetchUser userId =
    Http.task
        { method = "GET"
        , headers = []
        , url = "https://api.example.com/users/" ++ String.fromInt userId
        , body = Http.emptyBody
        , resolver = Http.stringResolver handleResponse
        , timeout = Nothing
        }

fetchProfile : User -> Task Http.Error Profile  
fetchProfile user =
    Http.task
        { method = "GET"
        , url = "https://api.example.com/profiles/" ++ String.fromInt user.id
        , -- ... other options
        }

fetchUserWithProfile : Int -> Task Http.Error (User, Profile)
fetchUserWithProfile userId =
    fetchUser userId
        |> andThen (\\user ->
            fetchProfile user
                |> andThen (\\profile ->
                    Task.succeed (user, profile)
                )
        )`,
    explanation: "Elm's Task system lets you chain asynchronous operations together in a clean, predictable way. Each task can either succeed with a value or fail with an error, and you chain them using 'andThen'. If any task in the chain fails, the whole chain stops and returns that error. This prevents the callback hell common in JavaScript.",
    whyElegant: "Tasks make async operation sequences read like a recipe - each step depends on the previous one succeeding, with automatic error propagation.",
    keyInsight: "Chaining tasks with andThen creates a railway where success continues forward but any failure immediately jumps to error handling.",
    analogy: "Like an assembly line where each worker only starts their task if the previous worker successfully completed theirs - if anyone fails, the whole line stops and reports the problem.",
    sourceNote: "Elm's Task-based approach to managing async operations with built-in error handling"
  },
  {
    id: "reasonml-variant-pattern-match",
    title: "ReasonML variant pattern match",
    language: "ReasonML",
    category: "Functional Programming Gems",
    conceptTags: ["pattern-matching", "variants", "algebraic-types", "exhaustiveness"],
    code: `type paymentMethod =
  | CreditCard(string, int) /* card number, expiry */
  | PayPal(string) /* email */
  | BankTransfer(string, string) /* account, routing */
  | Cash;

type paymentResult =
  | Success(string) /* transaction ID */
  | Failed(string) /* error message */
  | Pending;

let processPayment = (method: paymentMethod, amount: float): paymentResult =>
  switch (method) {
  | CreditCard(cardNum, expiry) when expiry > 2024 =>
      Success("cc-" ++ string_of_int(Random.int(10000)))
  | CreditCard(_, expiry) =>
      Failed("Card expired: " ++ string_of_int(expiry))
  | PayPal(email) when String.contains(email, '@') =>
      Success("pp-" ++ string_of_int(Random.int(10000)))
  | PayPal(_) =>
      Failed("Invalid email format")
  | BankTransfer(account, routing) =>
      Pending
  | Cash when amount <= 100.0 =>
      Success("cash-transaction")
  | Cash =>
      Failed("Cash limit exceeded")
  };

let result = processPayment(CreditCard("1234", 2025), 50.0);`,
    explanation: "ReasonML's variant types and pattern matching let you define data that can be one of several different shapes, then handle each shape explicitly. The compiler ensures you handle every possible case - if you add a new payment method but forget to handle it in your switch, the code won't compile. Guards (when clauses) add extra conditions to make matching more precise.",
    whyElegant: "The compiler acts as your safety net, preventing the runtime errors that plague dynamic languages when you forget to handle a case.",
    keyInsight: "Exhaustive pattern matching turns potential runtime bugs into compile-time guarantees.",
    analogy: "Like a mail sorting office where every letter must go into exactly one bin - if you add a new type of mail but forget to create a bin for it, the sorting machine won't start until you fix it.",
    sourceNote: "ReasonML's variant types with exhaustive pattern matching for robust data handling"
  },
  {
    id: "scala-option-flatmap-chain",
    title: "Scala Option flatMap chain",
    language: "Scala",
    category: "Functional Programming Gems",
    conceptTags: ["option", "flatmap", "chaining", "null-safety"],
    code: `case class User(id: Int, name: String, email: Option[String])
case class Profile(userId: Int, bio: String)
case class Notification(email: String, message: String)

def findUser(id: Int): Option[User] = 
  if (id > 0) Some(User(id, "Alice", Some("alice@example.com"))) 
  else None

def findProfile(userId: Int): Option[Profile] = 
  Some(Profile(userId, "Scala enthusiast"))

def sendEmail(email: String, message: String): Option[Notification] = 
  Some(Notification(email, message))

// Traditional nested approach (pyramid of doom)
def sendWelcomeMessageOld(userId: Int): Option[Notification] = {
  findUser(userId) match {
    case Some(user) => 
      user.email match {
        case Some(email) =>
          findProfile(userId) match {
            case Some(profile) => sendEmail(email, s"Welcome \\\${user.name}!")
            case None => None
          }
        case None => None
      }
    case None => None
  }
}

// Elegant flatMap chain
def sendWelcomeMessage(userId: Int): Option[Notification] = {
  findUser(userId)
    .flatMap(user => 
      user.email.flatMap(email =>
        findProfile(userId).flatMap(_ =>
          sendEmail(email, s"Welcome \\\${user.name}!")
        )
      )
    )
}

// Even cleaner with for-comprehension
def sendWelcomeMessageFor(userId: Int): Option[Notification] = {
  for {
    user <- findUser(userId)
    email <- user.email  
    profile <- findProfile(userId)
    notification <- sendEmail(email, s"Welcome \\\${user.name}!")
  } yield notification
}`,
    explanation: "Scala's Option type represents values that might not exist, similar to nullable types but safer. The flatMap method lets you chain operations that might fail without writing nested if-checks. Each operation in the chain only runs if the previous one succeeded (returned Some). If any step returns None, the whole chain short-circuits to None.",
    whyElegant: "Turns a pyramid of nested null checks into a flat, readable pipeline where failure automatically propagates.",
    keyInsight: "flatMap transforms nested conditionals into linear chains by automatically handling the 'what if this is null' at each step.",
    analogy: "Like following a treasure map where each clue leads to the next - if any clue is missing or illegible, you stop the hunt immediately rather than wandering around confused.",
    sourceNote: "Scala's Option flatMap for safe chaining of potentially absent values"
  },
  {
    id: "kotlin-scope-functions",
    title: "Kotlin let/run/apply/also/with",
    language: "Kotlin",
    category: "Functional Programming Gems",
    conceptTags: ["scope-functions", "builders", "fluent-api", "context"],
    code: `data class Person(var name: String, var age: Int, var email: String? = null)

fun demonstrateScopeFunctions() {
    val person = Person("Alice", 30)
    
    // let: transform object, returns lambda result, uses 'it'
    val greeting = person.let { p ->
        "Hello, \\\${p.name} (\\\${p.age} years old)"
    }
    
    // run: transform object, returns lambda result, uses 'this'  
    val isAdult = person.run {
        age >= 18 // implicit 'this.age'
    }
    
    // apply: configure object, returns the object itself, uses 'this'
    val configuredPerson = person.apply {
        email = "alice@example.com" // implicit 'this.email'
        age += 1
    }
    
    // also: perform side effect, returns the object itself, uses 'it'
    val personWithLogging = person.also { p ->
        println("Person created: \\\${p.name}")
    }
    
    // with: operate on object, returns lambda result, uses 'this'
    val summary = with(person) {
        "\\$name is \\$age years old" // implicit 'this'
    }
    
    // Real-world example: null-safe chains
    val result = getPersonFromApi()
        ?.let { person -> person.email }
        ?.takeIf { email -> email.isNotBlank() }  
        ?.let { email -> sendEmail(email) }
        ?: "No email sent"
}

fun getPersonFromApi(): Person? = Person("Bob", 25, "bob@example.com")
fun sendEmail(email: String): String = "Email sent to \\$email"`,
    explanation: "Kotlin's scope functions (let, run, apply, also, with) provide different ways to work with objects in a temporary scope. They differ in what they return (the object or lambda result) and how they reference the object ('this' or 'it'). These functions make code more expressive by clearly showing intent: 'let' transforms, 'apply' configures, 'also' performs side effects, and so on.",
    whyElegant: "Each scope function has a clear semantic purpose, making code self-documenting about whether you're transforming, configuring, or side-effecting.",
    keyInsight: "Five simple functions that encode common programming patterns, making intent explicit and reducing boilerplate.",
    analogy: "Like having different types of workbenches in a workshop - one for measuring (let), one for assembly (apply), one for finishing touches (also) - each optimized for its specific task.",
    sourceNote: "Kotlin's scope functions for expressive object manipulation"
  },
  {
    id: "swift-result-chaining",
    title: "Swift Result chaining",
    language: "Swift",
    category: "Functional Programming Gems",
    conceptTags: ["result", "error-handling", "chaining", "flatmap"],
    code: `import Foundation

enum NetworkError: Error {
    case invalidURL
    case noData
    case parseError
}

struct User {
    let id: Int
    let name: String
    let email: String
}

struct Profile {
    let bio: String
    let avatarURL: String
}

func fetchUser(id: Int) -> Result<User, NetworkError> {
    if id > 0 {
        return .success(User(id: id, name: "Alice", email: "alice@example.com"))
    } else {
        return .failure(.invalidURL)
    }
}

func fetchProfile(user: User) -> Result<Profile, NetworkError> {
    return .success(Profile(bio: "iOS developer", avatarURL: "avatar.jpg"))
}

func validateUser(_ user: User) -> Result<User, NetworkError> {
    if user.email.contains("@") {
        return .success(user)
    } else {
        return .failure(.parseError)
    }
}

// Traditional nested approach
func getUserProfileOld(id: Int) -> Result<(User, Profile), NetworkError> {
    switch fetchUser(id: id) {
    case .success(let user):
        switch validateUser(user) {
        case .success(let validUser):
            switch fetchProfile(user: validUser) {
            case .success(let profile):
                return .success((validUser, profile))
            case .failure(let error):
                return .failure(error)
            }
        case .failure(let error):
            return .failure(error)
        }
    case .failure(let error):
        return .failure(error)
    }
}

// Elegant Result chaining with flatMap
func getUserProfile(id: Int) -> Result<(User, Profile), NetworkError> {
    return fetchUser(id: id)
        .flatMap { user in
            validateUser(user)
                .flatMap { validUser in
                    fetchProfile(user: validUser)
                        .map { profile in
                            (validUser, profile)
                        }
                }
        }
}

// Usage
let result = getUserProfile(id: 42)
switch result {
case .success(let (user, profile)):
    print("User: \\(user.name), Bio: \\(profile.bio)")
case .failure(let error):
    print("Error: \\(error)")
}`,
    explanation: "Swift's Result type represents operations that can either succeed with a value or fail with an error. The flatMap method lets you chain operations that return Results without writing nested switch statements. If any operation in the chain fails, the error automatically propagates to the end. The map method transforms success values while preserving errors.",
    whyElegant: "Transforms deeply nested error handling into a linear chain that reads like the happy path while automatically managing all error cases.",
    keyInsight: "Result chaining lets you write error-prone operations as if they always succeed, while the type system ensures all failures are handled.",
    analogy: "Like a relay race where each runner only starts if they receive the baton successfully - if any runner drops it, the race ends immediately with that failure.",
    sourceNote: "Swift Result type with flatMap for composable error handling"
  },
  {
    id: "rust-iterator-chain",
    title: "Rust Iterator::map().filter().collect()",
    language: "Rust",
    category: "Functional Programming Gems",
    conceptTags: ["iterators", "lazy-evaluation", "chaining", "zero-cost"],
    code: `let numbers = vec![1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// Iterator chain: filter, transform, collect
let result: Vec<i32> = numbers
    .iter()
    .filter(|&&x| x % 2 == 0)   // keep evens
    .map(|&x| x * x)            // square them
    .filter(|&x| x > 10)        // keep only large
    .collect();                  // execute and gather
// result: [16, 36, 64, 100]

// Nothing runs until collect() is called.
// The compiler fuses the whole chain into one loop.`,
    explanation: "Rust's iterator chains let you process collections by connecting simple operations like map (transform each item) and filter (keep items that match). The magic is lazy evaluation - nothing actually happens until you call collect(). This means the compiler can optimize the entire chain into a single loop, often faster than hand-written code. Each step describes what you want, not how to do it.",
    whyElegant: "Lazy evaluation means you can write complex data processing as readable steps while the compiler generates optimal machine code equivalent to hand-tuned loops.",
    keyInsight: "Iterator chains are both more readable than loops and potentially faster due to compiler optimizations enabled by lazy evaluation.",
    analogy: "Like planning a factory assembly line on paper - you can design the whole process step by step, but no actual work happens until you flip the switch (call collect()).",
    sourceNote: "Rust's zero-cost iterator abstractions with lazy evaluation"
  },
  {
    id: "haskell-fromlistwith",
    title: "Haskell Data.Map.fromListWith",
    language: "Haskell",
    category: "Functional Programming Gems",
    conceptTags: ["maps", "collision-handling", "aggregation", "functional-data"],
    code: `import qualified Data.Map as Map
import Data.Map (Map)
import Data.List (words)

-- Basic example: counting word frequencies
countWords :: String -> Map String Int
countWords text = Map.fromListWith (+) [(word, 1) | word <- words text]

-- Grouping items by category with lists
data Sale = Sale { item :: String, category :: String, amount :: Double }
  deriving (Show)

sales :: [Sale]
sales = [ Sale "Laptop" "Electronics" 999.99
        , Sale "Book" "Education" 29.99  
        , Sale "Phone" "Electronics" 699.99
        , Sale "Notebook" "Education" 5.99
        , Sale "Tablet" "Electronics" 399.99
        ]

-- Group sales by category, collecting all items
salesByCategory :: Map String [Sale]
salesByCategory = Map.fromListWith (++) 
    [(category sale, [sale]) | sale <- sales]

-- Sum amounts by category
totalByCategory :: Map String Double  
totalByCategory = Map.fromListWith (+)
    [(category sale, amount sale) | sale <- sales]

-- More complex: building a histogram with custom merge
data Stats = Stats { count :: Int, total :: Double, items :: [String] }
  deriving (Show)

combineStats :: Stats -> Stats -> Stats
combineStats (Stats c1 t1 i1) (Stats c2 t2 i2) = 
    Stats (c1 + c2) (t1 + t2) (i1 ++ i2)

categoryStats :: Map String Stats
categoryStats = Map.fromListWith combineStats
    [ (category sale, Stats 1 (amount sale) [item sale]) 
    | sale <- sales 
    ]

-- Real-world example: processing log entries
data LogEntry = LogEntry { timestamp :: String, level :: String, message :: String }
  deriving (Show)

logEntries :: [LogEntry]
logEntries = [ LogEntry "10:00" "ERROR" "Database connection failed"
             , LogEntry "10:01" "INFO" "User logged in"
             , LogEntry "10:02" "ERROR" "Timeout occurred"
             , LogEntry "10:03" "WARN" "Memory usage high"
             ]

-- Count log levels and collect messages  
logSummary :: Map String (Int, [String])
logSummary = Map.fromListWith (\\(c1,m1) (c2,m2) -> (c1+c2, m1++m2))
    [(level entry, (1, [message entry])) | entry <- logEntries]

main :: IO ()
main = do
    putStrLn "Word counts:"
    print \\$ countWords "the quick brown fox jumps over the lazy dog the"
    
    putStrLn "\\nSales by category:"
    print salesByCategory
    
    putStrLn "\\nTotals by category:"  
    print totalByCategory
    
    putStrLn "\\nCategory statistics:"
    print categoryStats
    
    putStrLn "\\nLog summary:"
    print logSummary`,
    explanation: "Haskell's fromListWith takes a list of key-value pairs and builds a Map, but when the same key appears multiple times, it uses a function you provide to combine the values. This is perfect for aggregating data - counting frequencies, summing totals, collecting items into lists, or building complex statistics. The combining function defines what happens when keys collide.",
    whyElegant: "One function that handles the common pattern of 'group by key and aggregate values' with any aggregation logic you need.",
    keyInsight: "fromListWith transforms the tedious process of building maps with duplicate keys into a single function call with custom collision handling.",
    analogy: "Like sorting mail into boxes where each box has a name - if you find mail for a box that already has mail, you follow specific rules (your combining function) for how to put them together.",
    sourceNote: "Haskell's Data.Map.fromListWith for elegant aggregation with collision handling"
  },
  {
    id: "clojure-juxt",
    title: "Clojure juxt",
    language: "Clojure",
    category: "Functional Programming Gems",
    conceptTags: ["function-composition", "parallel-application", "data-processing"],
    code: `;; juxt applies multiple functions to the same arguments
;; and returns a vector of results

;; Basic example: getting multiple properties
(def person {:name "Alice" :age 30 :salary 75000})

;; Without juxt - verbose and repetitive
(defn analyze-person-old [p]
  [(\\:name p) (\\:age p) (> (\\:salary p) 50000)])

;; With juxt - elegant and declarative  
(def analyze-person (juxt \\:name \\:age #(> (\\:salary %) 50000)))

(analyze-person person)
;; => ["Alice" 30 true]

;; Mathematical operations on same input
(def math-operations (juxt + - * /))
(math-operations 10 5)
;; => [15 5 50 2]

;; String processing pipeline
(def text-analysis (juxt count 
                          #(clojure.string/upper-case %)
                          #(clojure.string/reverse %)
                          #(-> % (clojure.string/split #"\\\\s+") count)))

(text-analysis "hello world programming")
;; => [21 "HELLO WORLD PROGRAMMING" "gnimmargorp dlrow olleh" 3]

;; Data validation - multiple checks on same data
(defn valid-email? [email]
  (and (string? email) 
       (re-find #"@" email)
       (> (count email) 5)))

(defn valid-age? [age]
  (and (number? age) (>= age 0) (<= age 150)))

(def validate-user (juxt #(valid-email? (\\:email %))
                        #(valid-age? (\\:age %))
                        #(string? (\\:name %))
                        #(pos? (count (\\:name %)))))

(validate-user {:name "Bob" :age 25 :email "bob@example.com"})
;; => [true true true true]

;; Statistical analysis - multiple aggregations  
(def numbers [1 2 3 4 5 6 7 8 9 10])

(def stats (juxt count 
                 #(apply + %) 
                 #(/ (apply + %) (count %))  ; average
                 #(apply min %)
                 #(apply max %)))

(stats numbers)
;; => [10 55 11/2 1 10]

;; Real-world example: processing API responses
(defn process-api-response [response]
  (let [extract-info (juxt #(get % "status")
                           #(count (get % "data" []))
                           #(get-in % ["meta" "timestamp"])
                           #(get-in % ["meta" "version"]))]
    (extract-info response)))

(def api-response {"status" "success"
                   "data" [1 2 3 4 5]
                   "meta" {"timestamp" "2024-01-15"
                          "version" "1.2.3"}})

(process-api-response api-response)
;; => ["success" 5 "2024-01-15" "1.2.3"]

;; Combining with map for batch processing
(def users [{\\:name "Alice" \\:age 30 \\:active true}
            {\\:name "Bob" \\:age 25 \\:active false}
            {\\:name "Carol" \\:age 35 \\:active true}])

(def user-summary (juxt \\:name \\:age \\:active))
(map user-summary users)
;; => (["Alice" 30 true] ["Bob" 25 false] ["Carol" 35 true])`,
    explanation: "Clojure's juxt function takes multiple functions and returns a new function that applies all of them to the same arguments, returning a vector of results. Instead of calling each function separately on the same data, juxt lets you bundle them together. This is especially powerful for data analysis where you want to extract multiple pieces of information from the same input.",
    whyElegant: "Eliminates the repetition of passing the same arguments to multiple functions while making it clear that all operations work on the same data.",
    keyInsight: "juxt transforms repeated function applications into a single operation that fans out the input to multiple processors.",
    analogy: "Like having multiple photo filters that you apply to the same picture simultaneously - instead of editing the photo three separate times, you get all three filtered versions in one go.",
    sourceNote: "Clojure's juxt function for parallel function application"
  },
  {
    id: "clojure-comp",
    title: "Clojure comp",
    language: "Clojure",
    category: "Functional Programming Gems",
    conceptTags: ["function-composition", "pipeline", "data-transformation"],
    code: `;; comp composes functions right-to-left (mathematical composition)
;; (comp f g h) creates a function equivalent to (fn [x] (f (g (h x))))

;; Basic example: string processing pipeline
(def process-text (comp clojure.string/upper-case
                        clojure.string/trim  
                        #(clojure.string/replace % #"[0-9]" "")))

(process-text "  hello123world  ")
;; => "HELLOWORLD"
;; Flow: trim -> remove digits -> uppercase

;; Mathematical composition
(def math-pipeline (comp #(* % %) 
                        #(+ % 10)
                        #(/ % 2)))

(math-pipeline 20)
;; => 400
;; Flow: 20 -> (/ 20 2) -> (+ 10 10) -> (* 20 20) -> 400

;; Data transformation pipeline
(defn extract-numbers [text]
  (re-seq #"\\\\d+" text))

(defn parse-numbers [strings]
  (map #(Integer/parseInt %) strings))

(defn sum-numbers [nums]
  (apply + nums))

(def text-to-sum (comp sum-numbers 
                      parse-numbers 
                      extract-numbers))

(text-to-sum "I have 10 apples, 5 oranges, and 3 bananas")
;; => 18

;; Processing collections with comp and map
(def users ["  alice@EXAMPLE.com  " 
            "  BOB@test.COM  " 
            "  charlie@DEMO.org  "])

(def clean-email (comp clojure.string/lower-case 
                      clojure.string/trim))

(map clean-email users)
;; => ("alice@example.com" "bob@test.com" "charlie@demo.org")

;; Complex data processing
(def sales-data [{\\:amount 100 \\:tax-rate 0.08 \\:discount 0.1}
                 {\\:amount 200 \\:tax-rate 0.08 \\:discount 0.05}
                 {\\:amount 150 \\:tax-rate 0.1 \\:discount 0.0}])

(defn apply-discount [sale]
  (update sale \\:amount #(* % (- 1 (\\:discount sale)))))

(defn add-tax [sale] 
  (update sale \\:amount #(* % (+ 1 (\\:tax-rate sale)))))

(defn round-amount [sale]
  (update sale \\:amount #(Math/round (* % 100)) / 100.0))

(def calculate-final-price (comp round-amount 
                                add-tax 
                                apply-discount))

(map calculate-final-price sales-data)
;; => ({\\:amount 97.2, \\:tax-rate 0.08, \\:discount 0.1}
;;     {\\:amount 204.3, \\:tax-rate 0.08, \\:discount 0.05}  
;;     {\\:amount 165.0, \\:tax-rate 0.1, \\:discount 0.0})

;; Comparison with threading macros
;; comp version (right-to-left)
(def process-comp (comp #(* % 2)
                       #(+ % 5) 
                       #(- % 3)))

;; equivalent to thread-first (left-to-right)  
(defn process-thread [x]
  (-> x
      (- 3)
      (+ 5)
      (* 2)))

(process-comp 10)  ; => 24
(process-thread 10) ; => 24

;; Real-world example: API response processing
(defn extract-data [response] (get response "data"))
(defn filter-active [items] (filter #(get % "active") items))
(defn extract-names [items] (map #(get % "name") items))
(defn sort-names [names] (sort names))

(def process-api-response (comp sort-names
                               extract-names
                               filter-active  
                               extract-data))

(def api-response {"data" [{"name" "Charlie" "active" true}
                          {"name" "Alice" "active" false}  
                          {"name" "Bob" "active" true}]})

(process-api-response api-response)
;; => ("Bob" "Charlie")`,
    explanation: "Clojure's comp function combines multiple functions into a single function that applies them right-to-left (like mathematical function composition). When you call the composed function, the rightmost function runs first, then its result feeds into the next function, and so on. This creates clean data transformation pipelines without intermediate variables.",
    whyElegant: "Eliminates temporary variables and makes data transformation pipelines read like a recipe, with each step clearly feeding into the next.",
    keyInsight: "Function composition turns a sequence of data transformations into a single reusable function that embodies the entire pipeline.",
    analogy: "Like a factory assembly line where each station performs one operation and passes the result to the next station - comp lets you design the whole line as a single blueprint.",
    sourceNote: "Clojure's comp function for right-to-left function composition"
  },
{
    id: "haskell-concatmap",
    title: "Haskell concatMap",
    language: "Haskell",
    category: "Functional Programming Gems",
    conceptTags: ["higher-order-functions", "list-processing", "composition", "monadic-operations"],
    code: `concatMap :: (a -> [b]) -> [a] -> [b]
concatMap f = concat . map f

-- Example usage
words' :: String -> [String]  
words' = concatMap (\\w -> if w == ' ' then [] else [[w]])

-- Using it
result = concatMap (\\x -> [x, x*2]) [1,2,3]
-- Result: [1,2,2,4,3,6]`,
    explanation: "This function takes a list and a function that turns each item into a new list, then flattens all those lists into one big list. It's like having a factory worker who processes each item and can produce multiple outputs per item, then collecting all outputs on one conveyor belt.",
    whyElegant: "The composition of concat and map creates a powerful pattern that handles the common case of mapping then flattening in one elegant operation. It's the essence of the flatMap operation found in many functional languages.",
    keyInsight: "concatMap is the fundamental building block of monadic bind operations in Haskell.",
    analogy: "Like a mail sorter who opens each envelope (map), finds multiple letters inside some envelopes, and puts all letters in one pile (concat).",
    sourceNote: "Core Haskell Prelude function, fundamental to list processing"
  },
  {
    id: "apl-rank-operator",
    title: "APL rank operator",
    language: "APL",
    category: "Functional Programming Gems",
    conceptTags: ["array-programming", "dimensional-operations", "rank-polymorphism", "operator-overloading"],
    code: `⍝ The rank operator ⍤ applies functions at specified array depths
⍝ f⍤k applies f to k-dimensional subarrays

+⍤1 ⍝ Sum along rank-1 (vectors)
×⍤0 ⍝ Apply times to rank-0 (scalars)

⍝ Example with a 3×3 matrix
mat ← 3 3⍴⍳9
      1 2 3
      4 5 6  
      7 8 9

+⍤1 mat  ⍝ Sum each row: 6 15 24
+⍤0 mat  ⍝ Sum all elements: 45

⍝ Function composition with rank
(+⍤1)⍤1 ⍝ Apply row sums to each matrix in array`,
    explanation: "The rank operator lets you specify exactly which dimension of an array your function should work on. Instead of your function guessing what to do with multi-dimensional data, you tell it exactly which 'slice' to operate on - individual numbers, rows, columns, or whole matrices.",
    whyElegant: "Rank polymorphism eliminates the need for explicit loops or dimension manipulation. One operator handles the complexity of applying functions across arbitrary array dimensions with mathematical precision.",
    keyInsight: "Rank operators make array programming dimension-agnostic by explicitly controlling the scope of operations.",
    analogy: "Like telling a chef whether to season each ingredient separately (rank 0), each dish (rank 1), or the entire meal (rank 2) - you control the scope of the operation.",
    sourceNote: "Core APL operator, fundamental to array-oriented programming paradigm"
  },
  {
    id: "j-tacit-verbs",
    title: "J tacit verb composition",
    language: "J",
    category: "Functional Programming Gems",
    conceptTags: ["point-free", "function-composition", "tacit-programming", "verb-trains"],
    code: `NB. Tacit verbs - no explicit arguments
NB. Fork pattern: (f g h) y = (f y) g (h y)
NB. Hook pattern: (f g) y = y f (g y)

avg =: +/ % #  NB. sum divided by count
NB. This is: (+/) % (#)
NB. Reads as: sum-over divided-by count-of

variance =: avg@:*: - *:@:avg
NB. average of squares minus square of average

NB. Usage
avg 1 2 3 4 5    NB. Result: 3
variance 1 2 3 4 5    NB. Result: 2

NB. Complex example - standard deviation
stddev =: %:@:variance
NB. square root of variance`,
    explanation: "Tacit programming lets you build functions without ever naming the input data - you just chain operations together like building with Lego blocks. Each piece knows how to connect to the next, creating complex behaviors from simple parts without mentioning what flows through the pipeline.",
    whyElegant: "Point-free style eliminates variable names and focuses purely on the mathematical relationships between operations. The code reads like a mathematical formula rather than imperative steps.",
    keyInsight: "Tacit composition turns function application into algebraic manipulation of pure operations.",
    analogy: "Like describing a recipe by listing cooking methods in order (chop, sauté, season) without saying 'take the vegetables' - the ingredients flow through naturally.",
    sourceNote: "Core J language feature, extends APL's function composition paradigm"
  },
  {
    id: "erlang-foldl",
    title: "Erlang lists:foldl",
    language: "Erlang",
    category: "Functional Programming Gems",
    conceptTags: ["folding", "accumulation", "tail-recursion", "list-processing"],
    code: `%% lists:foldl(Fun, Acc0, List) -> AccN
%% Left fold - processes list from left to right

%% Sum all numbers
Sum = lists:foldl(fun(X, Acc) -> X + Acc end, 0, [1,2,3,4,5]).
%% Result: 15

%% Build a map from key-value pairs  
KVPairs = [{name, "Alice"}, {age, 30}, {city, "Boston"}],
Map = lists:foldl(
    fun({Key, Value}, Acc) -> 
        maps:put(Key, Value, Acc) 
    end, 
    maps:new(), 
    KVPairs
).

%% Reverse a list efficiently
Reversed = lists:foldl(fun(X, Acc) -> [X|Acc] end, [], [1,2,3]).
%% Result: [3,2,1]`,
    explanation: "This function walks through a list from left to right, keeping a running result that gets updated at each step. Think of it like walking through a shopping list, keeping a running total of your purchases - each item either adds to your total or changes it in some way.",
    whyElegant: "foldl is tail-recursive and memory-efficient, making it the Swiss Army knife of list processing. It can implement map, filter, reverse, sum, and countless other operations as special cases.",
    keyInsight: "Left fold is the fundamental iteration pattern that can express almost any list transformation.",
    analogy: "Like reading a book from left to right, taking notes in the margin that build up your understanding as you progress through each page.",
    sourceNote: "Erlang/OTP standard library, optimized for tail-call recursion"
  },
  {
    id: "elixir-reduce-while",
    title: "Elixir Enum.reduce_while",
    language: "Elixir",
    category: "Functional Programming Gems",
    conceptTags: ["early-termination", "conditional-reduction", "control-flow", "pattern-matching"],
    code: `# Enum.reduce_while(enumerable, acc, fun)
# fun returns {:cont, acc} to continue or {:halt, acc} to stop

# Find first number > 10, keeping running sum
result = Enum.reduce_while([1, 3, 7, 12, 8], 0, fn x, acc ->
  new_acc = acc + x
  if new_acc > 10 do
    {:halt, new_acc}  # Stop when sum exceeds 10
  else
    {:cont, new_acc}  # Continue accumulating
  end
end)
# Result: 11 (stopped at 1+3+7=11)

# Early database search with connection cleanup
find_user = fn ids ->
  Enum.reduce_while(ids, nil, fn id, _acc ->
    case Database.get_user(id) do
      nil -> {:cont, nil}              # Keep searching
      user -> {:halt, {:found, user}}  # Stop, we found one
    end
  end)
end`,
    explanation: "This is like reduce, but with a stop button. As you're going through your list and building up a result, you can decide at any point 'that's enough, I'm done' and exit early. It's perfect for searches where you stop as soon as you find what you need.",
    whyElegant: "Combines the power of fold with early termination, avoiding unnecessary computation while maintaining functional purity. The pattern matching on return values makes the control flow explicit and clear.",
    keyInsight: "reduce_while bridges functional iteration with efficient early termination using explicit continuation signals.",
    analogy: "Like taste-testing a soup while cooking - you keep adding ingredients and tasting until it's just right, then you stop instead of blindly following the whole recipe.",
    sourceNote: "Elixir Enum module, built on Erlang's efficient list processing"
  },
  {
    id: "fsharp-list-unfold",
    title: "F# List.unfold",
    language: "F#",
    category: "Functional Programming Gems",
    conceptTags: ["list-generation", "unfolding", "seed-expansion", "lazy-generation"],
    code: `// List.unfold : ('State -> ('T * 'State) option) -> 'State -> 'T list
// Generate list by repeatedly applying function to state

// Generate countdown from n to 1
let countdown n = 
    List.unfold (fun state ->
        if state <= 0 then None
        else Some(state, state - 1)
    ) n

let numbers = countdown 5  // [5; 4; 3; 2; 1]

// Generate Fibonacci sequence
let fibonacci count =
    List.unfold (fun (a, b, remaining) ->
        if remaining <= 0 then None
        else Some(a, (b, a + b, remaining - 1))
    ) (0, 1, count)

let fibs = fibonacci 8  // [0; 1; 1; 2; 3; 5; 8; 13]

// Unfold a binary tree into list  
let flattenTree tree =
    List.unfold (fun nodes ->
        match nodes with
        | [] -> None
        | node::rest -> Some(node.Value, rest @ node.Children)
    ) [tree]`,
    explanation: "Unfold is the opposite of fold - instead of taking a list and reducing it to a single value, you start with a single seed value and grow it into a list. You provide a function that says 'given the current state, what's the next item and what's the new state?' and it keeps going until you say stop.",
    whyElegant: "Unfold captures the essence of generative algorithms in a pure functional way. It separates the generation logic from the termination condition, making complex sequence generation patterns reusable and composable.",
    keyInsight: "Unfold is the dual of fold, generating data structures from seeds rather than consuming them into values.",
    analogy: "Like planting a seed and watching it grow - you start with something small, and each day it becomes a little bigger based on simple rules, until you have a full plant (list).",
    sourceNote: "F# List module, part of functional sequence processing primitives"
  },
  {
    id: "ocaml-seq-unfold",
    title: "OCaml Seq.unfold",
    language: "OCaml",
    category: "Functional Programming Gems",
    conceptTags: ["lazy-sequences", "generators", "memory-efficient", "infinite-streams"],
    code: `(* Seq.unfold : ('a -> ('b * 'a) option) -> 'a -> 'b Seq.t *)
(* Generate lazy sequence from initial state *)

(* Infinite sequence of natural numbers *)
let naturals = Seq.unfold (fun n -> Some (n, n + 1)) 0

(* Take first 5: [0; 1; 2; 3; 4] *)
let first_five = naturals |> Seq.take 5 |> List.of_seq

(* Powers of 2 until overflow *)
let powers_of_2 = 
  Seq.unfold (fun n -> 
    if n > max_int / 2 then None
    else Some (n, n * 2)
  ) 1

(* Lazy file reading line by line *)
let read_lines filename =
  let ic = open_in filename in
  Seq.unfold (fun () ->
    try 
      let line = input_line ic in
      Some (line, ())
    with 
    | End_of_file -> close_in ic; None
  ) ()

(* Usage - only reads what you consume *)
read_lines "data.txt" |> Seq.take 10 |> Seq.iter print_endline`,
    explanation: "This creates a lazy sequence where each element is only computed when you actually need it. It's like having an infinite assembly line that only makes the next widget when someone asks for it. You can describe how to make unlimited items without using unlimited memory.",
    whyElegant: "Lazy sequences enable working with potentially infinite data structures using constant memory. The unfold pattern cleanly separates the generation logic from consumption, enabling powerful compositional programming.",
    keyInsight: "Lazy unfold enables infinite data structures with finite memory by computing elements on-demand.",
    analogy: "Like a magical book that writes the next page only when you turn to it - you can have a book with infinite pages, but only the pages you've read actually exist in physical form.",
    sourceNote: "OCaml 4.07+ Seq module, providing lazy sequence operations"
  },
  {
    id: "haskell-unfoldr",
    title: "Haskell unfoldr",
    language: "Haskell",
    category: "Functional Programming Gems",
    conceptTags: ["unfold-pattern", "maybe-monad", "list-generation", "termination-conditions"],
    code: `-- unfoldr :: (b -> Maybe (a, b)) -> b -> [a]
-- Unfold with Maybe for natural termination

-- Generate countdown
countdown :: Int -> [Int]  
countdown = unfoldr (\\b -> if b == 0 then Nothing else Just (b, b-1))

result1 = countdown 5  -- [5,4,3,2,1]

-- Generate while condition holds
takeWhileUnfold :: (a -> Bool) -> (a -> a) -> a -> [a]
takeWhileUnfold p f = unfoldr (\\x -> if p x then Just (x, f x) else Nothing)

-- Powers of 2 less than 100
powers2 = takeWhileUnfold (< 100) (*2) 1  -- [1,2,4,8,16,32,64]

-- Collatz sequence  
collatz :: Int -> [Int]
collatz = unfoldr (\\n -> 
  if n <= 1 then Nothing
  else Just (n, if even n then n \`div\` 2 else 3*n + 1))

-- Example: collatz 5 produces [5,16,8,4,2]`,
    explanation: "This function builds a list by repeatedly asking 'what's next?' until you answer 'nothing'. Starting with a seed value, it applies your function which either says 'here's the next item and new seed' or 'I'm done'. It's perfect for sequences where you don't know in advance how long they'll be.",
    whyElegant: "The Maybe type provides elegant termination - Nothing stops generation naturally without exceptions or special values. This pattern handles both finite and conceptually infinite sequences with the same simple interface.",
    keyInsight: "unfoldr uses Maybe to elegantly handle termination conditions in generative sequences.",
    analogy: "Like following a treasure map where each clue leads to the next location, and the final clue says 'treasure found, stop here' instead of pointing to another location.",
    sourceNote: "Haskell Data.List, the canonical unfold function in functional programming"
  },
  {
    id: "scala-stream-iterate",
    title: "Scala Stream.iterate",
    language: "Scala",
    category: "Functional Programming Gems",
    conceptTags: ["infinite-streams", "lazy-evaluation", "iteration", "memoization"],
    code: `// Stream.iterate[T](start: T)(f: T => T): Stream[T]
// Create infinite stream by iterating function

// Powers of 2 starting from 1
val powersOf2 = Stream.iterate(1)(_ * 2)
// Stream(1, 2, 4, 8, 16, 32, ...)

// Take first 10: List(1, 2, 4, 8, 16, 32, 64, 128, 256, 512)
val first10 = powersOf2.take(10).toList

// Fibonacci using iteration on pairs
val fibonacci = Stream.iterate((0, 1)) { case (a, b) => (b, a + b) }.map(_._1)
// Stream(0, 1, 1, 2, 3, 5, 8, 13, 21, 34, ...)

// Newton-Raphson method for square roots
def sqrt(x: Double): Stream[Double] = 
  Stream.iterate(x / 2)(guess => (guess + x / guess) / 2)

// Converges to sqrt(2)  
val sqrt2approximations = sqrt(2.0).take(5).toList
// Each iteration gets closer to 1.414...

// Infinite stream with complex state
case class GameState(score: Int, level: Int)
val gameProgression = Stream.iterate(GameState(0, 1))(
  state => GameState(state.score + state.level * 10, state.level + 1)
)`,
    explanation: "This creates an endless sequence by repeatedly applying the same function to the previous result. You give it a starting value and a rule for 'what comes next', and it can generate an infinite stream of values. Since it's lazy, it only computes values when you actually ask for them.",
    whyElegant: "Stream.iterate captures the essence of mathematical sequences and recursive processes in a composable, memory-efficient way. The lazy evaluation means you can work with infinite concepts using finite resources.",
    keyInsight: "iterate transforms simple iteration rules into infinite lazy data structures with constant memory overhead.",
    analogy: "Like a Swiss clock that ticks forever - you wind it once with a starting position and a rule for 'next tick', and it can run infinitely, but you only hear the ticks you listen for.",
    sourceNote: "Scala 2.x Stream class, replaced by LazyList in Scala 2.13+"
  },
  {
    id: "haskell-lazy-evaluation",
    title: "Lazy evaluation order illustration",
    language: "Haskell",
    category: "Functional Programming Gems",
    conceptTags: ["lazy-evaluation", "call-by-need", "thunks", "evaluation-strategy"],
    code: `-- Show how lazy evaluation works step by step
-- Expression: take 3 [1..]

-- Step 1: [1..] creates infinite list (unevaluated thunk)
infiniteList = [1..]  -- Thunk: enumFromTo 1 maxBound

-- Step 2: take 3 demands first element
-- take 3 (1 : enumFromTo 2 maxBound)
-- take 2 (enumFromTo 2 maxBound)  

-- Step 3: take 2 demands second element  
-- take 2 (2 : enumFromTo 3 maxBound)
-- take 1 (enumFromTo 3 maxBound)

-- Step 4: take 1 demands third element
-- take 1 (3 : enumFromTo 4 maxBound) 
-- take 0 (enumFromTo 4 maxBound)

-- Step 5: take 0 returns []
-- Final result: [1, 2, 3]

-- Demonstrate with trace
import Debug.Trace

lazyDemo = take 3 $ map (\\x -> trace ("computing " ++ show x) x) [1..]
-- Output when evaluated:
-- computing 1
-- computing 2  
-- computing 3
-- [1,2,3]`,
    explanation: "Lazy evaluation means Haskell only computes what it absolutely needs, when it needs it. Even though we define an infinite list of numbers, Haskell is smart enough to only calculate the first three because that's all the 'take 3' function requires. It's like having a very smart assistant who only does the work that's actually necessary.",
    whyElegant: "Lazy evaluation enables working with infinite data structures naturally while automatically optimizing for minimal computation. It separates the definition of data from its consumption, leading to more modular and efficient programs.",
    keyInsight: "Lazy evaluation makes infinite data structures practical by computing only the elements that are actually demanded.",
    analogy: "Like a restaurant that only cooks food when customers order it - you can have an infinite menu, but you only use ingredients for the dishes people actually want to eat.",
    sourceNote: "Core Haskell evaluation strategy, fundamental to the language's design philosophy"
  }
];
