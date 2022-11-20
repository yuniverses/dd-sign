//將其餘畫面隱藏

  $("#index").show(); 
  $("#file-preview").hide(); 
  $("#func-sign").hide(); 
  $("#put-sign").hide(); 
  $("#Complet-sign").hide(); 

  

  
//上傳後從首頁切換到確認頁面（代碼在pdf.js）
$("#save-signature").click(function(){
  $("#index").hide(); 
  $("#file-preview").hide(); 
  $("#func-sign").hide(); 
  $("#put-sign").show(); 
});

//確認後從切換到簽名頁面
  function tofuncsign() {
    var x = document.getElementById("index");
    x.style.display = "none";
    var x = document.getElementById("file-preview");
    x.style.display = "none";
    var x = document.getElementById("func-sign");
    x.style.display = "block";
}



$("#save-signature").click(function(){
  $(".put").show(); 
  $(".closeshow").hide(); 
  $(".canvas-container").css("left","10vw"); 
});

$("#next-page").click(function(){
  $(".closeend").hide(); 
  $(".closeshow").show(); 
  $(".canvas-container").css("left","0"); 
});

//leave-btn兩段式退出
$(".leave-btn").click(function(){
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      location.reload(true);
    } 
  });
});
//重新整理
window.addEventListener("beforeunload", function (e) {
  (e || window.event).returnValue = '確定離開此頁嗎?';
  //注意:這裡return方法是不起作用的
});