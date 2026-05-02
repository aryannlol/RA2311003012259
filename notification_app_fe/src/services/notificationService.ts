import { transmitSystemTrace } from '@/lib/logger';

const API_BASE = '/evaluation-service';
const AUTH_TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJhbTg4NjZAc3JtaXN0LmVkdS5pbiIsImV4cCI6MTc3NzY5ODg1NiwiaWF0IjoxNzc3Njk3OTU2LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTA0MDAxYjAtYjM3NS00YzUyLWE0NWUtNmY4ZjliYmE3YWQzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiYXJ5YW4gbWFuZGxpayIsInN1YiI6IjdkZWVlNjUwLTllNjMtNDFjNS1iNTI1LTgzMGU5ZDMyMzRjZCJ9LCJlbWFpbCI6ImFtODg2NkBzcm1pc3QuZWR1LmluIiwibmFtZSI6ImFyeWFuIG1hbmRsaWsiLCJyb2xsTm8iOiJyYTIzMTEwMDMwMTIyNTkiLCJhY2Nlc3NDb2RlIjoiUWticHhIIiwiY2xpZW50SUQiOiI3ZGVlZTY1MC05ZTYzLTQxYzUtYjUyNS04MzBlOWQzMjM0Y2QiLCJjbGllbnRTZWNyZXQiOiJKU0V5WGpZYnVtek5VZUd3In0.aOyW2K4hkQqL6_Udhnve3G1T8Ev90y-BI0byCzFunng'; // Injected automatically

export interface Notification {
  ID: string;
  Type: 'Placement' | 'Result' | 'Event';
  Message: string;
  Timestamp: string;
}

export const fetchAllNotifications = async (): Promise<Notification[]> => {
  try {
    const response = await fetch(`${API_BASE}/notifications`, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch notifications');
    }

    const data = await response.json();
    
    // Log success via middleware
    await transmitSystemTrace(AUTH_TOKEN, {
      stack: 'frontend',
      level: 'info',
      package: 'api',
      message: `Successfully retrieved ${data.notifications?.length} notifications`,
    });

    return data.notifications || [];
  } catch (error) {
    // Log failure
    await transmitSystemTrace(AUTH_TOKEN, {
      stack: 'frontend',
      level: 'error',
      package: 'api',
      message: `API Failure: ${error instanceof Error ? error.message : 'Unknown error'}`,
    });
    return [];
  }
};
