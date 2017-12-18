var calculator = {
    values: [],
    operatorsPushed: [],
    total: "",
    displayInputs: function() {
        // for(var i=0;i<this.values.length;i++){
        // console.log(this.values.join(""));
        document.getElementById("inputDisplay").innerHTML = this.values.join('');
       
    },
    calculations:function () {
        // console.log("Calculations function")
        var operatorMap={
            "*": "multiply",
            "/":"divide",
            "+":"add",
            "-": "subtract"
        }
        var operators={
            multiply: function(num1, num2){
                console.log("multiply function")
                return num1 * num2
            },
            divide: function(num1, num2){
                console.log("divide function")
                return num1 / num2
            },
            add: function(num1, num2){
                console.log("add function")
                return num1 + num2
            },
            subtract: function(num1, num2){
                console.log("subtract function")
                return num1 - num2
            },
        };
        var runningTotal;
        var beforeOperatorValues=[];
        var operatorValues=[];
        var regExp = /[^0-9]/g;
        var index = this.values.join("").search(regExp);
        
        
          if (this.values.join("").match(regExp)){
              var valueString = this.values.join("");
              
              beforeOperatorValues.push(parseInt(valueString.slice(0, index)))
              operatorValues.push(regExp.exec(valueString));
              beforeOperatorValues.push(parseInt(valueString.slice(index+1, valueString.length)));
            //   beforeOperatorValues.push(parseInt(valueString));
            // var index = this.values.join("").search(regExp)
            
                if (operatorValues[0][0]){
                    console.log("mapped", operatorMap[operatorValues[0][0]])
                    var mapped = operatorMap[operatorValues[0][0]]
                    runningTotal = operators[mapped](beforeOperatorValues[0], beforeOperatorValues[1]);
                    console.log(mapped, runningTotal )
                this.displayTotal(runningTotal);
                }
            console.log(valueString);
            console.log(beforeOperatorValues);
            console.log(operatorValues[0]);
            console.log(index)

        }


},
displayTotal: function(total){
    document.getElementById("results").innerHTML = total;
}
};

var keys = document.getElementsByClassName('keys');
for (var i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", function() {
        calculator.values.push(event.target.id);
        calculator.displayInputs();
        // calculator.calculations();
    }, false);

}
var operator = document.getElementsByClassName('operator');
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function() {
        calculator.values.push(event.target.id);
        calculator.operatorsPushed.push(event.target.id);
        calculator.displayInputs();
        // calculator.calculations();
    }, false);

}
document.getElementById("equals").onclick = function(){
    
    calculator.calculations();
}
