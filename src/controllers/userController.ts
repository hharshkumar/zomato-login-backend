import { Request, Response } from "express";
import { fetchUserInfo } from "../services/zomatoService";

export const getUserInfo = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const userInfo = await fetchUserInfo();
    res.status(200).json({ success: true, data: userInfo });
  } catch (error) {
    res.status(500).json({ success: false, error: (error as Error).message });
  }
};
