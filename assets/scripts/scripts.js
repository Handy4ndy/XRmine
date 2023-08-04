document.addEventListener('DOMContentLoaded', () => {
  const btnSignin = document.getElementById('btn_signin');
  const myText = document.getElementById('myText');

  btnSignin.addEventListener('click', () => {
    fetch('/signin') // Send a GET request to the /signin API endpoint
      .then(response => response.json())
      .then(data => {
        const qrpng = data.qrpng;
        console.log(qrpng);
        // Display the qrpng or perform any other actions you need
      })
      .catch(error => {
        console.error('Error signing in:', error);
      });
  });
});
