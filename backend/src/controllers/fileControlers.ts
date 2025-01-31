import { Request, Response } from 'express';
import Record from '../models/DataModels';
import { parseAndValidateExcel } from '../utils/fileprocessor';
import fs from 'fs';

export async function uploadFile(req: Request, res: Response): Promise<void> { // Explicitly return void
  // Ensure file is uploaded
  if (!req.file) {
    
    res.status(400).json({ error: 'No file uploaded' }); // Use return to prevent further code execution
    return;
  }

  try {
    // Parse and validate the Excel file
    console.log('File path:', req.file.path);
    const { errors, records } = await parseAndValidateExcel(req.file.path);

    // Clean up the uploaded file after processing
    // fs.unlinkSync(req.file.path);

    // Insert records into the database
    const rec= await Record.insertMany(records);
    
    // If there are validation errors, send them in the response
    if (errors.length > 0) {
      res.status(400).json({ errors }); // Use return to prevent further code execution
      return;
    }

    

    // Send success response with processed records
     res.status(200).json({ message: 'File processed successfully', rec}); // Use return to prevent further code execution
     return;
  } catch (error: any) {
    // Improved error handling for better debugging
    if (error instanceof Error) {
       res.status(500).json({ error: 'Internal server error', details: error.message }); // Use return to prevent further code execution
       return;
    } else {
       res.status(500).json({ error: 'Unknown error during file upload' }); // Use return to prevent further code execution
       return;
    }
  }
}
