//Write an async function that fetches and console logs the to-do item on this url, (Tip: use the ‘fetch’ keyword) https://jsonplaceholder.typicode.com/todos/1
async function fetchdata() {
    const response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    const data= await response.json();
    console.log(data);
}

fetchdata();