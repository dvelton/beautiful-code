import type { CuratedExample } from '../../types';

export const apiDesign: CuratedExample[] = [
  // ── 1. jQuery method chaining ──────────────────────────────────────
  {
    id: 'jquery-method-chaining',
    title: 'jQuery: Sentences Made of Actions',
    language: 'JavaScript',
    category: 'Beautiful API Design',
    conceptTags: ['chaining', 'fluent interface', 'DOM manipulation'],
    code: `$('#notification')
  .text('File saved successfully')
  .addClass('toast toast-success')
  .fadeIn(300)
  .delay(2000)
  .fadeOut(500);`,
    explanation:
      'jQuery lets you stack actions onto a page element the way you might give a series of instructions to a friend: "Take that sign, change its message, make it green, show it, wait two seconds, then hide it." Each dot starts the next instruction, and they all apply to the same thing.',
    whyElegant:
      'Every method returns the same object you started with, so you never have to stop mid-sentence to remind the computer what you are talking about. It reads like a recipe: do this, then this, then this — no backtracking.',
    keyInsight:
      'Returning "this" after every operation turns a list of commands into a single readable sentence.',
    analogy:
      'Writing a sticky note that says "turn on oven, add pizza, wait 12 min, remove pizza" — one continuous set of instructions on one slip of paper instead of four separate notes.',
    sourceNote: 'jQuery API, John Resig, 2006',
  },

  // ── 2. Python requests ─────────────────────────────────────────────
  {
    id: 'python-requests-get',
    title: 'Requests: HTTP for Humans',
    language: 'Python',
    category: 'Beautiful API Design',
    conceptTags: ['simplicity', 'HTTP', 'readability'],
    code: `import requests

response = requests.get(
    'https://api.github.com/users/octocat',
    headers={'Accept': 'application/json'},
    timeout=5,
)
user = response.json()
print(user['name'])`,
    explanation:
      'This code asks a website for information about a user, the same way your browser does when you visit a page. The library hides all the messy plumbing — network sockets, encoding, redirects — and gives you a single line that reads almost like English: "requests, get this address."',
    whyElegant:
      'The function name is the HTTP verb itself. You do not need to know anything about sockets or byte streams. The hard parts are handled behind the curtain so the surface reads like a polite request to a librarian: "Could you get me this, please?"',
    keyInsight:
      'Matching function names to the domain vocabulary (GET, POST, PUT) eliminates the mental translation step between what you want and what you type.',
    analogy:
      'Ordering at a restaurant by saying "I\'ll have the salmon" instead of describing the fishing method, the fillet technique, and the cooking temperature.',
    sourceNote: 'Kenneth Reitz, Requests library, 2011',
  },

  // ── 3. Ruby Enumerable#lazy ────────────────────────────────────────
  {
    id: 'ruby-enumerable-lazy',
    title: 'Ruby Lazy Enumerables: Work Only When Asked',
    language: 'Ruby',
    category: 'Beautiful API Design',
    conceptTags: ['lazy evaluation', 'streams', 'composability'],
    code: `primes = (2..Float::INFINITY).lazy.select do |n|
  (2..Math.sqrt(n)).none? { |d| (n % d).zero? }
end

puts primes.first(10)
# => [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]`,
    explanation:
      'This code describes how to find prime numbers from an infinite list, but Ruby does not actually try to scan infinity. The word "lazy" tells it to work on demand — compute just enough primes to fill the request for the first ten, then stop.',
    whyElegant:
      'You describe *what* you want (primes from an infinite range, filtered, take ten) and Ruby figures out *when* to do the work. The code reads like a mathematical definition rather than a step-by-step procedure.',
    keyInsight:
      'Adding a single word — lazy — transforms an impossible infinite computation into a perfectly practical one.',
    analogy:
      'A sushi conveyor belt that only makes the next piece when someone reaches for one, instead of pre-making a million pieces and hoping someone eats them.',
    sourceNote: 'Ruby core library, Enumerable#lazy, Ruby 2.0+',
  },

  // ── 4. SQLAlchemy query builder ────────────────────────────────────
  {
    id: 'sqlalchemy-query-builder',
    title: 'SQLAlchemy: Queries That Read Like Questions',
    language: 'Python',
    category: 'Beautiful API Design',
    conceptTags: ['query builder', 'chaining', 'ORM'],
    code: `from sqlalchemy import select
from models import User, Order

stmt = (
    select(User.name, func.sum(Order.total).label('spent'))
    .join(Order, User.id == Order.user_id)
    .where(Order.created_at >= '2024-01-01')
    .group_by(User.name)
    .having(func.sum(Order.total) > 500)
    .order_by(func.sum(Order.total).desc())
)

results = session.execute(stmt).all()`,
    explanation:
      'Instead of writing raw database commands as a big block of text, you build the question piece by piece: "select these columns, join these tables, where this condition holds, group by name, keep only big spenders, sort by spending." Each line adds one clause.',
    whyElegant:
      'Each method adds exactly one idea to the query. You can read top to bottom and understand the question being asked without mentally parsing a wall of SQL text. The chain mirrors the logical structure of the question itself.',
    keyInsight:
      'A well-designed query builder lets you compose a complex question the same way you would explain it out loud — one clause at a time.',
    analogy:
      'Building a sandwich at a deli counter: "start with sourdough, add turkey, add swiss, hold the mayo, toast it" — each instruction refines the result.',
    sourceNote: 'SQLAlchemy 2.0, Mike Bayer',
  },

  // ── 5. D3 selection and data join ──────────────────────────────────
  {
    id: 'd3-data-join',
    title: 'D3: Data Shapes Become Visual Shapes',
    language: 'JavaScript',
    category: 'Beautiful API Design',
    conceptTags: ['data binding', 'declarative', 'visualization'],
    code: `d3.select('svg')
  .selectAll('circle')
  .data(cities)
  .join('circle')
    .attr('cx', d => xScale(d.longitude))
    .attr('cy', d => yScale(d.latitude))
    .attr('r',  d => rScale(d.population))
    .attr('fill', d => colorScale(d.region));`,
    explanation:
      'This code takes a list of cities and turns each one into a circle on a map. The size of each circle matches the city\'s population, and its color matches its region. D3 handles creating, updating, and removing circles automatically — you just describe the relationship between data and visuals.',
    whyElegant:
      'You never write a loop. You declare a mapping: "for each city, here is where its circle goes, how big it is, what color it is." The framework figures out the mechanical work of adding and removing elements. The code is a description, not a procedure.',
    keyInsight:
      'Binding data directly to visual elements eliminates the bookkeeping loop and lets you focus on the mapping between numbers and pictures.',
    analogy:
      'Pinning photos to a corkboard where each photo automatically finds its spot based on the date written on the back.',
    sourceNote: 'D3.js, Mike Bostock, 2011',
  },

  // ── 6. Express middleware chain ────────────────────────────────────
  {
    id: 'express-middleware-chain',
    title: 'Express Middleware: Assembly Line for Requests',
    language: 'JavaScript',
    category: 'Beautiful API Design',
    conceptTags: ['middleware', 'pipeline', 'separation of concerns'],
    code: `const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));

app.get('/api/users/:id', authenticate, authorize('admin'), async (req, res) => {
  const user = await User.findById(req.params.id);
  res.json(user);
});`,
    explanation:
      'Every web request passes through a series of checkpoints before reaching the code that actually does the work. One checkpoint allows cross-origin requests, another adds security headers, another parses the message body, another limits how fast you can ask. Each checkpoint is independent and does one job.',
    whyElegant:
      'Each middleware function knows nothing about the others. You can add, remove, or reorder them without rewriting the rest of the application. The request flows through like a letter passing through a series of mailroom clerks, each stamping or checking one thing.',
    keyInsight:
      'Composing small, single-purpose functions in a pipeline turns complex request handling into a readable list of concerns.',
    analogy:
      'An airport security line: bag scan, ID check, metal detector, pat-down — each station does one thing, and you pass through them in order.',
    sourceNote: 'Express.js, TJ Holowaychuk, 2010',
  },

  // ── 7. Koa async/await middleware ──────────────────────────────────
  {
    id: 'koa-async-middleware',
    title: 'Koa: The Onion Model of Middleware',
    language: 'JavaScript',
    category: 'Beautiful API Design',
    conceptTags: ['async/await', 'middleware', 'onion model'],
    code: `const app = new Koa();

app.use(async (ctx, next) => {
  const start = Date.now();
  await next();
  const ms = Date.now() - start;
  ctx.set('X-Response-Time', \`\${ms}ms\`);
});

app.use(async (ctx, next) => {
  console.log(\`--> \${ctx.method} \${ctx.url}\`);
  await next();
  console.log(\`<-- \${ctx.method} \${ctx.url} \${ctx.status}\`);
});

app.use(async (ctx) => {
  ctx.body = { message: 'Hello' };
});`,
    explanation:
      'Each layer wraps around the next like the layers of an onion. The timing layer starts a clock, hands control to the logging layer, which hands control to the response layer. After the response is ready, control flows back out: the logger prints the status, and the timer records how long everything took.',
    whyElegant:
      'The "await next()" call is the magic pivot point. Code before it runs on the way in; code after it runs on the way out. This gives each layer the ability to measure, modify, or react to what the inner layers did, all with plain async/await — no callbacks, no special framework hooks.',
    keyInsight:
      'A single "await next()" call gives every middleware layer both a before-hook and an after-hook for free.',
    analogy:
      'Russian nesting dolls: open each one to get to the center, then close them back up in reverse order, each doll adding its own decoration on the way out.',
    sourceNote: 'Koa.js, TJ Holowaychuk, 2013',
  },

  // ── 8. React hooks minimal counter ─────────────────────────────────
  {
    id: 'react-hooks-counter',
    title: 'React Hooks: State in a Single Line',
    language: 'TypeScript',
    category: 'Beautiful API Design',
    conceptTags: ['hooks', 'declarative UI', 'state management'],
    code: `import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </div>
  );
}`,
    explanation:
      'This creates a button that counts how many times you click it. The "useState" line says: "I need to remember a number, starting at zero, and I need a way to change it." React takes care of redrawing the screen whenever the number changes.',
    whyElegant:
      'One line declares the state, its initial value, and the function to update it. The rest of the component simply describes what the screen should look like for any given count. There is no manual screen-updating code — you describe the destination, and React handles the driving.',
    keyInsight:
      'Destructuring a state value and its setter from a single function call makes state management feel as natural as declaring a variable.',
    analogy:
      'A scoreboard at a basketball game that automatically updates the display every time the scorekeeper presses a button — the scorekeeper never touches the screen.',
    sourceNote: 'React Hooks, React team at Meta, 2019',
  },

  // ── 9. Vue computed property ───────────────────────────────────────
  {
    id: 'vue-computed-property',
    title: 'Vue Computed Properties: Values That Update Themselves',
    language: 'JavaScript',
    category: 'Beautiful API Design',
    conceptTags: ['reactivity', 'computed', 'declarative'],
    code: `import { ref, computed } from 'vue';

const items = ref([
  { name: 'Milk',  price: 3.50, qty: 2 },
  { name: 'Bread', price: 2.75, qty: 1 },
  { name: 'Eggs',  price: 4.00, qty: 3 },
]);

const total = computed(() =>
  items.value.reduce((sum, item) => sum + item.price * item.qty, 0)
);

// total.value is always correct — change any item and it recalculates`,
    explanation:
      'You define a shopping cart total as a formula, and Vue keeps it up to date automatically. If you change the price of milk or add another dozen eggs, the total recalculates on its own. You never call an "update" function — the relationship is the definition.',
    whyElegant:
      'A computed property is a living formula. You write the math once and it stays true forever, like a cell in a spreadsheet that recalculates when its inputs change. No event listeners, no manual refresh calls.',
    keyInsight:
      'Declaring a derived value as a function of its inputs lets the framework handle all the "when should I recalculate?" logic.',
    analogy:
      'A spreadsheet cell with a SUM formula — change any number it references and the total updates instantly without you pressing anything.',
    sourceNote: 'Vue.js Composition API, Evan You',
  },

  // ── 10. RxJS observable pipe ───────────────────────────────────────
  {
    id: 'rxjs-observable-pipe',
    title: 'RxJS: A Pipeline for Events Over Time',
    language: 'TypeScript',
    category: 'Beautiful API Design',
    conceptTags: ['observables', 'reactive', 'composition'],
    code: `import { fromEvent } from 'rxjs';
import { debounceTime, map, distinctUntilChanged, switchMap } from 'rxjs/operators';

const search$ = fromEvent<InputEvent>(searchBox, 'input').pipe(
  map(e => (e.target as HTMLInputElement).value.trim()),
  debounceTime(300),
  distinctUntilChanged(),
  switchMap(query => fetchResults(query)),
);

search$.subscribe(results => renderResults(results));`,
    explanation:
      'This watches a search box as someone types. It reads the text, waits 300 milliseconds for typing to pause, ignores the event if the text has not actually changed, and then fetches results. Each step in the pipe handles one concern, and they snap together like LEGO bricks.',
    whyElegant:
      'A stream of raw keyboard events gets refined step by step into a stream of search results. Each operator is a small, testable transformation. Swapping "debounceTime(300)" for "throttleTime(300)" changes behavior without touching anything else in the chain.',
    keyInsight:
      'Treating events as a stream you can filter, transform, and combine turns complex asynchronous logic into a linear, readable pipeline.',
    analogy:
      'Water flowing through a series of filters: one removes sediment, another kills bacteria, another adds minerals — clean water comes out the end without any single filter knowing about the others.',
    sourceNote: 'RxJS, Ben Lesh and contributors',
  },

  // ── 11. Lodash _.chain() ───────────────────────────────────────────
  {
    id: 'lodash-chain',
    title: 'Lodash Chain: Data Refinery in One Expression',
    language: 'JavaScript',
    category: 'Beautiful API Design',
    conceptTags: ['chaining', 'data transformation', 'functional'],
    code: `import _ from 'lodash';

const topAuthors = _.chain(blogPosts)
  .filter(post => post.published)
  .groupBy('author')
  .mapValues(posts => ({
    count: posts.length,
    avgLikes: _.meanBy(posts, 'likes'),
  }))
  .toPairs()
  .orderBy(['[1].avgLikes'], ['desc'])
  .take(5)
  .fromPairs()
  .value();`,
    explanation:
      'Starting from a pile of blog posts, this filters to published ones, groups them by author, calculates each author\'s post count and average likes, sorts by popularity, and takes the top five. Each line adds one step, and ".value()" at the end triggers the whole pipeline.',
    whyElegant:
      'Each transformation is a single line you can read in isolation. The chain turns a potentially confusing nest of function calls into a top-to-bottom narrative: "take this data, filter it, group it, summarize it, sort it, trim it."',
    keyInsight:
      'Wrapping a value in a chain object lets you apply an arbitrary sequence of transformations as a single, readable expression.',
    analogy:
      'A factory assembly line where raw material enters at one end and a finished product rolls off the other, with each station performing exactly one operation.',
    sourceNote: 'Lodash, John-David Dalton',
  },

  // ── 12. Pandas groupby().agg() ─────────────────────────────────────
  {
    id: 'pandas-groupby-agg',
    title: 'Pandas: Ask a Question About Your Data in One Line',
    language: 'Python',
    category: 'Beautiful API Design',
    conceptTags: ['data analysis', 'pipeline', 'aggregation'],
    code: `import pandas as pd

summary = (
    df[df['status'] == 'completed']
    .groupby(['region', 'product'])
    .agg(
        total_revenue=('revenue', 'sum'),
        avg_order=('revenue', 'mean'),
        order_count=('order_id', 'nunique'),
    )
    .sort_values('total_revenue', ascending=False)
    .head(20)
)`,
    explanation:
      'Starting from a spreadsheet of orders, this keeps only the completed ones, groups them by region and product, calculates total revenue, average order size, and number of unique orders for each group, sorts the biggest earners to the top, and takes the top twenty rows.',
    whyElegant:
      'The code mirrors the question a business analyst would ask in plain English. Each chained method is one clause of that question. The named aggregations ("total_revenue", "avg_order") mean the output columns are self-documenting.',
    keyInsight:
      'Named aggregations inside .agg() let you define what to compute and what to call the result in one place, eliminating a separate rename step.',
    analogy:
      'Asking a librarian to sort all returned books by genre and shelf, count how many are in each group, and hand you a summary card for the top twenty categories.',
    sourceNote: 'Pandas library, Wes McKinney',
  },

  // ── 13. Unix find predicate composition ────────────────────────────
  {
    id: 'unix-find-predicates',
    title: 'Unix find: Boolean Logic as Command-Line Grammar',
    language: 'Shell',
    category: 'Beautiful API Design',
    conceptTags: ['composition', 'predicates', 'Unix philosophy'],
    code: `find ./src \\
  \\( -name '*.ts' -o -name '*.tsx' \\) \\
  -not -path '*/node_modules/*' \\
  -newer tsconfig.json \\
  -size +1k \\
  -exec grep -l 'TODO' {} +`,
    explanation:
      'This searches for TypeScript files, ignoring anything inside node_modules, that were modified more recently than the config file, are larger than 1 kilobyte, and contain the word "TODO." Each flag adds one filter, and the filters combine with AND logic by default (OR if you use "-o").',
    whyElegant:
      'Filters compose like adjectives in a sentence: "find me large, recent TypeScript files containing TODOs." Adding or removing a predicate does not break the others. A tool designed in 1977 anticipated the need for arbitrary boolean composition of search criteria.',
    keyInsight:
      'Treating search criteria as composable predicates connected by implicit AND lets users build arbitrarily complex queries from simple, orthogonal flags.',
    analogy:
      'A checklist at a quality-control station: every item must pass each test, and you can add or remove tests from the checklist without redesigning the station.',
    sourceNote: 'Unix find, IEEE Std 1003.1 (POSIX)',
  },

  // ── 14. CSS selector specificity ───────────────────────────────────
  {
    id: 'css-selector-specificity',
    title: 'CSS Selectors: A Vocabulary for Pointing at Things',
    language: 'CSS',
    category: 'Beautiful API Design',
    conceptTags: ['selectors', 'specificity', 'declarative'],
    code: `/* Element — broad stroke */
p { line-height: 1.6; }

/* Class — medium precision */
.card { border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }

/* Attribute — pattern matching */
a[href^="https://"] { color: green; }

/* Pseudo-class — state-aware */
button:hover:not(:disabled) { background: #0066cc; }

/* Combinators — relationships */
.sidebar > ul > li + li { border-top: 1px solid #eee; }`,
    explanation:
      'CSS selectors are a mini-language for pointing at parts of a web page. You can point broadly ("every paragraph"), with medium precision ("things with the card class"), by attribute pattern ("links starting with https"), by interactive state ("a hovered, non-disabled button"), or by family relationship ("list items that follow another list item inside a sidebar").',
    whyElegant:
      'The selector system is a vocabulary, not a programming language. Each selector reads like a description: "the hovered, non-disabled button." You never tell the browser how to find these elements — you describe which ones you mean, and the browser figures out the rest.',
    keyInsight:
      'A well-designed selector language lets you describe targets by their properties and relationships rather than by their position in memory.',
    analogy:
      'Describing a person at a party — "the tall one in the red jacket standing next to the DJ" — instead of giving GPS coordinates.',
    sourceNote: 'W3C CSS Selectors specification',
  },

  // ── 15. HTTP status codes ──────────────────────────────────────────
  {
    id: 'http-status-codes',
    title: 'HTTP Status Codes: A Shared Dictionary of Outcomes',
    language: 'HTTP',
    category: 'Beautiful API Design',
    conceptTags: ['protocol design', 'semantics', 'convention'],
    code: `200 OK                    — Here is what you asked for.
201 Created               — Done; I made a new thing for you.
204 No Content            — Done; nothing to send back.
301 Moved Permanently     — This lives somewhere else now.
304 Not Modified          — You already have the latest version.
400 Bad Request           — I cannot understand your request.
401 Unauthorized          — Tell me who you are first.
403 Forbidden             — I know who you are; the answer is no.
404 Not Found             — Nothing here by that name.
409 Conflict              — That clashes with the current state.
429 Too Many Requests     — Slow down, please.
500 Internal Server Error — Something broke on my end.
503 Service Unavailable   — I am temporarily down; try later.`,
    explanation:
      'HTTP status codes are a numbered shorthand that every web server and browser agree on. The first digit tells you the category: 2xx means success, 3xx means "look elsewhere," 4xx means you made an error, 5xx means the server made an error. Any developer or tool can understand the outcome without reading the message body.',
    whyElegant:
      'A three-digit number carries enough meaning for machines to act automatically (retry on 503, redirect on 301) while remaining human-readable. The numbering scheme encodes a taxonomy: you can handle all 4xx codes the same way if you want broad logic, or handle 404 specifically if you need precision.',
    keyInsight:
      'Encoding outcome categories in the first digit of a status code gives consumers a useful fallback even for codes they have never seen before.',
    analogy:
      'The colored cards a referee holds up at a soccer match — red means ejection, yellow means warning — everyone in the stadium understands instantly.',
    sourceNote: 'RFC 9110 (HTTP Semantics), IETF',
  },

  // ── 16. REST resource naming ───────────────────────────────────────
  {
    id: 'rest-resource-naming',
    title: 'REST URLs: Addresses That Explain Themselves',
    language: 'HTTP',
    category: 'Beautiful API Design',
    conceptTags: ['REST', 'naming', 'convention', 'self-documenting'],
    code: `GET    /teams                          # list all teams
POST   /teams                          # create a team
GET    /teams/7                         # get team 7
PATCH  /teams/7                         # update team 7

GET    /teams/7/members                 # list members of team 7
PUT    /teams/7/members/42              # set member 42 on team 7
DELETE /teams/7/members/42              # remove member 42

GET    /teams/7/members/42/permissions  # member 42's permissions`,
    explanation:
      'REST URLs read like a mailing address: start broad (all teams), get more specific (team 7), then drill in (members, then a specific member, then that member\'s permissions). The HTTP verb (GET, POST, PATCH, DELETE) says what you want to do; the URL says what you are doing it to.',
    whyElegant:
      'The URL is a noun and the verb is an HTTP method. This separation means you can add new verbs (actions) without changing the address scheme, and new resources without inventing new verbs. The hierarchy in the path mirrors the real-world relationship between the objects.',
    keyInsight:
      'Separating "what you are talking about" (the URL) from "what you want to do" (the HTTP method) produces an API that reads like a natural sentence: "GET the members of team 7."',
    analogy:
      'A filing cabinet where the drawer label says "Teams," the folder tab says "Team 7," and the section divider says "Members" — anyone can find what they need without a manual.',
    sourceNote: 'Roy Fielding, REST architectural style, 2000',
  },

  // ── 17. GraphQL query mirrors response ─────────────────────────────
  {
    id: 'graphql-query-shape',
    title: 'GraphQL: Ask for Exactly the Shape You Need',
    language: 'GraphQL',
    category: 'Beautiful API Design',
    conceptTags: ['query language', 'shape matching', 'self-documenting'],
    code: `query {
  repository(owner: "facebook", name: "react") {
    name
    description
    stargazerCount
    issues(first: 3, states: OPEN) {
      nodes {
        title
        createdAt
        author { login }
      }
    }
  }
}`,
    explanation:
      'You write the shape of the data you want, and the server returns exactly that shape — no more, no less. If you ask for a repository\'s name, description, star count, and three open issues with their titles, dates, and authors, that is precisely the JSON object you get back.',
    whyElegant:
      'The query *is* the documentation. Anyone reading the query can see exactly what data the client needs. There are no extra fields to ignore and no missing fields to fetch with a second request. The structure of the question matches the structure of the answer.',
    keyInsight:
      'When the shape of the query predicts the shape of the response, developers can understand the data contract at a glance.',
    analogy:
      'A custom pizza order form where you check the toppings you want, and the pizza arrives with exactly those toppings in the same arrangement as the form.',
    sourceNote: 'GraphQL, Facebook/Meta, 2015',
  },

  // ── 18. gRPC service definition ────────────────────────────────────
  {
    id: 'grpc-service-definition',
    title: 'gRPC: A Shared Contract Between Services',
    language: 'Protocol Buffers',
    category: 'Beautiful API Design',
    conceptTags: ['RPC', 'schema', 'code generation', 'typed'],
    code: `syntax = "proto3";

service BookStore {
  rpc ListBooks (ListBooksRequest)   returns (ListBooksResponse);
  rpc GetBook   (GetBookRequest)     returns (Book);
  rpc CreateBook(CreateBookRequest)  returns (Book);
  rpc StreamNew (Empty)              returns (stream Book);
}

message Book {
  string id     = 1;
  string title  = 2;
  string author = 3;
  int32  year   = 4;
}

message ListBooksRequest {
  int32  page_size  = 1;
  string page_token = 2;
}`,
    explanation:
      'This file defines a contract between two computer programs: "Here is a bookstore service. You can list books, get one book, create a book, or subscribe to a live stream of new books. Here is exactly what a Book looks like." Both sides generate code from this single file, so they can never disagree on the format.',
    whyElegant:
      'One file is the single source of truth. Client code and server code are generated automatically, so there is no room for the two sides to fall out of sync. The numbered fields (= 1, = 2) allow the format to evolve without breaking older clients.',
    keyInsight:
      'Defining the contract once in a language-neutral schema and generating code for both sides eliminates an entire class of integration bugs.',
    analogy:
      'A bilingual dictionary that both countries use — neither side can invent a word the other does not recognize.',
    sourceNote: 'gRPC and Protocol Buffers, Google',
  },

  // ── 19. OpenAPI operation description ──────────────────────────────
  {
    id: 'openapi-operation',
    title: 'OpenAPI: The Blueprint Every Tool Can Read',
    language: 'YAML',
    category: 'Beautiful API Design',
    conceptTags: ['specification', 'documentation', 'code generation'],
    code: `paths:
  /pets/{petId}:
    get:
      operationId: getPetById
      summary: Returns a pet by its ID
      parameters:
        - name: petId
          in: path
          required: true
          schema:
            type: integer
            minimum: 1
      responses:
        '200':
          description: A single pet
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Pet'
        '404':
          description: Pet not found`,
    explanation:
      'This is a machine-readable blueprint for one API endpoint. It says: "Send a GET request to /pets/{petId} with a positive integer ID. You will either get a Pet object back (200) or a not-found error (404)." Tools can read this file to generate documentation, client libraries, test suites, and mock servers automatically.',
    whyElegant:
      'One YAML file feeds a dozen tools. Write the spec once and you get interactive docs, type-safe clients, validation middleware, and mock servers without writing any of them by hand. The spec is both human-readable and machine-actionable.',
    keyInsight:
      'A single, standardized description of an API can generate documentation, client code, and tests — making the spec the most valuable artifact in the project.',
    analogy:
      'An architect\'s blueprint that the electrician, plumber, and carpenter all read from — one document drives all the trades.',
    sourceNote: 'OpenAPI Specification (formerly Swagger), Linux Foundation',
  },

  // ── 20. Swagger parameter as documentation ─────────────────────────
  {
    id: 'swagger-parameter-docs',
    title: 'Swagger: Parameters That Document Themselves',
    language: 'YAML',
    category: 'Beautiful API Design',
    conceptTags: ['self-documenting', 'validation', 'schema'],
    code: `parameters:
  - name: status
    in: query
    description: Filter pets by adoption status
    required: false
    schema:
      type: string
      enum: [available, pending, adopted]
      default: available
    example: pending

  - name: limit
    in: query
    description: Maximum number of results to return
    required: false
    schema:
      type: integer
      minimum: 1
      maximum: 100
      default: 20`,
    explanation:
      'Each parameter carries its own instruction manual: what it is called, where it goes, whether it is required, what values are allowed, what the default is, and a concrete example. A developer — or an automated tool — can look at this and know everything needed to use the parameter correctly.',
    whyElegant:
      'The constraint is the documentation. "enum: [available, pending, adopted]" simultaneously tells the developer what values are legal, lets the server reject invalid ones, and lets a UI tool render a dropdown. One declaration serves three purposes.',
    keyInsight:
      'When a parameter definition includes its constraints, defaults, and examples, the schema itself becomes the best possible documentation.',
    analogy:
      'A form field with a dropdown menu, a placeholder example, and a red asterisk for "required" — you know exactly what to put in without reading a manual.',
    sourceNote: 'OpenAPI Specification, parameter object',
  },

  // ── 21. Terraform resource declaration ─────────────────────────────
  {
    id: 'terraform-resource',
    title: 'Terraform: Infrastructure as a Wish List',
    language: 'HCL',
    category: 'Beautiful API Design',
    conceptTags: ['declarative', 'infrastructure as code', 'idempotent'],
    code: `resource "aws_s3_bucket" "uploads" {
  bucket = "acme-user-uploads"

  versioning {
    enabled = true
  }

  server_side_encryption_configuration {
    rule {
      apply_server_side_encryption_by_default {
        sse_algorithm = "aws:kms"
      }
    }
  }

  lifecycle {
    prevent_destroy = true
  }

  tags = {
    Team        = "platform"
    Environment = "production"
  }
}`,
    explanation:
      'This does not contain step-by-step instructions for creating a storage bucket. It is a description of the bucket you want: named "acme-user-uploads," versioned, encrypted, protected from accidental deletion, tagged for the platform team. Terraform compares this wish list to reality and makes whatever changes are needed to bring reality in line.',
    whyElegant:
      'You describe the desired end state, and the tool figures out the steps to get there. Run it twice and nothing changes the second time — it is already in the right state. This "describe, don\'t prescribe" approach eliminates entire categories of "but what if it already exists?" bugs.',
    keyInsight:
      'Declaring the desired state instead of scripting the steps to reach it makes infrastructure changes idempotent and reviewable as code diffs.',
    analogy:
      'Telling a house painter "I want the bedroom walls sage green" instead of listing every brush stroke — the painter figures out the how.',
    sourceNote: 'Terraform, HashiCorp',
  },

  // ── 22. Kubernetes YAML ────────────────────────────────────────────
  {
    id: 'kubernetes-declarative-intent',
    title: 'Kubernetes: Tell the Cluster What You Want',
    language: 'YAML',
    category: 'Beautiful API Design',
    conceptTags: ['declarative', 'orchestration', 'desired state'],
    code: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-frontend
spec:
  replicas: 3
  selector:
    matchLabels:
      app: frontend
  template:
    metadata:
      labels:
        app: frontend
    spec:
      containers:
        - name: frontend
          image: acme/frontend:2.4.1
          ports:
            - containerPort: 3000
          resources:
            requests:
              cpu: 100m
              memory: 128Mi
            limits:
              cpu: 500m
              memory: 256Mi`,
    explanation:
      'This file says: "I want three copies of the frontend application running, each using version 2.4.1 of the code, each listening on port 3000, each getting a minimum of 100 millicores of CPU and 128 megabytes of memory." Kubernetes reads this wish and continuously works to make it true — restarting containers that crash, spreading them across machines, scaling up or down.',
    whyElegant:
      'The YAML is a statement of intent, not a procedure. You never say "start container, check health, restart if dead." The system\'s job is to converge reality toward your declared desire. The entire operational runbook is implicit in the spec.',
    keyInsight:
      'A declarative manifest turns operational intent into a diffable, version-controllable artifact that the system continuously reconciles with reality.',
    analogy:
      'A thermostat: you set 72 °F and the system keeps the room there, turning the heat up or the AC on as needed — you never flip switches yourself.',
    sourceNote: 'Kubernetes, CNCF / Google',
  },

  // ── 23. Nix derivation ─────────────────────────────────────────────
  {
    id: 'nix-derivation-pure-function',
    title: 'Nix: A Build Recipe as a Pure Function',
    language: 'Nix',
    category: 'Beautiful API Design',
    conceptTags: ['pure functions', 'reproducibility', 'package management'],
    code: `{ lib, stdenv, fetchFromGitHub, cmake, openssl }:

stdenv.mkDerivation rec {
  pname = "myapp";
  version = "1.3.0";

  src = fetchFromGitHub {
    owner = "acme";
    repo = "myapp";
    rev = "v\${version}";
    sha256 = "0abc123...";
  };

  nativeBuildInputs = [ cmake ];
  buildInputs = [ openssl ];

  meta = with lib; {
    description = "A small example application";
    license = licenses.mit;
    platforms = platforms.unix;
  };
}`,
    explanation:
      'This file is a recipe: "To build myapp version 1.3.0, fetch the source from GitHub (verified by a checksum), use cmake as the build tool and openssl as a dependency." The function takes its dependencies as inputs and produces exactly one output. Given the same inputs, you always get the same result — on any machine, today or five years from now.',
    whyElegant:
      'Every dependency is an explicit input parameter. Nothing is secretly pulled from the internet or from a global system path. This makes the build a pure mathematical function: same inputs, same output, every time. Reproducibility is not a goal you strive for — it is a structural guarantee.',
    keyInsight:
      'Treating a build recipe as a pure function with explicit inputs makes reproducibility a structural property rather than a best-effort aspiration.',
    analogy:
      'A lab notebook that lists every reagent, quantity, and instrument so precisely that any chemist anywhere can reproduce the experiment and get the same compound.',
    sourceNote: 'Nix package manager, Eelco Dolstra',
  },

  // ── 24. Makefile target dependency graph ───────────────────────────
  {
    id: 'makefile-dependency-graph',
    title: 'Makefile: Targets as a Dependency Map',
    language: 'Makefile',
    category: 'Beautiful API Design',
    conceptTags: ['dependency graph', 'incremental builds', 'declarative'],
    code: `.PHONY: all test clean

all: build test

build: dist/app.js dist/styles.css

dist/app.js: $(wildcard src/**/*.ts) tsconfig.json
\tnode_modules/.bin/esbuild src/index.ts --bundle --outfile=$@

dist/styles.css: $(wildcard src/**/*.css)
\tcat $^ | node_modules/.bin/postcss --output $@

test: build
\tnode_modules/.bin/vitest run

clean:
\trm -rf dist`,
    explanation:
      'A Makefile is a map of what depends on what. "The app.js file depends on all TypeScript source files and the config. Tests depend on a successful build. The \'all\' target means: build, then test." Make looks at which files have changed and only reruns the minimum work needed.',
    whyElegant:
      'You declare relationships between artifacts, and Make figures out the order and the minimum work. Change one CSS file? Only the stylesheet rebuilds. Change a TypeScript file? The bundle rebuilds and tests rerun, but CSS is untouched. The dependency graph is explicit and inspectable.',
    keyInsight:
      'Declaring targets and their prerequisites as a graph lets the build system derive the optimal execution order and skip work that is already up to date.',
    analogy:
      'A family tree: you can trace who depends on whom, and if one person changes their name, only the documents that reference that person need updating.',
    sourceNote: 'GNU Make, Stuart Feldman (original, 1976)',
  },

  // ── 25. CMake modern target-based API ──────────────────────────────
  {
    id: 'cmake-modern-targets',
    title: 'CMake: Build Requirements Travel with the Target',
    language: 'CMake',
    category: 'Beautiful API Design',
    conceptTags: ['build systems', 'target-based', 'transitive dependencies'],
    code: `cmake_minimum_required(VERSION 3.20)
project(myapp LANGUAGES CXX)

add_library(core STATIC
  src/core/engine.cpp
  src/core/parser.cpp
)
target_include_directories(core PUBLIC include)
target_compile_features(core PUBLIC cxx_std_20)

add_library(network STATIC src/net/client.cpp)
target_link_libraries(network PUBLIC core)
target_link_libraries(network PRIVATE OpenSSL::SSL)

add_executable(app src/main.cpp)
target_link_libraries(app PRIVATE network)`,
    explanation:
      'Each library carries its own requirements with it. The "core" library says: "Anyone who uses me needs access to the include directory and C++20." When "network" links to "core," it inherits those requirements automatically. When "app" links to "network," it inherits everything transitively. You never repeat yourself.',
    whyElegant:
      'Requirements propagate through the dependency graph. PUBLIC means "I need this and so does anyone who uses me." PRIVATE means "I need this but my users do not." This single distinction eliminates pages of redundant configuration that older build systems required.',
    keyInsight:
      'Attaching build requirements to targets and propagating them through dependency edges eliminates redundant configuration and keeps each target self-describing.',
    analogy:
      'A recipe that says "this dish contains nuts" — any menu that includes the dish automatically inherits the allergen warning without the chef rewriting it.',
    sourceNote: 'CMake 3.x modern usage, Kitware',
  },

  // ── 26. Gradle DSL task graph ──────────────────────────────────────
  {
    id: 'gradle-dsl-task-graph',
    title: 'Gradle: Build Logic as a Groovy Conversation',
    language: 'Groovy',
    category: 'Beautiful API Design',
    conceptTags: ['DSL', 'task graph', 'build automation'],
    code: `plugins {
    id 'java'
    id 'application'
}

repositories {
    mavenCentral()
}

dependencies {
    implementation 'com.google.guava:guava:33.0.0-jre'
    testImplementation 'org.junit.jupiter:junit-jupiter:5.10.1'
}

application {
    mainClass = 'com.acme.App'
}

tasks.named('test') {
    useJUnitPlatform()
    maxParallelForks = Runtime.runtime.availableProcessors()
}`,
    explanation:
      'This build file reads almost like a conversation: "Use the Java and application plugins. Pull libraries from Maven Central. The app depends on Guava; tests use JUnit 5. The main class is App. When running tests, use JUnit Platform and parallelize across all CPU cores." Behind the scenes, Gradle builds a task graph and executes only what has changed.',
    whyElegant:
      'The Groovy DSL disguises a complex build graph as a set of plain declarations. "dependencies" is not a list you manage — it is a block that configures a dependency resolution engine. The API meets you where you think: in terms of what your project needs, not in terms of what the build tool does internally.',
    keyInsight:
      'A DSL that mirrors how developers think about projects (plugins, dependencies, tasks) hides the graph-resolution machinery behind natural-sounding blocks.',
    analogy:
      'A voice-activated assistant: you say "play jazz" instead of "open music app, search genre database, filter by jazz, select top playlist, press play."',
    sourceNote: 'Gradle Build Tool, Gradle Inc.',
  },

  // ── 27. Bazel BUILD file ───────────────────────────────────────────
  {
    id: 'bazel-build-file',
    title: 'Bazel BUILD: Pure Descriptions, No Side Effects',
    language: 'Starlark',
    category: 'Beautiful API Design',
    conceptTags: ['hermetic builds', 'declarative', 'reproducibility'],
    code: `load("@rules_go//go:def.bzl", "go_binary", "go_library", "go_test")

go_library(
    name = "server_lib",
    srcs = ["server.go", "routes.go", "middleware.go"],
    deps = [
        "//internal/auth",
        "//internal/db",
        "@com_github_gorilla_mux//:mux",
    ],
    visibility = ["//cmd:__subpackages__"],
)

go_binary(
    name = "server",
    embed = [":server_lib"],
)

go_test(
    name = "server_test",
    srcs = ["server_test.go"],
    embed = [":server_lib"],
    size = "small",
)`,
    explanation:
      'A BUILD file is a pure description: "Here is a Go library made of these files, depending on these other libraries. Here is a binary that embeds it. Here is a test." There are no if-statements, no loops, no side effects. Bazel reads this description and handles caching, parallelism, and remote execution.',
    whyElegant:
      'BUILD files are intentionally limited: no control flow, no reading from disk, no network calls. This restriction is the source of their power — because the file can only describe, Bazel can perfectly cache and parallelize the build. The constraint enables the optimization.',
    keyInsight:
      'Restricting build files to pure descriptions (no side effects, no control flow) gives the build system enough information to guarantee correctness, caching, and parallelism.',
    analogy:
      'A restaurant menu that lists dishes and ingredients — the kitchen decides the cooking order, which burners to use, and what to prep in parallel.',
    sourceNote: 'Bazel, Google',
  },

  // ── 28. Dhall configuration ────────────────────────────────────────
  {
    id: 'dhall-typed-config',
    title: 'Dhall: Configuration as a Typed Function',
    language: 'Dhall',
    category: 'Beautiful API Design',
    conceptTags: ['typed configuration', 'functions', 'safety'],
    code: `let Service = { name : Text, port : Natural, replicas : Natural, env : Text }

let mkService =
      \\(name : Text) ->
      \\(port : Natural) ->
      \\(env : Text) ->
        { name
        , port
        , replicas = if env == "production" then 3 else 1
        , env
        }
      : Service

let services =
      [ mkService "api"     8080 "production"
      , mkService "worker"  9090 "production"
      , mkService "admin"   3000 "staging"
      ]

in  services`,
    explanation:
      'Instead of copying and pasting the same block of configuration for each service, you define a function: "Given a name, port, and environment, here is the config, with replicas automatically set to 3 in production and 1 otherwise." Dhall checks types at evaluation time, so a typo or wrong type is caught before anything deploys.',
    whyElegant:
      'Configuration is just data — but data produced by typed functions. This means you get the safety of a programming language (type errors, no null surprises) with the simplicity of a config file (no unbounded computation, guaranteed to terminate). You cannot write an infinite loop in Dhall.',
    keyInsight:
      'A configuration language that supports functions and types but guarantees termination gives you abstraction without the risks of a general-purpose language.',
    analogy:
      'A mail-merge template: fill in the blanks (name, address) and the letter writes itself, but the template cannot delete your files or access the internet.',
    sourceNote: 'Dhall configuration language, Gabriella Gonzalez',
  },

  // ── 29. CUE constraint as schema ───────────────────────────────────
  {
    id: 'cue-constraint-schema',
    title: 'CUE: Constraints and Data Are the Same Thing',
    language: 'CUE',
    category: 'Beautiful API Design',
    conceptTags: ['constraints', 'unification', 'schema'],
    code: `#Deployment: {
    apiVersion: "apps/v1"
    kind:       "Deployment"
    metadata: name: string & =~"^[a-z][a-z0-9-]*$"
    spec: {
        replicas: int & >=1 & <=10
        selector: matchLabels: app: metadata.name
        template: spec: containers: [...#Container]
    }
}

#Container: {
    name:  string
    image: string & =~"^[a-z0-9./-]+:[a-z0-9._-]+$"
    ports: [...{containerPort: int & >0 & <=65535}]
    resources: {
        requests: {cpu: string; memory: string}
        limits:   {cpu: string; memory: string}
    }
}

myApp: #Deployment & {
    metadata: name: "web-frontend"
    spec: replicas: 3
    spec: template: spec: containers: [{
        name:  "frontend"
        image: "acme/frontend:2.4.1"
        ports: [{containerPort: 3000}]
        resources: {
            requests: {cpu: "100m", memory: "128Mi"}
            limits:   {cpu: "500m", memory: "256Mi"}
        }
    }]
}`,
    explanation:
      'CUE merges the idea of a schema (the rules) and the data (the values) into one language. The #Deployment definition says "replicas must be between 1 and 10, the name must be lowercase with dashes." When you write "myApp," CUE checks that your concrete values satisfy those constraints. Schema and data use the same syntax.',
    whyElegant:
      'There is no separate "validation step." Constraints are part of the type, and data is just a more specific constraint. Writing "replicas: 3" satisfies "replicas: int & >=1 & <=10" because 3 is more specific than "an integer between 1 and 10." Validation is unification, and unification is just narrowing down possibilities.',
    keyInsight:
      'When constraints and values live in the same language, validation becomes unification — the act of checking and the act of defining are the same operation.',
    analogy:
      'A coloring book where the outlines are the rules and your crayons are the data — the picture is valid if and only if the color stays inside the lines.',
    sourceNote: 'CUE language, Marcel van Lohuizen (Google)',
  },

  // ── 30. JSON Schema if/then/else ───────────────────────────────────
  {
    id: 'json-schema-conditional',
    title: 'JSON Schema: Conditional Validation Without Code',
    language: 'JSON',
    category: 'Beautiful API Design',
    conceptTags: ['schema', 'conditional logic', 'validation'],
    code: `{
  "type": "object",
  "properties": {
    "paymentMethod": {
      "enum": ["credit_card", "bank_transfer", "crypto"]
    }
  },
  "required": ["paymentMethod"],
  "allOf": [
    {
      "if": {
        "properties": { "paymentMethod": { "const": "credit_card" } }
      },
      "then": {
        "properties": {
          "cardNumber": { "type": "string", "pattern": "^[0-9]{16}$" },
          "expiry":     { "type": "string", "pattern": "^(0[1-9]|1[0-2])/[0-9]{2}$" }
        },
        "required": ["cardNumber", "expiry"]
      }
    },
    {
      "if": {
        "properties": { "paymentMethod": { "const": "bank_transfer" } }
      },
      "then": {
        "properties": {
          "iban": { "type": "string", "minLength": 15, "maxLength": 34 }
        },
        "required": ["iban"]
      }
    },
    {
      "if": {
        "properties": { "paymentMethod": { "const": "crypto" } }
      },
      "then": {
        "properties": {
          "walletAddress": { "type": "string", "minLength": 26, "maxLength": 62 }
        },
        "required": ["walletAddress"]
      }
    }
  ]
}`,
    explanation:
      'This schema says: "If the payment method is credit card, then you must provide a 16-digit card number and expiry date. If it is a bank transfer, you must provide an IBAN. If it is crypto, you must provide a wallet address." The validation rules change depending on the data itself — all without a single line of programming logic.',
    whyElegant:
      'Conditional validation lives in the data description, not in procedural code. Any tool that speaks JSON Schema (form builders, API gateways, test generators) can enforce these rules without custom logic. The if/then/else keywords bring branching logic to a format that is otherwise purely declarative.',
    keyInsight:
      'Adding if/then/else to a schema language lets data descriptions express conditional requirements that would otherwise require procedural code.',
    analogy:
      'A government form where checking "self-employed" reveals a different set of required fields than checking "employed" — the form adapts to your situation, but no one wrote code for it.',
    sourceNote: 'JSON Schema, draft-07+ (if/then/else keywords)',
  },
];
