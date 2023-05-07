import { Label } from '../../models/Label';

const DBGetLabels = async (labels: any) => {
  // For each string element in labels array, get the corresponding label object from database
  const labelObjects: any[] = [];
  for (let i = 0; i < labels.length; i++) {
    const label = await Label.findOne({
      where: {
        name: labels[i],
      },
    });
    labelObjects.push(label);
  }
  return labelObjects;
};

export { DBGetLabels };
