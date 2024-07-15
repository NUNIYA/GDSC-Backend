function GCD(num1, num2) {
   
    num1 = Math.abs(num1);
    num2 = Math.abs(num2);

    if (num2 > num1) {
      [num1, num2] = [num2, num1];
    }
  
    let remainder = 1;
    let result;
  
    while (remainder) {
      remainder = num1 % num2; 
      num1 = num2; 
      num2 = remainder;
      if (remainder === 0) { 
        result = num1; 
        break;
      }
    }
  
    return result;
  }

  let num1 = 6;
  let num2 = 3;
  let gcf = GCD(num1, num2);
  console.log("The GCD of "+num1 +" and "+num2+ " is " +gcf); 
  