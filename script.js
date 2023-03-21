let allQuotes = [];
// Shownew quote
function newQuote() {
  // Pick a ramdom quote from apiQuotes array
  const quote = allQuotes[Math.floor(Math.random() * allQuotes.length)];
  console.log(quote);
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

getQuotesFromLocalFile();
newQuote();
