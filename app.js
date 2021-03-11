const app = Vue.createApp({
    data() {
        return {
            playerChoice: "",
            chosen: "",
            rivalChoice: "",
            result: "",
            playerImageBack: true, // true => .before, false => .ready
            rivalImageBack: true, // true => .before, false => .ready
            playerReadyDisable: false,
            rivalReadyDisable: "hidden",
            playerNewGameDisable: true,
            rivalNewGameDisable: "hidden",
            isChosen: false,
            delayMS: 0,
            loggist: [['Начало раунда', 'symbol-blue']],
            logCounter: 0,
            winner: 0,
            playerWinsCount: 0,
            rivalWinsCount: 0,

            choices: ["rock", "paper", "scissors"],
            trueTable: [
                // index 0 - win
                ["rock", "scissors"],
                ["scissors", "paper"],
                ["paper", "rock"],
            ],
            winSign: [
                ["?", "инит", 'symbol-grey',],
                ["&#8679;", "Соперник", 'symbol-red',],
                ["&#8681;", "Я", 'symbol-green'],
                ["X", "Ничья", 'symbol-dark'],
            ],
        };
    },
    computed: {
        disableImgs() {
            return this.playerChoice !== "";
        },
        winnerClass() {
            return this.winSign[this.winner][2];
        },
        loggistLength() {
            console.log('this.loggist.length', this.loggist.length);
            return this.loggist.length;
        },
    },
    watch: {
        playerReadyDisable(val) {
            if (val === true && this.rivalReadyDisable === "visible") {
                return this.rivalChosen();
            }
        },
        rivalReadyDisable(val) {
            if (val === "visible" && this.playerReadyDisable === true) {
                this.actionsDelay(this.rivalChosen, 2000, 2500);
            }
        },
        playerChoice(val) {
            return val !== "" && this.rivalChoice !== "" ? this.checkWinner() : false;
        },
        rivalChoice(val) {
            return val !== "" && this.playerChoice !== ""
                ? this.checkWinner()
                : false;
        },
    },
    methods: {
        playerChosen(item) {
            this.playerChoice = item;
            this.chosen = item;
            this.loggist.unshift(["Я сделал выбор", "symbol-green"]);
            console.log(this.loggist);
        },
        rivalChosen() {
            this.rivalChoice = this.choices[this.randomizer(1, 4) - 1]; // returns 0, 1, 2
            this.loggist.unshift(["Соперник сделал выбор", "symbol-red"]);
            console.log(this.loggist);
        },
        playerReady() {
            this.playerImageBack = false;
            this.playerReadyDisable = true;
            this.loggist.unshift(["Я готов", "symbol-green"]);
            console.log(this.loggist);
        },
        rivalReady() {
            this.rivalImageBack = false;
            this.rivalReadyDisable = "visible";
            this.loggist.unshift(["Соперник готов", "symbol-red"]);
            console.log(this.loggist);
        },
        checkWinner() {
            this.loggist.unshift(["Определение победителя", "symbol-blue"]);
            this.loggist.unshift(["Мой выбор: " + this.playerChoice, "symbol-green"]);
            this.loggist.unshift(["Выбор соперника: " + this.rivalChoice, "symbol-red"]);
            console.log(this.loggist);
            for (let row in this.trueTable) {
                if (
                    this.playerChoice === this.trueTable[row][0] &&
                    this.rivalChoice === this.trueTable[row][1]
                ) {
                    this.winner = 2; // player
                    this.playerWinsCount++;
                    break;
                } else if (
                    this.rivalChoice === this.trueTable[row][0] &&
                    this.playerChoice === this.trueTable[row][1]
                ) {
                    this.winner = 1; // rival
                    this.rivalWinsCount++;
                    break;
                } else {
                    this.winner = 3; // draw
                }
            }
            this.loggist.unshift(["Победитель: " + this.winSign[this.winner][1], "symbol-blue"]);
            this.playerNewGameDisable = false;
        },
        newGame() {
            this.playerChoice = "",
                this.chosen = "",
                this.rivalChoice = "",
                this.result = "",
                this.playerImageBack = true, // true => .before, false => .ready
                this.rivalImageBack = true, // true => .before, false => .ready
                this.playerReadyDisable = false,
                this.rivalReadyDisable = "hidden",
                this.playerNewGameDisable = true,
                this.rivalNewGameDisable = "hidden",
                this.isChosen = false,
                this.delayMS = 0,
                this.loggist = [['Начало раунда', 'symbol-blue']],
                this.winner = 0;
            this.actionsDelay(this.rivalReady, 1000, 2000);
        },
        randomizer(min, max) {
            return Math.floor(Math.random() * (max - min)) + min;
        },
        actionsDelay(func, min, max) {
            delayMS = this.randomizer(min, max); // milliseconds
            setTimeout(func, delayMS);
        },
    },
    mounted() {
        this.actionsDelay(this.rivalReady, 1000, 3000);
    },
});

app.mount("#game");
