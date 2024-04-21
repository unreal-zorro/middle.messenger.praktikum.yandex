export interface PasswordModel extends Record<string, string> {
  oldPassword: string;
  newPassword: string;
}
