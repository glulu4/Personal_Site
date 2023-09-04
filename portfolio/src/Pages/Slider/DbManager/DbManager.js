import React, {useState} from 'react'
import '../ProjStyle.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';





function DbManager(){

    const pageStyle = {
        backgroundColor: '#86b3d1',

    }

    const titleStyle = {
        color: '#ffffff',
        borderBottom: '2px solid black',
        maxWidth: 'fit-content',
        fontSize: '50px',
    }
    const descriptionStyle = {
    }

    const DatabaseDotJava = `import java.io.*;
import java.util.*;
import java.net.HttpURLConnection;
import java.net.URL;
// import javax.json.*;
// import org.json.JSONArray;
// import org.json.JSONException;
// import javax.json.JsonObject;

public class DataBase{

  static String backendAdress = "theBackEndAddress : )";
  // static String backendAdress = "http://127.0.0.1:5001";
  static Scanner scan;

  public static void main(String[] args) {


    scan = new Scanner(System.in);

    while(true){

      try {

        switch( displayMenu() ){
          case 1:
            System.out.println("case 1");
            addOrder();
            break;
          case 2:
            System.out.println("case 2");
            boolean success = getAllOrders();

            if (success) System.out.println("Successfully retrieved orders!");
            System.out.println(success);

            break;
          // get order by id
          case 3:
            System.out.println("case 3");
            int idCaseThree = promptUserForID();
            getOrderById(idCaseThree);
            // someFunction();
            break;
            
          case 4:
            // someFunction();
            System.out.println("Case 4");
            int idCaseFour = promptUserForID();
            boolean removed = removeOrder(idCaseFour);
            if ( removed ) System.out.println("Order with id " + idCaseFour + " removed from the database");
            break;

          case 5:
            System.out.println("Case 5");
            clearDatabase();
            break;
          // email all orders
          case 6:
            System.out.println("Case 5");
            emailAllOrders();
            break;
          // send last weeks orders
          case 7:
            System.out.println("Case 5");
            emailLastWeeksOrders();
            break;
          case 8:
            System.out.println("case 6");
            System.exit(0);
            break;
          default:
            System.out.println("Whoops");
            break;


        }

        
        


      } catch (Exception e) {
        System.out.println("Something happened, here read this " + e.getMessage());
      }

      System.out.print("Please press ENTER to continue ...");
      
      scan.nextLine();   

    }







  }

  public static int displayMenu(){
    int option = -1;

    System.out.println("*********************************");
    System.out.println("Choose from the following");
    System.out.println("1. Add order"); // 5
    System.out.println("2. View all orders"); // DONE
    System.out.println("3. View a specific orders"); // DONE
    System.out.println("4. Remove an order"); // DONE
    System.out.println("5. Clear database"); //DONE
    System.out.println("6. Email all orders"); // DONE
    System.out.println("7. Email last weeks orders"); // DONE

    System.out.println("8. Exit.");
    System.out.println("*********************************");

    while (true) {
      System.out.print("Please choose a menu option (1-6): ");
      try {
        option = Integer.parseInt(scan.nextLine());
        break;
      } catch (Exception e) {
        System.out.println("Invalid input: " + e.getMessage());
      }
    }

    return option;

  }

  public static boolean addOrder(){
    HttpURLConnection connection = null;

    int responseCode = -1;
    String responseMessage="";

    try {

      String endpoint = backendAdress + "/order/";
      URL url = new URL(endpoint);
      connection = (HttpURLConnection) url.openConnection();
      connection.setRequestMethod("POST");
      connection.setRequestProperty("Content-Type", "application/json");

      connection.setRequestProperty("Accept", "application/json");


      connection.setDoOutput(true);
      String jsonData = promptUserForOrderInfo();

      

      // String jsonInputString = "{"name": "Upendra", "job": "Programmer"}";

      try(OutputStream os = connection.getOutputStream()) {
        byte[] input = jsonData.getBytes("utf-8");
        os.write(input, 0, input.length);			
      }




      responseCode = connection.getResponseCode();
      responseMessage = connection.getResponseMessage();

      System.out.println("Response Code: " + responseCode);

      if (responseCode > 499 ){
        System.out.println("Server error, leaving");
        return false;
      }
      System.out.println("Response Message: " + responseMessage);


      
    } catch (Exception e) {
     
      System.out.println(e.getLocalizedMessage());
      return false;
    }

    return true;

  }

  public static boolean removeOrder(int id){

    HttpURLConnection connection = null;

    int responseCode = -1;

    try {
      String endpoint = backendAdress + "/order/" + id + "/";
      URL url = new URL(endpoint);
      connection = (HttpURLConnection) url.openConnection();
      connection.setRequestMethod("DELETE");

      responseCode = connection.getResponseCode();
      if ( responseCode > 499 ){
        System.out.println("Response Code: " + responseCode);
        System.out.println("Server error!");
        return false;
      }
      System.out.println("Response Code: " + responseCode);




    } catch (Exception e) {
      System.out.println("Something happened, here read this: " + e.getMessage());
      return false;
    }
    return true;

  }


  public static boolean clearDatabase(){
    HttpURLConnection connection = null;

    int responseCode = -1;
    

    try {
      String endpoint = backendAdress + "/clear/";
      URL url = new URL(endpoint);
      connection = (HttpURLConnection) url.openConnection();
      connection.setRequestMethod("DELETE");

      responseCode = connection.getResponseCode();
      System.out.println("Response Code: " + responseCode);




    } catch (Exception e) {
      System.out.println("Something happened, here read this: " + e.getMessage());
      return false;
    }
    return true;
  }

  public static boolean getAllOrders(){

    HttpURLConnection connection=null;
    int responseCode=0;
    try {

      String endpoint = backendAdress+"/orders/";

      URL url = new URL(endpoint);
      connection = (HttpURLConnection) url.openConnection();

      connection.setRequestMethod("GET");
      responseCode = connection.getResponseCode();

      System.out.println("Response Code: " + responseCode);

    } catch (Exception e) {
      System.out.println(e.toString());
      return false;    
    }



    try (BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream() ) ) ) {

      String inputLine;
      StringBuilder response = new StringBuilder();

      while ((inputLine = in.readLine()) != null) {
          response.append(inputLine);
      }

      System.out.println(  formatJson ( response.toString() ));
    }
    catch(Exception e){
      System.out.println(e.toString());
      return false;
    }

    return true;



  }

  public static boolean getOrderById(int id){
    HttpURLConnection connection=null;
    int responseCode=0;
    try {

      String endpoint = backendAdress+"/order/"+id;

      URL url = new URL(endpoint);
      connection = (HttpURLConnection) url.openConnection();

      connection.setRequestMethod("GET");
      responseCode = connection.getResponseCode();

      System.out.println("Response Code: " + responseCode);

    } catch (Exception e) {
      System.out.println(e.toString());
      return false;    
    }



    try (BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream() ) ) ) {

      String inputLine;
      StringBuilder response = new StringBuilder();

      while ((inputLine = in.readLine()) != null) {
          response.append(inputLine);
      }

      System.out.println(  formatJson ( response.toString() ));
    }
    catch(Exception e){
      System.out.println(e.toString());
      return false;
    }

    return true;


  }

  public static boolean emailLastWeeksOrders(){
    HttpURLConnection connection = null;

    int responseCode = -1;
    

    try {
      String endpoint = backendAdress + "/send-orders";
      URL url = new URL(endpoint);
      connection = (HttpURLConnection) url.openConnection();
      connection.setRequestMethod("POST");
      connection.setRequestProperty("Content-Type", "application/json");

      responseCode = connection.getResponseCode();
      System.out.println("Response Code: " + responseCode);


      // No need to write anything to the output stream for an empty request body


        try (BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream()))) {
          String inputLine;
          StringBuilder response = new StringBuilder();
          while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
          }
          System.out.println("Response: " + response.toString());
        }
     



    } catch (Exception e) {
      System.out.println("Something happened, here read this: " + e.getMessage());
      return false;
    }
    return true;
  }

  public static boolean emailAllOrders(){
    HttpURLConnection connection = null;

    int responseCode = -1;
    

    try {
      String endpoint = backendAdress + "/send-all-orders";
      URL url = new URL(endpoint);
      connection = (HttpURLConnection) url.openConnection();

      connection.setRequestMethod("POST");
      connection.setRequestProperty("Content-Type", "application/json");

      responseCode = connection.getResponseCode();
      System.out.println("Response Code: " + responseCode);

      // connection.setDoOutput(true);
      // connection.setDoInput(true);

      // No need to write anything to the output stream for an empty request body


        try (BufferedReader in = new BufferedReader(new InputStreamReader(connection.getInputStream() ) ) ) {

          String inputLine;
          StringBuilder response = new StringBuilder();

          while ((inputLine = in.readLine()) != null) {
              response.append(inputLine);
          }

          System.out.println(  formatJson ( response.toString() ));
        

      } 



    } catch (Exception e) {
      System.out.println("Something happened, here read this: " + e.getMessage());
      return false;
    }
    return true;
  }



  public static String formatJson(String jsonString) {
    StringBuilder result = new StringBuilder();
    int indentLevel = 0;
    boolean inQuotes = false;

    for (char ch : jsonString.toCharArray()) {
      if (ch == '"' && (indentLevel == 0 || jsonString.charAt(jsonString.indexOf(ch) - 1) != '\\')) {
        inQuotes = !inQuotes;
      }

      if (!inQuotes) {
        if (ch == '{' || ch == '[') {
          indentLevel++;
          result.append(ch).append("\n").append(indent(indentLevel));
        } else if (ch == '}' || ch == ']') {
          indentLevel--;
          result.append("\n").append(indent(indentLevel)).append(ch);
        } else if (ch == ',') {
          result.append(ch).append("\n").append(indent(indentLevel));
        } else {
          result.append(ch);
        }
      } else {
        result.append(ch);
      }
    }

    return result.toString();
  }

  public static String indent(int level) {
    StringBuilder indentation = new StringBuilder();
    for (int i = 0; i < level; i++) {
      indentation.append("    "); // Four spaces for each level of indentation
    }
    return indentation.toString();
  }

  static int promptUserForID() {
    int size = 0;
    boolean go = true;
    Scanner in = null;
    do {
      try {
        in = new Scanner(System.in);
        System.out.print("Enter order id: ");
        size = in.nextInt();
        go = true;
        
      } catch (Exception e) {
        in = new Scanner(System.in);
        go = false;
      }

    } while (!go);

    // in.close();
    
    return size;

  } // End of promptUser


  public static String promptUserForOrderInfo(){

    String name="";
    String email="";
    int numBagels = 0;
    int numPlain = 0;
    int numSesame = 0;
    int numEverything = 0;
    int numPoppy = 0;
    int numCinSug = 0;
    int numCreamBagels = 0;
    int cost = 0;
    boolean validInput = true;


    do {
      try {
      System.out.print("Enter order name: ");
      name = scan.nextLine();

      System.out.print("Enter order email: ");
      email = scan.nextLine();

      System.out.print("Enter the number of plain bagels: ");
      numPlain = scan.nextInt();
            
      System.out.print("Enter the number of sesame bagels: ");
      numSesame = scan.nextInt(); // double check spelling for this

      System.out.print("Enter the number of everything bagels: ");
      numEverything = scan.nextInt();

      System.out.print("Enter the number of cinnamon sugar bagels: ");
      numCinSug = scan.nextInt();

      System.out.print("Enter the number of creame cheese bagels: ");
      numCreamBagels = scan.nextInt();


      validInput = true;

      numBagels = numPoppy + numCinSug + numCreamBagels + numEverything + numPlain + numSesame;

      int numBagelsWithoutCCBagels = numBagels - numCreamBagels;

      int groupsOfThree = (int) Math.floor(numBagelsWithoutCCBagels / 3);
      int remainder = numBagelsWithoutCCBagels % 3;

      cost = (groupsOfThree * 5) + (remainder * 2) + (numCreamBagels * 3);
    


    } catch (Exception e) {
      System.out.println("Bruh what happened here");
      validInput = false;
      scan.nextLine();
    }
      



    } while (!validInput);


    String jsonString = "{" +
        ""name":"" + name + ""," +
        ""email":"" + email + ""," +
        ""num_bagels":" + numBagels + "," +
        ""num_plain":" + numPlain + "," +
        ""num_seseme":" + numSesame + "," + // spelled wrong on purpose
        ""num_everything":" + numEverything + "," +
        ""num_poppy_seed":" + numPoppy + "," +
        ""num_cin_sugar":" + numCinSug + "," +
        ""num_cream_bagels":" + numCreamBagels + "," +
        ""total_cost":" + cost +
        "}";





    return jsonString;

  }




}`


    const [selectedFile, setSelectedFile] = useState(DatabaseDotJava)



    return (
        <div style={pageStyle} className='sortPageDiv'>
            <IconButton style={{ position: 'absolute', top: '0', left: '0', margin: '1%', colo: "black" }}
                onClick={() => { window.history.back(); }}
            >
                <ArrowBackIcon></ArrowBackIcon>
            </IconButton>



            <div className='sort-desc-div'>
                <h1 style={titleStyle} className='sort-title'>Database Managment System</h1>
                <p style={descriptionStyle} className='sort-desc'>
                    Java program that executes a variety of cURL commands, using the HttpURLConnection class.
                    The cURL commands include GET, POST, and DELETE. 
                </p>

            </div>

            <div className='code-container'>
                <div className='code-header'>
                    <div className='filename-box'>
                        <Button style={{ borderTopLeftRadius: '10px'}} size="medium" class="button" onClick={() => { setSelectedFile(DatabaseDotJava) }}>DataBase.java </Button>





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


export default DbManager;