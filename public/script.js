// Get references to HTML elements
const startStringInput = document.getElementById('startString');
const endStringInput = document.getElementById('endString');
const startStringLabel = document.getElementById('startStringLabel');
const endStringLabel = document.getElementById('endStringLabel');
const generateBtn = document.getElementById('generateBtn');
const qrCodesContainer = document.querySelector('.qr-codes');
const generateOptions = document.querySelectorAll('input[name="generateOption"]');

// Event listener for the Generate QR Codes button
generateBtn.addEventListener('click', () => {
    const startString = startStringInput.value.trim();
    const endString = endStringInput.value.trim();
    qrCodesContainer.innerHTML = ''; // Clear previous QR codes

    if (generateOptions[1].checked) {
        if (startString === '' || endString === '') {
            alert('Please enter both start and end strings.');
            return;
        }else{
            aljuiniedQRCodeSeries('ALJ_PSD_PSD10_6268', 'ALJ_PSD_PSD89_6347');
        }
    } else {
        generateQRCode(startString);
    }
});

// FUnction to check whether got lick on radio button
// generateOptions[0].addEventListener('click', function() {
if (generateOptions[0].checked) {
    endStringInput.style.display = 'none';
    startStringLabel.innerHTML = 'Text';
    endStringLabel.innerHTML = '';
}

// });
generateOptions[0].addEventListener('click', function() {
    if (generateOptions[0].checked) {
        endStringInput.style.display = 'none';
        startStringLabel.innerHTML = 'Text';
        endStringLabel.innerHTML = '';
    }
});
generateOptions[1].addEventListener('click', function() {
    if (generateOptions[1].checked) {
        startStringLabel.innerHTML = 'Start String';
        endStringLabel.innerHTML = 'End String';
        endStringInput.style.display = 'block';
        startStringInput.value = "ALJ_PSD_PSD10_6268";
        endStringInput.value = "ALJ_PSD_PSD89_6347";
    }
});

// Function to generate a single QR code
function generateQRCode(text) {
    const qrCodeDiv = document.createElement('div');
    qrCodeDiv.classList.add('qr-code');

    // Create a new QRCode instance
    const qrcode = new QRCode(qrCodeDiv, {
        text: text,
        width: 128,
        height: 128
    });

    qrCodesContainer.appendChild(qrCodeDiv);
}

// Function to generate a series of QR codes from start to end
// Ajuned
function aljuiniedQRCodeSeries(start, end) {
    // const prefix = start.split('_').slice(0, -2).join('_'); // Extract the prefix
    const parts = start.split('_');
    const prefix = `${parts[0]}_${parts[1]}_${parts[2].replace(/\d+/g, '')}`;
    const startSuffix = parseInt(start.split('_').pop(), 10);
    const endSuffix = parseInt(end.split('_').pop(), 10);

    const startPart = start.split('_');
    // const extractedStartValue = parseInt(startPart[startPart.length - 2]);
    const extractedStartValue = parseInt(startPart[2].match(/\d+/));
    const endPart = end.split('_');
    // const extractedEndValue = parseInt(endPart[endPart.length - 2]);
    const extractedEndValue = parseInt(endPart[2].match(/\d+/));

    for (let i = 0; i <= extractedEndValue - extractedStartValue; i++) {
        // const text = `${prefix}_${i.toString().padStart(2, '0')}_${(startSuffix+i).toString().padStart(5, '0')}`;
        const text = `${prefix}${(extractedStartValue+i).toString().padStart(2, '0')}_${(startSuffix+i).toString().padStart(4, '0')}`;
       
        generateQRCode(text);
    }
}

