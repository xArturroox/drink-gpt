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
      // eslint-disable-next-line no-console
      console.info(message, ...optionalParams);
    }
  },
  warn(message, ...optionalParams) {
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.warn(message, ...optionalParams);
    }
  },
  error(message, ...optionalParams) {
    // We always log errors, even in production
    // eslint-disable-next-line no-console
    console.error(message, ...optionalParams);
  },
  debug(message, ...optionalParams) {
    if (process.env.NODE_ENV === "development") {
      // eslint-disable-next-line no-console
      console.debug(message, ...optionalParams);
    }
  },
};
