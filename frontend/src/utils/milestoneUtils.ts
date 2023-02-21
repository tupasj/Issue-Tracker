const getCurrentMilestone = (milestones: any[], currentMilestoneId: any) => {
  const filterResult = milestones.filter((milestone) => milestone.id == currentMilestoneId);
  const currentMilestone = filterResult[0];
  return currentMilestone;
};

const makeUpdatedMilestones = (milestones: any[], updatedMilestone: any) => {
  const updatedMilestones = milestones.map((milestone) => {
    if (milestone.id === updatedMilestone.id) {
      return updatedMilestone;
    } else {
      return milestone;
    }
  });
  return updatedMilestones;
};

export { getCurrentMilestone, makeUpdatedMilestones };
