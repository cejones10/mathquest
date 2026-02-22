export default {
  id: 'la-intro',
  title: 'What Linear Algebra Is Really About',
  subtitle: 'Geometry, Transformations, and Why This Changes Everything',
  track: 'linear-algebra',
  order: 1,
  estimatedMinutes: 35,
  prerequisites: [],
  blocks: [
    {
      type: 'narration',
      content: `Let me be blunt: most linear algebra courses bury the beauty under endless row reduction. You learn to mechanically manipulate matrices without ever understanding what they *mean*. That stops now.\n\nLinear algebra is about one thing: **linear transformations** — functions that stretch, rotate, reflect, and project space. Matrices are just a way to *write down* these transformations. Once you see this, everything clicks.`
    },
    {
      type: 'historical',
      figure: 'Arthur Cayley',
      years: '1821–1895',
      content: `Cayley was the first to treat matrices as objects in their own right — not just arrays of numbers, but things you could multiply, invert, and take powers of. Before Cayley, the idea that you could "multiply" two tables of numbers was bizarre. After Cayley, it became the backbone of modern mathematics, physics, computer science, and machine learning. He published over 900 papers and was one of the most prolific mathematicians in history.`
    },
    {
      type: 'narration',
      content: `**The Setup: Vectors and Space**\n\nForget coordinates for a moment. A *vector* is just an arrow — it has a direction and a magnitude. You can add arrows (tip-to-tail) and scale them (stretch or shrink). That's it.\n\nA **vector space** is any collection of objects where addition and scaling make sense and behave nicely. The plane $\\mathbb{R}^2$ is the classic example — every point is a vector from the origin. But vector spaces show up everywhere: the set of all polynomials of degree $\\leq n$, the set of all continuous functions on $[0,1]$, the set of all $3 \\times 3$ matrices. Linear algebra works in all of them.`
    },
    {
      type: 'insight',
      content: `**Why "linear"?** A function $T$ is *linear* if it satisfies two rules: $T(\\mathbf{u} + \\mathbf{v}) = T(\\mathbf{u}) + T(\\mathbf{v})$ and $T(c\\mathbf{v}) = cT(\\mathbf{v})$. That's it. These two rules — additivity and scaling — are so restrictive that they force $T$ to have incredibly rigid, beautiful structure. That rigidity is why we can analyze linear maps completely.`
    },
    {
      type: 'narration',
      content: `**Matrices Are Transformations**\n\nHere's the key idea. Consider a function $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ that's linear. Where does it send the basis vectors $\\mathbf{e}_1 = (1,0)$ and $\\mathbf{e}_2 = (0,1)$?\n\nSay $T(\\mathbf{e}_1) = (a, c)$ and $T(\\mathbf{e}_2) = (b, d)$. Then for *any* vector $(x, y) = x\\mathbf{e}_1 + y\\mathbf{e}_2$, linearity forces:`
    },
    {
      type: 'math',
      latex: `T\\begin{pmatrix} x \\\\ y \\end{pmatrix} = x \\cdot T(\\mathbf{e}_1) + y \\cdot T(\\mathbf{e}_2) = x\\begin{pmatrix} a \\\\ c \\end{pmatrix} + y\\begin{pmatrix} b \\\\ d \\end{pmatrix} = \\begin{pmatrix} ax + by \\\\ cx + dy \\end{pmatrix}`,
      explanation: `A linear transformation is *completely determined* by what it does to the basis vectors. The matrix $\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$ is just a compact way to record this information. Each column is where a basis vector lands.`
    },
    {
      type: 'narration',
      content: `Let's make this concrete. Rotation by 90° counterclockwise sends $(1,0)$ to $(0,1)$ and $(0,1)$ to $(-1,0)$. The matrix is:`
    },
    {
      type: 'math',
      latex: `R_{90°} = \\begin{pmatrix} 0 & -1 \\\\ 1 & 0 \\end{pmatrix}`,
      explanation: `Column 1 is where $(1,0)$ goes: $(0,1)$. Column 2 is where $(0,1)$ goes: $(-1,0)$. That's it — the matrix IS the transformation, recorded column by column.`
    },
    {
      type: 'narration',
      content: `**Matrix Multiplication Is Function Composition**\n\nWhy does matrix multiplication have that weird "row times column" rule? Because it represents *doing one transformation after another*. If $A$ rotates and $B$ reflects, then $BA$ means "first do $A$, then do $B$." The rule for matrix multiplication is *forced* by this interpretation — it's not arbitrary at all.`
    },
    {
      type: 'insight',
      content: `**The golden rule of linear algebra:** Think of matrices as *actions*, not as tables of numbers. "What does this matrix *do* to space?" is always the right question to ask. Does it stretch? Rotate? Collapse a dimension? Shear? Every matrix tells a geometric story.`
    },
    {
      type: 'narration',
      content: `**Determinants: Volume and Orientation**\n\nThe determinant $\\det(A)$ answers a simple geometric question: by what factor does $A$ scale areas (or volumes in higher dimensions)?\n\nIf $\\det(A) = 2$, the transformation doubles all areas. If $\\det(A) = -1$, it preserves areas but flips orientation (like a reflection). If $\\det(A) = 0$, it collapses space down a dimension — you've lost information, and you can't invert the transformation.`
    },
    {
      type: 'math',
      latex: `\\det\\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix} = ad - bc`,
      explanation: `For a $2 \\times 2$ matrix, the determinant is the signed area of the parallelogram formed by the two column vectors. The sign tells you whether orientation is preserved or flipped.`
    },
    {
      type: 'application',
      field: 'Computer Graphics & Machine Learning',
      content: `Every time a 3D character rotates on screen, that's a matrix multiplication. Every layer of a neural network applies a linear transformation (matrix multiply) followed by a nonlinear activation. Google's PageRank algorithm is fundamentally an eigenvalue problem. Linear algebra isn't just foundational math — it's the computational engine of the modern world.`
    },
    {
      type: 'narration',
      content: `**Eigenvalues: The Soul of a Matrix**\n\nThis is the climax of a first linear algebra course, and it's profound.\n\nMost vectors get knocked off their direction when you apply a transformation. But some special vectors only get *scaled* — they point in the same direction before and after. These are **eigenvectors**, and the scaling factor is the **eigenvalue**.`
    },
    {
      type: 'math',
      latex: `A\\mathbf{v} = \\lambda \\mathbf{v}`,
      explanation: `$\\mathbf{v}$ is an eigenvector of $A$ with eigenvalue $\\lambda$. The transformation $A$ simply stretches $\\mathbf{v}$ by factor $\\lambda$. If $\\lambda = 1$, the vector is unchanged. If $\\lambda = 0$, it's killed. If $\\lambda$ is negative, it flips direction.`
    },
    {
      type: 'insight',
      content: `**Why eigenvalues matter:** If you can find a basis of eigenvectors, the matrix becomes diagonal in that basis — it just scales along each axis. This is *diagonalization*, and it turns hard matrix problems into trivial ones. Computing $A^{100}$ is nightmarish in general, but if $A = PDP^{-1}$ where $D$ is diagonal, then $A^{100} = PD^{100}P^{-1}$, and $D^{100}$ is just each diagonal entry raised to the 100th power.`
    },
    {
      type: 'connection',
      to: 'abstract-algebra',
      content: `Vector spaces are actually examples of *modules* over a field — a concept from Abstract Algebra. The eigenvalue equation $A\\mathbf{v} = \\lambda \\mathbf{v}$ is secretly about the *kernel* of the linear map $A - \\lambda I$, which connects to one of the deepest ideas in algebra. We'll see this when we study groups and rings.`
    },
    {
      type: 'problem',
      id: 'la-transform-1',
      difficulty: 2,
      statement: `A linear transformation $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ sends $(1,0)$ to $(2, 1)$ and $(0,1)$ to $(0, 3)$.\n\n(a) Write down the matrix $A$ for $T$.\n(b) Where does $T$ send the vector $(3, -1)$?\n(c) What is $\\det(A)$, and what does it tell you geometrically?`,
      hints: [
        { level: 'nudge', content: 'The columns of the matrix are where the basis vectors land.' },
        { level: 'guidance', content: 'The matrix is $A = \\begin{pmatrix} 2 & 0 \\\\ 1 & 3 \\end{pmatrix}$. For part (b), compute $A \\begin{pmatrix} 3 \\\\ -1 \\end{pmatrix}$.' },
        { level: 'socratic', content: 'For the determinant: is it positive or negative? What does that tell you about orientation? Is space being expanded or compressed?' },
        { level: 'solution', content: '(a) $A = \\begin{pmatrix} 2 & 0 \\\\ 1 & 3 \\end{pmatrix}$\n\n(b) $A\\begin{pmatrix} 3 \\\\ -1 \\end{pmatrix} = \\begin{pmatrix} 6 \\\\ 0 \\end{pmatrix}$\n\n(c) $\\det(A) = 6 - 0 = 6$. Areas are scaled by factor 6, and orientation is preserved (positive determinant).' },
      ],
    },
    {
      type: 'problem',
      id: 'la-eigen-1',
      difficulty: 3,
      statement: `Find the eigenvalues and eigenvectors of $A = \\begin{pmatrix} 3 & 1 \\\\ 0 & 2 \\end{pmatrix}$.\n\nThen use them to compute $A^5 \\begin{pmatrix} 1 \\\\ 1 \\end{pmatrix}$ without multiplying five matrices.`,
      hints: [
        { level: 'nudge', content: 'For eigenvalues, solve $\\det(A - \\lambda I) = 0$. Since $A$ is upper triangular, the eigenvalues are on the diagonal.' },
        { level: 'guidance', content: 'The eigenvalues are $\\lambda_1 = 3$ and $\\lambda_2 = 2$. For each, find $\\mathbf{v}$ such that $(A - \\lambda I)\\mathbf{v} = 0$.' },
        { level: 'socratic', content: 'Once you have eigenvectors $\\mathbf{v}_1, \\mathbf{v}_2$, write $(1,1)$ as $c_1\\mathbf{v}_1 + c_2\\mathbf{v}_2$. Then $A^5(1,1) = c_1 \\cdot 3^5 \\mathbf{v}_1 + c_2 \\cdot 2^5 \\mathbf{v}_2$.' },
        { level: 'solution', content: 'Eigenvalue $\\lambda_1 = 3$: $(A - 3I)\\mathbf{v} = 0$ gives $\\mathbf{v}_1 = (1, 0)$.\n\nEigenvalue $\\lambda_2 = 2$: $(A - 2I)\\mathbf{v} = 0$ gives $\\begin{pmatrix} 1 & 1 \\\\ 0 & 0 \\end{pmatrix}\\mathbf{v} = 0$, so $\\mathbf{v}_2 = (-1, 1)$.\n\nWrite $(1,1) = c_1(1,0) + c_2(-1,1)$. From the second component, $c_2 = 1$. From the first, $c_1 - 1 = 1$ so $c_1 = 2$.\n\n$A^5(1,1) = 2 \\cdot 3^5(1,0) + 2^5(-1,1) = (486, 0) + (-32, 32) = (454, 32)$.' },
      ],
    },
    {
      type: 'narration',
      content: `This is just the beginning. In the coming lessons, we'll explore vector spaces in depth, develop the theory of linear maps, and build toward the spectral theorem — one of the most beautiful results in all of mathematics. The key takeaway for now: **think geometrically**. Every matrix is a transformation of space, and understanding that transformation is the goal.`
    },
  ],
  reviewItems: [
    {
      id: 'sr-la-matrix-columns',
      type: 'concept',
      question: 'What do the columns of a matrix represent?',
      answer: 'Each column is where the corresponding basis vector lands under the transformation. The matrix records what the linear map does to the standard basis.',
    },
    {
      id: 'sr-la-determinant',
      type: 'concept',
      question: 'What is the geometric meaning of $\\det(A)$?',
      answer: 'The determinant is the factor by which $A$ scales areas (2D) or volumes (3D). Its sign indicates whether orientation is preserved (+) or flipped (−). If $\\det(A) = 0$, the transformation collapses space to a lower dimension.',
    },
    {
      id: 'sr-la-eigenvalue',
      type: 'concept',
      question: 'What is an eigenvector, and why are eigenvalues useful?',
      answer: 'An eigenvector $\\mathbf{v}$ of matrix $A$ satisfies $A\\mathbf{v} = \\lambda\\mathbf{v}$ — it gets scaled, not rotated. Eigenvalues reveal the "natural axes" of a transformation and make computing powers of matrices easy via diagonalization.',
    },
  ],
};
