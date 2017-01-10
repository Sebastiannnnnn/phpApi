<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8"/>
    <title>Prime number</title>
    <link href='//fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>
    <link href='../src/resources/css/style.css' rel='stylesheet' type='text/css'>
    <script src='../src/resources/js/vendor/jquery.js' type="text/javascript"></script>
    <script src='../src/resources/js/vendor/underscore.js' type="text/javascript"></script>
    <script src='../src/resources/js/main.js' type="text/javascript"></script>
</head>
<body>
	<div id="root">

        <div id="search" class="item">
            <h1>Check for a prime number</h1>
            <form>
                <div class="row">
                    <label>Calculation or single number</label>
                    <input type="text" name="calculation" class="calculation" placeholder="10+20-5*4/2" />
                    <button class="init">Search</button>
                </div>
                <div class="row">
                    <div class="message"></div>
                </div>
            </form>
        </div>

        <div id="list" class="item">
            <h1>List prime numbers</h1>
            <form>
                <div class="row">
                    <label>How many? (restricted to 999)</label>
                    <input type="text" name="primenumber" class="primenumber"/>
                    <button class="init">Search</button>
                    <button class="clear">Clear</button>
                </div>
            </form>
            <div class="head"></div>
            <div class="body"></div>
        </div>

        <div id="between" class="item">
            <h1>Search between numbers</h1>
            <form>
                <div class="row">
                    <label>Numbers from</label>
                    <input type="text" name="start" class="start"/>
                    <label>to</label>
                    <input type="text" name="end" class="end"/>
                    <button class="init">Search</button>
                    <button class="clear">Clear</button>
                </div>
            </form>
            <div class="head"></div>
            <div class="body"></div>
        </div>
    </div>
</body>
</html>