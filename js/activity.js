define(function (require) {
    var activity = require("sugar-web/activity/activity");

    // Manipulate the DOM only when it is ready.
    require(['domReady!'], function (doc) {

        // Initialize the activity.
        activity.setup();

        var requestAnimationFrame = window.requestAnimationFrame ||
            window.mozRequestAnimationFrame ||
            window.webkitRequestAnimationFrame ||
            window.msRequestAnimationFrame;

        function Stopwatch() {
            this.elem = document.getElementById('stopwatch-01');
            this.counter = this.elem.querySelector('.counter');
            this.running = false;
            this.previousTime = Date.now();
            this.tenthsOfSecond = 0;
            this.seconds = 0;
            this.minutes = 0;

            var that = this;

            this.startStopButton = this.elem.querySelector('.start-stop-button');
            this.startStopButton.onclick = function () {
                that.onStartStopClicked();
            }

            this.resetButton = this.elem.querySelector('.reset-button');
            this.resetButton.onclick = function () {
                that.onResetClicked();
            }
        }

        Stopwatch.prototype.onStartStopClicked = function () {
            if (!this.running) {
                this.running = true;
                this.tick();
            }
            else {
                this.running = false;
            }
            this.updateButtons();
        }

        Stopwatch.prototype.onResetClicked = function () {
            this.tenthsOfSecond = 0;
            this.seconds = 0;
            this.minutes = 0;
            if (!this.running) {
                this.updateView();
            }
        }

        Stopwatch.prototype.tick = function () {
            if (!this.running) {
                return;
            }

            var currentTime = Date.now();

            if ((currentTime - this.previousTime) > 100) {
                this.previousTime = currentTime;
                this.update();
                this.updateView();
            }

            requestAnimationFrame(this.tick.bind(this));
        }

        Stopwatch.prototype.update = function () {
            this.tenthsOfSecond += 1;
            if (this.tenthsOfSecond == 10) {
                this.tenthsOfSecond = 0;
                this.seconds += 1;
            }
            if (this.seconds == 60) {
                this.seconds = 0;
                this.minutes += 1;
            }
        }

        Stopwatch.prototype.updateView = function () {
            this.counter.innerHTML = this.minutes + ':' + this.seconds + '.' +
                this.tenthsOfSecond;
        }

        Stopwatch.prototype.updateButtons = function () {
            if (this.running) {
                this.startStopButton.innerHTML = "Stop";
            }
            else {
                this.startStopButton.innerHTML = "Start";
            }
        }

        var stopwatch = new Stopwatch();

    });

});
