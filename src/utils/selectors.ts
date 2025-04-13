export const selectors = {
  loginButton: "text=Log in",
  mobileNumberInput: "Phone",
  frameIdSelector: "#auth-login-ui",
  otpInputSelector: 'input[pattern="[a-zA-Z0-9]{1}"]',
  submitButton: "button:has-text('Send One Time Password')",
  userNameSelector: "div[src*='zmtcdn.com'] + span",
  optExhaustedSelector:
    "p:has-text('OTP attempts exhausted. Please try other login methods.')",
  optWarningSelector:
    "p:has-text('The OTP entered is invalid/incorrect. Please try again.|Something went wrong')",
};
