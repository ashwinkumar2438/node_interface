let readline=require('readline');
let {rl_interface,promptdata,length,current,result,fireQuestion,validator}=require("./private_keys");

class InterFacer{
    constructor(){    
        this.errorstatement="Wrong input format provided.";
        this[rl_interface]=readline.createInterface({
            input: process.stdin,
            output : process.stdout
          });

    }
    init(data=[]){
        if(data.constructor!==Array)throw new Error("node-interface-readline: Data provided is in wrong format. Please verify!")
        this[promptdata]=data;
        this[length]=data.length;
        this[result]={};
    }


    promptUser(){
            if(!this[promptdata])return Promise.reject("Please initialize with prompt data.");
            if(!this[validator](this[promptdata]))return Promise.reject("Prompt data is not correct, please refer the doc!");
            
            this[current]=0;
   
            return new Promise((res,rej)=>{
                this[fireQuestion](res,rej);
            })
     
    }
   [fireQuestion](resolve,reject){
            let data=this[promptdata][this[current]];

            this[rl_interface].question(data.prompt,(response)=>{
                if(!data.validator || data.validator.test(response)){
                    this[result][data.value]=response;
                    this[current]++;
                    if(this[current]<this[length])this[fireQuestion](resolve,reject);
                    else {
                        resolve(this[result]);
                    }   
                }
                else {
                    reject(data.error?data.error:this.errorstatement);
                }
            })
   }

   [validator](data){
       if(!data)return false;
       if(data.constructor!==Array)return false;
       if(!data.length)return false;
       return data.every(ques=>{
                if((ques.prompt && ques.prompt.constructor===String) &&
                   (ques.prompt && ques.prompt.constructor===String) ) return true;
                else return false;   
       })
   }

   close(){
        this[rl_interface].close();
   }
    
}  

module.exports=InterFacer;