//async fAdd error handling to your code for question #1. You can use a try-catch block.unction fetchdata() {
   
async function fetchdata() {
    try{
    const response = await fetch('https://jsonplaceholder.typiode.com/todos/1');
    const data= await response.json();
    console.log(data);
    }
    catch(error){
        console.log("Error fatching Data!!!");

    }
}

fetchdata();