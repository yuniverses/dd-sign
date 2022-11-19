const canvas = document.querySelector("#canvas-signature");
const ctx = canvas.getContext("2d");
const clearBtn = document.querySelector("#clear-signature");
const manageSignatureBtn = document.querySelector("#manage-signature");

// Setting Color
function canvasChangeColor(e) {
  let colourToggleArray = document.querySelectorAll('[data-toggle="colour-palette"]');
  colourToggleArray.forEach((element) => {
    element.classList.remove("active");
  });
  e.classList.add("active");
  let colour = e.dataset.color;
  ctx.strokeStyle = colour;
  ctx.fillStyle = colour;
}

// 設定線條的相關數值
ctx.lineWidth = 50;
ctx.lineCap = "round";

canvas.width = document.querySelector("#manage-signature-content").offsetWidth;
canvas.height = document.querySelector("#manage-signature-content").offsetWidth / 2;

// 設置狀態來確認滑鼠 / 手指是否按下或在畫布範圍中
let isPainting = false;

// 取得滑鼠 / 手指在畫布上的位置
function draw() {
  oldR = r;
  if(mouseIsPressed) {
    mX = mouseX;
    mY = mouseY;
    if(!f) {
      f = 1;
      x = mX;
      y = mY;
    }
    ax += ( mX - x ) * spring;
    ay += ( mY - y ) * spring;
    ax *= friction;
    ay *= friction;
    a += sqrt( ax*ax + ay*ay ) - a;
    a *= 0.6;
    r = size - a;
    
    for( i = 0; i < distance; ++i ) {
      oldX = x;
      oldY = y;
      x += ax / distance;
      y += ay / distance;
      oldR += ( r - oldR ) / distance;
      if(oldR < 1) oldR = 1;
      strokeWeight( oldR+diff );
      line( x, y, oldX, oldY );
      strokeWeight( oldR );
      line( x+diff*2, y+diff*2, oldX+diff*2, oldY+diff*2 );
      line( x-diff, y-diff, oldX-diff, oldY-diff );
    }
  } else if(f) {
    ax = ay = f = 0;
  }
}
// 開始繪圖時，將狀態開啟
function startPosition(e) {
  e.preventDefault();
  isPainting = true;
}

// 結束繪圖時，將狀態關閉，並產生新路徑
function finishedPosition() {
  isPainting = false;
  ctx.beginPath();
}

// 繪圖過程
function draw(e) {
  // 滑鼠移動過程中，若非繪圖狀態，則跳出
  if (!isPainting) return;

  // 取得滑鼠 / 手指在畫布上的 x, y 軸位置位置
  const paintPosition = getPaintPosition(e);

  // 移動滑鼠位置並產生圖案
  ctx.lineTo(paintPosition.x, paintPosition.y);
  ctx.stroke();
}

// 重新設定畫布
function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// event listener 電腦板
canvas.addEventListener("mousedown", startPosition);
canvas.addEventListener("mouseup", finishedPosition);
canvas.addEventListener("mouseleave", finishedPosition);
canvas.addEventListener("mousemove", draw);

// event listener 手機板
canvas.addEventListener("touchstart", startPosition);
canvas.addEventListener("touchend", finishedPosition);
canvas.addEventListener("touchcancel", finishedPosition);
canvas.addEventListener("touchmove", draw);

clearBtn.addEventListener("click", reset);

// Save BEGIN
const saveSignatureBtn = document.querySelector("#save-signature");

function saveImage() {
  let localSignatureArray = localStorage.getItem("localSignature") || "";
  // 圖片儲存的類型選擇 png ，並將值放入 img 的 src
  const newImg = canvas.toDataURL("image/png");
  const signatureID = `signature_${new Date().getTime()}`;
  localSignatureArray += localSignatureArray.length > 0 ? `,${signatureID}` : `${signatureID}`;
  localStorage.setItem(signatureID, newImg);
  localStorage.setItem("localSignature", localSignatureArray);
  reset();
  signatureImg();
}

saveSignatureBtn.addEventListener("click", saveImage);
// Save END

function signatureImg() {
  let localSignatureStr = localStorage.getItem("localSignature") || "";
  let localSignatureArray = localSignatureStr.split(",");
  let signatureImgList = "";

  localSignatureArray.forEach((item) => {
    let signatureImgBase64 = localStorage.getItem(item);
    signatureImgList += `<li class="custom-rounded-20 custom-light-shadow-sm d-flex justify-content-center align-items-center border border-primary" style="min-width: 150px; width: 150px; min-height: 100px; height: 100%"><img class="img-fluid custom-rounded-20" src="${signatureImgBase64}" alt="signature ${item}"></li>`;
  });

  document.querySelector("#signature-list-viewer").innerHTML = "";
  document.querySelector("#signature-list-viewer").innerHTML = signatureImgList;
}

signatureImg();

manageSignatureBtn.addEventListener("click", () => {
  let canvas = document.querySelector("#canvas-signature");
  canvas.width = document.querySelector("#steps-uid-0-p-1").offsetWidth - 32;
  canvas.height = document.querySelector("#steps-uid-0-p-1").offsetWidth / 4;
  signatureImg();
});
