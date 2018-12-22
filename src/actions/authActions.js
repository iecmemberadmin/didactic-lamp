export const AUTHENTICATED = 'authenticated';

export function authenticate() {
  return {
    type: AUTHENTICATED,
    payload: {
      auth: true
    }
  }
}