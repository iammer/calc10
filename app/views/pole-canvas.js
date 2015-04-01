import Ember from 'ember';

export default Ember.View.extend({
    tagName: 'canvas',
    classNames: ['small-centered'],
    attributeBindings: ['width', 'height'],
    ctx: false,
    width: '200',
    height: '300',

    didInsertElement: function() {
        this._super();
        Ember.run.scheduleOnce('afterRender',this,this.initCanvas);

        this.get('controller').on('step',this,function() {
            if (Math.random() < 0.3) {
                var ctx=this.get('ctx');

                var x = this.randomInt(200);
                var y = this.randomInt(300);

                ctx.beginPath();
                ctx.lineWidth = 4;
                ctx.strokeStyle = "rgba(255,255,0,.75)";
                ctx.arc(x,y,8,0, 2 * Math.PI);
                ctx.stroke();

                var a = (x<100)?1:200;
                var b = this.randomInt(300);

                ctx.beginPath();
                ctx.lineWidth = 1;
                ctx.strokeStyle = "rgba(0,0,0,.9)";
                ctx.moveTo(a,b);
                ctx.lineTo(x,y);
                ctx.stroke();
            }

        });
    },

    initCanvas: function() {
        this.set('ctx',this.$()[0].getContext('2d'));
        var image=this.get('controller.image');
        if (image) {
            this.get('ctx').drawImage(image,0,0,200,300);
        }
    },

    randomInt: function(max) {
        return Math.floor(Math.random() * max);
    }

});
