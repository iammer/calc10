import Ember from 'ember';

export default Ember.ObjectController.extend(Ember.Evented).extend({
    progress: 0,
    interval: 250,
    isAnalysing: false,
    pictureUploaded: false,
    showingSlider: false,
    evens: 0,
    sliderPosition: 0,
    showSamples: false,
    image: null,

    messages: [
        ["Click Analyse to begin.",1],
        ["Scanning...", 2],
        ["Identifing...",2],
        ["Counting termities...",5],
        ["Feeding catenary...",7],
        ["Performing linear analysis...",5],
        ["Performing non-linear analysis...",5],
        ["Performing linear non-analysis...",10],
        ["Doing third-order bending...",1],
        ["Doing forth-order bending...",1],
        ["Performing logarithmic analysis...",5],
        ["Doing fifth-order bending...",1],
        ["Doing sixth-order bending...",1],
        ["Dangling linemen from crossarm...",8],
        ["Rescuing linemen..",8],
        ["Doing seventh-order bending...",1],
        ["Doing eigth-order bending...",1],
        ["Reversing polarity...",10],
        ["Jiggling wires...",9],
        ["Doing ninth-order bending...",1],
        ["Closing reclosures...",7],
        ["Reclosing closures...",7]
    ],

    poleResult: function() {
        return this.get('sliderPosition')-60;
    }.property('sliderPosition'),

    resultMessage: function() {
        if (this.get('poleResult') < 0) {
            return 'Your pole failed and is sad.';
        } else {
            return 'Your pole passed and is happy.';
        }
    }.property('poleResult'),

    resultImage: function() {
        if (this.get('poleResult') < 0) {
            return '/sad.png';
        } else {
            return '/happy.png';
        }
    }.property('poleResult'),

    readyToAnalyse: function() {
        return this.get('pictureUploaded') && !this.get('analysisDone');
    }.property('analysisDone','pictureUploaded'),

    analysisDone: function() {
        return this.get('progress') >= 100;
    }.property('progress'),

    progressMessage: function() {
        var messages=this.get('messages');
        var progress=this.get('progress');
        for(var i=0;i<messages.length;i++) {
            var message = messages[i];
            if (progress < message[1]) {
                return message[0];
            } else {
                progress -= message[1];
            }
        }

        return "Done";
    }.property('progress'),

    step: function() {
        Ember.run.later(this,function() {
            var progress=this.get('progress');
            if (progress < 100) {
                this.set('progress',progress+1);
                this.trigger('step');
                this.step();
            } else {
                this.set('isAnalysing',false);
                this.set('progress',100);
            }
        },this.get('interval'));
    },

    showFaster: function() {
        return this.get('isAnalysing') && this.get('progress') > 5;
    }.property('progress','isAnalysing'),

    fasterLabel: function() {
        var label = '';
        var evens = this.get('evens');
        for(var i=0;i<evens;i++) {
            label += 'Even ';
        }

        return 'Analyse ' + label + 'Faster';
    }.property('evens'),

    progressWidth: function() {
        return 'width: ' + this.get('progress') + '%';
    }.property('progress'),

    actions: {
        analyse: function() {
            this.set('evens',0);
            this.set('progress',0);
            this.set('isAnalysing',true);
            this.step();
        },

        faster: function() {
            this.set('interval',this.get('interval')/2);
            this.set('evens',this.get('evens')+1);
        },

        showSlider: function() {
            this.set('showingSlider',true);
        },

        showSamples: function() {
            this.set('showSamples',true);
        },

        imageDropped: function(image) {
            this.set('pictureUploaded',true);
            this.set('image',image);
            this.trigger('showImage',image);
        }
    }
});
