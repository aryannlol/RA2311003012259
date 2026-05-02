/**
 * Priority Engine for Campus Notifications
 * Implements Stage 1 Priority Logic: Placement > Result > Event + Recency
 */

interface NotificationSignal {
  ID: string;
  Type: "Placement" | "Result" | "Event";
  Message: string;
  Timestamp: string;
}

/**
 * Maps notification categories to numerical precedence scores
 */
const mapCategoryToPrecedence = (category: string): number => {
  const priorities: Record<string, number> = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };
  return priorities[category] || 0;
};

/**
 * Primary logic to filter and sort the incoming notification stream
 * @param stream Array of raw notification objects
 * @param limit Number of top notifications to return
 */
export const processPriorityStream = (
  stream: NotificationSignal[],
  limit: number = 10
): NotificationSignal[] => {
  return [...stream]
    .sort((a, b) => {
      const weightA = mapCategoryToPrecedence(a.Type);
      const weightB = mapCategoryToPrecedence(b.Type);

      // Primary sort: Precedence (Descending)
      if (weightA !== weightB) {
        return weightB - weightA;
      }

      // Secondary sort: Recency (Descending)
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    })
    .slice(0, limit);
};

// Example Usage (for demonstration purposes as requested in Stage 1)
const mockData: NotificationSignal[] = [
  {
    ID: "1",
    Type: "Event",
    Message: "Farewell",
    Timestamp: "2026-04-22 17:51:06",
  },
  {
    ID: "2",
    Type: "Result",
    Message: "Mid-sem",
    Timestamp: "2026-04-22 17:51:30",
  },
  {
    ID: "3",
    Type: "Placement",
    Message: "CSX Hiring",
    Timestamp: "2026-04-22 17:51:18",
  },
];

const topAlerts = processPriorityStream(mockData);
console.log("Top Priority Notifications:", topAlerts);
