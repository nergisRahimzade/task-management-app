export const TASK_STATUS = {
  NULL: "",
  TO_DO: "TD",
  IN_PROGRESS: "IP",
  DONE: "D"
} as const;

export const TASK_STATUS_LABELS = {
  [TASK_STATUS.NULL]: "All",
  [TASK_STATUS.TO_DO]: "To Do",
  [TASK_STATUS.IN_PROGRESS]: "In Progress",
  [TASK_STATUS.DONE]: "Done"
} as const;