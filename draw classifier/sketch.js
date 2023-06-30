//создаем все необходимые переменные
var shapeClassifier,
    canvas,
    divResult,
    inputImage,
    buttonClear;
//создаем нашу область для рисования
function setup(){
    canvas = createCanvas(400, 400);
    pixelDensity(1);

    var options = {
        task: 'imageClassification'
    };
//подгружаем нашу обученную модель нейронной связи
    shapeClassifier = ml5.neuralNetwork(options);

    const modelDetails = {
        model: '../training/model/model.json',
        metadata: '../training/model/model_meta.json',
        weights: '../training/model/model.weights.bin'
    };

    shapeClassifier.load(modelDetails, modelLoaded);
//создаем кнопочки и задаем вет фона
    background(255);
    buttonClear = createButton('Очистить');
    buttonClear.mousePressed(function(){
        background(255);
    });
//выводим готовность нашей нейросети 
    divResult = createDiv('Загрузка...');
    inputImage = createGraphics(64, 64);
}

function modelLoaded(){
    console.log('Готово!');
    classifyImage();
}
//работа нейросети
function classifyImage(){
    inputImage.copy(canvas, 0, 0, 400, 400, 0, 0, 64, 64);

    shapeClassifier.classify({ image: inputImage }, getResults);
}
//результат работы, котрый выводится снизу нашего холста
function getResults(error, results){
    if(error){
        console.error(error);
        return;
    }

    var label = results[0].label,
        confidence = nf(100 * results[0].confidence, 2, 1);
        if (100 * results[0].confidence < 50) {
            label = 'Не знаю';
        }
    
    divResult.html(`This is a ${label}, ${confidence}%`);
    classifyImage();
}
//делем так, чтобы можно было рисать на нашем полотне canvas
function draw(){
    if(mouseIsPressed){
        strokeWeight(8);
        line(mouseX, mouseY, pmouseX, pmouseY);
    }
}
