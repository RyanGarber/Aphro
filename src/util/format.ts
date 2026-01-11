export const formatString = (str: string, { ...replacements }: Record<string, unknown>): string => {
  let formatted = str;
  for (const [key, value] of Object.entries(replacements)) {
    formatted = formatted.replaceAll(`%{${key}}s`, String(value));
  }
  return formatted;
};
