export function isLandlinePhone(phone) {
  if (phone.length > 4) {
    const firstDigit = parseInt(phone[4]);
    if (firstDigit < 6) {
      return true;
    }
  } else {
    return false;
  }
}

export function parseToLandlinePhone(phone) {
  if (phone[9] === "-") {
    return phone.slice(0, 8) + "-" + phone[8] + phone.slice(10, 13);
  }
}
