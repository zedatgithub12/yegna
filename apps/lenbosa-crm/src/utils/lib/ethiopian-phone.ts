export function EthiopianPhoneNumber(phone: string): string | null {
  if (!phone) return null;

  let cleaned = phone.replace(/\D/g, "");

  if (cleaned.startsWith("0")) {
    cleaned = cleaned.slice(1);
  } else if (cleaned.startsWith("251")) {
    cleaned = cleaned.slice(3);
  }

  if (/^[79]\d{8}$/.test(cleaned)) {
    return `+251${cleaned}`;
  }

  return phone;
}
