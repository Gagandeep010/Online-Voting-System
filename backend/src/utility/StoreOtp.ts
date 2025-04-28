// src/utils/otpStore.ts

interface OtpStore {
  [adharID: string]: {
    otp: string;
    expiresAt: number;
  };
}

const otpStore: OtpStore = {};

export default otpStore;
