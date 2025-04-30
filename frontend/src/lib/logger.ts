/**
 * Logger utility to standardize logging throughout the application
 * This allows us to disable console statements in production or
 * replace them with a more sophisticated logging system in the future.
 */

interface Logger {
  info(message: unknown, ...optionalParams: unknown[]): void;

  warn(message: unknown, ...optionalParams: unknown[]): void;

  error(message: unknown, ...optionalParams: unknown[]): void;

  debug(message: unknown, ...optionalParams: unknown[]): void;
}

export const logger: Logger = {
  info(message, ...optionalParams) {
    if (process.env.NODE_ENV !== "production") {
      console.info(message, ...optionalParams);
    }
  },
  warn(message, ...optionalParams) {
    if (process.env.NODE_ENV !== "production") {
      console.warn(message, ...optionalParams);
    }
  },
  error(message, ...optionalParams) {
    // We always log errors, even in production
    console.error(message, ...optionalParams);
  },
  debug(message, ...optionalParams) {
    if (process.env.NODE_ENV === "development") {
      console.debug(message, ...optionalParams);
    }
  },
};
