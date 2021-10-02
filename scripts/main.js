//引用html元素
const canvas = document.querySelector('canvas');
const rect = canvas.getBoundingClientRect(); // The x and y offset of the canvas from the edge of the page
const ctx = canvas.getContext('2d');
const width = canvas.width = window.innerWidth; //set and get the width of canvas
const height = canvas.height = window.innerHeight;
const pi = Math.PI; //math pi

//类定义
/**
 * 点类
 */
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    /**
     * get the distance of two point
     * @param {Point} point 
     * @returns distance
     */
    distanceOf(point) {
        let x1 = this.x;
        let y1 = this.y;
        let x2 = point.x;
        let y2 = point.y;
        return Math.sqrt(Math.abs(x1 - x2) ** 2 + Math.abs(y1 - y2) ** 2);
    }
}

/**
 * 杆类
 */
class Pole {
    /**
     * 输入两点，实例一个杆
     * @param {Point} point1 
     * @param {Point} point2 
     */
    constructor(point1, point2) {
        this.point1 = point1;
        this.point2 = point2;
        this.length = this.point1.distanceOf(this.point2);
        this.angle = Math.atan(Math.abs(this.point1.y - this.point2.y) / Math.abs(this.point1.x - this.point2.x)) / pi * 180;
    }


    /**
     * 画出杆
     */
    draw() {
        ctx.fillStyle = 'black';
        ctx.beginPath();
        ctx.moveTo(this.point1.x, this.point1.y);
        ctx.lineTo(this.point2.x, this.point2.y);
        ctx.stroke();
        ctx.closePath();
    }
}

/**
 * 鼠标
 */
class Mouse {
    constructor() {
        this.point_down = new Point(0, 0);
        this.point_up = new Point(0, 0);
        this.isdown = false;
        this.isDrawing = false;
        this.start_point = new Point(0, 0);
        this.end_point = new Point(0, 0);
    }
}

//----------------------------bind events--------------------------------------

canvas.addEventListener('mousemove', e => {
    if (mouse.isDrawing === true) {
        update();
        drawLine(ctx, mouse.start_point.x, mouse.start_point.y, e.offsetX, e.offsetY);
        // mouseX = e.clientX - rect.left;
        // mouseY = e.clientY - rect.top;
    }
});

canvas.addEventListener('click', e => {
    console.log('click', e);
    let x = e.offsetX;
    let y = e.offsetY;
    //状态判断
    if (mouse.isDrawing) {
        mouse.end_point = new Point(x, y);
        poles.push(new Pole(mouse.start_point, mouse.end_point));
        update();
        mouse.isDrawing = false;
    } else {
        mouse.start_point = new Point(x, y);
        mouse.isDrawing = true;
    }
})

//--------------define functions--------------------

function drawLine(context, x1, y1, x2, y2) {
    context.beginPath();
    context.strokeStyle = 'black';
    context.lineWidth = 1;
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
    context.closePath();
}

function update() {
    //清空
    ctx.fillStyle = 'rgb(255,255,255)';
    ctx.fillRect(0, 0, width, height);
    //更新杆
    for (let i = 0; i < poles.length; i++) {
        poles[i].draw();
    }
}

//---------------主程序------------------

let mouse = new Mouse();    //实例化鼠标对象
let poles = [];             //杆数组
update();       //更新画布上的元素