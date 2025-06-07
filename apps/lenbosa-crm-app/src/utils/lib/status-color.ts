export const StatusColor = (status: string) => {
  if (!status) return { background: "#fff", color: "#000" };

  status = status?.toLowerCase();

  if (status === "pending") {
    return { background: "#FEF7EA", color: "#E6A433" };
  } else if (status === "on-delivery") {
    return { background: "#F8EBF9", color: "#A303B5" };
  } else if (status === "purchased") {
    return { background: "#EBF7F9", color: "#039FB5" };
  } else if (status === "assigned") {
    return { background: "#F6F9FF", color: "#538CFF" };
  } else if (status === "re-assigned") {
    return { background: "#FDF6FF", color: "#D84FF6" };
  } else if (status === "delivered") {
    return { background: "#EBF9ED", color: "#00B624" };
  } else if (status === "active") {
    return { background: "#EBF9ED", color: "#00B624" };
  } else if (status === "cancelled") {
    return { background: "#FFE9E9", color: "#FF4545" };
  } else if (status === "inactive") {
    return { background: "#FFE9E9", color: "#FF4545" };
  } else if (status === "confirmed") {
    return { background: "#EBF7F9", color: "#039FB5" };
  }
};

export const AssignmentStatus = (assign: number) => {
  if (assign === 0) {
    return { background: "#081F8FCC", color: "#FFFFFF" };
  } else if (assign !== 0) {
    return { background: "#EBF9ED", color: "#00B624" };
  }
};
