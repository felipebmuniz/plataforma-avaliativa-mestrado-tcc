function hexToRgb(rawHex: string, alpha?: number) {
  const isValidHex = /^#([A-Fa-f0-9]{3}){1,2}$/.test(rawHex ?? '#ffffff');

  if (isValidHex) {
    const hexArray = rawHex.substring(1).split('');

    const calculateColor = (color: string[]) => {
      if (color.length === 3) {
        return [color[0], color[0], color[1], color[1], color[2], color[2]];
      }
      return color;
    };

    const convertToRgb = (color: string[]) => {
      const joinedColor = Number('0x' + color.join(''));
      const red = (joinedColor >> 16) & 255;
      const green = (joinedColor >> 8) & 255;
      const blue = joinedColor & 255;
      return alpha ? `rgba(${red},${green},${blue},${alpha})` : `rgba(${red},${green},${blue})`;
    };

    return convertToRgb(calculateColor(hexArray));
  }

  throw new Error('Bad Hex');
}

export { hexToRgb };
