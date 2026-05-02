/**
 * Reusable Logging Middleware for Telemetry
 * Communicates with the central evaluation server
 */

type LogStack = "backend" | "frontend";
type LogLevel = "debug" | "info" | "warn" | "error" | "fatal";
type LogPackage =
  | "cache"
  | "controller"
  | "cron_job"
  | "db"
  | "domain"
  | "handler"
  | "repository"
  | "route"
  | "service"
  | "api"
  | "component"
  | "hook"
  | "page"
  | "state"
  | "style"
  | "auth"
  | "config"
  | "middleware"
  | "utils";

interface TelemetryPayload {
  stack: LogStack;
  level: LogLevel;
  package: LogPackage;
  message: string;
}

/**
 * Transmits a system trace to the remote logging service
 * @param token Authorization Bearer token
 * @param payload Log details
 */
export const transmitSystemTrace = async (
  token: string,
  payload: TelemetryPayload
): Promise<void> => {
  const LOG_ENDPOINT = "/evaluation-service/logs";

  try {
    const response = await fetch(LOG_ENDPOINT, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Telemetry Transmission Failed: ${errorText}`);
    } else {
      const result = await response.json();
      console.log(`Telemetry Recorded: ${result.logID}`);
    }
  } catch (error) {
    console.error("Critical Failure in Telemetry Middleware:", error);
  }
};
