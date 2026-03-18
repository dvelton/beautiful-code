import type { CuratedExample } from '../../types';

export const javascriptTypescript: CuratedExample[] = [
{
    id: "js-reduce-reimplementation",
    title: "Array.reduce reimplementing map and filter",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["functional programming", "array methods", "reduce", "abstraction"],
    code: `// Instead of chaining map and filter
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(x => x * 2).filter(x => x > 4);

// Use reduce to do both in one pass
const doubledFiltered = numbers.reduce((acc, x) => {
  const doubled = x * 2;
  if (doubled > 4) acc.push(doubled);
  return acc;
}, []);

// Generic reusable pattern
function mapFilter(array, mapFn, filterFn) {
  return array.reduce((acc, item) => {
    const mapped = mapFn(item);
    if (filterFn(mapped)) acc.push(mapped);
    return acc;
  }, []);
}

const result = mapFilter([1, 2, 3, 4, 5], x => x * 2, x => x > 4);`,
    explanation: "This shows how reduce() can replace multiple array operations in one go. Instead of going through an array twice (once to transform each item, once to filter), reduce lets you do both steps in a single pass through the data.",
    whyElegant: "It's like having one worker do two jobs in sequence rather than passing work between two separate workers - more efficient and less intermediate storage needed.",
    keyInsight: "Reduce is the Swiss Army knife of array methods that can replicate any other array transformation.",
    analogy: "Like an assembly line worker who can both paint a part AND inspect it for quality in one station, rather than having the part move to two separate stations.",
    sourceNote: "Classic functional programming pattern for efficient data transformation"
  },
  {
    id: "js-optional-chaining",
    title: "Optional chaining ?. eliminating guard clauses",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["safety", "null handling", "property access", "modern syntax"],
    code: `// Old way: lots of guard clauses
function getStreetName(user) {
  if (user && user.address && user.address.street) {
    return user.address.street.name;
  }
  return 'Unknown';
}

// New way: optional chaining
function getStreetNameModern(user) {
  return user?.address?.street?.name || 'Unknown';
}

// Works with arrays and function calls too
const firstFriend = user?.friends?.[0];
const result = api?.getData?.();

// Especially powerful with complex nested data
const config = {
  theme: {
    colors: {
      primary: '#blue'
    }
  }
};

const primaryColor = config?.theme?.colors?.primary ?? '#default';`,
    explanation: "Optional chaining (?.) lets you safely access nested properties without worrying about errors if something in the chain doesn't exist. If any part is null or undefined, it just returns undefined instead of crashing.",
    whyElegant: "Transforms defensive programming from verbose if-statements into clean, readable chains that express intent clearly.",
    keyInsight: "Optional chaining turns 'check every step' into 'try the path and fail gracefully'.",
    analogy: "Like asking for directions to 'the red house on Oak Street in the town square' - if any part doesn't exist, you just get 'not found' instead of getting lost.",
    sourceNote: "ES2020 feature that revolutionized safe property access"
  },
  {
    id: "js-nullish-coalescing",
    title: "Nullish coalescing ??",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["null handling", "default values", "falsy values", "modern syntax"],
    code: `// Problem: || operator treats 0, '', false as 'missing'
function setDefaults(options) {
  return {
    timeout: options.timeout || 5000,      // Bug! 0 becomes 5000
    retries: options.retries || 3,         // Bug! 0 becomes 3  
    debug: options.debug || false,         // Bug! false becomes false (ok)
    message: options.message || 'Error'    // Bug! '' becomes 'Error'
  };
}

// Solution: ?? only treats null/undefined as 'missing'
function setDefaultsCorrect(options) {
  return {
    timeout: options.timeout ?? 5000,     // 0 stays 0
    retries: options.retries ?? 3,        // 0 stays 0
    debug: options.debug ?? false,        // false stays false
    message: options.message ?? 'Error'   // '' stays ''
  };
}

// Real-world example
const userPreferences = {
  notifications: false,  // User explicitly disabled
  maxResults: 0         // User wants no limit
};

const config = {
  notifications: userPreferences.notifications ?? true,  // Respects false
  maxResults: userPreferences.maxResults ?? 10          // Respects 0
};`,
    explanation: "Nullish coalescing (??) gives you a default value only when something is actually missing (null or undefined), not when it's just 'falsy' like 0, false, or empty string. This prevents accidentally overriding intentional values.",
    whyElegant: "It respects the difference between 'I want zero' and 'I didn't specify anything', which is crucial for user preferences and API parameters.",
    keyInsight: "Nullish coalescing distinguishes between 'empty by choice' and 'actually missing'.",
    analogy: "Like asking 'Did you bring lunch?' vs 'Do you want lunch?' - an empty lunchbox means they chose not to eat, not that they forgot their lunch.",
    sourceNote: "ES2020 operator that fixed a major pain point with || defaults"
  },
  {
    id: "js-promise-all-parallel",
    title: "Promise.all parallel fetch pattern",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["async", "parallel processing", "performance", "promises"],
    code: `// Slow: sequential requests (3 seconds total)
async function fetchSequential() {
  const user = await fetch('/api/user');
  const posts = await fetch('/api/posts');  
  const comments = await fetch('/api/comments');
  
  return {
    user: await user.json(),
    posts: await posts.json(),
    comments: await comments.json()
  };
}

// Fast: parallel requests (1 second total)
async function fetchParallel() {
  const [userRes, postsRes, commentsRes] = await Promise.all([
    fetch('/api/user'),
    fetch('/api/posts'),
    fetch('/api/comments')
  ]);
  
  return {
    user: await userRes.json(),
    posts: await postsRes.json(), 
    comments: await commentsRes.json()
  };
}

// Even cleaner with destructuring
async function fetchData() {
  const [user, posts, comments] = await Promise.all([
    fetch('/api/user').then(r => r.json()),
    fetch('/api/posts').then(r => r.json()),
    fetch('/api/comments').then(r => r.json())
  ]);
  
  return { user, posts, comments };
}`,
    explanation: "Promise.all lets multiple asynchronous operations run at the same time instead of waiting for each one to finish before starting the next. If three API calls each take 1 second, running them in parallel takes 1 second total instead of 3.",
    whyElegant: "Transforms waiting time from additive to concurrent, dramatically improving performance when operations don't depend on each other.",
    keyInsight: "Promise.all turns sequential waiting into parallel execution, multiplying performance when tasks are independent.",
    analogy: "Like sending three friends to three different stores at the same time, rather than sending one friend to all three stores in sequence.",
    sourceNote: "Essential pattern for optimizing async operations in modern web apps"
  },
  {
    id: "js-async-await-vs-callbacks",
    title: "Async/await vs callback pyramid contrast",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["async", "callbacks", "readability", "error handling"],
    code: `// Callback pyramid of doom
function processUserData(userId, callback) {
  getUser(userId, (err, user) => {
    if (err) return callback(err);
    
    getPosts(user.id, (err, posts) => {
      if (err) return callback(err);
      
      getComments(posts[0].id, (err, comments) => {
        if (err) return callback(err);
        
        updateStats(user.id, comments.length, (err, stats) => {
          if (err) return callback(err);
          
          callback(null, { user, posts, comments, stats });
        });
      });
    });
  });
}

// Async/await: reads like synchronous code
async function processUserDataModern(userId) {
  try {
    const user = await getUser(userId);
    const posts = await getPosts(user.id);  
    const comments = await getComments(posts[0].id);
    const stats = await updateStats(user.id, comments.length);
    
    return { user, posts, comments, stats };
  } catch (error) {
    throw error; // Single error handling point
  }
}

// Usage comparison
// Callback style
processUserData('123', (err, result) => {
  if (err) console.error(err);
  else console.log(result);
});

// Async/await style  
try {
  const result = await processUserDataModern('123');
  console.log(result);
} catch (error) {
  console.error(error);
}`,
    explanation: "Callbacks create deeply nested code that's hard to read and error-prone. Async/await lets you write asynchronous code that looks and reads like normal, step-by-step code, while still being non-blocking under the hood.",
    whyElegant: "It eliminates the mental overhead of tracking nested callbacks and provides a single, consistent way to handle both success and error cases.",
    keyInsight: "Async/await transforms callback spaghetti into linear, readable code that matches how we think about sequential steps.",
    analogy: "Like following a recipe with clear steps (1, 2, 3) instead of having to read nested parentheses within parentheses within parentheses.",
    sourceNote: "ES2017 feature that made asynchronous JavaScript dramatically more readable"
  },
  {
    id: "js-tagged-template-literals",
    title: "Tagged template literals for SQL safety",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["security", "SQL injection", "template literals", "parsing"],
    code: `// Dangerous: vulnerable to SQL injection
function queryUnsafe(name, age) {
  const sql = \`SELECT * FROM users WHERE name = '\${name}' AND age = \${age}\`;
  return db.query(sql);
}
// If name = "'; DROP TABLE users; --" = disaster!

// Safe: tagged template literal prevents injection
function sql(strings, ...values) {
  let query = '';
  let params = [];
  
  for (let i = 0; i < strings.length; i++) {
    query += strings[i];
    if (i < values.length) {
      query += '?'; // Placeholder
      params.push(values[i]); // Separate parameter
    }
  }
  
  return { query, params };
}

// Usage: automatically safe
function queryUsers(name, age) {
  const { query, params } = sql\`
    SELECT * FROM users 
    WHERE name = \${name} 
    AND age = \${age}
  \`;
  return db.query(query, params);
}

// Advanced: typed queries
function typedSql(strings, ...values) {
  const processed = sql(strings, ...values);
  return {
    ...processed,
    execute: () => db.query(processed.query, processed.params)
  };
}

const result = await typedSql\`
  SELECT id, name FROM users WHERE active = \${true}
\`.execute();`,
    explanation: "Tagged template literals let you intercept and process template strings before they become regular strings. This allows you to safely handle user input in SQL queries by separating the query structure from the data values.",
    whyElegant: "It provides SQL injection protection with syntax that looks natural and readable, while automatically handling the complex escaping logic behind the scenes.",
    keyInsight: "Tagged templates transform dangerous string interpolation into safe, parameterized queries automatically.",
    analogy: "Like having a security guard who checks every visitor's ID before letting them into the building, but the process is invisible to you - you just walk normally.",
    sourceNote: "Powerful ES6 feature often overlooked but crucial for secure database interactions"
  },
  {
    id: "js-proxy-observable",
    title: "Proxy for observable objects",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["proxy", "reactivity", "observation", "meta-programming"],
    code: `// Create an observable object that notifies on changes
function createObservable(target, onChange) {
  return new Proxy(target, {
    set(obj, prop, value, receiver) {
      const oldValue = obj[prop];
      const result = Reflect.set(obj, prop, value, receiver);
      
      if (oldValue !== value) {
        onChange(prop, value, oldValue);
      }
      
      return result;
    },
    
    get(obj, prop, receiver) {
      const value = Reflect.get(obj, prop, receiver);
      
      // Track property access for dependency tracking
      if (typeof value !== 'function') {
        console.log(\`Accessed property: \${prop}\`);
      }
      
      return value;
    }
  });
}

// Usage example
const user = createObservable(
  { name: 'John', age: 30 },
  (prop, newVal, oldVal) => {
    console.log(\`\${prop} changed from \${oldVal} to \${newVal}\`);
    // Update UI, save to database, etc.
  }
);

user.name = 'Jane'; // Logs: "name changed from John to Jane"
user.age = 31;      // Logs: "age changed from 30 to 31"

// Advanced: nested observability
function deepObservable(target, onChange) {
  return new Proxy(target, {
    set(obj, prop, value, receiver) {
      if (typeof value === 'object' && value !== null) {
        value = deepObservable(value, onChange);
      }
      
      const oldValue = obj[prop];
      const result = Reflect.set(obj, prop, value, receiver);
      
      if (oldValue !== value) {
        onChange(\`\${prop}\`, value, oldValue);
      }
      
      return result;
    }
  });
}`,
    explanation: "A Proxy wraps an object and intercepts operations like getting or setting properties. This lets you add automatic behavior (like notifications) whenever someone interacts with the object, without changing how the object is used.",
    whyElegant: "It provides powerful reactivity and observation capabilities with zero syntax overhead - the object behaves exactly as normal while gaining superpowers.",
    keyInsight: "Proxies add invisible middleware to objects, enabling reactive programming without changing how you interact with data.",
    analogy: "Like having an invisible assistant who watches everything you do with a filing cabinet and can automatically update related documents whenever you change a file.",
    sourceNote: "ES6 Proxy enables the reactivity systems used by modern frameworks like Vue 3"
  },
  {
    id: "js-weakmap-private-data",
    title: "WeakMap for private class data",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["privacy", "encapsulation", "WeakMap", "classes"],
    code: `// Private data storage
const privateData = new WeakMap();

class BankAccount {
  constructor(initialBalance) {
    // Store private data in WeakMap
    privateData.set(this, {
      balance: initialBalance,
      pin: Math.random().toString(36).slice(2)
    });
  }
  
  // Public methods access private data
  getBalance(enteredPin) {
    const data = privateData.get(this);
    if (enteredPin !== data.pin) {
      throw new Error('Invalid PIN');
    }
    return data.balance;
  }
  
  deposit(amount) {
    const data = privateData.get(this);
    data.balance += amount;
    return this;
  }
  
  withdraw(amount, enteredPin) {
    const data = privateData.get(this);
    if (enteredPin !== data.pin) {
      throw new Error('Invalid PIN');
    }
    if (amount > data.balance) {
      throw new Error('Insufficient funds');
    }
    data.balance -= amount;
    return this;
  }
}

// Usage
const account = new BankAccount(1000);
account.deposit(500);

// This is impossible - no way to access private data
console.log(account.balance); // undefined
console.log(account.pin);     // undefined

// Only through proper methods
console.log(account.getBalance('correct-pin')); // 1500

// Automatic cleanup when object is garbage collected
// WeakMap entries are automatically removed`,
    explanation: "WeakMap creates truly private storage for class instances. Unlike regular properties that can be accessed from outside, WeakMap data is completely hidden and automatically cleaned up when the object is no longer used.",
    whyElegant: "It provides genuine privacy without syntax overhead, and automatically handles memory cleanup that would be manual work with other approaches.",
    keyInsight: "WeakMap creates genuinely private storage that's impossible to access from outside the class and automatically memory-managed.",
    analogy: "Like a safety deposit box at a bank - only you have the key, and when you're gone, the box is automatically removed with no trace.",
    sourceNote: "Pre-private fields solution that's still valuable for complex privacy patterns"
  },
  {
    id: "js-generator-lazy-sequence",
    title: "Generator function as lazy sequence",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["generators", "lazy evaluation", "memory efficiency", "iteration"],
    code: `// Eager: loads everything into memory at once
function getAllNumbers(max) {
  const numbers = [];
  for (let i = 0; i <= max; i++) {
    numbers.push(i * i); // All computed immediately
  }
  return numbers;
}

// Memory problem with large datasets
const millionSquares = getAllNumbers(1000000); // 🔥 Memory explosion

// Lazy: generates values on-demand
function* generateSquares(max) {
  for (let i = 0; i <= max; i++) {
    console.log(\`Computing square of \${i}\`); // Only when needed
    yield i * i;
  }
}

// Memory efficient - only one value at a time
const squares = generateSquares(1000000);

// Take only what you need
function* take(iterable, count) {
  let taken = 0;
  for (const value of iterable) {
    if (taken >= count) break;
    yield value;
    taken++;
  }
}

// Only computes first 5 squares
for (const square of take(squares, 5)) {
  console.log(square); // 0, 1, 4, 9, 16
}

// Composable lazy operations
function* map(iterable, fn) {
  for (const value of iterable) {
    yield fn(value);
  }
}

function* filter(iterable, predicate) {
  for (const value of iterable) {
    if (predicate(value)) yield value;
  }
}

// Chain operations - still lazy!
const pipeline = filter(
  map(generateSquares(100), x => x * 2),
  x => x > 50
);

for (const value of take(pipeline, 3)) {
  console.log(value); // First 3 doubled squares > 50
}`,
    explanation: "Generator functions create sequences that compute values only when requested, rather than creating everything upfront. This saves memory and allows working with potentially infinite sequences or very large datasets.",
    whyElegant: "It transforms expensive upfront computation into on-demand generation, enabling efficient processing of large datasets with simple, composable operations.",
    keyInsight: "Generators turn eager computation into lazy streams, trading upfront cost for on-demand efficiency.",
    analogy: "Like a bakery that makes bread only when customers order it, rather than baking all possible loaves every morning and hoping they sell.",
    sourceNote: "ES6 generators enable efficient lazy evaluation patterns common in functional programming"
  },
  {
    id: "js-symbol-iterator",
    title: "Symbol.iterator making a class iterable",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["symbols", "iteration", "protocols", "duck typing"],
    code: `// Custom collection class
class Playlist {
  constructor() {
    this.songs = [];
  }
  
  add(song) {
    this.songs.push(song);
    return this;
  }
  
  // Make it iterable with for...of
  [Symbol.iterator]() {
    let index = 0;
    const songs = this.songs;
    
    return {
      next() {
        if (index < songs.length) {
          return { value: songs[index++], done: false };
        }
        return { done: true };
      }
    };
  }
  
  // Bonus: make it work with spread operator and Array.from
  *values() {
    for (const song of this.songs) {
      yield song;
    }
  }
}

// Usage - works with all iteration protocols
const myPlaylist = new Playlist()
  .add({ title: 'Bohemian Rhapsody', artist: 'Queen' })
  .add({ title: 'Stairway to Heaven', artist: 'Led Zeppelin' })
  .add({ title: 'Hotel California', artist: 'Eagles' });

// for...of loop
for (const song of myPlaylist) {
  console.log(\`\${song.artist} - \${song.title}\`);
}

// Spread operator
const allSongs = [...myPlaylist];

// Array.from
const songTitles = Array.from(myPlaylist, song => song.title);

// Works with built-in methods
const rockSongs = Array.from(myPlaylist).filter(song => 
  song.artist.includes('Queen') || song.artist.includes('Led')
);

// Advanced: custom iteration behavior
class NumberRange {
  constructor(start, end, step = 1) {
    this.start = start;
    this.end = end;
    this.step = step;
  }
  
  *[Symbol.iterator]() {
    for (let i = this.start; i < this.end; i += this.step) {
      yield i;
    }
  }
}

const evens = new NumberRange(0, 10, 2);
console.log([...evens]); // [0, 2, 4, 6, 8]`,
    explanation: "Symbol.iterator is a special method that tells JavaScript how to loop through your custom objects. When you define this method, your object automatically works with for...of loops, spread operator, and other iteration features.",
    whyElegant: "It integrates your custom classes seamlessly with JavaScript's built-in iteration ecosystem, making them feel like native collections.",
    keyInsight: "Symbol.iterator is the bridge that makes custom objects citizens of JavaScript's iteration world.",
    analogy: "Like teaching your custom filing cabinet how to be searched through - once you explain the process, all the standard search tools work with it automatically.",
    sourceNote: "ES6 Symbol-based protocol that enables custom iteration behavior for user-defined types"
  },
{
    id: "js-destructuring-swap",
    title: "Destructuring swap [a, b] = [b, a]",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["destructuring", "array", "swap", "assignment", "es6"],
    code: `// Traditional swap (verbose)
let temp = a;
a = b;
b = temp;

// Destructuring swap (elegant)
[a, b] = [b, a];

// Works with any values
let x = 10, y = 20;
[x, y] = [y, x];
console.log(x, y); // 20, 10

// Multiple swaps in one line
let first = 1, second = 2, third = 3;
[first, second, third] = [third, first, second];`,
    explanation: "This technique lets you swap the values of two variables in a single line without needing a temporary variable. JavaScript creates a temporary array on the right side, then immediately unpacks it into the variables on the left side in the new order.",
    whyElegant: "Eliminates the boilerplate of temporary variables and makes swapping operations read like natural language - 'let a and b equal b and a'.",
    keyInsight: "Destructuring assignment leverages JavaScript's ability to create and immediately unpack arrays in a single expression.",
    analogy: "Like simultaneously picking up two playing cards and placing them down in swapped positions - what used to require three separate movements (pick up first, pick up second, put each down) now happens in one fluid motion.",
    sourceNote: "ES6 destructuring feature, widely supported in modern browsers"
  },
  {
    id: "js-object-entries-reduce-transform",
    title: "Object.entries().reduce() for object transform",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["object", "transformation", "functional", "reduce", "entries"],
    code: `// Transform object values
const prices = { apple: 1.50, banana: 0.80, orange: 2.00 };

const doubled = Object.entries(prices)
  .reduce((acc, [key, value]) => ({
    ...acc,
    [key]: value * 2
  }), {});

// Transform keys and values
const camelCase = Object.entries(prices)
  .reduce((acc, [key, value]) => ({
    ...acc,
    [key.toUpperCase()]: \`\\$\${value.toFixed(2)}\`
  }), {});

// Filter and transform
const expensive = Object.entries(prices)
  .reduce((acc, [key, value]) => 
    value > 1 ? { ...acc, [key]: value } : acc
  , {});`,
    explanation: "This pattern converts an object into key-value pairs, processes each pair, and builds a new object. Object.entries() creates an array of [key, value] pairs, then reduce() accumulates them back into a transformed object.",
    whyElegant: "Creates immutable transformations without mutating the original object, and handles complex key/value transformations that simple map operations can't achieve.",
    keyInsight: "Object.entries() bridges the gap between object manipulation and array functional programming methods.",
    analogy: "Like having a librarian take every book off the shelf, examine each one, possibly change its title or content, then put them back in a new arrangement - but leaving the original shelf untouched.",
    sourceNote: "Uses ES2017 Object.entries() and ES6 spread operator and computed property names"
  },
  {
    id: "js-array-from-range",
    title: "Array.from({length: n}, (_, i) => i) range",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["array", "range", "generator", "sequence", "iteration"],
    code: `// Create range of numbers 0-9
const range = Array.from({length: 10}, (_, i) => i);
// [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]

// Custom ranges
const from5to14 = Array.from({length: 10}, (_, i) => i + 5);
const evens = Array.from({length: 5}, (_, i) => i * 2);
const fibonacci = Array.from({length: 10}, (_, i) => 
  i <= 1 ? i : fibonacci[i-1] + fibonacci[i-2]);

// Generate complex sequences
const alphabet = Array.from({length: 26}, (_, i) => 
  String.fromCharCode(65 + i));

// Create test data
const users = Array.from({length: 100}, (_, i) => ({
  id: i,
  name: \`User\${i}\`,
  active: Math.random() > 0.5
}));`,
    explanation: "This creates arrays of specific lengths with generated content. Array.from() takes an object with a length property and uses a function to generate each element based on its index position.",
    whyElegant: "Provides a functional way to generate sequences without explicit loops, and the mapper function makes it incredibly flexible for creating any pattern or test data.",
    keyInsight: "Array.from() can treat any object with a length property as an array-like structure to transform into a real array.",
    analogy: "Like having a factory assembly line where you tell it 'make 10 items' and provide a blueprint for how to make each item based on its position in line - item 1 gets blueprint A, item 2 gets blueprint B, etc.",
    sourceNote: "ES6 Array.from() method, supported in all modern browsers"
  },
  {
    id: "js-structured-clone-vs-json",
    title: "structuredClone vs JSON round-trip",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["cloning", "deep-copy", "serialization", "objects", "modern-js"],
    code: `const original = {
  date: new Date(),
  regex: /test/g,
  map: new Map([['key', 'value']]),
  nested: { values: [1, 2, 3] },
  circular: null
};
original.circular = original; // Circular reference

// Old way: JSON round-trip (lossy, fails on circular refs)
try {
  const jsonCopy = JSON.parse(JSON.stringify(original));
  // Loses: Date becomes string, RegExp becomes {}, Map becomes {}
  // Throws: on circular references
} catch (e) {
  console.log('JSON failed on circular reference');
}

// Modern way: structuredClone (preserves types)
const structuredCopy = structuredClone(original);
console.log(structuredCopy.date instanceof Date); // true
console.log(structuredCopy.regex instanceof RegExp); // true
console.log(structuredCopy.map instanceof Map); // true

// Works with circular references
console.log(structuredCopy.circular === structuredCopy); // true`,
    explanation: "structuredClone() creates true deep copies of objects, preserving their exact types and handling circular references. JSON round-trip (stringify then parse) loses type information and fails on complex objects.",
    whyElegant: "Finally provides a native, reliable deep cloning method that handles all the edge cases that JSON round-trip couldn't, without needing external libraries.",
    keyInsight: "structuredClone() uses the same algorithm that browsers use internally for copying data between contexts, making it more reliable than JSON-based approaches.",
    analogy: "JSON round-trip is like describing a sculpture over the phone and having someone rebuild it - you lose texture, color, and fine details. structuredClone() is like using a 3D scanner and printer - every detail is preserved perfectly.",
    sourceNote: "structuredClone() is a modern web API, supported in newer browsers and Node.js 17+"
  },
  {
    id: "js-queue-microtask-vs-settimeout",
    title: "queueMicrotask vs setTimeout(0)",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["async", "event-loop", "microtasks", "timing", "performance"],
    code: `console.log('1: Synchronous');

setTimeout(() => console.log('2: setTimeout(0)'), 0);

queueMicrotask(() => console.log('3: queueMicrotask'));

Promise.resolve().then(() => console.log('4: Promise.then'));

console.log('5: Synchronous');

// Output order:
// 1: Synchronous
// 5: Synchronous  
// 3: queueMicrotask
// 4: Promise.then
// 2: setTimeout(0)

// Practical use: DOM updates
function updateUI() {
  document.getElementById('status').textContent = 'Processing...';
  
  // Heavy computation
  heavyComputation();
  
  // Ensure DOM updates before next frame
  queueMicrotask(() => {
    document.getElementById('status').textContent = 'Complete!';
  });
}`,
    explanation: "queueMicrotask() schedules code to run after the current code finishes but before the browser renders or handles other events. setTimeout(0) waits until after rendering and other tasks, making it slower for urgent updates.",
    whyElegant: "Gives precise control over when code executes in the event loop, ensuring critical updates happen at the optimal moment without blocking the main thread.",
    keyInsight: "Microtasks run before macrotasks, giving you a way to queue work that must happen before the next render cycle.",
    analogy: "setTimeout(0) is like saying 'remind me about this tomorrow' while queueMicrotask() is like saying 'remind me about this as soon as I finish this current conversation' - much more immediate priority.",
    sourceNote: "queueMicrotask() is a modern web API, part of the HTML specification for precise event loop control"
  },
  {
    id: "js-abort-controller-fetch",
    title: "AbortController for cancellable fetch",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["fetch", "cancellation", "async", "cleanup", "abort"],
    code: `// Basic cancellable fetch
const controller = new AbortController();

fetch('/api/data', { 
  signal: controller.signal 
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => {
  if (error.name === 'AbortError') {
    console.log('Request was cancelled');
  } else {
    console.log('Request failed:', error);
  }
});

// Cancel after 5 seconds
setTimeout(() => controller.abort(), 5000);

// React-style cleanup
function useApi(url) {
  const [data, setData] = useState(null);
  
  useEffect(() => {
    const controller = new AbortController();
    
    fetch(url, { signal: controller.signal })
      .then(res => res.json())
      .then(setData)
      .catch(err => {
        if (err.name !== 'AbortError') {
          console.error(err);
        }
      });
    
    return () => controller.abort(); // Cleanup
  }, [url]);
  
  return data;
}`,
    explanation: "AbortController lets you cancel ongoing network requests, preventing wasted bandwidth and avoiding stale data updates. When you call abort(), it stops the request and triggers an AbortError that you can handle gracefully.",
    whyElegant: "Provides clean cancellation semantics that prevent race conditions and resource leaks, especially important in single-page applications where users navigate quickly.",
    keyInsight: "AbortController gives you a standardized way to communicate cancellation across async operations, not just fetch requests.",
    analogy: "Like having a 'stop' button for a delivery truck that's already en route - you can call it back before it arrives with outdated information, saving time and preventing confusion.",
    sourceNote: "AbortController is part of the DOM standard, widely supported in modern browsers and Node.js"
  },
  {
    id: "js-resize-observer-vs-polling",
    title: "ResizeObserver vs polling",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["dom", "performance", "observer", "resize", "efficiency"],
    code: `// Old way: polling (inefficient)
function pollForResize(element, callback) {
  let lastWidth = element.offsetWidth;
  let lastHeight = element.offsetHeight;
  
  setInterval(() => {
    const currentWidth = element.offsetWidth;
    const currentHeight = element.offsetHeight;
    
    if (currentWidth !== lastWidth || currentHeight !== lastHeight) {
      callback({ width: currentWidth, height: currentHeight });
      lastWidth = currentWidth;
      lastHeight = currentHeight;
    }
  }, 100); // Check every 100ms
}

// Modern way: ResizeObserver (efficient)
const resizeObserver = new ResizeObserver(entries => {
  for (const entry of entries) {
    const { width, height } = entry.contentRect;
    console.log(\`Element resized: \${width}x\${height}\`);
    
    // Respond immediately to resize
    updateLayout(entry.target, width, height);
  }
});

resizeObserver.observe(document.getElementById('responsive-element'));

// Multiple elements
document.querySelectorAll('.chart').forEach(chart => {
  resizeObserver.observe(chart);
});`,
    explanation: "ResizeObserver watches elements and notifies you immediately when they change size, without constantly checking. Polling requires running code repeatedly to check for changes, wasting CPU cycles even when nothing happens.",
    whyElegant: "Event-driven rather than polling-based, so it only runs code when something actually changes, leading to better performance and more responsive interfaces.",
    keyInsight: "ResizeObserver leverages the browser's internal layout engine to efficiently detect changes rather than forcing you to poll for them.",
    analogy: "Polling is like asking 'Are we there yet?' every few seconds on a road trip. ResizeObserver is like having the driver promise to tell you the moment you arrive - much less annoying and more efficient.",
    sourceNote: "ResizeObserver is part of the Web APIs specification, supported in all modern browsers"
  },
  {
    id: "js-module-pattern-iife",
    title: "Module pattern via IIFE",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["modules", "encapsulation", "iife", "closure", "privacy"],
    code: `// Module pattern using IIFE
const Calculator = (function() {
  // Private variables and functions
  let history = [];
  
  function log(operation, result) {
    history.push(\`\${operation} = \${result}\`);
  }
  
  function validate(x, y) {
    if (typeof x !== 'number' || typeof y !== 'number') {
      throw new Error('Arguments must be numbers');
    }
  }
  
  // Public API
  return {
    add(x, y) {
      validate(x, y);
      const result = x + y;
      log(\`\${x} + \${y}\`, result);
      return result;
    },
    
    multiply(x, y) {
      validate(x, y);
      const result = x * y;
      log(\`\${x} * \${y}\`, result);
      return result;
    },
    
    getHistory() {
      return [...history]; // Return copy
    },
    
    clearHistory() {
      history = [];
    }
  };
})();

// Usage
Calculator.add(5, 3); // 8
Calculator.multiply(4, 2); // 8
console.log(Calculator.getHistory()); // ['5 + 3 = 8', '4 * 2 = 8']
// Calculator.history; // undefined (private)`,
    explanation: "This pattern creates a self-contained module with public and private parts. The IIFE (Immediately Invoked Function Expression) runs once to set up the module, keeping internal details hidden while exposing only the methods you want public.",
    whyElegant: "Provides true data privacy before JavaScript had classes or modules, and creates clean APIs where implementation details can't be accidentally accessed or modified.",
    keyInsight: "IIFE combined with closures creates a perfect capsule where private state persists but remains inaccessible from outside code.",
    analogy: "Like a vending machine - you can use the public buttons and coin slot, but you can't access the internal mechanisms, money storage, or maintenance functions. The machine keeps its own private state secure.",
    sourceNote: "Classic JavaScript pattern, predates ES6 modules but still useful for creating isolated namespaces"
  },
  {
    id: "js-memoization-closure",
    title: "Memoisation closure",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["memoization", "performance", "closure", "caching", "optimization"],
    code: `// Simple memoization
function memoize(fn) {
  const cache = new Map();
  
  return function(...args) {
    const key = JSON.stringify(args);
    
    if (cache.has(key)) {
      console.log('Cache hit!');
      return cache.get(key);
    }
    
    console.log('Computing...');
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

// Usage
const expensiveFunction = memoize((n) => {
  // Simulate expensive computation
  let result = 0;
  for (let i = 0; i < n * 1000000; i++) {
    result += i;
  }
  return result;
});

console.log(expensiveFunction(100)); // Computing... takes time
console.log(expensiveFunction(100)); // Cache hit! instant
console.log(expensiveFunction(200)); // Computing... takes time
console.log(expensiveFunction(100)); // Cache hit! instant

// Fibonacci with memoization
const fibonacci = memoize((n) => {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
});

console.log(fibonacci(40)); // Fast due to memoization`,
    explanation: "Memoization stores the results of expensive function calls so that if you call the same function with the same arguments again, it returns the cached result instead of recalculating. The closure keeps the cache private to each memoized function.",
    whyElegant: "Transparent performance optimization that doesn't change how you call the function - it just makes repeated calls with the same arguments much faster.",
    keyInsight: "Closures provide the perfect private storage mechanism for caches that need to persist across function calls without polluting the global scope.",
    analogy: "Like a student who writes down the answers to math problems in a notebook - the first time they solve '7 × 8', it takes work, but every time after that they just look it up instantly.",
    sourceNote: "Classic functional programming technique, works in any JavaScript environment with closures"
  },
  {
    id: "js-once-higher-order-function",
    title: "once() higher-order function",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["higher-order", "functional", "once", "guard", "initialization"],
    code: `// Higher-order function that ensures a function only runs once
function once(fn) {
  let called = false;
  let result;
  
  return function(...args) {
    if (!called) {
      called = true;
      result = fn.apply(this, args);
    }
    return result;
  };
}

// Usage examples
const expensiveSetup = once(() => {
  console.log('Setting up database connection...');
  return { connection: 'db://localhost:5432' };
});

const initialize = once((config) => {
  console.log('Initializing app with:', config);
  return { status: 'ready', config };
});

// Only runs once, no matter how many times called
console.log(expensiveSetup()); // "Setting up..." + returns connection
console.log(expensiveSetup()); // Returns cached connection (no log)
console.log(expensiveSetup()); // Returns cached connection (no log)

// Event handler that should only fire once
const button = document.getElementById('submit');
button.addEventListener('click', once((event) => {
  console.log('Form submitted!');
  // Expensive form processing...
  submitForm();
}));

// API call that should happen only once
const fetchUserProfile = once(async (userId) => {
  const response = await fetch(\`/api/users/\${userId}\`);
  return response.json();
});`,
    explanation: "The once() function wraps another function to ensure it can only execute one time. After the first call, subsequent calls return the same result without re-running the original function. This prevents duplicate operations and expensive recalculations.",
    whyElegant: "Provides bulletproof protection against duplicate operations with a simple, reusable wrapper that preserves the original function's interface and return value.",
    keyInsight: "Higher-order functions let you add behavior (like 'only run once') to existing functions without modifying their implementation.",
    analogy: "Like a gumball machine that only dispenses one gumball no matter how many times you turn the handle - after the first turn, you keep getting the same gumball back.",
    sourceNote: "Common functional programming utility, similar to Lodash's _.once() but implemented natively"
  },
{
    id: "ts-discriminated-union-exhaustiveness",
    title: "TypeScript discriminated union exhaustiveness check",
    language: "TypeScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["type safety", "unions", "exhaustiveness", "never type"],
    code: `type Shape = 
  | { kind: 'circle'; radius: number }
  | { kind: 'square'; size: number }
  | { kind: 'triangle'; base: number; height: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case 'circle':
      return Math.PI * shape.radius ** 2;
    case 'square':
      return shape.size ** 2;
    case 'triangle':
      return (shape.base * shape.height) / 2;
    default:
      // This ensures we handle all cases - TypeScript will error if we miss one
      const exhaustiveCheck: never = shape;
      throw new Error(\`Unhandled shape: \${exhaustiveCheck}\`);
  }
}`,
    explanation: "This pattern uses TypeScript's type system to ensure you handle every possible case in a union. If you add a new shape type but forget to handle it in the switch statement, TypeScript will give you a compile-time error because it can't assign the unhandled case to the 'never' type.",
    whyElegant: "It turns potential runtime bugs into compile-time errors, making your code bulletproof against missing cases when the union type evolves.",
    keyInsight: "The 'never' type acts as a compile-time assertion that all cases have been handled.",
    analogy: "Like a safety checklist that automatically updates itself - if you add a new item to check, you're forced to actually check it before the system will let you proceed.",
    sourceNote: "Common TypeScript pattern for type-safe switch statements"
  },
  {
    id: "ts-infer-conditional-types",
    title: "TypeScript infer in conditional types",
    language: "TypeScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["conditional types", "infer", "type extraction", "generics"],
    code: `// Extract the return type of any function
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : never;

// Extract array element type
type ElementType<T> = T extends (infer U)[] ? U : never;

// Extract Promise value type
type Awaited<T> = T extends Promise<infer U> ? U : T;

// Usage examples
type FuncReturn = ReturnType<() => string>; // string
type ArrayElement = ElementType<number[]>; // number
type PromiseValue = Awaited<Promise<boolean>>; // boolean

// More complex: extract parameters from function
type Parameters<T> = T extends (...args: infer P) => any ? P : never;
type FuncParams = Parameters<(a: string, b: number) => void>; // [string, number]`,
    explanation: "The 'infer' keyword lets TypeScript automatically figure out and extract types from complex type patterns. It's like saying 'whatever type this turns out to be, remember it for me' and then you can use that remembered type elsewhere.",
    whyElegant: "It allows the type system to work backwards from patterns, automatically extracting the types you need without manual specification.",
    keyInsight: "Infer lets TypeScript deduce and capture types from patterns, enabling powerful type transformations.",
    analogy: "Like a detective who can look at a footprint and automatically determine the shoe size and brand - infer examines a type pattern and extracts the specific details you need.",
    sourceNote: "Core TypeScript utility for advanced type manipulation"
  },
  {
    id: "ts-mapped-type-transformation",
    title: "Mapped type transformation",
    language: "TypeScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["mapped types", "type transformation", "utility types"],
    code: `// Make all properties optional
type Partial<T> = {
  [P in keyof T]?: T[P];
};

// Make all properties readonly
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Pick only certain properties
type Pick<T, K extends keyof T> = {
  [P in K]: T[P];
};

// Transform all property types
type Stringify<T> = {
  [K in keyof T]: string;
};

// Example usage
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

type PartialUser = Partial<User>; // All properties optional
type UserStrings = Stringify<User>; // All properties become strings
type UserBasics = Pick<User, 'name' | 'email'>; // Only name and email`,
    explanation: "Mapped types let you create new types by transforming existing ones. You can take any object type and systematically change all its properties - making them optional, readonly, different types, or picking just some of them.",
    whyElegant: "It provides a systematic way to transform types while preserving their structure, eliminating the need to manually redefine similar types.",
    keyInsight: "Mapped types transform existing types systematically, like applying a function to every property.",
    analogy: "Like using find-and-replace in a document, but for types - you can systematically transform every property in a type according to a pattern you define.",
    sourceNote: "Fundamental TypeScript feature for type transformation"
  },
  {
    id: "ts-template-literal-type",
    title: "Template literal type",
    language: "TypeScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["template literals", "string types", "type unions"],
    code: `// Create precise string types using template literals
type Color = 'red' | 'green' | 'blue';
type Size = 'small' | 'medium' | 'large';

// Combine them into specific patterns
type ClassName = \`\${Color}-\${Size}\`; // 'red-small' | 'red-medium' | ... | 'blue-large'

// Extract information from string patterns
type EventName<T extends string> = \`on\${Capitalize<T>}\`;
type ButtonEvents = EventName<'click' | 'hover' | 'focus'>; // 'onClick' | 'onHover' | 'onFocus'

// API endpoint types
type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
type APIEndpoint<Path extends string> = \`/api\${Path}\`;
type UserEndpoints = APIEndpoint<'/users' | '/users/profile'>; // '/api/users' | '/api/users/profile'

// CSS property types
type CSSUnit = 'px' | 'em' | 'rem' | '%';
type Size = \`\${number}\${CSSUnit}\`; // '16px' | '1.5em' | '100%' etc.`,
    explanation: "Template literal types let you create very specific string types by combining other types into patterns. Instead of accepting any string, you can specify exactly which string formats are allowed, like 'red-small' or 'onClick'.",
    whyElegant: "It brings compile-time type safety to string patterns, catching typos and ensuring consistency in string-based APIs.",
    keyInsight: "Template literal types make string patterns as type-safe as object properties.",
    analogy: "Like creating a mad-libs template where only certain words can go in certain blanks - the type system ensures you only use valid combinations.",
    sourceNote: "TypeScript 4.1+ feature for precise string type modeling"
  },
  {
    id: "ts-satisfies-operator",
    title: "satisfies operator",
    language: "TypeScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["satisfies", "type checking", "type narrowing"],
    code: `// Problem: We want type safety but also want to preserve specific types
interface Config {
  apiUrl: string;
  timeout: number;
  retries: number;
  features: Record<string, boolean>;
}

// Without satisfies: too broad or loses specificity
const config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  features: {
    darkMode: true,
    notifications: false,
    experimental: true
  }
} satisfies Config; // ✓ Validates against Config but preserves specific types

// Now we get the best of both worlds:
config.apiUrl; // string (from Config)
config.features.darkMode; // boolean (preserved specific property)

// Compare without satisfies:
const configBroad: Config = {
  apiUrl: "https://api.example.com",
  timeout: 5000,
  retries: 3,
  features: {
    darkMode: true,
    notifications: false
  }
};
// configBroad.features.darkMode; // Error! Only knows it's Record<string, boolean>`,
    explanation: "The satisfies operator lets you check that your object matches a certain type structure while still keeping the specific details of what you wrote. It's like having a quality check that doesn't change your data.",
    whyElegant: "It provides type validation without losing type precision, giving you safety checks while preserving the exact structure you defined.",
    keyInsight: "Satisfies validates type compatibility without widening the original type.",
    analogy: "Like a passport check that verifies you have all required documents without replacing your actual documents with generic ones.",
    sourceNote: "TypeScript 4.9+ operator for better type inference"
  },
  {
    id: "js-array-flatmap",
    title: "Array.flatMap replacing map().flat()",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["arrays", "flatMap", "functional programming"],
    code: `// Transform and flatten in one step
const sentences = ["hello world", "foo bar", "baz qux"];

// Old way: map then flatten
const wordsOld = sentences
  .map(sentence => sentence.split(' '))
  .flat();

// New way: flatMap does both
const words = sentences.flatMap(sentence => sentence.split(' '));
// Result: ['hello', 'world', 'foo', 'bar', 'baz', 'qux']

// More complex example: extract all tags from posts
const posts = [
  { title: "Post 1", tags: ["js", "react"] },
  { title: "Post 2", tags: ["css", "html"] },
  { title: "Post 3", tags: ["node", "js", "api"] }
];

// Get all unique tags
const allTags = [...new Set(
  posts.flatMap(post => post.tags)
)];
// Result: ['js', 'react', 'css', 'html', 'node', 'api']

// Conditional flattening: only include valid items
const numbers = [1, 2, 3, 4, 5];
const evenDoubles = numbers.flatMap(n => 
  n % 2 === 0 ? [n * 2] : []
);
// Result: [4, 8] (only even numbers, doubled)`,
    explanation: "flatMap combines map and flat into one operation. Instead of transforming an array and then flattening it separately, you do both steps at once. It's especially useful when your transformation might produce arrays of different lengths or when you want to filter items.",
    whyElegant: "It eliminates intermediate arrays and makes the intent clearer by combining transformation and flattening into a single, efficient operation.",
    keyInsight: "flatMap transforms and flattens in one pass, perfect for operations that naturally produce nested results.",
    analogy: "Like unpacking multiple boxes while sorting their contents at the same time, instead of first unpacking everything into a pile and then sorting separately.",
    sourceNote: "ES2019 method for efficient map-and-flatten operations"
  },
  {
    id: "js-object-fromentries",
    title: "Object.fromEntries inverting a map",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["objects", "Object.fromEntries", "data transformation"],
    code: `// Convert key-value pairs back into an object
const entries = [
  ['name', 'Alice'],
  ['age', 30],
  ['city', 'Boston']
];
const person = Object.fromEntries(entries);
// Result: { name: 'Alice', age: 30, city: 'Boston' }

// Perfect for transforming object values
const prices = { apple: 1.20, banana: 0.80, orange: 1.50 };

// Apply discount to all prices
const discountedPrices = Object.fromEntries(
  Object.entries(prices).map(([fruit, price]) => [
    fruit, 
    Math.round(price * 0.8 * 100) / 100 // 20% discount
  ])
);
// Result: { apple: 0.96, banana: 0.64, orange: 1.20 }

// Filter object properties
const user = { id: 1, name: 'John', password: 'secret', email: 'john@example.com' };
const publicUser = Object.fromEntries(
  Object.entries(user).filter(([key]) => key !== 'password')
);
// Result: { id: 1, name: 'John', email: 'john@example.com' }

// Invert an object (swap keys and values)
const statusCodes = { OK: 200, NOT_FOUND: 404, ERROR: 500 };
const codeToStatus = Object.fromEntries(
  Object.entries(statusCodes).map(([status, code]) => [code, status])
);
// Result: { 200: 'OK', 404: 'NOT_FOUND', 500: 'ERROR' }`,
    explanation: "Object.fromEntries is the opposite of Object.entries. While Object.entries turns an object into an array of key-value pairs, Object.fromEntries turns an array of key-value pairs back into an object. This is perfect for transforming objects by working with their entries as arrays.",
    whyElegant: "It completes the object-to-array-to-object pipeline, enabling functional transformations on objects using array methods.",
    keyInsight: "Object.fromEntries closes the loop, letting you transform objects using powerful array methods.",
    analogy: "Like being able to disassemble furniture to modify it with regular tools, then reassemble it back into furniture when you're done.",
    sourceNote: "ES2019 method for reconstructing objects from key-value pairs"
  },
  {
    id: "js-promise-allsettled",
    title: "Promise.allSettled for fault-tolerant parallel work",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["promises", "Promise.allSettled", "error handling", "parallel processing"],
    code: `// Fetch data from multiple APIs, some might fail
const urls = [
  'https://api.service1.com/data',
  'https://api.service2.com/data', // This might be down
  'https://api.service3.com/data'
];

// Promise.all would fail if ANY request fails
// Promise.allSettled waits for all to complete, regardless of success/failure
const results = await Promise.allSettled(
  urls.map(url => fetch(url).then(r => r.json()))
);

// Handle mixed success/failure results
const successful = results
  .filter(result => result.status === 'fulfilled')
  .map(result => result.value);

const failed = results
  .filter(result => result.status === 'rejected')
  .map(result => result.reason);

console.log(\`Got \${successful.length} successful responses\`);
console.log(\`\${failed.length} requests failed\`);

// Practical example: batch user validation
async function validateUsers(emails) {
  const validationPromises = emails.map(async email => {
    // Some validation might fail due to network, invalid email, etc.
    const response = await fetch(\`/api/validate-email/\${email}\`);
    return { email, valid: response.ok };
  });

  const results = await Promise.allSettled(validationPromises);
  
  return results.map(result => 
    result.status === 'fulfilled' 
      ? result.value 
      : { email: 'unknown', valid: false, error: result.reason.message }
  );
}`,
    explanation: "Promise.allSettled waits for all promises to complete, whether they succeed or fail. Unlike Promise.all which fails fast if any promise rejects, allSettled gives you the results of everything, letting you handle successes and failures separately.",
    whyElegant: "It provides graceful degradation for parallel operations, allowing your application to work with partial results instead of failing completely.",
    keyInsight: "Promise.allSettled treats failures as data rather than exceptions, enabling fault-tolerant parallel processing.",
    analogy: "Like asking multiple friends for help moving and working with whoever shows up, rather than canceling the whole move if one person can't make it.",
    sourceNote: "ES2020 method for fault-tolerant promise handling"
  },
  {
    id: "js-promise-race-timeout",
    title: "Promise.race for timeout",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["promises", "Promise.race", "timeout", "async control"],
    code: `// Create a timeout promise
function timeout(ms) {
  return new Promise((_, reject) => 
    setTimeout(() => reject(new Error('Timeout')), ms)
  );
}

// Race an operation against a timeout
async function fetchWithTimeout(url, timeoutMs = 5000) {
  try {
    const result = await Promise.race([
      fetch(url).then(r => r.json()),
      timeout(timeoutMs)
    ]);
    return result;
  } catch (error) {
    if (error.message === 'Timeout') {
      throw new Error(\`Request to \${url} timed out after \${timeoutMs}ms\`);
    }
    throw error;
  }
}

// More sophisticated: timeout with cleanup
function withTimeout(promise, ms) {
  let timeoutId;
  
  const timeoutPromise = new Promise((_, reject) => {
    timeoutId = setTimeout(() => reject(new Error('Timeout')), ms);
  });
  
  return Promise.race([
    promise.finally(() => clearTimeout(timeoutId)),
    timeoutPromise
  ]);
}

// Usage examples
try {
  const data = await fetchWithTimeout('https://slow-api.com/data', 3000);
  console.log('Got data:', data);
} catch (error) {
  console.log('Failed:', error.message);
}

// Race multiple similar operations (use fastest)
const mirrors = [
  'https://cdn1.example.com/file.json',
  'https://cdn2.example.com/file.json',
  'https://cdn3.example.com/file.json'
];

const fastestResponse = await Promise.race(
  mirrors.map(url => fetch(url).then(r => r.json()))
);`,
    explanation: "Promise.race returns as soon as the first promise settles (resolves or rejects). This is perfect for timeouts because you can race your actual operation against a timer promise. Whichever finishes first wins, so slow operations get cut off.",
    whyElegant: "It provides a clean way to add timeouts to any async operation without modifying the original code, and can also optimize performance by using the fastest of multiple options.",
    keyInsight: "Promise.race lets the fastest promise win, perfect for timeouts and performance optimization.",
    analogy: "Like a foot race where the first person to cross the finish line wins - whether that's your actual task completing or the timeout timer going off.",
    sourceNote: "ES6 Promise method commonly used for timeouts and performance optimization"
  },
  {
    id: "js-async-generator-pagination",
    title: "Async generator for paginated API",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["async generators", "pagination", "iterators", "streaming"],
    code: `// Async generator for paginated API responses
async function* fetchAllUsers(apiUrl) {
  let page = 1;
  let hasMore = true;

  while (hasMore) {
    const response = await fetch(\`\${apiUrl}?page=\${page}&limit=50\`);
    const data = await response.json();
    
    // Yield each user individually
    for (const user of data.users) {
      yield user;
    }
    
    hasMore = data.hasMore;
    page++;
  }
}

// Usage: process users one at a time as they come in
async function processUsers() {
  for await (const user of fetchAllUsers('https://api.example.com/users')) {
    console.log(\`Processing user: \${user.name}\`);
    
    // Can break early if needed
    if (user.id === 'target-user') {
      break; // Stops fetching more pages
    }
  }
}

// More advanced: with error handling and backoff
async function* fetchWithRetry(url, maxRetries = 3) {
  let page = 1;
  
  while (true) {
    let lastError;
    
    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        const response = await fetch(\`\${url}?page=\${page}\`);
        if (!response.ok) throw new Error(\`HTTP \${response.status}\`);
        
        const data = await response.json();
        
        if (data.items.length === 0) return; // No more data
        
        for (const item of data.items) {
          yield item;
        }
        
        page++;
        break; // Success, move to next page
        
      } catch (error) {
        lastError = error;
        if (attempt < maxRetries) {
          await new Promise(resolve => setTimeout(resolve, 1000 * attempt));
        }
      }
    }
    
    if (lastError) throw lastError;
  }
}`,
    explanation: "Async generators let you create functions that can pause to wait for async operations and then resume, yielding values one at a time. This is perfect for paginated APIs because you can fetch pages on-demand as the consumer needs more data, without loading everything into memory.",
    whyElegant: "It provides lazy, memory-efficient iteration over large datasets while hiding the complexity of pagination and async operations from the consumer.",
    keyInsight: "Async generators turn complex pagination into simple for-await loops, with built-in lazy loading.",
    analogy: "Like a librarian who fetches books from storage one shelf at a time as you need them, rather than bringing all books to your table at once.",
    sourceNote: "ES2018 feature for streaming and lazy async iteration"
  },
{
    id: "js-weakref-cache",
    title: "WeakRef for cache without memory leak",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["memory-management", "caching", "garbage-collection", "weakref"],
    code: `// Cache that doesn't prevent garbage collection
class ImageCache {
  private cache = new Map<string, WeakRef<HTMLImageElement>>();
  
  get(url: string): HTMLImageElement | null {
    const ref = this.cache.get(url);
    if (ref) {
      const img = ref.deref(); // May return undefined if GC'd
      if (img) return img;
      this.cache.delete(url); // Clean up dead reference
    }
    return null;
  }
  
  set(url: string, img: HTMLImageElement): void {
    this.cache.set(url, new WeakRef(img));
  }
}

const cache = new ImageCache();
const img = new Image();
img.src = 'photo.jpg';
cache.set('photo.jpg', img);

// Later, if img is no longer referenced elsewhere,
// it can be garbage collected even though it's in cache
setTimeout(() => {
  const cached = cache.get('photo.jpg'); // Might be null if GC'd
}, 5000);`,
    explanation: "WeakRef creates a reference to an object that doesn't prevent the garbage collector from cleaning up that object when it's no longer needed elsewhere. This is perfect for caches - you want to keep objects around for quick access, but not forever if they're not being used.",
    whyElegant: "Solves the classic cache dilemma: keep objects for performance but avoid memory leaks. The garbage collector decides when cached items should go, creating self-managing caches.",
    keyInsight: "WeakRef lets you hold onto objects without holding them hostage from garbage collection.",
    analogy: "Like a bookmark to a library book - you can quickly find it if it's still there, but the library can move or discard the book if no one's actively reading it.",
    sourceNote: "ES2021 feature for advanced memory management patterns"
  },
  {
    id: "js-finalization-registry",
    title: "FinalizationRegistry",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["cleanup", "garbage-collection", "resources", "finalization"],
    code: `// Clean up external resources when objects are garbage collected
class FileHandle {
  private static registry = new FinalizationRegistry((fileDescriptor: number) => {
    console.log(\`Cleaning up file descriptor \${fileDescriptor}\`);
    // Close the file handle in native code
    closeNativeFile(fileDescriptor);
  });
  
  constructor(private fd: number) {
    // Register this object for cleanup
    FileHandle.registry.register(this, fd);
  }
  
  read(): string {
    return readNativeFile(this.fd);
  }
  
  // Manual cleanup (preferred)
  close(): void {
    closeNativeFile(this.fd);
    FileHandle.registry.unregister(this);
  }
}

// Usage
function processFile() {
  const file = new FileHandle(42);
  return file.read();
} // file goes out of scope

processFile();
// Eventually, FinalizationRegistry will clean up the file descriptor
// even if .close() wasn't called`,
    explanation: "FinalizationRegistry lets you run cleanup code when an object is about to be garbage collected. This is crucial for releasing external resources like file handles, database connections, or native memory that JavaScript's garbage collector doesn't know about.",
    whyElegant: "Provides a safety net for resource cleanup - even if developers forget to manually close resources, they'll eventually be cleaned up automatically when the object is garbage collected.",
    keyInsight: "FinalizationRegistry ensures external resources are cleaned up even when manual cleanup is forgotten.",
    analogy: "Like having a hotel housekeeper who automatically cleans your room and returns the key even if you forget to check out properly.",
    sourceNote: "ES2021 feature for managing external resources tied to JavaScript objects"
  },
  {
    id: "js-atomics-wait",
    title: "Atomics.wait concept",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["concurrency", "atomics", "shared-memory", "synchronization"],
    code: `// Shared memory synchronization between workers
// In main thread:
const sharedBuffer = new SharedArrayBuffer(1024);
const sharedArray = new Int32Array(sharedBuffer);

// Send shared buffer to worker
const worker = new Worker('worker.js');
worker.postMessage({ sharedBuffer });

// Signal worker to start processing
Atomics.store(sharedArray, 0, 1); // Set flag
Atomics.notify(sharedArray, 0);   // Wake up worker

// In worker.js:
self.onmessage = ({ data: { sharedBuffer } }) => {
  const sharedArray = new Int32Array(sharedBuffer);
  
  // Wait for signal from main thread
  while (Atomics.load(sharedArray, 0) === 0) {
    Atomics.wait(sharedArray, 0, 0, 1000); // Wait up to 1 second
  }
  
  console.log('Worker received signal, starting work...');
  
  // Do work and store result
  const result = expensiveComputation();
  Atomics.store(sharedArray, 1, result);
  Atomics.notify(sharedArray, 1); // Notify main thread
};`,
    explanation: "Atomics.wait allows one thread to pause and wait until another thread changes a specific value in shared memory. This enables coordination between the main JavaScript thread and web workers without constantly checking for changes.",
    whyElegant: "Eliminates busy waiting and polling - threads can sleep until exactly the moment they need to wake up, making multi-threaded JavaScript both efficient and responsive.",
    keyInsight: "Atomics.wait enables true thread synchronization by letting threads sleep until signaled.",
    analogy: "Like having a doorbell instead of constantly checking if someone's at the door - you sleep peacefully until the bell rings to wake you.",
    sourceNote: "ES2017 feature for thread synchronization with SharedArrayBuffer"
  },
  {
    id: "js-sharedarraybuffer-pingpong",
    title: "SharedArrayBuffer ping-pong",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["shared-memory", "workers", "performance", "concurrency"],
    code: `// High-performance data exchange between main thread and worker
// Main thread
const sharedBuffer = new SharedArrayBuffer(1024);
const sharedArray = new Int32Array(sharedBuffer);

const worker = new Worker('ping-pong-worker.js');
worker.postMessage({ sharedBuffer });

let counter = 0;
function ping() {
  counter++;
  Atomics.store(sharedArray, 0, counter);     // Write data
  Atomics.store(sharedArray, 1, 1);           // Signal worker
  Atomics.notify(sharedArray, 1);
  
  // Wait for pong
  Atomics.wait(sharedArray, 2, 0);
  const result = Atomics.load(sharedArray, 0); // Read modified data
  console.log(\`Ping-pong result: \${result}\`);
  
  Atomics.store(sharedArray, 2, 0); // Reset signal
}

setInterval(ping, 100);

// In ping-pong-worker.js:
self.onmessage = ({ data: { sharedBuffer } }) => {
  const sharedArray = new Int32Array(sharedBuffer);
  
  while (true) {
    // Wait for ping
    Atomics.wait(sharedArray, 1, 0);
    
    // Process data
    const value = Atomics.load(sharedArray, 0);
    const processed = value * 2; // Some processing
    Atomics.store(sharedArray, 0, processed);
    
    // Pong back
    Atomics.store(sharedArray, 1, 0);  // Reset ping signal  
    Atomics.store(sharedArray, 2, 1);  // Send pong signal
    Atomics.notify(sharedArray, 2);
  }
};`,
    explanation: "SharedArrayBuffer creates a piece of memory that both the main thread and web workers can access directly. This 'ping-pong' pattern shows how they can rapidly exchange data without the overhead of copying messages back and forth.",
    whyElegant: "Achieves near-native performance for data exchange between threads by sharing actual memory rather than copying data, while maintaining thread safety through atomic operations.",
    keyInsight: "SharedArrayBuffer eliminates data copying overhead by letting threads share the same memory space.",
    analogy: "Like having a shared whiteboard in a meeting room - instead of passing notes back and forth, everyone can write and read from the same board instantly.",
    sourceNote: "ES2017 feature enabling true shared memory between JavaScript threads"
  },
  {
    id: "js-event-delegation",
    title: "Event delegation vs per-element listeners",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["events", "performance", "dom", "delegation"],
    code: `// Inefficient: One listener per button
function attachIndividualListeners() {
  const buttons = document.querySelectorAll('.action-btn');
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const action = button.dataset.action;
      handleAction(action, button);
    });
  });
}

// Efficient: One listener for all buttons via delegation
function attachDelegatedListener() {
  document.getElementById('button-container').addEventListener('click', (e) => {
    // Check if clicked element is an action button
    if (e.target.matches('.action-btn')) {
      const action = e.target.dataset.action;
      handleAction(action, e.target);
    }
  });
}

function handleAction(action, element) {
  console.log(\`Action: \${action}\`, element);
}

// Works great with dynamic content
function addNewButton() {
  const container = document.getElementById('button-container');
  const newBtn = document.createElement('button');
  newBtn.className = 'action-btn';
  newBtn.dataset.action = 'delete';
  newBtn.textContent = 'Delete';
  container.appendChild(newBtn);
  // No need to attach new listener - delegation handles it!
}

attachDelegatedListener();
addNewButton(); // New button automatically works`,
    explanation: "Instead of attaching individual event listeners to each element, event delegation puts one listener on a parent container. When events bubble up from child elements, the parent catches them and decides how to respond based on which child was clicked.",
    whyElegant: "Uses fewer resources (one listener vs. hundreds), automatically works with dynamically added elements, and centralizes event handling logic in one place.",
    keyInsight: "Event delegation leverages event bubbling to handle many elements with a single listener.",
    analogy: "Like having one receptionist handle all visitors to an office building instead of posting a greeter at every individual office door.",
    sourceNote: "Classic DOM pattern that leverages JavaScript's event bubbling mechanism"
  },
  {
    id: "js-addEventListener-once",
    title: "addEventListener once option",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["events", "cleanup", "once", "listeners"],
    code: `// Manual cleanup approach (old way)
function setupModalOldWay() {
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('close-btn');
  
  function handleClose() {
    modal.style.display = 'none';
    // Must remember to remove listener
    closeBtn.removeEventListener('click', handleClose);
    document.removeEventListener('keydown', handleEscape);
  }
  
  function handleEscape(e) {
    if (e.key === 'Escape') {
      handleClose();
    }
  }
  
  closeBtn.addEventListener('click', handleClose);
  document.addEventListener('keydown', handleEscape);
}

// Elegant approach with 'once' option
function setupModalNewWay() {
  const modal = document.getElementById('modal');
  const closeBtn = document.getElementById('close-btn');
  
  // Automatically removes itself after first trigger
  closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
  }, { once: true });
  
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      modal.style.display = 'none';
    }
  }, { once: true });
}

// Perfect for async operations
async function waitForClick(element) {
  return new Promise(resolve => {
    element.addEventListener('click', resolve, { once: true });
  });
}

// Usage
const button = document.getElementById('my-button');
const clickEvent = await waitForClick(button);
console.log('Button was clicked!', clickEvent);`,
    explanation: "The 'once' option automatically removes an event listener after it fires once. This prevents memory leaks and eliminates the need to manually track and remove listeners that should only run once.",
    whyElegant: "Eliminates entire categories of bugs related to forgotten event listener cleanup, and makes the intent crystal clear - this listener should only run once.",
    keyInsight: "The 'once' option automatically handles event listener cleanup, preventing memory leaks.",
    analogy: "Like a self-destructing note that disappears after being read once, ensuring no one can accidentally read stale information.",
    sourceNote: "ES2017 addEventListener enhancement for automatic listener cleanup"
  },
  {
    id: "js-intersection-observer-lazy",
    title: "IntersectionObserver for lazy load",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["performance", "lazy-loading", "viewport", "observer"],
    code: `// Efficient lazy loading without scroll event listeners
class LazyImageLoader {
  private observer: IntersectionObserver;
  
  constructor() {
    this.observer = new IntersectionObserver(
      (entries) => this.handleIntersections(entries),
      {
        rootMargin: '50px', // Start loading 50px before entering viewport
        threshold: 0.1      // Trigger when 10% visible
      }
    );
  }
  
  private handleIntersections(entries: IntersectionObserverEntry[]) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        this.loadImage(img);
        this.observer.unobserve(img); // Stop watching this image
      }
    });
  }
  
  private loadImage(img: HTMLImageElement) {
    const src = img.dataset.src;
    if (src) {
      img.src = src;
      img.classList.add('loaded');
    }
  }
  
  observe(img: HTMLImageElement) {
    this.observer.observe(img);
  }
}

// Usage
const loader = new LazyImageLoader();

// Setup lazy images
document.querySelectorAll('img[data-src]').forEach(img => {
  loader.observe(img as HTMLImageElement);
});

// HTML: <img data-src="large-image.jpg" alt="Lazy loaded" />`,
    explanation: "IntersectionObserver watches elements and tells you when they enter or leave the viewport (visible area). This is perfect for lazy loading - only load images when they're about to become visible, saving bandwidth and improving page load time.",
    whyElegant: "Eliminates expensive scroll event listeners that fire constantly, replacing them with efficient native browser monitoring that only triggers when visibility actually changes.",
    keyInsight: "IntersectionObserver provides efficient viewport monitoring without performance-killing scroll events.",
    analogy: "Like having a security guard who only alerts you when someone actually walks through the door, instead of constantly asking 'Is anyone coming?' every second.",
    sourceNote: "Modern browser API designed for efficient visibility detection and lazy loading"
  },
  {
    id: "js-requestanimationframe-loop",
    title: "requestAnimationFrame loop",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["animation", "performance", "rendering", "frame-rate"],
    code: `// Smooth animation loop synced to browser refresh rate
class AnimationEngine {
  private isRunning = false;
  private lastTime = 0;
  private particles: Array<{ x: number; y: number; vx: number; vy: number }> = [];
  
  constructor() {
    // Create some particles
    for (let i = 0; i < 100; i++) {
      this.particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        vx: (Math.random() - 0.5) * 4,
        vy: (Math.random() - 0.5) * 4
      });
    }
  }
  
  private animate = (currentTime: number) => {
    if (!this.isRunning) return;
    
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;
    
    // Update particles
    this.particles.forEach(particle => {
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Bounce off edges
      if (particle.x < 0 || particle.x > window.innerWidth) particle.vx *= -1;
      if (particle.y < 0 || particle.y > window.innerHeight) particle.vy *= -1;
    });
    
    this.render();
    
    // Schedule next frame
    requestAnimationFrame(this.animate);
  }
  
  private render() {
    const canvas = document.getElementById('canvas') as HTMLCanvasElement;
    const ctx = canvas.getContext('2d')!;
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    this.particles.forEach(particle => {
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, 2, 0, Math.PI * 2);
      ctx.fill();
    });
  }
  
  start() {
    this.isRunning = true;
    this.lastTime = performance.now();
    requestAnimationFrame(this.animate);
  }
  
  stop() {
    this.isRunning = false;
  }
}

const engine = new AnimationEngine();
engine.start();`,
    explanation: "requestAnimationFrame schedules code to run just before the browser redraws the screen. This creates perfectly smooth animations that sync with the monitor's refresh rate (usually 60 FPS) and automatically pause when the tab isn't visible.",
    whyElegant: "Automatically optimizes for the user's display refresh rate, pauses when tab is hidden to save battery, and ensures animations never run faster than the browser can display them.",
    keyInsight: "requestAnimationFrame synchronizes animations with the browser's natural redraw cycle for optimal performance.",
    analogy: "Like a choreographer who times dancers' moves perfectly with the music's beat - every movement happens exactly when the audience can see it.",
    sourceNote: "HTML5 API designed for smooth, efficient animations and visual updates"
  },
  {
    id: "js-structured-clone",
    title: "structuredClone for deep copy",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["cloning", "deep-copy", "objects", "serialization"],
    code: `// Complex object with various data types
const original = {
  name: 'Complex Object',
  date: new Date(),
  regex: /hello/gi,
  map: new Map([['key1', 'value1'], ['key2', 'value2']]),
  set: new Set([1, 2, 3, 4]),
  nested: {
    array: [1, { deep: true }, 3],
    buffer: new ArrayBuffer(16),
    typedArray: new Uint8Array([1, 2, 3, 4])
  },
  func: function() { return 'functions are not cloned'; }
};

// Old approaches (problematic)
const jsonCopy = JSON.parse(JSON.stringify(original)); 
// ❌ Loses Date objects, regex, Map, Set, functions, undefined values

const shallowCopy = { ...original };
// ❌ Only copies top level, nested objects still share references

// Modern approach: structuredClone
const deepCopy = structuredClone(original);

// Verify independence
deepCopy.nested.array.push('new item');
deepCopy.map.set('key3', 'value3');

console.log(original.nested.array.length);    // Still original length
console.log(original.map.has('key3'));        // Still false
console.log(deepCopy.date instanceof Date);   // true
console.log(deepCopy.regex instanceof RegExp); // true

// Perfect for state management
function updateUserPreferences(currentPrefs, updates) {
  const newPrefs = structuredClone(currentPrefs);
  return { ...newPrefs, ...updates };
}

// Handles circular references too!
const circular = { name: 'parent' };
circular.self = circular;
const clonedCircular = structuredClone(circular); // Works!`,
    explanation: "structuredClone creates a complete independent copy of complex JavaScript objects, including nested objects, arrays, dates, maps, sets, and even circular references. Unlike JSON methods, it preserves all data types correctly.",
    whyElegant: "Solves the deep cloning problem once and for all - handles edge cases that have plagued JavaScript developers for years, including circular references and complex built-in objects.",
    keyInsight: "structuredClone provides true deep copying that preserves all JavaScript object types and structures.",
    analogy: "Like having a perfect photocopier that can duplicate not just text and images, but also the paper texture, binding, bookmarks, and even pop-up elements exactly as they were.",
    sourceNote: "ES2022 web standard that brings reliable deep cloning to JavaScript"
  },
  {
    id: "js-crypto-random-uuid",
    title: "crypto.randomUUID()",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns",
    conceptTags: ["uuid", "crypto", "security", "identifiers"],
    code: `// Generate cryptographically secure UUIDs
class TaskManager {
  private tasks = new Map<string, Task>();
  
  createTask(title: string, description: string): Task {
    const task: Task = {
      id: crypto.randomUUID(), // Cryptographically secure UUID v4
      title,
      description,
      createdAt: new Date(),
      status: 'pending'
    };
    
    this.tasks.set(task.id, task);
    return task;
  }
  
  getTask(id: string): Task | undefined {
    return this.tasks.get(id);
  }
}

interface Task {
  id: string;
  title: string;
  description: string;
  createdAt: Date;
  status: 'pending' | 'completed';
}

// Usage examples
const manager = new TaskManager();

const task1 = manager.createTask('Buy groceries', 'Milk, eggs, bread');
console.log(task1.id); // e.g., "f47ac10b-58cc-4372-a567-0e02b2c3d479"

const task2 = manager.createTask('Call mom', 'Weekly check-in');
console.log(task2.id); // e.g., "6ba7b810-9dad-11d1-80b4-00c04fd430c8"

// Perfect for distributed systems
class EventLogger {
  log(event: string, data: any) {
    const logEntry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      event,
      data,
      sessionId: this.getSessionId()
    };
    
    // Send to logging service
    this.sendLog(logEntry);
  }
  
  private getSessionId(): string {
    if (!sessionStorage.sessionId) {
      sessionStorage.sessionId = crypto.randomUUID();
    }
    return sessionStorage.sessionId;
  }
  
  private sendLog(entry: any) {
    console.log('Logging:', entry);
    // Would send to actual logging service
  }
}

const logger = new EventLogger();
logger.log('user_click', { button: 'submit', form: 'contact' });`,
    explanation: "crypto.randomUUID() generates random, unique identifiers that are cryptographically secure and follow the standard UUID version 4 format. These IDs are virtually guaranteed to never collide, even across different computers and time periods.",
    whyElegant: "Eliminates the need for custom ID generation logic, counter management, or collision checking - provides universally unique identifiers with built-in security and standards compliance.",
    keyInsight: "crypto.randomUUID() provides collision-free, secure identifiers without any setup or collision management.",
    analogy: "Like having a magic stamp that creates a completely unique serial number every time you use it, guaranteed never to repeat even if millions of people use identical stamps simultaneously worldwide.",
    sourceNote: "Web Crypto API standard providing secure UUID generation in browsers and Node.js"
  },
{
    id: "41",
    title: "Intl.DateTimeFormat for localisation",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["internationalisation", "dates", "formatting", "locale"],
    code: `// Format dates for different locales automatically
const date = new Date('2024-03-15');

// US format: 3/15/2024
const usFormat = new Intl.DateTimeFormat('en-US').format(date);

// UK format: 15/03/2024  
const ukFormat = new Intl.DateTimeFormat('en-GB').format(date);

// German format: 15.3.2024
const germanFormat = new Intl.DateTimeFormat('de-DE').format(date);

// Custom format with options
const customFormat = new Intl.DateTimeFormat('en-US', {
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric'
}).format(date);
// "Friday, March 15, 2024"`,
    explanation: "Intl.DateTimeFormat automatically formats dates according to different countries' conventions. Instead of writing complex logic to handle American vs European date formats, you simply specify the locale (country code) and JavaScript handles all the cultural differences for you.",
    whyElegant: "Eliminates the need for manual date formatting logic and automatically respects cultural conventions. One simple API handles dozens of different regional formats without any custom code.",
    keyInsight: "Internationalisation is built into JavaScript - you don't need external libraries to format dates for different cultures.",
    analogy: "Like having a universal translator that knows exactly how each culture prefers to write dates - Americans put month first, Europeans put day first, but you don't need to remember these rules.",
    sourceNote: "Modern JavaScript Intl API, supported in all current browsers"
  },
  {
    id: "42", 
    title: "Intl.NumberFormat for currency",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["internationalisation", "currency", "numbers", "formatting"],
    code: `// Format currency for different locales
const amount = 1234.56;

// US Dollar: $1,234.56
const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(amount);

// Euro in German format: 1.234,56 €
const euro = new Intl.NumberFormat('de-DE', {
  style: 'currency', 
  currency: 'EUR'
}).format(amount);

// Japanese Yen: ¥1,235 (no decimal places)
const yen = new Intl.NumberFormat('ja-JP', {
  style: 'currency',
  currency: 'JPY'
}).format(amount);

// Percentage formatting
const percentage = new Intl.NumberFormat('en-US', {
  style: 'percent'
}).format(0.1234); // "12%"`,
    explanation: "Intl.NumberFormat handles the complex rules of how different countries display money and numbers. Germans use periods where Americans use commas, Japanese Yen doesn't show cents, and currency symbols go in different positions depending on the culture.",
    whyElegant: "One API handles all the intricate cultural rules around money formatting - decimal separators, thousands separators, currency symbols, and currency-specific precision rules.",
    keyInsight: "Currency formatting varies dramatically by culture, but JavaScript's Intl API knows all these regional differences automatically.",
    analogy: "Like having a local banker in every country who knows exactly how to write monetary amounts the way locals expect to see them.",
    sourceNote: "JavaScript Intl.NumberFormat specification with comprehensive currency support"
  },
  {
    id: "43",
    title: "Intl.RelativeTimeFormat",
    language: "JavaScript", 
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["internationalisation", "time", "relative", "formatting"],
    code: `// Format relative time in different languages
const rtf = new Intl.RelativeTimeFormat('en', { numeric: 'auto' });

console.log(rtf.format(-1, 'day'));    // "yesterday"
console.log(rtf.format(1, 'day'));     // "tomorrow"
console.log(rtf.format(-2, 'week'));   // "2 weeks ago"
console.log(rtf.format(3, 'month'));   // "in 3 months"

// Spanish version
const spanishRtf = new Intl.RelativeTimeFormat('es', { numeric: 'auto' });
console.log(spanishRtf.format(-1, 'day')); // "ayer"
console.log(spanishRtf.format(1, 'day'));  // "mañana"

// Always use numbers (no "yesterday")
const numericRtf = new Intl.RelativeTimeFormat('en', { numeric: 'always' });
console.log(numericRtf.format(-1, 'day')); // "1 day ago"

// Helper function for automatic calculation
function getRelativeTime(date) {
  const now = new Date();
  const diff = date - now;
  const days = Math.round(diff / (1000 * 60 * 60 * 24));
  return rtf.format(days, 'day');
}`,
    explanation: "Intl.RelativeTimeFormat creates human-friendly time descriptions like 'yesterday', '3 hours ago', or 'next week'. It automatically handles the grammar and language rules for different languages, including when to use words like 'yesterday' versus '1 day ago'.",
    whyElegant: "Transforms complex relative time calculations and multilingual grammar rules into simple, readable code. No need to manually handle plurals, tenses, or language-specific time expressions.",
    keyInsight: "Relative time formatting requires understanding both math and language grammar - JavaScript's Intl API handles both automatically.",
    analogy: "Like having a native speaker who naturally says 'yesterday' instead of '1 day ago' and knows when to be precise versus casual in every language.",
    sourceNote: "Intl.RelativeTimeFormat specification, newer addition to JavaScript Intl API"
  },
  {
    id: "44",
    title: "Array.at(-1) for last element", 
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["arrays", "indexing", "negative", "syntax"],
    code: `const fruits = ['apple', 'banana', 'cherry', 'date'];

// Old way - verbose and error-prone
const lastFruit = fruits[fruits.length - 1]; // 'date'

// New way - clean and intuitive  
const lastFruitNew = fruits.at(-1); // 'date'

// More examples
const secondToLast = fruits.at(-2); // 'cherry'
const firstFruit = fruits.at(0);    // 'apple'

// Works with any indexable structure
const str = "hello";
console.log(str.at(-1)); // 'o'
console.log(str.at(-2)); // 'l'

// Safe with empty arrays (returns undefined)
const empty = [];
console.log(empty.at(-1)); // undefined
console.log(empty[empty.length - 1]); // also undefined, but longer

// Particularly useful in method chains
const numbers = [1, 2, 3, 4, 5];
const result = numbers
  .filter(n => n % 2 === 0)
  .map(n => n * 2)
  .at(-1); // Get last element of filtered/mapped array`,
    explanation: "Array.at() lets you use negative numbers to count backwards from the end of an array. Instead of writing the awkward 'array[array.length - 1]' to get the last element, you can simply write 'array.at(-1)'. It's like counting from the end: -1 is last, -2 is second-to-last, etc.",
    whyElegant: "Eliminates the verbose and error-prone 'array[array.length - 1]' pattern. Negative indexing is intuitive and matches how humans naturally think about 'last', 'second-to-last', etc.",
    keyInsight: "Negative array indexing makes accessing elements from the end as simple and readable as accessing from the beginning.",
    analogy: "Like numbering seats in a theater where negative numbers count from the back - seat -1 is the very last row, seat -2 is second-to-last, much clearer than calculating from total capacity.",
    sourceNote: "ES2022 Array.at() method, supported in modern JavaScript environments"
  },
  {
    id: "45",
    title: "Object.hasOwn vs hasOwnProperty",
    language: "JavaScript",
    category: "JavaScript & TypeScript Patterns" as const, 
    conceptTags: ["objects", "properties", "prototype", "safety"],
    code: `const obj = { name: 'John', age: 30 };

// Old way - can be overridden or fail
console.log(obj.hasOwnProperty('name')); // true

// Problem: hasOwnProperty can be overridden
const problematicObj = {
  name: 'Jane',
  hasOwnProperty: null // Overridden!
};
// This would throw an error:
// problematicObj.hasOwnProperty('name'); // TypeError!

// Workaround was verbose:
Object.prototype.hasOwnProperty.call(problematicObj, 'name'); // true

// New way - safe and clean
console.log(Object.hasOwn(obj, 'name')); // true
console.log(Object.hasOwn(problematicObj, 'name')); // true - always works!

// Works with null-prototype objects too
const nullProtoObj = Object.create(null);
nullProtoObj.prop = 'value';
// obj.hasOwnProperty('prop'); // Would error - no prototype
console.log(Object.hasOwn(nullProtoObj, 'prop')); // true

// Checking inherited vs own properties
class Parent {
  parentProp = 'inherited';
}
class Child extends Parent {
  childProp = 'own';
}
const child = new Child();
console.log(Object.hasOwn(child, 'childProp'));  // true (own property)
console.log(Object.hasOwn(child, 'parentProp')); // false (inherited)`,
    explanation: "Object.hasOwn is the safer, more reliable way to check if an object has its own property (not inherited from its prototype). The old hasOwnProperty method could be overridden by malicious or buggy code, but Object.hasOwn always works correctly no matter how the object is structured.",
    whyElegant: "Provides bulletproof property checking without the verbose workarounds needed for hasOwnProperty. Works consistently regardless of object structure or prototype manipulation.",
    keyInsight: "Object.hasOwn is immune to prototype pollution and property shadowing, making property checks always reliable.",
    analogy: "Like having a certified inspector who can always tell you what belongs to a house versus what's inherited from the neighborhood, even if someone tries to bribe or replace the local inspector.",
    sourceNote: "ES2022 Object.hasOwn() method, designed to replace hasOwnProperty safely"
  },
  {
    id: "46",
    title: "TypeScript const assertion",
    language: "TypeScript", 
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["typescript", "const", "literals", "inference"],
    code: `// Without const assertion - types are widened
const colors = ['red', 'blue', 'green']; 
// Type: string[] (mutable array of any strings)

const config = {
  theme: 'dark',
  version: 1
};
// Type: { theme: string; version: number }

// With const assertion - types are narrowed to literals
const colorsConst = ['red', 'blue', 'green'] as const;
// Type: readonly ["red", "blue", "green"] (exact tuple)

const configConst = {
  theme: 'dark', 
  version: 1
} as const;
// Type: { readonly theme: "dark"; readonly version: 1 }

// Practical example - creating type-safe enums
const STATUS = {
  LOADING: 'loading',
  SUCCESS: 'success', 
  ERROR: 'error'
} as const;
// Type: { readonly LOADING: "loading"; readonly SUCCESS: "success"; readonly ERROR: "error" }

type Status = typeof STATUS[keyof typeof STATUS];
// Type: "loading" | "success" | "error"

function handleStatus(status: Status) {
  // TypeScript knows exactly which strings are valid
  if (status === 'loading') { /* ... */ }
}

// Array example for strict typing
const directions = ['north', 'south', 'east', 'west'] as const;
type Direction = typeof directions[number]; 
// Type: "north" | "south" | "east" | "west"`,
    explanation: "The 'as const' assertion tells TypeScript to treat values as immutable constants rather than general types. Without it, 'red' becomes 'string', but with it, 'red' stays exactly 'red'. This creates more precise types that catch errors when you accidentally use the wrong string or number.",
    whyElegant: "Transforms loose, general types into precise, literal types without extra code. Makes TypeScript understand your exact intentions, leading to better autocomplete and error catching.",
    keyInsight: "Const assertions preserve the exact literal values in TypeScript's type system, enabling type-safe constants and enums.",
    analogy: "Like telling a librarian to remember the exact title of a book rather than just 'it's some book' - much more useful for finding exactly what you need later.",
    sourceNote: "TypeScript 3.4+ const assertions feature for literal type preservation"
  },
  {
    id: "47", 
    title: "TypeScript NoInfer utility",
    language: "TypeScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["typescript", "generics", "inference", "utility"],
    code: `// Without NoInfer - TypeScript might infer unwanted unions
function createArray<T>(first: T, rest: T[]): T[] {
  return [first, ...rest];
}

// Problem: TypeScript infers T as string | number
const mixed = createArray(1, ['hello', 2]);
// T becomes: string | number (not what we want!)

// With NoInfer - prevent inference from specific parameters  
function createArrayFixed<T>(first: T, rest: NoInfer<T>[]): T[] {
  return [first, ...rest];
}

// Now TypeScript infers T from first parameter only
const numbers = createArrayFixed(1, [2, 3, 4]); // T is number
// const invalid = createArrayFixed(1, ['hello']); // Error!

// Real-world example: event system
interface EventMap {
  click: { x: number; y: number };
  keypress: { key: string };
  resize: { width: number; height: number };
}

function addEventListener<K extends keyof EventMap>(
  type: K,
  handler: (event: NoInfer<EventMap[K]>) => void
): void {
  // Implementation...
}

// TypeScript infers from 'type', not from handler parameter
addEventListener('click', (event) => {
  // event is correctly typed as { x: number; y: number }
  console.log(event.x, event.y);
});

// Advanced: conditional inference control
function processData<T>(
  data: T,
  processor: (item: NoInfer<T>) => string,
  fallback: NoInfer<T>
): string {
  return processor(data);
}

const result = processData(
  { id: 1, name: 'John' },
  (item) => item.name, // item is inferred as { id: number; name: string }
  { id: 0, name: 'Default' } // Must match exact type
);`,
    explanation: "NoInfer prevents TypeScript from using certain parameters when figuring out generic types. This is useful when you want TypeScript to infer a type from one parameter but not let other parameters influence that decision. It helps create more predictable and intentional type inference.",
    whyElegant: "Gives precise control over TypeScript's type inference, preventing unwanted type widening while maintaining generic flexibility. Makes function signatures behave more predictably.",
    keyInsight: "NoInfer lets you control which parameters influence generic type inference, creating more intentional and predictable TypeScript APIs.",
    analogy: "Like telling a detective to solve a case based only on the first witness testimony, ignoring potentially conflicting accounts from other witnesses that might muddy the investigation.",
    sourceNote: "TypeScript 5.4+ NoInfer utility type for inference control"
  },
  {
    id: "48",
    title: "TypeScript Awaited<T>", 
    language: "TypeScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["typescript", "promises", "async", "utility"],
    code: `// Awaited<T> extracts the resolved type from Promises
type StringPromise = Promise<string>;
type ResolvedString = Awaited<StringPromise>; // string

// Works with nested Promises
type NestedPromise = Promise<Promise<number>>;
type ResolvedNumber = Awaited<NestedPromise>; // number

// Real example: API response types
async function fetchUser(): Promise<{ id: number; name: string }> {
  const response = await fetch('/api/user');
  return response.json();
}

// Extract the actual user type without Promise wrapper
type User = Awaited<ReturnType<typeof fetchUser>>;
// Type: { id: number; name: string }

// Useful for generic async functions
async function processAsync<T>(
  asyncValue: Promise<T>,
  processor: (value: Awaited<T>) => void
): Promise<void> {
  const resolved = await asyncValue;
  processor(resolved); // resolved has type T, not Promise<T>
}

// Complex example: chained async operations
type AsyncOperation<T> = Promise<{ success: boolean; data: T }>;

async function chainOperations<T>(
  op: AsyncOperation<T>
): Promise<Awaited<T> | null> {
  const result = await op;
  return result.success ? result.data : null;
}

// Array of promises
type PromiseArray = [Promise<string>, Promise<number>, Promise<boolean>];
type ResolvedArray = Awaited<PromiseArray>; // [string, number, boolean]

// Union of promises
type PromiseUnion = Promise<string> | Promise<number>;
type ResolvedUnion = Awaited<PromiseUnion>; // string | number`,
    explanation: "Awaited<T> is a TypeScript utility that unwraps Promise types to reveal what type you actually get when the promise resolves. If you have Promise<string>, Awaited gives you string. It even works with nested promises and complex async scenarios, automatically drilling down to the final resolved type.",
    whyElegant: "Eliminates the need to manually track what types emerge from async operations. Automatically handles the complexity of nested promises and provides the exact type you'll work with after awaiting.",
    keyInsight: "Awaited<T> bridges the gap between Promise types and the actual values you work with in async code.",
    analogy: "Like having X-ray vision that can see through gift wrap (Promise) to tell you exactly what's inside the box, even if it's wrapped multiple times.",
    sourceNote: "TypeScript 4.5+ Awaited utility type for Promise resolution types"
  },
  {
    id: "49",
    title: "TypeScript Parameters<T> and ReturnType<T>",
    language: "TypeScript",
    category: "JavaScript & TypeScript Patterns" as const, 
    conceptTags: ["typescript", "functions", "parameters", "utility"],
    code: `// Extract parameter and return types from existing functions
function calculateTax(price: number, rate: number, region: string): number {
  return price * rate;
}

// Extract parameter types
type CalculateTaxParams = Parameters<typeof calculateTax>;
// Type: [price: number, rate: number, region: string]

// Extract return type  
type CalculateTaxReturn = ReturnType<typeof calculateTax>;
// Type: number

// Use extracted types in other functions
function validateTaxCalculation(...args: CalculateTaxParams): boolean {
  const [price, rate, region] = args;
  return price > 0 && rate >= 0 && region.length > 0;
}

function logTaxResult(result: CalculateTaxReturn): void {
  console.log(\`Tax amount: \\$\${result.toFixed(2)}\`);
}

// Complex example: API wrapper
async function fetchUserProfile(userId: string): Promise<{
  id: string;
  name: string; 
  email: string;
}> {
  // API call implementation...
  return { id: userId, name: 'John', email: 'john@example.com' };
}

// Create wrapper types
type FetchUserParams = Parameters<typeof fetchUserProfile>;
type UserProfile = Awaited<ReturnType<typeof fetchUserProfile>>;

// Build related functions using extracted types
function cacheUserProfile(profile: UserProfile): void {
  localStorage.setItem(\`user-\${profile.id}\`, JSON.stringify(profile));
}

function validateUserId(...args: FetchUserParams): boolean {
  const [userId] = args;
  return userId.length > 0 && /^[a-zA-Z0-9]+$/.test(userId);
}

// Generic utility function
type AnyFunction = (...args: any[]) => any;

function createMemoized<F extends AnyFunction>(
  fn: F
): (...args: Parameters<F>) => ReturnType<F> {
  const cache = new Map();
  
  return (...args: Parameters<F>): ReturnType<F> => {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    
    const result = fn(...args);
    cache.set(key, result);
    return result;
  };
}`,
    explanation: "Parameters<T> and ReturnType<T> extract the input and output types from existing functions. Instead of rewriting function signatures, you can reference them automatically. Parameters gives you a tuple of all parameter types, while ReturnType gives you whatever the function returns.",
    whyElegant: "Eliminates type duplication by deriving types directly from function signatures. When the original function changes, all related types automatically stay in sync without manual updates.",
    keyInsight: "These utilities make function types the single source of truth, automatically keeping related code synchronized when signatures change.",
    analogy: "Like having a secretary who automatically updates all related documents whenever you change a contract - the parameter list and return policy stay consistent everywhere without manual copying.",
    sourceNote: "TypeScript built-in utility types for function signature extraction"
  },
  {
    id: "50",
    title: "TypeScript satisfies for type narrowing with inference",
    language: "TypeScript",
    category: "JavaScript & TypeScript Patterns" as const,
    conceptTags: ["typescript", "satisfies", "inference", "literals"],
    code: `// Problem: as const makes everything readonly, inference can be too broad
const theme = {
  colors: {
    primary: '#3b82f6',
    secondary: '#64748b'
  },
  spacing: [4, 8, 16, 24]
} as const;
// All properties become readonly, might be too restrictive

// Problem: without assertion, types are too wide
const themeLoose = {
  colors: {
    primary: '#3b82f6', // Type: string (too broad)
    secondary: '#64748b'
  },
  spacing: [4, 8, 16, 24] // Type: number[] (loses exact values)
};

// Solution: satisfies preserves literal types while allowing mutations
interface ThemeConfig {
  colors: Record<string, string>;
  spacing: number[];
}

const themePerfect = {
  colors: {
    primary: '#3b82f6',    // Type: "#3b82f6" (literal preserved!)
    secondary: '#64748b'   // Type: "#64748b" (literal preserved!)
  },
  spacing: [4, 8, 16, 24]  // Type: [4, 8, 16, 24] (tuple preserved!)
} satisfies ThemeConfig;

// Can still mutate (unlike as const)
themePerfect.colors.primary = '#ef4444'; // ✅ Works
// themePerfect.colors.invalid = 'red'; // ❌ Error - not in interface

// Advanced: conditional type narrowing
type EventConfig = {
  [K in string]: {
    data?: any;
    handler: (data: any) => void;
  }
};

const eventHandlers = {
  userLogin: {
    data: { userId: string; timestamp: number },
    handler: (data: { userId: string; timestamp: number }) => {
      console.log(\`User \${data.userId} logged in\`);
    }
  },
  pageView: {
    handler: (data: { page: string }) => {
      console.log(\`Viewed page: \${data.page}\`);  
    }
  }
} satisfies EventConfig;

// TypeScript preserves exact handler signatures
eventHandlers.userLogin.handler({ userId: '123', timestamp: Date.now() }); // ✅
// eventHandlers.userLogin.handler({ invalid: true }); // ❌ Type error

// Union type narrowing
type Status = 'loading' | 'success' | 'error';
type StatusConfig = Record<Status, { color: string; message: string }>;

const statusDisplay = {
  loading: { color: 'blue', message: 'Loading...' },
  success: { color: 'green', message: 'Success!' },
  error: { color: 'red', message: 'Error occurred' }
} satisfies StatusConfig;

// Preserves literal types for autocomplete
const loadingColor = statusDisplay.loading.color; // Type: "blue"`,
    explanation: "The 'satisfies' operator ensures your object matches a type structure while preserving the exact literal types you wrote. Unlike 'as const' (which makes everything readonly) or no assertion (which makes types too general), 'satisfies' gives you the best of both worlds: type safety with precise literal types.",
    whyElegant: "Provides type safety without sacrificing literal type precision or mutability. You get exact autocomplete values while maintaining structural correctness and flexibility.",
    keyInsight: "Satisfies preserves literal types while enforcing structure, giving you precise types without the restrictions of const assertions.",
    analogy: "Like having a quality inspector who ensures your product meets specifications but doesn't lock it in a display case - you still get the exact item you made, not just 'some product of this type'.",
    sourceNote: "TypeScript 4.9+ satisfies operator for type checking without type assertion"
  }
];
