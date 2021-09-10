const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

export default (async function showResults(values) {
    
  await sleep(500); // simulate server latency
  console.log("i am in show result")
 // window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`);
console.log(values)

});
