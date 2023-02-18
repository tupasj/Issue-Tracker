const getCurrentMilestone = (milestones: any[], currentMilestoneId: any) => {
  const filterResult = milestones.filter((milestone) => milestone.id == currentMilestoneId);
  const currentMilestone = filterResult[0];
  return currentMilestone;
};

export { getCurrentMilestone };
