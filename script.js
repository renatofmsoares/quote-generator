const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const quoteAuthor = document.getElementById("quote-author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let allQuotes = [];

function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

function showNewQuote() {
  const randomlySelectedQuote =
    allQuotes[Math.floor(Math.random() * allQuotes.length)];
  quoteText.textContent = randomlySelectedQuote.text;
  if (randomlySelectedQuote.author) {
    console.log("randomlySelectedQuote: ", randomlySelectedQuote);
    quoteAuthor.textContent = randomlySelectedQuote.author;
  } else {
    showNewQuote();
  }

  // Check quote length to determine styling
  if (randomlySelectedQuote.text.length > 120) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
}

async function getQuotesFromApi() {
  showLoadingSpinner();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    allQuotes = await response.json();
    hideLoadingSpinner();
    showNewQuote();
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

newQuoteBtn.addEventListener("click", showNewQuote);
twitterBtn.addEventListener("click", tweetQuote);

getQuotesFromApi();
