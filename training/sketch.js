//задаю необходимые переменные
var circles = [],
    squares = [],
    triangles = [];
    // var humans = [];
//подгружаю изображения наших фигур
function preload(){
    for(var i = 0; i < 600; i++){
        var index = nf(i + 100, 0, 0);
        circles[i] = loadImage(`../dataset/data/circle(${index}).png`);
        squares[i] = loadImage(`../dataset/data/square(${index}).png`);
        triangles[i] = loadImage(`../dataset/data/triangle(${index}).png`);
        //humans[i] = loadImage(`../dataset/data/human(${index}).png`);
    }
}

var shapeClassifier;
//создаю область обработки
function setup(){
    createCanvas(400, 400);
//параметры для обучения нейросети
    var options = {
        inputs: [64, 64, 4],
        task: 'imageClassification',
        debug: true
    };
//начинаем обучение
    shapeClassifier = ml5.neuralNetwork(options);

    for(var i = 0; i < circles.length; i++){
        shapeClassifier.addData({ image: circles[i] }, { label: 'circle' });
        shapeClassifier.addData({ image: squares[i] }, { label: 'square' });
        shapeClassifier.addData({ image: triangles[i] }, { label: 'triangle' });
    }

    shapeClassifier.normalizeData();
    shapeClassifier.train({ epochs: 100}, finishedTraining);
}
//сохраняем нашу нейроннуб сеть
function finishedTraining(){
    console.log('Training finished!');
    shapeClassifier.save();
}
