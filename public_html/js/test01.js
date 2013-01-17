var audioContext;
var audioAnalyser;
var nodes = {};
var source;

window.addEventListener('load', init, false);

function init() {
    try {
        audioContext = new webkitAudioContext();
    } catch(e) {
        alert('Not supported in this browser');
    }

    nodes.filter = audioContext.createBiquadFilter();
    nodes.volume = audioContext.createGainNode();
    nodes.delay = audioContext.createDelayNode();
    nodes.feedbackGain = audioContext.createGainNode();

    audioAnalyser = audioContext.createAnalyser();
    audioAnalyser.smoothingTimeConstant = 0.85;

    source = audioContext.createOscillator();
    source.type = 1; //0 Sine, 1 Square, 2 Sawtooth, 3 Triangle
    nodes.filter.type = 2;
    nodes.feedbackGain.gain.value = 0;
    nodes.delay.delayTime.value = 0.5;
    nodes.volume.gain.value = 0.2;

    source.connect(nodes.filter);
    nodes.filter.connect(nodes.volume);
    nodes.filter.connect(nodes.delay);
    nodes.delay.connect(nodes.feedbackGain);
    nodes.feedbackGain.connect(nodes.volume);                
    nodes.feedbackGain.connect(nodes.delay);
    nodes.volume.connect(audioAnalyser);
    audioAnalyser.connect(audioContext.destination);

    source.frequency.value = 400;  
    nodes.filter.frequency.value = 500;
    source.start(0.2);
    // for (var i=50; i<400; i=i+50) {
    //     // if (audioContext.activeSourceCount > 0) {
    //     //     source.stop(0);
    //     // }
    //     console.log('play'+i);
    //     source.frequency.value = i;  
    //     nodes.filter.frequency.value = 500;
    //     source.start(0.5);
    //     source.stop(0.1);
    // }

    // console.log('stop');
    // source.stop(3);
    

}

