var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();
function start(){
    document.getElementById("text_box").innerHTML = "";
    recognition.start();
}
recognition.onresult = function(event){
    console.log(event);
    var word = event.results[0][0].transcript;
    document.getElementById("text_box").innerHTML = word;
    if (word == "take a selfie" || word == "take my selfie") {
        speak();
    }
}
function speak(){
    var synth = window.speechSynthesis;
    var speechData = "It will take 5 seconds to take your selfie";
    var utterThis = new SpeechSynthesisUtterance(speechData);
    synth.speak(utterThis);

    Webcam.attach(camera);
    setTimeout(function (){
        takeSelfie();
        save();
    }, 5000);
}
var camera = document.getElementById("camera");
Webcam.set({
    height : 250,
    width : 360,
    image_format : "png",
    png_quality : 90
});
function takeSelfie(){
    Webcam.snap(function (web_uri){
        document.getElementById("result").innerHTML = "<img id='my_selfie' src='" + web_uri + "' >";
    });
}
function save(){
    link = document.getElementById("link");
    image = document.getElementById("my_selfie").src;
    link.href = image;
    link.click();
}