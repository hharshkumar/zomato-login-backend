import { Request, Response } from "express";
import { initiateLogin } from "../services/zomatoService";

export const login = async (req: Request, res: Response): Promise<void> => {
  const { mobileNumber } = req.body;
  const mobileNumberPattern = /^[6-9]\d{9}$/;

  if (!mobileNumber || !mobileNumberPattern.test(mobileNumber)) {
    res.status(400).json({
      success: false,
      error: "Invalid or missing mobile number.",
    });
    return;
  }

  try {
    await initiateLogin(mobileNumber);
    res.status(200).json({
      success: true,
      message: "Mobile number submitted. Please enter OTP.",
    });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
