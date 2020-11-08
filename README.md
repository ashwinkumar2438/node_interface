# A readline interface creator

## Introduction

node-interface-readline is created on top of 'readline' to interact with the user and take multiple inputs. You can specify the set of questions and values you would prefer from the user. The response will be provided back with a promise wrapper with the result providing all the entered values by the user. Please go through the documentation for further details.


## Documentation

### Usage

The package imports a class which can be used to instantiate your input output readline interface:

```javascript
    var Interface=require("node-interface-readline");

    var my_interface=new Interface();

```

Once the interface is instantiated, you need to provide the dataset containing the questions ('prompt') and key values ('value') you want in response:

```javascript
     my_interface.init([
         { 
             prompt:"what's your name: ",
             value:"name" //value will be provided as key in response.  
         },
         { 
             prompt:"what's your passion: ",
             value:"passion"   
         }
         ])   
```
You can provide additional parameters like, 'validator' to validate the input provided by the user and also 'error' for a custom error message:

```javascript
     my_interface.init([
         { 
             prompt:"what's your name: ",
             value:"name",
             validator:/.+/,
             error:"Please provide your name."   
         },
         { 
             prompt:"what's your passion: ",
             value:"passion"  
         }
         ])   
```

Now you can prompt the user to fetch a response which will be received by the promise in success response or catched with error message:

```javascript
     my_interface.promptUser().then(res=>{
         console.log(`Hi ${res.name}, nice you to know that you're interested in ${res.passion}`);
     }).catch(err=>{
         console.log(err);
     })   
```

You can change the questions again using 'init' api. Once the interaction is over, you need to close the interface using:

```javascript
     my_interface.close();
```

Please make sure to not run two instances of the readline interface at the same time. Before instantiating another readline interface close other interfaces using close API.

Once you install the package, you can run the below sample code:
```javascript

const Interface=require("node-interface-readline");

let repeatdata=[ //for repeat prompt
    {prompt:"Do you wanna try again? 'yes':'no' :",value:"prompt"}
]
let promptdata=[  //for main prompt questions list.
{ 
    prompt:"what's your name: ",
    value:"name",
    validator:/.+/,
    error:"Please provide your name."   
},
{ 
    prompt:"what's your passion: ",
    value:"passion",
    validator:/.+/    
}]

const my_interface=new Interface();  //instantiating interface.

my_interface.errorstatement="Please provide a valid input."; //default error message to fallback to in case there is no custom error message.

let startFlow=()=>{
    my_interface.init(promptdata); //providing prompt data.

    my_interface.promptUser().then((response)=>{ //response with the input data provided by user.
            console.log(`Hi ${response.name}, nice you to know that you're interested in ${response.passion}`);
            my_interface.init(repeatdata);  //updating interface prompt question list.
            return my_interface.promptUser(); 

        }).then((response)=>{ 
            if(response.prompt==="yes")startFlow(); //callback. 
            else {
                my_interface.close();//close the interface.
                }
        }).catch(err=>{
            console.warn("ERROR!!!",err);
            my_interface.close(); //in all cases interface instance has to be closed.
        })
}
startFlow();
```

### APIs:

#### <b> .init( promptdata )</b>

init is called to update data with prompt questions to be asked. promptdata needs to be an array of objects with each object having two important properties 'prompt' & 'value'. 

There can be additional values provided, such as 'validator' to validate the input provided and also the custom error messages for each response can be added using property 'error' :

* 'prompt': <code>required {String}</code>
* 'value': <code>required {String}</code>
* 'validator': <code>optional {RegExp}</code>
* 'error': <code>optional {String}</code>

in cases of error, if custom error message is not provided, default error message will be referred, which can be customized using:

```javascript
        my_interface.errorstatement="my common error message.";
```

#### <b> .promptUser()</b>

promptUser is called to prompt the questions to the user. 

init API has to be called before executing this API. This API takes use of prompt data and creates the questions to be prompted to the user for inputs, once the list of questions end, the result will be provided back with promise wrapper.

In case of any error or validation fails, Promise.reject() will be called with relevant error message. 

* return value :<code> Promise <br>
                                &lt;Resolve: result object &gt;<br>
                                &lt;Reject: provided error message or default </code>

#### <b> .close()</b>                                

close is called to close the readline interface for input output communication which was opened at the time of instantiation. Once closed, it can't be reopened.






