//Use Promises instead of async/await for question number 1.
function fetchdata() {
    fetch('https://jsonplaceholder.typicode.com/todos/1')
        .then(response => response.json())
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error('Error fetching todo:');
        });
}

fetchdata();