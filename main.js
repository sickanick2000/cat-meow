prediction_1 = "";
prediction_2 = "";

Webcam.set({
height: 300,
width: 350,
image_format: "png",
png_quality: 90
});
//webcam.set is a predifined funtion of webcam.js library.webcam.set is used to show the live vew of the webcam.


camera = document.getElementById("camera"); 

Webcam.attach("camera");
//webcam.attach activates the users webcam, asks for the permission and begins the showing the live camera image.

function take_snapshot()
{
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
    });

}
//webcam.snap is used to click the pictures(take).

console.log('ml5 version:', ml5.version);


classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/bEdCsqi1C/model.json',ModelLoaded);








function ModelLoaded()
{
    console.log("your model is loaded!");
}

function speak()
{
    var synth = window.speechSynthesis;
    var speak_data1 = "the first prediction is "+prediction_1;
    var speak_data2 = "and the second prediction is "+prediction_2;
    var utterthis = new SpeechSynthesisUtterance(speak_data1 + speak_data2);
    synth.speak(utterthis);
}

function check()
{
    img = document.getElementById('captured_image');
    
    classifier.classify(img, gotResult);
}

function gotResult(error, results)
{
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("result_emotion_name").innerHTML = results[0].label;
        document.getElementById("result_emotion_name2").innerHTML = results[1].label;
        prediction_1 = results[0].label;
        prediction_2 = results[1].label;
        speak();
        if(results[0].label == "happy")
        {
            document.getElementById("update_emoji").innerHTML = "&#128552;";
        }
        if(results[0].label == "sad")
        {
            document.getElementById("update_emoji").innerHTML = "&#128532;";
        }
        if(results[0].label == "angry")
        {
            document.getElementById("update_emoji").innerHTML = "&#128548;";
        }


        if(results[0].label == "happy")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128552;";
        }
        if(results[0].label == "sad")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128532;";
        }
        if(results[0].label == "angry")
        {
            document.getElementById("update_emoji2").innerHTML = "&#128548;";
        }
    }
}


