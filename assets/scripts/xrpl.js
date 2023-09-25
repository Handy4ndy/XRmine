var xumm = new Xumm('66285bb2-33b7-406b-83de-9ccfcc2103cd');

xumm.on("ready", () => console.log("Ready (e.g. hide loading state of page)"));

xumm.on("success", async () => {
  xumm.user.account.then(account => {
    document.getElementById("accountaddress").innerText = account;
    alert(account + " has been connected, Welcome to XRmine!!!!");

    // Check trustlines here
    checkTrustlines(account);
  });
});

xumm.on("logout", async () => {
  document.getElementById('accountaddress').innerText = '...';
});

// Function to check trustlines
async function checkTrustlines(account) {
  const client = new xrpl.Client("wss://xrplcluster.com");
  await client.connect();

  try {
    const response = await client.request({
      "command": "account_lines",
      "account": account,
      "ledger_index": "validated"
    });

    document.getElementById("trustlineArea").innerHTML = JSON.stringify(response.result);

    // Define the currency you want to check for
    const currencyToCheck = "USD";

    // Check if the specified currency is found in the account
    const currencyFound = response.result.lines.some(line => line.currency === currencyToCheck);

    if (currencyFound) {
      // Hide the trustsetXrmine div
      document.getElementById("trustsetXrmine").style.display = "none";
    } else {
      // Show the trustsetXrmine div
      document.getElementById("trustsetXrmine").style.display = "block";

      function enableTrustSetBtn() {
        document.getElementById("trustSetBtn").disabled = false;
      }
      
      document.getElementById("whitepaperBtn").addEventListener("click", function() {
        setTimeout(enableTrustSetBtn, 180000); // 3 minutes (180,000 milliseconds)
      });

    }
  } catch (error) {
    console.error("Error checking trustlines:", error);
  }

  client.disconnect();
}




