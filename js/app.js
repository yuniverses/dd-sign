//將其餘畫面隱藏
  $("#index").show(); 
  $("#file-preview").hide(); 
  $("#func-sign").hide(); 
  $("#put-sign").hide(); 
// (function() {
//     var x = document.getElementById("index");
//     x.style.display = "";
//     var x = document.getElementById("file-preview");
//     x.style.display = "none";
//     var x = document.getElementById("func-sign");
//     x.style.display = "none";
// })()
  
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