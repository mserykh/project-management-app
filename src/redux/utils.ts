export const errorHandler = (error: Record<string, unknown>): string | void => {
  const code = error.status;
  switch (code) {
    case 401:
      return `_ERR_SERVER_CODE_401_`;
    case 403:
      return '_ERR_SERVER_CODE_403_';
    case 404:
      return '_ERR_SERVER_CODE_404_';
    case 408:
      return '_ERR_SERVER_CODE_408_';
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
    case 505:
    case 506:
    case 507:
    case 508:
    case 509:
    case 510:
    case 511:
    case 520:
    case 521:
    case 522:
    case 523:
    case 524:
    case 525:
    case 526:
      return '_ERR_SERVER_CODE_UNHANDLED_';
  }
};
