import { VALIDATION_RULES } from '../../consts';

export function validate(data: Record<string, string>): boolean {
  let isValid = true;

  Object.entries(data).forEach(([key, value]) => {
    const { regExp } = VALIDATION_RULES[key];
    isValid = isValid && regExp.test(value);
  });

  return isValid;
}
