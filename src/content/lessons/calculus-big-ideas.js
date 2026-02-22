export default {
  id: 'calc-big-ideas',
  title: 'The Big Ideas of Calculus',
  subtitle: 'Newton, Leibniz, and the Problem of Change',
  track: 'calculus',
  order: 1,
  estimatedMinutes: 30,
  prerequisites: [],
  blocks: [
    {
      type: 'narration',
      content: `Here's the thing about calculus that nobody tells you upfront: the entire subject is really just two ideas, and they turn out to be inverses of each other. That's it. Two ideas that shook mathematics to its foundations and gave humanity the language to describe a universe in motion.`
    },
    {
      type: 'narration',
      content: `Before we touch a single formula, let's understand *why* calculus had to be invented — because it wasn't some abstract exercise. It was an emergency.`
    },
    {
      type: 'historical',
      figure: 'Isaac Newton',
      years: '1643–1727',
      content: `In 1665, the Great Plague shut down Cambridge University. A 22-year-old Isaac Newton retreated to his family farm in Woolsthorpe. Over the next 18 months — his *annus mirabilis* — he invented calculus, discovered the laws of motion, and worked out the theory of gravity. He didn't publish any of it for decades. Newton needed calculus because he wanted to understand *motion*: How does the position of a planet relate to its velocity? If I know the forces on an object, can I predict where it will be tomorrow? These aren't static questions — they're questions about *change*, and the math of his era couldn't handle change.`
    },
    {
      type: 'insight',
      content: `**The core tension:** Ancient Greek geometry could handle static shapes beautifully. But the physical world *moves*. Calculus was born from the need to mathematize motion — to make the dynamic as precise as the static.`
    },
    {
      type: 'narration',
      content: `So what are these two big ideas? Let's build them from scratch.`
    },
    {
      type: 'narration',
      content: `**Idea 1: The Derivative (Instantaneous Rate of Change)**\n\nImagine you're driving. Your odometer says you've gone 100 miles in 2 hours. Your average speed is 50 mph. Easy.\n\nBut that's not what the speedometer shows. The speedometer shows your speed *right now* — at this exact instant. How do you compute speed at a single instant? You can't divide distance by time if no time has passed. You'd get $\\frac{0}{0}$, which is nonsense.\n\nThis is the fundamental puzzle of the derivative. Newton's insight was: don't try to compute speed at an instant directly. Instead, compute average speed over a tiny interval, then let the interval shrink toward zero.`
    },
    {
      type: 'math',
      latex: `f'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}`,
      explanation: `This is the derivative. Read it as: "the instantaneous rate of change of $f$ at the point $x$." It's the slope of the tangent line — the best linear approximation of $f$ near $x$.`
    },
    {
      type: 'narration',
      content: `That limit is doing all the heavy lifting. It's saying: compute the average rate of change over an interval of width $h$, then see what happens as $h$ gets impossibly small. If the answer stabilizes to some definite number, that's your derivative.\n\nLet's see it work. Take $f(x) = x^2$.`
    },
    {
      type: 'math',
      latex: `\\frac{(x+h)^2 - x^2}{h} = \\frac{x^2 + 2xh + h^2 - x^2}{h} = \\frac{2xh + h^2}{h} = 2x + h`,
      explanation: `As $h \\to 0$, this becomes simply $2x$. So the derivative of $x^2$ is $2x$. At $x = 3$, the curve is changing at rate 6. At $x = -1$, it's changing at rate $-2$ (decreasing). The derivative gives you a *function* that tells you the rate of change everywhere.`
    },
    {
      type: 'application',
      field: 'Physics',
      content: `If $f(t)$ is position at time $t$, then $f'(t)$ is velocity. The derivative of velocity? Acceleration. Newton's second law $F = ma$ is really a statement about *second derivatives*: force equals mass times the second derivative of position. The entire machinery of classical mechanics runs on derivatives.`
    },
    {
      type: 'narration',
      content: `**Idea 2: The Integral (Accumulation)**\n\nNow flip the question. Instead of going from *distance to speed*, go from *speed to distance*. If you know how fast you're going at every moment, can you figure out how far you've gone?\n\nIf your speed is constant — say, 60 mph for 2 hours — the answer is just $60 \\times 2 = 120$ miles. Geometrically, that's the area of a rectangle: height (speed) times width (time).\n\nBut what if your speed is changing? Then you slice time into tiny intervals, approximate the distance in each interval (speed × tiny time), and add them all up.`
    },
    {
      type: 'math',
      latex: `\\int_a^b f(x)\\,dx = \\lim_{n \\to \\infty} \\sum_{i=1}^{n} f(x_i^*)\\,\\Delta x`,
      explanation: `The integral is a sum of infinitely many infinitely thin rectangles. It computes the *accumulation* of a quantity — area under a curve, total distance traveled, total mass, total probability. It is one of the most versatile ideas in all of mathematics.`
    },
    {
      type: 'insight',
      content: `**The geometric intuition:** The derivative asks "what's the slope?" The integral asks "what's the area?" Slope and area — these are *geometric* operations. Calculus is, at its heart, geometry in motion.`
    },
    {
      type: 'narration',
      content: `**The Punchline: The Fundamental Theorem of Calculus**\n\nHere's where it gets beautiful. These two ideas — the derivative and the integral — are *inverses of each other*. This is the Fundamental Theorem of Calculus, and it's arguably the single most important theorem in mathematics.`
    },
    {
      type: 'math',
      latex: `\\frac{d}{dx} \\int_a^x f(t)\\,dt = f(x)`,
      explanation: `If you integrate a function and then take the derivative, you get back the original function. Differentiation undoes integration. It's like how addition undoes subtraction, or how squaring undoes square roots (sort of). This connection between slope and area — two things that seem completely unrelated — is the miracle at the heart of calculus.`
    },
    {
      type: 'historical',
      figure: 'Gottfried Wilhelm Leibniz',
      years: '1646–1716',
      content: `Leibniz invented calculus independently of Newton, and arguably his notation was better. The $\\frac{dy}{dx}$ and $\\int$ symbols we use today are Leibniz's — not Newton's. This sparked one of the bitterest priority disputes in the history of science. The Royal Society (headed by Newton) formally accused Leibniz of plagiarism. The fallout was so severe that British mathematics stagnated for a century while Continental mathematicians, using Leibniz's superior notation, raced ahead. The lesson: notation matters, and ego can be toxic to progress.`
    },
    {
      type: 'connection',
      to: 'real-analysis',
      content: `We've been casually saying "let $h$ go to zero" and "sum infinitely many things." But what does that *mean*, precisely? For 150 years after Newton and Leibniz, nobody could say. The rigorous foundations of limits, continuity, and convergence had to wait for Cauchy and Weierstrass in the 19th century — and that's exactly what Real Analysis is about.`
    },
    {
      type: 'problem',
      id: 'calc-deriv-1',
      difficulty: 2,
      statement: `Using the limit definition of the derivative (not shortcut rules), find the derivative of $f(x) = x^3$.\n\n*Hint: you'll need the expansion $(x+h)^3 = x^3 + 3x^2h + 3xh^2 + h^3$.*`,
      hints: [
        { level: 'nudge', content: 'Start by writing out $\\frac{f(x+h) - f(x)}{h}$ and expanding $(x+h)^3$.' },
        { level: 'guidance', content: 'After expanding, you should get $\\frac{3x^2h + 3xh^2 + h^3}{h}$. Factor out $h$.' },
        { level: 'socratic', content: 'Once you factor out $h$, what happens to each remaining term as $h \\to 0$? Which terms survive?' },
        { level: 'solution', content: '$f\'(x) = \\lim_{h \\to 0} \\frac{(x+h)^3 - x^3}{h} = \\lim_{h \\to 0} \\frac{3x^2h + 3xh^2 + h^3}{h} = \\lim_{h \\to 0}(3x^2 + 3xh + h^2) = 3x^2$.' },
      ],
    },
    {
      type: 'problem',
      id: 'calc-ftc-1',
      difficulty: 3,
      statement: `Here's a conceptual question that gets at the Fundamental Theorem.\n\nLet $A(x) = \\int_0^x t^2\\,dt$. Without computing $A(x)$ explicitly, explain *why* $A'(x) = x^2$. Then verify by actually computing the integral and differentiating.`,
      hints: [
        { level: 'nudge', content: 'The Fundamental Theorem says differentiation undoes integration. What does that tell you directly about $A\'(x)$?' },
        { level: 'guidance', content: 'For the verification: $\\int_0^x t^2\\,dt = \\frac{t^3}{3}\\Big|_0^x = \\frac{x^3}{3}$. Now differentiate.' },
        { level: 'socratic', content: 'Think about what $A(x)$ *means*: it\'s the area under $t^2$ from $0$ to $x$. As you move $x$ a tiny bit to the right, how much area do you add? That thin strip has height approximately $x^2$ and width $dx$...' },
        { level: 'solution', content: 'By the FTC: $A\'(x) = x^2$ directly. Verification: $A(x) = \\frac{x^3}{3}$, so $A\'(x) = x^2$. ✓\n\nThe intuitive reason: as $x$ increases by a tiny $dx$, the area increases by a thin rectangle of height $x^2$ and width $dx$, so $dA \\approx x^2\\,dx$, giving $\\frac{dA}{dx} = x^2$.' },
      ],
    },
    {
      type: 'narration',
      content: `That's the 30,000-foot view of calculus. Two operations — differentiation and integration — that are mirrors of each other, built on the idea of limits. Everything else in the subject (chain rule, integration techniques, series, multivariable generalizations) is elaboration on these core ideas.\n\nIn the next lesson, we'll sharpen our understanding of **limits** — the foundation everything rests on. Then we'll move through derivatives and integrals at speed, focusing on the ideas that transfer to higher mathematics and competition problem-solving.`
    },
  ],
  reviewItems: [
    {
      id: 'sr-calc-deriv-def',
      type: 'concept',
      question: 'What is the limit definition of the derivative $f\'(x)$?',
      answer: '$f\'(x) = \\lim_{h \\to 0} \\frac{f(x+h) - f(x)}{h}$',
    },
    {
      id: 'sr-calc-ftc',
      type: 'theorem',
      question: 'State the Fundamental Theorem of Calculus (Part 1).',
      answer: 'If $F(x) = \\int_a^x f(t)\\,dt$, then $F\'(x) = f(x)$. Differentiation undoes integration.',
    },
    {
      id: 'sr-calc-integral-meaning',
      type: 'concept',
      question: 'What does the definite integral $\\int_a^b f(x)\\,dx$ represent geometrically?',
      answer: 'The signed area between the graph of $f$ and the $x$-axis from $x = a$ to $x = b$.',
    },
  ],
};
