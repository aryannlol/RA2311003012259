import { fetchAllNotifications, Notification } from '@/services/notificationService';

const getPrecedence = (type: string): number => {
  const map: Record<string, number> = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };
  return map[type] || 0;
};

/**
 * Refines the raw stream into an urgent priority feed
 */
export const refineUrgentFeed = (
  notifications: Notification[],
  limit: number = 10
): Notification[] => {
  return [...notifications]
    .sort((a, b) => {
      const pA = getPrecedence(a.Type);
      const pB = getPrecedence(b.Type);
      
      if (pA !== pB) return pB - pA;
      return new Date(b.Timestamp).getTime() - new Date(a.Timestamp).getTime();
    })
    .slice(0, limit);
};

export const fetchPriorityFeed = async (limit: number = 10): Promise<Notification[]> => {
  const all = await fetchAllNotifications();
  return refineUrgentFeed(all, limit);
};
