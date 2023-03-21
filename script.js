const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("quote-author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");

let allQuotes = [];
// Shownew quote
function newQuote() {
  // Pick a ramdom quote from apiQuotes array
  const quote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
  // console.log(quoteText.text);
  quoteText.textContent = quote.text;
  if (quote.autor) {
    quoteAuthor.textContent = quote.author;
  } else {
    quoteAuthor.textContent = "Unknown";
  }

  // Check quote length to determine styling
  console.log(quote.text.length);
  if (quote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
}

async function getQuotesFromApi() {
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    allQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Cattch error here
  }
}

async function getQuotesFromLocalFile() {
  allQuotes = localQuotes;
}

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotesFromLocalFile();
newQuote();
