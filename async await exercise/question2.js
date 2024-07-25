//Write a callback hell of a function with at least 4 nested callbacks. This is for you to see how problematic it can be. 
function callbackHell(callback) {
    setTimeout(() => {
        console.log("First callback");
        setTimeout(() => {
            console.log("Second callback");
            setTimeout(() => {
                console.log("Third callback");
                setTimeout(() => {
                    console.log("Fourth callback");
                    callback();
                }, 1000);
            }, 1000);
        }, 1000);
    }, 1000);
}
function x() {
    console.log("Callback hell ");
}

callbackHell(x);