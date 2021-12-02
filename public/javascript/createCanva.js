function draw() {
    var canvas = document.getElementById('canvas');
    if (canvas.getContext) {
        var ctx = canvas.getContext('2d');

        for(var i=0; i<1000; i++){
            ctx.fillRect(i, i ,1 , 1);
        }
    }
  }

  draw()