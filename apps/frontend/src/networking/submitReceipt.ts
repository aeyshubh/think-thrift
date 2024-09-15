import axios from "axios";
import { ReceiptData } from "./type";
import { backendURL } from "../config";

export type Response = {
  validation: {
    validityFactor: number;
    amount: number;
    descriptionOfAnalysis: string;
  };
};

export const submitReceipt = async (data: ReceiptData): Promise<Response> => {
  try {
    const response = await axios.post(`${backendURL}/submitReceipt`, data);
    console.log('response', response.data); 
    return response.data;
  } catch (error: unknown) {
    console.error("Error posting data:", error);
    throw error;
  }
};
