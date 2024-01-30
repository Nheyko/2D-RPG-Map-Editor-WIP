const map = document.getElementById('map');
const tileSet = document.getElementById('tileset');
const widthInput = document.getElementById('width-input');
const heightInput = document.getElementById('height-input');
const tileSelected = document.getElementById('tile-selected');
const tileSizeSelect = document.getElementById('tile-size-select');

const image = new Image();

function drawGrid(canvas, width, height, tileSize) {

    if (canvas.getContext) {

        const ctx = canvas.getContext('2d');

        var floorHeight = 0;
        var newHeight = 0;
        var floorWidth = 0;
        var newWidth = 0;

        if (height % tileSize != 0) {
            floorHeight = Math.floor(height / tileSize);
            newHeight = floorHeight * tileSize;
        } else {
            newHeight = height;
        }

        if (width % tileSize != 0) {
            floorWidth = Math.floor(width / tileSize);
            newWidth = floorWidth * tileSize;
        } else {
            newWidth = width;
        }

        // Vertical lines

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(0, newHeight);
        ctx.closePath();
        ctx.stroke();

        for (i = tileSize; i <= newWidth; i += tileSize) {

            ctx.beginPath();
            ctx.moveTo(i, 0);
            ctx.lineTo(i, newHeight);
            ctx.closePath();
            ctx.stroke();
        }

        // Horizontal lines

        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(newWidth, 0);
        ctx.closePath();
        ctx.stroke();

        for (j = tileSize; j <= newHeight; j += tileSize) {

            ctx.beginPath();
            ctx.moveTo(0, j);
            ctx.lineTo(newWidth, j);
            ctx.closePath();
            ctx.stroke();
        }
    }
}

drawGrid(map, map.width, map.height, parseInt(tileSizeSelect.value));

document.getElementById('uploadTileSetButton').addEventListener('click', () => {
    input.click();
})

function drawTileSet(event) {

    image.src = event.target.files[0].name;

    if (tileSet.getContext) {

        const ctx = tileSet.getContext('2d');

        image.onload = () => {
            tileSet.width = image.width;
            tileSet.height = image.height;

            ctx.drawImage(image, 0, 0);
            drawGrid(tileSet, image.width, image.height, parseInt(tileSizeSelect.value));
        }
    }
}

function refreshMap() {

    if (map.getContext) {

        const ctx = map.getContext('2d');

        // effacer le canevas entièrement
        ctx.clearRect(0, 0, map.width, map.height);
    }
}

function refreshTileSet() {

    if (tileSet.getContext) {

        const ctx = tileSet.getContext('2d');

        // effacer le canevas entièrement
        ctx.clearRect(0, 0, tileSet.width, tileSet.height);
        ctx.drawImage(image, 0, 0);
    }
}

tileSizeSelect.addEventListener('change', () => {

    refreshMap();
    refreshTileSet();
    drawGrid(map, map.width, map.height, parseInt(tileSizeSelect.value));
    drawGrid(tileSet, tileSet.width, tileSet.height, parseInt(tileSizeSelect.value));
})

function upWidth() {

    var max = parseInt(widthInput.value) + parseInt(tileSizeSelect.value)

    if (parseInt(widthInput.value) >= 8 && max <= 800) {

        widthInput.value = max
    }

    map.width = parseInt(widthInput.value)
    drawGrid(map, map.width, heightInput.value, parseInt(tileSizeSelect.value));
}

function downWidth() {

    var min = parseInt(widthInput.value) - parseInt(tileSizeSelect.value)

    if (parseInt(widthInput.value) >= 8 && min <= 800) {

        widthInput.value = min
    }

    map.width = parseInt(widthInput.value)
    drawGrid(map, map.width, heightInput.value, parseInt(tileSizeSelect.value));
}

function upHeight() {

    var max = parseInt(heightInput.value) + parseInt(tileSizeSelect.value)

    if (parseInt(heightInput.value) >= 8 && max <= 800) {

        heightInput.value = max
    }

    map.height = parseInt(heightInput.value)
    drawGrid(map, map.width, map.height, parseInt(tileSizeSelect.value));
}

function downHeight() {

    var min = parseInt(heightInput.value) - parseInt(tileSizeSelect.value)

    if (min >= 8 && parseInt(heightInput.value) <= 800) {
        heightInput.value = min
    }

    map.height = parseInt(heightInput.value)
    drawGrid(map, map.width, map.height, parseInt(tileSizeSelect.value));
}

tileSet.addEventListener('click', () => {
    selectTile()
})

function getTileOnTileSet(canvas, tileSize) {

    var numberOfTile = 0;

    for (i = 0; i < canvas.width; i += tileSize) {
        for (j = 0; j < canvas.height; j += tileSize) {
            numberOfTile++;
        }
    }
}

function selectTile() {

    if (tileSet.getContext && tileSelected.getContext) {

        const ctx = tileSelected.getContext('2d');

        tileSelected.width = parseInt(tileSizeSelect.value);
        tileSelected.height = parseInt(tileSizeSelect.value);

        ctx.drawImage(tileSet, 0, 0, tileSelected.width, tileSelected.height, 0, 0, tileSelected.width, tileSelected.height);
    }
}

function drawTile() {

}