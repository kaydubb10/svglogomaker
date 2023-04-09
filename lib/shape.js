class Shape {
  constructor({ color }) {
    this.color = color;
  }
}

class Circle extends Shape {
  render(text, textColor) {
    const svg = `<svg width="300" height="200">
      <circle cx="50%" cy="50%" r="40%" fill="${this.color}" />
      <text x="50%" y="50%" fill="${textColor}" dominant-baseline="middle" text-anchor="middle" font-size="50">${text}</text>
    </svg>`;
    return svg;
  }
}

class Square extends Shape {
  render(text, textColor) {
    const svg = `<svg width="300" height="200">
      <rect x="10%" y="10%" width="80%" height="80%" fill="${this.color}" />
      <text x="50%" y="50%" fill="${textColor}" dominant-baseline="middle" text-anchor="middle" font-size="50">${text}</text>
    </svg>`;
    return svg;
  }
}

class Triangle extends Shape {
  render(text, textColor) {
    const svg = `<svg width="300" height="200">
      <polygon points="50%,10% 10%,90% 90%,90%" fill="${this.color}" />
      <text x="50%" y="50%" fill="${textColor}" dominant-baseline="middle" text-anchor="middle" font-size="50">${text}</text>
    </svg>`;
    return svg;
  }
}

module.exports = { Circle, Square, Triangle };
