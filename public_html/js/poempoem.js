var PoemPoem = (function() {
    'use strict';

    var poem,
        singer,
        painter,

        CHO_NOTE = {
            'ㄱ':'A', 'ㄲ':'A', 'ㄴ':'B', 'ㄷ':'C', 'ㄸ':'C',
            'ㄹ':'D', 'ㅁ':'E', 'ㅂ':'F', 'ㅃ':'F', 'ㅅ':'G', 'ㅆ':'G',
            'ㅇ':'A', 'ㅈ':'B', 'ㅉ':'B', 'ㅊ':'C', 'ㅋ':'D', 'ㅌ':'E', 'ㅍ':'F', 'ㅎ':'G',
            '!':'16P', ',':'2P', '.':'8P', ' ':'P',
        },

        OCTAVE = {
            'ㅕ':5, 'ㅓ':5, 'ㅏ':5, 'ㅑ':5,
            'ㅠ':3, 'ㅜ':4, 'ㅗ':6, 'ㅛ':7,
            'ㅐ':5, 'ㅒ':5, 
            'ㅔ':5, 'ㅖ':5,  
            'ㅘ':6, 'ㅙ':6, 'ㅚ':6,
            'ㅝ':4, 'ㅞ':4, 'ㅟ':4,
            'ㅡ':5, 'ㅢ':5, 'ㅣ':5,
        },

        DURATION = {
            'ㅕ':2, 'ㅓ':4, 'ㅏ':4, 'ㅑ':8,
            'ㅠ':2, 'ㅜ':4, 'ㅗ':4, 'ㅛ':8,
            'ㅐ':4, 'ㅒ':8, 
            'ㅔ':4, 'ㅖ':2,  
            'ㅘ':4, 'ㅙ':4, 'ㅚ':4,
            'ㅝ':4, 'ㅞ':4, 'ㅟ':4,
            'ㅡ':4, 'ㅢ':4, 'ㅣ':4,
        },

        HALF = {
            '':'', 'ㄱ':'#', 'ㄲ':'#', 'ㄳ':'#', 'ㄴ':'b', 'ㄵ':'b', 'ㄶ':'b', 'ㄷ':'', 'ㄹ':'b',
            'ㄺ':'', 'ㄻ':'', 'ㄼ':'', 'ㄽ':'', 'ㄾ':'', 'ㄿ':'', 'ㅀ':'', 'ㅁ':'b',
            'ㅂ':'b', 'ㅄ':'b', 'ㅅ':'#', 'ㅆ':'#', 'ㅇ':'', 'ㅈ':'b', 'ㅊ':'#', 'ㅋ':'b', 'ㅌ':'#', 'ㅍ':'b', 'ㅎ':'#' 
        },

        CHO_COLOR = {
            'ㄱ':'ffaa0000', 'ㄲ':'ff990000', 'ㅋ':'ff660000',
            'ㄴ':'ff000000', 
            'ㄷ':'ff00aa00', 'ㄸ':'ff009900','ㅌ':'ff006600',
            'ㄹ':'ffaaaa00', 'ㅁ':'ff999900', 
            'ㅂ':'ff0000aa', 'ㅃ':'ff000099', 'ㅍ':'ff000066',
            'ㅅ':'ffaa00aa', 'ㅆ':'ff990099',
            'ㅇ':'ff00aaaa', 'ㅎ':'ff009999',
            'ㅈ':'ff333333', 'ㅉ':'ff666666', 'ㅊ':'ff999999',  
            '!':'ffdddddd', ',':'ffdddddd', '.':'ffdddddd', ' ':'ffdddddd',
        },

        doc = document;
        
    return { // METHODS START

    init: function() {
        PoemPoem.initSinger();
    },

    play: function(poemID) {
        PoemPoem.initPainter();
        var poemString = doc.getElementById(poemID).value;
        var poemChars = poemString.split('');

        PoemPoem.paint(poemChars);
        poem = [];
        for (var i=0; i<poemChars.length; i=i+1) {
            poem.push(PoemPoem.makeNote(poemChars[i]));
        }

        console.log(poemString, poem);
        PoemPoem.sing(poem);
    },

    makeNote: function(hanChar) {
        var disassembled = Hangul.disassemble(hanChar);
        var cho = disassembled[0];
        var jung = disassembled[1];
        var jong = disassembled[2] ? disassembled[2] : null;
        var note = [];

        if (jung) note.push(DURATION[jung]);
        if (cho) note.push(CHO_NOTE[cho]);
        if (jong) note.push(HALF[jong]);
        if (jung) note.push(OCTAVE[jung]);

        return note.join('');
    },

    sing: function(aPoem) {
        singer.playSequence('d=4,o=5,b=240:'+aPoem.join(','));
    },

    paint: function(aPoemChars) {
        // console.log(aPoemChars);
        // painter.setupBrush();
        for (var i=0; i<aPoemChars.length; i=i+1) {
            var disassembled = Hangul.disassemble(aPoemChars[i]);
            var cho = disassembled[0];
            var jung = disassembled[1];
            var jong = disassembled[2] ? disassembled[2] : null;

            painter.addBrush(CHO_COLOR[cho]);
        }
        painter.loop();
    },

    initSinger: function() {
        try {
            Th.init();
        } catch (e) {
            alert('You do not have Thunder JS Library');
            return;
        }

        singer = {
            sineFunc: function(si, len,  frq, chn, opt) {
                var fad=Math.min(1,(opt.sustain || 1)*(len-si)/len); 
                return Math.floor(fad*128*256*(
                    Math.sin(2.0 * Math.PI * frq * si  / 44100)
                ));            
            },

            playSequence: function(sequence) {
                if(Th.Inst.get("InstSimple")==null) {
                    Th.Inst.create("InstSimple", singer.sineFunc);
                }
                var score="close encounters: d=4,o=4,b=120: d, e, c, 8p, c3., 8p, 2g3";
                if (!sequence) sequence = score;
                Th.Sequence.create("CE Sine","InstSimple",sequence).play();
            },

            playOne: function(note) {
                if(Th.Inst.get("InstSimple")==null) { 
                    Th.Inst.create("InstSimple", singer.sineFunc);
                }
                Th.Inst.get("InstSimple").getSound(note).play();
            },
        };

    },

    initPainter: function() {
        try {
            painter = Processing.getInstanceById('sketch');
            painter.clean();
        } catch (e) {
            alert('You do not have ProcessingJS Library');
            return;
        }
    },

    } // METHODS END
}());

window.addEventListener("DOMContentLoaded", PoemPoem.init, true);
