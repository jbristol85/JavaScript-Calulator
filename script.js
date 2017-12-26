var calculator = {
    displayValues: [],
    // calculateValues: this.values,
    evalValues: [],
    currentValues: [],
    total: "",
    displayInputs: function() {
        // for(var i=0;i<this.values.length;i++){
        // console.log(this.values.join(""));
        document.getElementById("inputDisplay").innerHTML = this.displayValues.join('');

    },
    calculations: function() {
        // console.log("Calculations function")
        var operatorMap = {
            "*": "multiply",
            "/": "divide",
            "+": "add",
            "-": "subtract",
            "^": "exponent"
        };
        var operators = {
            multiply: function(num1, num2) {
                console.log("multiply function");
                return num1 * num2;
            },
            divide: function(num1, num2) {
                if(num2 == 0){
                    alert("err");
                }else{
                console.log("divide function");
                return num1 / num2;
                }
            },
            add: function(num1, num2) {
                console.log("add function");
                return num1 + num2;
            },
            subtract: function(num1, num2) {
                console.log("subtract function");
                return num1 - num2;
            },
            exponent: function(num1, num2) {
                console.log("exponent function");
                return Math.pow(num1, num2);
            },
        };

        // var runningTotal;
        // var beforeOperatorValues = [];
        // var operatorValues = [];

        // var index = valueString.search(regExp);
        // var z = 0;

        // function operate() {
        console.log("here1");

        // function parenthesis(){
        //      var openParen = calculator.evalValues.indexOf("(");
        //         var closeParen = calculator.evalValues.indexOf(")");
        //         console.log("parens", openParen, closeParen);
        //         var parenOperation = calculator.evalValues.slice(openParen +1, closeParen);
        //         console.log(parenOperation);
        //         // var parenOperationSplit = parenOperation.split("");
        //         var result = operate(parenOperation);
        //         // var parenOperator = regExp.exec(parenOperation);
        //         // console.log(parenOperator);
        //         // var parenOperationSplit = parenOperation.split(regExp);
        //         // console.log(parenOperationSplit);
        //         // var parenMapped = operatorMap[parenOperator[0][0]];
        //         // console.log(parenMapped);
        //         // var result = operators[parenMapped](parseInt(parenOperationSplit[0]), parseInt(parenOperationSplit[1]));
        //         console.log(result);
        //         console.log("eval",calculator.evalValues)
        //         calculator.evalValues.splice(openParen, parenOperation.length, operate(parenOperation))
        //         console.log("eval",calculator.evalValues)
        //         // calculator.values.splice(openParen, parenOperation.length - 1);
        //         // calculator.operatorsPushed.splice(calculator.operatorsPushed.indexOf("("), calculator.operatorsPushed.indexOf(")"));
        //         // calculator.evalValues.push(result);
        //         // operate();
        // }


        function operate(arr) {

            // var regExp = ^[-+]?[0-9]\d*(\.\d+)?$;
            console.log("arr", arr)
            // var valuesJoined = arr.join("");
            // console.log(valuesJoined)
            // var valueString = arr.join("");
            // console.log(valueString);


            var indexes=[]
            arr.forEach(function(value, index) {
                // console.log(value)
                if (isNaN(value)) {
                    // console.log(index);
                    indexes.push(index);
                }
                
            });
            console.log(indexes)
            

            if (indexes.length === 0) {
                console.log("no operators");
                calculator.total = calculator.evalValues;
                calculator.displayTotal();
            }
            // else if (arr.indexOf("(") > -1 && arr.indexOf(")") > -1) {
            //      var openParen = calculator.evalValues.indexOf("(");
            //     var closeParen = calculator.evalValues.indexOf(")");
            //     console.log("parens", openParen, closeParen);
            //     var parenOperation = calculator.evalValues.slice(openParen +1, closeParen);
            //     console.log(parenOperation);
            //   parenthesis(parenOperation);
            // }
            else if (calculator.evalValues.indexOf("^") > -1) {
                console.log("exponent");
                var exponentIndex = arr.indexOf("^");
                console.log(exponentIndex)
                var exponentResult = operators.exponent(parseInt(calculator.evalValues[exponentIndex - 1]), parseInt(calculator.evalValues[exponentIndex + 1]));
                console.log(exponentResult)
                calculator.evalValues.splice(exponentIndex - 1, 3,exponentResult.toString());
                // calculator.evalValues.push(exponentResult.toString())
                operate(calculator.evalValues);
            }
            else if (calculator.evalValues.indexOf("*") > -1) {
                console.log("multiply");
                var multiplyIndex = arr.indexOf("*");
                console.log(multiplyIndex)
                var multiplyResult = operators.multiply(parseInt(calculator.evalValues[multiplyIndex - 1]), parseInt(calculator.evalValues[multiplyIndex + 1]));
                console.log(multiplyResult)
                console.log(calculator.evalValues)
                // calculator.values.splice(multiplyIndex - 1, 3);
                calculator.evalValues.splice(multiplyIndex - 1, 3, multiplyResult.toString())
                console.log(calculator.evalValues)
                operate(calculator.evalValues);
            }
            else if (calculator.evalValues.indexOf("/") !== -1) {
                console.log("divide");
                var divideIndex = arr.indexOf("/");
                console.log(divideIndex)
                var divideResult = operators.divide(parseInt(calculator.evalValues[divideIndex - 1]), parseInt(calculator.evalValues[divideIndex + 1]));
                console.log(divideResult)
                calculator.evalValues.splice(divideIndex - 1, 3, divideResult.toString());
                // calculator.evalValues.push(divideResult.toString())
                operate(calculator.evalValues);
                
            }
            else if (calculator.evalValues.indexOf("+") != -1) {
                console.log("add");
                var addIndex = arr.indexOf("+");
                console.log(addIndex)
                var addResult = operators.add(parseInt(calculator.evalValues[addIndex - 1]), parseInt(calculator.evalValues[addIndex + 1]));
                console.log(addResult)
                calculator.evalValues.splice(addIndex - 1, 3, addResult.toString());
                // calculator.evalValues.push(addResult.toString())
                operate(calculator.evalValues);
            }
            else if (calculator.evalValues.indexOf("-") > -1) {
                console.log("subtract");
                var subtractIndex = arr.indexOf("-");
                console.log(subtractIndex)
                var subtractResult = operators.subtract(parseInt(arr[subtractIndex - 1]), parseInt(arr[subtractIndex + 1]));
                console.log(subtractResult)
                console.log(calculator.evalValues)
                calculator.evalValues.splice(subtractIndex - 1, arr.length, subtractResult.toString());
                // calculator.evalValues.push(subtractResult.toString())
                console.log(calculator.evalValues)
                operate(calculator.evalValues);
            }

        }
        
        operate(calculator.evalValues);
    },
    displayTotal: function(total) {
        console.log("display", calculator.total)
        document.getElementById("results").innerHTML = calculator.total;
    }
};

var keys = document.getElementsByClassName('keys');
for (var i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", function() {
        calculator.displayValues.push(event.target.id);
        calculator.currentValues.push(event.target.id);
        // calculator.calculateValues.push(event.target.id);
        calculator.displayInputs();
        // calculator.calculations();
    }, false);

}
var operator = document.getElementsByClassName('operator');
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function() {

        if (calculator.currentValues.length > 0) {
            calculator.evalValues.push(calculator.currentValues.join(""));
        }
        calculator.currentValues = [];
        calculator.displayValues.push(event.target.id);
        calculator.evalValues.push(event.target.id);
        // calculator.currentValues = [];
        // calculator.currentValue = event.target.id;
        calculator.displayInputs();

        // calculator.calculations();
    }, false);

}
document.getElementById("equals").onclick = function() {
    if (calculator.currentValues.length > 0) {
            calculator.evalValues.push(calculator.currentValues.join(""));
        }
    console.log(calculator.evalValues)
    calculator.currentValues = [];
    calculator.calculations();
};
