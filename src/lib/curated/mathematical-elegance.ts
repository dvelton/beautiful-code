import type { CuratedExample } from '../../types';

export const mathematicalElegance: CuratedExample[] = [
  {
    id: 'sieve-of-eratosthenes',
    title: 'The Ancient Sieve That Still Outperforms',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['primes', 'sieve', 'number theory'],
    code: `def sieve(n):
    is_prime = [True] * (n + 1)
    is_prime[0] = is_prime[1] = False
    for i in range(2, int(n**0.5) + 1):
        if is_prime[i]:
            for j in range(i * i, n + 1, i):
                is_prime[j] = False
    return [i for i, v in enumerate(is_prime) if v]`,
    explanation:
      'Write every number on a long list. Start at 2 and cross out all its multiples. Move to the next uncrossed number, cross out its multiples. Keep going. Whatever survives is prime.',
    whyElegant:
      'Instead of testing each number in isolation, it lets composites reveal themselves the way a colander lets water drain while catching pasta. One pass does the work of millions of individual checks.',
    keyInsight:
      'You never need to test a number directly; non-primes eliminate themselves as multiples of smaller primes.',
    analogy:
      'A classroom where every kid who is a copycat sits down, and only the originals are left standing.',
    sourceNote: 'Eratosthenes of Cyrene, c. 240 BC.',
  },
  {
    id: 'newton-raphson-sqrt',
    title: 'Newton\'s Method: Guessing Your Way to Precision',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['approximation', 'calculus', 'convergence'],
    code: `def sqrt_newton(n, tolerance=1e-12):
    guess = n / 2.0
    while True:
        better = (guess + n / guess) / 2.0
        if abs(better - guess) < tolerance:
            return better
        guess = better`,
    explanation:
      'Start with a rough guess for the square root. Average that guess with the number divided by the guess. Repeat. Each round doubles the number of correct digits.',
    whyElegant:
      'The formula is three lines long and converges absurdly fast. It is like adjusting a picture frame: each nudge gets you closer, and within a few nudges it looks perfect.',
    keyInsight:
      'Averaging your guess with the number divided by your guess always lands you closer to the true root.',
    analogy:
      'Splitting the difference between "too big" and "too small" on a seesaw until it balances perfectly.',
    sourceNote:
      'Isaac Newton, De analysi per aequationes numero terminorum infinitas, 1669; Joseph Raphson, Analysis aequationum universalis, 1690.',
  },
  {
    id: 'fast-inverse-sqrt',
    title: 'The Quake Hack That Bent the Rules of Floats',
    language: 'C',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['bit manipulation', 'floating point', 'game dev'],
    code: `float q_rsqrt(float number) {
    long i;
    float x2, y;
    const float threehalfs = 1.5F;
    x2 = number * 0.5F;
    y  = number;
    i  = *(long *)&y;
    i  = 0x5f3759df - (i >> 1);
    y  = *(float *)&i;
    y  = y * (threehalfs - (x2 * y * y));
    return y;
}`,
    explanation:
      'To find one divided by the square root of a number (needed constantly in 3D graphics), this code treats the raw memory of a decimal number as if it were an integer, does one subtraction with a magic constant, then converts back. One round of Newton\'s method polishes the result.',
    whyElegant:
      'It exploits the internal layout of floating-point numbers as a kind of secret logarithm table already sitting in memory, like finding a cheat code hidden in the hardware. The magic constant 0x5f3759df encodes decades of numerical analysis into a single hex number.',
    keyInsight:
      'The IEEE 754 bit pattern of a float is approximately its logarithm, so integer arithmetic on those bits performs approximate log-space math.',
    analogy:
      'Reading a ruler upside-down and accidentally getting the right answer because the markings happen to work both ways.',
    sourceNote:
      'Attributed to Greg Walsh at Ardent Computer; popularised in Quake III Arena source (id Software, 1999). Likely predates Quake by several years.',
  },
  {
    id: 'karatsuba-multiplication',
    title: 'Multiplying Big Numbers with Fewer Multiplications',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['divide and conquer', 'multiplication', 'complexity'],
    code: `def karatsuba(x, y):
    if x < 10 or y < 10:
        return x * y
    n = max(len(str(x)), len(str(y)))
    m = n // 2
    high_x, low_x = divmod(x, 10**m)
    high_y, low_y = divmod(y, 10**m)
    z0 = karatsuba(low_x, low_y)
    z2 = karatsuba(high_x, high_y)
    z1 = karatsuba(high_x + low_x, high_y + low_y) - z2 - z0
    return z2 * 10**(2 * m) + z1 * 10**m + z0`,
    explanation:
      'To multiply two large numbers, split each in half. Instead of four smaller multiplications (the obvious approach), a clever rearrangement lets you get away with only three. Apply the same trick to each sub-problem recursively.',
    whyElegant:
      'It saves one multiplication per level of recursion, which compounds into a dramatically faster algorithm. Like packing a suitcase so efficiently that you suddenly need a smaller suitcase.',
    keyInsight:
      'Three multiplications plus some additions can replace four multiplications by reusing partial products.',
    analogy:
      'A chef who realizes that making a third dish from the leftover ingredients of the first two is faster than cooking four dishes from scratch.',
    sourceNote:
      'Anatolii Karatsuba, "Multiplication of Multidigit Numbers on Automata," Doklady Akademii Nauk SSSR, 1962.',
  },
  {
    id: 'extended-euclidean',
    title: 'Two Numbers\' Deepest Shared Secret',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['GCD', 'number theory', 'cryptography'],
    code: `def extended_gcd(a, b):
    if b == 0:
        return a, 1, 0
    g, x1, y1 = extended_gcd(b, a % b)
    return g, y1, x1 - (a // b) * y1`,
    explanation:
      'Find the greatest common divisor of two numbers, and also find two coefficients that combine those numbers to produce exactly that divisor. For example, gcd(35, 15) is 5, and 35*1 + 15*(-2) = 5.',
    whyElegant:
      'A single recursion produces three useful answers simultaneously. It is the Swiss-army-knife function that underpins RSA encryption, modular arithmetic, and Diophantine equations, all in five lines.',
    keyInsight:
      'The coefficients unwind naturally from the recursive GCD calls, piggy-backing on work already being done.',
    analogy:
      'Retracing your steps through a maze and picking up breadcrumbs that, assembled in order, spell out a secret message.',
    sourceNote:
      'Euclid, Elements Book VII, c. 300 BC; extended form attributed to Étienne Bézout, 1779.',
  },
  {
    id: 'fermat-modular-inverse',
    title: 'Finding the Undo Button with Fermat',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['modular arithmetic', 'number theory', 'primes'],
    code: `def mod_inverse(a, p):
    """Modular inverse of a mod p, where p is prime."""
    return pow(a, p - 2, p)`,
    explanation:
      'Division does not exist in modular arithmetic, but Fermat proved that raising a number to the power (p minus 2) modulo a prime p produces the "inverse" that acts like division. Python\'s built-in pow does this in one call.',
    whyElegant:
      'A deep theorem from 1640 collapses into a single function call. The entire proof is baked into the math: no loops, no special cases, just one exponentiation.',
    keyInsight:
      'Fermat\'s little theorem guarantees a^(p-1) = 1 mod p, so a^(p-2) is automatically the multiplicative inverse.',
    analogy:
      'Pressing "rewind" on a tape player so many times that it loops all the way around to one second before where you started.',
    sourceNote:
      'Pierre de Fermat, letter to Frénicle de Bessy, 1640.',
  },
  {
    id: 'pascal-triangle-zip',
    title: 'Pascal\'s Triangle in One Line of Zip',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['combinatorics', 'functional', 'elegance'],
    code: `def pascal(n):
    row = [1]
    for _ in range(n):
        yield row
        row = [a + b for a, b in zip([0] + row, row + [0])]`,
    explanation:
      'Each row of Pascal\'s triangle is built by placing a zero on each end of the previous row and adding overlapping neighbours. The zip trick pairs up adjacent numbers automatically.',
    whyElegant:
      'No indices, no boundary checks, no special cases. The padding-with-zeros trick means every position is treated identically, the way a picture frame gives every edge the same border.',
    keyInsight:
      'Offsetting a list by one position and zipping it with itself turns neighbour-addition into a single list comprehension.',
    analogy:
      'Two lines of people standing shoulder to shoulder, shifted one step apart, where each pair shakes hands and their grip strengths are added together.',
    sourceNote:
      'Blaise Pascal, Traité du triangle arithmétique, 1654; the zip formulation is a well-known Pythonic pattern.',
  },
  {
    id: 'fibonacci-matrix-exponentiation',
    title: 'Fibonacci in Logarithmic Time via Matrices',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['matrices', 'exponentiation', 'Fibonacci'],
    code: `def mat_mul(A, B):
    return [
        [A[0][0]*B[0][0] + A[0][1]*B[1][0],
         A[0][0]*B[0][1] + A[0][1]*B[1][1]],
        [A[1][0]*B[0][0] + A[1][1]*B[1][0],
         A[1][0]*B[0][1] + A[1][1]*B[1][1]],
    ]

def mat_pow(M, n):
    if n == 1:
        return M
    if n % 2 == 0:
        half = mat_pow(M, n // 2)
        return mat_mul(half, half)
    return mat_mul(M, mat_pow(M, n - 1))

def fib(n):
    if n <= 1:
        return n
    result = mat_pow([[1, 1], [1, 0]], n)
    return result[0][1]`,
    explanation:
      'The Fibonacci sequence can be expressed as repeated multiplication of a tiny 2x2 matrix. Repeated squaring means you only need about log2(n) multiplications instead of n additions.',
    whyElegant:
      'It transforms a sequence problem into a geometry problem. The matrix is a machine: feed it power, and the Fibonacci number falls out of one corner. Like a combination lock where doubling the dial spins gets you there exponentially faster.',
    keyInsight:
      'Matrix exponentiation by squaring reduces an O(n) recurrence to O(log n) multiplications.',
    analogy:
      'Instead of climbing stairs one at a time, you build a jetpack that doubles its altitude with every fuel burst.',
    sourceNote:
      'Connection between Fibonacci and matrices known since at least J. J. Sylvester; popularised in CLRS.',
  },
  {
    id: 'prime-factorisation-trial-division',
    title: 'Breaking Numbers Into Their Atoms',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['primes', 'factorisation', 'number theory'],
    code: `def prime_factors(n):
    factors = []
    d = 2
    while d * d <= n:
        while n % d == 0:
            factors.append(d)
            n //= d
        d += 1
    if n > 1:
        factors.append(n)
    return factors`,
    explanation:
      'Divide the number by 2 as many times as you can, then try 3, then 4 (which will never work because you already got all the 2s), and so on. Stop when the divisor squared exceeds what is left. If anything remains, it is itself prime.',
    whyElegant:
      'The inner loop peels off prime factors like removing layers from an onion, and the d*d <= n guard means you never do more work than necessary.',
    keyInsight:
      'Every composite factor is automatically skipped because its prime components have already been divided out.',
    analogy:
      'Emptying a piggy bank by removing the largest coins first until only a single coin (or nothing) remains.',
    sourceNote:
      'Trial division is the oldest known factoring method; described implicitly in Euclid\'s Elements.',
  },
  {
    id: 'babylonian-sqrt',
    title: 'The Oldest Algorithm Still Running',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['approximation', 'ancient algorithms', 'convergence'],
    code: `def sqrt_babylonian(n):
    x = n
    while True:
        y = (x + n / x) / 2
        if abs(y - x) < 1e-10:
            return y
        x = y`,
    explanation:
      'Guess a square root. If your guess is too high, n divided by your guess is too low (and vice versa). Average them. Repeat. This is the same idea as Newton-Raphson, discovered 3,000 years earlier.',
    whyElegant:
      'Babylonian scribes, working on clay tablets with no concept of calculus, found the same convergence pattern that Newton would later formalize. The algorithm is a testament to the idea that good ideas are timeless.',
    keyInsight:
      'The arithmetic mean of an overestimate and an underestimate always lands closer to the true value.',
    analogy:
      'Two friends walking toward each other from opposite sides of a field, each halving their remaining distance every step.',
    sourceNote:
      'Yale Babylonian Collection, tablet YBC 7289, c. 1800-1600 BC.',
  },
  {
    id: 'integer-sqrt-binary-search',
    title: 'Square Roots Without Decimals',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['binary search', 'integers', 'square root'],
    code: `def isqrt(n):
    if n < 0:
        raise ValueError("Square root of negative number")
    if n < 2:
        return n
    lo, hi = 1, n
    while lo <= hi:
        mid = (lo + hi) // 2
        if mid * mid == n:
            return mid
        elif mid * mid < n:
            lo = mid + 1
            result = mid
        else:
            hi = mid - 1
    return result`,
    explanation:
      'To find the integer square root, treat it as a guessing game. Pick the middle of your range, check if it is too big or too small, and halve the range. Repeat until you zero in.',
    whyElegant:
      'Binary search is a universal solver: any yes/no question on a sorted domain can be answered in logarithmic time. Applying it to square roots is like using the same master key to open a completely different door.',
    keyInsight:
      'The perfect squares form a sorted sequence, so binary search can locate the right one without any floating-point arithmetic.',
    analogy:
      'A "guess my number" game where you always guess the middle and your friend says higher or lower.',
    sourceNote:
      'Binary search dates to John Mauchly, 1946; application to integer square root is folklore.',
  },
  {
    id: 'stern-brocot-tree',
    title: 'Every Fraction, Exactly Once, in Order',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['fractions', 'tree', 'number theory'],
    code: `def stern_brocot(target, max_depth=50):
    """Navigate the Stern-Brocot tree to find the fraction closest to target."""
    left_n, left_d = 0, 1
    right_n, right_d = 1, 0
    for _ in range(max_depth):
        med_n = left_n + right_n
        med_d = left_d + right_d
        mediant = med_n / med_d
        if abs(mediant - target) < 1e-10:
            return med_n, med_d
        elif target < mediant:
            right_n, right_d = med_n, med_d
        else:
            left_n, left_d = med_n, med_d
    return med_n, med_d`,
    explanation:
      'The Stern-Brocot tree arranges every positive fraction in a binary tree where you go left for "too big" and right for "too small." The mediant (adding numerators and denominators separately) creates a new fraction between the two parents. Every reduced fraction appears exactly once.',
    whyElegant:
      'It generates all of rational arithmetic from one rule: add tops, add bottoms. No simplification needed because every fraction produced is already in lowest terms. Like a family tree where no two cousins share a name.',
    keyInsight:
      'The mediant of two fractions in lowest terms with adjacent Farey neighbors is itself in lowest terms.',
    analogy:
      'A tournament bracket where, instead of eliminating players, every match creates a new player ranked exactly between the two competitors.',
    sourceNote:
      'Moritz Stern, 1858; Achille Brocot, 1861 (independently).',
  },
  {
    id: 'catalan-recurrence',
    title: 'Counting Every Way to Pair Parentheses',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['combinatorics', 'dynamic programming', 'recurrence'],
    code: `def catalan(n):
    if n <= 1:
        return 1
    dp = [0] * (n + 1)
    dp[0] = dp[1] = 1
    for i in range(2, n + 1):
        for j in range(i):
            dp[i] += dp[j] * dp[i - 1 - j]
    return dp[n]`,
    explanation:
      'The Catalan numbers count the number of ways to correctly match parentheses, triangulate a polygon, or arrange a binary tree. Each number is built by splitting a problem into a left part and a right part and multiplying the possibilities.',
    whyElegant:
      'One formula governs a huge family of seemingly unrelated counting problems. It is as if the same key opened every lock in a building because the locks all share hidden geometry.',
    keyInsight:
      'The recurrence C(n) = sum of C(j)*C(n-1-j) captures every way to split n items into two non-overlapping groups.',
    analogy:
      'All the different ways you could slice a pizza using only straight cuts from edge to edge, where each slice must be a triangle.',
    sourceNote:
      'Eugène Charles Catalan, 1838; appears earlier in Euler\'s polygon triangulation work, 1751.',
  },
  {
    id: 'fibonacci-search',
    title: 'Searching with the Golden Ratio',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['search', 'Fibonacci', 'golden ratio'],
    code: `def fibonacci_search(arr, target):
    n = len(arr)
    fib2, fib1, fib = 0, 1, 1
    while fib < n:
        fib2, fib1, fib = fib1, fib, fib1 + fib
    offset = -1
    while fib > 1:
        idx = min(offset + fib2, n - 1)
        if arr[idx] < target:
            fib, fib1, fib2 = fib1, fib2, fib1 - fib2
            offset = idx
        elif arr[idx] > target:
            fib, fib1, fib2 = fib2, fib1 - fib2, fib2 - (fib1 - fib2)
        else:
            return idx
    if fib1 and offset + 1 < n and arr[offset + 1] == target:
        return offset + 1
    return -1`,
    explanation:
      'Instead of always splitting a sorted list in half (binary search), split it at positions defined by Fibonacci numbers. The splits are roughly 61.8% / 38.2%, mirroring the golden ratio. This only uses addition and subtraction, no division.',
    whyElegant:
      'It trades the clean symmetry of halving for the natural asymmetry of the golden ratio, and in exchange removes all division operations. On hardware where division is expensive, nature\'s favourite ratio wins.',
    keyInsight:
      'Fibonacci numbers provide a division-free way to partition a range into progressively smaller golden-ratio segments.',
    analogy:
      'A librarian who knows that the book is roughly two-thirds of the way along the shelf, so they reach there first instead of always going to the middle.',
    sourceNote:
      'David E. Ferguson, "Fibonaccian Searching," Communications of the ACM, 1960.',
  },
  {
    id: 'hamming-weight-kernighan',
    title: 'Counting Ones by Erasing Them',
    language: 'C',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['bit manipulation', 'popcount', 'algorithms'],
    code: `int popcount(unsigned int x) {
    int count = 0;
    while (x) {
        x &= (x - 1);
        count++;
    }
    return count;
}`,
    explanation:
      'To count how many binary 1-bits a number has, subtract one (which flips the lowest 1 and everything below it) and AND with the original. This erases exactly one 1-bit per iteration, so you loop exactly as many times as there are 1-bits.',
    whyElegant:
      'The loop runs in proportion to the answer, not the size of the number. Most bits are zero and are skipped entirely, like a teacher who only calls on students with raised hands.',
    keyInsight:
      'x & (x - 1) always clears exactly the lowest set bit, giving a direct count with zero wasted iterations.',
    analogy:
      'Popping bubbles on bubble wrap: you only press the bubbles that are still inflated, and each press pops exactly one.',
    sourceNote:
      'Peter Wegner, 1960; often called Brian Kernighan\'s method after its appearance in The C Programming Language.',
  },
  {
    id: 'clear-lowest-set-bit',
    title: 'The One-Liner That Powers Everything',
    language: 'C',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['bit manipulation', 'bit tricks', 'fundamentals'],
    code: `/* Clear the lowest set bit of x */
unsigned int clear_lowest(unsigned int x) {
    return x & (x - 1);
}

/* Check if x is a power of two */
int is_power_of_two(unsigned int x) {
    return x && !(x & (x - 1));
}`,
    explanation:
      'Subtracting 1 from a binary number flips the rightmost 1 to 0 and all the 0s to its right become 1. ANDing with the original cancels them all out, erasing just that lowest 1. If the result is zero, there was only one 1-bit, meaning the number is a power of two.',
    whyElegant:
      'An enormous number of bit-level algorithms rest on this single operation. It is the "hello world" of bit manipulation, except it actually does something useful and beautiful.',
    keyInsight:
      'Subtracting 1 creates a bit pattern that, when ANDed with the original, surgically removes the lowest set bit.',
    analogy:
      'Pulling the bottom card from a house of cards without disturbing anything above it.',
    sourceNote:
      'Fundamental bit trick; widely documented, notably in Henry S. Warren Jr., Hacker\'s Delight, 2002.',
  },
  {
    id: 'gray-code-conversion',
    title: 'Changing One Bit at a Time',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['bit manipulation', 'encoding', 'Gray code'],
    code: `def to_gray(n):
    return n ^ (n >> 1)

def from_gray(g):
    n = g
    mask = g >> 1
    while mask:
        n ^= mask
        mask >>= 1
    return n`,
    explanation:
      'In normal binary counting, multiple bits can flip at once (like 0111 to 1000). Gray code rearranges the sequence so only one bit changes per step. Converting is a single XOR with a shifted copy of the number.',
    whyElegant:
      'One XOR operation transforms standard binary into a code where adjacent numbers differ in exactly one bit. It is used in error correction, rotary encoders, and solving the Towers of Hanoi.',
    keyInsight:
      'XORing a number with itself shifted right by one produces a sequence where consecutive values differ in exactly one bit position.',
    analogy:
      'A combination lock where you only ever turn one dial per step, so you never risk overshooting.',
    sourceNote:
      'Frank Gray, U.S. Patent 2,632,058, 1953.',
  },
  {
    id: 'de-bruijn-sequence',
    title: 'Every Combination in the Shortest Necklace',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['combinatorics', 'sequences', 'graph theory'],
    code: `def de_bruijn(k, n):
    """Generate a de Bruijn sequence for alphabet size k, subsequences of length n."""
    alphabet = list(range(k))
    a = [0] * (k * n)
    sequence = []

    def db(t, p):
        if t > n:
            if n % p == 0:
                sequence.extend(a[1:p + 1])
        else:
            a[t] = a[t - p]
            db(t + 1, p)
            for j in range(a[t - p] + 1, k):
                a[t] = j
                db(t + 1, t)

    db(1, 1)
    return sequence`,
    explanation:
      'A de Bruijn sequence packs every possible subsequence of a given length into the shortest possible circular string. For binary strings of length 3, you get a sequence of just 8 bits that contains all 8 possible 3-bit patterns as windows.',
    whyElegant:
      'It is maximally efficient: every bit does double or triple duty as part of overlapping windows. No wasted symbols, no repetition, like a sentence where every three-letter window is a different valid word.',
    keyInsight:
      'An Eulerian path through the de Bruijn graph visits every edge (subsequence) exactly once, producing the shortest possible sequence containing all patterns.',
    analogy:
      'A circular train track where every three consecutive stations spell out a different city name, and no name appears twice.',
    sourceNote:
      'Nicolaas Govert de Bruijn, 1946; Martin\'s algorithm for generation.',
  },
  {
    id: 'chebyshev-approximation',
    title: 'The Polynomial That Hugs a Curve',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['approximation', 'polynomials', 'numerical methods'],
    code: `import math

def chebyshev_coeffs(f, n, a=-1, b=1):
    """Compute Chebyshev approximation coefficients for f on [a, b]."""
    coeffs = []
    for j in range(n):
        total = 0
        for k in range(n):
            xk = math.cos(math.pi * (k + 0.5) / n)
            x_mapped = 0.5 * (a + b) + 0.5 * (b - a) * xk
            total += f(x_mapped) * math.cos(math.pi * j * (k + 0.5) / n)
        coeffs.append(2.0 / n * total)
    return coeffs`,
    explanation:
      'To approximate a complicated function with a simple polynomial, sample it at special "Chebyshev nodes" clustered near the edges of the interval. These nodes minimize the worst-case error, giving the tightest possible polynomial fit.',
    whyElegant:
      'Chebyshev polynomials spread their error evenly instead of letting it pile up at the edges. It is like a mattress that distributes your weight perfectly so no single spring is overloaded.',
    keyInsight:
      'Sampling at the roots of Chebyshev polynomials minimizes the maximum approximation error across the entire interval.',
    analogy:
      'Placing tent stakes not evenly but clustered toward the edges so the fabric is taut everywhere, not just in the middle.',
    sourceNote:
      'Pafnuty Chebyshev, "Théorie des mécanismes connus sous le nom de parallélogrammes," 1854.',
  },
  {
    id: 'pythagorean-triples',
    title: 'Generating Right Triangles from Thin Air',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['number theory', 'geometry', 'parametric'],
    code: `def pythagorean_triples(limit):
    triples = []
    for m in range(2, limit):
        for n in range(1, m):
            a = m * m - n * n
            b = 2 * m * n
            c = m * m + n * n
            if c > limit:
                break
            triples.append((a, b, c))
    return triples`,
    explanation:
      'Every primitive Pythagorean triple (like 3-4-5 or 5-12-13) can be generated by picking two positive integers m and n where m is larger, and computing m squared minus n squared, twice m times n, and m squared plus n squared.',
    whyElegant:
      'An infinite family of geometric facts reduced to three simple formulas. No searching, no guessing. Every right triangle with integer sides falls out of this parametric machine.',
    keyInsight:
      'The parametrisation a = m^2 - n^2, b = 2mn, c = m^2 + n^2 exhaustively generates all Pythagorean triples.',
    analogy:
      'A cookie cutter that stamps out perfectly shaped right triangles every time, with no leftover dough.',
    sourceNote:
      'Euclid, Elements Book X, Proposition 29, c. 300 BC.',
  },
  {
    id: 'modular-exponentiation',
    title: 'Raising to Enormous Powers Without Overflow',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['modular arithmetic', 'exponentiation', 'cryptography'],
    code: `def mod_pow(base, exp, mod):
    result = 1
    base %= mod
    while exp > 0:
        if exp % 2 == 1:
            result = result * base % mod
        exp >>= 1
        base = base * base % mod
    return result`,
    explanation:
      'To compute a huge power modulo some number (critical for encryption), repeatedly square the base and reduce mod at each step. If the current bit of the exponent is 1, multiply the result. Numbers never grow larger than mod squared.',
    whyElegant:
      'It tames astronomical numbers by keeping everything small at every step. Computing 2^1000000 mod 997 takes about 20 multiplications, not a million. Like climbing a staircase by doubling your step size each time.',
    keyInsight:
      'Reducing modulo m after every multiplication keeps intermediate values bounded while preserving the correct final result.',
    analogy:
      'A clock that resets every 12 hours: you can track millions of hours without ever writing a number bigger than 12.',
    sourceNote:
      'Described in Chandah-sutra by Pingala, c. 200 BC; formalised in Knuth, The Art of Computer Programming, Vol. 2.',
  },
  {
    id: 'chinese-remainder-theorem',
    title: 'Solving Puzzles by Working in Parallel Worlds',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['number theory', 'CRT', 'modular arithmetic'],
    code: `def chinese_remainder(remainders, moduli):
    """Solve x = r_i (mod m_i) for pairwise coprime moduli."""
    from functools import reduce
    N = reduce(lambda a, b: a * b, moduli)
    x = 0
    for r_i, m_i in zip(remainders, moduli):
        N_i = N // m_i
        # Modular inverse via extended Euclidean
        def ext_gcd(a, b):
            if b == 0: return a, 1, 0
            g, x1, y1 = ext_gcd(b, a % b)
            return g, y1, x1 - (a // b) * y1
        _, inv, _ = ext_gcd(N_i, m_i)
        x += r_i * N_i * inv
    return x % N`,
    explanation:
      'If you know the remainders of a number when divided by several coprime divisors, you can reconstruct the original number exactly. It is like knowing a person\'s age modulo 3, 5, and 7, and deducing their exact age.',
    whyElegant:
      'Multiple small, easy problems are solved independently and then stitched back together into one big answer. Each "world" (modulus) operates in isolation, then the results merge perfectly.',
    keyInsight:
      'Pairwise coprime moduli create independent "channels" of information that can be recombined without loss.',
    analogy:
      'Three friends each remember a different part of a phone number, and together they reconstruct the whole thing without overlap or conflict.',
    sourceNote:
      'Sun Zi, Sunzi Suanjing (The Mathematical Classic of Sun Zi), c. 3rd-5th century AD.',
  },
  {
    id: 'euler-totient',
    title: 'Counting Numbers That Don\'t Share Factors',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['number theory', 'totient', 'RSA'],
    code: `def euler_totient(n):
    result = n
    p = 2
    while p * p <= n:
        if n % p == 0:
            while n % p == 0:
                n //= p
            result -= result // p
        p += 1
    if n > 1:
        result -= result // n
    return result`,
    explanation:
      'Euler\'s totient function counts how many numbers from 1 to n share no common factor with n. For each prime factor p, it subtracts the fraction 1/p from the count. This function is central to RSA encryption.',
    whyElegant:
      'The inclusion-exclusion principle collapses into a product formula: for each prime factor, just multiply by (1 - 1/p). Complex combinatorics reduced to a few multiplications.',
    keyInsight:
      'Each prime factor p removes exactly 1/p of the remaining candidates, and these removals are independent.',
    analogy:
      'A sieve where each layer catches a fixed percentage of the remaining grains, and the layers do not interfere with each other.',
    sourceNote:
      'Leonhard Euler, Theoremata arithmetica nova methodo demonstrata, 1763.',
  },
  {
    id: 'mobius-function',
    title: 'The Function That Inverts Sums',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['number theory', 'Mobius', 'inversion'],
    code: `def mobius(n):
    if n == 1:
        return 1
    factor_count = 0
    d = 2
    while d * d <= n:
        if n % d == 0:
            if n % (d * d) == 0:
                return 0  # has a squared factor
            factor_count += 1
            n //= d
        else:
            d += 1
    if n > 1:
        factor_count += 1
    return -1 if factor_count % 2 else 1`,
    explanation:
      'The Mobius function returns 0 if a number has any repeated prime factor, +1 if it has an even number of distinct prime factors, and -1 if odd. It acts as an "undo button" for summation over divisors.',
    whyElegant:
      'A function that outputs only -1, 0, or 1 manages to invert an entire family of arithmetic sums. Three values carry all the information needed for Mobius inversion, one of the deepest tools in number theory.',
    keyInsight:
      'The Mobius function is the Dirichlet inverse of the constant function 1, enabling inversion of any sum over divisors.',
    analogy:
      'A universal antidote: no matter how complicated the poison (the sum), this one tiny pill (the Mobius function) neutralizes it perfectly.',
    sourceNote:
      'August Ferdinand Mobius, 1831.',
  },
  {
    id: 'berlekamp-welch-concept',
    title: 'Fixing Errors in Messages with Extra Polynomials',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['error correction', 'polynomials', 'coding theory'],
    code: `def berlekamp_welch_encode(message, n_redundant, prime):
    """Encode message as polynomial evaluations with redundancy."""
    from functools import reduce
    k = len(message)
    n = k + n_redundant

    def poly_eval(coeffs, x, mod):
        return reduce(lambda acc, c: (acc * x + c) % mod, reversed(coeffs), 0)

    # message coefficients define polynomial P(x)
    return [(i, poly_eval(message, i, prime)) for i in range(1, n + 1)]`,
    explanation:
      'Encode a message as the values of a polynomial at several points, sending more points than strictly needed. Even if some points get corrupted, the extra points let you reconstruct the original polynomial (and thus the message) exactly.',
    whyElegant:
      'A polynomial of degree k is fully determined by k+1 points, so any extra points serve as error detection and correction for free. The redundancy is structural, not repetition.',
    keyInsight:
      'Oversampling a polynomial provides enough constraints to identify and correct errors without knowing which points were corrupted.',
    analogy:
      'Drawing a straight line: two points define it, but if you have five points and two are wrong, the other three still agree on the correct line.',
    sourceNote:
      'Elwyn Berlekamp and Lloyd Welch, "Error correction for algebraic block codes," 1986.',
  },
  {
    id: 'baby-step-giant-step',
    title: 'The Discrete Logarithm Shortcut',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['discrete logarithm', 'meet in the middle', 'cryptography'],
    code: `import math

def baby_step_giant_step(g, h, p):
    """Find x such that g^x = h (mod p)."""
    m = math.isqrt(p) + 1
    # Baby steps: g^j for j in [0, m)
    table = {}
    power = 1
    for j in range(m):
        table[power] = j
        power = power * g % p
    # Giant step factor: g^(-m) mod p
    factor = pow(g, p - 1 - m, p)
    gamma = h
    for i in range(m):
        if gamma in table:
            return i * m + table[gamma]
        gamma = gamma * factor % p
    return None`,
    explanation:
      'To solve g^x = h mod p (the discrete logarithm), precompute a table of g^j for small j, then take "giant steps" of size m through the space. When a giant step lands on a baby step, you have found x. Total work: about sqrt(p) steps instead of p.',
    whyElegant:
      'It splits a brute-force search into two halves that meet in the middle, turning an impossible problem into a feasible one. The time-memory tradeoff is perfectly balanced at the square root.',
    keyInsight:
      'Writing x = im + j decomposes the search into two independent lookups that each cover only sqrt(p) values.',
    analogy:
      'Two search parties starting from opposite ends of a forest, each covering half the ground, and meeting at the lost hiker.',
    sourceNote:
      'Daniel Shanks, "Class number, a theory of factorization, and genera," 1971.',
  },
  {
    id: 'lucas-primality-test',
    title: 'Proving Primality by Finding a Witness',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['primality', 'number theory', 'proof'],
    code: `def lucas_test(n):
    """Deterministic primality test using Lucas' theorem (requires full factorisation of n-1)."""
    if n < 2:
        return False
    if n == 2:
        return True

    from math import gcd

    def prime_factors(m):
        factors = set()
        d = 2
        while d * d <= m:
            while m % d == 0:
                factors.add(d)
                m //= d
            d += 1
        if m > 1:
            factors.add(m)
        return factors

    factors = prime_factors(n - 1)
    for a in range(2, n):
        if pow(a, n - 1, n) != 1:
            return False
        if all(pow(a, (n - 1) // q, n) != 1 for q in factors):
            return True
    return False`,
    explanation:
      'To prove n is prime, find a "witness" a such that a^(n-1) = 1 mod n, but a^((n-1)/q) is not 1 for any prime factor q of n-1. If such an a exists, n is definitely prime (not just probably).',
    whyElegant:
      'Most primality tests give probabilistic confidence. Lucas gives certainty. One good witness is a mathematical proof of primality, encoded as a single number.',
    keyInsight:
      'A primitive root modulo n exists if and only if n is prime, and verifying one is sufficient for a proof.',
    analogy:
      'Instead of asking every resident if the mayor is legitimate, you find one resident with a special key that only works if the mayor is genuine.',
    sourceNote:
      'Edouard Lucas, "Théorie des fonctions numériques simplement périodiques," 1878.',
  },
  {
    id: 'solovay-strassen-test',
    title: 'Testing Primality with Euler and Jacobi',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['primality', 'probabilistic', 'Jacobi symbol'],
    code: `import random

def jacobi(a, n):
    if a == 0:
        return 0
    if a == 1:
        return 1
    if a % 2 == 0:
        if n % 8 in (1, 7):
            return jacobi(a // 2, n)
        return -jacobi(a // 2, n)
    if a % 4 == 3 and n % 4 == 3:
        return -jacobi(n % a, a)
    return jacobi(n % a, a)

def solovay_strassen(n, k=20):
    if n < 2: return False
    if n == 2: return True
    if n % 2 == 0: return False
    for _ in range(k):
        a = random.randrange(2, n)
        j = jacobi(a, n) % n
        if j == 0 or pow(a, (n - 1) // 2, n) != j:
            return False
    return True`,
    explanation:
      'Pick a random number and check whether its Jacobi symbol (a generalized concept of "is it a perfect square mod n") matches what Euler\'s criterion predicts for primes. If they disagree, n is definitely composite. Repeat with more random picks for higher confidence.',
    whyElegant:
      'It connects three deep ideas (Euler\'s criterion, the Jacobi symbol, and quadratic residues) into a fast probabilistic test. Each round halves the chance of error.',
    keyInsight:
      'For primes, Euler\'s criterion and the Jacobi symbol always agree; disagreement is a definitive compositeness proof.',
    analogy:
      'Cross-referencing two independent witnesses: if their stories match, the alibi holds. If they contradict, someone is lying.',
    sourceNote:
      'Robert Solovay and Volker Strassen, "A Fast Monte-Carlo Test for Primality," SIAM Journal on Computing, 1977.',
  },
  {
    id: 'tonelli-shanks',
    title: 'Taking Square Roots in a Modular World',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['modular arithmetic', 'square roots', 'number theory'],
    code: `def tonelli_shanks(n, p):
    """Find x such that x^2 = n (mod p)."""
    if pow(n, (p - 1) // 2, p) != 1:
        return None  # no solution
    q, s = p - 1, 0
    while q % 2 == 0:
        q //= 2
        s += 1
    z = 2
    while pow(z, (p - 1) // 2, p) != p - 1:
        z += 1
    m, c, t, r = s, pow(z, q, p), pow(n, q, p), pow(n, (q + 1) // 2, p)
    while t != 1:
        i = 1
        temp = t * t % p
        while temp != 1:
            temp = temp * temp % p
            i += 1
        b = pow(c, 1 << (m - i - 1), p)
        m, c, t, r = i, b * b % p, t * b * b % p, r * b % p
    return r`,
    explanation:
      'Find a number whose square, when divided by a prime p, leaves a specific remainder. The algorithm works by factoring out powers of 2 from p-1 and using a non-residue as a "correction factor" to iteratively adjust the candidate until it works.',
    whyElegant:
      'It solves a problem that sounds impossible (taking square roots where there is no "decimal" concept) through a sequence of corrections that systematically eliminate the "wrong" part of the answer.',
    keyInsight:
      'By repeatedly halving the order of a correction factor, each iteration fixes one more bit of the solution.',
    analogy:
      'Tuning a guitar string by halving the adjustment each time: first a semitone, then a quarter-tone, then an eighth, converging on perfect pitch.',
    sourceNote:
      'Alberto Tonelli, 1891; Daniel Shanks, "Five Number-Theoretic Algorithms," 1973.',
  },
  {
    id: 'legendre-symbol',
    title: 'Is This Number a Perfect Square Mod p?',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['quadratic residues', 'number theory', 'Euler criterion'],
    code: `def legendre(a, p):
    """Compute the Legendre symbol (a/p) for odd prime p."""
    if a % p == 0:
        return 0
    result = pow(a, (p - 1) // 2, p)
    return -1 if result == p - 1 else result`,
    explanation:
      'For an odd prime p, the Legendre symbol tells you whether a number is a "perfect square" in modular arithmetic. Raise a to the power (p-1)/2 mod p. If the result is 1, some number squared equals a mod p. If it is -1, no such number exists.',
    whyElegant:
      'A binary classification (square or not-square) for an entire number system, computed by a single exponentiation. Euler\'s criterion turns a conceptual question into arithmetic.',
    keyInsight:
      'Half of the non-zero numbers mod p are quadratic residues, and Euler\'s criterion sorts them in one operation.',
    analogy:
      'A litmus test that turns blue for "is a perfect square" and red for "is not," with no false readings.',
    sourceNote:
      'Adrien-Marie Legendre, Essai sur la théorie des nombres, 1798.',
  },
  {
    id: 'pollard-rho',
    title: 'Finding Factors by Walking in Circles',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['factorisation', 'probabilistic', 'cycle detection'],
    code: `from math import gcd

def pollard_rho(n):
    if n % 2 == 0:
        return 2
    x = 2
    y = 2
    d = 1
    f = lambda x: (x * x + 1) % n
    while d == 1:
        x = f(x)
        y = f(f(y))
        d = gcd(abs(x - y), n)
    return d if d != n else None`,
    explanation:
      'Generate a pseudo-random sequence by repeatedly squaring and adding 1, modulo n. Run two copies of this sequence at different speeds (one moves one step, the other two). When the difference between them shares a factor with n, you have found a factor.',
    whyElegant:
      'Factoring a large number (an incredibly hard problem in general) reduced to a random walk and a GCD check. Floyd\'s cycle detection, normally used for linked lists, becomes a factoring tool. Ten lines that punch well above their weight.',
    keyInsight:
      'The birthday paradox guarantees that a pseudo-random sequence will cycle modulo a factor of n much sooner than modulo n itself.',
    analogy:
      'Two runners on a circular track going at different speeds: they will inevitably lap each other, and the lap distance reveals the track\'s hidden structure.',
    sourceNote:
      'John Pollard, "A Monte Carlo Method for Factorization," BIT Numerical Mathematics, 1975.',
  },
  {
    id: 'schonhage-strassen-concept',
    title: 'Multiplying Giants by Turning Numbers into Waves',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['multiplication', 'FFT', 'number theory'],
    code: `def schoolbook_multiply(a, b):
    """Schoolbook multiplication as a baseline for comparison."""
    na, nb = len(a), len(b)
    result = [0] * (na + nb)
    for i in range(na):
        for j in range(nb):
            result[i + j] += a[i] * b[j]
    # carry propagation
    for i in range(len(result) - 1):
        result[i + 1] += result[i] // 10
        result[i] %= 10
    return result

# The Schonhage-Strassen insight: replace the O(n^2) inner loop
# with a Number Theoretic Transform (NTT), reducing multiplication
# of n-digit numbers to O(n log n log log n).
# Conceptually: treat digits as polynomial coefficients,
# evaluate at roots of unity mod a suitable prime,
# pointwise multiply, and transform back.`,
    explanation:
      'Schoolbook multiplication of two n-digit numbers requires n-squared single-digit multiplications. Schonhage and Strassen realized you can treat digits as a wave signal, apply the number-theoretic version of the Fourier transform, multiply point-by-point, and transform back. The result is nearly linear in the number of digits.',
    whyElegant:
      'It transforms multiplication (inherently quadratic) into signal processing (nearly linear). The idea that arithmetic and wave physics share the same underlying mathematics is a deep unification.',
    keyInsight:
      'Polynomial multiplication via evaluation-pointwise multiply-interpolation reduces O(n^2) convolution to O(n log n).',
    analogy:
      'Instead of mixing two colors by stirring them together (slow), you separate each into its light spectrum, combine the spectra, and recombine into the final color (fast).',
    sourceNote:
      'Arnold Schonhage and Volker Strassen, "Schnelle Multiplikation grosser Zahlen," Computing, 1971.',
  },
  {
    id: 'ntt-butterfly',
    title: 'Fourier Transforms Without Decimals',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['NTT', 'modular arithmetic', 'butterfly'],
    code: `def ntt(a, mod, g, invert=False):
    """Number Theoretic Transform (in-place, iterative)."""
    n = len(a)
    j = 0
    for i in range(1, n):
        bit = n >> 1
        while j & bit:
            j ^= bit
            bit >>= 1
        j ^= bit
        if i < j:
            a[i], a[j] = a[j], a[i]

    length = 2
    while length <= n:
        w = pow(g, (mod - 1) // length, mod)
        if invert:
            w = pow(w, mod - 2, mod)
        for i in range(0, n, length):
            wn = 1
            for k in range(length // 2):
                u = a[i + k]
                v = a[i + k + length // 2] * wn % mod
                a[i + k] = (u + v) % mod
                a[i + k + length // 2] = (u - v) % mod
                wn = wn * w % mod
        length <<= 1

    if invert:
        inv_n = pow(n, mod - 2, mod)
        for i in range(n):
            a[i] = a[i] * inv_n % mod
    return a`,
    explanation:
      'The Number Theoretic Transform is the Fourier transform done entirely in modular (integer) arithmetic. The "butterfly" operation adds and subtracts pairs of elements, multiplied by roots of unity that exist modulo a prime instead of in the complex plane.',
    whyElegant:
      'No floating-point rounding, no complex numbers, yet the same butterfly structure as the FFT. Integer arithmetic gives exact results, which is critical for cryptography and large-number multiplication.',
    keyInsight:
      'Primes of the form k*2^m + 1 have primitive roots of unity in modular arithmetic, enabling exact FFT-like transforms.',
    analogy:
      'Sheet music transposed into a key where every note is a whole number: the melody is the same, but there are no sharps or flats to worry about.',
    sourceNote:
      'Rader, 1968; Pollard, 1971. The modular arithmetic variant of the Cooley-Tukey FFT.',
  },
  {
    id: 'fft-cooley-tukey',
    title: 'The Butterfly That Revolutionised Computing',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['FFT', 'divide and conquer', 'signal processing'],
    code: `import cmath

def fft(x):
    n = len(x)
    if n == 1:
        return x
    even = fft(x[0::2])
    odd = fft(x[1::2])
    T = [cmath.exp(-2j * cmath.pi * k / n) * odd[k] for k in range(n // 2)]
    return [even[k] + T[k] for k in range(n // 2)] + \\
           [even[k] - T[k] for k in range(n // 2)]`,
    explanation:
      'To decompose a signal into its component frequencies, split it into even-indexed and odd-indexed samples, apply the same decomposition recursively, then combine with complex rotations called "twiddle factors." The combination step is the butterfly: one add, one subtract.',
    whyElegant:
      'It reduces a problem that would take n-squared operations to n-log-n, making modern audio, image processing, and telecommunications possible. The recursive halving is so natural it feels inevitable.',
    keyInsight:
      'The symmetry of roots of unity means half the butterfly outputs are just negated versions of the other half, cutting the work in two at each level.',
    analogy:
      'Sorting a deck of cards by repeatedly splitting into two piles (even positions, odd positions) and merging in a way that the order emerges naturally.',
    sourceNote:
      'James Cooley and John Tukey, "An Algorithm for the Machine Calculation of Complex Fourier Series," Mathematics of Computation, 1965.',
  },
  {
    id: 'convolution-via-fft',
    title: 'Convolution: Multiply Polynomials at the Speed of Light',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['convolution', 'FFT', 'polynomials'],
    code: `import cmath

def fft(x):
    n = len(x)
    if n == 1: return x
    even, odd = fft(x[0::2]), fft(x[1::2])
    T = [cmath.exp(-2j * cmath.pi * k / n) * odd[k] for k in range(n // 2)]
    return [even[k] + T[k] for k in range(n // 2)] + \\
           [even[k] - T[k] for k in range(n // 2)]

def ifft(x):
    n = len(x)
    return [v / n for v in fft([v.conjugate() for v in x])]

def convolve(a, b):
    size = 1
    while size < len(a) + len(b) - 1:
        size <<= 1
    fa = fft(a + [0] * (size - len(a)))
    fb = fft(b + [0] * (size - len(b)))
    fc = [x * y for x, y in zip(fa, fb)]
    return [round(v.real) for v in ifft(fc)]`,
    explanation:
      'Multiplying two polynomials coefficient by coefficient takes n-squared work. Transform both to frequency space (FFT), multiply point-by-point (linear work), and transform back (inverse FFT). Total: n-log-n instead of n-squared.',
    whyElegant:
      'The convolution theorem says multiplication in one domain is convolution in the other, and vice versa. Moving to the easier domain, doing the work there, and coming back is a strategy that recurs throughout science and engineering.',
    keyInsight:
      'Convolution in the time domain becomes pointwise multiplication in the frequency domain, turning O(n^2) into O(n log n).',
    analogy:
      'Instead of multiplying long numbers digit by digit, translate them into a language where multiplication is trivially easy, do it there, and translate the answer back.',
    sourceNote:
      'Direct application of the convolution theorem; computational form enabled by Cooley-Tukey FFT, 1965.',
  },
  {
    id: 'gaussian-elimination',
    title: 'Solving Equations by Organised Cancellation',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['linear algebra', 'systems of equations', 'pivoting'],
    code: `def gaussian_elimination(A, b):
    n = len(b)
    M = [row[:] + [bi] for row, bi in zip(A, b)]
    for col in range(n):
        # partial pivoting
        max_row = max(range(col, n), key=lambda r: abs(M[r][col]))
        M[col], M[max_row] = M[max_row], M[col]
        pivot = M[col][col]
        for row in range(col + 1, n):
            factor = M[row][col] / pivot
            for j in range(col, n + 1):
                M[row][j] -= factor * M[col][j]
    # back substitution
    x = [0.0] * n
    for i in range(n - 1, -1, -1):
        x[i] = (M[i][n] - sum(M[i][j] * x[j] for j in range(i + 1, n))) / M[i][i]
    return x`,
    explanation:
      'To solve a system of linear equations, use one equation to eliminate a variable from all the others. Repeat with the next variable. Eventually each equation has only one unknown, and you can read off the answers from bottom to top.',
    whyElegant:
      'A systematic, mechanical process that solves any system of linear equations. No cleverness required: follow the steps and the answer appears. Like untangling headphones by methodically loosening one knot at a time from the top.',
    keyInsight:
      'Partial pivoting (swapping in the row with the largest leading value) prevents division by tiny numbers that amplify rounding errors.',
    analogy:
      'Solving a mystery by interviewing witnesses one at a time, each time using what you learned to narrow down one more suspect.',
    sourceNote:
      'Carl Friedrich Gauss described his method in Theoria motus corporum coelestium, 1809; the algorithm itself is much older.',
  },
  {
    id: 'lu-decomposition-pivot',
    title: 'Splitting One Problem into Two Easy Ones',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['linear algebra', 'decomposition', 'pivoting'],
    code: `def lu_decompose(A):
    n = len(A)
    L = [[0.0] * n for _ in range(n)]
    U = [row[:] for row in A]
    P = list(range(n))
    for k in range(n):
        # pivot
        max_row = max(range(k, n), key=lambda r: abs(U[r][k]))
        U[k], U[max_row] = U[max_row], U[k]
        L[k], L[max_row] = L[max_row], L[k]
        P[k], P[max_row] = P[max_row], P[k]
        L[k][k] = 1.0
        for i in range(k + 1, n):
            L[i][k] = U[i][k] / U[k][k]
            for j in range(k, n):
                U[i][j] -= L[i][k] * U[k][j]
    for i in range(n):
        L[i][i] = 1.0
    return P, L, U`,
    explanation:
      'Factor a matrix into a lower-triangular matrix L (easy to solve) and an upper-triangular matrix U (also easy to solve). Solving the original system becomes two simple back-substitutions. Pivoting (swapping rows) ensures numerical stability.',
    whyElegant:
      'Once you have L and U, solving with any new right-hand side is cheap. The upfront decomposition pays for itself many times over, like building a jig that lets you cut identical pieces forever.',
    keyInsight:
      'Decomposition lets you reuse the expensive part (factoring) across many cheap solves.',
    analogy:
      'Disassembling a complicated recipe into prep steps (L) and cooking steps (U): once the prep is done, you can cook the same dish with different ingredients quickly.',
    sourceNote:
      'Alan Turing, "Rounding-off errors in matrix processes," 1948; earlier forms in Banachiewicz, 1938.',
  },
  {
    id: 'gram-schmidt',
    title: 'Making Vectors Stand Up Straight',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['linear algebra', 'orthogonalisation', 'QR'],
    code: `def gram_schmidt(vectors):
    def dot(u, v):
        return sum(a * b for a, b in zip(u, v))
    def scale(c, v):
        return [c * x for x in v]
    def subtract(u, v):
        return [a - b for a, b in zip(u, v)]
    def norm(v):
        return dot(v, v) ** 0.5

    ortho = []
    for v in vectors:
        for u in ortho:
            proj = dot(v, u) / dot(u, u)
            v = subtract(v, scale(proj, u))
        if norm(v) > 1e-10:
            ortho.append(v)
    return ortho`,
    explanation:
      'Given a set of vectors that may point in overlapping directions, subtract out the overlapping parts one at a time until each vector is perpendicular to all the others. The result is an orthogonal basis.',
    whyElegant:
      'A simple loop of "subtract the shadow" produces a perfectly perpendicular coordinate system from any starting set. It is the mathematical equivalent of straightening a crooked picture frame by removing the lean in each direction independently.',
    keyInsight:
      'Projecting onto previously orthogonalised vectors and subtracting removes exactly the non-orthogonal component.',
    analogy:
      'Straightening a leaning tower by measuring its tilt in each compass direction and correcting one direction at a time.',
    sourceNote:
      'Jorgen Pedersen Gram, 1883; Erhard Schmidt, 1907.',
  },
  {
    id: 'power-iteration',
    title: 'Finding the Dominant Direction by Repeated Pushing',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['eigenvalues', 'linear algebra', 'iteration'],
    code: `def power_iteration(A, num_iterations=1000):
    import random
    n = len(A)
    b = [random.random() for _ in range(n)]

    for _ in range(num_iterations):
        # multiply A * b
        ab = [sum(A[i][j] * b[j] for j in range(n)) for i in range(n)]
        # normalise
        norm = max(abs(x) for x in ab)
        b = [x / norm for x in ab]

    # Rayleigh quotient for eigenvalue
    ab = [sum(A[i][j] * b[j] for j in range(n)) for i in range(n)]
    eigenvalue = sum(a * bi for a, bi in zip(ab, b)) / sum(bi * bi for bi in b)
    return eigenvalue, b`,
    explanation:
      'Multiply a random vector by a matrix over and over, normalising each time. The vector gradually aligns with the direction the matrix "stretches" the most. The stretch factor is the dominant eigenvalue. This is how Google\'s original PageRank worked.',
    whyElegant:
      'No fancy decomposition, no polynomial root-finding. Just multiply and normalise, and the dominant eigenvalue emerges from the noise like a signal tuning in on a radio.',
    keyInsight:
      'Repeated multiplication amplifies the component along the dominant eigenvector exponentially faster than all other components.',
    analogy:
      'Pushing a shopping cart on uneven ground: no matter which direction you start, it always veers toward the steepest slope.',
    sourceNote:
      'Richard von Mises and Hilda Pollaczek-Geiringer, "Praktische Verfahren der Gleichungsauflosung," 1929.',
  },
  {
    id: 'jacobi-iteration',
    title: 'Solving Equations by Polite Negotiation',
    language: 'Python',
    category: 'Mathematical Elegance in Code',
    conceptTags: ['linear algebra', 'iteration', 'convergence'],
    code: `def jacobi(A, b, tol=1e-10, max_iter=1000):
    n = len(b)
    x = [0.0] * n
    for _ in range(max_iter):
        x_new = [0.0] * n
        for i in range(n):
            s = sum(A[i][j] * x[j] for j in range(n) if j != i)
            x_new[i] = (b[i] - s) / A[i][i]
        if max(abs(x_new[i] - x[i]) for i in range(n)) < tol:
            return x_new
        x = x_new
    return x`,
    explanation:
      'To solve a system of equations, guess a solution. For each equation, assume all the other variables are correct and solve for just one. Update all variables simultaneously. Repeat. If the matrix is "diagonally dominant" (each equation is mostly about one variable), this converges.',
    whyElegant:
      'Each variable is updated independently using only the current guesses of the others. No triangulation, no factoring, no pivoting. It is like a group of people each adjusting their own chair at a round table until everyone is comfortable.',
    keyInsight:
      'Diagonal dominance guarantees that each local correction reduces the global error, so independent updates converge to the true solution.',
    analogy:
      'A group of musicians tuning their instruments simultaneously: each listens to the current sound of the ensemble and adjusts only their own instrument, and after enough rounds, the whole orchestra is in tune.',
    sourceNote:
      'Carl Gustav Jacob Jacobi, c. 1845; published posthumously in 1890.',
  },
];
