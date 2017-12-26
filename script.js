var calculator = {
    values: [],
    // calculateValues: this.values,
    justValues: function() { return calculator.values.join("").match(/[0-9]/g) },
    operatorsPushed: [],
    total: "",
    displayInputs: function() {
        // for(var i=0;i<this.values.length;i++){
        // console.log(this.values.join(""));
        document.getElementById("inputDisplay").innerHTML = this.values.join('');

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
                console.log("divide function");
                return num1 / num2;
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


        function operate() {

            var regExp = /[^0-9\.]/g;

            var valueString = calculator.values.join("");
            console.log(valueString)


            // for (var z = 0; z < 2; z++) {

            /* if parenthesis run parenthesis function, replace those numbers in array,
            find index of parenthesis, pop out the values and operate
            send back through the function
            check for exponents if true, run exponenet function
            send back through the function
            if multiplication, run multiplication function
            send back through the function
            */


            //     console.log("here5");
            //     var mapped = operatorMap[operatorValues[0][0]];
            //     console.log("mapped", operatorMap[operatorValues[0][0]]);

            //     runningTotal = operators[mapped](beforeOperatorValues[0], beforeOperatorValues[1]);
            //     console.log(mapped, runningTotal);
            //     calculator.displayTotal(runningTotal);
            //     operatorValues.splice(0, 1);

            //     console.log(valueString);
            //     console.log(beforeOperatorValues);
            //     console.log(operatorValues[0]);
            //     console.log(index);
            //     console.log(z);
            // }
            
            console.log(valueString.indexOf(regExp))
            if (!regExp.test(valueString)) {
                console.log("no operators");
                calculator.total = valueString;
                calculator.displayTotal();
            }
            else if (valueString.match(/[\(]/g) && valueString.match(/[\)]/g)) {
                var openParen = valueString.search(/[\(]/g);
                var closeParen = valueString.search(/[\)]/g);
                console.log(openParen, closeParen);
                var parenOperation = valueString.slice(openParen +1, closeParen);
                console.log(parenOperation);
                var parenOperator = regExp.exec(parenOperation);
                console.log(parenOperator);
                var parenOperationSplit = parenOperation.split(regExp);
                console.log(parenOperationSplit);
                var parenMapped = operatorMap[parenOperator[0][0]];
                console.log(parenMapped);
                var result = operators[parenMapped](parseInt(parenOperationSplit[0]), parseInt(parenOperationSplit[1]));
                console.log(result);
                calculator.values.splice(openParen, closeParen+1);
                calculator.operatorsPushed.splice(calculator.operatorsPushed.indexOf("("), calculator.operatorsPushed.indexOf(")"));
                calculator.values.push(result.toString());
                operate();
            }
            else if (valueString.match(/[\^]/g)) {
                console.log("exponent");
                var exponentIndex = valueString.search(/[\^]/g);
                console.log(exponentIndex)
                var exponentResult = operators.exponent(parseInt(valueString[exponentIndex - 1]), parseInt(valueString[exponentIndex + 1]));
                console.log(exponentResult)
                calculator.values.splice(exponentIndex - 1, 3);
                calculator.values.push(exponentResult.toString())
                operate();
            }
            else if (valueString.match(/[\*]/g)) {
                console.log("multiply");
                var multiplyIndex = valueString.search(/[\*]/g);
                console.log(multiplyIndex)
                var multiplyResult = operators.multiply(parseInt(valueString[multiplyIndex - 1]), parseInt(valueString[multiplyIndex + 1]));
                console.log(multiplyResult)
                calculator.values.splice(multiplyIndex - 1, 3);
                calculator.values.push(multiplyResult.toString())
                operate();
            }
            else if (valueString.match(/[\/]/g)) {
                console.log("divide");
                var divideIndex = valueString.search(/[\/]/g);
                console.log(divideIndex)
                var divideResult = operators.divide(parseInt(valueString[divideIndex - 1]), parseInt(valueString[divideIndex + 1]));
                console.log(divideResult)
                calculator.values.splice(divideIndex - 1, 3);
                calculator.values.push(divideResult.toString())
                operate();
            }
            else if (valueString.match(/[\+]/g)) {
                console.log("add");
                var addIndex = valueString.search(/[\+]/g);
                console.log(addIndex)
                var addResult = operators.add(parseInt(valueString[addIndex - 1]), parseInt(valueString[addIndex + 1]));
                console.log(addResult)
                calculator.values.splice(addIndex - 1, 3);
                calculator.values.push(addResult.toString())
                operate();
            }
            else if (valueString.match(/[\-]/g)) {
                console.log("subtract");
                var subtractIndex = valueString.search(/[\-]/g);
                console.log(subtractIndex)
                var subtractResult = operators.subtract(parseInt(valueString[subtractIndex - 1]), parseInt(valueString[subtractIndex + 1]));
                console.log(subtractResult)
                calculator.values.splice(subtractIndex - 1, 3);
                calculator.values.push(subtractResult.toString())
                operate();
            }


            // var parenArray = [];
            // var parenOperator = regExp.exec(parenOperation);
            // console.log(parenOperation);
            // var parenOperatorMatch = parenOperation.match(regExp);
            // console.log(parenOperatorMatch)
            // var parenOperatorSearch = parenOperation.search(regExp);
            // console.log(parenOperatorSearch)  
            // console.log(parenOperation[0, parenOperatorSearch-1])
            // parenArray.push(parseInt(parenOperation[0, parenOperatorSearch-1]));
            // parenArray.push(parseInt(parenOperation[parenOperatorSearch +1, parenOperation.length-1])) 
            // console.log(parenArray);   
            // if (calculator.values.join("").match(regExp)) {
            //     console.log("here2");
            //     var valueString = calculator.values.join("");

            //     beforeOperatorValues.push(parseInt(valueString.slice(0, index)));
            //     operatorValues.push(regExp.exec(valueString));
            //     beforeOperatorValues.push(parseInt(valueString.slice(index + 1, valueString.length)));
            //     //   beforeOperatorValues.push(parseInt(valueString));
            //     // var index = this.values.join("").search(regExp)
            //     console.log("here3");
            //     // console.log(z);
            //     console.log(operatorValues[z]);
            //     console.log(operatorValues.length);

            //     operate();
            // }

        }
        // alert("must close parenthesis");
        operate();
    },
    displayTotal: function(total) {
        console.log("display", calculator.total)
        document.getElementById("results").innerHTML = calculator.total;
    }
};

var keys = document.getElementsByClassName('keys');
for (var i = 0; i < keys.length; i++) {
    keys[i].addEventListener("click", function() {
        calculator.values.push(event.target.id);
        // calculator.calculateValues.push(event.target.id);
        calculator.displayInputs();
        // calculator.calculations();
    }, false);

}
var operator = document.getElementsByClassName('operator');
for (var i = 0; i < operator.length; i++) {
    operator[i].addEventListener("click", function() {
        calculator.values.push(event.target.id);
        calculator.operatorsPushed.push(event.target.id);
        calculator.currentValue = event.target.id;
        calculator.displayInputs();

        // calculator.calculations();
    }, false);

}
document.getElementById("equals").onclick = function() {

    calculator.calculations();
};
