import React, { Component } from "react";
import Food from "./Components/Food/Food";
import Snake from "./Components/Snake/Snake";
import Nav from "./Components/Navigation/Nav";
import Score from "./Components/Score/Score";
import Controls from "./Components/Controls/Controls";

const randomCoordinates = () => {
    let min = 1;
    let max = 99;
    let x = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;
    let y = Math.floor((Math.random() * (max - min + 1) + min) / 2) * 2;

    return [x, y];
};

const initialState = {
    food: randomCoordinates(),
    speed: 100,
    direction: "Right",
    snakeDots: [
        [2, 2],
        [4, 2]
    ]
};

const afterGameOver = {
    food: randomCoordinates(),
    speed: 100000,
    direction: "Right",
    snakeDots: [
        [2, 2],
        [4, 2]
    ]
};

class Start extends Component {
    state = initialState;

    handleStart = event => {
        event.preventDefault();
        let speedSnake = this.state.speed;
        setInterval(this.moveSnake, speedSnake);
        document.onkeydown = this.onKeyDown;
        console.log("Lllllllets get ready to rumbleee !!!");
    };

    handleStop = event => {
        event.preventDefault();
        clearInterval(this.moveSnake);
        this.setState({
            speed: 10000
        });
        console.log("Stop, speed =>", this.state.speed);
    };

    componentDidUpdate() {
        this.checkBorders();
        this.checkIfEat();
        this.checkCollapsed();
    }

    onKeyDown = e => {
        e.preventDefault();
        e = e || document.event;
        switch (e.keyCode) {
            case 37:
                this.setState({ direction: "Left" });
                break;
            case 65:
                this.setState({ direction: "Left" });
                break;
            case 38:
                this.setState({ direction: "Up" });
                break;
            case 87:
                this.setState({ direction: "Up" });
                break;
            case 39:
                this.setState({ direction: "Right" });
                break;
            case 68:
                this.setState({ direction: "Right" });
                break;
            case 40:
                this.setState({ direction: "Down" });
                break;
            case 83:
                this.setState({ direction: "Down" });
                break;
            default:
                return;
        }
    };

    keyLeft = e => {
        e.preventDefault();
        this.setState({ direction: "Left" });
    };
    keyUp = e => {
        e.preventDefault();
        this.setState({ direction: "Up" });
    };
    keyRight = e => {
        e.preventDefault();
        this.setState({ direction: "Right" });
    };
    keyDown = e => {
        e.preventDefault();
        this.setState({ direction: "Down" });
    };

    moveSnake = () => {
        let dots = [...this.state.snakeDots];
        let headSnake = dots[dots.length - 1];

        switch (this.state.direction) {
            case "Left":
                headSnake = [headSnake[0] - 2, headSnake[1]];
                break;
            case "Up":
                headSnake = [headSnake[0], headSnake[1] - 2];
                break;
            case "Right":
                headSnake = [headSnake[0] + 2, headSnake[1]];
                break;
            case "Down":
                headSnake = [headSnake[0], headSnake[1] + 2];
                break;
            default:
                return;
        }
        dots.push(headSnake);
        dots.shift();
        this.setState({
            snakeDots: dots
        });
    };

    checkIfEat = () => {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        let food = this.state.food;
        if (head[0] === food[0] && head[1] === food[1]) {
            this.setState({
                food: randomCoordinates()
            });
            this.enlargeSnake();
            this.increaseSpeed();
        }
    };

    enlargeSnake = () => {
        let newSnake = [...this.state.snakeDots];
        newSnake.unshift([]);
        this.setState({
            snakeDots: newSnake
        });
    };

    checkBorders = () => {
        let head = this.state.snakeDots[this.state.snakeDots.length - 1];
        if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0)
            this.gameOver();
    };

    checkCollapsed = () => {
        let snake = [...this.state.snakeDots];
        let head = snake[snake.length - 1];
        snake.pop();
        snake.forEach(dot => {
            if (head[0] === dot[0] && head[1] === dot[1]) {
                this.gameOver();
            }
        });
    };

    increaseSpeed = () => {
        if (this.state.speed >= 10) {
            this.setState({
                speed: this.state.speed - 5
            });
        }
        console.log(this.state.speed);
    };

    gameOver = () => {
        alert(`Game over. Try again later`);
        this.setState(afterGameOver);
        window.location.reload(false);
    };

    render() {
        return (
            <div>
                <Nav start={this.handleStart} stop={this.handleStop} />
                <Snake snakeDots={this.state.snakeDots} />
                <Food dot={this.state.food} />
                <Score score={this.state.snakeDots.length} />
                <Controls
                    left={this.keyLeft}
                    up={this.keyUp}
                    right={this.keyRight}
                    down={this.keyDown}
                />
            </div>
        );
    }
}
export default Start;
