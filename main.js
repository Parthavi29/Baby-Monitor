myStatus = '';
output = [];
alert = ""

function preload() {
    alert = loadSound("alert.wav");
}

function setup() {
    canvas = createCanvas(380, 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    video.size(380, 380);
    detector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("status").innerHTML = "Status : Object Detecting";
}

function modelLoaded() {
    console.log("Model has been ACTIVATED!!!!!!!!!!!!!!!!!");
    myStatus = true;

}

function getResults(error, results) {
    if (error) {
        console.log("error");
        console.log(error);
    } else {
        console.log("results");
        console.log(results);
        output = results;
    }
}

function draw() {
    image(video, 0, 0, 380, 380);

    if (myStatus != "") {
        r = random(255);
        g = random(255);
        b = random(255);
        detector.detect(video, getResults);
        for (var a = 0; a < output.length; a++) {

            document.getElementById("status").innerHTML = "Status : Object Detected";


            document.getElementById("status").innerHTML = "Status : Object Detected";

            objectName = output[a].label;
            percentage = floor(output[a].confidence * 100);
            height = output[a].height;
            width = output[a].width;
            positionX = output[a].x;
            positionY = output[a].y;


            fill(r, g, b);
            text(objectName + ' ' + percentage + '%', positionX, positionY);
            noFill();
            stroke(r, g, b);
            rect(positionX, positionY, width, height);
            if (objectName == "person") {
                document.getElementById("status1").innerHTML = "Baby Found";
                alert.stop();
            } else {
                document.getElementById("status1").innerHTML = "Baby Not Found";
                alert.play();
            }
        }
    }
}