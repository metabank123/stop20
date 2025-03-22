"use strict";
class Stopwatch {
    constructor(parent) {
        this.timer = null;
        this.startTime = 0;
        this.elapsed = 0;
        this.element = document.createElement('div');
        this.element.className = 'stopwatch';
        this.element.innerHTML = `
      <div class="time-display">00:00:00</div>
      <button class="start">開始</button>
      <button class="stop">停止</button>
      <button class="reset">リセット</button>
    `;
        parent.appendChild(this.element);
        this.element.querySelector('.start').addEventListener('click', () => this.start());
        this.element.querySelector('.stop').addEventListener('click', () => this.stop());
        this.element.querySelector('.reset').addEventListener('click', () => this.reset());
    }
    formatTime(ms) {
        const date = new Date(ms);
        return `${date.getUTCHours().toString().padStart(2, '0')}:${date.getUTCMinutes().toString().padStart(2, '0')}:${date.getUTCSeconds().toString().padStart(2, '0')}`;
    }
    updateDisplay() {
        const display = this.element.querySelector('.time-display');
        display.textContent = this.formatTime(this.elapsed);
    }
    start() {
        if (!this.timer) {
            this.startTime = Date.now() - this.elapsed;
            this.timer = window.setInterval(() => {
                this.elapsed = Date.now() - this.startTime;
                this.updateDisplay();
            }, 10);
        }
    }
    stop() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }
    reset() {
        this.stop();
        this.elapsed = 0;
        this.updateDisplay();
    }
}
// 20個のストップウォッチを生成
const container = document.getElementById('stopwatchContainer');
for (let i = 0; i < 20; i++) {
    new Stopwatch(container);
}
