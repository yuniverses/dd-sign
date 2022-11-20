




const Base64Prefix = "data:application/pdf;base64,";
const add = document.querySelector(".add");
pdfjsLib.GlobalWorkerOptions.workerSrc = "https://mozilla.github.io/pdf.js/build/pdf.worker.js";



// 使用原生 FileReader 轉檔
function readBlob(blob) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(blob);
    //上傳後從首頁切換到確認頁面
    var x = document.getElementById("index");
        x.style.display = "none";
        var x = document.getElementById("file-preview");
        x.style.display = "flex";
        var x = document.getElementById("func-sign");
        x.style.display = "none";
  });
}

async function printPDF(pdfData) {

  // 將檔案處理成 base64
  pdfData = await readBlob(pdfData);

  // 將 base64 中的前綴刪去，並進行解碼
  const data = atob(pdfData.substring(Base64Prefix.length));

  // 利用解碼的檔案，載入 PDF 檔及第一頁
  const pdfDoc = await pdfjsLib.getDocument({ data }).promise;
  const pdfPage = await pdfDoc.getPage(1);

  // 設定尺寸及產生 canvas
  const viewport = pdfPage.getViewport({ scale: window.devicePixelRatio });
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // 設定 PDF 所要顯示的寬高及渲染
  canvas.height = viewport.height;
  canvas.width = viewport.width;
  const renderContext = {
    canvasContext: context,
    viewport,
  };
  const renderTask = pdfPage.render(renderContext);

  // 回傳做好的 PDF canvas
  return renderTask.promise.then(() => canvas);
}

async function pdfToImage(pdfData) {

  // 設定 PDF 轉為圖片時的比例
  const scale = 1 / window.devicePixelRatio;

  // 回傳圖片
  return new fabric.Image(pdfData, {
    id: "renderPDF",
    scaleX: scale,
    scaleY: scale,
  });
}

// 此處 canvas 套用 fabric.js
const canvasp = new fabric.Canvas("canvas-preview");

document.querySelector("input").addEventListener("change", async (e) => {
  canvasp.requestRenderAll();
  const pdfData = await printPDF(e.target.files[0]);
  const pdfImage = await pdfToImage(pdfData);

  // 透過比例設定 canvas 尺寸
  canvasp.setWidth(pdfImage.width / window.devicePixelRatio);
  canvasp.setHeight(pdfImage.height / window.devicePixelRatio);

  // 將 PDF 畫面設定為背景
  canvasp.setBackgroundImage(pdfImage, canvasp.renderAll.bind(canvasp));
});

// 簽名頁的預覽１
const canvasp2 = new fabric.Canvas("pdf-preview");

document.querySelector("input").addEventListener("change", async (e) => {
  canvasp2.requestRenderAll();
  const pdfData = await printPDF(e.target.files[0]);
  const pdfImage = await pdfToImage(pdfData);

  // 透過比例設定 canvas 尺寸
  canvasp2.setWidth(pdfImage.width / window.devicePixelRatio);
  canvasp2.setHeight(pdfImage.height / window.devicePixelRatio);

  // 將 PDF 畫面設定為背景
  canvasp2.setBackgroundImage(pdfImage, canvasp2.renderAll.bind(canvasp2));
});
