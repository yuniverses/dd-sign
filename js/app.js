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
function reload() {
  location.reload(true);
}


$(".leave-btn").click(function(){
  swal({
    title: "確認退出嗎？",
    text: "退出後檔案將不會保留，至此的進度將會被刪除。",
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
  (e || window.event).returnValue = '確認退出嗎？';
  //這裡return不起作用
});

//浮動預覽文件
$("#pdf-show-btn").click(function(){
  $('#pdf-preview-dialog').show();
  $('#pdf-show-btn').hide();
  $('#pdf-close-btn').css("display","block");
});
$("#pdf-close-btn").click(function(){
  $('#pdf-preview-dialog').hide();
  $('#pdf-show-btn').show();
  $('#pdf-close-btn').css("display","none");
});

function Position(x, y) {
  this.X = x ? x : 0;
  this.Y = y ? y : 0;

  this.add = function (val) {
      if (val) {
          if (!isNaN(val.X)) this.X += val.X;
          if (!isNaN(val.Y)) this.Y += val.Y;
      }
      return this;
  };

  this.subtract = function (val) {
      if (val) {
          if (!isNaN(val.X)) this.X -= val.X;
          if (!isNaN(val.Y)) this.Y -= val.Y;
      }
      return this;
  };

  this.min = function (val) {
      if (!val) return this;
      if (!isNaN(val.X)) this.X = Math.min(this.X, val.X);
      if (!isNaN(val.Y)) this.Y = Math.min(this.Y, val.Y);
      return this;
  };

  this.max = function (val) {
      if (!val) return this;
      if (!isNaN(val.X)) this.X = Math.max(this.X, val.X);
      if (!isNaN(val.Y)) this.Y = Math.max(this.Y, val.Y);

      return this;
  };

  this.apply = function (element, control) {
      if (!element) return;
      if (!isNaN(this.X)) {
          if (control && (control.orientation != 'horizontal' || this.X > control.upperLimit || this.X < control.lowerLimit)) return;
          element.style.left = this.X + 'px';
      }
      if (!isNaN(this.Y)) {
          if (control && (control.orientation != 'vertical' || this.Y > control.upperLimit || this.Y < control.lowerLimit)) return;
          element.style.top = this.Y + 'px';
      }
  };
}

function absoluteCursorPosition(e) {
  e = e || window.event;
  if (isNaN(window.scrollX)) return new Position(e.clientX + document.documentElement.scrollLeft + document.body.scrollLeft,
  e.clientY + document.documentElement.scrollTop + document.body.scrollTop);
  else return new Position(e.clientX + window.scrollX, e.clientY + window.scrollY);
}

function dragObject(element, startCallback, moveCallback, endCallback) {
  if (!element) return;

  var cursorStartPos = null;
  var elementStartPos = null;
  var dragging = false;
  var control;

  element.addEventListener("mousedown", dragStart, false);

  function dragStart(e) {
      e = e || window.event;
      if ((e.which && e.which != 1) || (e.button && e.button != 1)) return; //only allow mouse left key

      if (dragging) return;
      dragging = true;
      if (startCallback) control = startCallback(e, element);

      cursorStartPos = absoluteCursorPosition(e);
      elementStartPos = new Position(parseInt(element.style.left), parseInt(element.style.top));
      document.addEventListener("mousemove", dragGo, false);
      document.addEventListener("mouseup", dragStop, false);
  }

  function dragGo(e) {
      if (!dragging) return;
      var newPos = absoluteCursorPosition(e).add(elementStartPos).subtract(cursorStartPos);
      newPos.apply(element, control);
      if (moveCallback) moveCallback(e, element, newPos);
  }

  function dragStop(e) {
      if (!dragging) return;
      dragging = false;
      cursorStartPos = null;
      elementStartPos = null;
      if (endCallback) endCallback(e, element);

      document.removeEventListener("mousemove", dragGo, false);
      document.removeEventListener("mouseup", dragStop, false);
  }

  this.dispose = function () {
      element.removeEventListener("mousedown", dragStart, false);
  };
}

var dothis = new dragObject(document.getElementById("pdf-preview-dialog"));