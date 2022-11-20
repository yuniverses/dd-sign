//將其餘畫面隱藏
(function() {
    var x = document.getElementById("index");
    x.style.display = "block";
    var x = document.getElementById("file-preview");
    x.style.display = "none";
    var x = document.getElementById("func-sign");
    x.style.display = "";
})()
  
//上傳後從首頁切換到確認頁面（代碼在pdf.js）


//確認後從切換到簽名頁面
  function tofuncsign() {
    var x = document.getElementById("index");
    x.style.display = "none";
    var x = document.getElementById("file-preview");
    x.style.display = "none";
    var x = document.getElementById("func-sign");
    x.style.display = "block";
}