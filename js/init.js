;(function(){
  $("#selfie-input").change(function() {
    console.log('b');
    readURL(this);
  });

  function readURL(input) {
    $( ".trump-img" ).remove();

    if (input.files && input.files[0]) {
      var reader = new FileReader();
   
      reader.onload = function (e) {
          $('#selfie-img').attr('src', e.target.result);
          setTimeout(function() {
            $('#selfie-img').faceDetection({
              complete: function (faces) {

                for(var i = 0; i < faces.length; ++i) {
                  var imgHeightOffset=  faces[i].height / 4 ;
                  var imgWidthOffset = faces[i].width / 4; 
                  var imgtop = faces[i].offsetY - imgHeightOffset;
                  var imgleft = faces[i].offsetX - imgWidthOffset;
                  var imgwidth =  faces[i].width * 1.5;

                  var imgString = "<img class='trump-img' src='img/trump.png' style='top:" + imgtop + "px; left:"+ imgleft + "px; width: " + imgwidth +"px; height:"+faces[i].height * 1.5+"px;' />"; 

                  $("body").append(imgString);

                }
              },
              error: function (code, message) {

              }
            });
          }, 100) ;
      }
      reader.readAsDataURL(input.files[0]);
    }
  }

  $("#selfie-btn").click(function() {
    $("#selfie-input").click();
  });
})();