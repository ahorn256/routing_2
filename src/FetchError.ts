export interface IFetchError {
  message: string;
  status?: number;
};

export function convertToFetchError(error: unknown) {
  if(error instanceof Error) {
    return { message: error.message };
  } else if(error !== null && typeof error === 'object' && 'message' in error) {
    return error as IFetchError;
  } else {
    return { message: 'unknown error' };
  }
};
