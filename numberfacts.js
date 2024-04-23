// 1. Make a request to the Numbers API to get a fact about your favorite number
fetch('http://numbersapi.com/3?json')
  .then(response => response.json())
  .then(data => {
    console.log(data.text);
    // Display the fact on the page
    document.getElementById('fact1').innerText = data.text;
  })
  .catch(error => console.log('Error:', error));

// 2. Get data on multiple numbers in a single request
Promise.all([
    fetch('http://numbersapi.com/7?json'),
    fetch('http://numbersapi.com/42?json'),
    fetch('http://numbersapi.com/100?json'),
    fetch('http://numbersapi.com/123?json')
])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
        console.log(data);
        // Display the facts on the page
        document.getElementById('fact2').innerText = data[0].text;
        document.getElementById('fact3').innerText = data[1].text;
        document.getElementById('fact4').innerText = data[2].text;
        document.getElementById('fact5').innerText = data[3].text;
    })
    .catch(error => console.log('Error:', error));

// 3. Get 4 facts on your favorite number
Promise.all([
    fetch('http://numbersapi.com/3?json'),
    fetch('http://numbersapi.com/3?json'),
    fetch('http://numbersapi.com/3?json'),
    fetch('http://numbersapi.com/3?json')
])
    .then(responses => Promise.all(responses.map(response => response.json())))
    .then(data => {
        console.log(data);
        // Display the facts on the page
        document.getElementById('fact6').innerText = data[0].text;
        document.getElementById('fact7').innerText = data[1].text;
        document.getElementById('fact8').innerText = data[2].text;
        document.getElementById('fact9').innerText = data[3].text;
    })
    .catch(error => console.log('Error:', error));