 
function merge(leftArray:any, rightArray:any, compareFunction:any) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
  
    while (leftIndex < leftArray.length && rightIndex < rightArray.length) {
      if (compareFunction(leftArray[leftIndex], rightArray[rightIndex]) <= 0) {
        result.push(leftArray[leftIndex]);
        leftIndex++;
      } else {
        result.push(rightArray[rightIndex]);
        rightIndex++;
      }
    }
  
    return result.concat(leftArray.slice(leftIndex), rightArray.slice(rightIndex));
  }

export function mergeSort(array:any, compareFunction:any):any {
    if (array.length <= 1) {
      return array;
    }
  
    const middleIndex = Math.floor(array.length / 2);
    const leftArray = array.slice(0, middleIndex);
    const rightArray = array.slice(middleIndex);
  
    return merge(
      mergeSort(leftArray, compareFunction),
      mergeSort(rightArray, compareFunction),
      compareFunction
    );
  }