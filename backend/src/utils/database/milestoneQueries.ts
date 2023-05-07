import { Milestone } from '../../models/Milestone';

const DBGetMilestone = async (currentMilestone: any) => {
  const milestone: any = await Milestone.findOne({
    where: { id: currentMilestone.id },
  });

  return milestone;
};

export { DBGetMilestone };
