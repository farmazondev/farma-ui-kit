// Validation patterns
const patterns = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phone: /^[0-9]{10,11}$/,
  iban: /^[0-9]{24}$/,
  number: /^[0-9]*$/,
  taxNumber: /^[0-9]{10}$/,
  identityNumber: /^[0-9]{11}$/,
  mersisNumber: /^\d{4}-\d{4}-\d{4}-\d{4}$/,
  ccNumber: /^[0-9\s]{13,19}$/,
  ccExpiration: /^[0-9]{2}\/[0-9]{2}$/,
  text: null,
};

// Masking functions
export const maskPhone = (value) => {
  const input = value.replace(/\D/g, '').substring(0, 11);
  if (input.length === 0) return '';
  if (input.length <= 1) return input;
  if (input.length <= 4) return `${input.substring(0, 1)} (${input.substring(1)}`;
  if (input.length <= 7) return `${input.substring(0, 1)} (${input.substring(1, 4)}) ${input.substring(4)}`;
  return `${input.substring(0, 1)} (${input.substring(1, 4)}) ${input.substring(4, 7)} ${input.substring(7, 9)} ${input.substring(9)}`;
};

export const maskIban = (value) => {
  const input = value.replace(/\D/g, '').substring(0, 24);
  if (input.length === 0) return '';
  
  const digit1 = input.substr(0, 2);
  const digit2 = input.substr(2, 4);
  const digit3 = input.substr(6, 4);
  const digit4 = input.substr(10, 4);
  const digit5 = input.substr(14, 4);
  const digit6 = input.substr(18, 4);
  const digit7 = input.substr(22, 2);

  let result = `TR${digit1}`;
  if (input.length > 2) result += ` ${digit2}`;
  if (input.length > 6) result += ` ${digit3}`;
  if (input.length > 10) result += ` ${digit4}`;
  if (input.length > 14) result += ` ${digit5}`;
  if (input.length > 18) result += ` ${digit6}`;
  if (input.length > 22) result += ` ${digit7}`;

  return result;
};

export const maskCCNumber = (value) => {
  const input = value.replace(/\D/g, '');
  let formatted = '';

  for (let i = 0; i < input.length; i += 4) {
    if (i > 0) formatted += ' ';
    formatted += input.substring(i, i + 4);
  }

  return formatted;
};

export const maskCCExpiration = (value) => {
  const input = value.replace(/\D/g, '').substring(0, 4);
  if (input.length === 0) return '';
  if (input.length <= 2) return input;
  return `${input.substring(0, 2)}/${input.substring(2)}`;
};

export const maskTaxNumber = (value) => {
  return value.replace(/\D/g, '').substring(0, 10);
};

export const maskIdentityNumber = (value) => {
  return value.replace(/\D/g, '').substring(0, 11);
};

export const maskMersisNumber = (value) => {
  const input = value.replace(/\D/g, '').substring(0, 16);
  if (input.length === 0) return '';
  if (input.length <= 4) return input;
  if (input.length <= 8) return `${input.substring(0, 4)}-${input.substring(4)}`;
  if (input.length <= 12) return `${input.substring(0, 4)}-${input.substring(4, 8)}-${input.substring(8)}`;
  return `${input.substring(0, 4)}-${input.substring(4, 8)}-${input.substring(8, 12)}-${input.substring(12)}`;
};

// Validation functions
export const isValidEmail = (value) => {
  return patterns.email.test(value);
};

export const isValidPhone = (value) => {
  return value.replace(/\D/g, '').length === 11;
};

export const isValidIban = (value) => {
  return value.replace(/\D/g, '').length === 24;
};

export const isValidTaxNumber = (value) => {
  return patterns.taxNumber.test(value);
};

export const isValidIdentityNumber = (value) => {
  return patterns.identityNumber.test(value);
};

export const isValidMersisNumber = (value) => {
  return patterns.mersisNumber.test(value);
};

export const isValidCCNumber = (value) => {
  const trimmed = value.replace(/[\s]/g, '');
  if (!/^[0-9]+$/.test(trimmed)) return false;

  // Luhn algorithm
  let odd = false;
  let total = 0;

  for (let i = trimmed.length; i > 0; i--) {
    let calc = parseInt(trimmed.charAt(i - 1), 10);
    if (!odd) {
      total += calc;
    } else {
      calc = calc * 2;
      if (calc > 9) calc -= 9;
      total += calc;
    }
    odd = !odd;
  }

  return total % 10 === 0;
};

export const isValidCCExpiration = (value) => {
  if (!patterns.ccExpiration.test(value)) return false;
  const [month, year] = value.split('/');
  const now = new Date();
  const currentYear = now.getFullYear() % 100;
  const currentMonth = now.getMonth() + 1;

  const expYear = parseInt(year, 10);
  const expMonth = parseInt(month, 10);

  if (expYear < currentYear) return false;
  if (expYear === currentYear && expMonth < currentMonth) return false;

  return true;
};

// Masking dispatcher
export const applyMask = (inputType, value) => {
  const maskFunctions = {
    phone: maskPhone,
    iban: maskIban,
    ccNumber: maskCCNumber,
    ccExpiration: maskCCExpiration,
    taxNumber: maskTaxNumber,
    identityNumber: maskIdentityNumber,
    mersisNumber: maskMersisNumber,
    text: (val) => val,
  };

  const maskFn = maskFunctions[inputType];
  return maskFn ? maskFn(value) : value;
  return maskFn ? maskFn(value) : value;
};

// Validation dispatcher
export const validateInput = (inputType, value) => {
  if (!value) return true;

  const validationFunctions = {
    email: isValidEmail,
    phone: isValidPhone,
    iban: isValidIban,
    taxNumber: isValidTaxNumber,
    identityNumber: isValidIdentityNumber,
    mersisNumber: isValidMersisNumber,
    ccNumber: isValidCCNumber,
    ccExpiration: isValidCCExpiration,
    number: (val) => /^[0-9]*$/.test(val),
    text: () => true,
  };

  const validationFn = validationFunctions[inputType];
  return validationFn ? validationFn(value) : true;
};

export const getErrorMessage = (inputType, value) => {
  const errorMessages = {
    email: 'Lütfen geçerli bir email adresi yazınız.',
    phone: 'Lütfen geçerli bir telefon numarası yazınız.',
    iban: 'Lütfen geçerli bir IBAN numarası yazınız.',
    taxNumber: 'Lütfen geçerli bir vergi numarası yazınız.',
    identityNumber: 'Lütfen geçerli bir TC Kimlik no giriniz.',
    mersisNumber: 'MERSİS numarası 16 haneli olmalıdır.',
    ccNumber: 'Lütfen geçerli bir kart numarası yazınız.',
    ccExpiration: 'Lütfen geçerli bir tarih yazınız. Ör: 10/24',
    number: 'Lütfen sadece rakam yazınız.',
  };

  return errorMessages[inputType] || 'Geçersiz değer.';
};
