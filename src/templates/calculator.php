<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
    <title>Calculator</title>
    <link href='//fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>
    <link href='../src/resources/css/style.css' rel='stylesheet' type='text/css'>
    <script src='../src/resources/js/vendor/jquery.js' type="text/javascript"></script>
    <script src='../src/resources/js/vendor/underscore.js' type="text/javascript"></script>
    <script src='../src/resources/js/calculator.js' type="text/javascript"></script>
</head>
<body>
	<div id="root">
        <h1>Calculator</h1>

        <div id="calculator">
            <div id="row-0" class="row">
                <input id="screen" val=""/>
            </div>
            <div id="row-1" class="row">
                <button id="7" class="int">7</button>
                <button id="8" class="int">8</button>
                <button id="9" class="int">9</button>
                <button id="plus" class="operator">+</button>
                <button id="minus" class="operator">-</button>
            </div>
            <div id="row-2" class="row">
                <button id="4" class="int">4</button>
                <button id="5" class="int">5</button>
                <button id="6" class="int">6</button>
                <button id="multiply" class="operator">*</button>
                <button id="divide" class="operator">/</button>
            </div>
            <div id="row-3" class="row">
                <button id="1" class="int">1</button>
                <button id="2" class="int">2</button>
                <button id="3" class="int">3</button>
                <button id="undo" class="undo"><</button>
                <button id="clear" class="clear">C</button>
            </div>
            <div id="row-4" class="row">
                <button class="hide"><span>-</span></button>
                <button id="0" class="int">0</button>
                <button class="hide"><span>-</span></button>
                <button id="dot" class="dot">.</button>
                <button id="total" class="total">=</button>
            </div>
        </div>
    </div>
</body>
</html>