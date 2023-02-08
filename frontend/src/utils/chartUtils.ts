const makeColorsArray = (labelNames: string[]) => {
  const colorsArray: string[] = [];

  for (let i = 0; i < labelNames.length; i++) {
    switch (labelNames[i]) {
      case 'bug':
        colorsArray.push('#d73a4a');
        break;
      case 'duplicate':
        colorsArray.push('#cfd3d7');
        break;
      case 'help wanted':
        colorsArray.push('#008672');
        break;
      case 'new feature':
        colorsArray.push('#a2eeef');
        break;
      case 'question':
        colorsArray.push('#d876e3');
        break;
      case 'refactoring':
        colorsArray.push('#7DDe95');
        break;
      case "won't fix":
        colorsArray.push('#737373');
        break;
    }
  }

  return colorsArray;
};

export { makeColorsArray };
