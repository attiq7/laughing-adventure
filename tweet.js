function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

let scrollAmount = 800; // Total scroll amount

async function scrollToBottom() {
  // Scroll down by the current scroll amount
  window.scrollBy({
    top: scrollAmount,
    behavior: "smooth"
  });
}

async function likeAndRetweetTweets() {
  let likeCount = 0;
  let retweetCount = 0;
  let scrollTimer = 0; // Timer for scrolling

  while (likeCount < 300 || retweetCount < 300) {
    // Find the like button on the page
    const likeButton = document.querySelector('div[data-testid="like"]');
    // Find the retweet button on the page
    const retweetButton = document.querySelector('div[data-testid="retweet"]');
    // Generate a random number between 1 and 200
    const randomPixels = Math.floor(Math.random() * 200) + 1;
    const waitTime = randomPixels + 600;

    if (likeButton) {
      const totalWaitTime = waitTime + 600;
      // Wait for the specified time
      await sleep(totalWaitTime);
      // Click the like button
      likeButton.click();
      likeCount++;
      // Log a message to the console with the wait time and the tweet number
      console.log(`Liked tweet ${likeCount} after waiting ${totalWaitTime} milliseconds`);
      // Write the wait time to the screen
      const likeElement = document.createElement('p');
      likeElement.innerText = `tweet liked after waiting ${totalWaitTime} milliseconds`;
      document.body.appendChild(likeElement);
    }

    if (retweetButton) {
      const totalWaitTime = waitTime + 700;
      // Wait for the specified time
      await sleep(totalWaitTime);
      // Click the retweet button
      retweetButton.click();
      // Click the confirm retweet button
      const confirmRetweetButton = document.querySelector('div[data-testid="retweetConfirm"]');
      if (confirmRetweetButton) {
        confirmRetweetButton.click();
        retweetCount++;
        // Log a message to the console with the wait time and the tweet number
        console.log(`Retweeted tweet ${retweetCount} after waiting ${totalWaitTime} milliseconds`);
        // Write the wait time to the screen
        const retweetElement = document.createElement('p');
        retweetElement.innerText = `tweet retweeted after waiting ${totalWaitTime} milliseconds`;
        document.body.appendChild(retweetElement);
      }
    }

    // Check if it's time to scroll
    if (scrollTimer <= 0) {
      // Generate a random delay between 2500 and 3000 milliseconds for scrolling
      const scrollDelay = Math.floor(Math.random() * 501) + 2500;
      // Scroll by the modified scroll amount
      scrollToBottom();
      // Reset the scroll timer
      scrollTimer = scrollDelay;
      // Log a message with the scroll information
      console.log(`Scrolled by ${scrollAmount + randomPixels} pixels after waiting ${scrollDelay} milliseconds`);
    }

    // Decrease the scroll timer and wait for the next iteration
    scrollTimer -= 1000;
    await sleep(1000);
  }

  console.log(`Liked ${likeCount} tweets and retweeted ${retweetCount} tweets`);
}

likeAndRetweetTweets();
