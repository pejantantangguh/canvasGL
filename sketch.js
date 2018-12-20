const canvasSketch = require('canvas-sketch');
const { lerp } = require('canvas-sketch-util/math');
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');


const settings = {
  dimensions: [2048, 2048]

};

const margin = 100;



const sketch = () => {
  const pallete = random.pick(palettes).slice(0, 3);
  console.log(pallete);
  const createGrid = () => {
    const points = [];
    const count = 70;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        points.push({
          color: random.pick(pallete),
          radius: Math.abs(0.001 + random.gaussian() * 0.0039),
          position: [u, v]
        });

      }
    }
    return points;
  };

  random.setSeed();
  const points = createGrid().filter(() => random.value() > 0.5);
  // console.log(points);

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const {
        color,
        position,
        radius
      } = data;
      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, width - margin, v);


      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.fillStyle = color;
      context.fill();
    });
  };
};

canvasSketch(sketch, settings);