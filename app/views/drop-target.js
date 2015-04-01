import Ember from 'ember';

export default Ember.View.extend({
    classNames: ['small-centered', 'dropTarget'],

    dragOver: function(e) {
        e.preventDefault();
    },

    drop: function(e) {
        e.preventDefault();
        try {
            var image=new Image();
            if (e.dataTransfer.files.length > 0) {
                var fr= new FileReader();
                var self=this;
                fr.addEventListener('load',function() {
                    image.src=fr.result;
                    self.get('controller').send('imageDropped',image); 
                });
                fr.readAsDataURL(e.dataTransfer.files[0]);
            } else {
                image.src=window.$(e.dataTransfer.getData('text/html')).attr('src');
                this.get('controller').send('imageDropped',image);
            }
        } catch (ex) {
            console.log(ex);
        }
    }
});
