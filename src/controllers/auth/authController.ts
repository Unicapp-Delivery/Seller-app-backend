import { generateToken, verifyToken } from "authenticator";
import dotenv from "dotenv";
dotenv.config();
import { createMessage } from "../../utils/twilio";
import { Request, Response } from "express";
import { prisma } from "../../config/db";
import jwt from "jsonwebtoken";

import { JWT_SECRET, SECRET_KEY } from "../../config/config";
declare module "express-serve-static-core" {
  interface Request {
    id: string;
  }
}
export const signup = async (req: Request, res: Response) => {
  const phoneNumber = req.body.phoneNumber as string;
  const totp = generateToken(phoneNumber + SECRET_KEY);

  if (!phoneNumber) {
    res.status(400).json({ message: "Phone number is required" });
    return;
  }

  const user = await prisma.seller.upsert({
    where: { phoneNumber },
    create: { phoneNumber },
    update: { phoneNumber }
  });

  // Send OTP
  if (process.env.NODE_ENV === 'production') {
    // Send Otp via sms
    try {
      await createMessage(`Your login OTP for unicapp is ${totp}`, phoneNumber)
      res.json({
        message: "OTP sent Successfully"
      })
      return;
    } catch (e) {
      console.log(e)
      res.json({
        message: "Failed to send OTP"
      })
      return;
    }
  }
  // If in development mode, log the OTP to the response 
  // Remove this in production
  res.json({
    totp,
    message: "OTP sent"
  })
  return;
}
// Verify Otp

export const verifyOtp = async (req: Request, res: Response) => {
  try {
    const { totp, phoneNumber } = req.body
    if (!totp || !phoneNumber) {
      res.status(400).json({ message: "Phone number and OTP are required" });
      return;
    }

    const isVerified = verifyToken(phoneNumber + SECRET_KEY, totp);
    if (!isVerified) {
      res.status(400).json({ message: "Invalid OTP" });
      return;
    }
    const user = await prisma.seller.findUnique({
      where: { phoneNumber }
    });
    const token = jwt.sign({
      user,
    }, JWT_SECRET as string)
    res.cookie('token', token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7), // 7 days
    })
    res.json({
      message: "OTP verified successfully",
      user
    })
    return;
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
    return;
  }

}
export const register = async (req: Request, res: Response) => {
  const userId = req.id
  const { bussinessName, email, subDomain, bio, instagramHandle, sellerLocation, paymentOptions } = req.body
  if (!userId) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }
  try {

    if (!paymentOptions.paymentType || !['UPI', 'BANK'].includes(paymentOptions.paymentType)) {

      res.status(400).json({ message: "Invalid or missing paymentType" });
      return;
    }
    const user = await prisma.seller.update({
      where: {
        id: userId
      },
      data: {
        bussinessName: bussinessName,
        email: email,
        subDomain: subDomain,
        bio: bio,
        instagramHandle: instagramHandle,
        sellerLocation: {
          create: {
            floor: sellerLocation.floor,
            buildingName: sellerLocation.buildingName,
            Landmark: sellerLocation.landmark,
            latitude: sellerLocation.latitude,
            longitude: sellerLocation.longitude,
            address: sellerLocation.address,
          }
        },
        paymentOptions: {
          upsert: {
            where: {
              sellerId: userId
            },
            create: {
              paymentType: paymentOptions.paymentType,
              ...(paymentOptions.paymentType === 'UPI' && {
                upiId: paymentOptions.upiId,
              }),
              ...(paymentOptions.paymentType === 'BANK' && {
                bankName: paymentOptions.bankName,
                accountNumber: paymentOptions.accountNumber,
                ifscCode: paymentOptions.ifscCode,
                accountHolderName: paymentOptions.accountHolderName,
              }),
            },
            update: {
              paymentType: paymentOptions.paymentType,
              ...(paymentOptions.paymentType === 'UPI' && {
                upiId: paymentOptions.upiId,
              }),
              ...(paymentOptions.paymentType === 'BANK' && {
                bankName: paymentOptions.bankName,
                accountNumber: paymentOptions.accountNumber,
                ifscCode: paymentOptions.ifscCode,
                accountHolderName: paymentOptions.accountHolderName,
              }),
            }
          }

        },
      }
    })
    res.json({
      message: "User registered successfully",
      user
    })
    return;
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Internal server error" });
    return;
  }
}
