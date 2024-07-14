function findGCF(num1, num2) {
 
    if (num1 === 0) {
      return num2;
    }
    if (num2 === 0) {
      return num1;
    }
    let smallerNum = num1 < num2 ? num1 : num2;
    for (let i = smallerNum; i >= 1; i--) {
      if (num1 % i === 0 && num2 % i === 0) {
        return i; 
      }
    }
  }