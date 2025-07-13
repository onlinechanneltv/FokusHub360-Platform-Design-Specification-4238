```javascript
class Watermark {
  constructor(options = {}) {
    this.options = {
      text: 'Confidential',
      color: 'rgba(255, 255, 255, 0.3)',
      fontSize: '14px',
      fontFamily: 'Arial',
      angle: -45,
      opacity: 0.3,
      ...options
    };
  }

  apply(container) {
    // Create watermark canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    // Set canvas size
    canvas.width = container.offsetWidth * 2;
    canvas.height = container.offsetHeight * 2;

    // Configure text style
    ctx.font = `${this.options.fontSize} ${this.options.fontFamily}`;
    ctx.fillStyle = this.options.color;
    ctx.globalAlpha = this.options.opacity;

    // Rotate and fill text
    ctx.translate(canvas.width / 4, canvas.height / 4);
    ctx.rotate(this.options.angle * Math.PI / 180);

    // Create repeating pattern
    const text = this.options.text;
    const metrics = ctx.measureText(text);
    const padding = 50;

    for (let y = -canvas.height; y < canvas.height * 2; y += metrics.actualBoundingBoxAscent + padding) {
      for (let x = -canvas.width; x < canvas.width * 2; x += metrics.width + padding) {
        ctx.fillText(text, x, y);
      }
    }

    // Create watermark overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'absolute';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.backgroundImage = `url(${canvas.toDataURL()})`;
    overlay.style.backgroundRepeat = 'repeat';
    overlay.style.pointerEvents = 'none';
    overlay.style.zIndex = '1';

    // Add dynamic content
    this.addDynamicContent(overlay);

    // Add to container
    container.style.position = 'relative';
    container.appendChild(overlay);

    // Update on resize
    window.addEventListener('resize', () => {
      this.updateWatermark(container, overlay);
    });

    return overlay;
  }

  addDynamicContent(overlay) {
    // Add timestamp
    const timestamp = document.createElement('div');
    timestamp.style.position = 'absolute';
    timestamp.style.bottom = '10px';
    timestamp.style.right = '10px';
    timestamp.style.color = 'rgba(255, 255, 255, 0.5)';
    timestamp.style.fontSize = '12px';
    timestamp.style.fontFamily = this.options.fontFamily;
    timestamp.style.pointerEvents = 'none';

    // Update timestamp every second
    const updateTimestamp = () => {
      timestamp.textContent = new Date().toISOString();
    };
    updateTimestamp();
    setInterval(updateTimestamp, 1000);

    overlay.appendChild(timestamp);
  }

  updateWatermark(container, overlay) {
    // Update watermark size and position on container resize
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    canvas.width = container.offsetWidth * 2;
    canvas.height = container.offsetHeight * 2;

    ctx.font = `${this.options.fontSize} ${this.options.fontFamily}`;
    ctx.fillStyle = this.options.color;
    ctx.globalAlpha = this.options.opacity;

    ctx.translate(canvas.width / 4, canvas.height / 4);
    ctx.rotate(this.options.angle * Math.PI / 180);

    const text = this.options.text;
    const metrics = ctx.measureText(text);
    const padding = 50;

    for (let y = -canvas.height; y < canvas.height * 2; y += metrics.actualBoundingBoxAscent + padding) {
      for (let x = -canvas.width; x < canvas.width * 2; x += metrics.width + padding) {
        ctx.fillText(text, x, y);
      }
    }

    overlay.style.backgroundImage = `url(${canvas.toDataURL()})`;
  }
}

export default Watermark;
```