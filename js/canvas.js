const canvas = document.querySelector("#canvas-signature");
const ctx = canvas.getContext("2d");
const clearBtn = document.querySelector("#clear-signature");
const saveBtn = document.querySelector("#save-signature");
const showImage = document.querySelector(".show-img");
console.log(showImage);

// 確認滑鼠 / 手指是否按下
let isPainting = false;

// 設定線條的相關數值
ctx.lineWidth = 100;
ctx.lineCap = "round";

canvas.width = document.querySelector("#manage-signature-content").offsetWidth;
canvas.height = document.querySelector("#manage-signature-content").offsetWidth / 1.7;

// 取得滑鼠 / 手指在畫布上的位置
function getPaintPosition(e) {
  const canvasSize = canvas.getBoundingClientRect();

  if (e.type === "mousemove") {
    return {
      x: e.clientX - canvasSize.left,
      y: e.clientY - canvasSize.top,
    };
  } else {
    return {
      x: e.touches[0].clientX - canvasSize.left,
      y: e.touches[0].clientY - canvasSize.top,
    };
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
  e.preventDefault();
  if (!isPainting) return;

  // 取得滑鼠 / 手指位置
  const paintPosition = getPaintPosition(e);

  // 移動到滑鼠位置並產生圖案
  ctx.lineTo(paintPosition.x, paintPosition.y);
  ctx.stroke();
}

// 重新設定畫布
function reset() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// 儲存圖片
function saveImage() {
  const newImg = canvas.toDataURL("image/png");
  showImage.src = newImg;
  localStorage.setItem("img", newImg);
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

// 重設按鈕
clearBtn.addEventListener("click", reset);
saveBtn.addEventListener("click", saveImage);

