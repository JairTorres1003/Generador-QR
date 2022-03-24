const generate_QR = document.getElementById('generate-QR');
const enlace = document.getElementById('enlace');
const canvas_qr = document.getElementById('canvas-qr');
const input_d = document.getElementById('input-d');

// Seleccionar todo el texto (enlace) ------------------
enlace.addEventListener('click', function(e){
    enlace.select();
});
// Activa el generador del qr mediante el botón (generate_QR) --------------
generate_QR.addEventListener('click', function(e){
    if (enlace.value.length >= 10) {
        document.getElementById('c-codeQr').classList.add('dis-can');
        canvas_qr.classList.add('loadQR');
        input_d.classList.add('dis');
        loadCodeQr(enlace.value);
        generate(enlace.value);
    }
});
// Función para cargar el qr "animacion" --------------------
function loadCodeQr(enlace) {
    setTimeout(() => {
        canvas_qr.classList.remove('loadQR');
        generate(enlace);
        document.getElementById('c-codeQr').classList.remove('dis-can');
    }, 1500);
}
// Función que dibuja al qr --------------------------------------
function generate(enlace) {
    let CodeQR_Img = document.createElement('img');
    // let IconCode = document.getElementById('logo-Uniagustiniana');
    let IconCode = document.createElement('img');
    IconCode.src = "images/logo-Uniagustiniana.png";
    document.body.append(IconCode);
    new QRious({   //qrious es el generador del qr
        element: CodeQR_Img,
        value: enlace, // La URL o el texto
        size: 1000,
        backgroundAlpha: 0, // 0 = fondo transparente
        foreground: "black", // Color del QR
        level: "H", // Puede ser L,M,Q y H (L es el de menor nivel, H el mayor)
    });

    let canvas = document.getElementById('c-codeQr');
    canvas.width = CodeQR_Img.width + 100;
    canvas.height = CodeQR_Img.height + 100;
    let x = (canvas.width / 2) - IconCode.width / 2;
    let y = (canvas.height / 2) - IconCode.height / 2;
    let context = canvas.getContext('2d');
    // Fondo del QR -------------------------------------------
    context.beginPath();
    context.rect(0, 0, canvas.width, canvas.height);
    context.fillStyle = "rgb(254,254,254)";
    context.fill();
    // QR -----------------------------------------------------
    context.drawImage(CodeQR_Img, 50, 50);
    // context.closePath();
    // // Contenedor Fondo Logo QR --------------------------------
    // context.beginPath();
    // context.rect(x, y, IconCode.width, IconCode.height);
    // context.fillStyle = "rgb(254,254,254)";
    // context.fill();
    // // Logo QR ------------------------------------------------
    // context.drawImage(IconCode, x, y);
    context.closePath();

    setTimeout(() => {
        input_d.classList.remove('dis');
    }, 1000);
    IconCode.remove();
}
// Evento para descargar el código qr --------------------------------------------
const download_btn = document.getElementById('download-btn');

download_btn.addEventListener('click', function(e){
    let canvas = document.getElementById('c-codeQr');
    let download_a = document.createElement('a');
    download_a.download = "Codigo QR.jpg";
    download_a.href = canvas.toDataURL();
    download_a.click();
    
});
