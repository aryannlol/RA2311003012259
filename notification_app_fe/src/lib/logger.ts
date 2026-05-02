/**
 * Telemetry Utility for Evaluation Service
 */

export interface TelemetryPayload {
  stack: string;      // e.g. "frontend"
  level: string;      // e.g. "info", "error"
  package: string;    // e.g. "api", "auth"
  message: string;    // The actual log message
  metadata?: any;     // Optional extra data
}

/**
 * Transmits a system trace to the remote evaluation server.
 * This includes required owner details for evaluation purposes.
 */
export const transmitSystemTrace = async (
  token: string,
  payload: TelemetryPayload
): Promise<void> => {
  const LOG_ENDPOINT = "/evaluation-service/logs";

  // Required identification for assessment evaluation
  const identification = {
    ownerName: "Aryan Mandlik",
    ownerEmail: "am8866@srmist.edu.in",
    rollNo: "RA2311003012259",
    accessCode: "QkbpxH"
  };

  try {
    const response = await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        ...identification, // Spreading identification as required
        log: payload.message,
        type: payload.level,
        timestamp: new Date().toISOString(),
        details: {
          stack: payload.stack,
          package: payload.package,
          metadata: payload.metadata
        }
      }),
    });

    if (response.ok) {
      console.log(`[Telemetry] Recorded: ${payload.message}`);
    }
  } catch (error) {
    console.error("[Telemetry] Failed to transmit trace", error);
  }
};
