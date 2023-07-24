import React, {useState} from 'react';
import '../ProjStyle.css'
import './Bagels.css'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Button } from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import { IconButton } from '@mui/material';





function Bagels(){

    const bagel_dot_py =`from flask import Flask, request, abort, url_for, redirect, session, render_template, flash, get_flashed_messages, make_response, jsonify
import json
from model import db, Order
from flask_cors import CORS
import stripe
import os
import yagmail
from datetime import datetime, timedelta
import schedule
import time
from dotenv import load_dotenv

load_dotenv()
key = os.environ.get('STRIPE_API_KEY')
stripe.api_key = key
app = Flask( __name__ )

app.secret_key = os.getenv("SESSION_KEY") # for sessions
app.config["SQLALCHEMY_DATABASE_URI"] = 'The Database'
db.init_app(app) # instead of passing 'app' to db = SQLAlchemy(app) in model.py

CORS(app, origins=["https://shmuelsmondaybagels.com",
"https://shmuelsmondaybagels.com",
"https://www.shmuelsmondaybagels.com",
"http://localhost:3000",
"https://localhost:3000",
"http://127.0.0.1:3000",
"http://10.0.0.153:3000",
"http://10.1.10.153:5001",
"https://10.0.0.153:3000"]
)


@app.cli.command('initdb')
def initdb_command():
    db.drop_all()
    db.create_all() # creates tabel for all defined models
    print('Initialized the database.')


# Gets a single order
@app.route("/order/<_id>", methods=["GET"])
def get_order(_id):
    order = Order.query.get(_id)
    if order is not None:
        return order.to_dict()
    else:
        return make_response("Not in DB", 404)


# Gets all orders in DB
@app.route("/orders/", methods=["GET"])
def get_all_orders():
    all_orders = Order.query.all()

    if all_orders is not None:
        all_orders_list = [ order.to_dict() for order in all_orders]
        return json.dumps(all_orders_list)
    else:
        abort(404)



# Adds order to DB
# this route needs to be different than my React /orders one, so i added a slash, was getting 500 error
@app.route("/order/", methods=["POST"])
def add_order():
    order_info = request.get_json()

    name = order_info["name"]
    email = order_info["email"]
    _date = datetime.now()
    num_bagels = order_info["num_bagels"]

    num_plain = order_info["num_plain"]
    num_sesame = order_info["num_seseme"]
    num_everything = order_info["num_everything"]
    num_poppy_seed = order_info["num_poppy_seed"]
    num_cin_sugar = order_info["num_cin_sugar"]
    order_cost = order_info["total_cost"] # name in js file is in " "


    new_order = Order(name=name, email=email, date_ordered=_date, num_bagels=num_bagels,
    num_plain=num_plain, num_sesame=num_sesame, num_everything=num_everything,
    num_poppy_seed=num_poppy_seed, num_cin_sugar=num_cin_sugar, order_cost=order_cost )

    db.session.add(new_order)
    db.session.commit()
    return make_response( jsonify(new_order.to_dict()), 201 )

# Deletes an Order
@app.route("/order/<_id>/", methods=["DELETE"])
def delete_order(_id):
    order = Order.query.filter_by( _id = _id ).first()
    db.session.delete(order)
    db.session.commit()
    return '', 204

# gets client publishable api key thingy
@app.route("/config", methods=["GET"])
def get_api_key():
    api_key = {
        "publishableKey" : 'pk_live_51NCkM8I8OaFVzBusmOLBipTXzwTwwExOcfrsGelxGVY3L8AkEeAvQ7AKiXcr9CH3uMrcbnsJXj5ewcTowYL5Uuz200kTG7OH9c'
    }
    return api_key

# gets client secret jawn
@app.route("/create-payment-intent/", methods=["POST"])
def create_payment_intent():

    try:
        data = request.get_json()
        currency = data['currency']
        amount = data['amount']
        amount *= 100

        payment_intent = stripe.PaymentIntent.create(
            amount=amount,
            currency=currency,
            payment_method_types = ["card","link","cashapp"]
        )

        return_dict = {
            "clientSecret" : payment_intent.client_secret
        }

        return return_dict


    except Exception as e:
        return jsonify({"error" : { 'message' : str(e) }}), 500




@app.route('/webhook', methods=['POST'])
def webhook_received():
    # You can use webhooks to receive information about asynchronous payment events.
    # For more about our webhook events check out https://stripe.com/docs/webhooks.
    webhook_secret = os.getenv('STRIPE_WEBHOOK_SECRET')
    request_data = json.loads(request.data)

    if webhook_secret:
        # Retrieve the event by verifying the signature using the raw body and secret if webhook signing is configured.
        signature = request.headers.get('stripe-signature')
        try:
            event = stripe.Webhook.construct_event(
                payload=request.data, sig_header=signature, secret=webhook_secret)
            data = event['data']
        except Exception as e:
            return e
        # Get the type of webhook event sent - used to check the status of PaymentIntents.
        event_type = event['type']
    else:
        data = request_data['data']
        event_type = request_data['type']
        # data_object = data['object']

    # there are a bunch of payment_intent.<somethings> ( processing, cancelled, ect )
    if event_type == 'payment_intent.succeeded':
        print('💰 Payment received!')
        # Fulfill any orders, e-mail receipts, etc
        # To cancel the payment you will need to issue a Refund (https://stripe.com/docs/api/refunds)
    elif event_type == 'payment_intent.payment_failed':
        print('❌ Payment failed.')
    return jsonify({'status': 'success'})



def email_orders(last_weeks_orders):

    document = "orders.txt"

    total_bagels = 0
    total_plain = 0
    total_seseme = 0
    total_everything = 0
    total_poppy = 0
    total_cin_sugar = 0
    total_cost = 0
    with open("orders.txt", "w") as _file:
        _file.write("Good Morning Sam. Here are the Orders\n\n")
        for order in last_weeks_orders:
            total_cost += order.order_cost
            total_bagels += order.num_bagels
            total_plain += order.num_plain
            total_seseme += order.num_sesame
            total_everything += order.num_everything
            total_poppy += order.num_poppy_seed
            total_cin_sugar += order.num_cin_sugar


            _file.write( f" Name: {order.name}")
            _file.write( f" Date: {order.date_ordered}")
            _file.write( f" Order Amount: \${order.order_cost}") 
            _file.write( f" Plain: {order.num_plain}") 
            _file.write( f" Seseme: {order.num_sesame}")
            _file.write( f" Everything: {order.num_everything}")
            _file.write( f" Poppy: {order.num_poppy_seed}")
            _file.write( f" Cinnamon Sugar: {order.num_cin_sugar}")
            _file.write("________________________________________________________")
        
        _file.write(f"Total Bagels: {total_bagels}")
        _file.write(f"Total Plain: {total_plain}")
        _file.write(f"Total Seseme: {total_seseme}")
        _file.write(f"Total Everything: {total_everything}")
        _file.write(f"Total Poppy Seed: {total_poppy}")
        _file.write(f"Total Cinnamon Sugar: {total_cin_sugar}")
        _file.write(f"Revenue this week: \${total_cost}")

    

    try:
        yag = yagmail.SMTP("samskosherbagels@gmail.com", "some_secret_code : )")

        body = "These are the Weekly Orders : )"
        yag.send(
            to='glulu4444@gmail.com', 
            subject="Bagel orders", 
            contents=body,
            attachments=document,
        )

        print("Email sent successfully")
    except BaseException as e:
        print("Email not sent: ", e)

@app.route('/send-orders', methods=['POST'])
def send_orders():

    now = datetime.now()
    last_monday = now - timedelta(days=6)

    all_orders = Order.query.all()

    last_weeks_orders = []
    for order in all_orders:
        if ( order.date_ordered < now) and ( order.date_ordered > last_monday ):
            last_weeks_orders.append(order)

    
    email_orders(last_weeks_orders)
    return jsonify({"message": "Emails ordered"}), 201

if __name__ == '__main__':
    app.run()

    `

    const model_dot_py = `from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

# note this should only be created once per project
db = SQLAlchemy()


class Order(db.Model):
    _id = db.Column( db.Integer, primary_key=True, autoincrement=True)
    name = db.Column ( db.String(100), nullable=False )
    email = db.Column ( db.String(100), nullable=False )
    date_ordered = db.Column ( db.DateTime, nullable=False )
    num_bagels = db.Column ( db.Integer, nullable=False )

    num_plain = db.Column ( db.Integer, nullable=True )
    num_sesame = db.Column ( db.Integer, nullable=True )
    num_everything = db.Column ( db.Integer, nullable=True )
    num_poppy_seed = db.Column ( db.Integer, nullable=True )
    num_cin_sugar = db.Column ( db.Integer, nullable=True )
    order_cost = db.Column ( db.Integer, nullable=False)




    # bagel_type = db.Column( db.String(100), nullable=False )
    # num_dozen = db.Column ( db.Integer, nullable=False )

    def __init__( self, name, email, date_ordered, num_bagels, num_plain, num_sesame, num_everything, num_poppy_seed, num_cin_sugar, order_cost ):
        self.name = name
        self.email = email
        self.date_ordered = date_ordered
        self.num_bagels = num_bagels

        self.num_plain = num_plain
        self.num_sesame = num_sesame
        self.num_everything = num_everything
        self.num_poppy_seed = num_poppy_seed
        self.num_cin_sugar = num_cin_sugar
        self.order_cost = order_cost


    def to_dict(self):
        return {
            "id" : self._id,
            "name" : self.name,
            "email" : self.email, 
            "date_ordered" : str(self.date_ordered),
            "num_bagels" : self.num_bagels, 
            "num_plain" : self.num_plain, 
            "num_sesame" : self.num_sesame, 
            "num_everything" : self.num_everything,
            "num_poppy_seed" : self.num_poppy_seed,
            "num_cin_sugar" : self.num_cin_sugar,
            "order_cost" : self.order_cost,
        }


    # name, number of bagels, 5 boxes come up 

    `
    const paymentDotJs = `import React, { useState } from 'react';

import { useElements, useStripe, PaymentElement } from "@stripe/react-stripe-js";
import { useNavigate } from 'react-router-dom';


import './Payment.css'

function Payment(props) {
    const { cost, name, email, numPlain, numSeseme, numEv, numPoppy, numCinSug, numBagels } = props.state;




    const elements = useElements();
    const stripe = useStripe();
    const navigate = useNavigate()

    const clientSecret = props.prop.clientSecret
    const [message, setMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [paymentID, setPaymentID] = useState(null);

    const backendAddress = process.env.REACT_APP_BACKEND_URL;


    const blue = '#5da2da' // blue
    const green = '#87C38F'



    const buttonStyle = {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: blue,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        alignSelf: 'center',
    }

    const ProceedButtonStyle = {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: green,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        alignSelf: 'center',
    }

    const handleGoBackButtonClick = () => {

        navigate('/confirm-order', {
            state: {
                cost: cost,
                name: name,
                email: email,
                numPlain: numPlain,
                numSeseme: numSeseme,
                numEv: numEv,
                numPoppy: numPoppy,
                numCinSug: numCinSug,
                numBagels: numBagels
            }
        })

    }

    const submitOrder = (event) => {
        event.preventDefault();


        // let address = "http://127.0.0.1:5001"

        // if (isMobile) {
        //     address = "http://10.0.0.153:5001" // the nextwork one, for testing use 
        //     console.log("on mobile");
        //     console.log(address);
        // }


        fetch(\${backendAddress}/order/, {
            method: "post",
            // mode: 'no-cors',
            headers: { "Content-Type": "application/json; charset=UTF-8" }, //"Content-Type: application/json"
            body: JSON.stringify({
                'name': name,
                'email': email,
                'num_bagels': numBagels,
                'num_plain': numPlain,
                "num_seseme": numSeseme,
                "num_everything": numEv,
                "num_poppy_seed": numPoppy,
                "num_cin_sugar": numCinSug,
                "total_cost": cost,
                "payment_id": paymentID,
            })
        })
            // fetch resolves to
            .then((response) => {
                console.log(response)
                return response.json();
            })
            // needed because above then returns
            .then((result) => {
                console.log(result);
            })
            .catch(() => {
                console.log("Error posting new order");
            });


    }



    const handleSubmit = async (event) => {
        event.preventDefault();


        stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
            // console.log("pay intent",paymentIntent);
            setPaymentID(paymentIntent.id)
            switch (paymentIntent.status) {
                case "succeeded":
                    setMessage("Payment succeeded!");
                    break;
                case "processing":
                    setMessage("Your payment is processing.");
                    break;
                case "requires_payment_method":
                    setMessage("Your payment was not successful, please try again.");
                    break;
                default:
                    setMessage("Something went wrong...");
                    break;
            }

        });


        submitOrder(event);






        elements.submit()


        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);







        const { error } = await stripe.confirmPayment({
            clientSecret,
            elements,
            confirmParams: {
                // return_url: \${address}/success,
                return_url: \${window.location.origin}/success,
                receipt_email: email, // add email for reciepyt
            },
        });




        // This point will only be reached if there is an immediate error when
        // confirming the payment. Otherwise, your customer will be redirected to
        // your return_url. For some payment methods like iDEAL, your customer will
        // be redirected to an intermediate site first to authorize the payment, then
        // redirected to the return_url.
        if (error.type === "card_error" || error.type === "validation_error") {
            setMessage(error.message);
        } else {
            console.log(error);
            setMessage("An unexpected error occurred.");
        }

        setIsLoading(false);




    }

    const paymentElementOptions = {
        layout: "tabs" // accordian or 
    }

    return (
        <div className='outerDiv'>
            <div className='payDiv'>
                <h2 className='title'>Payment</h2>

                <form className='payForm' onSubmit={handleSubmit}>

                    <PaymentElement options={paymentElementOptions} />

                    <br />

                    <div style={{
                        display: "flex",
                        justifyContent: "center"
                    }}
                    >
                        <button style={ProceedButtonStyle} id="button" type="submit" value="Submit" disabled={isLoading || !stripe || !elements}>Pay \${cost}</button>
                    </div>

                    <br />
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center'
                    }}>
                        <button style={buttonStyle} onClick={handleGoBackButtonClick}>Back</button>
                    </div>
                    {message && <div id="payment-message">{message}</div>}


                </form>
            </div>
        </div>

    );
}

export default Payment;
`

    const paymentPageDotJs = `import React, { useEffect, useState } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import Payment from './Payment';
import { useLocation } from 'react-router-dom';


function PaymentPage() {

    const location = useLocation();
    const { cost, name, email, numPlain, numSeseme, numEv, numPoppy, numCinSug, numBagels } = location.state;

    const state = {
            cost: cost,
            name: name,
            email: email,
            numPlain: numPlain,
            numSeseme: numSeseme,
            numEv: numEv,
            numPoppy: numPoppy,
            numCinSug: numCinSug,
            numBagels: numBagels
    }

    // const [publishableKey, setPublishableKey] = useState("");
    const [clientSecret, setClientSecret] = useState("");
    const [options, setOptions] = useState({});
    const [stripePromise, setStripePromise] = useState(null);
    // let primaryAddress = "http://127.0.0.1:5001";
    // let backupAddress = "http://10.0.0.153:5001";


    // "http://127.0.0.1:5001/config"
    const backendAddress = process.env.REACT_APP_BACKEND_URL;

    // console.log(process.env);
    // console.log(backendAddress);
    
   

    useEffect(() => {
        const fetchData = async () => {
            try {




                const configResponse = await fetch(\${ backendAddress }/config);
    const { publishableKey } = await configResponse.json();

    // console.log("publishableKey",publishableKey);

    if (!publishableKey) {
        console.log("publishable key is null");
        return;
    }
    // setPublishableKey(publishableKey);

    const paymentIntentResponse = await fetch(\${backendAddress}/create-payment-intent/, {
        method: "post",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            // paymentMethodType: "card",
            // payment_method: "card",
            currency: "usd",
            amount: cost,
        })
    });
    const { clientSecret } = await paymentIntentResponse.json();
    console.log("here 4");

    if (!clientSecret) {
        console.log("cleint secret came back null:", clientSecret);
        return;
    }
    setClientSecret(clientSecret);





    const appearance = {
        theme: 'stripe',
    };
    setOptions({
        clientSecret,
        appearance,
    });
    const stripe = await loadStripe(publishableKey);
    setStripePromise(() => Promise.resolve(stripe));
    console.log("here 6");

} catch (error) {
    console.log("Error fetching data:", error);
}
        };

fetchData();
    }, );

if (!stripePromise) {
    return <div>Loading...</div>;
}

return (
    <div>
        {clientSecret && stripePromise && (
            <Elements stripe={stripePromise} options={options}>
                <Payment prop={options} cost={cost} state={state} />

            </Elements>
        )}
    </div>
);
}

export default PaymentPage;


// disabled={isLoading || !stripe || !elements}
`

    const formDotJs = `import styles from './Form.module.css'
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';





function Form({ handleFormButtonSubmit, props } ) {
    // console.log("from form, porps", props);
    // console.log(props);

    const [name, setName] = useState(props._name || '');
    const [email, setEmail] = useState(props._email || '');
    const [numPlain, setNumPlain] = useState(props._numPlain || 0);
    const [numSeseme, setNumSeseme] = useState(props._numSeseme || 0);
    const [numEv, setNumEv] = useState(props._numEv || 0);
    const [numPoppy, setNumPoppy] = useState(props._numPoppy || 0);
    const [numCinSug, setNumCinSug] = useState(props._numCinSug || 0);
    const [numBagels, setNumBagels] = useState(props._numBagels || 0);
    const [showError, setShowError] = useState(false)
    const [errorMessage,setErrorMessage] = useState("")
    let [cost, setCost] = useState(0)
    const navigate = useNavigate()


    const blue = '#5da2da' // blue
    // const darkpink = '#c96567' // blue
    // const pink = '#f78888'
    const grey = '#96ACB7'
    const green = '#87C38F'
    const [buttonColor, setButtonColor] = useState(grey)


    let buttonStyle = {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: blue,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        alignSelf: 'center',
    }

    let proceedButtonStyle = {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        backgroundColor: buttonColor,
        // backgroundColor: validButtonColor ? green : pink,
        boxShadow: '0 0 10px rgba(0, 0, 0, 0.3)',
        alignSelf: 'center',
    }
    
    // runs whenever any bagel amount is updated
    useEffect(() =>  {



        let parsedNumPlain = parseInt(numPlain);
        let parsedNumSeseme = parseInt(numSeseme);
        let parsedNumEv = parseInt(numEv);
        let parsedNumPoppy = parseInt(numPoppy);
        let parsedNumCinSug = parseInt(numCinSug);

        if (isNaN(parsedNumPlain))
            parsedNumPlain = 0;

        if (isNaN(parsedNumSeseme))
            parsedNumSeseme = 0;

        if (isNaN(parsedNumEv))
            parsedNumEv = 0;

        if (isNaN(parsedNumPoppy))
            parsedNumPoppy = 0;

        if (isNaN(parsedNumCinSug))
            parsedNumCinSug = 0;

        const numBagels = parsedNumPlain + parsedNumSeseme + parsedNumEv + parsedNumPoppy + parsedNumCinSug;
        setNumBagels(numBagels);


        let groupsOfThree = Math.floor(numBagels / 3);
        let remainder = numBagels % 3;

        let tempCost = (groupsOfThree * 5) + (remainder * 2);
        if (isNaN(tempCost)) {
            setNumBagels(0)
        }
        setCost(tempCost);




    }, [numPlain, numSeseme, numEv, numPoppy, numCinSug ]) 

    useEffect( () => {



        if ((name && email && cost)) {
            setButtonColor(green);
        }
        else{
            setButtonColor(grey);


        }
    }, [name,email,cost])


    


    const handleButtonSubmit = (event) => {
        event.preventDefault();

        if ( !(name && email && cost ) ){
            setShowError(true)
            
            if (!name && email && cost)
                setErrorMessage("name")
            else if (!name && !email && cost)
                setErrorMessage("name and email")
            else if (!name && !email && !cost)
                setErrorMessage("name, email, and desired amount")
            else if (name && !email && cost)
                setErrorMessage("email")
            else if (name && !email && !cost)
                setErrorMessage("email and desired amount")
            else if (name && email && !cost)
                setErrorMessage("desired amount")
            else if ( !name && email && !cost)
                setErrorMessage("name and desired amount")
        }

        else{
            handleFormButtonSubmit(cost, name, email, numPlain, numSeseme, numEv, numPoppy, numCinSug, numBagels);
            

        }




        // navigate('/payment');
    }



    const handleNameChange = (event) => {
        event.preventDefault();
        setName(event.target.value)
        // console.log(name);
        
    }

    
    const handleEmailChange = (e) => {
        e.preventDefault();
        setEmail(e.target.value)

    }
    const handleGoBackButtonClick = () => {
        // navigate('/disclaimer')

        navigate('/', {
            state: {
                _cost: cost,
                _name: name,
                _email: email,
                _numPlain: numPlain,
                _numSeseme: numSeseme,
                _numEv: numEv,
                _numPoppy: numPoppy,
                _numCinSug: numCinSug,
                _numBagels: numBagels
            }
        })
    }




    

    return (

        <div className={styles.orderPage}>
        
            <div className={styles.formcontainer} >
                <form method="post">
                    <br />
                    <div>
                        <label htmlFor=''>Name</label>
                        <br />
                        <input
                            required
                            id="name"
                            placeholder='  Enter Name'
                            type='text'
                            value={name}
                            onChange={handleNameChange}
                            className={styles.inputBox}
                            
                        />
                    </div>
                    <br />

                    <div>
                        <label>Email</label>
                        <br />
                        <input
                            placeholder='  Enter Email'
                            id="email"
                            value={email}
                            type='text'
                            onChange={handleEmailChange}
                            className={styles.inputBox}
                            required
                        />
                    </div>
                    <br />

                    <div >
                        <label>Total: {numBagels} bagel's for \${cost}</label>
                        <p>Bagels: 3 for $5 | 12 for $20 </p>
                        
                        <ul className={styles.bagelList}> 



                        <div className={styles.divItems}>
                            <label>Plain</label>
                            <li>
                                <input
                                className={styles.inputNumberBox}
                                type='number'
                                min={0}
                                value={numPlain}
                                onChange={(event) => {
                                    event.preventDefault();
                                    setNumPlain(event.target.value)
                                }}
                                />
                            </li>
                        </div>
                            <div className={styles.divItems}>
                                <label>Sesame</label>
                                <li>
                                    <input
                                        className={styles.inputNumberBox}
                                        type='number'
                                        min={0}
                                        value={numSeseme}
                                        onChange={(event) => {
                                            event.preventDefault();
                                            setNumSeseme(event.target.value)
                                        }}
                                    />
                                </li>
                            </div>

                            <div className={styles.divItems}>
                                <label>Everything</label>
                                <li>
                                    <input
                                        className={styles.inputNumberBox}
                                        type='number'
                                        min={0}
                                        value={numEv}
                                        onChange={(event) => {
                                            event.preventDefault();
                                            setNumEv(event.target.value)
                                        }}
                                    />
                                </li>
                            </div>

                            <div className={styles.divItems}>
                                <label>Poppy Seed</label>
                                <li>
                                    <input
                                        className={styles.inputNumberBox}
                                        type='number'
                                        min={0}
                                        value={numPoppy}
                                        onChange={(event) => {
                                            event.preventDefault();
                                            setNumPoppy(event.target.value) // !(name && email && cost)
                                        }}
                                    />
                                </li>
                            </div>
                            <div className={styles.divItems}>
                                <label>Cinnamon Sugar</label>
                                    <li>
                                        <input
                                            className={styles.inputNumberBox}
                                            type='number'
                                            min={0}
                                            placeholder=""
                                            value={numCinSug}
                                            onChange={(event) => {
                                                event.preventDefault();
                                                setNumCinSug(event.target.value)
                                            }}
                                        />
                                    </li>
                            </div>





                        </ul>
                        {/* <br /> */}
                        {/* <br /> */}
                        { showError && (
                            <>
                                <p style={{ textAlign: 'center', fontWeight:'bold' }}>Please enter your</p>
                                <p style={{ textAlign: 'center', paddingBottom: '5%', fontWeight: 'bold' }}>{errorMessage}</p>
                                {/* {color: 'red'} */}
                            </>
                        )}

                        <div className={styles.buttonContainer}>
                            <button style={proceedButtonStyle} id="button" type="submit" value="Submit" onClick={handleButtonSubmit}>Proceed to Checkout</button> 
                        </div>
                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop:"4%"
                        }}>
                            <button style={buttonStyle} onClick={handleGoBackButtonClick} >Back</button>
                            
                        </div>

  
                        <br />           
                    </div>
                    


                </form>
            </div>
            <p className={styles.disclaimer}>DISCLAIMER: Bagels were baked in a <strong> <i>meat</i></strong> oven <br/> parve oven coming soon</p>
        </div>

         

    );  



}

export default Form;
`   

    const appDotJs = `import './config-env.js'

import { Routes, Route } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import React from 'react';

import './App.css';

import Home from './Pages/Home/Home.js';
import Order from './Pages/Order/Order.js';
import PaymentPage from './Pages/Payment/PaymentPage.js';
import Success from "./Pages/Success/Success.js"
import ConfirmOrder from './Pages/ConfirmOrder/ConfirmOrder.js';

function App() {
  return (
    <>
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Helmet>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/confirm-order" element={<ConfirmOrder />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/success" element={<Success />} />
      </Routes>
    </>
  );
}

export default App;
`

    const indexDotJs = `import React from 'react';
import ReactDOM from 'react-dom/client';

import { BrowserRouter } from 'react-router-dom';


import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

window.onload = () => {
  window.scrollTo(0, 0);
}

const backendAddress = process.env.REACT_APP_BACKEND_URL;


const timer = setInterval(() => {
  let currDate = new Date();
  let daysUntilMonday = 1 + (7 - currDate.getDay()) % 7; // (3 + (7 - currDate.getDay() ) ) % 7;
  let nextMonday = new Date(currDate.getFullYear(), currDate.getMonth(), currDate.getDate() + daysUntilMonday);
  let timeUntilMonday = nextMonday - currDate; // gives time in milliseconds


    console.log("timeUntilMonday: ", timeUntilMonday);

    if (timeUntilMonday <= 1200 && timeUntilMonday >= 0) {
        console.log("in here: ", timeUntilMonday);

        fetch(\${backendAddress}/send-orders, {
            method: "post",
            headers: { "Content-Type": "application/json; charset=UTF-8" }, //"Content-Type: application/json"
            body: JSON.stringify({}),
        })
            .then((response) => {
                if (response.ok) {
                    return response.json()
                }
                else {
                    throw new Error("Error: " + response.status);
                }
            })
            .then((data) => {
                console.log(data);
            })
            .catch((error) => {
                console.log("We errored: ", error);
            })
    }

}, 1000);
console.log(timer);






const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>
);










// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
`
    
    const [selectedFile, setSelectedFile] = useState(bagel_dot_py)
    const [language, setLanguage] = useState("python")
    







    return(
        <div className='bagelPageDiv'>


        <div className='bagel-desc-div desc-div'>
                <h1 className='bagel-title'>Shmuel's Monday Bagels <IconButton href='https://shmuelsmondaybagels.com/' target="_blank"><LaunchIcon style={{ color:'#E85A4F'}} /></IconButton></h1>

                <p className='bagel-description desc-div'>
                    Shmuel's Monday Bagels is a professional website for a local bakery based in Pittsburgh. 
                    This website uses React for the frontend and Flask for the backend. Moreover, ThreeJs, the Stripe API, and Yagmail, are used to
                    add the 3D bagel, the payment page, and emailing the weekly orders to the owner, respectively. 
                </p>

                <br/>

                <p></p>
        </div>


            <div className='code-container'>
                <div className='code-header'>
                    <div className='filename-box'>
                        <Button class='button' size="small"  onClick={() => { setSelectedFile(bagel_dot_py); setLanguage("python") }}>bagel.py </Button>
                        <Button class='button' size="small" onClick={() => { setSelectedFile(model_dot_py); setLanguage("python") }}>model.py </Button>
                        <Button class='button' size="small" onClick={() => { setSelectedFile(paymentDotJs); setLanguage("javascript") }}>Payment.js </Button>
                        <Button class='button' size="small" onClick={() => { setSelectedFile(paymentPageDotJs); setLanguage("javascript") }}>PaymentPage.js </Button>
                        <Button class='button' size="small" onClick={() => { setSelectedFile(formDotJs); setLanguage("javascript") }}>Form.js </Button>
                        <Button class='button' size="small" onClick={() => { setSelectedFile(appDotJs); setLanguage("javascript") }}>App.js </Button>
                        <Button class='button' size="small" onClick={() => { setSelectedFile(indexDotJs); setLanguage("javascript") }}>index.js </Button>

                    </div>
                    
                </div>
                <br></br>
                <br></br>
                <br></br>
                <SyntaxHighlighter language={language} style={atomDark}>

                    {selectedFile}
                </SyntaxHighlighter>



            </div>

            
        </div>
        
    );
}

export default Bagels;