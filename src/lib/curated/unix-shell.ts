import type { CuratedExample } from '../../types';

export const unixShell: CuratedExample[] = [
  {
    id: 'grep-sort-uniq-log-analysis',
    title: 'Count and Rank Log Entries',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['pipeline', 'frequency analysis', 'log parsing'],
    code: `grep "ERROR" /var/log/app.log | sort | uniq -c | sort -rn | head -20`,
    explanation:
      'This filters a log file for error lines, groups identical lines together, counts how many times each one appears, and sorts them so the most frequent errors appear first. You see the top 20 worst offenders.',
    whyElegant:
      'Four small tools, each doing one thing, chain together to answer a question none of them could answer alone. It is like an assembly line where each worker adds one step and the finished product rolls off the end.',
    keyInsight:
      'Composing simple filters into a pipeline turns raw text into ranked intelligence without writing a single line of "real" code.',
    analogy:
      'A mail clerk who opens every envelope, sorts the letters into piles by content, counts each pile, and hands you the tallest stacks first.',
    sourceNote:
      'The canonical Unix pipeline pattern, popularized by Doug McIlroy and the original Unix team at Bell Labs.',
  },
  {
    id: 'find-xargs-wc-line-count',
    title: 'Count Lines Across a Codebase',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['find', 'xargs', 'code metrics'],
    code: `find . -name "*.py" -type f | xargs wc -l | sort -rn | head -20`,
    explanation:
      'This finds every Python file in the current directory tree, counts the number of lines in each file, sorts them from largest to smallest, and shows the top 20 longest files.',
    whyElegant:
      'find discovers, xargs bridges the gap between filenames and the tool that reads them, and wc measures. Each tool stays in its lane. It is like sending a scout ahead to find every house on a street, then handing the list to a census worker who knocks on each door.',
    keyInsight:
      'xargs is the universal adapter that converts a stream of filenames into arguments for any command.',
    analogy:
      'A librarian who walks every aisle, pulls out every book with a green spine, and stacks them by thickness so you can see which ones are the longest.',
    sourceNote:
      'Standard Unix idiom; find and xargs were both present in Version 7 Unix (1979).',
  },
  {
    id: 'awk-sort-uniq-field-extraction',
    title: 'Extract and Deduplicate a Column',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['awk', 'deduplication', 'field extraction'],
    code: `awk '{print $2}' access.log | sort | uniq`,
    explanation:
      'This pulls out the second column from every line of a file (often a URL or username in a web server log), sorts them alphabetically, and removes duplicates so you get one clean list of unique values.',
    whyElegant:
      'awk treats every line of text as a row with columns, sort puts them in order, and uniq collapses adjacent duplicates. Three words of work to answer "what distinct values appear in column two?" It is like flipping through a filing cabinet, reading only the second tab on each folder, and writing down each name you have not seen before.',
    keyInsight:
      'Treating text as a table with implicit columns lets you do database-style queries with no database.',
    analogy:
      'Reading only the second word of every sentence in a book, then crossing out the repeats to get a clean vocabulary list.',
    sourceNote:
      'awk was created by Aho, Weinberger, and Kernighan at Bell Labs in 1977.',
  },
  {
    id: 'sed-global-substitution',
    title: 'Stream-Edit a File Without Opening It',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['sed', 'stream editing', 'substitution'],
    code: `sed 's/localhost:3000/api.example.com/g' config.yaml > config.prod.yaml`,
    explanation:
      'This reads a configuration file, replaces every occurrence of "localhost:3000" with "api.example.com", and writes the result to a new file. You never open an editor.',
    whyElegant:
      'sed processes text the way water flows through a filter: line by line, changing what matches a pattern and leaving everything else untouched. One command replaces what would be a tedious find-and-replace session in a text editor. It is like a copy machine that automatically corrects every typo on every page as it copies.',
    keyInsight:
      'A stream editor treats a file as a river of lines, applying transformations on the fly without loading the whole thing into memory.',
    analogy:
      'A proofreader sitting at the end of a conveyor belt, stamping corrections on each page as it slides past without ever stopping the belt.',
    sourceNote:
      'sed was written by Lee McMahon at Bell Labs in 1973-1974, one of the earliest Unix tools.',
  },
  {
    id: 'cut-paste-table-manipulation',
    title: 'Rearrange Columns Like a Spreadsheet',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['cut', 'paste', 'column manipulation'],
    code: `cut -f1,3 data.tsv | paste - <(cut -f2 data.tsv)`,
    explanation:
      'This takes a tab-separated file, pulls out columns 1 and 3, then pastes column 2 back on the right side. The result is the same data with columns reordered from 1-2-3 to 1-3-2.',
    whyElegant:
      'cut and paste treat text files as spreadsheets. You slice out columns and glue them back together in any order, all without opening a spreadsheet application. It is like cutting a newspaper into vertical strips and rearranging them on a table.',
    keyInsight:
      'Plain text with a consistent delimiter is a universal spreadsheet that every Unix tool can read and write.',
    analogy:
      'Scissors and tape on a printed table: cut out the columns you want, rearrange them on a fresh sheet, and tape them down in the new order.',
    sourceNote:
      'cut and paste were introduced in AT&T System III Unix (1980).',
  },
  {
    id: 'comm-compare-sorted-files',
    title: 'Find What Two Lists Share and What They Don\'t',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['comm', 'set operations', 'comparison'],
    code: `comm -23 <(sort users_today.txt) <(sort users_yesterday.txt)`,
    explanation:
      'This compares two sorted lists of usernames and shows only the names that appear in today\'s list but not yesterday\'s. The -23 flags suppress the other two categories (only-in-yesterday and in-both), leaving you with brand-new users.',
    whyElegant:
      'comm performs set subtraction on text files. Two flags and two sorted inputs give you the answer to "what is new?" without writing any logic. It is like holding two guest lists side by side and circling the names that only appear on the first one.',
    keyInsight:
      'Sorted text files are sets, and comm gives you union, intersection, and difference for free.',
    analogy:
      'Two stacks of name cards on a table: you pull out every card from the left stack that has no matching card in the right stack.',
    sourceNote:
      'comm has been part of Unix since Version 4 (1973), designed for exactly this kind of list comparison.',
  },
  {
    id: 'tee-split-stream',
    title: 'Watch a Pipeline While Saving Its Output',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['tee', 'stream splitting', 'debugging'],
    code: `curl -s https://api.example.com/data | tee response.json | jq '.items | length'`,
    explanation:
      'This fetches data from an API, saves the raw response to a file, and simultaneously pipes it to jq to count the items. You get both the saved copy and the live answer.',
    whyElegant:
      'tee is a Y-splitter for data: one copy goes to a file for later, the other continues down the pipeline. You never have to choose between saving and processing. It is like a garden hose splitter that waters two beds at once.',
    keyInsight:
      'tee lets you observe or record any point in a pipeline without interrupting the flow.',
    analogy:
      'A photocopier placed in the middle of a conveyor belt: every document gets duplicated, one copy filed away and the original sent onward.',
    sourceNote:
      'Named after the T-shaped plumbing fitting; present in Unix since the early 1970s.',
  },
  {
    id: 'xargs-parallel-execution',
    title: 'Run Tasks in Parallel with One Flag',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['xargs', 'parallelism', 'batch processing'],
    code: `find . -name "*.png" | xargs -P 4 -I {} convert {} -resize 50% resized/{}`,
    explanation:
      'This finds every PNG image and resizes them all to 50%, running 4 conversions at the same time. The -P 4 flag tells xargs to keep 4 workers busy in parallel.',
    whyElegant:
      'Adding -P to xargs turns a serial operation into a parallel one with no restructuring of the pipeline. One flag multiplies your throughput. It is like opening three more checkout lanes at a grocery store by flipping a switch.',
    keyInsight:
      'Parallelism in Unix pipelines is often a single flag away, not an architectural rewrite.',
    analogy:
      'Four cashiers scanning groceries simultaneously from the same long conveyor belt, each grabbing the next item as soon as they finish.',
    sourceNote:
      'The -P flag for parallel execution was added to GNU xargs and is now standard on macOS and Linux.',
  },
  {
    id: 'tr-character-translation',
    title: 'Translate Characters in a Stream',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['tr', 'character mapping', 'text normalization'],
    code: `echo "Hello, World!" | tr '[:upper:]' '[:lower:]' | tr -d '[:punct:]'`,
    explanation:
      'This takes a string, converts all uppercase letters to lowercase, then strips out all punctuation. "Hello, World!" becomes "hello world".',
    whyElegant:
      'tr is the simplest possible text transformer: it maps one set of characters to another, one character at a time. Two calls normalize messy text into a clean, uniform stream. It is like a rubber stamp that prints every capital letter as lowercase.',
    keyInsight:
      'Character-level translation is the most atomic text operation, and composing two tr calls handles surprisingly complex normalization.',
    analogy:
      'A child replacing every uppercase magnetic letter on the fridge with its lowercase twin, then sweeping all the commas and periods into the trash.',
    sourceNote:
      'tr (transliterate) dates back to Version 4 Unix (1973).',
  },
  {
    id: 'diff-patch-round-trip',
    title: 'Capture and Replay Changes as a Patch',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['diff', 'patch', 'change management'],
    code: `diff -u original.c modified.c > changes.patch
patch original.c < changes.patch`,
    explanation:
      'The first line compares two versions of a file and writes only the differences to a patch file. The second line applies that patch to transform the original into the modified version. You can send the tiny patch file instead of the entire modified file.',
    whyElegant:
      'diff distills the essence of a change into the smallest possible representation, and patch reconstructs the full result. Sending a diff is like sending directions instead of a map: far smaller, yet just as useful if you have the starting point. This is the intellectual foundation of every version control system.',
    keyInsight:
      'Representing changes as deltas rather than snapshots is the core idea behind efficient version control.',
    analogy:
      'Writing down only the corrections a teacher made on your essay, not the whole essay. Anyone with the original can apply the corrections to get the final version.',
    sourceNote:
      'diff was written by Doug McIlroy at Bell Labs; the unified diff format (-u) became the de facto standard for patches.',
  },
  {
    id: 'netstat-grep-awk-network',
    title: 'Who Is Talking to This Machine?',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['network', 'awk', 'monitoring'],
    code: `ss -tun | awk 'NR>1 {print $5}' | cut -d: -f1 | sort | uniq -c | sort -rn | head -10`,
    explanation:
      'This lists all active network connections, extracts the remote IP address from each one, counts how many connections come from each address, and shows the top 10 talkers. It answers "who is connecting to my server the most?"',
    whyElegant:
      'A question about network traffic gets answered by the same text-processing pipeline you would use on a log file. The network state is just another stream of text. It is like asking "who calls this phone number the most?" by reading the phone bill line by line.',
    keyInsight:
      'In Unix, everything—network state, process lists, hardware info—is renderable as text, making it queryable with the same tools.',
    analogy:
      'A receptionist tallying visitors by reading the sign-in sheet, grouping by company name, and reporting which company sent the most people.',
    sourceNote:
      'ss replaced netstat on modern Linux; the pipeline pattern remains the same.',
  },
  {
    id: 'watch-live-monitoring',
    title: 'Turn Any Command into a Live Dashboard',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['watch', 'monitoring', 'real-time'],
    code: `watch -n1 'df -h | grep -v tmpfs'`,
    explanation:
      'This runs the disk usage command every second and refreshes the terminal display, filtering out temporary filesystems. You get a live dashboard showing how full your disks are without writing any monitoring software.',
    whyElegant:
      'watch wraps any command in a refresh loop, turning a one-shot query into a live display. No daemons, no configuration files, no web framework. It is like putting a security camera on a thermometer: you see the temperature update in real time.',
    keyInsight:
      'Any command that produces useful output once can become a live monitor by wrapping it with watch.',
    analogy:
      'A flipbook where someone redraws the same chart every second, so you see the numbers change as if watching a live scoreboard.',
    sourceNote:
      'watch originated in the procps package on Linux and is widely available on Unix systems.',
  },
  {
    id: 'column-pretty-print',
    title: 'Align Messy Text into Clean Columns',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['column', 'formatting', 'readability'],
    code: `mount | column -t`,
    explanation:
      'This takes the output of the mount command, which lists filesystems in uneven spacing, and aligns it into a neatly formatted table with consistent column widths. Instantly readable.',
    whyElegant:
      'column -t auto-detects whitespace boundaries and pads them into aligned columns. One pipe and two characters transform messy output into something you would put in a report. It is like straightening a crooked picture frame: same content, dramatically more readable.',
    keyInsight:
      'Readability is a one-pipe transformation away when your data is already whitespace-delimited.',
    analogy:
      'A ruler and pencil that draw invisible vertical lines through a handwritten table, nudging every entry into a neat grid.',
    sourceNote:
      'column is part of the util-linux package, available on virtually all Linux and macOS systems.',
  },
  {
    id: 'rsync-dry-run-preview',
    title: 'Preview a File Sync Before Committing',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['rsync', 'dry run', 'safety pattern'],
    code: `rsync -avhn --delete /src/project/ /backup/project/`,
    explanation:
      'This shows exactly what rsync would copy, update, or delete during a backup, without actually changing anything. The -n flag means "dry run." You review the plan, and only then remove -n to execute it for real.',
    whyElegant:
      'The dry-run pattern separates planning from execution. You get a preview of every consequence before committing, which is the safest possible approach to destructive operations. It is like a pilot walking through the preflight checklist before touching the throttle.',
    keyInsight:
      'The best safety feature is a preview mode that lets you see every consequence before it happens.',
    analogy:
      'A moving company that first walks through your house labeling every box they would pack, so you can approve the plan before they start loading the truck.',
    sourceNote:
      'rsync was created by Andrew Tridgell and Paul Mackerras in 1996; --dry-run has been a core feature since the beginning.',
  },
  {
    id: 'process-substitution',
    title: 'Use a Command\'s Output as if It Were a File',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['process substitution', 'bash', 'virtual files'],
    code: `diff <(curl -s https://api.example.com/v1/data) <(curl -s https://api.example.com/v2/data)`,
    explanation:
      'This fetches data from two different API endpoints and compares them directly, without saving either response to a file first. The <() syntax creates a temporary virtual file from each command\'s output.',
    whyElegant:
      'Process substitution erases the boundary between files and command output. Any tool that reads a file can now read the output of a command, which means you never need temporary files for comparisons. It is like being able to compare two phone conversations by holding both handsets to the same ear.',
    keyInsight:
      'Process substitution makes command output indistinguishable from file content, eliminating temporary files entirely.',
    analogy:
      'Holding two phones up to the same pair of ears so you can compare what two people are saying without writing either conversation down.',
    sourceNote:
      'Process substitution was introduced in Bash and ksh88 in the late 1980s, inspired by the /dev/fd mechanism in Plan 9.',
  },
  {
    id: 'heredoc-inline-file',
    title: 'Embed a File Inside a Script',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['heredoc', 'inline data', 'portability'],
    code: `cat <<'EOF' > /etc/nginx/sites-available/myapp
server {
    listen 80;
    server_name myapp.example.com;
    location / {
        proxy_pass http://localhost:3000;
    }
}
EOF`,
    explanation:
      'This creates an entire Nginx configuration file from within a shell script, without needing a separate template file. Everything between <<\'EOF\' and EOF is written verbatim to the target path.',
    whyElegant:
      'A heredoc lets a script carry its own data payload. No external files to lose or get out of sync. The script is self-contained, like a letter that includes its own envelope and stamp. Quoting the delimiter (\'EOF\') prevents variable expansion, so the content is truly literal.',
    keyInsight:
      'Heredocs make scripts self-contained by embedding multi-line data inline, eliminating external file dependencies.',
    analogy:
      'A recipe card that includes a pre-printed grocery list on the back, so you never have to look anything up separately.',
    sourceNote:
      'Heredocs (here documents) date back to the original Bourne shell in Version 7 Unix (1979).',
  },
  {
    id: 'yes-head-trick',
    title: 'Generate Repeated Input Instantly',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['yes', 'head', 'generators'],
    code: `yes "DROP TABLE students;" | head -n 5`,
    explanation:
      'yes produces an infinite stream of the given string, one per line. head cuts it off after 5 lines. The result is five identical lines. It is a quick way to generate repeated input for testing or to auto-confirm interactive prompts.',
    whyElegant:
      'yes is an infinite generator and head is a finite limiter. Together they produce exactly the amount of repetition you need. It is the simplest possible example of lazy evaluation: yes never generates more than head consumes. Like a faucet and a measuring cup—the faucet runs forever, the cup takes only what it needs.',
    keyInsight:
      'An infinite producer paired with a finite consumer is a powerful pattern that avoids both waste and premature termination.',
    analogy:
      'A cookie factory that runs forever, paired with a kid who takes exactly five cookies from the conveyor belt and walks away.',
    sourceNote:
      'yes was written by Ken Thompson; it is one of the simplest Unix programs ever created.',
  },
  {
    id: 'seq-xargs-loop-replacement',
    title: 'Replace a Loop with a Pipeline',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['seq', 'xargs', 'loop-free', 'batch'],
    code: `seq 1 100 | xargs -I {} curl -s "https://api.example.com/page/{}" -o "page_{}.json"`,
    explanation:
      'This generates the numbers 1 through 100, then for each number, downloads a page from an API and saves it to a numbered file. No for-loop syntax needed—the pipeline is the loop.',
    whyElegant:
      'seq generates data, xargs consumes it and dispatches work. The pipeline replaces a for-loop with a data flow, which is both easier to read and easier to parallelize (add -P 8 for 8 workers). It is like numbering 100 order slips and handing them to a team of runners instead of sending one runner back and forth 100 times.',
    keyInsight:
      'Pipelines replace imperative loops with declarative data flow, making parallelism a trivial addition.',
    analogy:
      'A ticket dispenser at a deli counter: each number gets called, and the next available worker handles it.',
    sourceNote:
      'seq originated in Plan 9 from Bell Labs and was adopted by GNU coreutils.',
  },
  {
    id: 'printf-portable-formatting',
    title: 'Format Output Portably Across Systems',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['printf', 'formatting', 'portability'],
    code: `printf "%-20s %10s %8s\\n" "Name" "Size" "Status"
printf "%-20s %10d %8s\\n" "deployment.yaml" 4096 "OK"
printf "%-20s %10d %8s\\n" "secrets.env" 128 "MISSING"`,
    explanation:
      'This prints a formatted table with left-aligned names, right-aligned sizes, and right-aligned status fields. printf gives you exact control over column widths and alignment, producing the same output on every system.',
    whyElegant:
      'printf is a formatting Swiss Army knife inherited from C. Unlike echo, it behaves identically across Bash, dash, zsh, and any POSIX shell. Precision and portability in one command. It is like a typewriter with adjustable tab stops that works in every office.',
    keyInsight:
      'printf gives you pixel-level control over text layout with guaranteed portability across all POSIX shells.',
    analogy:
      'A typewriter with adjustable tab stops: you set the margins once, and every line comes out perfectly aligned no matter who types it.',
    sourceNote:
      'printf is specified by POSIX and present in every standards-compliant shell.',
  },
  {
    id: 'brace-expansion-loop-shorthand',
    title: 'Create Multiple Files in One Breath',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['brace expansion', 'shorthand', 'DRY'],
    code: `mkdir -p project/{src,tests,docs}/{v1,v2}`,
    explanation:
      'This creates six directories in one command: project/src/v1, project/src/v2, project/tests/v1, project/tests/v2, project/docs/v1, and project/docs/v2. Brace expansion generates all combinations before the command runs.',
    whyElegant:
      'Brace expansion is a Cartesian product operator disguised as punctuation. The shell expands {a,b} x {c,d} into every combination, so one short expression replaces six separate mkdir calls. It is like ordering "one of everything in sizes S, M, L" instead of listing each item three times.',
    keyInsight:
      'Brace expansion lets the shell compute the Cartesian product of your inputs, turning combinatorial tasks into one-liners.',
    analogy:
      'Ordering a pizza with "any topping from column A and any size from column B"—the kitchen makes every combination without you listing each one.',
    sourceNote:
      'Brace expansion was introduced in csh and adopted by Bash; it is a shell feature, not a POSIX standard.',
  },
  {
    id: 'find-exec-vs-xargs',
    title: 'Two Ways to Act on Found Files',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['find', 'xargs', 'exec', 'tradeoffs'],
    code: `# -exec: one process per file, handles odd filenames safely
find . -name "*.log" -exec gzip {} \\;

# xargs: batches files into fewer processes, faster for many files
find . -name "*.log" -print0 | xargs -0 gzip`,
    explanation:
      'Both compress every .log file, but -exec spawns gzip once per file, while xargs batches many files into a single gzip call. The xargs version is faster when there are thousands of files; the -exec version is simpler and safe by default.',
    whyElegant:
      'This pair illustrates a fundamental tradeoff: simplicity versus throughput. -exec is the safe default; xargs with -print0/-0 is the performance upgrade. Understanding when to use each is a mark of Unix fluency. It is like mailing letters one at a time versus stuffing them into bundles for the postal truck.',
    keyInsight:
      'find -exec prioritizes correctness and simplicity; xargs prioritizes throughput by batching.',
    analogy:
      'Handing packages to a delivery driver one at a time versus loading them all onto a single truck. The truck is faster, but you need to make sure nothing falls off.',
    sourceNote:
      'Both patterns are standard Unix practice; -print0 and -0 were added to handle filenames with spaces and special characters.',
  },
  {
    id: 'awk-field-arithmetic',
    title: 'Do Column Math Without a Spreadsheet',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['awk', 'arithmetic', 'data processing'],
    code: `awk '{ total += $3 } END { printf "Total: %.2f\\nAverage: %.2f\\n", total, total/NR }' sales.csv`,
    explanation:
      'This reads a file line by line, adds up the values in the third column, and at the end prints the total and the average. It turns a plain text file into a quick financial summary.',
    whyElegant:
      'awk is a complete data-processing language that fits in a one-liner. The { } block runs on every line, the END block runs once at the finish. No imports, no boilerplate. It is like a calculator that reads a receipt line by line and announces the total at the bottom.',
    keyInsight:
      'awk gives you per-line processing and end-of-file summaries in a single expression, replacing scripts that would take dozens of lines in other languages.',
    analogy:
      'A cashier who scans every item, keeps a running total in their head, and announces the sum and average price when the last item beeps.',
    sourceNote:
      'awk was created by Aho, Weinberger, and Kernighan in 1977; its per-line-plus-summary pattern remains unmatched for brevity.',
  },
  {
    id: 'sed-selective-printing',
    title: 'Print Only the Lines You Care About',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['sed', 'selective printing', 'range extraction'],
    code: `sed -n '/BEGIN_CONFIG/,/END_CONFIG/p' app.conf`,
    explanation:
      'This prints only the lines between BEGIN_CONFIG and END_CONFIG markers in a configuration file, suppressing everything else. The -n flag turns off automatic printing, and p prints only what matches the range.',
    whyElegant:
      'sed ranges let you extract a section of a file by its content markers, not its line numbers. If the file changes length, the extraction still works. It is like telling someone "read me everything between the chapter title and the next blank page" rather than "read lines 47 through 63."',
    keyInsight:
      'Content-addressed ranges are more resilient than line-number ranges because they survive edits to the surrounding text.',
    analogy:
      'Asking a friend to photograph only the pages between two bookmarks, regardless of which page numbers those bookmarks happen to fall on.',
    sourceNote:
      'sed range addressing with regular expressions has been a feature since the original Bell Labs implementation.',
  },
  {
    id: 'grep-extract-matched-part',
    title: 'Pull Out Just the Matching Fragment',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['grep', 'regex', 'extraction'],
    code: `grep -oE '[0-9]+\\.[0-9]+\\.[0-9]+\\.[0-9]+' /var/log/auth.log | sort | uniq -c | sort -rn`,
    explanation:
      'This scans an authentication log and extracts only the IP addresses (not the full lines), counts how often each one appears, and ranks them. You get a clean frequency table of IP addresses with no surrounding noise.',
    whyElegant:
      'grep -o flips grep from a line filter into a data extractor. Instead of showing lines that contain a match, it shows only the match itself. Combined with the standard sort | uniq -c pipeline, it becomes a frequency analyzer for any pattern. It is like a metal detector that digs up only the coins, not the surrounding dirt.',
    keyInsight:
      'grep -o transforms grep from a line selector into a pattern extractor, enabling precise data mining from unstructured text.',
    analogy:
      'A metal detector that pulls only coins out of the sand, ignoring everything else, then sorts them into piles by denomination.',
    sourceNote:
      'The -o flag (output only matching) is a GNU grep extension that has become standard across platforms.',
  },
  {
    id: 'sort-multi-key',
    title: 'Sort by Multiple Columns at Once',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['sort', 'multi-key', 'data ordering'],
    code: `sort -t',' -k2,2 -k3,3rn data.csv`,
    explanation:
      'This sorts a CSV file first by the second column alphabetically, then by the third column numerically in reverse. Records with the same value in column 2 are sub-sorted by column 3, largest first. It is like sorting a class roster by last name, then by grade within each last name.',
    whyElegant:
      'sort -k lets you define a cascade of sort keys, just like ORDER BY in SQL but without a database. Each -k specifies a column and a direction. It is like telling a librarian "sort by author, and if two books have the same author, put the newest one first."',
    keyInsight:
      'Multi-key sorting brings SQL-style ORDER BY semantics to plain text files without any database infrastructure.',
    analogy:
      'A librarian who first groups books by author, then within each author arranges them from newest to oldest.',
    sourceNote:
      'POSIX sort supports multi-key sorting; the -k flag replaced the older +pos -pos syntax.',
  },
  {
    id: 'join-relational-merge',
    title: 'Join Two Files Like Database Tables',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['join', 'relational', 'data merge'],
    code: `join -t',' <(sort -t',' -k1,1 employees.csv) <(sort -t',' -k1,1 salaries.csv)`,
    explanation:
      'This merges two CSV files on their first column (employee ID), combining each employee\'s name with their salary in a single output line. It works exactly like a SQL JOIN, but on flat text files.',
    whyElegant:
      'join is a relational algebra operator hiding in coreutils. It performs an equi-join on sorted text files, bridging the gap between flat files and databases. No SQL server required. It is like matching two halves of torn tickets: line up the serial numbers, and you reunite the pieces.',
    keyInsight:
      'The Unix join command brings relational database semantics to plain text files, proving that sorted flat files are a viable data model.',
    analogy:
      'A matchmaker with two stacks of half-tickets, pairing them by serial number and stapling the matched halves together.',
    sourceNote:
      'join was part of Version 7 Unix (1979), reflecting the influence of relational database theory on Unix design.',
  },
  {
    id: 'paste-column-binding',
    title: 'Stitch Files Together Side by Side',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['paste', 'column binding', 'parallel streams'],
    code: `paste -d',' names.txt ages.txt cities.txt`,
    explanation:
      'This reads three files in parallel and combines them side by side, using a comma as the delimiter. Line 1 of names, line 1 of ages, and line 1 of cities become a single comma-separated line. It turns parallel lists into a table.',
    whyElegant:
      'paste is the inverse of cut. Where cut splits columns apart, paste glues them together. It reads multiple files in lockstep, which is surprisingly hard to do in most programming languages without explicit index management. It is like zipping three columns of a spreadsheet together by dragging them next to each other.',
    keyInsight:
      'paste performs a lockstep zip across multiple files, turning parallel lists into a single table in one command.',
    analogy:
      'Three people reading aloud from different lists simultaneously, while a secretary writes down one entry from each person on the same line.',
    sourceNote:
      'paste has been part of Unix since AT&T System III (1980).',
  },
  {
    id: 'split-cat-chunking',
    title: 'Break a File into Chunks and Reassemble',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['split', 'cat', 'chunking', 'transfer'],
    code: `split -b 10M large_backup.tar.gz chunk_
# transfer chunks...
cat chunk_* > reassembled_backup.tar.gz`,
    explanation:
      'This splits a large file into 10-megabyte pieces named chunk_aa, chunk_ab, and so on. After transferring the pieces (over email, USB drives, whatever), cat reassembles them into the original file. The split-and-reassemble round trip is lossless.',
    whyElegant:
      'split and cat are perfect inverses: split breaks a file into ordered pieces, and cat concatenates them back. The naming convention (aa, ab, ac...) ensures correct ordering even after shuffling. It is like tearing a map into numbered squares, mailing each one separately, and taping them back together on the other end.',
    keyInsight:
      'Splitting and concatenation are inverse operations that enable transfer of large data through size-limited channels.',
    analogy:
      'Cutting a large poster into strips, rolling each strip into a mailing tube, and reassembling the poster on the other end by matching the edges.',
    sourceNote:
      'split and cat are among the original Unix utilities, designed for an era when storage media had severe size limits.',
  },
  {
    id: 'dd-block-copy',
    title: 'Copy Data at the Block Level',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['dd', 'block copy', 'low-level I/O'],
    code: `dd if=/dev/sda of=disk.img bs=4M status=progress`,
    explanation:
      'This creates a byte-for-byte copy of an entire disk, reading 4 megabytes at a time and showing progress as it works. The result is an exact image of every block on the disk, including empty space, deleted files, and the boot sector.',
    whyElegant:
      'dd treats storage as raw blocks of bytes, ignoring all file-system abstractions. It copies at a level below files and directories, which means it can clone an entire operating system. It is like photocopying every page of a book, including the blank pages and the inside covers, so the copy is indistinguishable from the original.',
    keyInsight:
      'dd operates below the filesystem layer, treating storage as a stream of raw bytes, which enables exact cloning of entire disks.',
    analogy:
      'A photocopier that copies every page of a book, including the blank pages, the copyright page, and even the smudge on page 47.',
    sourceNote:
      'dd has been in Unix since Version 5 (1974); its unusual syntax (if=, of=, bs=) comes from IBM JCL.',
  },
  {
    id: 'strace-grep-syscall-inspection',
    title: 'Watch What a Program Asks the Kernel',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['strace', 'debugging', 'syscalls'],
    code: `strace -e trace=open,read,write -f python3 script.py 2>&1 | grep -i "error\\|denied\\|no such"`,
    explanation:
      'This runs a Python script while recording every file operation it makes (open, read, write), then filters the output for errors. You can see exactly which file the program tried to open and failed, often revealing permission problems or missing files instantly.',
    whyElegant:
      'strace makes the invisible visible. Every program communicates with the operating system through system calls, and strace lets you eavesdrop on that conversation. Piping it through grep is like putting a wiretap on a phone line and listening only for keywords. It turns mysterious "file not found" errors into specific, actionable answers.',
    keyInsight:
      'System call tracing exposes the exact conversation between a program and the kernel, making invisible failures visible.',
    analogy:
      'Listening in on a phone call between a chef and a warehouse, hearing exactly which ingredient the warehouse said was out of stock.',
    sourceNote:
      'strace was written by Paul Kranenburg for SunOS; the Linux version was rewritten by Branko Lankester and maintained by Wichert Akkerman and Dmitry Levin.',
  },
  {
    id: 'lsof-grep-open-files',
    title: 'Find Out Who Is Holding a File Open',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['lsof', 'debugging', 'file handles'],
    code: `lsof +D /var/log/ | grep -E "deleted|COMMAND" | head -20`,
    explanation:
      'This lists every process that has any file open inside /var/log/, then filters for deleted files that are still held open (a common cause of disk space not being freed) and the header line. You find out which process is hogging space.',
    whyElegant:
      'lsof turns the abstract concept of "open file handles" into a concrete, queryable list. In Unix, "everything is a file," so lsof can reveal network connections, pipes, and devices, not just files on disk. It is like an X-ray machine for the operating system, showing you what every process is clutching behind the scenes.',
    keyInsight:
      'Since everything in Unix is a file, listing open files reveals network connections, pipes, and device usage, not just disk I/O.',
    analogy:
      'An X-ray of a child\'s hands showing exactly which toys they are holding, even the ones hidden behind their back.',
    sourceNote:
      'lsof (List Open Files) was written by Vic Abell and has been a standard Unix debugging tool since the early 1990s.',
  },
  {
    id: 'netcat-pipe-over-network',
    title: 'Send Data Through a Network Pipe',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['netcat', 'networking', 'pipes'],
    code: `# On the receiving machine:
nc -l 9999 > received_file.tar.gz

# On the sending machine:
cat backup.tar.gz | nc receiver.local 9999`,
    explanation:
      'netcat (nc) creates a raw network connection. The receiving machine listens on port 9999 and saves whatever arrives. The sending machine streams a file to that port. It is the simplest possible file transfer: no protocol, no authentication, just a pipe over the network.',
    whyElegant:
      'netcat extends the Unix pipe metaphor across machines. If a pipe connects two programs on one computer, netcat connects two computers as if they were programs in the same pipeline. It is like running a garden hose between two houses. Crude, direct, and it works.',
    keyInsight:
      'netcat extends the Unix pipe across the network, proving that the pipeline metaphor scales beyond a single machine.',
    analogy:
      'Running a garden hose from one house to another and turning on the faucet—water flows from point A to point B with nothing in between.',
    sourceNote:
      'netcat was originally written by *Hobbit* in 1995 and has been called "the TCP/IP Swiss Army knife."',
  },
  {
    id: 'curl-jq-json-pipeline',
    title: 'Query an API and Reshape the JSON',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['curl', 'jq', 'JSON', 'API'],
    code: `curl -s "https://api.github.com/repos/torvalds/linux/commits?per_page=5" \\
  | jq '.[] | {sha: .sha[0:7], author: .commit.author.name, message: .commit.message | split("\\n")[0]}'`,
    explanation:
      'This fetches the five most recent Linux kernel commits from GitHub, then uses jq to extract just the short SHA, author name, and first line of the commit message from each one. The raw JSON response becomes a clean, readable summary.',
    whyElegant:
      'curl fetches and jq transforms, extending the Unix pipeline philosophy to structured data. What would be a multi-file Python script becomes a single pipeline. It is like ordering a meal and having the waiter remove the bones and garnish before it reaches your table.',
    keyInsight:
      'curl and jq extend the Unix pipeline to structured data, making APIs as accessible as local text files.',
    analogy:
      'A waiter who fetches your meal from the kitchen and fillets the fish at your table, presenting only the parts you want to eat.',
    sourceNote:
      'jq was created by Stephen Dolan in 2012, filling the gap for a command-line JSON processor in the Unix tradition.',
  },
  {
    id: 'jq-recursive-descent',
    title: 'Search Every Level of Nested JSON',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['jq', 'recursive descent', 'nested data'],
    code: `cat deeply_nested.json | jq '.. | .email? // empty'`,
    explanation:
      'This walks through every level of a deeply nested JSON structure and extracts every field named "email," no matter how deep it is buried. The .. operator means "descend into everything recursively." You get a flat list of every email address in the document.',
    whyElegant:
      'The .. operator is recursive descent in two characters. It searches every nesting level without you specifying the path, which means it works on JSON you have never seen before. It is like telling a dog "find every tennis ball in the house" without specifying which rooms to search.',
    keyInsight:
      'Recursive descent lets you query nested structures by name alone, without knowing or specifying the path to the data.',
    analogy:
      'A dog that searches every room, closet, and drawer in a house for tennis balls without being told where to look.',
    sourceNote:
      'jq\'s recursive descent operator (..) is inspired by the XPath // operator for XML document traversal.',
  },
  {
    id: 'perl-pe-sed-alternative',
    title: 'When sed Isn\'t Powerful Enough',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['perl', 'regex', 'stream editing'],
    code: `perl -pe 's/price:\\s*(\\d+)/sprintf("price: %d", $1 * 1.1)/ge' catalog.txt`,
    explanation:
      'This finds every price in a catalog file and increases it by 10%. Unlike sed, perl can execute arbitrary code in the replacement, so the matched number gets multiplied by 1.1 and formatted back as an integer.',
    whyElegant:
      'perl -pe drops you into a stream editor with the full power of a programming language. The /e flag evaluates the replacement as code, bridging the gap between pattern matching and computation. sed can replace text; perl can replace text with the result of a calculation. It is like upgrading from a search-and-replace tool to a search-and-compute tool.',
    keyInsight:
      'perl -pe bridges the gap between sed\'s pattern matching and a full programming language, enabling computed replacements.',
    analogy:
      'A cashier who does not just cross out the old price and write a new one, but pulls out a calculator, does the math, and writes the correct new price.',
    sourceNote:
      'Perl was created by Larry Wall in 1987, partly as a more powerful replacement for awk and sed.',
  },
  {
    id: 'python3-c-pipeline-step',
    title: 'Drop Into Python for One Pipeline Step',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['python', 'inline', 'pipeline integration'],
    code: `cat timestamps.txt | python3 -c "
import sys
from datetime import datetime
for line in sys.stdin:
    ts = float(line.strip())
    print(datetime.fromtimestamp(ts).isoformat())
" | sort`,
    explanation:
      'This reads a list of Unix timestamps, converts each one to a human-readable date using Python, and sorts the results. Python joins the pipeline as a single processing step, handling the conversion that shell tools cannot do easily.',
    whyElegant:
      'python3 -c lets you inject a full programming language into the middle of a pipeline without writing a separate script file. The pipeline does not care what language each step uses, only that it reads stdin and writes stdout. It is like calling in a specialist for one tricky step on an assembly line.',
    keyInsight:
      'Any language that reads stdin and writes stdout can participate in a Unix pipeline, and python3 -c makes Python a one-liner participant.',
    analogy:
      'An assembly line where one station is staffed by a specialist with advanced tools, handling the one step that the regular workers cannot, then passing the product onward.',
    sourceNote:
      'Python\'s -c flag has been available since Python 1.0; using it in pipelines is a common Unix practice.',
  },
  {
    id: 'bc-floating-point-shell',
    title: 'Do Real Math in a Shell Script',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['bc', 'floating point', 'arithmetic'],
    code: `echo "scale=4; 355/113" | bc`,
    explanation:
      'Bash cannot do decimal math natively. This sends a division problem to bc (a calculator program), which returns 3.1415—an approximation of pi. The scale=4 sets the number of decimal places.',
    whyElegant:
      'bc fills the exact gap that shell arithmetic leaves: floating-point math. Rather than rewriting your script in Python for one division, you pipe a math expression to bc and get the answer. It is like keeping a calculator in your desk drawer for the one time a month you need long division.',
    keyInsight:
      'bc compensates for the shell\'s integer-only arithmetic, providing arbitrary-precision math via a simple pipe.',
    analogy:
      'A pocket calculator you keep in a kitchen drawer for the one recipe that needs precise unit conversions.',
    sourceNote:
      'bc (basic calculator) was written by Lorinda Cherry and Robert Morris at Bell Labs in 1975.',
  },
  {
    id: 'date-arithmetic',
    title: 'Calculate Dates Without a Calendar',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['date', 'arithmetic', 'time'],
    code: `date -d "2024-03-15 + 90 days" +"%Y-%m-%d"
# or on macOS:
date -j -v+90d -f "%Y-%m-%d" "2024-03-15" +"%Y-%m-%d"`,
    explanation:
      'This takes a starting date and adds 90 days to it, outputting the result in year-month-day format. It handles month boundaries, leap years, and everything else automatically. You get a future date without counting on a calendar.',
    whyElegant:
      'Date math is notoriously tricky (leap years, varying month lengths, daylight saving). The date command handles all of this in a single invocation. It is like having a friend who instantly knows what day it will be 90 days from now without looking at a calendar.',
    keyInsight:
      'The date command absorbs all calendar complexity—leap years, month lengths, time zones—so your script never has to.',
    analogy:
      'A friend who can instantly answer "what date is 90 days from March 15th?" without counting on their fingers or checking a calendar.',
    sourceNote:
      'GNU date\'s -d flag for date arithmetic is a widely used extension; macOS uses a different syntax via -v.',
  },
  {
    id: 'crontab-time-pipe',
    title: 'Schedule a Pipeline to Run on Its Own',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['cron', 'scheduling', 'automation'],
    code: `# Run a log analysis pipeline every day at 2 AM
# crontab -e, then add:
0 2 * * * grep "ERROR" /var/log/app.log | sort | uniq -c | sort -rn | mail -s "Daily Error Report" ops@example.com`,
    explanation:
      'This crontab entry runs a log analysis pipeline at 2 AM every day and emails the results. The five time fields mean "minute 0, hour 2, any day, any month, any weekday." Your pipeline becomes an automated daily report with no daemon, no application server, and no framework.',
    whyElegant:
      'cron turns any pipeline into a scheduled job with a single line of configuration. The Unix philosophy of composable tools extends to time itself: you compose what to do (the pipeline) with when to do it (the cron schedule). It is like setting an alarm clock that runs an entire factory shift when it goes off.',
    keyInsight:
      'cron adds a time dimension to pipelines, turning any one-shot command into an automated recurring job.',
    analogy:
      'An alarm clock wired to a Rube Goldberg machine: when the alarm rings, the whole chain of events executes without anyone being awake.',
    sourceNote:
      'cron was written by Ken Thompson for Version 7 Unix (1979); the modern Vixie cron (by Paul Vixie, 1987) is the most widely used implementation.',
  },
  {
    id: 'trap-cleanup-on-exit',
    title: 'Always Clean Up, No Matter What',
    language: 'Bash',
    category: 'Unix Shell & Pipeline Philosophy',
    conceptTags: ['trap', 'cleanup', 'signal handling', 'robustness'],
    code: `#!/bin/bash
TMPDIR=\$(mktemp -d)
trap 'rm -rf "\$TMPDIR"' EXIT

# Do work in the temp directory...
cp important_data.csv "\$TMPDIR/"
cd "\$TMPDIR"
sort -t',' -k2 important_data.csv > sorted.csv
# If anything fails or the script is interrupted,
# the trap fires and the temp directory is deleted.`,
    explanation:
      'This creates a temporary directory, then sets a trap so that when the script exits—for any reason, including errors or Ctrl+C—the temporary directory is automatically deleted. You never leave junk files behind.',
    whyElegant:
      'trap EXIT is a guarantee. No matter how the script ends—success, failure, or interruption—the cleanup code runs. It separates the "what to clean up" decision from the "when to clean up" decision, because the answer to "when" is always "at the end." It is like a self-destructing message that erases itself after reading, regardless of what happens.',
    keyInsight:
      'trap EXIT decouples cleanup logic from control flow, guaranteeing resource release regardless of how the script terminates.',
    analogy:
      'A hotel room with a checkout sensor on the door: no matter how you leave—walking out, getting carried out, or sneaking out the window—the room automatically tidies itself.',
    sourceNote:
      'The trap builtin has been part of the Bourne shell since Version 7 Unix (1979); EXIT traps are specified by POSIX.',
  },
];
