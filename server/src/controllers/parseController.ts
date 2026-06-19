import { Request, Response } from 'express';
import { parseFacebookPost } from '../utils/postParser';

export const parsePost = (req: Request, res: Response) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ message: 'No text provided' });
  }

  const parsedData = parseFacebookPost(text);
  res.status(200).json(parsedData);
};
