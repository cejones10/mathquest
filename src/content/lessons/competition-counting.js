export default {
  id: 'comp-counting',
  title: 'Clever Counting',
  subtitle: 'Combinatorics for Competition Mathematics',
  track: 'competition',
  order: 1,
  estimatedMinutes: 35,
  prerequisites: [],
  blocks: [
    {
      type: 'narration',
      content: `Combinatorics is the art of counting without counting. It sounds paradoxical, but that's exactly what makes it powerful — and why it shows up on every math competition.\n\nThe basic question is always: "How many ways can X happen?" But the methods range from elegant to devious. Let's build your toolkit.`
    },
    {
      type: 'historical',
      figure: 'Paul Erdős',
      years: '1913–1996',
      content: `Erdős was the most prolific mathematician of the 20th century — over 1,500 papers, many in combinatorics. He lived out of a suitcase, traveling between collaborators, fueled by coffee and amphetamines. He'd show up at your door, announce "my brain is open," and proceed to solve your hardest problem. He believed God had a book — "The Book" — containing the most elegant proof of every theorem. The highest compliment he could pay a proof was: "That's from the Book." Competition combinatorics is full of Book proofs.`
    },
    {
      type: 'narration',
      content: `**Principle 1: Multiplication Principle**\n\nIf you make a sequence of independent choices — $a$ options for the first, $b$ for the second, $c$ for the third — the total number of outcomes is $a \\times b \\times c$.\n\nThis sounds trivial. It's not. The art is in *framing* a problem as a sequence of independent choices.`
    },
    {
      type: 'narration',
      content: `**Principle 2: Complementary Counting**\n\nSometimes counting what you *want* is hard, but counting what you *don't want* is easy. Then:\n\n$$\\text{what you want} = \\text{total} - \\text{what you don't want}$$\n\nThis is one of the most powerful tricks in competition math. If a problem says "at least one," "no two adjacent," or any restrictive condition, think complementary counting.`
    },
    {
      type: 'problem',
      id: 'comp-count-1',
      difficulty: 2,
      statement: `How many 4-digit numbers (from 1000 to 9999) have at least one digit equal to 7?`,
      hints: [
        { level: 'nudge', content: 'Counting "at least one 7" directly is messy — you\'d have to handle cases. Try complementary counting.' },
        { level: 'guidance', content: 'Total 4-digit numbers: 9000. Count those with NO 7s: the first digit has 8 choices (1-9, excluding 7), and each remaining digit has 9 choices (0-9, excluding 7).' },
        { level: 'socratic', content: 'Numbers with no 7s: $8 \\times 9 \\times 9 \\times 9$. Why 8 for the first digit and 9 for the others?' },
        { level: 'solution', content: 'Total: $9000$. Numbers with no 7s: $8 \\times 9^3 = 5832$.\n\nAnswer: $9000 - 5832 = 3168$.' },
      ],
    },
    {
      type: 'narration',
      content: `**Principle 3: Bijections (Counting by Correspondence)**\n\nIf you can't count set $A$ directly, find a set $B$ that you *can* count and establish a one-to-one correspondence between them. Then $|A| = |B|$.\n\nThis is the most sophisticated counting technique, and it's essentially what makes combinatorics a branch of mathematics rather than a collection of tricks.`
    },
    {
      type: 'narration',
      content: `**The Stars and Bars Theorem** is a beautiful example of bijection. Question: How many ways can you distribute $n$ identical balls into $k$ distinct boxes?\n\nRepresent a distribution as a string of $n$ stars (balls) and $k-1$ bars (dividers). For example, with 5 balls and 3 boxes:\n\n$\\star\\star\\,|\\,\\star\\,|\\,\\star\\star$ means (2, 1, 2).\n$\\star\\star\\star\\star\\star\\,|\\,|$ means (5, 0, 0).\n\nYou're choosing where to place $k-1$ bars among $n + k - 1$ positions.`
    },
    {
      type: 'math',
      latex: `\\binom{n+k-1}{k-1} = \\binom{n+k-1}{n}`,
      explanation: `The number of ways to distribute $n$ identical objects into $k$ distinct bins. This formula solves a huge class of problems — anytime you see "distribute," "non-negative integer solutions," or "multiset," stars and bars is likely the tool.`
    },
    {
      type: 'problem',
      id: 'comp-count-2',
      difficulty: 3,
      statement: `How many non-negative integer solutions does $x_1 + x_2 + x_3 + x_4 = 15$ have?`,
      hints: [
        { level: 'nudge', content: 'This is a direct stars and bars problem. $n$ identical things into $k$ distinct bins.' },
        { level: 'guidance', content: 'Here $n = 15$ (the total to distribute) and $k = 4$ (the variables/bins).' },
        { level: 'socratic', content: 'Apply the formula: $\\binom{n + k - 1}{k - 1} = \\binom{15 + 4 - 1}{4 - 1}$.' },
        { level: 'solution', content: '$\\binom{18}{3} = \\frac{18 \\cdot 17 \\cdot 16}{3 \\cdot 2 \\cdot 1} = 816$.' },
      ],
    },
    {
      type: 'narration',
      content: `**Principle 4: The Pigeonhole Principle**\n\nIf you stuff $n+1$ pigeons into $n$ holes, at least one hole has at least 2 pigeons. Obvious, right? But this trivial observation has devastating consequences.`
    },
    {
      type: 'historical',
      figure: 'Peter Gustav Lejeune Dirichlet',
      years: '1805–1859',
      content: `Dirichlet formalized the pigeonhole principle (originally the "Schubfachprinzip" — drawer principle). He was also the one who gave us the modern definition of a function and made foundational contributions to number theory. The pigeonhole principle is deceptively simple — competition problems that use it are often among the hardest, because the challenge is identifying *what* the pigeons and holes are.`
    },
    {
      type: 'problem',
      id: 'comp-pigeonhole-1',
      difficulty: 4,
      statement: `Prove that among any 5 points placed inside a unit square, there exist two points whose distance is at most $\\frac{\\sqrt{2}}{2}$.`,
      hints: [
        { level: 'nudge', content: 'Pigeonhole: 5 points (pigeons) into... what holes? Think about dividing the square.' },
        { level: 'guidance', content: 'Divide the unit square into 4 equal smaller squares (2×2 grid). Each has side length $\\frac{1}{2}$.' },
        { level: 'socratic', content: '5 points into 4 squares: at least 2 points share a square. What\'s the maximum distance between two points in a square of side $\\frac{1}{2}$? That\'s the diagonal.' },
        { level: 'solution', content: 'Divide the unit square into 4 squares of side $\\frac{1}{2}$. By pigeonhole, at least 2 of the 5 points lie in the same small square. The maximum distance between two points in a square of side $\\frac{1}{2}$ is the diagonal: $\\frac{\\sqrt{2}}{2}$. ∎' },
      ],
    },
    {
      type: 'insight',
      content: `**Competition meta-strategy:** When a problem asks you to prove something *exists* without constructing it, think pigeonhole. When a problem asks you to *count*, try multiplication principle first, then complementary counting, then bijections. The best solvers don't just know these tools — they've internalized *when* to reach for each one.`
    },
    {
      type: 'problem',
      id: 'comp-count-amc',
      difficulty: 3,
      statement: `**(AMC-style)** A committee of 5 is to be formed from 6 men and 4 women. How many committees can be formed if the committee must include at least 2 women?`,
      hints: [
        { level: 'nudge', content: '"At least 2 women" — is it easier to count this directly or use complementary counting?' },
        { level: 'guidance', content: 'Complementary: total committees $-$ committees with 0 women $-$ committees with 1 woman.' },
        { level: 'socratic', content: 'Total: $\\binom{10}{5}$. Committees with 0 women: $\\binom{6}{5}$. Committees with exactly 1 woman: $\\binom{4}{1}\\binom{6}{4}$.' },
        { level: 'solution', content: 'Total: $\\binom{10}{5} = 252$.\n\n0 women: $\\binom{6}{5} = 6$.\n\n1 woman: $\\binom{4}{1}\\binom{6}{4} = 4 \\cdot 15 = 60$.\n\nAt least 2 women: $252 - 6 - 60 = 186$.' },
      ],
    },
    {
      type: 'narration',
      content: `We've only scratched the surface. In upcoming lessons, we'll tackle the Inclusion-Exclusion Principle, generating functions (a ridiculously powerful tool), and the combinatorial identities that show up repeatedly on competitions. But the principles above — multiplication, complementary counting, bijection, and pigeonhole — are the foundation. Master them, and you'll handle 80% of competition counting problems.`
    },
  ],
  reviewItems: [
    {
      id: 'sr-comp-complement',
      type: 'concept',
      question: 'When should you use complementary counting?',
      answer: 'When the problem involves "at least one," "at least two," or restrictive conditions that make direct counting involve many cases. Count the complement (what you don\'t want) and subtract from the total.',
    },
    {
      id: 'sr-comp-stars-bars',
      type: 'theorem',
      question: 'How many ways can $n$ identical objects be distributed into $k$ distinct bins?',
      answer: '$\\binom{n+k-1}{k-1}$ (Stars and Bars theorem). Equivalent to choosing $k-1$ divider positions from $n+k-1$ total positions.',
    },
    {
      id: 'sr-comp-pigeonhole',
      type: 'concept',
      question: 'When should you use the Pigeonhole Principle on a competition?',
      answer: 'When the problem asks you to prove something EXISTS without constructing it. Identify the "pigeons" (objects) and "holes" (categories) such that having more pigeons than holes guarantees the desired conclusion.',
    },
  ],
};
