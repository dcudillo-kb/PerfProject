import http from 'k6/http';
import { sleep } from 'k6';

//Scenario: Start with 20 users and introduce 10 more users and gradually reduce the users to 0
export const options = {

scenarios:{
    sample_scenario: {

        executor: 'ramping-vus', // Can be used to introduce a spike

    stages:[
        {duration: '20s', target: 10},//ramp up from 1 t0 20 users
        {duration: '30s', target: 30},//add 10 more users 
        {duration: '20s', target: 0},//ramp down to 0 users
    ],
        },

       /* another_scenario:{
            executor: 'shared-iterations',
  
        // common scenario configuration
        startTime: '10s',
        gracefulStop: '5s',
        env: { EXAMPLEVAR: 'testing' },
        tags: { example_tag: 'testing' },
  
        // executor-specific configuration
        vus: 10,
        iterations: 10,
        maxDuration: '30s',
        }*/
    },
    thresholds:{
        'http_req_duration': ['p(99)<5000'] //99% of request must complete below 5s
    },

}

export default function(){
const accessToken = 'accounttestkey'
const headers = {
    'Authorization': `${accessToken}`,
    "Content-Type": "application/json"
  };
  
const query = `query testTransaction{
    transactions(accountId:"d533e4ba-4b3c-4691-97a7-204d17199fb1"){
    batchId,     
    denomination,
    amount
    accountNumber
    description
    balance
    valueTimestamp
    insertionTimestamp
    addressBalances{ address balance }
    }
  }`;

const res = http.post("https://situat.apps.884b.cip-non-production.nonprod.internal.aws.kiwibank.co.nz/graphql/",
    JSON.stringify({ query: query }),
    {headers: headers}
  ); 

//if (res.status === 200) {
console.log(JSON.stringify(res.body));
//}
}
    

