import type { CuratedExample } from '../../types';

export const languageDesign: CuratedExample[] = [
  {
    id: 'python-context-manager',
    title: 'Python Context Managers: Setup and Cleanup in One Breath',
    language: 'Python',
    category: 'Language Design Insights',
    conceptTags: ['resource management', 'protocol', 'RAII'],
    code: `class ManagedFile:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        self.file = open(self.name, 'w')
        return self.file

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.file.close()
        return False

with ManagedFile('hello.txt') as f:
    f.write('goodbye, resource leaks')`,
    explanation:
      'When you open a file, you need to close it when you are done — even if something goes wrong. This code defines an object that automatically opens the file when you start using it and closes it when you finish, no matter what happens in between.',
    whyElegant:
      'The __enter__ and __exit__ methods turn any object into a self-cleaning workspace. The "with" statement guarantees cleanup runs, the way a spring-loaded door closes behind you whether you walk through calmly or sprint out in a panic.',
    keyInsight:
      'Pairing setup with teardown in the same object means you can never forget to clean up.',
    analogy:
      'A refrigerator door that swings shut on its own — you grab what you need, and the door handles closing whether you remembered or not.',
    sourceNote: 'PEP 343, Guido van Rossum, 2005',
  },
  {
    id: 'python-descriptor-protocol',
    title: 'Python Descriptors: Attributes That Think for Themselves',
    language: 'Python',
    category: 'Language Design Insights',
    conceptTags: ['descriptor', 'metaprogramming', 'attribute access'],
    code: `class Celsius:
    def __set_name__(self, owner, name):
        self.name = '_' + name

    def __get__(self, obj, objtype=None):
        return getattr(obj, self.name, None)

    def __set__(self, obj, value):
        if value < -273.15:
            raise ValueError("Temperature below absolute zero")
        setattr(obj, self.name, value)

class Thermometer:
    temperature = Celsius()

t = Thermometer()
t.temperature = 36.6   # works fine
t.temperature = -300    # raises ValueError`,
    explanation:
      'Normally, setting a value on an object just stores it. Here, the Celsius descriptor intercepts every read and write to the "temperature" attribute, adding validation. You use it like a normal attribute, but it silently enforces the rules of physics.',
    whyElegant:
      'The calling code never knows validation is happening — t.temperature = 36.6 looks like a plain assignment. The descriptor protocol lets attributes carry their own behavior, the way a thermostat regulates temperature without you manually flipping the heater on and off.',
    keyInsight:
      'Descriptors let you attach invisible logic to what looks like ordinary attribute access.',
    analogy:
      'A mailbox slot with a built-in filter that accepts envelopes but rejects anything too large to fit.',
    sourceNote: 'Python Data Model, descriptor HOWTO, Raymond Hettinger',
  },
  {
    id: 'rust-ownership-ten-lines',
    title: 'Rust Ownership: Memory Safety Without a Garbage Collector',
    language: 'Rust',
    category: 'Language Design Insights',
    conceptTags: ['ownership', 'move semantics', 'memory safety'],
    code: `fn main() {
    let greeting = String::from("hello");
    let moved = greeting;           // ownership transfers here

    // println!("{}", greeting);    // compile error: value used after move

    let borrowed = &moved;          // borrow without taking ownership
    println!("{}", borrowed);       // works fine
    println!("{}", moved);          // original still valid — we only borrowed
}`,
    explanation:
      'In Rust, every piece of data has exactly one owner at a time. When you hand data to a new variable, the old variable can no longer use it — unless you explicitly borrow it. The compiler checks all of this before your program ever runs.',
    whyElegant:
      'There is no garbage collector running in the background and no manual memory management to get wrong. The compiler enforces the rules at build time, catching entire categories of bugs before a single line executes. Safety becomes a property of the code itself, not a runtime service.',
    keyInsight:
      'Rust proves you can have memory safety and zero runtime cost by making ownership part of the type system.',
    analogy:
      'A library book — only one person can check it out at a time, but anyone can read it over your shoulder while you hold it.',
    sourceNote: 'The Rust Programming Language, Steve Klabnik & Carol Nichols',
  },
  {
    id: 'go-goroutine-hello',
    title: 'Go Goroutines: Concurrency as a One-Word Statement',
    language: 'Go',
    category: 'Language Design Insights',
    conceptTags: ['concurrency', 'goroutine', 'lightweight threads'],
    code: `package main

import (
    "fmt"
    "time"
)

func say(word string) {
    for i := 0; i < 3; i++ {
        time.Sleep(100 * time.Millisecond)
        fmt.Println(word)
    }
}

func main() {
    go say("hello")
    say("world")
}`,
    explanation:
      'The keyword "go" before a function call launches that function as a separate, lightweight task that runs alongside the rest of the program. Here, "hello" and "world" print interleaved because they run at the same time.',
    whyElegant:
      'Most languages require importing thread libraries, managing lifecycles, and worrying about pooling. Go reduces all of that to a single two-letter keyword. Concurrency stops being an advanced topic and becomes a basic statement.',
    keyInsight:
      'When launching concurrent work costs a single keyword, developers reach for concurrency where it naturally fits instead of avoiding it.',
    analogy:
      'Asking a friend to start cooking the rice while you chop vegetables — one word ("go") and both tasks run in parallel.',
    sourceNote: 'Effective Go, golang.org',
  },
  {
    id: 'go-defer-cleanup',
    title: 'Go defer: Write Cleanup Next to Setup',
    language: 'Go',
    category: 'Language Design Insights',
    conceptTags: ['defer', 'resource management', 'readability'],
    code: `package main

import (
    "fmt"
    "os"
)

func writeFile(path string) error {
    f, err := os.Create(path)
    if err != nil {
        return err
    }
    defer f.Close()

    _, err = fmt.Fprintln(f, "data written safely")
    return err
}`,
    explanation:
      'The "defer" keyword schedules a function call to run when the surrounding function exits, no matter how it exits — normal return, early error, or panic. Here, the file close is written right after the file open, but it executes last.',
    whyElegant:
      'You never have to scroll to the bottom of a function to find the cleanup code. Setup and teardown live on adjacent lines, making it obvious at a glance that every resource opened will be closed.',
    keyInsight:
      'Placing cleanup code next to allocation code eliminates the class of bug where you forget to release a resource on an early return path.',
    analogy:
      'Writing a sticky note "lock the door" the moment you unlock it and sticking it to the door handle — you will see it on the way out no matter which route you take through the house.',
    sourceNote: 'A Tour of Go, golang.org',
  },
  {
    id: 'lisp-quote-eval-symmetry',
    title: 'Lisp quote and eval: Code That Inspects Itself',
    language: 'Lisp',
    category: 'Language Design Insights',
    conceptTags: ['homoiconicity', 'metaprogramming', 'eval'],
    code: `; quote turns code into data
(define expr '(+ 1 2 3))

; you can inspect it like any list
(car expr)    ; => +
(cdr expr)    ; => (1 2 3)
(length expr) ; => 4

; eval turns data back into code
(eval expr)   ; => 6`,
    explanation:
      'In Lisp, code and data share the same structure — lists. The quote mark freezes an expression so you can examine its parts like any list. The eval function unfreezes it and runs it as code. You can freely switch between treating something as instructions and treating it as information.',
    whyElegant:
      'Most languages draw a hard boundary between "the program" and "the data the program works on." Lisp erases that line. A single list can be read, rearranged, and executed, giving the programmer a kind of X-ray vision into the language itself.',
    keyInsight:
      'When code and data share the same representation, programs that write and transform other programs become trivially natural.',
    analogy:
      'A recipe card that you can read as cooking instructions or shuffle around like index cards to rearrange the meal plan.',
    sourceNote: 'Structure and Interpretation of Computer Programs, Abelson & Sussman',
  },
  {
    id: 'lisp-self-expanding-macro',
    title: 'Lisp Macros: Code That Writes Code',
    language: 'Lisp',
    category: 'Language Design Insights',
    conceptTags: ['macros', 'code generation', 'metaprogramming'],
    code: `(defmacro when (condition &body body)
  \`(if ,condition
       (progn ,@body)))

; usage
(when (> temperature 100)
  (sound-alarm)
  (open-vents)
  (log-event "overheating"))

; expands to:
; (if (> temperature 100)
;     (progn
;       (sound-alarm)
;       (open-vents)
;       (log-event "overheating")))`,
    explanation:
      'A macro is a function that runs at compile time and produces code. Here, "when" does not exist as a built-in keyword — the programmer defined it. Every time the compiler sees "when," it rewrites it into a standard "if" expression before the program runs.',
    whyElegant:
      'The programmer is extending the language itself. "when" reads more naturally than "if" for guard clauses, and writing it took three lines. In most languages, adding a new control structure would require modifying the compiler.',
    keyInsight:
      'Macros let you reshape the language to match the problem instead of reshaping the problem to match the language.',
    analogy:
      'Teaching your calculator a new button — you wire up what it does once, and from then on pressing it works as if it were always there.',
    sourceNote: 'On Lisp, Paul Graham, 1993',
  },
  {
    id: 'ruby-method-missing-dsl',
    title: 'Ruby method_missing: Objects That Respond to Anything',
    language: 'Ruby',
    category: 'Language Design Insights',
    conceptTags: ['metaprogramming', 'DSL', 'dynamic dispatch'],
    code: `class HtmlBuilder
  def initialize
    @html = ""
  end

  def method_missing(tag, content = nil, &block)
    @html << "<\#{tag}>"
    if block
      inner = HtmlBuilder.new
      inner.instance_eval(&block)
      @html << inner.to_s
    else
      @html << content.to_s
    end
    @html << "</\#{tag}>"
    self
  end

  def to_s = @html
end

page = HtmlBuilder.new
page.div { h1 "Hello"; p "World" }
puts page  # => <div><h1>Hello</h1><p>World</p></div>`,
    explanation:
      'When you call a method that does not exist on an object, Ruby calls method_missing instead of crashing. This builder uses that hook to treat every unknown method name as an HTML tag. Call .h1 and it wraps content in <h1> tags — no tag-specific code needed.',
    whyElegant:
      'The object appears to have an infinite vocabulary. Any HTML tag works without being pre-defined, because the missing-method hook provides a universal template. The resulting code reads almost like the HTML it produces.',
    keyInsight:
      'Catching undefined method calls lets you build domain-specific mini-languages where method names map directly to the vocabulary of the problem.',
    analogy:
      'A universal remote that figures out which button you pressed and sends the right signal to whatever device you are pointing at, even ones that did not exist when the remote was made.',
    sourceNote: 'Metaprogramming Ruby, Paolo Perrotta',
  },
  {
    id: 'ruby-enumerable-mixin',
    title: 'Ruby Enumerable: Define One Method, Get Fifty Free',
    language: 'Ruby',
    category: 'Language Design Insights',
    conceptTags: ['mixin', 'enumerable', 'interface amplification'],
    code: `class Playlist
  include Enumerable

  def initialize
    @songs = []
  end

  def add(song) = @songs << song

  def each(&block) = @songs.each(&block)
end

playlist = Playlist.new
playlist.add("Bohemian Rhapsody")
playlist.add("Stairway to Heaven")
playlist.add("Hotel California")

playlist.sort                 # => alphabetical
playlist.map(&:length)        # => [18, 18, 16]
playlist.select { |s| s.start_with?("H") }
# => ["Hotel California"]`,
    explanation:
      'By defining a single method — each — and mixing in the Enumerable module, the Playlist class instantly gains dozens of collection methods like sort, map, select, min, max, count, and more. You write one method; Ruby supplies the rest.',
    whyElegant:
      'The ratio of effort to capability is staggering. One three-line method unlocks an entire vocabulary of list operations. The mixin pattern means you write the minimum unique logic and inherit a rich, tested library of behaviors.',
    keyInsight:
      'A well-designed mixin amplifies a single method into a complete interface, rewarding minimal effort with maximum capability.',
    analogy:
      'Learning to read sheet music — you master one skill, and suddenly every song ever written is accessible to you.',
    sourceNote: 'Ruby core documentation, Yukihiro Matsumoto',
  },
  {
    id: 'smalltalk-message-passing',
    title: 'Smalltalk: Everything Is a Message',
    language: 'Smalltalk',
    category: 'Language Design Insights',
    conceptTags: ['message passing', 'object model', 'uniformity'],
    code: `"Numbers receive messages"
3 factorial.              "=> 6"

"Booleans receive messages"
(4 > 3) ifTrue: ['yes'] ifFalse: ['no'].   "=> 'yes'"

"Collections receive messages"
#(5 2 8 1) sorted.       "=> #(1 2 5 8)"

"Even control flow is message passing"
10 timesRepeat: [Transcript show: 'hello '].`,
    explanation:
      'In Smalltalk, every operation is a message sent to an object. Adding numbers, branching on conditions, and looping are all the same mechanism: you send a message and the object decides how to respond. There are no special keywords for if-statements or loops.',
    whyElegant:
      'The uniformity is absolute. Once you understand "send a message to an object," you understand the entire language. Control flow, arithmetic, and collection operations all follow the same pattern, reducing the number of concepts a programmer must learn to exactly one.',
    keyInsight:
      'When a language has only one mechanism — message passing — composing any two features is guaranteed to work because they use the same protocol.',
    analogy:
      'A postal system where every instruction, question, and request travels as a letter — there is one delivery mechanism and it handles everything.',
    sourceNote: 'Smalltalk-80: The Language, Adele Goldberg & David Robson',
  },
  {
    id: 'forth-stack-manipulation',
    title: 'Forth: A Calculator for Code',
    language: 'Forth',
    category: 'Language Design Insights',
    conceptTags: ['stack machine', 'concatenative', 'minimalism'],
    code: `\\ Compute (3 + 4) * 2 using the stack
3 4 + 2 *    \\ => 14

\\ Define a word (function) to compute the average of two numbers
: average  ( a b -- avg )
  + 2 / ;

10 20 average   \\ => 15

\\ Factorial using recursion
: factorial  ( n -- n! )
  dup 1 <= if drop 1 else dup 1 - recurse * then ;

5 factorial   \\ => 120`,
    explanation:
      'Forth has no variables or function arguments in the traditional sense. You push numbers onto a stack, and operations consume values from the top. "3 4 +" means: push 3, push 4, pop both and push their sum. Defining a new word (function) just names a sequence of stack operations.',
    whyElegant:
      'The language has almost no syntax. There are no parentheses for grouping, no commas separating arguments, no return statements. Every program is a flat sequence of words that transform the stack. The simplicity makes the entire language fit in a few kilobytes of memory.',
    keyInsight:
      'A stack-based language eliminates naming and scoping entirely — data flows implicitly through position, not through labels.',
    analogy:
      'A cafeteria tray line — you place items on a tray one at a time, and the cashier always scans whatever is on top.',
    sourceNote: 'Starting FORTH, Leo Brodie, 1981',
  },
  {
    id: 'prolog-list-membership',
    title: 'Prolog Unification: Asking Instead of Searching',
    language: 'Prolog',
    category: 'Language Design Insights',
    conceptTags: ['unification', 'logic programming', 'declarative'],
    code: `member(X, [X|_]).
member(X, [_|T]) :- member(X, T).

% Queries:
% ?- member(3, [1,2,3,4]).
% true.

% ?- member(X, [a, b, c]).
% X = a ;
% X = b ;
% X = c.`,
    explanation:
      'These two lines define what it means for an element to be a member of a list. The first line says: X is a member if it is the first element. The second says: X is a member if it is a member of the rest of the list. You never write a loop — Prolog searches for answers on its own.',
    whyElegant:
      'You describe the relationship, and the engine finds the proof. The same two clauses answer "is 3 in this list?" and "what elements are in this list?" with no code changes. The program is a definition, not a procedure.',
    keyInsight:
      'In logic programming, a single definition of a relationship can answer multiple different questions depending on which parts you leave unknown.',
    analogy:
      'A dictionary definition of "sibling" that can answer both "is Alice Bob\'s sibling?" and "who are Bob\'s siblings?" without needing separate instructions for each question.',
    sourceNote: 'The Art of Prolog, Sterling & Shapiro',
  },
  {
    id: 'prolog-append-backwards',
    title: 'Prolog append: A Function That Runs in Reverse',
    language: 'Prolog',
    category: 'Language Design Insights',
    conceptTags: ['bidirectional', 'logic programming', 'relations'],
    code: `append([], L, L).
append([H|T], L, [H|R]) :- append(T, L, R).

% Forward: concatenate two lists
% ?- append([1,2], [3,4], X).
% X = [1,2,3,4].

% Backward: split a list into two parts
% ?- append(X, Y, [1,2,3]).
% X = [], Y = [1,2,3] ;
% X = [1], Y = [2,3] ;
% X = [1,2], Y = [3] ;
% X = [1,2,3], Y = [].`,
    explanation:
      'The append rule defines the relationship between three lists: "the first two, joined together, equal the third." Run it forward and it concatenates. Run it backward — give it only the result — and it finds every possible way to split that result into two pieces.',
    whyElegant:
      'One definition serves as concatenation, splitting, and membership checking depending on which arguments you provide. The code does not prescribe steps; it states a truth, and the runtime explores its consequences in whichever direction you need.',
    keyInsight:
      'A relation defined purely by its logical properties can compute in any direction, turning one definition into many functions.',
    analogy:
      'A zipper on a jacket — pull it one way and it joins, pull it the other way and it splits, same mechanism in both directions.',
    sourceNote: 'The Art of Prolog, Sterling & Shapiro',
  },
  {
    id: 'julia-multiple-dispatch',
    title: 'Julia Multiple Dispatch: Functions That Shape-Shift',
    language: 'Julia',
    category: 'Language Design Insights',
    conceptTags: ['multiple dispatch', 'polymorphism', 'extensibility'],
    code: `struct Circle
    radius::Float64
end

struct Rectangle
    width::Float64
    height::Float64
end

area(c::Circle) = π * c.radius^2
area(r::Rectangle) = r.width * r.height

# Collision detection dispatches on BOTH argument types
collides(a::Circle, b::Circle) =
    sqrt((a.radius + b.radius)^2) > 0

collides(a::Circle, b::Rectangle) =
    "circle-rect collision logic"

collides(a::Rectangle, b::Rectangle) =
    "rect-rect collision logic"

# Julia picks the right method based on ALL argument types
area(Circle(5.0))            # => 78.539...
area(Rectangle(3.0, 4.0))   # => 12.0`,
    explanation:
      'In Julia, the same function name can have different implementations depending on the types of all its arguments, not just the first one. When you call "area," Julia looks at what you passed in and picks the matching version. When you call "collides," it looks at both shapes to choose the right collision logic.',
    whyElegant:
      'Traditional object-oriented languages dispatch on one object — "the thing before the dot." Julia dispatches on every argument simultaneously, making operations that involve two or more types as natural to express as single-object methods.',
    keyInsight:
      'Multiple dispatch makes the verb the organizing principle instead of the noun, letting functions grow new behaviors as new types appear.',
    analogy:
      'A restaurant where the chef looks at every ingredient you brought before deciding which recipe to cook, not just the first one.',
    sourceNote: 'Jeff Bezanson et al., Julia: A Fresh Approach to Numerical Computing, 2017',
  },
  {
    id: 'swift-result-builder',
    title: 'Swift @resultBuilder: DSLs as a Language Feature',
    language: 'Swift',
    category: 'Language Design Insights',
    conceptTags: ['result builder', 'DSL', 'declarative UI'],
    code: `@resultBuilder
struct HTMLBuilder {
    static func buildBlock(_ parts: String...) -> String {
        parts.joined(separator: "\\n")
    }

    static func buildOptional(_ part: String?) -> String {
        part ?? ""
    }
}

func tag(_ name: String, @HTMLBuilder content: () -> String) -> String {
    "<\\(name)>\\n\\(content())\\n</\\(name)>"
}

let html = tag("div") {
    tag("h1") { "Welcome" }
    tag("p") { "Hello, world" }
}
// => <div>
//      <h1>Welcome</h1>
//      <p>Hello, world</p>
//    </div>`,
    explanation:
      'Swift\'s @resultBuilder attribute lets you define how a block of statements combines its results. The compiler transforms a plain-looking block of code into calls to your builder methods, letting you write what looks like a mini-language inside Swift itself.',
    whyElegant:
      'SwiftUI, Swift\'s entire UI framework, is built on this single mechanism. The nesting of views in SwiftUI code mirrors the visual nesting on screen because the result builder handles composition automatically. One annotation unlocks a declarative coding style.',
    keyInsight:
      'Result builders let the compiler rewrite ordinary-looking code blocks into builder method calls, making domain-specific syntax a first-class language capability.',
    analogy:
      'A recipe where you just list ingredients and the oven figures out the right temperature and timing for each one.',
    sourceNote: 'SE-0289, Swift Evolution, Apple, 2020',
  },
  {
    id: 'nim-hygienic-macro',
    title: 'Nim Macros: AST Surgery at Compile Time',
    language: 'Nim',
    category: 'Language Design Insights',
    conceptTags: ['macro', 'AST', 'hygienic', 'compile time'],
    code: `import macros

macro log(args: varargs[untyped]): untyped =
  result = newCall(bindSym"echo")
  result.add newLit("[LOG] ")
  for arg in args:
    result.add arg

log "User", " logged in at ", 42
# compiles to: echo "[LOG] ", "User", " logged in at ", 42

macro repeat(n: static[int], body: untyped): untyped =
  result = newStmtList()
  for i in 0 ..< n:
    result.add body

repeat 3:
  echo "hello"
# prints "hello" three times — loop is fully unrolled at compile time`,
    explanation:
      'Nim macros operate on the program\'s abstract syntax tree at compile time. The log macro rewrites your call into an echo with a prefix. The repeat macro copies the body N times, unrolling the loop entirely before the program runs. The generated identifiers cannot clash with your code because the macro system is hygienic.',
    whyElegant:
      'You work with the syntax tree directly using familiar Nim syntax, not string manipulation. The compiler guarantees that names introduced by the macro stay isolated from the surrounding code, preventing a class of subtle bugs that plague text-based macro systems.',
    keyInsight:
      'Hygienic macros give you the power of code generation with the safety guarantee that generated names will never accidentally collide with user code.',
    analogy:
      'A copy editor who rewrites sentences for clarity but uses colored ink so you can always tell which words are original and which were inserted.',
    sourceNote: 'Nim Manual, macros section, nim-lang.org',
  },
  {
    id: 'zig-comptime-generics',
    title: 'Zig comptime: Generics Without a Generics System',
    language: 'Zig',
    category: 'Language Design Insights',
    conceptTags: ['comptime', 'generics', 'compile-time evaluation'],
    code: `fn max(comptime T: type, a: T, b: T) T {
    return if (a > b) a else b;
}

const int_max = max(u32, 10, 20);       // 20
const float_max = max(f64, 3.14, 2.72); // 3.14

fn Matrix(comptime T: type, comptime rows: usize, comptime cols: usize) type {
    return struct {
        data: [rows][cols]T,

        pub fn zero() @This() {
            return .{ .data = .{.{0} ** cols} ** rows };
        }
    };
}

const Mat3x3 = Matrix(f32, 3, 3);
var m = Mat3x3.zero();`,
    explanation:
      'Zig has no special generics syntax. Instead, it lets certain function parameters be evaluated at compile time using the comptime keyword. The max function takes a type as its first argument and works with any comparable type. The Matrix function takes a type and dimensions and returns an entirely new struct type — all before the program runs.',
    whyElegant:
      'Other languages bolt on generics as a separate feature with its own syntax, rules, and error messages. Zig reuses its existing language — functions, structs, if-statements — and simply runs them at compile time. One mechanism serves where other languages need two or three.',
    keyInsight:
      'Compile-time evaluation of ordinary code can replace an entire generics subsystem, keeping the language small while retaining full type-parameterized programming.',
    analogy:
      'A bakery that uses the same mixer for every kind of dough — the tool is general enough that you do not need a separate machine for each recipe.',
    sourceNote: 'Zig Language Reference, ziglang.org',
  },
  {
    id: 'd-alias-this',
    title: 'D alias this: Transparent Wrapper Types',
    language: 'D',
    category: 'Language Design Insights',
    conceptTags: ['alias this', 'subtyping', 'wrapper'],
    code: `import std.stdio;

struct Meters {
    double value;
    alias value this;   // Meters implicitly converts to double

    Meters opBinary(string op)(Meters rhs) if (op == "+") {
        return Meters(value + rhs.value);
    }
}

void printLength(double d) {
    writeln("Length: ", d);
}

void main() {
    auto a = Meters(3.5);
    auto b = Meters(1.5);
    auto c = a + b;          // uses custom operator
    printLength(c);           // implicit conversion to double
    double raw = c;           // also works
    writeln(raw);             // 5.0
}`,
    explanation:
      'The "alias this" declaration tells the compiler that a Meters value can be transparently used wherever a plain double is expected. The wrapper adds type safety and custom operators for Meters-specific math, but you can still pass it to any function expecting a double without an explicit conversion.',
    whyElegant:
      'You get the safety of a distinct type (no accidentally adding Meters to Seconds) with zero friction when you need the underlying value. The wrapper becomes invisible at the call site, removing the tension between type safety and convenience.',
    keyInsight:
      'alias this lets you create new types that are distinct where you want safety and transparent where you want interoperability.',
    analogy:
      'A gift card for a specific store that also works as a regular credit card everywhere else — restricted when the restriction helps, unrestricted otherwise.',
    sourceNote: 'D Language Specification, dlang.org',
  },
  {
    id: 'cpp-crtp-static-polymorphism',
    title: 'C++ CRTP: Inheritance Without the Runtime Cost',
    language: 'C++',
    category: 'Language Design Insights',
    conceptTags: ['CRTP', 'static polymorphism', 'templates'],
    code: `template <typename Derived>
struct Shape {
    void draw() const {
        static_cast<const Derived*>(this)->drawImpl();
    }

    double area() const {
        return static_cast<const Derived*>(this)->areaImpl();
    }
};

struct Circle : Shape<Circle> {
    double radius;
    Circle(double r) : radius(r) {}

    void drawImpl() const { /* draw circle */ }
    double areaImpl() const { return 3.14159 * radius * radius; }
};

struct Square : Shape<Square> {
    double side;
    Square(double s) : side(s) {}

    void drawImpl() const { /* draw square */ }
    double areaImpl() const { return side * side; }
};`,
    explanation:
      'Normally, calling different implementations through a shared base class requires a virtual function table — a runtime lookup. Here, the base class is a template that already knows the derived type at compile time. The compiler resolves every call statically, so there is zero runtime overhead for polymorphism.',
    whyElegant:
      'You get the organizational benefits of a shared interface — every shape has draw() and area() — without paying the performance cost of runtime dispatch. The pattern is strange on first reading (a class inheriting from a template of itself), but it eliminates an entire category of indirection.',
    keyInsight:
      'Passing the derived type as a template parameter to the base class lets the compiler resolve polymorphic calls at compile time instead of at runtime.',
    analogy:
      'A name tag that already lists everything you can do — anyone reading it knows your skills instantly without having to ask you.',
    sourceNote: 'James Coplien, "Curiously Recurring Template Patterns," C++ Report, 1995',
  },
  {
    id: 'cpp-constexpr-fibonacci',
    title: 'C++ constexpr: Programs That Run Inside the Compiler',
    language: 'C++',
    category: 'Language Design Insights',
    conceptTags: ['constexpr', 'compile-time computation', 'zero cost'],
    code: `constexpr int fibonacci(int n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

// Computed entirely at compile time
static_assert(fibonacci(0) == 0);
static_assert(fibonacci(10) == 55);
static_assert(fibonacci(20) == 6765);

// The compiled binary contains just the number 6765
// No function call happens at runtime
constexpr int result = fibonacci(20);`,
    explanation:
      'The constexpr keyword tells the compiler it may evaluate this function at compile time. When called with constant arguments, the compiler runs the Fibonacci computation itself and bakes the result directly into the executable. At runtime, the answer is already there — no calculation needed.',
    whyElegant:
      'The function is written in normal C++ with normal recursion. There is no separate compile-time language or macro system. The same code can run at compile time or runtime depending on context, and the compiler is smart enough to know when it can pre-compute the answer.',
    keyInsight:
      'constexpr lets you write computation once in ordinary syntax and have the compiler decide whether to execute it before or during runtime.',
    analogy:
      'Pre-computing your grocery total at home so you can walk to the register and pay the exact amount without waiting for the cashier to scan anything.',
    sourceNote: 'C++11 Standard, N3337, constexpr specifier',
  },
  {
    id: 'cpp-fold-expression',
    title: 'C++ Fold Expressions: Collapsing a Parameter Pack in One Line',
    language: 'C++',
    category: 'Language Design Insights',
    conceptTags: ['fold expression', 'variadic templates', 'parameter pack'],
    code: `#include <iostream>
#include <string>

template <typename... Args>
auto sum(Args... args) {
    return (args + ...);  // right fold over +
}

template <typename... Args>
void printAll(Args... args) {
    ((std::cout << args << " "), ...);  // fold over comma
    std::cout << "\\n";
}

int main() {
    std::cout << sum(1, 2, 3, 4, 5) << "\\n";  // 15
    std::cout << sum(1.5, 2.5) << "\\n";         // 4.0

    printAll("hello", 42, 3.14, "world");
    // hello 42 3.14 world
}`,
    explanation:
      'A fold expression takes a variable number of arguments and combines them all with a single operator. (args + ...) means "add the first to the second, then add the third, and so on." The compiler generates exactly the right chain of operations for however many arguments you provide.',
    whyElegant:
      'Before C++17, summing a parameter pack required recursive template instantiation — a separate function for each step. Fold expressions collapse that into a single, readable line. The compiler unrolls the fold into optimal code at compile time.',
    keyInsight:
      'Fold expressions reduce a variadic operation from recursive template machinery to a single expression that mirrors mathematical notation.',
    analogy:
      'An accordion — no matter how many folds it has, one squeeze collapses them all into a single compact shape.',
    sourceNote: 'C++17 Standard, N4659, fold expressions',
  },
  {
    id: 'cpp-structured-bindings',
    title: 'C++ Structured Bindings: Unpacking Without the Ceremony',
    language: 'C++',
    category: 'Language Design Insights',
    conceptTags: ['structured bindings', 'destructuring', 'readability'],
    code: `#include <map>
#include <string>
#include <iostream>

std::map<std::string, int> scores = {
    {"Alice", 95}, {"Bob", 87}, {"Carol", 92}
};

// Before C++17: clunky iterator access
// for (auto it = scores.begin(); it != scores.end(); ++it)
//     std::cout << it->first << ": " << it->second;

// With structured bindings: clean and direct
for (const auto& [name, score] : scores) {
    std::cout << name << " scored " << score << "\\n";
}

// Also works with tuples and structs
auto [min_it, max_it] = std::minmax_element(
    scores.begin(), scores.end(),
    [](const auto& a, const auto& b) { return a.second < b.second; }
);`,
    explanation:
      'Structured bindings let you unpack a pair, tuple, or struct into named variables in one declaration. Instead of accessing .first and .second on a map entry, you give each part a descriptive name right where you use it.',
    whyElegant:
      'The code reads as a statement of intent: "for each name and score in the map." Before structured bindings, the same loop required accessor syntax that obscured what the variables meant. Naming things at the point of unpacking makes the code self-documenting.',
    keyInsight:
      'Structured bindings trade positional or accessor-based access for named access, turning data unpacking into a declaration of meaning.',
    analogy:
      'Opening a labeled box and finding compartments marked "name" and "score" instead of "slot 1" and "slot 2."',
    sourceNote: 'C++17 Standard, N4659, structured bindings declaration',
  },
  {
    id: 'rust-impl-trait-return',
    title: 'Rust impl Trait: Abstract Returns Without Boxes',
    language: 'Rust',
    category: 'Language Design Insights',
    conceptTags: ['impl Trait', 'zero cost abstraction', 'type erasure'],
    code: `fn make_adder(x: i32) -> impl Fn(i32) -> i32 {
    move |y| x + y
}

fn evens_only(limit: u32) -> impl Iterator<Item = u32> {
    (0..limit).filter(|n| n % 2 == 0)
}

fn main() {
    let add_five = make_adder(5);
    println!("{}", add_five(3));  // 8

    let evens: Vec<u32> = evens_only(10).collect();
    println!("{:?}", evens);  // [0, 2, 4, 6, 8]
}`,
    explanation:
      'The "impl Trait" syntax in a return position means "I am returning some specific type that implements this trait, but I am not telling you which one." The compiler knows the exact type and optimizes accordingly, but the caller only sees the interface.',
    whyElegant:
      'Without impl Trait, returning a closure or a chain of iterator adapters requires heap allocation (Box<dyn ...>). With it, the concrete type stays on the stack and gets fully inlined. You get the flexibility of an abstract interface with the performance of a concrete type.',
    keyInsight:
      'impl Trait lets functions hide their concrete return type behind a trait bound while the compiler still monomorphizes for zero-cost abstraction.',
    analogy:
      'A vending machine that always dispenses the right drink — you interact with one button labeled "cold beverage," but the machine knows exactly which bottle to grab and does it at full speed.',
    sourceNote: 'RFC 1522, Rust, impl Trait in return position',
  },
  {
    id: 'rust-question-mark-operator',
    title: 'Rust ? Operator: Error Handling Without the Noise',
    language: 'Rust',
    category: 'Language Design Insights',
    conceptTags: ['error handling', 'Result', 'ergonomics'],
    code: `use std::fs;
use std::io;
use std::num;

#[derive(Debug)]
enum AppError {
    Io(io::Error),
    Parse(num::ParseIntError),
}

impl From<io::Error> for AppError {
    fn from(e: io::Error) -> Self { AppError::Io(e) }
}

impl From<num::ParseIntError> for AppError {
    fn from(e: num::ParseIntError) -> Self { AppError::Parse(e) }
}

fn read_age(path: &str) -> Result<u32, AppError> {
    let text = fs::read_to_string(path)?;   // IO error? return early
    let age = text.trim().parse::<u32>()?;   // parse error? return early
    Ok(age)
}`,
    explanation:
      'The ? at the end of an expression checks whether it succeeded or failed. If it failed, the function returns the error immediately to the caller. If it succeeded, the value is unwrapped and execution continues. Two question marks replace what would otherwise be two separate blocks of error-checking code.',
    whyElegant:
      'The happy path reads top to bottom without interruption: read the file, parse the number, return the age. Each ? is a single character that encodes "if this failed, stop here and tell the caller." Errors are handled rigorously without cluttering the logic.',
    keyInsight:
      'The ? operator compresses explicit error propagation into a single character, keeping the success path unbroken while guaranteeing every error is addressed.',
    analogy:
      'A series of locked doors where each key either opens the next door or sends you back to the entrance — you only reach the end if every door opens.',
    sourceNote: 'RFC 243, Rust, the ? operator',
  },
  {
    id: 'rust-lifetime-elision',
    title: 'Rust Lifetime Elision: The Compiler Reads Your Mind',
    language: 'Rust',
    category: 'Language Design Insights',
    conceptTags: ['lifetimes', 'elision', 'ergonomics'],
    code: `// What you write — no lifetime annotations needed:
fn first_word(s: &str) -> &str {
    s.split_whitespace().next().unwrap_or("")
}

// What the compiler infers, applying elision rules:
// fn first_word<'a>(s: &'a str) -> &'a str

fn longest<'a>(a: &'a str, b: &'a str) -> &'a str {
    if a.len() >= b.len() { a } else { b }
}

fn main() {
    let sentence = String::from("hello world");
    let word = first_word(&sentence);
    println!("{}", word);  // "hello"
}`,
    explanation:
      'Rust tracks how long every reference is valid to prevent dangling pointers. Most of the time, the rules are predictable enough that the compiler fills in the annotations automatically. "first_word" has no lifetime markers because the compiler can see that the output borrows from the input. "longest" needs an explicit annotation because two inputs make the relationship ambiguous.',
    whyElegant:
      'Lifetimes are Rust\'s most powerful safety feature and its most feared syntax. Elision rules make 90% of functions look as clean as any garbage-collected language while retaining full compile-time memory safety. You only pay in annotation complexity when genuine ambiguity exists.',
    keyInsight:
      'Lifetime elision rules encode the most common borrowing patterns, letting programmers skip annotations for the easy cases and write them only when the compiler genuinely cannot infer the answer.',
    analogy:
      'A librarian who tracks which books are on loan — for single-borrower checkouts she fills in the return date automatically, but asks you to specify when multiple people share a book.',
    sourceNote: 'The Rust Reference, lifetime elision rules',
  },
  {
    id: 'kotlin-extension-on-nullable',
    title: 'Kotlin Extension Functions on Nullable Types',
    language: 'Kotlin',
    category: 'Language Design Insights',
    conceptTags: ['extension function', 'null safety', 'ergonomics'],
    code: `fun String?.isNullOrShort(maxLen: Int = 3): Boolean =
    this == null || this.length <= maxLen

val name: String? = null
val shortName: String? = "Hi"
val longName: String? = "Hello, World"

println(name.isNullOrShort())       // true  (null)
println(shortName.isNullOrShort())  // true  (length 2)
println(longName.isNullOrShort())   // false (length 12)

// No null check needed at the call site —
// the function handles null internally`,
    explanation:
      'Kotlin lets you define new methods on existing types, including nullable types. This function extends String? (a string that might be null) with a method that safely checks for null or short length. The caller writes natural method-call syntax without any null checking.',
    whyElegant:
      'In most languages, calling a method on a null value crashes. Kotlin lets you define methods that explicitly accept null as a valid receiver, moving the null-handling logic into the function definition and keeping every call site clean.',
    keyInsight:
      'Extension functions on nullable types let you encapsulate null-handling once and call it everywhere with normal dot syntax.',
    analogy:
      'A doorbell that works whether someone is home or not — pressing it always produces a definite answer instead of silence or an error.',
    sourceNote: 'Kotlin Language Documentation, kotlinlang.org',
  },
  {
    id: 'kotlin-by-lazy',
    title: 'Kotlin by lazy: Computed Once, Remembered Forever',
    language: 'Kotlin',
    category: 'Language Design Insights',
    conceptTags: ['delegation', 'lazy initialization', 'thread safety'],
    code: `class DatabaseConnection {
    val config: Map<String, String> by lazy {
        println("Loading config from disk...")
        mapOf(
            "host" to "localhost",
            "port" to "5432",
            "db" to "myapp"
        )
    }
}

fun main() {
    val db = DatabaseConnection()
    println("Connection created")   // config not loaded yet
    println(db.config["host"])      // "Loading config..." then "localhost"
    println(db.config["port"])      // "5432" — no reload, cached
}`,
    explanation:
      'The "by lazy" delegate means the config value is not computed when the object is created. The first time someone reads it, the block runs and the result is stored. Every subsequent read returns the cached value instantly. The initialization is also thread-safe by default.',
    whyElegant:
      'Two words — "by lazy" — replace what would otherwise require a nullable backing field, a null check, a synchronization block, and a getter method. The delegation mechanism handles all of that invisibly.',
    keyInsight:
      'Property delegation lets you attach reusable behaviors like lazy initialization to any property with two keywords instead of boilerplate code.',
    analogy:
      'A motion-sensor porch light — it stays off until someone actually walks up, then stays on as long as needed.',
    sourceNote: 'Kotlin Language Documentation, delegated properties',
  },
  {
    id: 'kotlin-sealed-class-when',
    title: 'Kotlin Sealed Classes: Patterns the Compiler Can Count',
    language: 'Kotlin',
    category: 'Language Design Insights',
    conceptTags: ['sealed class', 'exhaustive matching', 'type safety'],
    code: `sealed class NetworkResult {
    data class Success(val data: String) : NetworkResult()
    data class Error(val code: Int, val message: String) : NetworkResult()
    data object Loading : NetworkResult()
}

fun render(result: NetworkResult): String = when (result) {
    is NetworkResult.Success -> "Data: \${result.data}"
    is NetworkResult.Error   -> "Error \${result.code}: \${result.message}"
    NetworkResult.Loading    -> "Loading..."
    // no else needed — compiler knows all cases are covered
}

val response: NetworkResult = NetworkResult.Success("hello")
println(render(response))  // "Data: hello"`,
    explanation:
      'A sealed class defines a closed set of possible subtypes. Because the compiler knows every variant, the "when" expression can check that every case is handled. If you later add a new variant, the compiler flags every "when" that needs updating.',
    whyElegant:
      'The compiler becomes your accountant, verifying that you handled every possible state. Adding a new network result variant causes compile errors at every place that forgot to handle it, turning runtime surprises into compile-time checklists.',
    keyInsight:
      'Sealed classes turn type hierarchies into enumerable sets, letting the compiler enforce exhaustive handling wherever pattern matching is used.',
    analogy:
      'A form with checkboxes for every possible answer — you cannot submit it until every box is checked or crossed out.',
    sourceNote: 'Kotlin Language Documentation, sealed classes',
  },
  {
    id: 'dart-cascade-operator',
    title: 'Dart Cascade Operator: Configure Without Naming',
    language: 'Dart',
    category: 'Language Design Insights',
    conceptTags: ['cascade', 'fluent API', 'conciseness'],
    code: `class Paint {
  String color = 'black';
  double strokeWidth = 1.0;
  String style = 'fill';
  bool antiAlias = false;

  void apply() => print('\$color \$style, width=\$strokeWidth, aa=\$antiAlias');
}

void main() {
  // Without cascades: repeat the variable name every line
  // var paint = Paint();
  // paint.color = 'blue';
  // paint.strokeWidth = 3.0;
  // paint.style = 'stroke';
  // paint.antiAlias = true;
  // paint.apply();

  // With cascades: configure and use in one expression
  Paint()
    ..color = 'blue'
    ..strokeWidth = 3.0
    ..style = 'stroke'
    ..antiAlias = true
    ..apply();
}`,
    explanation:
      'The ".." operator calls a method or sets a property on an object but returns the original object instead of the method\'s result. This lets you chain multiple operations on the same object without repeating its name or requiring the class to be designed for chaining.',
    whyElegant:
      'Most fluent APIs require each method to return "this," which pollutes the class design. Dart\'s cascade is an operator-level feature — any class gets chainable configuration for free, without modifying a single method signature.',
    keyInsight:
      'The cascade operator moves fluent chaining from a class design pattern to a language-level feature, making any object chainable without class cooperation.',
    analogy:
      'Filling out a form attached to a clipboard — you write in each field and the clipboard stays in your hands the whole time, no need to pick it up between lines.',
    sourceNote: 'Dart Language Tour, dart.dev',
  },
  {
    id: 'groovy-builder-dsl',
    title: 'Groovy Builders: Nesting That Mirrors Structure',
    language: 'Groovy',
    category: 'Language Design Insights',
    conceptTags: ['builder', 'DSL', 'closures'],
    code: `import groovy.xml.MarkupBuilder

def writer = new StringWriter()
def xml = new MarkupBuilder(writer)

xml.library {
    book(isbn: '978-0-13-468599-1') {
        title 'The Pragmatic Programmer'
        author 'David Thomas'
        author 'Andrew Hunt'
        year 2019
    }
    book(isbn: '978-0-596-51774-8') {
        title 'JavaScript: The Good Parts'
        author 'Douglas Crockford'
        year 2008
    }
}

println writer.toString()
// Produces well-formed XML with proper nesting`,
    explanation:
      'Groovy\'s MarkupBuilder uses closures and method_missing-style metaprogramming to turn nested code blocks into nested XML. Each method name becomes a tag, named parameters become attributes, and closure nesting becomes element nesting. The code structure is the document structure.',
    whyElegant:
      'There are no angle brackets, no closing tags, no string concatenation. The Groovy code looks like a table of contents for the XML it produces. The visual nesting in the source code matches the hierarchical nesting in the output, making the mapping from code to document instantly visible.',
    keyInsight:
      'When the syntactic structure of your code matches the logical structure of your output, the code becomes a readable specification of the result.',
    analogy:
      'An outline for an essay where each indentation level in your notes corresponds to a heading level in the final document.',
    sourceNote: 'Groovy Documentation, MarkupBuilder, groovy-lang.org',
  },
];
