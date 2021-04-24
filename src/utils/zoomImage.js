export const addZoom = function (target) {
    let container = target;
        let imgsrc = container.currentStyle || window.getComputedStyle(container, false);
        imgsrc = imgsrc.backgroundImage.slice(4, -1).replace(/"/g, "");
        let img = new Image();

    img.src = imgsrc;
    img.onload = function () {
      let imgWidth = img.naturalWidth,
          imgHeight = img.naturalHeight,
          ratio = imgHeight / imgWidth,
          percentage = ratio * 100 + '%';

      container.onmousemove = function (e) {
        let boxWidth = container.clientWidth,
            rect = e.target.getBoundingClientRect(),
            xPos = e.clientX - rect.left,
            yPos = e.clientY - rect.top,
            xPercent = xPos / (boxWidth / 100) + "%",
            yPercent = yPos / ((boxWidth * ratio) / 100) + "%";
  
        Object.assign(container.style, {
          backgroundPosition: xPercent + ' ' + yPercent,
          backgroundSize: imgWidth + 'px'
        });
      };
  
      container.onmouseleave = function (e) {
        Object.assign(container.style, {
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        });
      };
    }
  };
  