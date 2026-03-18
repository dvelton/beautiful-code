import type { CuratedExample } from '../../types';

export const compressionEncoding: CuratedExample[] = [
  {
    id: 'run-length-encoding',
    title: 'Run-Length Encoding',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['lossless', 'streaming', 'repetition'],
    code: `from itertools import groupby

def rle_encode(data: str) -> list[tuple[str, int]]:
    return [(char, sum(1 for _ in group)) for char, group in groupby(data)]

def rle_decode(encoded: list[tuple[str, int]]) -> str:
    return ''.join(char * count for char, count in encoded)

text = "AAAABBBCCDAA"
enc = rle_encode(text)
print(enc)          # [('A', 4), ('B', 3), ('C', 2), ('D', 1), ('A', 2)]
print(rle_decode(enc))  # AAAABBBCCDAA`,
    explanation: 'Instead of storing each letter individually, store the letter once along with how many times it repeats. "AAAABBB" becomes "4A 3B" — far fewer characters to record.',
    whyElegant: 'The elegance is in recognizing that repeated data is just a count waiting to happen. Like a teacher marking attendance: instead of writing "present present present present", write "present ×4".',
    keyInsight: 'Long runs of identical values are pure redundancy that a count collapses instantly.',
    analogy: 'A tally chart on a blackboard — four scratch marks then a cross-stroke instead of writing the same word four times.',
    sourceNote: 'Used in early fax machines (1960s) and still in PNG and BMP file formats.',
  },
  {
    id: 'huffman-tree',
    title: 'Huffman Tree Construction',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['greedy', 'prefix-free', 'entropy'],
    code: `import heapq
from collections import Counter

def build_huffman(text: str) -> dict[str, str]:
    freq = Counter(text)
    heap = [[w, [ch, ""]] for ch, w in freq.items()]
    heapq.heapify(heap)

    while len(heap) > 1:
        lo = heapq.heappop(heap)
        hi = heapq.heappop(heap)
        for pair in lo[1:]:
            pair[1] = '0' + pair[1]
        for pair in hi[1:]:
            pair[1] = '1' + pair[1]
        heapq.heappush(heap, [lo[0] + hi[0]] + lo[1:] + hi[1:])

    return {char: code for char, code in sorted(heap[0][1:], key=lambda x: len(x[1]))}

codes = build_huffman("abracadabra")
for ch, code in codes.items():
    print(f"{ch!r}: {code}")`,
    explanation: 'Count how often each character appears. The most common character gets the shortest code (like "0"), rarer characters get longer codes. Build a tree by always merging the two least-common items first.',
    whyElegant: 'It is mathematically proven to produce the shortest possible prefix-free code for any given frequency table. Like a postal system that puts the most popular destinations on the fastest routes.',
    keyInsight: 'Optimal codes arise naturally from a greedy strategy that always merges the two smallest piles.',
    analogy: 'Morse code: the most common letter in English, E, is just a single dot — short codes for common things, long ones for rare ones.',
    sourceNote: 'David Huffman, MIT, 1952. He invented it as a student rather than accept a take-home exam.',
  },
  {
    id: 'delta-encoding',
    title: 'Delta Encoding for Sorted Integers',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['delta', 'sorted-data', 'integers'],
    code: `def delta_encode(values: list[int]) -> list[int]:
    if not values:
        return []
    deltas = [values[0]]
    for i in range(1, len(values)):
        deltas.append(values[i] - values[i - 1])
    return deltas

def delta_decode(deltas: list[int]) -> list[int]:
    result = [deltas[0]]
    for d in deltas[1:]:
        result.append(result[-1] + d)
    return result

timestamps = [1000, 1003, 1007, 1010, 1015]
encoded = delta_encode(timestamps)
print(encoded)               # [1000, 3, 4, 3, 5]
print(delta_decode(encoded)) # [1000, 1003, 1007, 1010, 1015]`,
    explanation: 'Instead of storing large absolute numbers, store only the small differences between consecutive values. A list of timestamps like 1000, 1003, 1007 becomes 1000, +3, +4 — much smaller numbers that compress easily.',
    whyElegant: 'Sorted data is highly predictable, so the differences between values are small. Small numbers need fewer bits. Like recording a car trip as "drove 3 miles, then 2 more" rather than writing out the full odometer reading each time.',
    keyInsight: 'The information in a sorted list lives mostly in the gaps, not the absolute values.',
    analogy: 'A train schedule that says "depart 9:00, then every 12 minutes" instead of listing every departure time.',
    sourceNote: 'Core technique in time-series databases like Gorilla (Facebook, 2015) and Prometheus.',
  },
  {
    id: 'varint-encoding',
    title: 'Variable-Length Integer Encoding',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['varint', 'protobuf', 'bit-manipulation'],
    code: `def encode_varint(n: int) -> bytes:
    result = []
    while True:
        bits = n & 0x7F          # take 7 bits
        n >>= 7
        if n:
            result.append(bits | 0x80)   # set MSB to signal "more follows"
        else:
            result.append(bits)           # MSB clear = last byte
            break
    return bytes(result)

def decode_varint(data: bytes) -> int:
    result = 0
    shift = 0
    for byte in data:
        result |= (byte & 0x7F) << shift
        if not (byte & 0x80):
            break
        shift += 7
    return result

print(encode_varint(300).hex())   # ac02
print(decode_varint(bytes([0xAC, 0x02])))  # 300
print(encode_varint(1).hex())     # 01  — just one byte`,
    explanation: 'Small numbers should take up little space. Each byte uses 7 bits for data and 1 bit to say "there are more bytes coming". The number 1 fits in one byte; 300 needs two. A fixed 4-byte integer always uses 4 bytes regardless.',
    whyElegant: 'Used in Protocol Buffers (Google\'s serialization format) to handle numbers of any size efficiently. Like a bag that shrinks to fit what you put in it — no wasted space.',
    keyInsight: 'One flag bit per byte lets you encode any size integer with near-optimal space for small values.',
    analogy: 'A shipping label that says "turn over for more address" only when the address is too long — most packages need just one label.',
    sourceNote: 'Core to Google Protocol Buffers and SQLite\'s record format.',
  },
  {
    id: 'base64-encoding',
    title: 'Base64 Encoding Logic',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['encoding', 'binary-to-text', 'bit-manipulation'],
    code: `CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"

def base64_encode(data: bytes) -> str:
    result = []
    padding = (3 - len(data) % 3) % 3
    data = data + b'\\x00' * padding

    for i in range(0, len(data), 3):
        b0, b1, b2 = data[i], data[i+1], data[i+2]
        n = (b0 << 16) | (b1 << 8) | b2
        result += [
            CHARS[(n >> 18) & 63],
            CHARS[(n >> 12) & 63],
            CHARS[(n >>  6) & 63],
            CHARS[(n >>  0) & 63],
        ]

    encoded = ''.join(result)
    return encoded[:-padding] + '=' * padding if padding else encoded

print(base64_encode(b"Man"))    # TWFu
print(base64_encode(b"Hello"))  # SGVsbG8=`,
    explanation: 'Binary data uses all 256 byte values, but many systems (email, URLs) only handle plain text safely. Base64 regroups bits into 6-bit chunks, each mapped to a printable character. Three bytes become four characters — about 33% larger but universally safe.',
    whyElegant: 'Three bytes = 24 bits = four 6-bit groups. The math is exact and the result is text that goes anywhere. Like translating a book into a phonetic alphabet so anyone can read it aloud without knowing the original language.',
    keyInsight: 'Repackaging 8-bit bytes as 6-bit characters sacrifices size for universal compatibility.',
    analogy: 'Packing oddly-shaped cargo into standard shipping containers — you lose some space but the containers go everywhere.',
    sourceNote: 'Defined in RFC 4648. The name comes from MIME, which uses it for email attachments.',
  },
  {
    id: 'lz77-sliding-window',
    title: 'LZ77 Sliding Window Compression',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['dictionary', 'sliding-window', 'back-reference'],
    code: `def lz77_encode(data: str, window: int = 10) -> list:
    tokens = []
    i = 0
    while i < len(data):
        best_offset, best_length = 0, 0
        start = max(0, i - window)

        for j in range(start, i):
            length = 0
            while i + length < len(data) and data[j + length] == data[i + length]:
                length += 1
                if j + length >= i:
                    break
            if length > best_length:
                best_offset = i - j
                best_length = length

        if best_length > 2:
            tokens.append((best_offset, best_length, data[i + best_length] if i + best_length < len(data) else ''))
            i += best_length + 1
        else:
            tokens.append((0, 0, data[i]))
            i += 1
    return tokens

print(lz77_encode("abracadabraabracadabra"))`,
    explanation: 'Keep a window of recently seen text. When a pattern repeats, instead of writing it out again, write "go back N characters and copy M characters from there." Long repeated sequences shrink to tiny back-references.',
    whyElegant: 'The compressor and decompressor share the same history window, so there is no separate dictionary to transmit. The already-decoded output is the dictionary. Like a conversation where "same as before" replaces repeating yourself.',
    keyInsight: 'The decoded output is its own dictionary — no separate lookup table needed.',
    analogy: 'A copy-editor who writes "see paragraph 3" instead of re-typing the same sentence.',
    sourceNote: 'Abraham Lempel and Jacob Ziv, 1977. Foundation of every zip-format compressor.',
  },
  {
    id: 'move-to-front',
    title: 'Move-to-Front Transform',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['transform', 'locality', 'preprocessing'],
    code: `def mtf_encode(data: bytes) -> list[int]:
    alphabet = list(range(256))
    output = []
    for byte in data:
        idx = alphabet.index(byte)
        output.append(idx)
        alphabet.pop(idx)
        alphabet.insert(0, byte)
    return output

def mtf_decode(indices: list[int]) -> bytes:
    alphabet = list(range(256))
    output = []
    for idx in indices:
        byte = alphabet[idx]
        output.append(byte)
        alphabet.pop(idx)
        alphabet.insert(0, byte)
    return bytes(output)

data = b"aababc"
enc = mtf_encode(data)
print(enc)                  # [97, 0, 1, 0, 98, 2]
print(mtf_decode(enc))      # b'aababc'`,
    explanation: 'Maintain a list of all possible symbols. When you see a symbol, output its current position, then move it to the front of the list. Repeated symbols get position 0 or 1 every time — small numbers that compress beautifully afterward.',
    whyElegant: 'Locally repeated symbols produce runs of near-zero numbers, which later compressors love. It turns locality of reference (data tends to repeat recently) into small integers almost automatically.',
    keyInsight: 'Recent usage is a perfect predictor of future usage — move-to-front exploits this precisely.',
    analogy: 'A library that moves books to the front of the shelf each time they are checked out, so frequent readers grab them with position "1" or "2" every time.',
    sourceNote: 'Bentley, Sleator, Tarjan, and Wei, 1986. Used as a stage in bzip2.',
  },
  {
    id: 'burrows-wheeler-transform',
    title: 'Burrows-Wheeler Transform',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['transform', 'sorting', 'reversible'],
    code: `def bwt_encode(s: str) -> tuple[str, int]:
    s = s + '\\x00'            # end-of-string sentinel
    rotations = sorted(s[i:] + s[:i] for i in range(len(s)))
    last_col = ''.join(r[-1] for r in rotations)
    original_idx = rotations.index(s)
    return last_col, original_idx

def bwt_decode(last: str, idx: int) -> str:
    table = sorted(range(len(last)), key=lambda i: last[i])
    result = []
    row = idx
    for _ in range(len(last)):
        result.append(last[row])
        row = table[row]
    return ''.join(reversed(result))[1:]   # strip sentinel

encoded, idx = bwt_encode("banana")
print(encoded, idx)          # nnbaaa\x00  3
print(bwt_decode(encoded, idx))  # banana`,
    explanation: 'Rearrange the text so that characters preceding the same context cluster together. "banana" becomes a string where all the "a"s end up together, all the "n"s together. That clustering then compresses far more easily with run-length encoding.',
    whyElegant: 'The transform is fully reversible from just the last column of sorted rotations plus one index number. It converts arbitrary text into a form that is much more compressible without losing any information.',
    keyInsight: 'Sorting all rotations clusters similar contexts together, grouping identical preceding characters automatically.',
    analogy: 'Alphabetizing an address book by last name so all the Smiths appear together — you haven\'t lost anyone, you\'ve just made them easier to find in bulk.',
    sourceNote: 'Michael Burrows and David Wheeler, 1994. Core transform in bzip2.',
  },
  {
    id: 'arithmetic-coding',
    title: 'Arithmetic Coding Interval',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['arithmetic-coding', 'probability', 'interval'],
    code: `def arithmetic_encode(symbols: list[str], probs: dict[str, float]) -> float:
    # Build cumulative probability table
    cumul = {}
    total = 0.0
    for sym in sorted(probs):
        cumul[sym] = total
        total += probs[sym]

    low, high = 0.0, 1.0
    for sym in symbols:
        width = high - low
        high = low + width * (cumul[sym] + probs[sym])
        low  = low + width * cumul[sym]
    return (low + high) / 2   # any value in the final interval

probs = {'a': 0.5, 'b': 0.3, 'c': 0.2}
msg = ['a', 'b', 'a']
code = arithmetic_encode(msg, probs)
print(f"{code:.6f}")   # 0.385000  — a single float encodes the whole message`,
    explanation: 'Represent the entire message as a single decimal number between 0 and 1. Each symbol narrows the interval proportionally to its probability. Frequent symbols narrow it less, so they cost fewer bits. The final number encodes the whole message.',
    whyElegant: 'It achieves the theoretical Shannon entropy limit for any probability model — you cannot do better in principle. Like a map that keeps zooming in: each symbol points to a smaller region, and the final coordinates tell you the exact path taken.',
    keyInsight: 'A message is a path through nested probability intervals; the final position encodes the path completely.',
    analogy: 'Narrowing a target from "anywhere in the country" to "your specific street address" by answering a series of yes/no questions about region, city, and block.',
    sourceNote: 'Rissanen and Langdon, 1979. Used in JPEG 2000 and H.265 video codecs.',
  },
  {
    id: 'rice-coding',
    title: 'Rice Coding',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['rice-coding', 'golomb', 'unary'],
    code: `def rice_encode(n: int, k: int) -> str:
    m = 1 << k               # m = 2^k
    q, r = divmod(n, m)
    unary = '1' * q + '0'    # unary-coded quotient
    binary = format(r, f'0{k}b')  # k-bit binary remainder
    return unary + binary

def rice_decode(bits: str, k: int) -> int:
    q = bits.index('0')      # count leading 1s
    r = int(bits[q+1:q+1+k], 2)
    return q * (1 << k) + r

for n in [0, 1, 5, 10, 15]:
    enc = rice_encode(n, 2)
    print(f"{n:2d} -> {enc:12s} -> decoded {rice_decode(enc, 2)}")`,
    explanation: 'Split a number into a quotient and remainder using a power-of-two divisor. Encode the quotient in unary (N ones followed by a zero), then the remainder in binary. For small numbers with a good choice of k, this is extremely compact.',
    whyElegant: 'When data follows a geometric distribution (small values are common), Rice coding provably approaches optimal compression with trivially simple arithmetic — just division and counting. No lookup tables, no trees.',
    keyInsight: 'Matching code length to the expected distribution of values produces near-optimal codes from simple arithmetic.',
    analogy: 'Charging for hotel nights by saying "free nights first, pay per extra night" — if most stays are short, the bill is very small.',
    sourceNote: 'Robert F. Rice, NASA JPL, 1979. Used in FLAC audio and astronomical data compression.',
  },
  {
    id: 'zigzag-encoding',
    title: 'Zigzag Encoding for Signed Integers',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['zigzag', 'signed-integers', 'protobuf'],
    code: `def zigzag_encode(n: int) -> int:
    return (n << 1) ^ (n >> 31)   # maps -1->1, 1->2, -2->3, 2->4, 0->0

def zigzag_decode(n: int) -> int:
    return (n >> 1) ^ -(n & 1)

values = [0, -1, 1, -2, 2, -100, 100]
for v in values:
    enc = zigzag_encode(v)
    print(f"{v:5d} -> {enc:4d} -> {zigzag_decode(enc)}")

# 0 ->    0
# -1 ->   1
#  1 ->   2
# -2 ->   3
#  2 ->   4`,
    explanation: 'Negative numbers in standard binary look huge (−1 is all 1s in a 32-bit integer). Zigzag maps small-magnitude signed numbers to small unsigned numbers: 0→0, −1→1, 1→2, −2→3. Now varint encoding works well for negative numbers too.',
    whyElegant: 'Two bitwise operations interleave positive and negative numbers on the number line like a zipper. The formula is one line and reverses perfectly with the same structure.',
    keyInsight: 'Signed numbers near zero are just unsigned numbers interleaved — shift and XOR reveal that symmetry instantly.',
    analogy: 'A number line where you fold the negative half onto the positive half, laying −1 on top of 1, −2 on top of 2, so all numbers are now non-negative.',
    sourceNote: 'Used in Google Protocol Buffers (sint32/sint64 types).',
  },
  {
    id: 'bit-packing',
    title: 'Bit-Packing N Values into One Integer',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['bit-packing', 'masks', 'compact-storage'],
    code: `def pack_rgb(r: int, g: int, b: int) -> int:
    assert all(0 <= v < 256 for v in (r, g, b)), "each channel must be 0-255"
    return (r << 16) | (g << 8) | b

def unpack_rgb(packed: int) -> tuple[int, int, int]:
    r = (packed >> 16) & 0xFF
    g = (packed >>  8) & 0xFF
    b = (packed >>  0) & 0xFF
    return r, g, b

color = pack_rgb(255, 128, 0)
print(hex(color))           # 0xff8000
print(unpack_rgb(color))    # (255, 128, 0)

# Pack four 2-bit values into one byte
def pack_nibbles(*vals: int) -> int:
    return sum(v << (i * 2) for i, v in enumerate(vals))

print(bin(pack_nibbles(3, 2, 1, 0)))  # 0b00011011`,
    explanation: 'Multiple small values can share a single integer. An RGB color has three values each needing 8 bits, so pack all three into one 24-bit number. Shifting moves each value to its lane; a mask pulls it back out. No struct overhead, no arrays.',
    whyElegant: 'An integer becomes a tiny, self-contained record. Bit shifts and masks act like streets and addresses — they let you navigate to any value with arithmetic alone.',
    keyInsight: 'An integer is just a fixed-size array of bits — you can store any number of sub-values in it as long as they fit.',
    analogy: 'A filing cabinet drawer divided into labeled sections with dividers: the dividers are your bit masks, the sections are your fields.',
    sourceNote: 'Standard practice in graphics (0xRRGGBB), networking (TCP flags byte), and embedded systems.',
  },
  {
    id: 'xor-missing-number',
    title: 'XOR Trick: Finding the Missing Number',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['xor', 'bit-manipulation', 'checksum'],
    code: `def find_missing(nums: list[int], n: int) -> int:
    xor_all = 0
    for i in range(1, n + 1):
        xor_all ^= i
    for num in nums:
        xor_all ^= num
    return xor_all

nums = [1, 2, 4, 5, 6]   # 3 is missing from 1..6
print(find_missing(nums, 6))  # 3

# Works because: a ^ a = 0, a ^ 0 = a
# XOR all 1..n, then XOR the list — matching pairs cancel, missing stays`,
    explanation: 'XOR a number with itself gives zero; XOR with zero leaves it unchanged. XOR every number from 1 to N, then XOR every number in the list. The pairs cancel out, leaving only the missing number.',
    whyElegant: 'No sorting, no sets, no extra memory — one variable and two loops. The answer appears as if by magic from the property that everything cancels except what is absent.',
    keyInsight: 'XOR is its own inverse: anything present twice vanishes, so the result is exactly what appeared an odd number of times.',
    analogy: 'Matching socks from a drawer — when you pair every sock, the one without a partner is the missing one.',
    sourceNote: 'Classic interview problem; the XOR approach is O(n) time and O(1) space.',
  },
  {
    id: 'byte-stuffing',
    title: 'Byte Stuffing for Frame Delimiting',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['framing', 'escape-coding', 'serial-protocols'],
    code: `FLAG = 0x7E
ESC  = 0x7D
XOR  = 0x20

def stuff(frame: bytes) -> bytes:
    out = bytearray([FLAG])
    for byte in frame:
        if byte in (FLAG, ESC):
            out.append(ESC)
            out.append(byte ^ XOR)
        else:
            out.append(byte)
    out.append(FLAG)
    return bytes(out)

def unstuff(data: bytes) -> bytes:
    out = bytearray()
    escaped = False
    for byte in data[1:-1]:   # strip FLAGS
        if byte == ESC:
            escaped = True
        elif escaped:
            out.append(byte ^ XOR)
            escaped = False
        else:
            out.append(byte)
    return bytes(out)

frame = bytes([0x01, 0x7E, 0x03, 0x7D])
print(stuff(frame).hex())
print(unstuff(stuff(frame)) == frame)  # True`,
    explanation: 'To send a data stream over a link, you mark the start and end of each message with a special "flag" byte. If the data itself contains that byte, you escape it first. The receiver strips the escapes to recover the original data exactly.',
    whyElegant: 'The trick of XOR-ing with a constant to neutralize special bytes keeps the escaped value out of the set of special values without needing a lookup table. Pure bitwise economy.',
    keyInsight: 'Escaping only what would otherwise be misread lets arbitrary data pass through channels that would normally reject it.',
    analogy: 'A quotation mark inside a quoted string: you write a backslash before it so the parser does not think the string ended.',
    sourceNote: 'Used in PPP (Point-to-Point Protocol, RFC 1662) and HDLC framing.',
  },
  {
    id: 'cobs-encoding',
    title: 'COBS: Consistent Overhead Byte Stuffing',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['framing', 'zero-elimination', 'embedded'],
    code: `def cobs_encode(data: bytes) -> bytes:
    output = bytearray()
    data = bytearray(data) + bytearray([0])  # sentinel zero at end
    code_idx = 0
    output.append(0)   # placeholder for first code byte
    code = 1

    for byte in data:
        if byte == 0:
            output[code_idx] = code
            code_idx = len(output)
            output.append(0)
            code = 1
        else:
            output.append(byte)
            code += 1
            if code == 0xFF:
                output[code_idx] = code
                code_idx = len(output)
                output.append(0)
                code = 1

    return bytes(output[:-1])  # drop trailing sentinel

data = bytes([0x11, 0x00, 0x22])
enc = cobs_encode(data)
print(enc.hex())     # 0211002201  — no 0x00 bytes in output except as frame delimiter`,
    explanation: 'COBS encodes data so that the output contains no zero bytes. Each zero in the input gets replaced by a "distance to the next zero" byte. This guarantees that a zero byte in the stream always means "end of frame" — no special escaping needed.',
    whyElegant: 'By turning zeros into distance pointers, COBS eliminates the problematic byte entirely rather than escaping around it. The overhead is exactly one byte per 254 data bytes — provably minimal.',
    keyInsight: 'Replace what you cannot transmit with navigation instructions that encode the same information.',
    analogy: 'Instead of putting a warning sign on every pothole, replace all potholes with a sign saying "smooth road for the next N meters".',
    sourceNote: 'Stuart Cheshire and Mary Baker, 1999. Used in CAN bus and serial firmware protocols.',
  },
  {
    id: 'lz78-dictionary',
    title: 'LZ78 Dictionary Building',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['dictionary', 'adaptive', 'trie'],
    code: `def lz78_encode(data: str) -> list[tuple[int, str]]:
    dictionary = {"": 0}
    tokens = []
    current = ""
    next_code = 1

    for char in data:
        candidate = current + char
        if candidate in dictionary:
            current = candidate
        else:
            tokens.append((dictionary[current], char))
            dictionary[candidate] = next_code
            next_code += 1
            current = ""

    if current:
        tokens.append((dictionary[current], ""))

    return tokens

result = lz78_encode("abababab")
print(result)
# [(0,'a'),(0,'b'),(1,'b'),(2,'a'),(3,'b'),(4,'')]`,
    explanation: 'Build a dictionary as you read. Output the index of the longest known phrase followed by the next new character. Then add that new phrase to the dictionary. The dictionary grows automatically as it finds new patterns.',
    whyElegant: 'No dictionary needs to be transmitted — both compressor and decompressor build the identical dictionary from the token stream alone. The dictionary emerges from the data itself.',
    keyInsight: 'Adaptive dictionary compression transmits only the first occurrence of each pattern; every repetition is just a number.',
    analogy: 'A new employee learning company jargon: first time they hear "OKR" they write it down; every subsequent time they just nod.',
    sourceNote: 'Lempel and Ziv, 1978. Direct ancestor of LZW and all GIF/TIFF compression.',
  },
  {
    id: 'lzw-compression',
    title: 'LZW Compression Step',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['lzw', 'dictionary', 'gif'],
    code: `def lzw_compress(data: str) -> list[int]:
    # Initialize dictionary with single characters
    dictionary = {chr(i): i for i in range(256)}
    next_code = 256
    result = []
    w = ""

    for c in data:
        wc = w + c
        if wc in dictionary:
            w = wc
        else:
            result.append(dictionary[w])
            dictionary[wc] = next_code
            next_code += 1
            w = c

    if w:
        result.append(dictionary[w])
    return result

compressed = lzw_compress("TOBEORNOTTOBEORTOBEORNOT")
print(compressed)
print(f"Original: {len('TOBEORNOTTOBEORTOBEORNOT')} chars, Compressed: {len(compressed)} codes")`,
    explanation: 'Like LZ78 but starting with all 256 single bytes already in the dictionary. As you encode, every time a new multi-character string appears, add it. The decompressor rebuilds the same dictionary from the output stream, so it needs no separate dictionary.',
    whyElegant: 'The decompressor can reconstruct the dictionary from the compressed stream alone — encoder and decoder stay perfectly synchronized without any side channel. Used in GIF images and early modems.',
    keyInsight: 'When encoder and decoder follow the same deterministic rule, the dictionary is implicit in the data stream itself.',
    analogy: 'Two people on opposite sides of a wall, each with an identical copy of the same rulebook — they stay in sync without ever comparing notes.',
    sourceNote: 'Terry Welch, 1984, refining LZ78. Used in GIF, TIFF, and the Unix `compress` command.',
  },
  {
    id: 'deflate-block-concept',
    title: 'DEFLATE Block Structure',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['deflate', 'lz77', 'huffman', 'zlib'],
    code: `import zlib, struct

def deflate_inspect(data: bytes) -> dict:
    compressed = zlib.compress(data, level=9)
    return {
        "original_bytes": len(data),
        "compressed_bytes": len(compressed),
        "ratio": f"{len(compressed)/len(data):.2%}",
        "zlib_header": compressed[:2].hex(),   # CMF + FLG
        "adler32_checksum": hex(struct.unpack('>I', compressed[-4:])[0]),
    }

sample = b"The quick brown fox jumps over the lazy dog. " * 20
info = deflate_inspect(sample)
for k, v in info.items():
    print(f"{k:25s}: {v}")

# DEFLATE = LZ77 back-references + Huffman codes for literals/lengths/distances
# Three block types: stored (no compression), fixed Huffman, dynamic Huffman`,
    explanation: 'DEFLATE is the algorithm inside ZIP and gzip. It runs LZ77 first to find back-references, then Huffman-codes the resulting symbols. A file gets split into blocks; each block can use its own Huffman table tailored to the data in that block.',
    whyElegant: 'Two complementary algorithms stack perfectly: LZ77 removes repetition, Huffman removes statistical redundancy. Each does exactly what the other cannot. Together they tackle both sources of redundancy in any file.',
    keyInsight: 'Composing LZ77 and Huffman coding attacks two independent types of redundancy in a single pass.',
    analogy: 'Packing a suitcase and vacuum-sealing it: first you remove empty space by folding tightly (LZ77), then the vacuum removes air from what remains (Huffman).',
    sourceNote: 'Phil Katz, 1993. Specified in RFC 1951. Used in zlib, gzip, ZIP, PNG.',
  },
  {
    id: 'bzip2-pipeline',
    title: 'bzip2 Compression Pipeline',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['bzip2', 'pipeline', 'transform'],
    code: `# bzip2 applies transforms in sequence — each one prepares for the next

# Stage 1: BWT — groups similar contexts, creating runs
# Stage 2: MTF — converts runs into small integers
# Stage 3: RLE — collapses runs of identical MTF indices
# Stage 4: Huffman — encodes the resulting symbol stream

# Minimal illustration of the transformation chain
def bwt_stub(s: str) -> str:
    s += '\\x00'
    return ''.join(r[-1] for r in sorted(s[i:] + s[:i] for i in range(len(s))))

def mtf_stub(s: str) -> list[int]:
    alph = sorted(set(s))
    out = []
    for c in s:
        i = alph.index(c)
        out.append(i)
        alph.insert(0, alph.pop(i))
    return out

def rle_stub(vals: list[int]) -> list:
    from itertools import groupby
    return [(v, sum(1 for _ in g)) for v, g in groupby(vals)]

text = "banana"
bwt_out = bwt_stub(text)
mtf_out = mtf_stub(bwt_out)
rle_out = rle_stub(mtf_out)
print(f"BWT: {bwt_out}")
print(f"MTF: {mtf_out}")
print(f"RLE: {rle_out}")`,
    explanation: 'bzip2 chains four transforms: BWT groups repeated contexts, MTF turns clusters into near-zero numbers, RLE collapses those runs, and Huffman codes the final symbols. Each step makes the next one more effective.',
    whyElegant: 'No single step could achieve strong compression alone. Each transform reshapes the data to expose a different kind of redundancy that the next step exploits. The pipeline idea — simple stages composing to power — is engineering beauty.',
    keyInsight: 'Composing simple transforms that each increase compressibility can outperform a single complex algorithm.',
    analogy: 'Washing, drying, folding, and stacking laundry: each step creates the right state for the next one.',
    sourceNote: 'Julian Seward, 1996. bzip2 often achieves better ratios than gzip on text at the cost of speed.',
  },
  {
    id: 'zstd-training',
    title: 'zstd Dictionary Training Concept',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['zstd', 'dictionary', 'training'],
    code: `import zstd   # pip install zstd

# Train a shared dictionary from a set of similar small documents
samples = [
    b'{"status": "ok", "user": "alice", "action": "login"}',
    b'{"status": "ok", "user": "bob",   "action": "logout"}',
    b'{"status": "error", "user": "carol","action": "login"}',
] * 50  # zstd needs many samples to learn patterns

dictionary = zstd.ZstdCompressor().train_dictionary(4096, samples)

# Compress with and without the dictionary
raw = b'{"status": "ok", "user": "dave", "action": "login"}'
ctx_no_dict = zstd.ZstdCompressor()
ctx_with_dict = zstd.ZstdCompressor(dict_data=dictionary)

size_no_dict   = len(ctx_no_dict.compress(raw))
size_with_dict = len(ctx_with_dict.compress(raw))
print(f"No dictionary:   {size_no_dict} bytes")
print(f"With dictionary: {size_with_dict} bytes")`,
    explanation: 'For many small, similar documents (like JSON API responses), standard compression has little context to work with. zstd can be trained on a corpus of examples to build a shared dictionary. New documents are then encoded relative to that dictionary, achieving high compression ratios even on tiny inputs.',
    whyElegant: 'One shared dictionary, known to both sides, turns tiny individual compressions into massive wins. It moves the cost of learning the data structure out of each individual message and into a one-time training phase.',
    keyInsight: 'Pre-shared context between compressor and decompressor lets you compress even data that is too small to compress alone.',
    analogy: 'A company creating a shared abbreviation glossary before a meeting — everyone saves time writing "LGTM" instead of "Looks good to me" throughout the day.',
    sourceNote: 'Yann Collet, Facebook, 2016. zstd is now used in Linux kernel, Facebook, and many databases.',
  },
  {
    id: 'ans-state-machine',
    title: 'ANS (Asymmetric Numeral Systems) State Machine',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['ans', 'entropy-coding', 'state-machine'],
    code: `# Simplified tANS (table-based ANS) encode/decode
# Symbol probabilities: a=1/2, b=1/4, c=1/4

SPREAD = [0, 0, 1, 0, 2, 0, 1, 0]  # symbol spread table (period 8)
SYMBOL = ['a', 'b', 'c']
FREQ   = [4, 2, 2]   # out of 8
CUMUL  = [0, 4, 6]   # cumulative

def ans_encode(symbols: list[str], L: int = 8) -> int:
    state = L  # start in range [L, 2L)
    for sym in symbols:
        idx = SYMBOL.index(sym)
        f   = FREQ[idx]
        cum = CUMUL[idx]
        # renormalize: flush bits while state >= f * 2
        while state >= f * 2:
            state >>= 1   # simplified: real ANS emits bits here
        state = (state // f) * L + cum + (state % f)
    return state

state = ans_encode(['a', 'b', 'a', 'c'])
print(f"Final state: {state}")
# Real ANS achieves Shannon entropy and is faster than arithmetic coding`,
    explanation: 'ANS encodes symbols by updating a single integer "state". Common symbols cause small state changes; rare symbols cause large ones. The state implicitly stores the entire message. Unlike arithmetic coding, it uses integer arithmetic and processes symbols in a LIFO order that maps naturally to a stack.',
    whyElegant: 'ANS achieves arithmetic coding\'s entropy efficiency with the speed of Huffman coding. The entire compressed message lives in one integer — no fractions, no interval arithmetic, just integer transformations.',
    keyInsight: 'A single integer can encode a message to Shannon entropy; each symbol transformation encodes exactly log₂(probability) bits on average.',
    analogy: 'A combination lock where each symbol you encode dials the combination further — only someone who knows the sequence can read it back.',
    sourceNote: 'Jarek Duda, 2009. Used in zstd, Zstandard, LZFSE (Apple), and AV1 video.',
  },
  {
    id: 'range-coder-interval',
    title: 'Range Coder Interval Update',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['range-coding', 'arithmetic', 'entropy'],
    code: `class RangeCoder:
    def __init__(self):
        self.low   = 0
        self.range = 0xFFFFFFFF
        self.output = bytearray()

    def encode(self, cum_freq: int, freq: int, total: int):
        self.range //= total
        self.low   += cum_freq * self.range
        self.range *= freq
        # Normalize: shift out top bytes while range is small
        while self.range < 0x1000000:
            self.output.append(self.low >> 24)
            self.low   = (self.low  & 0xFFFFFF) << 8
            self.range = (self.range & 0xFFFFFF) << 8 if self.range else 0x1000000

    def flush(self):
        for _ in range(4):
            self.output.append(self.low >> 24)
            self.low = (self.low & 0xFFFFFF) << 8
        return bytes(self.output)

rc = RangeCoder()
rc.encode(0, 1, 2)   # bit=0, prob=1/2
rc.encode(1, 1, 2)   # bit=1, prob=1/2
rc.encode(0, 3, 4)   # symbol with prob=3/4
print(rc.flush().hex())`,
    explanation: 'A range coder maintains a current range (interval) and narrows it for each symbol based on that symbol\'s probability. When the range shrinks to a certain size, it emits bytes and scales up. The output is the bytes emitted during the narrowing process.',
    whyElegant: 'Range coding achieves the same entropy bound as arithmetic coding but works entirely in integer arithmetic, making it fast and practical. The normalization step is a tight loop that emits exactly as many bytes as the information content requires.',
    keyInsight: 'Integer arithmetic can model arbitrary-precision interval subdivision using periodic normalization to reclaim scale.',
    analogy: 'Zooming in on a number line with a magnifying glass: when the interval gets too small to see clearly, slide the glass and zoom in again from the new position.',
    sourceNote: 'G.N.N. Martin, 1979. Range coders are the backbone of 7-zip and LZMA.',
  },
  {
    id: 'lzma-literal-match',
    title: 'LZMA Literal/Match Model',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['lzma', '7zip', 'match-model', 'context'],
    code: `# Simplified LZMA-style literal/match decision model
# LZMA maintains probability models per context; this shows the structure

class BitModel:
    def __init__(self):
        self.prob = 0x800   # fixed-point probability, starts at 0.5

    def update_match(self):
        self.prob += (0x1000 - self.prob) >> 5   # move toward 1

    def update_literal(self):
        self.prob -= self.prob >> 5              # move toward 0

    @property
    def probability_of_match(self) -> float:
        return self.prob / 0x1000

# Separate model for each (state, pos_bit) pair
models = [[BitModel() for _ in range(4)] for _ in range(12)]

# Encode a sequence: literal, literal, match, match, literal
sequence = ['L', 'L', 'M', 'M', 'L']
state = 0
for sym in sequence:
    m = models[state][0]
    if sym == 'M':
        m.update_match()
        state = min(state + 1, 11)
    else:
        m.update_literal()
        state = max(state - 1, 0)
    print(f"{sym} -> prob_match={m.probability_of_match:.3f} state={state}")`,
    explanation: 'LZMA tracks the recent history of literal characters vs. back-references using a small state machine. For each state, it maintains a probability model for the next decision. Models update after every symbol, so the compressor adapts to the data\'s local statistics continuously.',
    whyElegant: 'The probability models use fixed-point arithmetic with a simple update rule that takes four operations. This tiny adaptive model running inside a range coder is why 7-zip achieves better compression than gzip on most data.',
    keyInsight: 'Context-adaptive probability models cost almost nothing to update but dramatically sharpen the entropy coder\'s accuracy.',
    analogy: 'A doctor who adjusts their diagnosis probabilities each time they see a new symptom, rather than relying on fixed statistics from a textbook.',
    sourceNote: 'Igor Pavlov, 2001. Used in 7-zip, xz, and the .lzma format.',
  },
  {
    id: 'snappy-framing',
    title: 'Snappy Framing Format',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['snappy', 'framing', 'streaming', 'checksum'],
    code: `import struct, snappy   # pip install python-snappy

STREAM_ID = b'\\xff\\x06\\x00\\x00sNaPpY'
COMPRESSED_CHUNK   = 0x00
UNCOMPRESSED_CHUNK = 0x01

def snappy_framed_encode(data: bytes, chunk_size: int = 65536) -> bytes:
    out = bytearray(STREAM_ID)
    for i in range(0, len(data), chunk_size):
        chunk = data[i:i + chunk_size]
        compressed = snappy.compress(chunk)
        # Use compressed only if it is actually smaller
        if len(compressed) < len(chunk):
            checksum = snappy.UncompressedLength(chunk)  # masked CRC32
            header = struct.pack('<I', (len(compressed) + 4) | (COMPRESSED_CHUNK << 24))
            out += header + struct.pack('<I', checksum) + compressed
        else:
            header = struct.pack('<I', (len(chunk) + 4) | (UNCOMPRESSED_CHUNK << 24))
            out += header + struct.pack('<I', 0) + chunk
    return bytes(out)

data = b"Hello Snappy! " * 1000
framed = snappy_framed_encode(data)
print(f"Original: {len(data)}, Framed: {len(framed)}")`,
    explanation: 'Snappy is designed for speed over compression ratio. Its framing format splits data into chunks, optionally compresses each one, stores a checksum, and falls back to raw storage if compression would make the chunk larger. The stream can be decoded or error-checked one chunk at a time.',
    whyElegant: 'The "skip compression if it doesn\'t help" clause means Snappy never makes things worse. Many formats assume compression always wins — Snappy measures and decides. The checksum per chunk lets errors be detected without decompressing the whole stream.',
    keyInsight: 'Always test whether compression actually helps before committing to it — sometimes the overhead exceeds the savings.',
    analogy: 'A postal worker who weighs parcels and only wraps them in protective packaging if the parcel is heavy enough to justify it.',
    sourceNote: 'Google (Jyrki Alakuijala et al.), 2011. Used in Cassandra, Hadoop, and LevelDB.',
  },
  {
    id: 'brotli-static-dictionary',
    title: 'Brotli Static Dictionary Concept',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['brotli', 'static-dictionary', 'web-compression'],
    code: `import brotli   # pip install brotli

# Brotli ships with a 122 KB static dictionary of common English/HTML/JS words.
# References to dictionary entries cost only ~13 bits versus 6+ bytes literal.

# Words baked into the Brotli static dictionary (sample):
BROTLI_DICT_SAMPLE = [
    "http://", "https://", ".com", ".org", ".net",
    "Content-Type:", "text/html", "charset=utf-8",
    " the ", " and ", " of ", " is ", " that ",
    "function", "return", "var ", "const ", "let ",
]

# Compress typical web content with and without the static dictionary
html = b"""<!DOCTYPE html><html><head><meta charset="utf-8">
<title>Example</title></head><body>
<p>This is an example of text that contains common HTML and JavaScript.</p>
<script>function hello() { return "world"; }</script>
</body></html>"""

compressed = brotli.compress(html, quality=11)
print(f"HTML: {len(html)} bytes -> Brotli: {len(compressed)} bytes ({100*len(compressed)/len(html):.1f}%)")

# By contrast with raw DEFLATE for comparison
import zlib
deflated = zlib.compress(html, 9)
print(f"HTML: {len(html)} bytes -> zlib:   {len(deflated)} bytes ({100*len(deflated)/len(html):.1f}%)")`,
    explanation: 'Brotli, used for compressing web pages, includes a 122 KB dictionary of common words and phrases baked into the algorithm itself. When compressing a web page, references to those words cost only a few bits instead of spelling the word out. The dictionary was built from a massive corpus of the web.',
    whyElegant: 'Pre-loading context that is true for nearly all web content means every web page in the world gets that compression benefit for free, with no per-page cost. One-time dictionary investment, infinite amortized gain.',
    keyInsight: 'A static dictionary built from domain knowledge costs nothing at decode time but makes domain-specific compression dramatically more effective.',
    analogy: 'A profession with its own shorthand — doctors write "Hx" for history, "Rx" for prescription — everyone in the field decodes it instantly with no explanation needed.',
    sourceNote: 'Jyrki Alakuijala and Zoltan Szabadka, Google, 2013. Specified in RFC 7932. Used in all major browsers.',
  },
  {
    id: 'dictionary-coder-json-keys',
    title: 'Dictionary Coder for Repeated JSON Keys',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['dictionary', 'schema', 'JSON', 'columnar'],
    code: `import json

def dict_encode_json(records: list[dict]) -> tuple[list[str], list[list]]:
    # Extract keys as a shared schema; encode only values
    if not records:
        return [], []
    keys = list(records[0].keys())
    rows = [[row[k] for k in keys] for row in records]
    return keys, rows

def dict_decode_json(keys: list[str], rows: list[list]) -> list[dict]:
    return [dict(zip(keys, row)) for row in rows]

records = [
    {"user_id": 1, "action": "login",  "timestamp": 1700000001},
    {"user_id": 2, "action": "logout", "timestamp": 1700000042},
    {"user_id": 3, "action": "login",  "timestamp": 1700000089},
]

keys, rows = dict_encode_json(records)
print("Keys (stored once):", keys)
print("Rows:", rows)

original  = len(json.dumps(records).encode())
compact   = len(json.dumps([keys] + rows).encode())
print(f"Original: {original} bytes  Compact: {compact} bytes  Savings: {original - compact}")`,
    explanation: 'When storing thousands of JSON objects with the same keys, those key names repeat in every record. Store the keys once as a shared header, then store each record as a plain list of values. The keys are looked up by position instead of repeated every time.',
    whyElegant: 'This is a manual version of what columnar databases do automatically. The insight that structure and data are separate compressible concerns turns verbose JSON into a near-optimal format with four lines of code.',
    keyInsight: 'Schema and data are separate — store schema once, data always; key repetition in JSON is pure waste.',
    analogy: 'A spreadsheet header row: write column names once at the top, then each row contains only values.',
    sourceNote: 'Principle behind MessagePack, Avro, and Parquet columnar storage formats.',
  },
  {
    id: 'delta-timestamps',
    title: 'Delta Encoding of Timestamps',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['delta', 'timestamps', 'time-series'],
    code: `from datetime import datetime, timedelta
import struct

def encode_timestamps(ts_list: list[int]) -> bytes:
    if not ts_list:
        return b''
    out = bytearray()
    # Write first timestamp as full 8-byte value
    out += struct.pack('>Q', ts_list[0])
    prev = ts_list[0]
    for ts in ts_list[1:]:
        delta = ts - prev
        prev  = ts
        # Variable-length delta: store in 1, 2, or 4 bytes
        if delta < 128:
            out += struct.pack('B', delta)
        elif delta < 32768:
            out += struct.pack('>H', delta | 0x8000)
        else:
            out += struct.pack('>I', delta | 0xC0000000)
    return bytes(out)

base = int(datetime(2024, 1, 1).timestamp())
# Events roughly every 10 seconds
timestamps = [base + i * 10 + (i % 3) for i in range(100)]

encoded = encode_timestamps(timestamps)
raw_size = len(timestamps) * 8
print(f"Raw:     {raw_size} bytes")
print(f"Encoded: {len(encoded)} bytes ({100*len(encoded)/raw_size:.1f}%)")`,
    explanation: 'Event timestamps are often close together in time. Store the first timestamp in full, then store only the difference (delta) between consecutive timestamps. Small deltas fit in one byte; most time-series data compresses by 70–90% with this trick alone.',
    whyElegant: 'The technique stacks two insights: sorted data has small gaps, and small numbers take few bytes. Together they compress timestamps dramatically while preserving exact precision.',
    keyInsight: 'Sequential temporal data lives in the differences between events, not the absolute values.',
    analogy: 'A stopwatch that records lap times rather than the clock time at each lap — the differences are the interesting information.',
    sourceNote: 'Used in Gorilla (Facebook, 2015) and InfluxDB for time-series compression.',
  },
  {
    id: 'prefix-free-code-proof',
    title: 'Prefix-Free Code Construction',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['prefix-free', 'kraft-inequality', 'binary-tree'],
    code: `def is_prefix_free(codes: dict[str, str]) -> bool:
    code_list = sorted(codes.values())
    for i in range(len(code_list) - 1):
        if code_list[i+1].startswith(code_list[i]):
            return False
    return True

def kraft_sum(codes: dict[str, str]) -> float:
    # Kraft inequality: sum of 2^(-len) <= 1 for prefix-free codes
    return sum(2 ** -len(c) for c in codes.values())

# Valid prefix-free code
huffman_like = {'a': '0', 'b': '10', 'c': '110', 'd': '111'}
print("Prefix-free:", is_prefix_free(huffman_like))    # True
print("Kraft sum:  ", kraft_sum(huffman_like))          # 1.0 (exactly efficient)

# Invalid: 'a'=0 and 'ab'=01 violates prefix-free
broken = {'a': '0', 'b': '01', 'c': '10'}
print("Prefix-free:", is_prefix_free(broken))           # False

# A code that wastes space
wasteful = {'a': '00', 'b': '01', 'c': '10', 'd': '11'}
print("Kraft sum:  ", kraft_sum(wasteful))              # 1.0 (also fine, just longer)`,
    explanation: 'A prefix-free code has the property that no codeword is the prefix of another. This means a decoder can identify each symbol the moment it finishes reading its bits — no lookahead needed. The Kraft inequality tells you whether a set of lengths can even form a valid prefix-free code.',
    whyElegant: 'The Kraft inequality translates a structural property (no codeword prefixes another) into a simple arithmetic inequality. If the sum of 2^(−length) equals 1.0, the code is both valid and fully efficient — no bits go to waste.',
    keyInsight: 'Prefix-free codes are exactly the leaf labels of a binary tree — any valid assignment corresponds to one, and the Kraft inequality counts the leaves.',
    analogy: 'A system of roads where no street name is the beginning of another street name — you always know exactly which street you are on without waiting for more address.',
    sourceNote: 'Leon Kraft, 1949. The Kraft inequality is a central result in information theory.',
  },
  {
    id: 'shannon-entropy',
    title: 'Shannon Entropy Calculation',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['entropy', 'information-theory', 'lower-bound'],
    code: `import math
from collections import Counter

def shannon_entropy(data: bytes) -> float:
    if not data:
        return 0.0
    counts = Counter(data)
    n = len(data)
    return -sum((c/n) * math.log2(c/n) for c in counts.values())

def compressibility(data: bytes) -> str:
    h = shannon_entropy(data)
    current_bits = len(data) * 8
    minimum_bits = h * len(data)
    savings = 1 - minimum_bits / current_bits
    return f"Entropy: {h:.3f} bits/byte  Theoretical max savings: {savings:.1%}"

import os
random_data = os.urandom(1000)
english_text = b"the quick brown fox jumps over the lazy dog " * 23

print(compressibility(random_data))
print(compressibility(english_text))
# Random: ~8 bits/byte, ~0% savings (already random)
# English: ~4-5 bits/byte, ~40% savings possible`,
    explanation: 'Shannon entropy measures the average information in each symbol. A file of random bytes has entropy 8 — you cannot compress it. English text has entropy around 4 because letters are predictable. Entropy sets the absolute floor: no lossless compressor can do better.',
    whyElegant: 'One formula captures something profound about all information: how unpredictable it is. It simultaneously tells you how compressible data is and how much randomness it contains. A negative sum of probabilities times their logarithms — surprising that anything so simple is universal.',
    keyInsight: 'Entropy is both a measure of uncertainty and a lower bound on the number of bits any lossless compressor must use.',
    analogy: 'A coin flip is worth 1 bit of entropy; a loaded coin that lands heads 99% of the time is worth almost nothing — you already know the answer.',
    sourceNote: 'Claude Shannon, "A Mathematical Theory of Communication", Bell Labs, 1948.',
  },
  {
    id: 'kolmogorov-complexity',
    title: 'Kolmogorov Complexity Illustration',
    language: 'Python',
    category: 'Compression & Encoding Tricks',
    conceptTags: ['kolmogorov', 'descriptive-complexity', 'incompressibility'],
    code: `# Kolmogorov complexity K(x) = length of shortest program that outputs x.
# Uncomputable in general — but we can illustrate the concept.

def complexity_proxy(data: bytes) -> dict:
    import zlib
    # Use compressed size as an upper bound on K(data)
    compressed_len = len(zlib.compress(data, level=9))
    return {
        "raw_bytes": len(data),
        "compressed_bytes": compressed_len,
        "k_upper_bound": compressed_len,
        "is_random_like": compressed_len >= len(data) * 0.95,
    }

# Highly structured data: short description, long output
pi_digits = str(3.141592653589793238462643383279502884197).replace('.','').encode() * 10
structured = b"ab" * 500

# Structureless: the description is as long as the data
import os
random_data = os.urandom(1000)

for label, d in [("pi digits×10", pi_digits), ("'ab'×500", structured), ("random", random_data)]:
    r = complexity_proxy(d)
    print(f"{label:15s}: raw={r['raw_bytes']:5d}  compressed={r['compressed_bytes']:5d}  random-like={r['is_random_like']}")`,
    explanation: 'Kolmogorov complexity is the length of the shortest program that outputs a given string. A million zeros have tiny complexity: write "print 0 one million times." A truly random string has complexity equal to its own length — there is no shorter description. Compression ratio is an empirical proxy for Kolmogorov complexity.',
    whyElegant: 'It unifies all of mathematics, computation, and information into one definition of "how complex is this?" The concept is uncomputable but the idea it captures — that structure means short description — is foundational. Every compression algorithm is just searching for shorter descriptions.',
    keyInsight: 'Compressibility and descriptive complexity are the same thing seen from different angles.',
    analogy: 'A recipe versus a photograph of the finished dish — the recipe is short but fully describes the result; a random pixel pattern needs to show you every pixel because there is no recipe.',
    sourceNote: 'Andrey Kolmogorov (1965), Ray Solomonoff (1964), Gregory Chaitin (1966). A cornerstone of theoretical computer science.',
  },
];
