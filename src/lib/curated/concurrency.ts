import type { CuratedExample } from '../../types';

export const concurrency: CuratedExample[] = [
  {
    id: 'go-channels-producer-consumer',
    title: 'The Assembly Line',
    language: 'Go',
    category: 'Concurrency Made Simple',
    conceptTags: ['channels', 'goroutines', 'producer-consumer'],
    code: `package main

import "fmt"

func producer(ch chan<- int) {
    for i := 0; i < 5; i++ {
        ch <- i
    }
    close(ch)
}

func consumer(ch <-chan int) {
    for val := range ch {
        fmt.Println("received:", val)
    }
}

func main() {
    ch := make(chan int)
    go producer(ch)
    consumer(ch)
}`,
    explanation:
      'One worker puts items onto a conveyor belt (the channel) while another worker picks them off. The channel is the belt connecting them — neither worker needs to know anything about the other.',
    whyElegant:
      'The channel replaces all the usual locking and signaling machinery with a single, obvious metaphor: a pipe. It is as intuitive as sliding a note under a door.',
    keyInsight:
      'Sharing memory by communicating is safer than communicating by sharing memory.',
    analogy:
      'A sushi conveyor belt where the chef places plates and diners grab them, never bumping into each other.',
    sourceNote: 'Idiomatic Go concurrency pattern from the Go specification.',
  },
  {
    id: 'go-select-timeout',
    title: 'The Patient Listener',
    language: 'Go',
    category: 'Concurrency Made Simple',
    conceptTags: ['select', 'timeout', 'channels'],
    code: `package main

import (
    "fmt"
    "time"
)

func main() {
    ch := make(chan string)

    go func() {
        time.Sleep(2 * time.Second)
        ch <- "result"
    }()

    select {
    case msg := <-ch:
        fmt.Println("got:", msg)
    case <-time.After(1 * time.Second):
        fmt.Println("timed out")
    }
}`,
    explanation:
      'The program waits for a response but sets a deadline. Whichever happens first — the response arriving or the clock running out — wins. The other is ignored.',
    whyElegant:
      'select reads like a menu of possibilities, each on its own line. The timeout is not a special API; it is just another channel, treated the same as any message.',
    keyInsight:
      'Timeouts become ordinary events when time itself is just another channel.',
    analogy:
      'Waiting for a friend at a cafe: if they do not show up in ten minutes, you leave.',
    sourceNote: 'Standard Go concurrency idiom using select and time.After.',
  },
  {
    id: 'erlang-receive-pattern-match',
    title: 'The Mailroom Sorter',
    language: 'Erlang',
    category: 'Concurrency Made Simple',
    conceptTags: ['pattern-matching', 'message-passing', 'actor'],
    code: `-module(sorter).
-export([start/0, loop/0]).

start() ->
    Pid = spawn(?MODULE, loop, []),
    Pid ! {greet, "Alice"},
    Pid ! {farewell, "Bob"},
    Pid ! stop.

loop() ->
    receive
        {greet, Name} ->
            io:format("Hello, ~s!~n", [Name]),
            loop();
        {farewell, Name} ->
            io:format("Goodbye, ~s!~n", [Name]),
            loop();
        stop ->
            io:format("Shutting down.~n")
    end.`,
    explanation:
      'A process sits in a loop waiting for messages. When one arrives, it checks the shape of the message — is it a greeting, a farewell, or a stop signal? — and reacts accordingly.',
    whyElegant:
      'The receive block reads like a switchboard operator routing calls by topic. Pattern matching means the process never has to unpack or inspect messages manually.',
    keyInsight:
      'When messages carry their own type in their shape, you never need a separate dispatch table.',
    analogy:
      'A mailroom clerk who sorts envelopes by color: red goes to accounting, blue to legal, black means close up shop.',
    sourceNote:
      'Core Erlang/OTP receive idiom, foundational to the actor model.',
  },
  {
    id: 'actor-model-hello-world',
    title: 'The Tiny Post Office',
    language: 'Scala',
    category: 'Concurrency Made Simple',
    conceptTags: ['actor', 'message-passing', 'isolation'],
    code: `import akka.actor.{Actor, ActorSystem, Props}

class Greeter extends Actor {
  def receive: Receive = {
    case name: String =>
      println(s"Hello, \$name!")
  }
}

object Main extends App {
  val system = ActorSystem("hello")
  val greeter = system.actorOf(Props[Greeter], "greeter")
  greeter ! "World"
  Thread.sleep(500)
  system.terminate()
}`,
    explanation:
      'An actor is an independent worker with its own mailbox. You send it a message (here, a name), and it processes that message on its own schedule. You never reach inside the actor directly.',
    whyElegant:
      'The exclamation mark (!) as the "send" operator captures the whole philosophy: fire a message and move on. No locking, no shared variables, no waiting.',
    keyInsight:
      'Isolating state inside actors means concurrency bugs have nowhere to hide.',
    analogy:
      'Dropping a letter in a mailbox — you do not follow the mail carrier to make sure it gets delivered.',
    sourceNote: 'Akka actor framework, implementing the Hewitt actor model.',
  },
  {
    id: 'async-await-fan-out',
    title: 'The Parallel Fetch',
    language: 'JavaScript',
    category: 'Concurrency Made Simple',
    conceptTags: ['async-await', 'fan-out', 'Promise.all'],
    code: `async function fetchAll(urls) {
  const results = await Promise.all(
    urls.map(url => fetch(url).then(r => r.json()))
  );
  return results;
}

// Usage
const data = await fetchAll([
  'https://api.example.com/users',
  'https://api.example.com/posts',
  'https://api.example.com/comments',
]);
console.log(data);`,
    explanation:
      'Instead of fetching three web pages one after another, this sends all three requests at the same time and waits for all of them to finish. The total wait is only as long as the slowest request.',
    whyElegant:
      'Promise.all turns a list of tasks into a single awaitable unit. The fan-out pattern is just a map — the same operation you would use to double every number in a list.',
    keyInsight:
      'Parallelism is often just "map, then wait for everything."',
    analogy:
      'Ordering three dishes at a restaurant at once instead of waiting for each to arrive before ordering the next.',
    sourceNote:
      'Standard JavaScript async/await pattern using Promise.all.',
  },
  {
    id: 'promise-race-timeout',
    title: 'The First One Wins',
    language: 'JavaScript',
    category: 'Concurrency Made Simple',
    conceptTags: ['Promise.race', 'timeout', 'racing'],
    code: `function withTimeout(promise, ms) {
  const timeout = new Promise((_, reject) =>
    setTimeout(() => reject(new Error('Timed out')), ms)
  );
  return Promise.race([promise, timeout]);
}

// Usage
try {
  const data = await withTimeout(
    fetch('https://api.example.com/slow'),
    3000
  );
  console.log('Got data:', data);
} catch (err) {
  console.error(err.message);
}`,
    explanation:
      'Two promises race: the real request and a timer. Whichever finishes first determines the outcome. If the timer wins, you get a timeout error instead of waiting forever.',
    whyElegant:
      'The timeout is not bolted on as a special parameter — it is a peer competitor in a fair race. Promise.race treats all contestants identically.',
    keyInsight:
      'A timeout is just a race between your task and a clock.',
    analogy:
      'Two runners sprinting to ring a bell — whoever gets there first decides whether you celebrate or go home.',
    sourceNote: 'Common JavaScript timeout pattern using Promise.race.',
  },
  {
    id: 'semaphore-counter',
    title: 'The Bouncer at the Door',
    language: 'Python',
    category: 'Concurrency Made Simple',
    conceptTags: ['semaphore', 'concurrency-limit', 'resource-control'],
    code: `import asyncio

async def worker(sem, task_id):
    async with sem:
        print(f"Task {task_id} entering")
        await asyncio.sleep(1)
        print(f"Task {task_id} leaving")

async def main():
    sem = asyncio.Semaphore(3)
    tasks = [worker(sem, i) for i in range(10)]
    await asyncio.gather(*tasks)

asyncio.run(main())`,
    explanation:
      'A semaphore is a counter that limits how many workers can be inside a section at once. Here, at most three tasks run their slow work simultaneously. When one leaves, another is allowed in.',
    whyElegant:
      'The async-with block makes the acquire-release lifecycle automatic — you cannot forget to release the permit. The constraint is declared once and enforced everywhere.',
    keyInsight:
      'A semaphore is a doorway with a fixed number of keys; you must return yours before someone else can enter.',
    analogy:
      'A nightclub with a bouncer who only lets three people in at a time — one out, one in.',
    sourceNote:
      'Python asyncio.Semaphore, based on Dijkstra\'s semaphore concept.',
  },
  {
    id: 'read-write-lock',
    title: 'The Library Rule',
    language: 'Java',
    category: 'Concurrency Made Simple',
    conceptTags: ['read-write-lock', 'shared-access', 'mutual-exclusion'],
    code: `import java.util.concurrent.locks.ReentrantReadWriteLock;

public class SharedConfig {
    private final ReentrantReadWriteLock lock = new ReentrantReadWriteLock();
    private String value = "default";

    public String read() {
        lock.readLock().lock();
        try {
            return value;
        } finally {
            lock.readLock().unlock();
        }
    }

    public void write(String newValue) {
        lock.writeLock().lock();
        try {
            value = newValue;
        } finally {
            lock.writeLock().unlock();
        }
    }
}`,
    explanation:
      'Many threads can read a value at the same time because reading does not change anything. But when one thread needs to write, it gets exclusive access — all readers must wait until the write is done.',
    whyElegant:
      'The asymmetry between reading and writing mirrors reality: a hundred people can look at a painting simultaneously, but only one restorer should touch it at a time.',
    keyInsight:
      'Distinguishing readers from writers lets you safely share data without serializing everything.',
    analogy:
      'A library where many visitors browse the shelves, but the doors lock when the librarian rearranges the books.',
    sourceNote:
      'Java ReentrantReadWriteLock, a standard java.util.concurrent primitive.',
  },
  {
    id: 'compare-and-swap',
    title: 'The Polite Retry',
    language: 'Java',
    category: 'Concurrency Made Simple',
    conceptTags: ['CAS', 'atomic', 'lock-free'],
    code: `import java.util.concurrent.atomic.AtomicInteger;

public class Counter {
    private final AtomicInteger count = new AtomicInteger(0);

    public void increment() {
        int prev;
        do {
            prev = count.get();
        } while (!count.compareAndSet(prev, prev + 1));
    }

    public int get() {
        return count.get();
    }
}`,
    explanation:
      'Instead of locking the counter, a thread reads the current value, adds one, then asks: "Is the value still what I read?" If yes, the update succeeds. If another thread changed it in between, the thread simply tries again.',
    whyElegant:
      'There is no lock, no waiting, no queue. The entire coordination happens in a single CPU instruction. Failure is handled by optimism and retry, not by blocking.',
    keyInsight:
      'Compare-and-swap turns contention into a quick retry loop instead of a blocking wait.',
    analogy:
      'Editing a shared Google Doc line — if someone changed it while you typed, you re-read and retype, rather than locking the whole document.',
    sourceNote:
      'Java AtomicInteger CAS loop, based on hardware compare-and-swap instructions.',
  },
  {
    id: 'lock-free-stack-push',
    title: 'The Persistent Optimist',
    language: 'Java',
    category: 'Concurrency Made Simple',
    conceptTags: ['lock-free', 'CAS', 'stack'],
    code: `import java.util.concurrent.atomic.AtomicReference;

public class LockFreeStack<T> {
    private static class Node<T> {
        final T value;
        Node<T> next;
        Node(T value, Node<T> next) {
            this.value = value;
            this.next = next;
        }
    }

    private final AtomicReference<Node<T>> head = new AtomicReference<>();

    public void push(T value) {
        Node<T> newHead;
        Node<T> oldHead;
        do {
            oldHead = head.get();
            newHead = new Node<>(value, oldHead);
        } while (!head.compareAndSet(oldHead, newHead));
    }

    public T pop() {
        Node<T> oldHead;
        Node<T> newHead;
        do {
            oldHead = head.get();
            if (oldHead == null) return null;
            newHead = oldHead.next;
        } while (!head.compareAndSet(oldHead, newHead));
        return oldHead.value;
    }
}`,
    explanation:
      'A stack where pushing and popping never uses a lock. Each operation reads the top of the stack, prepares a new version, and tries to swap it in. If someone else changed the top in the meantime, it just tries again.',
    whyElegant:
      'The retry loop is the only coordination mechanism. No mutexes, no condition variables — just a tight loop of read-prepare-attempt that converges quickly under contention.',
    keyInsight:
      'Lock-free structures trade blocking for brief, bounded retries.',
    analogy:
      'Stacking plates in a busy kitchen — if someone grabs the top plate while you are placing yours, you just adjust and try again.',
    sourceNote:
      'Treiber stack algorithm, a foundational lock-free data structure.',
  },
  {
    id: 'software-transactional-memory',
    title: 'The Undo Journal',
    language: 'Haskell',
    category: 'Concurrency Made Simple',
    conceptTags: ['STM', 'transactions', 'composability'],
    code: `import Control.Concurrent.STM
import Control.Concurrent (forkIO)

transfer :: TVar Int -> TVar Int -> Int -> STM ()
transfer from to amount = do
    balFrom <- readTVar from
    if balFrom < amount
        then retry
        else do
            writeTVar from (balFrom - amount)
            modifyTVar to (+ amount)

main :: IO ()
main = do
    alice <- newTVarIO 100
    bob   <- newTVarIO 50
    atomically $ transfer alice bob 30
    final <- atomically $ (,) <$> readTVar alice <*> readTVar bob
    print final  -- (70, 80)`,
    explanation:
      'Instead of locking accounts, the transfer runs inside a transaction. If anything goes wrong — say the balance is too low — the transaction rolls back automatically and retries when conditions change. No partial updates ever become visible.',
    whyElegant:
      'STM makes concurrent mutation feel like database transactions. You compose small transactional pieces into larger ones, and the runtime guarantees consistency without manual lock ordering.',
    keyInsight:
      'Transactions let you compose concurrent operations the same way you compose functions.',
    analogy:
      'Writing in pencil with an eraser: if you make a mistake halfway through, you erase everything and start over cleanly.',
    sourceNote:
      'Haskell STM library, based on the paper by Harris, Marlow, Peyton Jones, and Herlihy.',
  },
  {
    id: 'asyncio-gather',
    title: 'The Gathering Storm',
    language: 'Python',
    category: 'Concurrency Made Simple',
    conceptTags: ['asyncio', 'gather', 'fan-out'],
    code: `import asyncio

async def fetch_data(source, delay):
    await asyncio.sleep(delay)
    return f"{source}: done"

async def main():
    results = await asyncio.gather(
        fetch_data("database", 1),
        fetch_data("cache", 0.5),
        fetch_data("api", 2),
    )
    for r in results:
        print(r)

asyncio.run(main())`,
    explanation:
      'Three tasks that each take different amounts of time all start at once. gather waits until every one of them finishes, then hands you all the results in the original order.',
    whyElegant:
      'gather turns a list of separate asynchronous actions into a single awaitable bundle. Results come back in the order you listed them, regardless of which finished first.',
    keyInsight:
      'Gathering concurrent results preserves the order of intent, not the order of completion.',
    analogy:
      'Sending three friends to different stores and waiting at the car until all three come back with their bags.',
    sourceNote: 'Python asyncio.gather, standard library since Python 3.4.',
  },
  {
    id: 'kotlin-launch-vs-async',
    title: 'Fire-and-Forget vs. Give-Me-the-Answer',
    language: 'Kotlin',
    category: 'Concurrency Made Simple',
    conceptTags: ['coroutines', 'launch', 'async', 'deferred'],
    code: `import kotlinx.coroutines.*

fun main() = runBlocking {
    // launch: fire-and-forget
    val job = launch {
        delay(100)
        println("Side effect done")
    }

    // async: returns a result
    val deferred = async {
        delay(200)
        42
    }

    job.join()
    val result = deferred.await()
    println("Answer: \$result")
}`,
    explanation:
      'launch starts a task you do not need an answer from — it just does work in the background. async starts a task that will give you a result later. join waits for the first; await retrieves the value of the second.',
    whyElegant:
      'Two words — launch and async — capture the fundamental fork in concurrent intent: "do this" versus "compute this." The distinction is clear in the type system: Job versus Deferred.',
    keyInsight:
      'Naming the difference between side effects and computations makes concurrent code self-documenting.',
    analogy:
      'Telling a coworker "please file this" (launch) versus "please calculate the total and tell me" (async).',
    sourceNote:
      'Kotlin coroutines, kotlinx.coroutines library by JetBrains.',
  },
  {
    id: 'structured-concurrency-scope',
    title: 'The Responsible Parent',
    language: 'Kotlin',
    category: 'Concurrency Made Simple',
    conceptTags: ['structured-concurrency', 'scope', 'cancellation'],
    code: `import kotlinx.coroutines.*

suspend fun loadDashboard(): String = coroutineScope {
    val profile = async { fetchProfile() }
    val feed = async { fetchFeed() }
    "Profile: \${profile.await()}, Feed: \${feed.await()}"
}

suspend fun fetchProfile(): String {
    delay(300)
    return "Alice"
}

suspend fun fetchFeed(): String {
    delay(500)
    return "10 posts"
}

fun main() = runBlocking {
    println(loadDashboard())
}`,
    explanation:
      'coroutineScope creates a boundary: all tasks launched inside it must finish (or be cancelled) before the scope itself returns. If one task fails, the scope cancels the others automatically.',
    whyElegant:
      'The scope enforces a contract — no orphaned tasks, no dangling work. Concurrent tasks have the same lifetime guarantees as local variables in a function.',
    keyInsight:
      'Structured concurrency ensures that concurrent work has a clear owner and a bounded lifetime.',
    analogy:
      'A parent at the playground who will not leave until every child is accounted for.',
    sourceNote:
      'Structured concurrency concept popularized by Nathaniel J. Smith (Trio) and adopted by Kotlin coroutines.',
  },
  {
    id: 'dataflow-channels',
    title: 'The Pipeline',
    language: 'Go',
    category: 'Concurrency Made Simple',
    conceptTags: ['dataflow', 'pipeline', 'channels'],
    code: `package main

import "fmt"

func generate(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

func main() {
    ch := generate(2, 3, 4)
    out := square(ch)
    for v := range out {
        fmt.Println(v)
    }
}`,
    explanation:
      'Each stage of computation runs independently and connects to the next through a channel. Numbers flow in one end, get squared in the middle, and come out the other. Each stage only knows about its immediate neighbors.',
    whyElegant:
      'Stages compose like Lego bricks. You can insert a new stage, remove one, or rearrange the pipeline without rewriting the others. The channel is the universal connector.',
    keyInsight:
      'Pipelines turn concurrent processing into a series of composable, single-responsibility stages.',
    analogy:
      'A factory assembly line where each station does one thing and passes the piece to the next station via conveyor belt.',
    sourceNote:
      'Go pipeline pattern from the Go Blog article "Go Concurrency Patterns: Pipelines."',
  },
  {
    id: 'csp-dining-philosophers',
    title: 'The Polite Diners',
    language: 'Go',
    category: 'Concurrency Made Simple',
    conceptTags: ['CSP', 'dining-philosophers', 'deadlock-avoidance'],
    code: `package main

import (
    "fmt"
    "sync"
)

func philosopher(id int, left, right chan struct{}, wg *sync.WaitGroup) {
    defer wg.Done()
    for i := 0; i < 3; i++ {
        // pick up lower-numbered fork first to avoid deadlock
        if id%2 == 0 {
            left <- struct{}{}
            right <- struct{}{}
        } else {
            right <- struct{}{}
            left <- struct{}{}
        }
        fmt.Printf("Philosopher %d eats (round %d)\\n", id, i+1)
        <-left
        <-right
    }
}

func fork(ch chan struct{}) {
    for {
        <-ch        // picked up
        ch <- struct{}{} // put down
    }
}

func main() {
    const n = 5
    forks := make([]chan struct{}, n)
    for i := range forks {
        forks[i] = make(chan struct{}, 1)
        go fork(forks[i])
    }
    var wg sync.WaitGroup
    for i := 0; i < n; i++ {
        wg.Add(1)
        go philosopher(i, forks[i], forks[(i+1)%n], &wg)
    }
    wg.Wait()
}`,
    explanation:
      'Five philosophers sit around a table, each needing two forks to eat. To prevent everyone from grabbing one fork and waiting forever for the second, odd- and even-numbered philosophers pick up forks in a different order.',
    whyElegant:
      'Modeling forks as channels turns a classic deadlock puzzle into message passing. The asymmetric pickup order is a small, local rule that prevents a global catastrophe.',
    keyInsight:
      'Breaking symmetry in resource acquisition prevents circular waiting and eliminates deadlock.',
    analogy:
      'Five people at a round table agree that even-numbered seats grab left first and odd-numbered seats grab right first — nobody ends up in a standoff.',
    sourceNote:
      'Dijkstra\'s dining philosophers problem, solved here with CSP-style channels in Go.',
  },
  {
    id: 'petri-net-firing',
    title: 'The Token Game',
    language: 'Python',
    category: 'Concurrency Made Simple',
    conceptTags: ['petri-net', 'firing-rule', 'concurrency-model'],
    code: `class PetriNet:
    def __init__(self):
        self.places = {}
        self.transitions = {}

    def add_place(self, name, tokens=0):
        self.places[name] = tokens

    def add_transition(self, name, inputs, outputs):
        self.transitions[name] = (inputs, outputs)

    def can_fire(self, name):
        inputs, _ = self.transitions[name]
        return all(self.places[p] >= n for p, n in inputs)

    def fire(self, name):
        inputs, outputs = self.transitions[name]
        for p, n in inputs:
            self.places[p] -= n
        for p, n in outputs:
            self.places[p] += n

net = PetriNet()
net.add_place("ready", tokens=2)
net.add_place("done", tokens=0)
net.add_transition("process", [("ready", 1)], [("done", 1)])

while net.can_fire("process"):
    net.fire("process")
    print(net.places)
# {'ready': 1, 'done': 1}
# {'ready': 0, 'done': 2}`,
    explanation:
      'Places hold tokens (like coins on a board). A transition fires when every input place has enough tokens: it removes tokens from inputs and adds tokens to outputs. The net evolves step by step.',
    whyElegant:
      'The firing rule is dead simple — check, remove, add — yet it can model complex concurrent systems with synchronization, conflict, and resource sharing. Maximum expressiveness from minimal rules.',
    keyInsight:
      'A Petri net models concurrency as tokens flowing through a graph, making parallelism and synchronization visible.',
    analogy:
      'A board game where you can only move a piece when the right combination of tokens is on the right squares.',
    sourceNote:
      'Petri net formalism introduced by Carl Adam Petri in his 1962 dissertation.',
  },
  {
    id: 'join-calculus-sync',
    title: 'The Rendezvous',
    language: 'Scala',
    category: 'Concurrency Made Simple',
    conceptTags: ['join-calculus', 'synchronization', 'join-pattern'],
    code: `import scala.concurrent.{Future, Promise, Await}
import scala.concurrent.ExecutionContext.Implicits.global
import scala.concurrent.duration._

object JoinPattern {
  def join[A, B](fa: Future[A], fb: Future[B]): Future[(A, B)] = {
    for {
      a <- fa
      b <- fb
    } yield (a, b)
  }

  def main(args: Array[String]): Unit = {
    val left  = Future { Thread.sleep(100); "ping" }
    val right = Future { Thread.sleep(200); "pong" }

    val both = Await.result(join(left, right), 1.second)
    println(both) // (ping, pong)
  }
}`,
    explanation:
      'Two independent computations run in parallel. The join waits for both to arrive, then combines them into a pair. Neither result is usable until the other is ready, enforcing a synchronization point.',
    whyElegant:
      'The for-comprehension reads as a natural sentence: "given a from the left and b from the right, produce the pair." The join is implicit in the sequencing of the for.',
    keyInsight:
      'A join pattern synchronizes independent events by waiting for a specific combination before proceeding.',
    analogy:
      'Two friends arriving at different times to a locked escape room — the game starts only when both are present.',
    sourceNote:
      'Inspired by the join calculus of Fournet and Gonthier, demonstrated here with Scala futures.',
  },
  {
    id: 'pi-calculus-channel-passing',
    title: 'The Forwarded Letter',
    language: 'Go',
    category: 'Concurrency Made Simple',
    conceptTags: ['pi-calculus', 'channel-passing', 'mobility'],
    code: `package main

import "fmt"

func main() {
    // Create a channel that carries channels
    relay := make(chan chan string)

    go func() {
        // Sender creates a private reply channel and sends it
        reply := make(chan string)
        relay <- reply
        answer := <-reply
        fmt.Println("got answer:", answer)
    }()

    go func() {
        // Receiver gets the reply channel and responds on it
        reply := <-relay
        reply <- "hello from the other side"
    }()

    // Allow goroutines to complete
    var done string
    fmt.Scanln(&done)
}`,
    explanation:
      'One goroutine creates a private channel and sends that channel to another goroutine. The receiver can now communicate directly on the private channel. The communication link itself was communicated.',
    whyElegant:
      'Channels carrying channels is a mind-bending but natural extension. It lets processes establish private connections dynamically, the way you might slip someone your phone number during a conversation.',
    keyInsight:
      'When you can send communication links over communication links, network topology becomes dynamic.',
    analogy:
      'Handing someone a walkie-talkie tuned to a private frequency so they can talk to you directly, bypassing the group channel.',
    sourceNote:
      'Inspired by Milner\'s pi-calculus, where channel names can be transmitted over channels.',
  },
  {
    id: 'linda-tuple-space',
    title: 'The Bulletin Board',
    language: 'Python',
    category: 'Concurrency Made Simple',
    conceptTags: ['tuple-space', 'linda', 'coordination'],
    code: `import threading
import time

class TupleSpace:
    def __init__(self):
        self._store = []
        self._lock = threading.Lock()
        self._event = threading.Event()

    def out(self, *t):
        with self._lock:
            self._store.append(t)
            self._event.set()

    def inp(self, pattern):
        while True:
            with self._lock:
                for i, t in enumerate(self._store):
                    if len(t) == len(pattern) and all(
                        p is None or p == v for p, v in zip(pattern, t)
                    ):
                        return self._store.pop(i)
            self._event.wait()
            self._event.clear()

space = TupleSpace()

def producer():
    for i in range(3):
        space.out("task", i)
        print(f"posted task {i}")

def consumer():
    for _ in range(3):
        t = space.inp(("task", None))
        print(f"consumed {t}")

t1 = threading.Thread(target=producer)
t2 = threading.Thread(target=consumer)
t1.start(); t2.start()
t1.join(); t2.join()`,
    explanation:
      'A shared space holds tuples (small bundles of data). One process posts tuples (out), and another retrieves matching tuples (inp). The consumer describes the shape of what it wants, and the space finds a match.',
    whyElegant:
      'Processes coordinate without knowing about each other. They communicate through a shared bulletin board where messages are matched by shape, not by address. Decoupling is total.',
    keyInsight:
      'Tuple spaces decouple communication in both time and identity — producers and consumers never need to know about each other.',
    analogy:
      'A community bulletin board where you pin a note and anyone who needs that type of information takes it down.',
    sourceNote:
      'Linda coordination language by David Gelernter, Yale University, 1985.',
  },
  {
    id: 'clojure-agent-async',
    title: 'The Background Bookkeeper',
    language: 'Clojure',
    category: 'Concurrency Made Simple',
    conceptTags: ['agent', 'async-mutation', 'functional'],
    code: `(def counter (agent 0))

; Send async updates
(send counter inc)
(send counter + 10)
(send counter + 5)

; Wait for all pending actions to complete
(await counter)

(println @counter)
; => 16`,
    explanation:
      'An agent wraps a value and processes update functions one at a time in the background. You send it functions (increment, add ten), and the agent applies them sequentially. You can check the current value whenever you want.',
    whyElegant:
      'Updates are expressed as pure functions, and the agent serializes them automatically. You never write a lock, yet the value is always consistent because updates are ordered.',
    keyInsight:
      'An agent serializes asynchronous updates so you get lock-free mutation with guaranteed consistency.',
    analogy:
      'A bookkeeper who receives slips of paper with instructions ("add 10," "subtract 3") and processes them in order while you go about your day.',
    sourceNote:
      'Clojure agent system, part of Clojure\'s concurrency primitives.',
  },
  {
    id: 'clojure-ref-dosync',
    title: 'The Coordinated Transfer',
    language: 'Clojure',
    category: 'Concurrency Made Simple',
    conceptTags: ['STM', 'ref', 'dosync', 'transactions'],
    code: `(def alice (ref 100))
(def bob   (ref 50))

(dosync
  (alter alice - 30)
  (alter bob   + 30))

(println "Alice:" @alice "Bob:" @bob)
; => Alice: 70 Bob: 80`,
    explanation:
      'Refs are mutable values that can only change inside a dosync transaction. Both the debit from Alice and the credit to Bob happen atomically — either both succeed or neither does. No one ever sees a state where money has vanished.',
    whyElegant:
      'dosync reads like a database transaction block. You modify multiple refs, and the runtime handles retries and isolation. Composing coordinated mutations is as simple as putting them in the same block.',
    keyInsight:
      'Refs and dosync bring database-style ACID transactions to in-memory state.',
    analogy:
      'Moving money between two jars in a single motion — you never set one jar down half-empty while the other is still full.',
    sourceNote:
      'Clojure STM (Software Transactional Memory), designed by Rich Hickey.',
  },
  {
    id: 'java-completable-future-chain',
    title: 'The Assembly of Promises',
    language: 'Java',
    category: 'Concurrency Made Simple',
    conceptTags: ['CompletableFuture', 'chaining', 'composition'],
    code: `import java.util.concurrent.CompletableFuture;

public class FutureChain {
    public static void main(String[] args) {
        CompletableFuture.supplyAsync(() -> "Hello")
            .thenApply(s -> s + " World")
            .thenApply(String::toUpperCase)
            .thenCombine(
                CompletableFuture.supplyAsync(() -> "!"),
                (a, b) -> a + b
            )
            .thenAccept(System.out::println)
            .join(); // HELLO WORLD!
    }
}`,
    explanation:
      'A value starts as "Hello," gets " World" appended, gets uppercased, then gets combined with a separate future that produces "!". Each step runs asynchronously, but the chain reads top-to-bottom like a recipe.',
    whyElegant:
      'The method chain reads as a sentence: supply, then apply, then combine, then accept. Asynchronous composition looks no different from synchronous method chaining.',
    keyInsight:
      'CompletableFuture turns asynchronous pipelines into readable, linear method chains.',
    analogy:
      'A relay race where each runner transforms the baton before passing it to the next.',
    sourceNote:
      'Java CompletableFuture, introduced in Java 8.',
  },
  {
    id: 'java-virtual-threads',
    title: 'A Million Lightweight Workers',
    language: 'Java',
    category: 'Concurrency Made Simple',
    conceptTags: ['virtual-threads', 'Loom', 'scalability'],
    code: `import java.util.concurrent.Executors;

public class VirtualThreads {
    public static void main(String[] args) throws Exception {
        try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
            for (int i = 0; i < 100_000; i++) {
                final int id = i;
                executor.submit(() -> {
                    try {
                        Thread.sleep(1000);
                    } catch (InterruptedException e) {
                        Thread.currentThread().interrupt();
                    }
                    if (id == 0) System.out.println("Task 0 done");
                });
            }
        }
        System.out.println("All tasks completed");
    }
}`,
    explanation:
      'This creates 100,000 threads, each sleeping for a second. With traditional threads that would be impossible — your computer would run out of memory. Virtual threads are so cheap that a hundred thousand of them barely register.',
    whyElegant:
      'The API is identical to regular threads. You do not learn a new concurrency model; you just swap the executor. The runtime handles multiplexing thousands of virtual threads onto a handful of real ones.',
    keyInsight:
      'Virtual threads make the one-thread-per-task model viable at massive scale by making threads nearly free.',
    analogy:
      'Hiring a hundred thousand interns who share a few desks — each waits patiently and sits down only when they have work to do.',
    sourceNote: 'Project Loom, available in Java 21 as a standard feature.',
  },
  {
    id: 'loom-structured-task-scope',
    title: 'The Team Leader',
    language: 'Java',
    category: 'Concurrency Made Simple',
    conceptTags: ['structured-concurrency', 'Loom', 'task-scope'],
    code: `import java.util.concurrent.StructuredTaskScope;

public class Dashboard {
    record Data(String user, String orders) {}

    static Data loadDashboard() throws Exception {
        try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
            var userTask   = scope.fork(() -> fetchUser());
            var ordersTask = scope.fork(() -> fetchOrders());
            scope.join().throwIfFailed();
            return new Data(userTask.get(), ordersTask.get());
        }
    }

    static String fetchUser() throws Exception {
        Thread.sleep(200);
        return "Alice";
    }

    static String fetchOrders() throws Exception {
        Thread.sleep(300);
        return "3 orders";
    }

    public static void main(String[] args) throws Exception {
        System.out.println(loadDashboard());
    }
}`,
    explanation:
      'Two tasks are forked inside a scope. The scope waits for both, and if either fails, it shuts down the other. When the scope closes, all tasks are guaranteed to be done — no strays.',
    whyElegant:
      'The try-with-resources block makes the lifetime of concurrent tasks as visible and bounded as a local variable. Failure handling is automatic: one failure cancels the group.',
    keyInsight:
      'StructuredTaskScope ties the lifecycle of concurrent tasks to a lexical block, preventing orphaned work.',
    analogy:
      'A team leader who assigns two people to fetch supplies — if one comes back saying the store is closed, the leader recalls the other immediately.',
    sourceNote:
      'Java StructuredTaskScope, a preview feature in Project Loom (Java 21+).',
  },
  {
    id: 'rust-tokio-spawn-join',
    title: 'The Tokio Trident',
    language: 'Rust',
    category: 'Concurrency Made Simple',
    conceptTags: ['tokio', 'spawn', 'join', 'async'],
    code: `use tokio::time::{sleep, Duration};

async fn fetch(name: &str, ms: u64) -> String {
    sleep(Duration::from_millis(ms)).await;
    format!("{name} done")
}

#[tokio::main]
async fn main() {
    let a = tokio::spawn(fetch("api", 200));
    let b = tokio::spawn(fetch("db", 300));
    let c = tokio::spawn(fetch("cache", 100));

    let (ra, rb, rc) = tokio::join!(a, b, c);
    println!("{}, {}, {}", ra.unwrap(), rb.unwrap(), rc.unwrap());
}`,
    explanation:
      'Three tasks are spawned to run concurrently on the Tokio runtime. join! waits for all three. The total time is roughly the duration of the slowest task, not the sum of all three.',
    whyElegant:
      'tokio::spawn and tokio::join! mirror the natural thought pattern of "start these things, then collect the results." The macro-based join is concise and avoids allocating a vector of futures.',
    keyInsight:
      'Spawning tasks and joining them expresses "do these in parallel, then regroup" with minimal ceremony.',
    analogy:
      'Sending three scouts in different directions and waiting at camp until all three return with their reports.',
    sourceNote: 'Tokio async runtime for Rust, the most widely used async executor.',
  },
  {
    id: 'rust-rayon-par-iter',
    title: 'The Effortless Parallel Loop',
    language: 'Rust',
    category: 'Concurrency Made Simple',
    conceptTags: ['rayon', 'data-parallelism', 'par_iter'],
    code: `use rayon::prelude::*;

fn main() {
    let nums: Vec<u64> = (1..=1_000_000).collect();

    let sum: u64 = nums
        .par_iter()
        .filter(|&&n| n % 2 == 0)
        .map(|&n| n * n)
        .sum();

    println!("Sum of squares of evens: {sum}");
}`,
    explanation:
      'par_iter() replaces iter() and the computation automatically splits across all CPU cores. The filter, map, and sum run in parallel. You change one word and get parallelism for free.',
    whyElegant:
      'The single-character difference between sequential and parallel (iter vs. par_iter) is the platonic ideal of an ergonomic API. You describe what to compute; Rayon decides how to distribute the work.',
    keyInsight:
      'Data parallelism should be a property of the iterator, not a rewrite of the algorithm.',
    analogy:
      'Splitting a deck of cards among friends to count, then adding up their totals — same counting logic, more hands.',
    sourceNote:
      'Rayon data-parallelism library for Rust by Niko Matsakis and Josh Stone.',
  },
  {
    id: 'swift-async-let',
    title: 'The Parallel Binding',
    language: 'Swift',
    category: 'Concurrency Made Simple',
    conceptTags: ['async-let', 'structured-concurrency', 'parallel'],
    code: `func fetchUser() async -> String {
    try? await Task.sleep(nanoseconds: 200_000_000)
    return "Alice"
}

func fetchScore() async -> Int {
    try? await Task.sleep(nanoseconds: 300_000_000)
    return 42
}

func loadProfile() async {
    async let user = fetchUser()
    async let score = fetchScore()

    let name = await user
    let pts = await score
    print("\\(name): \\(pts) points")
}

// Called from an async context
// await loadProfile()`,
    explanation:
      'async let starts two tasks at the same time. The first await pauses until the user is ready; the second pauses until the score is ready. Both are running in the background from the moment they are declared.',
    whyElegant:
      'async let makes parallelism look like ordinary variable declaration. You read the code and see two let bindings — the concurrency is in the keyword, not in a restructured control flow.',
    keyInsight:
      'Parallel work should be as easy to express as declaring a variable.',
    analogy:
      'Writing two items on a shopping list and sending two people to fetch them at the same time, then checking off both when they return.',
    sourceNote:
      'Swift structured concurrency, introduced in Swift 5.5 (SE-0317).',
  },
  {
    id: 'zig-async-frame',
    title: 'The Suspended Frame',
    language: 'Zig',
    category: 'Concurrency Made Simple',
    conceptTags: ['async-frame', 'stackless', 'zero-allocation'],
    code: `const std = @import("std");

fn fetchData() u32 {
    // Simulate async work — in real Zig, this would
    // use suspend/resume with I/O
    return 42;
}

fn asyncTask(frame: *@Frame(fetchData)) u32 {
    // Start the async call
    frame.* = @asyncCall(
        @frameAddress(),
        fetchData,
    );
    // Resume and collect result
    return await frame;
}

pub fn main() void {
    // Zig async frames are stack-allocated, zero-overhead
    // The concept: an async function's state is a value you own
    var frame: @Frame(fetchData) = undefined;
    const result = fetchData();
    std.debug.print("result: {}\\n", .{result});
}`,
    explanation:
      'In Zig, an async function\'s suspended state is stored in a frame — a value you allocate yourself, often on the stack. There is no hidden heap allocation, no garbage collector, no runtime scheduler. You own the memory.',
    whyElegant:
      'By making the async frame an explicit, first-class value, Zig gives you full control over where concurrent state lives. The abstraction cost is literally zero.',
    keyInsight:
      'When async state is a value you own, concurrency has no hidden runtime cost.',
    analogy:
      'A bookmark you place in a book yourself, rather than relying on the library to remember your page.',
    sourceNote:
      'Zig async/await design, emphasizing zero-cost abstractions and explicit allocation.',
  },
  {
    id: 'haskell-par-pseq-sparks',
    title: 'The Spark of Parallelism',
    language: 'Haskell',
    category: 'Concurrency Made Simple',
    conceptTags: ['par', 'pseq', 'sparks', 'lazy-parallelism'],
    code: `import Control.Parallel (par, pseq)

fib :: Int -> Int
fib 0 = 0
fib 1 = 1
fib n = fib (n - 1) + fib (n - 2)

main :: IO ()
main = do
    let a = fib 36
        b = fib 37
        result = a \`par\` (b \`pseq\` (a + b))
    print result`,
    explanation:
      'par "sparks" the computation of a, suggesting to the runtime that it could be evaluated in parallel. pseq forces b to be evaluated before adding. The runtime decides whether to actually use a separate core based on workload.',
    whyElegant:
      'Two annotations — par and pseq — are all it takes to introduce parallelism into a pure program. Because Haskell is pure, there are no side effects to worry about; parallelism is just an optimization hint.',
    keyInsight:
      'In a pure language, parallelism is a safe annotation rather than a structural change.',
    analogy:
      'Lighting a sparkler (par) and handing it to a friend while you light your own (pseq) — both burn at the same time, and you combine the ashes at the end.',
    sourceNote:
      'GHC parallel runtime using sparks, from "Parallel and Concurrent Programming in Haskell" by Simon Marlow.',
  },
];
