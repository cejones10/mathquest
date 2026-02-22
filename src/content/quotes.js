export const quotes = [
  { text: "A mathematician is a device for turning coffee into theorems.", author: "Paul Erdős" },
  { text: "The essence of mathematics lies in its freedom.", author: "Georg Cantor" },
  { text: "Do not worry about your difficulties in mathematics. I can assure you mine are still greater.", author: "Albert Einstein" },
  { text: "Pure mathematics is, in its way, the poetry of logical ideas.", author: "Albert Einstein" },
  { text: "In mathematics you don't understand things. You just get used to them.", author: "John von Neumann" },
  { text: "God made the integers, all else is the work of man.", author: "Leopold Kronecker" },
  { text: "Mathematics is the queen of the sciences and number theory is the queen of mathematics.", author: "Carl Friedrich Gauss" },
  { text: "It is not knowledge, but the act of learning, not possession but the act of getting there, which grants the greatest enjoyment.", author: "Carl Friedrich Gauss" },
  { text: "The mathematician does not study pure mathematics because it is useful; he studies it because he delights in it and he delights in it because it is beautiful.", author: "Henri Poincaré" },
  { text: "Mathematics is not about numbers, equations, computations, or algorithms: it is about understanding.", author: "William Paul Thurston" },
  { text: "Young man, in mathematics you don't understand things. You just get used to them.", author: "John von Neumann" },
  { text: "The only way to learn mathematics is to do mathematics.", author: "Paul Halmos" },
  { text: "Mathematics, rightly viewed, possesses not only truth, but supreme beauty.", author: "Bertrand Russell" },
  { text: "If people do not believe that mathematics is simple, it is only because they do not realize how complicated life is.", author: "John von Neumann" },
  { text: "A proof tells us where to concentrate our doubts.", author: "Morris Kline" },
  { text: "In theory, there is no difference between theory and practice. In practice, there is.", author: "Yogi Berra (adopted by mathematicians everywhere)" },
  { text: "The art of doing mathematics consists in finding that special case which contains all the germs of generality.", author: "David Hilbert" },
  { text: "To ask the right question is already half the solution of a problem.", author: "Carl Friedrich Gauss" },
];

export function getRandomQuote() {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

export function getDailyQuote() {
  const day = Math.floor(Date.now() / 86400000);
  return quotes[day % quotes.length];
}
