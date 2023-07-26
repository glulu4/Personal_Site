import React, { useState } from 'react';
import '../ProjStyle.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@mui/material';
import './Sorts.css'
import { IconButton } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


function Sorts() {

    const SelectionSort = `import java.io.*;
import java.util.*;

// Notes to self:
// add a way to read in ints from a file then do the sort
// maybe add a way to use system.in and read in numbers and sort them


public class SelectionSort
{
  public static void main(String[] args) throws Exception
  {
    if ( args.length<1)  die("Next time enter the desired size of array");
    int arrSize = Integer.parseInt(args[0]);


    int[] arr = new int[arrSize];
    Random rnd = new Random();
    System.out.print("Unsorted array: ");
    for ( int i = 0; i < arr.length; i++)
    {
      arr[i] = rnd.nextInt(101); // generates random numbers from [0,101)
      System.out.print(arr[i] + " ");
    }
    System.out.println();

    int[] sortedArr;
    sortedArr = SelectionSort(arr);
    System.out.print("Sorted Array:   ");
    printArr(sortedArr);



  } // end of main
  public static int[] SelectionSort( int[] arr )
  {
    //int count = arr.length-1;
    for ( int j = 0; j < arr.length; j++)
    {
      int minIndex = j;
      int min = arr[j];
      for ( int i = 0+j; i < arr.length; i++) // the +j increments the array search space so that you dont search the beggining part as you sort
      {
        if ( min > arr[i])
        {
          min = arr[i]; // finds min in the array ( array is shortened by j every loop )
          minIndex = i; // gives us the val of where the min value came from
        }
      }
      int temp = arr[j];
      arr[j] = min; // swapping min value for the val at j
      arr[minIndex] = temp; // moving val at j to where the min came from

    }
    return arr;
  }

  public static void printArr( int[] arr)
  {
    for ( int i = 0; i < arr.length; i++)
      System.out.print(arr[i] + " ");
  }
  static void die(String errMsg)
	{
		System.out.println(errMsg);
		System.exit(0);
	}
} // END OF CLASS

    
    `
    const insertionSort = `import java.util.*;
import java.io.*;

public class InsertionSort
{
  public static void main(String[] args) throws Exception
  {
    int size = 0;

      boolean go = true;
      do
      {
      try
      {
        Scanner in = new Scanner ( System.in );
        System.out.print("Enter a number: ");
        size = in.nextInt();
        go = true;
      }
      catch ( Exception e)
      {
        //System.out.println("Enter a number: ");
        Scanner in = new Scanner ( System.in );
        go = false;
      }

    } while ( !go );

  int[] arr = new int[size];
  fillArray(arr);
  System.out.print("Unsorted Array: ");
  printArr(arr);

  int[] sortedArr = InsertionSort(arr);
  System.out.print("Sorted Array:   ");
  printArr(sortedArr);




  } // END OF MAIN

  // 4,3,2,15,7,89,0
  public static int[] InsertionSort( int[] arr ) // compare arr[i] to all values before and move the min to the back
  {

    // iterate trhough sorrted portion, starts at j and go down
    for ( int j = 0; j < arr.length-1; j++)
    {
      for ( int i = j; i >= 0 ; i--) // this loops backwards from wherever j is. so lets say j=5, then the inner loop
      {                              // will iterate from 5 to zero backwards
        if ( arr[i+1] < arr[i])
        {
          int temp = arr[i+1];
          arr[i+1] = arr[i];
          arr[i] = temp;
        }
      }


    }
    return arr;
  }

  static void printArr( int[] arr)
  {
    for ( int i = 0; i < arr.length; i++)
      System.out.print( arr[i] + " ");
    System.out.println();
  }
  static void fillArray ( int[] arr)
  {
    Random rnd = new Random();
    for ( int i = 0; i < arr.length ; i++)
      arr[i] = rnd.nextInt(101); // generates random numbers from 0-100!

  }








} // END OF CLASS

    `
    const heapSort = `import java.io.*;
import java.util.*;

public class HeapSort
{
  public static int[] array;

  public static void main(String[] args){
    array = fillArray( promptForSize() );
    System.out.print("Unsorted Array: ");
    printArr(array);
    System.out.print("Sorted Array:   ");
    heapSort();
    printArr(array);

  }

  public static int promptForSize(){
    int size = 0;
    boolean validIn = false;
    Scanner scn;
    do{
      try{
        scn = new Scanner(System.in);
        System.out.print("Enter array size ( less than 20 ): ");
        size = scn.nextInt();
        if ( size > 20 )
          throw new Exception();
        validIn = true;
      }
      catch( Exception e){
        System.out.println("Oops something went wrong, integers only");
        scn = new Scanner(System.in);
        validIn = false;
      }

    } while ( !validIn );
    return size;

  }

  public static int[] fillArray( int size ){
    int[] arr = new int[size];
    Random rnd = new Random();

    for ( int i = 0; i < size; i++ )
      arr[i] = rnd.nextInt(51); // generates random numbers from 0 - 100

    return arr;


  }
  public static void heapSort(){
    int length = array.length;
    // iterating from the first non-leaf node, which is at index (length/2) - 1
    // building max heap
    for ( int i = (length/2) - 1; i >= 0; i-- )
      heapify(length, i );

    for ( int j = length-1; j>=0; j--){
      // swaps root with last element
      int temp = array[0];
      array[0] = array[j];
      array[j] = temp;
      heapify( j, 0 );
    }
  }

  public static void heapify(int length, int i){
    int parent = i;
    int left = 2 * i + 1;
    int right = 2 * i + 2;

    if ( left < length && array[left] > array[parent] )
      parent = left; // swapping indexes
    if ( right < length && array[right] > array[parent] )
      parent = right;

    if ( parent != i ){
      int temp = array[parent];
      array[parent] = array[i];
      array[i] = temp;
      heapify(length, parent);
    }
  }
  static void printArr( int[] arr){
    for ( int i = 0; i < arr.length; i++)
      System.out.print( arr[i] + " ");
    System.out.println();
  }







}

    `

    const countingSort = `import java.util.*;
import java.io.*;

public class CountingSort
{
  static int[] arr;
  static int[] sortedArr;
  public static void main(String[] args)
  {
    int size = promptUser();
    arr = new int[size];
    fillArray(arr);
    System.out.print("Unsorted Array: ");
    printArray( arr );

    sortedArr = countingSort(arr);
    System.out.print("Sorted   Array: ");
    printArray( sortedArr );


  } // end of main
  static int promptUser()
  {
    int pSum = 0;
    boolean go = true;
    do
    {
    try
    {
      Scanner in = new Scanner ( System.in );
      System.out.print("Enter the array size: ");
      pSum = in.nextInt();
      go = true;
    }
    catch ( Exception e)
    {
      //System.out.println("Enter a number: ");
      Scanner in = new Scanner ( System.in );
      go = false;
    }

  } while ( !go );
  return pSum;

  } // End of promptUser
  static void fillArray( int[] arr )
  {
    Random rnd = new Random();
    for ( int i = 0; i < arr.length; i++)
      arr[i] = rnd.nextInt(26); // generates numbers from 0-25
  }
  static void printArray(int[] arr )
  {
    for ( int i = 0; i < arr.length; i++ )
      System.out.print(arr[i] + " ");
    System.out.println();
  }

  static int[] countingSort( int[] arr )
  {
    int max = 0;
    for ( int i = 0; i < arr.length; i++ ){
      if ( max < arr[i] )
        max = arr[i];
    }

    int[] countArr = new int[max + 1];
    // going thru original array and counting how many times each elem occurs then indexing straight into the count arrau with the num
    for ( int j = 0; j < arr.length; j++ ){
      countArr[ arr[j] ]++;
    }

    // adding the prev elem starting at 1 to the next index... can start at 0 or 1 doenst matter
    for ( int k = 0; k < countArr.length-1; k++ ){
      countArr[k+1] += countArr[k];
    }

    int[] sorted = new int[arr.length];
    for ( int i = 0; i < arr.length; i++){
      int index = countArr[ arr[i] ] - 1;
      sorted[index] = arr[i];
      countArr[ arr[i] ]--; // descresing the count of that elem we just stored into the final array
    }
    return sorted;
  }


}// end of class

    `

    const bubbleSort = `import java.io.*;
import java.util.*;

public class BubbleSort
{
  public static void main(String[] args) throws Exception
  {
    if ( args.length<1)  die("Next time enter the desired size of array");
    int size = Integer.parseInt(args[0]);

    int[] arr = new int[size];
    Random rdm = new Random();
    for ( int i = 0; i < arr.length; i++)
      arr[i] = rdm.nextInt(101); // generates random numbers from 0 - 100
    System.out.print("Unsorted Array: ");
    printArr(arr);

    int[] sortedArr = BubbleSort(arr);
    System.out.print("Sorted Array:   ");
    printArr(sortedArr);

  } // END OF MAIN

  public static int[] BubbleSort( int[] arr )
  {
    boolean sorted = false;
    while ( !sorted)  // while array is not sorted
    {
      sorted = true;
      for ( int i = 0; i < arr.length-1; i++)
      {
        if ( arr[i+1]<arr[i] ) // if second elem is less than one before
        {
          int swap = arr[i]; // stores val before swap
          arr[i] = arr[i+1]; // one after puts his number into position before
          arr[i+1] = swap;
          sorted= false;
        }
      }
    }
    return arr;
  }

  static void printArr( int[] arr)
  {
    for ( int i = 0; i < arr.length; i++)
      System.out.print( arr[i] + " ");
    System.out.println();
  }


  static void die(String errMsg)
	{
		System.out.println(errMsg);
		System.exit(0);
	}

} // END OF CLASS

    `

    const mergeSort = `import java.io.*;
import java.util.*;

public class MergeSort
{
  public static void main(String[] args)
  {
    int size = promptUser();
    int[] arr = new int[size];

    System.out.print("Unsorted Array: ");
    fillArray(arr);
    printArr(arr);

    System.out.print("Sorted Array:   ");
    mergeSort( arr, 0, arr.length-1);
    printArr(arr);



  } // end of main
  static int promptUser()
  {
    int size = 0;
    boolean go = true;
    do
    {
    try
    {
      Scanner in = new Scanner ( System.in );
      System.out.print("Enter size of array: ");
      size = in.nextInt();
      go = true;
    }
    catch ( Exception e)
    {
      //System.out.println("Enter a number: ");
      Scanner in = new Scanner ( System.in );
      go = false;
    }

  } while ( !go );
  return size;

  } // End of promptUser


  static void printArr( int[] arr)
  {
    for ( int i = 0; i < arr.length; i++)
      System.out.print(arr[i] + " ");
    System.out.println();
  }
  static void fillArray( int[] arr )
  {
    Random rnd = new Random();
    for ( int i = 0; i < arr.length; i++)
      arr[i] = rnd.nextInt(101); // generates numbers from 0-100
  }
  public static void mergeSort( int[] arr, int leftIndex, int rightIndex ) // rightIndex comes in as 0, leftIndex comes in as arr.length-1
  {
    if ( leftIndex < rightIndex )
    {
      int midpoint = ( rightIndex + leftIndex)/2; // finds midpoint of subArray
      mergeSort(arr, leftIndex, midpoint ); // first half of array
      mergeSort(arr, midpoint+1, rightIndex ); // second half of array
      merge(arr, leftIndex, midpoint, rightIndex );
    }


  }
  public static void merge( int[] arr, int leftIndex, int midpoint, int rightIndex)
  {
    int leftSubArrayLength = ( midpoint - leftIndex ) + 1;
    int rightSubArrayLength = ( rightIndex - midpoint );

    int[] leftSubArray = new int[leftSubArrayLength];
    int[] rightSubArray = new int[rightSubArrayLength];

    for ( int i = 0; i < leftSubArrayLength; i++ )
      leftSubArray[i] = arr[i+leftIndex];

    for ( int j = 0; j < rightSubArrayLength; j++ )
      rightSubArray[j] = arr[j + midpoint + 1];

    int arr1Index = 0;
    int arr2Index = 0;
    int index = leftIndex;
    while ((arr1Index < leftSubArrayLength) && (arr2Index < rightSubArrayLength)) // looping through both arrays
    {
      if ( leftSubArray[arr1Index] <= rightSubArray[arr2Index] ) // if elem in first array is less than elem in second array
      {
        arr[index] = leftSubArray[arr1Index];
        arr1Index++;
      }
      else
      {
        arr[index] = rightSubArray[arr2Index];
        arr2Index++;
      }
      index++;
    }
    while ( arr1Index < leftSubArrayLength )
    {
      arr[index] = leftSubArray[arr1Index];
      index++;
      arr1Index++;
    }
    while ( arr2Index < rightSubArrayLength)
    {
      arr[index] = rightSubArray[arr2Index];
      index++;
      arr2Index++;
    }



  }
} // END OF CLASS

    
    `

    const [selectedFile, setSelectedFile] = useState(SelectionSort)


    return (
      <div className='sortPageDiv'>
        <IconButton style={{ position: 'absolute', top: '0', left: '0', margin: '1%', colo: "black" }}
          onClick={() => { window.history.back(); }}
        >
          <ArrowBackIcon></ArrowBackIcon>
        </IconButton>



        <div className='sort-desc-div'>
          <h1 className='sort-title'>Sorting Algorithms</h1>
          <p className='sort-desc'>Simple algorithms I've implemented outside of class. When I initially wanted to imporve my 
            programming skills, I found the gist of each algorithm and implemented them myself. Although these are simple, 
            they have taught me how to manipulate arrays. Each can be ran on the command line and can be copied directly.
          </p>

        </div>

            <div className='code-container'>
                <div className='code-header'>
                    <div className='filename-box'>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(SelectionSort) }}>Selection </Button>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(insertionSort) }}>Insertion </Button>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(heapSort) }}>Heap </Button>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(countingSort) }}>Counting </Button>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(bubbleSort) }}>Bubble </Button>
                        <Button size="medium" class="button" onClick={() => { setSelectedFile(mergeSort) }}>Merge </Button>

                    </div>

                </div>

                <br></br>
                <br></br>
                <br></br>
                <SyntaxHighlighter language="java" style={atomDark}>

                    {selectedFile}
                </SyntaxHighlighter>



            </div>


        </div>
    );
}

export default Sorts;