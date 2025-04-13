import { Request, Response } from "express";
import { submitOtp } from "../services/zomatoService";

export const validateOtp = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { otp } = req.body;

  if (!otp || otp.length !== 6) {
    res.status(400).json({
      success: false,
      error: "Invalid or missing OTP.",
    });
    return;
  }

  try {
    await submitOtp(otp);
    res
      .status(200)
      .json({ success: true, message: "OTP validated successfully." });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
