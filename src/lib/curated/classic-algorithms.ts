import type { CuratedExample } from '../../types';

export const classicAlgorithms: CuratedExample[] = [
  {
    id: 'quicksort-partition',
    title: 'Quicksort Partition (Lomuto Scheme)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['sorting', 'divide-and-conquer', 'in-place', 'partitioning'],
    code: `def partition(arr, lo, hi):
    pivot = arr[hi]
    i = lo
    for j in range(lo, hi):
        if arr[j] <= pivot:
            arr[i], arr[j] = arr[j], arr[i]
            i += 1
    arr[i], arr[hi] = arr[hi], arr[i]
    return i`,
    explanation: 'Pick the last element as a dividing value, then walk through the list. Every time you find something smaller, swap it to the left side. When the walk finishes, drop the dividing value into the gap between the two sides. That value is now in its final sorted position.',
    whyElegant: 'One pointer, one pass, zero extra memory. The partition is the engine of quicksort, and Lomuto distills it to its simplest possible form: a single scan with a boundary marker.',
    keyInsight: 'A single left-to-right scan with one boundary pointer is enough to split an array in two around a pivot.',
    analogy: 'Sorting a hand of cards by picking one card as the divider, then sliding every smaller card to the left of your hand in one sweep.',
    sourceNote: 'Lomuto partition scheme, popularized by Jon Bentley in Programming Pearls (1986).',
  },
  {
    id: 'binary-search',
    title: 'Binary Search',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['searching', 'divide-and-conquer', 'logarithmic'],
    code: `def binary_search(arr, target):
    lo, hi = 0, len(arr) - 1
    while lo <= hi:
        mid = (lo + hi) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            lo = mid + 1
        else:
            hi = mid - 1
    return -1`,
    explanation: 'Start with the full sorted list. Look at the middle element. If it matches, you are done. If your target is bigger, throw away the left half; if smaller, throw away the right half. Repeat until you find it or run out of list.',
    whyElegant: 'Each comparison eliminates half the remaining possibilities. Searching a billion items takes at most 30 checks. The code is short enough to fit on an index card, yet it took decades to get the implementation right.',
    keyInsight: 'Halving the search space each step turns a billion-element search into about 30 comparisons.',
    analogy: 'Looking up a word in a paper dictionary: you open to the middle, decide if your word comes before or after, and repeat with the smaller half.',
    sourceNote: 'First published by John Mauchly in 1946; the first bug-free version appeared in 1962.',
  },
  {
    id: 'euclidean-gcd',
    title: 'Euclidean GCD',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['number-theory', 'recursion', 'mathematical'],
    code: `def gcd(a, b):
    while b:
        a, b = b, a % b
    return a`,
    explanation: 'To find the largest number that divides both a and b evenly, replace the bigger number with the remainder of dividing the two. Keep going until the remainder is zero. The last non-zero value is the answer.',
    whyElegant: 'Two lines of loop body, discovered over 2,300 years ago, and still the fastest way to compute a greatest common divisor. It converges in O(log(min(a,b))) steps.',
    keyInsight: 'The GCD of two numbers never changes when you replace the larger with the remainder of their division.',
    analogy: 'Measuring a long rope with a shorter stick: you mark off stick-lengths, keep the leftover, then measure the stick with the leftover, repeating until one fits exactly.',
    sourceNote: 'Euclid, Elements, Book VII, Propositions 1-2 (circa 300 BCE). Oldest known non-trivial algorithm.',
  },
  {
    id: 'bresenhams-line',
    title: 'Bresenham\'s Line Drawing',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['graphics', 'integer-arithmetic', 'rasterization'],
    code: `def bresenham(x0, y0, x1, y1):
    dx, dy = abs(x1 - x0), abs(y1 - y0)
    sx = 1 if x0 < x1 else -1
    sy = 1 if y0 < y1 else -1
    err = dx - dy
    points = []
    while True:
        points.append((x0, y0))
        if x0 == x1 and y0 == y1:
            break
        e2 = 2 * err
        if e2 > -dy:
            err -= dy
            x0 += sx
        if e2 < dx:
            err += dx
            y0 += sy
    return points`,
    explanation: 'Draws a straight line on a pixel grid using only integer addition and subtraction. It tracks a running error term that tells it whether the next pixel should step horizontally, vertically, or diagonally.',
    whyElegant: 'No floating-point math, no division, no multiplication beyond doubling. Bresenham turned a continuous geometry problem into integer accumulation, making it fast enough for 1960s hardware and still used in modern renderers.',
    keyInsight: 'An accumulated integer error term can replace floating-point slope calculations for pixel-perfect line drawing.',
    analogy: 'Walking across a tiled floor diagonally: at each tile, you decide whether to step right, down, or both, based on how far off-center you have drifted.',
    sourceNote: 'Jack Bresenham, IBM, 1962. Originally designed for a Calcomp plotter.',
  },
  {
    id: 'boyer-moore-majority',
    title: 'Boyer-Moore Majority Vote',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['streaming', 'voting', 'linear-time', 'constant-space'],
    code: `def majority_vote(arr):
    candidate, count = None, 0
    for x in arr:
        if count == 0:
            candidate = x
        count += 1 if x == candidate else -1
    return candidate`,
    explanation: 'Walk through the list keeping a candidate and a counter. When you see the candidate, add one; otherwise subtract one. If the counter hits zero, adopt the current element as the new candidate. If any element appears more than half the time, it will be the final candidate.',
    whyElegant: 'One pass, one variable for the candidate, one for the count. It finds the majority element (if one exists) without sorting, hashing, or using any extra storage proportional to the input size.',
    keyInsight: 'Pairing off different elements cancels minorities, and the majority survives because it cannot be fully cancelled.',
    analogy: 'An election where every voter stands up. Whenever two people supporting different candidates meet, both sit down. Whoever is still standing at the end wins.',
    sourceNote: 'Robert S. Boyer and J Strother Moore, 1981. Originally applied to fault-tolerant computing.',
  },
  {
    id: 'fisher-yates-shuffle',
    title: 'Fisher-Yates Shuffle',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['randomization', 'in-place', 'uniform-distribution'],
    code: `import random

def shuffle(arr):
    for i in range(len(arr) - 1, 0, -1):
        j = random.randint(0, i)
        arr[i], arr[j] = arr[j], arr[i]
    return arr`,
    explanation: 'Start at the end of the list. Pick a random position from the beginning up to the current spot, and swap. Move one position left and repeat. Every item gets exactly one chance to land in each position, producing a perfectly uniform shuffle.',
    whyElegant: 'Three lines produce every possible permutation with equal probability. The proof of correctness is simple: at each step, every remaining element has a 1/(remaining count) chance of being chosen.',
    keyInsight: 'Selecting from a shrinking range guarantees each of the n! permutations is equally likely.',
    analogy: 'Drawing names from a hat one at a time and lining people up in the order drawn.',
    sourceNote: 'Ronald Fisher and Frank Yates, 1938 (pencil-and-paper version). Modern in-place version by Richard Durstenfeld, 1964.',
  },
  {
    id: 'dijkstra-relaxation',
    title: 'Dijkstra Shortest-Path Relaxation',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['graphs', 'shortest-path', 'greedy', 'priority-queue'],
    code: `import heapq

def dijkstra(graph, src):
    dist = {v: float("inf") for v in graph}
    dist[src] = 0
    pq = [(0, src)]
    while pq:
        d, u = heapq.heappop(pq)
        if d > dist[u]:
            continue
        for v, w in graph[u]:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
                heapq.heappush(pq, (dist[v], v))
    return dist`,
    explanation: 'Start at the source with distance zero; everything else is infinity. Repeatedly pick the unvisited node closest to the source. For each of its neighbors, check whether going through this node offers a shorter path than what is currently recorded. If so, update the record. Stop when every reachable node has been finalized.',
    whyElegant: 'The relaxation step is the heart: one comparison and one addition per edge. Combined with a priority queue, the whole algorithm processes a graph with millions of edges efficiently. The greedy choice of always processing the nearest unvisited node is provably optimal.',
    keyInsight: 'Processing nodes in order of increasing distance guarantees each node is finalized exactly once.',
    analogy: 'Water spreading from a single source across a landscape of channels: it always reaches the nearest unfilled basin first.',
    sourceNote: 'Edsger Dijkstra, 1956 (published 1959). Famously conceived in about 20 minutes at a cafe in Amsterdam.',
  },
  {
    id: 'kmp-failure-function',
    title: 'KMP Failure Function',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['string-matching', 'prefix', 'linear-time'],
    code: `def build_failure(pattern):
    n = len(pattern)
    fail = [0] * n
    k = 0
    for i in range(1, n):
        while k > 0 and pattern[k] != pattern[i]:
            k = fail[k - 1]
        if pattern[k] == pattern[i]:
            k += 1
        fail[i] = k
    return fail`,
    explanation: 'For each position in the pattern, compute the length of the longest proper prefix that is also a suffix of the substring ending at that position. This table tells the search algorithm how far back to reset when a mismatch occurs, instead of starting over from scratch.',
    whyElegant: 'The failure function is computed in O(n) time using itself as it is being built: each new entry leverages the entries already computed. This self-referential bootstrapping eliminates redundant character comparisons during search.',
    keyInsight: 'Precomputing where the pattern overlaps with itself lets you skip re-examining characters you have already matched.',
    analogy: 'Reading a long book looking for a phrase: when you hit a mismatch partway through, instead of going back to the start of the phrase, you jump to the furthest point that could still match, based on what you have already read.',
    sourceNote: 'Knuth, Morris, and Pratt, 1977. The failure function alone is one of the most elegant constructions in string algorithms.',
  },
  {
    id: 'levenshtein-dp',
    title: 'Levenshtein Edit Distance (DP)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['dynamic-programming', 'strings', 'edit-distance'],
    code: `def levenshtein(a, b):
    m, n = len(a), len(b)
    dp = list(range(n + 1))
    for i in range(1, m + 1):
        prev, dp[0] = dp[0], i
        for j in range(1, n + 1):
            temp = dp[j]
            if a[i - 1] == b[j - 1]:
                dp[j] = prev
            else:
                dp[j] = 1 + min(prev, dp[j], dp[j - 1])
            prev = temp
    return dp[n]`,
    explanation: 'Compute the minimum number of single-character insertions, deletions, or replacements needed to transform one string into another. Build a grid where each cell records the cheapest way to match prefixes of the two strings, reusing a single row of memory instead of the full grid.',
    whyElegant: 'The full algorithm needs only O(min(m,n)) space by keeping just one row of the DP table and updating it left to right. The three operations (insert, delete, replace) each correspond to one neighbor in the grid.',
    keyInsight: 'Every string transformation decomposes into a sequence of single-character edits, and a 2D grid captures all possible decompositions at once.',
    analogy: 'Spell-checking: the algorithm counts the fewest keystrokes needed to fix a misspelled word into the correct one.',
    sourceNote: 'Vladimir Levenshtein, 1965. Independently discovered by multiple researchers; Wagner-Fischer algorithm (1974) popularized the DP formulation.',
  },
  {
    id: 'merge-sort-merge',
    title: 'Merge Sort Merge Step',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['sorting', 'divide-and-conquer', 'stable-sort', 'merging'],
    code: `def merge(left, right):
    result = []
    i = j = 0
    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            result.append(left[i])
            i += 1
        else:
            result.append(right[j])
            j += 1
    result.extend(left[i:])
    result.extend(right[j:])
    return result`,
    explanation: 'Given two already-sorted lists, combine them into one sorted list by comparing the front elements of each, always taking the smaller one. When one list is exhausted, append the remainder of the other.',
    whyElegant: 'Two pointers, one comparison per step, and the result is guaranteed sorted. The merge step is stable (preserves the relative order of equal elements) and runs in exactly O(n) time. It is the workhorse behind merge sort, external sorting, and many database operations.',
    keyInsight: 'Merging two sorted sequences requires only a single linear scan because the smallest unprocessed element is always at one of the two fronts.',
    analogy: 'Two people each holding a sorted stack of papers: they compare the top sheets, file the smaller one, and repeat until both stacks are empty.',
    sourceNote: 'John von Neumann, 1945. One of the earliest algorithms designed for electronic computers.',
  },
  {
    id: 'heapify-sift-down',
    title: 'Heapify Sift-Down',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['heap', 'priority-queue', 'tree', 'in-place'],
    code: `def sift_down(arr, n, i):
    largest = i
    left, right = 2 * i + 1, 2 * i + 2
    if left < n and arr[left] > arr[largest]:
        largest = left
    if right < n and arr[right] > arr[largest]:
        largest = right
    if largest != i:
        arr[i], arr[largest] = arr[largest], arr[i]
        sift_down(arr, n, largest)

def heapify(arr):
    n = len(arr)
    for i in range(n // 2 - 1, -1, -1):
        sift_down(arr, n, i)`,
    explanation: 'A heap is a binary tree stored in a flat array where every parent is larger than its children. Sift-down fixes a single violation by swapping a node with its largest child and repeating downward. Building a full heap applies sift-down from the middle of the array backwards, and the math works out to O(n) total.',
    whyElegant: 'Building a heap looks like it should be O(n log n), but because most nodes are near the bottom and barely move, the true cost is linear. A seemingly brute-force bottom-up construction is actually optimal.',
    keyInsight: 'Starting sift-down from the bottom of the tree means most elements travel a short distance, making heap construction O(n) rather than O(n log n).',
    analogy: 'Organizing a tournament bracket from the bottom up: most first-round matchups are trivial, and only the final rounds involve top contenders moving far.',
    sourceNote: 'J.W.J. Williams introduced the heap and heapsort in 1964. Floyd proposed the O(n) bottom-up construction shortly after.',
  },
  {
    id: 'topological-sort-dfs',
    title: 'Topological Sort via DFS',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['graphs', 'DAG', 'ordering', 'dependency-resolution'],
    code: `def topo_sort(graph):
    visited, stack = set(), []
    def dfs(node):
        visited.add(node)
        for nb in graph.get(node, []):
            if nb not in visited:
                dfs(nb)
        stack.append(node)
    for node in graph:
        if node not in visited:
            dfs(node)
    return stack[::-1]`,
    explanation: 'Explore a directed graph depth-first. After finishing all of a node\'s descendants, push that node onto a stack. Reversing the stack gives an ordering where every node appears before anything that depends on it.',
    whyElegant: 'A standard DFS with one extra line (appending after all children are processed) solves the dependency ordering problem. The post-order trick is subtle but once you see it, it feels inevitable.',
    keyInsight: 'In a DFS post-order, every node is recorded after all of its dependencies, so reversing the order yields a valid topological sequence.',
    analogy: 'Getting dressed in the morning: you must put on underwear before pants, socks before shoes. DFS traces each dependency chain to its end, then lists items in reverse finishing order.',
    sourceNote: 'Depth-first approach formalized by Tarjan, 1976. Kahn\'s BFS alternative (1962) uses in-degree counting.',
  },
  {
    id: 'tarjans-scc',
    title: 'Tarjan\'s Strongly Connected Components',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['graphs', 'DFS', 'SCC', 'low-link'],
    code: `def tarjan_scc(graph):
    idx = [0]
    stack, on_stack = [], set()
    index, lowlink = {}, {}
    result = []
    def strongconnect(v):
        index[v] = lowlink[v] = idx[0]
        idx[0] += 1
        stack.append(v)
        on_stack.add(v)
        for w in graph.get(v, []):
            if w not in index:
                strongconnect(w)
                lowlink[v] = min(lowlink[v], lowlink[w])
            elif w in on_stack:
                lowlink[v] = min(lowlink[v], index[w])
        if lowlink[v] == index[v]:
            comp = []
            while True:
                w = stack.pop()
                on_stack.discard(w)
                comp.append(w)
                if w == v:
                    break
            result.append(comp)
    for v in graph:
        if v not in index:
            strongconnect(v)
    return result`,
    explanation: 'Find groups of nodes in a directed graph where every node can reach every other node in the same group. The algorithm does a single DFS, tracking the earliest reachable ancestor for each node. When a node\'s earliest ancestor is itself, everything above it on the stack forms a complete group.',
    whyElegant: 'One DFS pass finds all strongly connected components. The low-link trick of tracking the earliest reachable ancestor eliminates the need for a second pass (unlike Kosaraju). The stack peeling step at the end of each component is almost poetic in its economy.',
    keyInsight: 'A node is the root of a strongly connected component exactly when its low-link value equals its own discovery index.',
    analogy: 'Mapping one-way streets in a city: you drive around, and whenever you find a loop that brings you back to where you entered, you mark that whole loop as a connected neighborhood.',
    sourceNote: 'Robert Tarjan, 1972. One of the foundational results in graph algorithm theory.',
  },
  {
    id: 'bellman-ford',
    title: 'Bellman-Ford Shortest Paths',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['graphs', 'shortest-path', 'negative-weights', 'dynamic-programming'],
    code: `def bellman_ford(n, edges, src):
    dist = [float("inf")] * n
    dist[src] = 0
    for _ in range(n - 1):
        for u, v, w in edges:
            if dist[u] + w < dist[v]:
                dist[v] = dist[u] + w
    for u, v, w in edges:
        if dist[u] + w < dist[v]:
            return None  # negative cycle detected
    return dist`,
    explanation: 'Relax every edge in the graph, then do it again, and again, up to n-1 times total. Each round lets shortest-path information propagate one hop further from the source. After n-1 rounds, the shortest paths are finalized. A final check detects negative-weight cycles.',
    whyElegant: 'The algorithm is almost naively simple: just keep relaxing every edge. Yet this brute approach handles negative edge weights, which Dijkstra cannot. The negative-cycle detection falls out as a free bonus from one extra relaxation round.',
    keyInsight: 'Repeating edge relaxation n-1 times guarantees shortest paths propagate across even the longest possible path in the graph.',
    analogy: 'Passing a rumor through a chain of people: after n-1 rounds of everyone telling their neighbors, the news has reached the farthest person, no matter how long the chain.',
    sourceNote: 'Richard Bellman (1958) and Lester Ford Jr. (1956). Independently discovered; sometimes called Bellman-Ford-Moore.',
  },
  {
    id: 'floyd-warshall',
    title: 'Floyd-Warshall All-Pairs Shortest Paths',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['graphs', 'all-pairs', 'dynamic-programming', 'matrix'],
    code: `def floyd_warshall(dist):
    n = len(dist)
    for k in range(n):
        for i in range(n):
            for j in range(n):
                if dist[i][k] + dist[k][j] < dist[i][j]:
                    dist[i][j] = dist[i][k] + dist[k][j]
    return dist`,
    explanation: 'For every possible intermediate node k, and for every pair of nodes (i, j), check whether routing through k gives a shorter path. Three nested loops, one line of update logic, and you get the shortest distance between every pair of nodes in the graph.',
    whyElegant: 'Three nested loops and one comparison produce the complete all-pairs shortest path matrix. The algorithm is the DP analog of a simple observation: the shortest path from i to j either uses node k as a waypoint or it does not.',
    keyInsight: 'Building shortest paths by progressively allowing more intermediate waypoints decomposes the all-pairs problem into n single-node DP stages.',
    analogy: 'Planning flight routes: you start with direct flights only, then ask \'what if we allowed layovers in city k?\' and update every route that improves.',
    sourceNote: 'Robert Floyd (1962) and Stephen Warshall (1962). Based on a formulation by Bernard Roy (1959).',
  },
  {
    id: 'a-star-search',
    title: 'A* Search',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['graphs', 'shortest-path', 'heuristic', 'informed-search'],
    code: `import heapq

def a_star(start, goal, neighbors, heuristic):
    open_set = [(heuristic(start, goal), 0, start)]
    came_from, g_score = {}, {start: 0}
    while open_set:
        _, g, current = heapq.heappop(open_set)
        if current == goal:
            path = []
            while current in came_from:
                path.append(current)
                current = came_from[current]
            path.append(start)
            return path[::-1]
        for nb, cost in neighbors(current):
            tentative = g + cost
            if tentative < g_score.get(nb, float("inf")):
                came_from[nb] = current
                g_score[nb] = tentative
                f = tentative + heuristic(nb, goal)
                heapq.heappush(open_set, (f, tentative, nb))
    return None`,
    explanation: 'Like Dijkstra, but with a compass. Each node gets a priority score combining the known distance from the start with an estimated distance to the goal. The heuristic steers the search toward the goal, avoiding wasted exploration in the wrong direction.',
    whyElegant: 'A* unifies Dijkstra (explore nearest first) with greedy best-first search (explore closest-to-goal first) through a single priority function: f = g + h. With an admissible heuristic, it finds the optimal path while typically exploring far fewer nodes than Dijkstra.',
    keyInsight: 'Adding an admissible heuristic to Dijkstra biases the search toward the goal without sacrificing optimality.',
    analogy: 'Driving with a GPS that shows both how far you have driven and how far you are from the destination in a straight line: you prefer roads that reduce the combined total.',
    sourceNote: 'Peter Hart, Nils Nilsson, and Bertram Raphael, 1968. Originally developed for Shakey the robot at SRI.',
  },
  {
    id: 'flood-fill',
    title: 'Flood Fill',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['graphs', 'BFS', 'grid', 'connected-components'],
    code: `def flood_fill(grid, r, c, new_color):
    old_color = grid[r][c]
    if old_color == new_color:
        return
    stack = [(r, c)]
    while stack:
        x, y = stack.pop()
        if (x < 0 or x >= len(grid)
                or y < 0 or y >= len(grid[0])
                or grid[x][y] != old_color):
            continue
        grid[x][y] = new_color
        for dx, dy in [(1,0),(-1,0),(0,1),(0,-1)]:
            stack.append((x + dx, y + dy))`,
    explanation: 'Start at a pixel, note its color, then spread to every adjacent pixel of the same color, recoloring as you go. Use a stack to remember which pixels to visit next. Stop when no more same-colored neighbors remain.',
    whyElegant: 'The paint-bucket tool in every image editor, reduced to a stack and a four-direction neighbor check. Boundary detection comes for free because the algorithm simply stops at color changes.',
    keyInsight: 'Recoloring a visited pixel acts as its own visited marker, eliminating the need for a separate visited set.',
    analogy: 'Pouring paint on a floor: it spreads in all directions until it hits a wall or a different surface, filling the entire enclosed region.',
    sourceNote: 'One of the earliest graphics algorithms, widely used since the 1970s. Appears in every introductory algorithms course.',
  },
  {
    id: 'graham-scan',
    title: 'Graham Scan Convex Hull',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['computational-geometry', 'sorting', 'convex-hull', 'stack'],
    code: `def graham_scan(points):
    def cross(O, A, B):
        return (A[0]-O[0])*(B[1]-O[1]) - (A[1]-O[1])*(B[0]-O[0])
    points = sorted(set(points))
    if len(points) <= 1:
        return points
    lower = []
    for p in points:
        while len(lower) >= 2 and cross(lower[-2], lower[-1], p) <= 0:
            lower.pop()
        lower.append(p)
    upper = []
    for p in reversed(points):
        while len(upper) >= 2 and cross(upper[-2], upper[-1], p) <= 0:
            upper.pop()
        upper.append(p)
    return lower[:-1] + upper[:-1]`,
    explanation: 'Sort the points left to right. Build the bottom edge of the hull by processing points left to right, always ensuring the path turns left (counterclockwise). Then build the top edge in the reverse direction. Stitch the two halves together.',
    whyElegant: 'A cross-product sign test and a stack-based backtracking loop are enough to wrap a rubber band around any set of points. The Andrew monotone chain variant shown here avoids the polar angle sorting of the original Graham scan, making it simpler to implement correctly.',
    keyInsight: 'Maintaining a counterclockwise-only turn sequence and popping violations from a stack traces the convex hull in O(n log n) time.',
    analogy: 'Stretching a rubber band around a set of nails on a board: the band only touches the outermost nails, and interior ones are ignored.',
    sourceNote: 'Ronald Graham, 1972. The monotone chain variant shown here is due to Andrew (1979).',
  },
  {
    id: 'randomised-quickselect',
    title: 'Randomised Quickselect',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['selection', 'randomization', 'expected-linear'],
    code: `import random

def quickselect(arr, k):
    if len(arr) == 1:
        return arr[0]
    pivot = random.choice(arr)
    lo = [x for x in arr if x < pivot]
    eq = [x for x in arr if x == pivot]
    hi = [x for x in arr if x > pivot]
    if k < len(lo):
        return quickselect(lo, k)
    elif k < len(lo) + len(eq):
        return pivot
    else:
        return quickselect(hi, k - len(lo) - len(eq))`,
    explanation: 'To find the k-th smallest element, pick a random pivot and split the list into three groups: smaller, equal, and larger. Determine which group contains the target and recurse into only that one. On average, the list shrinks by a constant fraction each time.',
    whyElegant: 'Quickselect does roughly half the work of quicksort. By discarding one side of the partition entirely, it achieves expected O(n) time to find any order statistic, compared to O(n log n) for full sorting.',
    keyInsight: 'You only need to recurse into the partition that contains the target rank, cutting the expected work roughly in half each round.',
    analogy: 'Finding the 10th tallest person in a crowd: line everyone up against a random person, keep only the group that could contain the 10th, and repeat.',
    sourceNote: 'Tony Hoare, 1961. The same inventor as quicksort; quickselect was actually discovered first.',
  },
  {
    id: 'counting-sort',
    title: 'Counting Sort',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['sorting', 'linear-time', 'integer-keys', 'stable'],
    code: `def counting_sort(arr, max_val):
    count = [0] * (max_val + 1)
    for x in arr:
        count[x] += 1
    for i in range(1, max_val + 1):
        count[i] += count[i - 1]
    output = [0] * len(arr)
    for x in reversed(arr):
        count[x] -= 1
        output[count[x]] = x
    return output`,
    explanation: 'Count how many times each value appears, then compute prefix sums to determine where each value starts in the output. Walk the original array backwards, placing each element at its computed position. The backward scan makes it stable (equal elements keep their original relative order).',
    whyElegant: 'No comparisons between elements at all. Sorting happens by arithmetic on counts rather than by comparing and swapping. For integer keys in a known range, this is faster than any comparison-based sort can theoretically be.',
    keyInsight: 'Prefix sums on value counts directly compute the final sorted position of each element without any comparisons.',
    analogy: 'Sorting mail by ZIP code: count how many letters go to each ZIP, stack the slots in order, then drop each letter into its slot.',
    sourceNote: 'Harold Seward, 1954 (MIT master\'s thesis). The foundation of radix sort.',
  },
  {
    id: 'radix-sort',
    title: 'Radix Sort (LSD)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['sorting', 'linear-time', 'digit-by-digit', 'stable'],
    code: `def radix_sort(arr):
    if not arr:
        return arr
    max_val = max(arr)
    exp = 1
    while max_val // exp > 0:
        buckets = [[] for _ in range(10)]
        for x in arr:
            buckets[(x // exp) % 10].append(x)
        arr = [x for b in buckets for x in b]
        exp *= 10
    return arr`,
    explanation: 'Sort numbers digit by digit, starting from the ones place. For each digit position, distribute numbers into ten buckets (0-9), then collect them back in bucket order. Because each pass is stable, the final result is fully sorted.',
    whyElegant: 'Each pass is a simple bucket distribution, and the stability of each pass preserves the work of all previous passes. For d-digit numbers, d passes of O(n) work gives O(d*n) total, often beating O(n log n) comparison sorts in practice.',
    keyInsight: 'Sorting by the least significant digit first and maintaining stability means earlier digit orderings are preserved as more significant digits are processed.',
    analogy: 'Sorting a deck of numbered cards by first grouping by the ones digit, restacking, then grouping by the tens digit, and so on.',
    sourceNote: 'Used by Herman Hollerith with punched cards in the 1887 U.S. Census. Least-significant-digit-first variant formalized in the 1950s.',
  },
  {
    id: 'aho-corasick',
    title: 'Aho-Corasick Multi-Pattern Matching',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['string-matching', 'trie', 'automaton', 'multi-pattern'],
    code: `from collections import deque

def build_aho(patterns):
    goto = [{}]
    fail = [0]
    output = [[]]
    for i, pat in enumerate(patterns):
        state = 0
        for ch in pat:
            if ch not in goto[state]:
                goto.append({})
                fail.append(0)
                output.append([])
                goto[state][ch] = len(goto) - 1
            state = goto[state][ch]
        output[state].append(i)
    queue = deque()
    for ch, s in goto[0].items():
        queue.append(s)
    while queue:
        r = queue.popleft()
        for ch, s in goto[r].items():
            queue.append(s)
            state = fail[r]
            while state and ch not in goto[state]:
                state = fail[state]
            fail[s] = goto[state].get(ch, 0)
            if fail[s] == s:
                fail[s] = 0
            output[s] = output[s] + output[fail[s]]
    return goto, fail, output`,
    explanation: 'Build a trie from all the patterns, then add failure links (like KMP) so that when a character does not match, the automaton jumps to the longest suffix that is also a prefix of some pattern. Scanning the text once through this automaton finds every occurrence of every pattern simultaneously.',
    whyElegant: 'Searching for one pattern in a string is KMP. Searching for many patterns at once could be done by running KMP once per pattern, but Aho-Corasick merges them all into one automaton. The text is scanned exactly once regardless of the number of patterns.',
    keyInsight: 'Failure links across a trie of patterns create a finite automaton that matches all patterns in a single pass over the text.',
    analogy: 'A security checkpoint scanning baggage for a list of prohibited items: instead of checking for each item separately, a single X-ray pass flags every match from the full list.',
    sourceNote: 'Alfred Aho and Margaret Corasick, 1975. Used in the original Unix fgrep command.',
  },
  {
    id: 'suffix-array',
    title: 'Suffix Array Construction',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['string-algorithms', 'suffix-array', 'sorting', 'text-indexing'],
    code: `def build_suffix_array(s):
    n = len(s)
    sa = list(range(n))
    rank = [ord(c) for c in s]
    tmp = [0] * n
    k = 1
    while k < n:
        def key(i):
            return (rank[i], rank[i+k] if i+k < n else -1)
        sa.sort(key=key)
        tmp[sa[0]] = 0
        for i in range(1, n):
            tmp[sa[i]] = tmp[sa[i-1]]
            if key(sa[i]) != key(sa[i-1]):
                tmp[sa[i]] += 1
        rank = tmp[:]
        k *= 2
    return sa`,
    explanation: 'A suffix array is a sorted list of all starting positions of a string\'s suffixes. Build it by repeatedly sorting suffixes based on their first 1, 2, 4, 8, ... characters. Each doubling round reuses the rankings from the previous round, so only O(log n) sorting passes are needed.',
    whyElegant: 'The doubling trick compresses O(n) character comparisons into a pair of integer ranks, making each pass a simple pair-based sort. The suffix array gives nearly the same power as a suffix tree with a fraction of the memory.',
    keyInsight: 'Ranking suffixes by progressively doubling prefix lengths lets each comparison use precomputed pair-ranks rather than raw character scans.',
    analogy: 'Alphabetizing a book by its sentences: first sort by the first letter, then refine by the first two letters, then four, doubling each time until the order is settled.',
    sourceNote: 'Manber and Myers, 1990. Simpler and more memory-efficient than suffix trees for many applications.',
  },
  {
    id: 'treap-rotation',
    title: 'Treap Rotation (BST + Heap)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['BST', 'randomization', 'balanced-tree', 'rotation'],
    code: `import random

class TreapNode:
    def __init__(self, key):
        self.key = key
        self.pri = random.random()
        self.left = self.right = None

def rotate_right(t):
    s = t.left
    t.left = s.right
    s.right = t
    return s

def rotate_left(t):
    s = t.right
    t.right = s.left
    s.left = t
    return s

def insert(t, key):
    if t is None:
        return TreapNode(key)
    if key < t.key:
        t.left = insert(t.left, key)
        if t.left.pri > t.pri:
            t = rotate_right(t)
    else:
        t.right = insert(t.right, key)
        if t.right.pri > t.pri:
            t = rotate_left(t)
    return t`,
    explanation: 'A treap is a binary search tree where each node also has a random priority. Keys obey BST ordering (left < parent < right), and priorities obey heap ordering (parent has highest priority in its subtree). Rotations restore heap order after insertion, keeping the tree balanced with high probability.',
    whyElegant: 'Random priorities make the expected tree depth O(log n) without any complex rebalancing rules. The rotation logic is just two pointer reassignments. Compared to red-black trees, a treap achieves balance through randomness instead of color invariants.',
    keyInsight: 'Assigning random priorities and maintaining heap order through rotations produces a balanced BST without any deterministic rebalancing bookkeeping.',
    analogy: 'Assigning random lottery numbers to employees and seating them in an org chart by both name order and lottery rank: the randomness prevents any one branch from getting too deep.',
    sourceNote: 'Aragon and Seidel, 1989. The name \'treap\' is a portmanteau of \'tree\' and \'heap\'.',
  },
  {
    id: 'segment-tree-update',
    title: 'Segment Tree (Iterative)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['range-query', 'data-structure', 'tree', 'point-update'],
    code: `class SegTree:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (2 * n)

    def update(self, i, val):
        i += self.n
        self.tree[i] = val
        while i > 1:
            i //= 2
            self.tree[i] = self.tree[2*i] + self.tree[2*i+1]

    def query(self, l, r):
        res = 0
        l += self.n
        r += self.n + 1
        while l < r:
            if l & 1:
                res += self.tree[l]
                l += 1
            if r & 1:
                r -= 1
                res += self.tree[r]
            l //= 2
            r //= 2
        return res`,
    explanation: 'Store an array at the leaves of a binary tree. Each internal node holds the sum of its children. Updating a leaf propagates changes up to the root in O(log n). Querying a range collects contributions from O(log n) nodes whose ranges together cover the query range exactly.',
    whyElegant: 'The iterative bottom-up version uses a flat array of size 2n with no pointers, no recursion, and no wasted space. The query loop, which climbs two pointers from the leaves toward the root, is one of the tightest range-query implementations possible.',
    keyInsight: 'A complete binary tree over the array lets any contiguous range be decomposed into O(log n) precomputed subtree sums.',
    analogy: 'A company org chart where each manager knows the total sales of their team. Asking for sales in departments 3 through 7 only requires checking a few managers rather than every employee.',
    sourceNote: 'Introduced by Bentley in 1977 as a \'segment tree.\' The iterative implementation is sometimes attributed to competitive programming folklore.',
  },
  {
    id: 'fenwick-tree-update',
    title: 'Fenwick Tree (Binary Indexed Tree)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['range-query', 'prefix-sum', 'bit-manipulation', 'compact'],
    code: `class FenwickTree:
    def __init__(self, n):
        self.n = n
        self.tree = [0] * (n + 1)

    def update(self, i, delta):
        while i <= self.n:
            self.tree[i] += delta
            i += i & (-i)

    def query(self, i):
        s = 0
        while i > 0:
            s += self.tree[i]
            i -= i & (-i)
        return s`,
    explanation: 'Each position in the tree is responsible for a range of elements determined by the lowest set bit in its binary index. Updating adds the delta to all responsible ancestors by flipping the lowest set bit upward. Querying accumulates prefix sums by stripping the lowest set bit downward.',
    whyElegant: 'The entire data structure is one flat array with no pointers. The update and query operations are each a single while loop governed by a bit trick: i & (-i) isolates the lowest set bit. Constant factors are tiny, making Fenwick trees faster in practice than segment trees for prefix-sum queries.',
    keyInsight: 'The lowest set bit of a binary index determines the range of responsibility for each tree node, and flipping that bit navigates parent-child relationships.',
    analogy: 'A chain of neighborhood watch captains: each captain covers a block whose size doubles at certain intervals. Reporting an incident propagates up through captains of increasingly large blocks.',
    sourceNote: 'Peter Fenwick, 1994. Also known as Binary Indexed Tree (BIT). Extremely popular in competitive programming.',
  },
  {
    id: 'union-find',
    title: 'Union-Find (Path Compression + Rank)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['disjoint-sets', 'amortized', 'near-constant', 'graph-connectivity'],
    code: `class UnionFind:
    def __init__(self, n):
        self.parent = list(range(n))
        self.rank = [0] * n

    def find(self, x):
        while self.parent[x] != x:
            self.parent[x] = self.parent[self.parent[x]]
            x = self.parent[x]
        return x

    def union(self, a, b):
        a, b = self.find(a), self.find(b)
        if a == b:
            return
        if self.rank[a] < self.rank[b]:
            a, b = b, a
        self.parent[b] = a
        if self.rank[a] == self.rank[b]:
            self.rank[a] += 1`,
    explanation: 'Maintain a forest where each tree is a set. To find which set an element belongs to, follow parent pointers to the root. To merge two sets, attach the shorter tree under the taller one. Path compression (making nodes point directly to the root during find) keeps the trees almost flat.',
    whyElegant: 'Two simple optimizations (path compression and union by rank) reduce amortized time per operation to the inverse Ackermann function, which is effectively constant for all practical input sizes. Near-O(1) set operations from a few lines of code.',
    keyInsight: 'Path compression flattens the tree during every find, and union by rank keeps it shallow, combining to give nearly constant-time operations.',
    analogy: 'Groups of friends merging: when two groups meet, the smaller group joins the larger one. Whenever someone asks who the group leader is, everyone they passed along the way updates their contact to point straight to the leader.',
    sourceNote: 'Path compression by Hopcroft and Ullman, 1973. Inverse Ackermann bound proved by Tarjan, 1975.',
  },
  {
    id: 'reservoir-sampling',
    title: 'Reservoir Sampling (Algorithm R)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['randomization', 'streaming', 'uniform-sampling', 'online'],
    code: `import random

def reservoir_sample(stream, k):
    reservoir = []
    for i, item in enumerate(stream):
        if i < k:
            reservoir.append(item)
        else:
            j = random.randint(0, i)
            if j < k:
                reservoir[j] = item
    return reservoir`,
    explanation: 'Keep the first k items. For each subsequent item, generate a random number. If it falls within the reservoir size, replace that position. Each item from a stream of unknown length ends up with an equal probability of being in the final sample of k.',
    whyElegant: 'A single pass over a stream of unknown length yields a perfectly uniform random sample. No need to know the total count in advance, no need to store more than k items. The probability proof is a clean induction.',
    keyInsight: 'Giving item number i a k/i probability of entering the reservoir maintains uniform sampling at every step, regardless of stream length.',
    analogy: 'Selecting k random songs from a radio station you are listening to all day: as each new song plays, you randomly decide whether it replaces one of your current picks, with decreasing probability as the day goes on.',
    sourceNote: 'Jeffrey Vitter, 1985 (Algorithm R). Foundational for streaming and big-data sampling.',
  },
  {
    id: 'miller-rabin',
    title: 'Miller-Rabin Primality Test',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['number-theory', 'randomization', 'primality', 'probabilistic'],
    code: `def miller_rabin(n, witnesses=(2, 3, 5, 7, 11, 13)):
    if n < 2:
        return False
    if n in (2, 3):
        return True
    if n % 2 == 0:
        return False
    d, r = n - 1, 0
    while d % 2 == 0:
        d //= 2
        r += 1
    for a in witnesses:
        if a >= n:
            continue
        x = pow(a, d, n)
        if x == 1 or x == n - 1:
            continue
        for _ in range(r - 1):
            x = pow(x, 2, n)
            if x == n - 1:
                break
        else:
            return False
    return True`,
    explanation: 'To check if n is prime, write n-1 as 2^r * d. For several witness values a, compute a^d mod n and then repeatedly square. A prime will always produce 1 or n-1 at specific points in this squaring chain. If any witness catches a violation, n is composite.',
    whyElegant: 'A few modular exponentiations give a definitive answer for composites and an astronomically confident answer for primes. With the right witnesses, it is deterministic for all numbers below 3.3 trillion.',
    keyInsight: 'Fermat\'s little theorem plus the fact that non-trivial square roots of 1 modulo a prime do not exist gives a fast compositeness test.',
    analogy: 'Testing whether a coin is fair by flipping it several times with different hands: if any hand produces an impossible result, the coin is rigged. More hands tested means more confidence.',
    sourceNote: 'Gary Miller (1976, deterministic under GRH) and Michael Rabin (1980, randomized). Standard in cryptographic libraries.',
  },
  {
    id: 'fast-exponentiation',
    title: 'Fast Exponentiation (Binary Method)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['number-theory', 'binary', 'exponentiation', 'divide-and-conquer'],
    code: `def power(base, exp, mod=None):
    result = 1
    base = base % mod if mod else base
    while exp > 0:
        if exp % 2 == 1:
            result = result * base
            if mod:
                result %= mod
        base = base * base
        if mod:
            base %= mod
        exp //= 2
    return result`,
    explanation: 'To compute base^exp, express the exponent in binary. Scan the bits from least to most significant: whenever a bit is 1, multiply the running result by the current power of base. Square the base at each step. This reduces exp multiplications to log2(exp).',
    whyElegant: 'A problem that naively requires exp multiplications is solved in log2(exp) multiplications by exploiting the binary representation of the exponent. Every bit of the exponent does double duty: it both halves the remaining work and tells you whether to multiply.',
    keyInsight: 'Any exponent can be decomposed into powers of two, and squaring the base at each step builds those powers with minimal multiplications.',
    analogy: 'Computing 2^10 by squaring: 2, 4, 16, 256, ... rather than multiplying 2 ten times. Each squaring leaps forward exponentially.',
    sourceNote: 'Known since antiquity (method of successive squaring). Described in Chandah-sutra by Pingala (circa 200 BCE).',
  },
  {
    id: 'bloom-filter',
    title: 'Bloom Filter',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['probabilistic', 'set-membership', 'hashing', 'space-efficient'],
    code: `class BloomFilter:
    def __init__(self, size, num_hashes):
        self.size = size
        self.bits = [False] * size
        self.num_hashes = num_hashes

    def _hashes(self, item):
        h1 = hash(str(item))
        h2 = hash(str(item) + "_salt")
        return [(h1 + i * h2) % self.size
                for i in range(self.num_hashes)]

    def add(self, item):
        for h in self._hashes(item):
            self.bits[h] = True

    def might_contain(self, item):
        return all(self.bits[h] for h in self._hashes(item))`,
    explanation: 'A Bloom filter is a compact bit array that can tell you whether an element is definitely not in a set, or might be in the set. Adding an item sets several bits (chosen by hash functions) to true. Checking an item tests those same bits. If any bit is off, the item was never added. If all are on, it is probably present but there is a small chance of a false positive.',
    whyElegant: 'Constant memory, no matter how many items you add (though the false positive rate climbs). There are no false negatives ever. A bit array and a few hash functions replace an entire hash table when you can tolerate a small error rate.',
    keyInsight: 'Multiple hash functions mapping to the same bit array create a probabilistic set membership test that uses far less memory than storing actual elements.',
    analogy: 'A bouncer with a fuzzy memory who checks several features of your face. If any feature does not match anyone on the guest list, you are definitely not invited. If all features match, you are probably on the list but the bouncer might be confusing you with someone else.',
    sourceNote: 'Burton Bloom, 1970. Widely used in databases, caches, and network routers.',
  },
  {
    id: 'rabin-karp',
    title: 'Rabin-Karp Rolling Hash',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['string-matching', 'hashing', 'rolling-hash', 'fingerprint'],
    code: `def rabin_karp(text, pattern):
    base, mod = 256, 1000000007
    n, m = len(text), len(pattern)
    if m > n:
        return []
    h_pat = h_txt = 0
    top = pow(base, m - 1, mod)
    for i in range(m):
        h_pat = (h_pat * base + ord(pattern[i])) % mod
        h_txt = (h_txt * base + ord(text[i])) % mod
    matches = []
    for i in range(n - m + 1):
        if h_pat == h_txt and text[i:i+m] == pattern:
            matches.append(i)
        if i < n - m:
            h_txt = ((h_txt - ord(text[i]) * top)
                     * base + ord(text[i + m])) % mod
    return matches`,
    explanation: 'Compute a hash fingerprint of the pattern. Slide a window of the same length across the text, maintaining its hash by subtracting the outgoing character and adding the incoming one. Only do a full character comparison when the hashes match. This turns most positions into a single arithmetic check.',
    whyElegant: 'The rolling hash updates in O(1) per position: subtract the old character\'s contribution, shift, add the new one. A potentially quadratic string search becomes linear in expected time. The same rolling hash idea powers plagiarism detectors and file deduplication systems.',
    keyInsight: 'A polynomial rolling hash can be updated incrementally in constant time as the window slides, turning string matching into arithmetic.',
    analogy: 'Comparing a fingerprint instead of a full identity check at every door. You only stop for a detailed look when the fingerprint matches.',
    sourceNote: 'Michael Rabin and Richard Karp, 1987. Extended to multi-pattern matching and document fingerprinting.',
  },
  {
    id: 'z-algorithm',
    title: 'Z-Algorithm (Z-Array)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['string-matching', 'prefix', 'linear-time', 'z-function'],
    code: `def z_function(s):
    n = len(s)
    z = [0] * n
    z[0] = n
    l, r = 0, 0
    for i in range(1, n):
        if i < r:
            z[i] = min(r - i, z[i - l])
        while i + z[i] < n and s[z[i]] == s[i + z[i]]:
            z[i] += 1
        if i + z[i] > r:
            l, r = i, i + z[i]
    return z`,
    explanation: 'For each position i in a string, compute the length of the longest substring starting at i that matches a prefix of the string. A window [l, r) tracks the rightmost known match. Positions inside that window reuse previously computed values; positions outside extend character by character.',
    whyElegant: 'The Z-array gives the same matching power as KMP but with a more intuitive construction. The window reuse trick ensures each character is compared at most twice, guaranteeing O(n) total work. Concatenating pattern + separator + text and computing the Z-array solves exact string matching in one shot.',
    keyInsight: 'Tracking the rightmost matching interval lets each new position start from a precomputed lower bound rather than from zero.',
    analogy: 'Reading a book where each chapter starts with the same opening lines. Once you know where one such overlap ends, you can quickly check if the next chapter starts the same way by peeking ahead from the known overlap point.',
    sourceNote: 'First described in the context of string matching by Dan Gusfield in his 1997 textbook \'Algorithms on Strings, Trees, and Sequences.\'',
  },
  {
    id: 'manachers-palindromes',
    title: 'Manacher\'s Longest Palindrome',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['string-algorithms', 'palindrome', 'linear-time', 'symmetry'],
    code: `def manacher(s):
    t = "#" + "#".join(s) + "#"
    n = len(t)
    p = [0] * n
    c = r = 0
    for i in range(n):
        mirror = 2 * c - i
        if i < r:
            p[i] = min(r - i, p[mirror])
        while (i + p[i] + 1 < n
               and i - p[i] - 1 >= 0
               and t[i + p[i] + 1] == t[i - p[i] - 1]):
            p[i] += 1
        if i + p[i] > r:
            c, r = i, i + p[i]
    max_len = max(p)
    center = p.index(max_len)
    start = (center - max_len) // 2
    return s[start:start + max_len]`,
    explanation: 'Find the longest palindrome in a string in linear time. Insert separator characters to handle even-length palindromes uniformly. For each position, use a previously computed mirror palindrome as a starting estimate, then expand outward. Track the rightmost palindrome boundary to maximize reuse.',
    whyElegant: 'A problem with an obvious O(n^2) expand-around-center solution is solved in O(n) by exploiting palindromic symmetry: the radius at a mirror position provides a free lower bound on the radius at the current position. The sentinel-character trick unifies odd and even palindromes.',
    keyInsight: 'A palindrome centered at a mirrored position provides a lower bound for the palindrome at the current position, avoiding redundant character comparisons.',
    analogy: 'Standing inside a hall of mirrors: you can estimate how far each reflection extends by looking at a known reflection on the other side of center.',
    sourceNote: 'Glenn Manacher, 1975. Solves a problem that many assume requires quadratic time.',
  },
  {
    id: 'kadanes-max-subarray',
    title: 'Kadane\'s Maximum Subarray',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['dynamic-programming', 'greedy', 'linear-time', 'subarray'],
    code: `def max_subarray(arr):
    best = current = arr[0]
    for x in arr[1:]:
        current = max(x, current + x)
        best = max(best, current)
    return best`,
    explanation: 'Walk through the array keeping a running sum. At each element, decide: is it better to extend the current subarray or start fresh from this element? Track the best sum seen so far. Two comparisons per element, one pass, done.',
    whyElegant: 'Two lines of loop body solve a problem that seems like it should require examining all possible subarrays (there are O(n^2) of them). The key decision at each step, extend or restart, collapses the entire search space into a single linear scan.',
    keyInsight: 'At every position, the maximum subarray either extends the previous best ending here or starts anew, and this local decision produces a global optimum.',
    analogy: 'Tracking your best streak of profitable days in a business: each morning, decide whether yesterday\'s streak is still worth continuing or if today is a fresh start.',
    sourceNote: 'Jay Kadane, 1984. Solves a problem posed by Ulf Grenander in pattern matching; Bentley popularized it in his Programming Pearls column.',
  },
  {
    id: 'hungarian-algorithm',
    title: 'Hungarian Algorithm (Assignment Problem)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['optimization', 'assignment', 'bipartite', 'polynomial'],
    code: `def hungarian(cost):
    n = len(cost)
    u = [0] * (n + 1)
    v = [0] * (n + 1)
    p = [0] * (n + 1)
    way = [0] * (n + 1)
    for i in range(1, n + 1):
        p[0] = i
        j0 = 0
        minv = [float("inf")] * (n + 1)
        used = [False] * (n + 1)
        while True:
            used[j0] = True
            i0 = p[j0]
            delta = float("inf")
            j1 = -1
            for j in range(1, n + 1):
                if not used[j]:
                    cur = cost[i0-1][j-1] - u[i0] - v[j]
                    if cur < minv[j]:
                        minv[j] = cur
                        way[j] = j0
                    if minv[j] < delta:
                        delta = minv[j]
                        j1 = j
            for j in range(n + 1):
                if used[j]:
                    u[p[j]] += delta
                    v[j] -= delta
                else:
                    minv[j] -= delta
            j0 = j1
            if p[j0] == 0:
                break
        while j0:
            p[j0] = p[way[j0]]
            j0 = way[j0]
    return sum(cost[p[j]-1][j-1] for j in range(1, n + 1))`,
    explanation: 'Given n workers and n jobs with a cost matrix, find the assignment of workers to jobs that minimizes total cost. The algorithm maintains dual variables (potential functions) for rows and columns, and iteratively finds augmenting paths while adjusting potentials to create new zero-cost edges.',
    whyElegant: 'An O(n^3) solution to a problem with n! possible assignments. The dual variable technique transforms a combinatorial explosion into a sequence of shortest-path computations on a bipartite graph. The alternating path augmentation at the end of each iteration is compact and clean.',
    keyInsight: 'Maintaining row and column potentials converts the assignment problem into a sequence of shortest-path problems on reduced cost edges.',
    analogy: 'Assigning students to dorm rooms to minimize total commute distance: adjust room prices (potentials) until a perfect assignment at zero reduced cost emerges.',
    sourceNote: 'Harold Kuhn, 1955. Named in honor of Hungarian mathematicians Konig and Egervary. O(n^3) variant by Jonker and Volgenant.',
  },
  {
    id: 'prims-mst',
    title: 'Prim\'s Minimum Spanning Tree',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['graphs', 'MST', 'greedy', 'priority-queue'],
    code: `import heapq

def prim(graph, start=0):
    visited = set()
    edges = [(0, start)]
    total = 0
    while edges and len(visited) < len(graph):
        w, u = heapq.heappop(edges)
        if u in visited:
            continue
        visited.add(u)
        total += w
        for v, weight in graph[u]:
            if v not in visited:
                heapq.heappush(edges, (weight, v))
    return total`,
    explanation: 'Start from any node. Repeatedly pick the cheapest edge that connects a visited node to an unvisited one, and add the unvisited node to the tree. A priority queue keeps the cheapest candidates ready. Stop when all nodes are connected.',
    whyElegant: 'The greedy choice of always taking the cheapest crossing edge is provably optimal for spanning trees. The algorithm grows the tree one node at a time, and the priority queue ensures each step considers only the most promising candidates.',
    keyInsight: 'The minimum-weight edge crossing any cut of a graph is always safe to add to the spanning tree.',
    analogy: 'Expanding a road network from a single town: always build the cheapest road that reaches a new town you have not connected yet.',
    sourceNote: 'Vojtech Jarnik (1930), rediscovered by Robert Prim (1957) and Edsger Dijkstra (1959).',
  },
  {
    id: 'kruskals-mst',
    title: 'Kruskal\'s Minimum Spanning Tree',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['graphs', 'MST', 'greedy', 'union-find'],
    code: `def kruskal(n, edges):
    parent = list(range(n))
    def find(x):
        while parent[x] != x:
            parent[x] = parent[parent[x]]
            x = parent[x]
        return x
    edges.sort(key=lambda e: e[2])
    mst, total = [], 0
    for u, v, w in edges:
        ru, rv = find(u), find(v)
        if ru != rv:
            parent[ru] = rv
            mst.append((u, v, w))
            total += w
    return total, mst`,
    explanation: 'Sort all edges by weight. Walk through them cheapest first. If an edge connects two nodes that are not yet in the same component, add it to the tree. Use union-find to track which components have merged. Stop when n-1 edges are added.',
    whyElegant: 'Sort once, scan once. The union-find structure makes cycle detection nearly instant. Where Prim grows a single tree, Kruskal merges a forest of trees, and the global edge ordering guarantees optimality.',
    keyInsight: 'Processing edges in weight order and skipping those that would create cycles (detected via union-find) yields the MST greedily.',
    analogy: 'Connecting islands with bridges: look at all possible bridges sorted by cost, and build each one unless the two islands are already connected via other bridges.',
    sourceNote: 'Joseph Kruskal, 1956. Often paired with union-find as a textbook example of greedy algorithms.',
  },
  {
    id: 'edmonds-karp',
    title: 'Edmonds-Karp Max Flow',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['graphs', 'max-flow', 'BFS', 'augmenting-paths', 'network-flow'],
    code: `from collections import deque, defaultdict

def edmonds_karp(cap, source, sink):
    def bfs(source, sink, parent):
        visited = {source}
        queue = deque([source])
        while queue:
            u = queue.popleft()
            for v in cap[u]:
                if v not in visited and cap[u][v] > 0:
                    visited.add(v)
                    parent[v] = u
                    if v == sink:
                        return True
                    queue.append(v)
        return False
    max_flow = 0
    while True:
        parent = {}
        if not bfs(source, sink, parent):
            break
        flow = float("inf")
        v = sink
        while v != source:
            u = parent[v]
            flow = min(flow, cap[u][v])
            v = u
        v = sink
        while v != source:
            u = parent[v]
            cap[u][v] -= flow
            cap[v][u] += flow
            v = u
        max_flow += flow
    return max_flow`,
    explanation: 'Find the maximum flow from source to sink in a network. Repeatedly find the shortest augmenting path (via BFS), push as much flow as possible along it, and update residual capacities. When no more augmenting paths exist, the flow is maximal.',
    whyElegant: 'Using BFS for shortest augmenting paths guarantees termination in O(VE^2) time, turning Ford-Fulkerson\'s potentially non-terminating method into a polynomial algorithm. The residual graph trick, where pushing flow creates reverse capacity, elegantly handles flow redistribution.',
    keyInsight: 'Choosing the shortest augmenting path via BFS bounds the number of augmentation rounds to O(VE), making max-flow polynomial.',
    analogy: 'Routing water through a network of pipes: find the shortest route with spare capacity, push water through it, and the reverse-flow edges let you reroute water that was sent the wrong way.',
    sourceNote: 'Jack Edmonds and Richard Karp, 1972. Builds on the Ford-Fulkerson method (1956).',
  },
  {
    id: 'kosarajus-scc',
    title: 'Kosaraju\'s Strongly Connected Components',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['graphs', 'DFS', 'SCC', 'two-pass'],
    code: `def kosaraju(graph):
    visited, order = set(), []
    def dfs1(v):
        visited.add(v)
        for u in graph.get(v, []):
            if u not in visited:
                dfs1(u)
        order.append(v)
    rev = {}
    for v in graph:
        for u in graph[v]:
            rev.setdefault(u, []).append(v)
    for v in graph:
        if v not in visited:
            dfs1(v)
    visited.clear()
    sccs = []
    def dfs2(v, comp):
        visited.add(v)
        comp.append(v)
        for u in rev.get(v, []):
            if u not in visited:
                dfs2(u, comp)
    for v in reversed(order):
        if v not in visited:
            comp = []
            dfs2(v, comp)
            sccs.append(comp)
    return sccs`,
    explanation: 'Find all strongly connected components using two depth-first searches. The first DFS on the original graph records nodes in finishing order. The second DFS on the reversed graph, processing nodes in reverse finishing order, peels off one SCC at a time.',
    whyElegant: 'Two standard DFS passes, one on the original graph and one on the reversed graph, are all it takes. The insight that reversing edges preserves SCCs while separating them in the finishing-order traversal is both surprising and clean.',
    keyInsight: 'DFS finishing order on the original graph, combined with DFS on the reversed graph, separates strongly connected components because reversing edges does not break internal connectivity but severs cross-component reachability.',
    analogy: 'Finding cliques at a party: first observe who talks to whom and note the order people stop talking. Then replay conversations in reverse order; each new conversation cluster is a clique.',
    sourceNote: 'S. Rao Kosaraju, 1978 (described orally). Independently published by Micha Sharir, 1981.',
  },
  {
    id: 'lcs-dp',
    title: 'Longest Common Subsequence via DP',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['dynamic-programming', 'strings', 'subsequence', 'backtracking'],
    code: `def lcs(a, b):
    m, n = len(a), len(b)
    dp = [[0] * (n + 1) for _ in range(m + 1)]
    for i in range(1, m + 1):
        for j in range(1, n + 1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1] + 1
            else:
                dp[i][j] = max(dp[i-1][j], dp[i][j-1])
    result = []
    i, j = m, n
    while i > 0 and j > 0:
        if a[i-1] == b[j-1]:
            result.append(a[i-1])
            i -= 1
            j -= 1
        elif dp[i-1][j] > dp[i][j-1]:
            i -= 1
        else:
            j -= 1
    return "".join(reversed(result))`,
    explanation: 'Build a grid where cell (i, j) records the length of the longest common subsequence of the first i characters of a and the first j characters of b. If the characters match, extend the diagonal. If not, take the better of skipping a character from either string. Then backtrack through the grid to recover the actual subsequence.',
    whyElegant: 'The DP table encodes all possible ways to align two sequences, and the backtracking step reads off the optimal alignment like following a trail of breadcrumbs. The recurrence is the simplest possible: match and extend, or skip and take the max.',
    keyInsight: 'Each cell depends on at most three neighbors (diagonal, above, left), so the entire alignment space collapses into a grid traversal.',
    analogy: 'Comparing two recipe ingredient lists to find the longest shared sequence: at each ingredient, either both lists have it (match) or you skip ahead in whichever list gives a longer shared sequence.',
    sourceNote: 'Classic DP formulation, widely attributed to Needleman-Wunsch (1970) for sequence alignment and Hunt-Szymanski for LCS.',
  },
  {
    id: 'edit-distance-backtrack',
    title: 'Edit Distance with Backtracking',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['dynamic-programming', 'strings', 'edit-distance', 'alignment'],
    code: `def edit_backtrack(a, b):
    m, n = len(a), len(b)
    dp = [[0]*(n+1) for _ in range(m+1)]
    for i in range(m+1):
        dp[i][0] = i
    for j in range(n+1):
        dp[0][j] = j
    for i in range(1, m+1):
        for j in range(1, n+1):
            if a[i-1] == b[j-1]:
                dp[i][j] = dp[i-1][j-1]
            else:
                dp[i][j] = 1 + min(dp[i-1][j],
                                   dp[i][j-1],
                                   dp[i-1][j-1])
    ops = []
    i, j = m, n
    while i > 0 or j > 0:
        if i > 0 and j > 0 and a[i-1] == b[j-1]:
            i -= 1; j -= 1
        elif i > 0 and j > 0 and dp[i][j] == dp[i-1][j-1]+1:
            ops.append(f"replace '{a[i-1]}' with '{b[j-1]}'")
            i -= 1; j -= 1
        elif j > 0 and dp[i][j] == dp[i][j-1]+1:
            ops.append(f"insert '{b[j-1]}'")
            j -= 1
        else:
            ops.append(f"delete '{a[i-1]}'")
            i -= 1
    return list(reversed(ops))`,
    explanation: 'Compute the minimum edit distance just like Levenshtein, but then trace back through the DP table to reconstruct the actual sequence of insert, delete, and replace operations that transform string a into string b.',
    whyElegant: 'The DP table is a map of all possible edit paths. Backtracking follows the cheapest route through that map, recovering the specific operations. The forward pass finds the cost; the backward pass recovers the recipe.',
    keyInsight: 'The same DP table that computes the minimum cost also encodes the optimal sequence of edit operations, recoverable by tracing which neighbor each cell was derived from.',
    analogy: 'Auto-correct showing you the exact keystrokes to fix a typo: first it figures out the fewest changes needed, then replays them in order.',
    sourceNote: 'Wagner and Fischer, 1974. Backtracking is a standard extension of the DP formulation.',
  },
  {
    id: 'interval-tree-stab',
    title: 'Interval Tree Stabbing Query',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['data-structure', 'intervals', 'augmented-tree', 'range-query'],
    code: `class INode:
    def __init__(self, lo, hi):
        self.lo = lo
        self.hi = hi
        self.max_hi = hi
        self.left = self.right = None

def insert(root, lo, hi):
    if root is None:
        return INode(lo, hi)
    if lo < root.lo:
        root.left = insert(root.left, lo, hi)
    else:
        root.right = insert(root.right, lo, hi)
    root.max_hi = max(root.max_hi, hi)
    return root

def stab(root, point):
    results = []
    if root is None:
        return results
    if root.lo <= point <= root.hi:
        results.append((root.lo, root.hi))
    if root.left and root.left.max_hi >= point:
        results.extend(stab(root.left, point))
    results.extend(stab(root.right, point))
    return results`,
    explanation: 'An interval tree is a BST ordered by interval start points, where each node also tracks the maximum end point in its subtree. To find all intervals containing a given point, check the current node, prune the left subtree only if its maximum end point could reach the query point, and always check the right subtree.',
    whyElegant: 'One extra field per node (the subtree maximum endpoint) turns an ordinary BST into a structure that answers stabbing queries efficiently. The pruning rule is simple: if the left subtree\'s max endpoint is below the query point, no interval on the left side can contain it.',
    keyInsight: 'Augmenting each BST node with the maximum interval endpoint in its subtree enables efficient pruning during point-in-interval queries.',
    analogy: 'A library catalog that tracks not just the start of each book\'s subject range but also the latest end date in each shelf section. Looking up events on a specific date only requires checking sections whose end dates reach that far.',
    sourceNote: 'Edelsbrunner, 1980. Augmented BST approach described in CLRS (Introduction to Algorithms).',
  },
  {
    id: 'kd-tree-nearest',
    title: 'k-d Tree Nearest Neighbour',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['spatial', 'tree', 'nearest-neighbor', 'pruning'],
    code: `class KDNode:
    def __init__(self, point, left=None, right=None, axis=0):
        self.point = point
        self.left = left
        self.right = right
        self.axis = axis

def build_kd(points, depth=0):
    if not points:
        return None
    k = len(points[0])
    axis = depth % k
    points.sort(key=lambda p: p[axis])
    mid = len(points) // 2
    return KDNode(
        points[mid],
        build_kd(points[:mid], depth+1),
        build_kd(points[mid+1:], depth+1),
        axis)

def nearest(node, target, best=None, best_d=float("inf")):
    if node is None:
        return best, best_d
    d = sum((a-b)**2 for a, b in zip(node.point, target))
    if d < best_d:
        best, best_d = node.point, d
    diff = target[node.axis] - node.point[node.axis]
    close = node.left if diff < 0 else node.right
    far = node.right if diff < 0 else node.left
    best, best_d = nearest(close, target, best, best_d)
    if diff ** 2 < best_d:
        best, best_d = nearest(far, target, best, best_d)
    return best, best_d`,
    explanation: 'A k-d tree partitions space by alternating axes. To find the nearest neighbor, descend to the leaf closest to the target, then backtrack. At each node, check whether the other side of the splitting plane could contain a closer point. If the distance to the plane exceeds the current best, prune the entire subtree.',
    whyElegant: 'The pruning test is a single comparison: if the perpendicular distance to the splitting hyperplane exceeds the current best distance, the far subtree cannot help. This simple check eliminates huge swaths of the search space, making average-case queries O(log n) in low dimensions.',
    keyInsight: 'Comparing the distance to the splitting plane against the current best distance lets you prune entire half-spaces from the search.',
    analogy: 'Searching for the nearest coffee shop by dividing the city into halves along alternating compass directions. Once you find a nearby shop, you skip entire city halves that are obviously too far away.',
    sourceNote: 'Jon Bentley, 1975. Foundational data structure for spatial search and computational geometry.',
  },
  {
    id: 'median-of-medians',
    title: 'Median of Medians (Deterministic Select)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['selection', 'deterministic', 'worst-case-linear', 'pivot-strategy'],
    code: `def median_of_medians(arr, k):
    if len(arr) <= 5:
        return sorted(arr)[k]
    chunks = [arr[i:i+5] for i in range(0, len(arr), 5)]
    medians = [sorted(c)[len(c)//2] for c in chunks]
    pivot = median_of_medians(medians, len(medians)//2)
    lo = [x for x in arr if x < pivot]
    eq = [x for x in arr if x == pivot]
    hi = [x for x in arr if x > pivot]
    if k < len(lo):
        return median_of_medians(lo, k)
    elif k < len(lo) + len(eq):
        return pivot
    else:
        return median_of_medians(hi, k - len(lo) - len(eq))`,
    explanation: 'To find the k-th smallest element with guaranteed linear time, split the array into groups of five, find each group\'s median, then recursively find the median of those medians. Use that as the pivot for partitioning. This pivot is guaranteed to eliminate at least 30% of elements each round.',
    whyElegant: 'The recursive call to find a good pivot seems wasteful, but the math works out: the pivot eliminates at least 3/10 of the elements, leading to a recurrence that solves to O(n). It proves that selection can be done in worst-case linear time, matching the lower bound.',
    keyInsight: 'The median of medians of groups of five guarantees at least 30% of elements fall on each side of the pivot, ensuring worst-case linear recursion depth.',
    analogy: 'Choosing a team captain by splitting a league into groups of five, having each group pick their median player, then picking the median of those captains as the overall representative. The result is guaranteed to be a reasonable middle ground.',
    sourceNote: 'Blum, Floyd, Pratt, Rivest, and Tarjan, 1973. Known as BFPRT. Settled the theoretical question of worst-case linear selection.',
  },
  {
    id: 'cache-oblivious-matmul',
    title: 'Cache-Oblivious Matrix Multiply',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['cache-oblivious', 'divide-and-conquer', 'matrix', 'performance'],
    code: `def mat_mult(A, B, C, n,
             ar=0, ac=0, br=0, bc=0, cr=0, cc=0):
    if n <= 1:
        C[cr][cc] += A[ar][ac] * B[br][bc]
        return
    h = n // 2
    for i in (0, h):
        for j in (0, h):
            for k in (0, h):
                mat_mult(A, B, C, h,
                         ar+i, ac+k, br+k, bc+j, cr+i, cc+j)`,
    explanation: 'Multiply two matrices by recursively splitting each into four quadrants and computing the eight sub-multiplications (like Strassen but without the clever trick to reduce to seven). The recursion naturally produces memory access patterns that fit in cache at every level, without knowing the cache size.',
    whyElegant: 'The code knows nothing about cache line sizes or memory hierarchy, yet it achieves near-optimal cache behavior. The recursive decomposition ensures that sub-problems shrink until they fit in each cache level, all without tuning parameters.',
    keyInsight: 'Recursive block decomposition adapts to every level of the memory hierarchy simultaneously, achieving optimal cache behavior without knowing cache sizes.',
    analogy: 'Cleaning a house by recursively cleaning each room\'s quadrants: you naturally finish small areas before moving on, keeping all your supplies close by rather than running back and forth across the house.',
    sourceNote: 'Frigo, Leiserson, Prokop, and Ramachandran, 1999. Introduced the cache-oblivious model.',
  },
  {
    id: 'van-emde-boas',
    title: 'van Emde Boas Tree Insert',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['data-structure', 'integer-keys', 'recursive', 'doubly-logarithmic'],
    code: `class VEB:
    def __init__(self, u):
        self.u = u
        self.min_val = self.max_val = None
        if u > 2:
            self.sqrt = int(u ** 0.5) or 2
            self.cluster = [VEB(self.sqrt)
                            for _ in range(self.sqrt)]
            self.summary = VEB(self.sqrt)

    def insert(self, x):
        if self.min_val is None:
            self.min_val = self.max_val = x
            return
        if x < self.min_val:
            x, self.min_val = self.min_val, x
        if self.u > 2:
            hi, lo = x // self.sqrt, x % self.sqrt
            if self.cluster[hi].min_val is None:
                self.summary.insert(hi)
            self.cluster[hi].insert(lo)
        if x > self.max_val:
            self.max_val = x`,
    explanation: 'A van Emde Boas tree stores integers from a universe of size u and supports insert, delete, predecessor, and successor in O(log log u) time. It works by recursively partitioning the universe into sqrt(u) clusters of size sqrt(u). The summary structure tracks which clusters are non-empty.',
    whyElegant: 'Each recursive level takes the square root of the universe size, so the depth is O(log log u). This means operations on a universe of 2^32 take at most five steps. The min/max shortcut (storing the minimum directly, not in any cluster) keeps the recursion short.',
    keyInsight: 'Recursing on the square root of the universe size produces a tree of depth O(log log u), achieving doubly-logarithmic time for integer operations.',
    analogy: 'A library indexed by shelf, then by section within shelf, then by slot within section, where each level square-roots the remaining range. Even in a library with a billion books, you reach any book in about five steps.',
    sourceNote: 'Peter van Emde Boas, 1975. Achieves the information-theoretic optimal for integer priority queues.',
  },
  {
    id: 'patience-sorting',
    title: 'Patience Sorting',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['sorting', 'LIS-related', 'piles', 'binary-search'],
    code: `from bisect import bisect_left
import heapq

def patience_sort(arr):
    piles = []
    pile_tops = []
    for x in arr:
        pos = bisect_left(pile_tops, x)
        if pos == len(piles):
            piles.append([x])
            pile_tops.append(x)
        else:
            piles[pos].append(x)
            pile_tops[pos] = x
    result = []
    heap = [(p[0], i, 0) for i, p in enumerate(piles)]
    heapq.heapify(heap)
    while heap:
        val, i, j = heapq.heappop(heap)
        result.append(val)
        if j + 1 < len(piles[i]):
            heapq.heappush(heap, (piles[i][j+1], i, j+1))
    return result`,
    explanation: 'Deal cards into piles: each card goes on the leftmost pile whose top is greater than or equal to the card (found via binary search on pile tops). If no pile works, start a new one. Then merge all piles with a k-way merge using a heap. The number of piles equals the length of the longest increasing subsequence.',
    whyElegant: 'A card game that children can play produces a sorting algorithm with a deep connection to combinatorics. The pile count directly measures the longest increasing subsequence, linking a physical process to a fundamental combinatorial quantity.',
    keyInsight: 'The number of piles formed by the patience dealing process equals the length of the longest increasing subsequence of the input.',
    analogy: 'Playing a solitaire card game: deal cards onto piles, always placing on the leftmost valid pile. The number of piles tells you the length of the longest run of increasing cards in the original deck.',
    sourceNote: 'Named after the card game Patience (Solitaire). Connection to LIS observed by Aldous and Diaconis, 1999.',
  },
  {
    id: 'lis-binary-search',
    title: 'LIS via Binary Search',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['dynamic-programming', 'binary-search', 'subsequence', 'greedy'],
    code: `from bisect import bisect_left

def lis_length(arr):
    tails = []
    for x in arr:
        pos = bisect_left(tails, x)
        if pos == len(tails):
            tails.append(x)
        else:
            tails[pos] = x
    return len(tails)`,
    explanation: 'Maintain an array of the smallest possible tail values for increasing subsequences of each length. For each new element, use binary search to find where it fits. If it is larger than all tails, it extends the longest subsequence. Otherwise, it replaces the first tail that is not smaller, keeping future options open.',
    whyElegant: 'The tails array is always sorted, which is what makes binary search possible. Each element is processed in O(log n) time, giving O(n log n) overall. The greedy strategy of keeping the smallest possible tail at each length maximizes the chance that future elements extend the sequence.',
    keyInsight: 'Maintaining the smallest possible endpoint for subsequences of each length ensures that binary search can determine where each new element fits in O(log n).',
    analogy: 'Tracking personal bests in a race by age group: when a new runner finishes, they either set a new record for the next age group or improve an existing record, and the record board stays sorted.',
    sourceNote: 'Patience sorting connection. O(n log n) algorithm typically attributed to Fredman (1975).',
  },
  {
    id: 'berlekamp-massey',
    title: 'Berlekamp-Massey Linear Recurrence',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['algebra', 'linear-recurrence', 'error-correction', 'sequence'],
    code: `def berlekamp_massey(s):
    n = len(s)
    C, B = [1], [1]
    L, m, b = 0, 1, 1
    for i in range(n):
        d = s[i]
        for j in range(1, L + 1):
            d += C[j] * s[i - j]
        if d == 0:
            m += 1
        elif 2 * L <= i:
            T = C[:]
            coef = -d / b
            while len(C) < len(B) + m:
                C.append(0)
            for j in range(len(B)):
                C[j + m] += coef * B[j]
            L = i + 1 - L
            B, b, m = T, d, 1
        else:
            coef = -d / b
            while len(C) < len(B) + m:
                C.append(0)
            for j in range(len(B)):
                C[j + m] += coef * B[j]
            m += 1
    return C`,
    explanation: 'Given a sequence of numbers, find the shortest linear recurrence that generates it. The algorithm processes elements one at a time, maintaining a candidate recurrence. When a discrepancy is found, it adjusts the recurrence using the last time a correction was needed. The beauty is that it provably finds the minimum-length recurrence.',
    whyElegant: 'A single left-to-right scan finds the shortest linear recurrence for any sequence. The correction step uses a saved copy of a previous recurrence, creating a kind of error-correction dialogue between past and present approximations.',
    keyInsight: 'When a discrepancy occurs, the algorithm corrects the current recurrence using a shifted version of a previous one, minimizing the total number of terms needed.',
    analogy: 'Cracking a pattern in a sequence of numbers: you maintain a guess for the rule, and each time the guess fails, you patch it using a record of where it last went wrong.',
    sourceNote: 'Elwyn Berlekamp (1968) for BCH decoding. James Massey (1969) reinterpreted it for linear recurrences. Foundational in coding theory.',
  },
  {
    id: 'pollards-rho',
    title: 'Pollard\'s Rho Factorization',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['number-theory', 'factorization', 'randomization', 'cycle-detection'],
    code: `from math import gcd

def pollard_rho(n):
    if n % 2 == 0:
        return 2
    x = y = 2
    c = 1
    d = 1
    while d == 1:
        x = (x * x + c) % n
        y = (y * y + c) % n
        y = (y * y + c) % n
        d = gcd(abs(x - y), n)
    return d if d != n else None`,
    explanation: 'Factor a composite number by generating a pseudo-random sequence x_i = (x^2 + c) mod n and looking for two values that differ by a multiple of a factor. Using Floyd\'s cycle detection (the tortoise-and-hare trick), one iterator moves twice as fast. When gcd(|x - y|, n) is nontrivial, a factor is found.',
    whyElegant: 'The birthday paradox guarantees a collision after roughly sqrt(p) steps where p is the smallest factor, making this far faster than trial division. The entire algorithm is a tight loop with one GCD computation, and it factors numbers with 20+ digits in milliseconds.',
    keyInsight: 'The birthday paradox applied to a pseudo-random sequence modulo a hidden factor produces a collision in O(sqrt(p)) steps, revealing the factor through GCD.',
    analogy: 'Finding duplicates in a crowd by checking pairs: the birthday paradox says you only need to check about sqrt(n) people before two share a birthday. Pollard\'s rho exploits the same phenomenon with number-theoretic sequences.',
    sourceNote: 'John Pollard, 1975. Named \'rho\' because the sequence path resembles the Greek letter when drawn as a graph.',
  },
  {
    id: 'baby-step-giant-step',
    title: 'Baby-Step Giant-Step (Discrete Logarithm)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['number-theory', 'discrete-log', 'meet-in-the-middle', 'cryptography'],
    code: `from math import isqrt

def baby_giant(g, h, p):
    m = isqrt(p) + 1
    table = {}
    power = 1
    for j in range(m):
        table[power] = j
        power = power * g % p
    factor = pow(g, -m, p)
    gamma = h
    for i in range(m):
        if gamma in table:
            return i * m + table[gamma]
        gamma = gamma * factor % p
    return None`,
    explanation: 'Find x such that g^x = h mod p. Precompute a table of g^j for small j (baby steps). Then compute h * (g^(-m))^i for increasing i (giant steps) and look for a match in the table. A match at (i, j) gives x = i*m + j. The meet-in-the-middle approach takes O(sqrt(p)) time and space.',
    whyElegant: 'The decomposition x = i*m + j splits one search over p values into two searches over sqrt(p) values each. A hash table makes the baby-step lookup O(1), giving O(sqrt(p)) total. The same meet-in-the-middle principle appears across cryptography.',
    keyInsight: 'Splitting the exponent into a quotient and remainder of sqrt(p) lets a hash table match baby steps to giant steps in O(sqrt(p)) time.',
    analogy: 'Finding someone in a grid of apartments: instead of knocking on every door, walk along the rows (giant steps) and check columns (baby steps) using a directory. The total steps are two square-root-sized scans instead of one full scan.',
    sourceNote: 'Daniel Shanks, 1971. A foundational algorithm in computational number theory and cryptanalysis.',
  },
  {
    id: 'sqrt-decomposition',
    title: 'Sqrt Decomposition',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['range-query', 'block-decomposition', 'balanced', 'offline'],
    code: `from math import isqrt

class SqrtDecomp:
    def __init__(self, arr):
        self.arr = arr[:]
        self.n = len(arr)
        self.block = max(1, isqrt(self.n))
        self.blocks = [0] * (self.n // self.block + 1)
        for i, x in enumerate(arr):
            self.blocks[i // self.block] += x

    def update(self, i, val):
        self.blocks[i // self.block] += val - self.arr[i]
        self.arr[i] = val

    def query(self, l, r):
        total = 0
        while l <= r and l % self.block != 0:
            total += self.arr[l]
            l += 1
        while l + self.block - 1 <= r:
            total += self.blocks[l // self.block]
            l += self.block
        while l <= r:
            total += self.arr[l]
            l += 1
        return total`,
    explanation: 'Divide the array into blocks of size sqrt(n). Maintain a precomputed aggregate (here, sum) for each block. Point updates fix one element and one block aggregate. Range queries sum full blocks in O(sqrt(n)) and handle partial blocks at the edges element by element.',
    whyElegant: 'The sqrt block size perfectly balances two costs: the number of full blocks traversed and the number of leftover elements at the edges. Both are at most sqrt(n), giving O(sqrt(n)) per query. The concept is simple enough to implement from memory in a contest.',
    keyInsight: 'Choosing a block size of sqrt(n) balances the cost of scanning individual elements against the cost of scanning block summaries, minimizing the worst case of both.',
    analogy: 'Counting people on a long street divided into blocks: you count whole blocks from a census record and only hand-count the partial blocks at each end.',
    sourceNote: 'A standard technique in competitive programming. Conceptually related to B-trees and bucket decomposition.',
  },
  {
    id: 'mos-algorithm',
    title: 'Mo\'s Algorithm (Offline Range Queries)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['range-query', 'offline', 'sqrt-decomposition', 'reordering'],
    code: `from math import isqrt

def mo_algorithm(arr, queries):
    block = max(1, isqrt(len(arr)))
    indexed = sorted(enumerate(queries),
                     key=lambda q: (q[1][0]//block, q[1][1]))
    cur_l, cur_r, cur_sum = 0, -1, 0
    answers = [0] * len(queries)
    for idx, (l, r) in indexed:
        while cur_r < r:
            cur_r += 1
            cur_sum += arr[cur_r]
        while cur_l > l:
            cur_l -= 1
            cur_sum += arr[cur_l]
        while cur_r > r:
            cur_sum -= arr[cur_r]
            cur_r -= 1
        while cur_l < l:
            cur_sum -= arr[cur_l]
            cur_l += 1
        answers[idx] = cur_sum
    return answers`,
    explanation: 'Answer a batch of range queries offline by reordering them to minimize cursor movement. Sort queries by block of left endpoint, breaking ties by right endpoint. Maintain a current range and incrementally expand or shrink it to match each query. The sorting ensures the right pointer moves at most O(n*sqrt(n)) total.',
    whyElegant: 'The insight is that answering queries in the right order makes the cursors move much less. A naive approach moves O(n) per query; Mo\'s ordering reduces total movement to O(n*sqrt(n)) across all queries. The implementation is just four while loops adjusting a sliding window.',
    keyInsight: 'Sorting range queries by block of left endpoint and then by right endpoint minimizes total cursor movement to O(n * sqrt(n)).',
    analogy: 'A librarian answering a stack of \'count books between shelves X and Y\' requests: instead of walking to each pair of shelves in request order, she sorts requests by section and answers nearby requests together, minimizing total walking.',
    sourceNote: 'Named after competitive programmer Mo (Hilbert curve optimization variant by others). Standard in competitive programming since ~2012.',
  },
  {
    id: 'heavy-light-decomposition',
    title: 'Heavy-Light Decomposition',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['tree', 'path-query', 'decomposition', 'segment-tree'],
    code: `def hld_build(adj, root=0):
    n = len(adj)
    parent = [-1]*n; depth = [0]*n; size = [1]*n
    heavy = [-1]*n; head = list(range(n)); pos = [0]*n
    order = []
    stack = [(root, False)]
    while stack:
        v, done = stack.pop()
        if done:
            for u in adj[v]:
                if u != parent[v]:
                    size[v] += size[u]
                    if heavy[v] == -1 or size[u] > size[heavy[v]]:
                        heavy[v] = u
            continue
        stack.append((v, True))
        order.append(v)
        for u in adj[v]:
            if u != parent[v]:
                parent[u] = v
                depth[u] = depth[v] + 1
                stack.append((u, False))
    cur_pos = 0
    stack = [root]
    while stack:
        v = stack.pop()
        pos[v] = cur_pos
        cur_pos += 1
        children = [u for u in adj[v] if u != parent[v] and u != heavy[v]]
        for u in reversed(children):
            stack.append(u)
        if heavy[v] != -1:
            head[heavy[v]] = head[v]
            stack.append(heavy[v])
    return parent, depth, heavy, head, pos`,
    explanation: 'Decompose a tree into chains of heavy edges (edges leading to the child with the largest subtree). Assign consecutive positions along each chain so that a segment tree can answer path queries. Any root-to-leaf path crosses at most O(log n) light edges, so path queries decompose into O(log n) contiguous segments.',
    whyElegant: 'A heavy child always has at least half the parent\'s subtree size, so every time you leave a heavy chain, the subtree at least halves. This guarantees O(log n) chain transitions per path, turning arbitrary tree path queries into O(log^2 n) with a segment tree overlay.',
    keyInsight: 'Edges to the largest-subtree child form chains, and any path crosses at most O(log n) such chains because each light edge at least halves the subtree size.',
    analogy: 'A highway system where major highways connect big cities (heavy edges) and small roads connect towns (light edges). Traveling between any two cities uses at most a few highway transfers because highways serve most of the population.',
    sourceNote: 'Sleator and Tarjan, 1983 (introduced alongside link-cut trees). Widely adopted in competitive programming.',
  },
  {
    id: 'link-cut-tree',
    title: 'Link-Cut Tree (Splay-Based Access)',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['dynamic-tree', 'splay-tree', 'amortized', 'path-query'],
    code: `class LCTNode:
    def __init__(self, val=0):
        self.val = val
        self.ch = [None, None]
        self.parent = None
        self.rev = False

def is_root(x):
    p = x.parent
    return p is None or (p.ch[0] != x and p.ch[1] != x)

def rotate(x):
    p = x.parent; g = p.parent
    d = 0 if p.ch[1] == x else 1
    c = x.ch[d]
    x.ch[d] = p; p.parent = x
    p.ch[1-d] = c
    if c: c.parent = p
    x.parent = g
    if g:
        if g.ch[0] == p: g.ch[0] = x
        elif g.ch[1] == p: g.ch[1] = x

def splay(x):
    while not is_root(x):
        p = x.parent
        if not is_root(p):
            g = p.parent
            if (g.ch[0]==p) == (p.ch[0]==x): rotate(p)
            else: rotate(x)
        rotate(x)

def access(x):
    last = None; u = x
    while u:
        splay(u)
        u.ch[1] = last
        last = u
        u = u.parent
    splay(x)`,
    explanation: 'A link-cut tree represents a dynamic forest that supports linking and cutting edges, plus path queries, all in O(log n) amortized time. The access operation makes a node-to-root path the preferred path by splaying each node and rewiring preferred children. After access, the target node is the splay tree root.',
    whyElegant: 'Three operations (access, link, cut) maintain a dynamic forest. The splay tree ensures amortized O(log n) per operation. Access is the workhorse: it restructures the auxiliary splay trees so the queried path becomes a single splay tree, enabling path aggregation in one step.',
    keyInsight: 'The access operation converts a root-to-node path into a single splay tree through a sequence of splay and preferred-child reassignments, making path queries immediate.',
    analogy: 'Reorganizing a filing system on the fly: when you need a path of folders, you pull them to the top of the cabinet so they are all in one quick-access drawer. Future accesses to the same path are instant.',
    sourceNote: 'Sleator and Tarjan, 1983. The crown jewel of amortized dynamic tree data structures.',
  },
  {
    id: 'treap-split-merge',
    title: 'Treap Split and Merge',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['BST', 'randomization', 'split-merge', 'implicit-key'],
    code: `import random

class Node:
    def __init__(self, key):
        self.key = key
        self.pri = random.random()
        self.left = self.right = None

def split(t, key):
    if t is None:
        return None, None
    if t.key <= key:
        t.right, right = split(t.right, key)
        return t, right
    else:
        left, t.left = split(t.left, key)
        return left, t

def merge(left, right):
    if left is None:
        return right
    if right is None:
        return left
    if left.pri > right.pri:
        left.right = merge(left.right, right)
        return left
    else:
        right.left = merge(left, right.left)
        return right`,
    explanation: 'Split divides a treap into two treaps: one with all keys up to a threshold and one with keys above. Merge combines two treaps (where all keys in the left are smaller than all in the right) into one, using priorities to decide which root goes on top. Both operations run in O(log n) expected time.',
    whyElegant: 'Split and merge are inverses of each other, and together they replace insert, delete, and a host of other operations. Need to insert? Split at the key, merge the left half with the new node, merge the result with the right half. The symmetry is deeply satisfying.',
    keyInsight: 'Split and merge are dual operations: split breaks a treap at a key boundary, merge reassembles two treaps by priority, and together they subsume insert, delete, and range operations.',
    analogy: 'A deck of cards sorted by number but also shuffled by a hidden priority: splitting the deck at a number is fast because the priority order keeps the deck shallow, and merging two decks just interleaves by priority.',
    sourceNote: 'Based on Aragon and Seidel\'s treap (1989). The split/merge formulation is standard in competitive programming.',
  },
  {
    id: 'persistent-segment-tree',
    title: 'Persistent Segment Tree',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['persistent', 'data-structure', 'versioning', 'immutable'],
    code: `class PNode:
    def __init__(self, val=0, left=None, right=None):
        self.val = val
        self.left = left
        self.right = right

def build(lo, hi):
    if lo == hi:
        return PNode()
    mid = (lo + hi) // 2
    return PNode(0, build(lo, mid), build(mid+1, hi))

def update(node, lo, hi, idx, val):
    if lo == hi:
        return PNode(node.val + val)
    mid = (lo + hi) // 2
    if idx <= mid:
        new_left = update(node.left, lo, mid, idx, val)
        return PNode(node.val + val, new_left, node.right)
    else:
        new_right = update(node.right, mid+1, hi, idx, val)
        return PNode(node.val + val, node.left, new_right)

def query(node, lo, hi, ql, qr):
    if ql <= lo and hi <= qr:
        return node.val
    if hi < ql or lo > qr:
        return 0
    mid = (lo + hi) // 2
    return (query(node.left, lo, mid, ql, qr)
            + query(node.right, mid+1, hi, ql, qr))`,
    explanation: 'A persistent segment tree keeps all previous versions after each update. Instead of modifying nodes in place, each update creates new nodes along the path from root to leaf, sharing unchanged subtrees with the old version. This gives O(log n) time and space per update with full version history.',
    whyElegant: 'Path copying creates a new version in O(log n) time and space by reusing the vast majority of the existing tree. You get unlimited undo and version comparison for the cost of a few extra pointers per update.',
    keyInsight: 'Copying only the O(log n) nodes on the update path and sharing the rest gives a new version of the tree without duplicating the whole structure.',
    analogy: 'Editing a document in a version control system: each save only records the lines that changed, sharing the rest with the previous version. You can visit any past version instantly.',
    sourceNote: 'Based on Driscoll, Sarnak, Sleator, and Tarjan\'s persistence framework (1986). Widely used in functional programming and competitive programming.',
  },
  {
    id: 'fractional-cascading',
    title: 'Fractional Cascading',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['search', 'multi-level', 'binary-search', 'augmented-list'],
    code: `from bisect import bisect_left

def build_cascade(lists):
    n = len(lists)
    augmented = [None] * n
    augmented[n-1] = sorted(lists[n-1])
    for i in range(n-2, -1, -1):
        promoted = augmented[i+1][::2]
        merged = sorted(set(lists[i]) | set(promoted))
        augmented[i] = merged
    return augmented

def cascade_search(augmented, target):
    results = []
    pos = bisect_left(augmented[0], target)
    for level in augmented:
        pos = min(pos, len(level) - 1)
        if pos >= 0 and pos < len(level):
            found = level[pos] == target
            results.append(found)
        else:
            results.append(False)
        pos = pos // 2
    return results`,
    explanation: 'Search for a value across multiple sorted lists. Instead of doing a binary search on each list independently (O(k log n) for k lists), promote every other element from each list into the list above and store pointers. After one binary search on the first (augmented) list, subsequent lists are searched in O(1) each by following pointers.',
    whyElegant: 'The first binary search costs O(log n), and each subsequent list costs O(1) by following pointers from the previous level. Total: O(log n + k) instead of O(k log n). The promotion of every other element adds only 50% overhead per level, and that overhead shrinks geometrically across levels.',
    keyInsight: 'Promoting every other element from each list into the previous one and maintaining forward pointers turns k binary searches into one binary search plus k constant-time lookups.',
    analogy: 'A series of hotel front desks, each with a guest list. The first desk has a merged list with bookmarks pointing into the second desk\'s list. After finding a name at desk one, you follow the bookmark to desk two in one step instead of searching again.',
    sourceNote: 'Chazelle and Guibas, 1986. Accelerates multi-level binary search in computational geometry.',
  },
  {
    id: 'wavelet-tree-rank',
    title: 'Wavelet Tree Range Rank Query',
    language: 'Python',
    category: 'Classic Algorithms',
    conceptTags: ['data-structure', 'rank-query', 'succinct', 'divide-and-conquer'],
    code: `class WNode:
    def __init__(self, lo, hi, bv=None,
                 left=None, right=None):
        self.lo = lo
        self.hi = hi
        self.bv = bv or []
        self.left = left
        self.right = right

def build_wavelet(arr, lo, hi):
    if lo == hi:
        return WNode(lo, hi)
    mid = (lo + hi) // 2
    bv = [0]
    left_arr, right_arr = [], []
    for x in arr:
        if x <= mid:
            left_arr.append(x)
            bv.append(bv[-1] + 1)
        else:
            right_arr.append(x)
            bv.append(bv[-1])
    node = WNode(lo, hi, bv)
    node.left = build_wavelet(left_arr, lo, mid)
    node.right = build_wavelet(right_arr, mid+1, hi)
    return node

def rank(node, l, r, x):
    if node.lo == node.hi:
        return r - l + 1 if node.lo == x else 0
    mid = (node.lo + node.hi) // 2
    if x <= mid:
        nl = node.bv[l]
        nr = node.bv[r + 1]
        return rank(node.left, nl, nr-1, x) if nl < nr else 0
    else:
        nl = l - node.bv[l]
        nr = (r+1) - node.bv[r+1]
        return rank(node.right, nl, nr-1, x) if nl < nr else 0`,
    explanation: 'A wavelet tree recursively partitions a sequence by the alphabet\'s midpoint. At each level, a bitvector records which elements went left (below the midpoint) and which went right. To count occurrences of a value in a range, descend the tree, narrowing the range at each level using prefix sums on the bitvector. Each level takes O(1) with precomputed prefix sums.',
    whyElegant: 'The wavelet tree answers rank, select, quantile, and range-frequency queries all in O(log A) time where A is the alphabet size. One data structure, built once, supports an impressive catalog of queries. The bitvector at each level compresses the sequence while maintaining full queryability.',
    keyInsight: 'Recursively splitting by alphabet midpoint and storing a bitvector at each level lets range rank queries descend the tree in O(log A) by mapping range endpoints through prefix sums.',
    analogy: 'A tournament bracket where, at each round, players are sorted into two groups by skill rating midpoint. A bitvector at each round records which group each player went to, letting you trace any player\'s path through the bracket instantly.',
    sourceNote: 'Grossi, Gupta, and Vitter, 2003. A versatile succinct data structure used in bioinformatics and text indexing.',
  },
];
