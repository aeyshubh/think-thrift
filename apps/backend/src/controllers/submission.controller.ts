import { NextFunction, Request, Response } from 'express';
import { Container } from 'typedi';
import { OpenaiService } from '@/services/openai.service';
import { Submission } from '@/interfaces/submission.interface';
import { HttpException } from '@/exceptions/HttpException';
import { ContractsService } from '@/services/contracts.service';

export class SubmissionController {
  public openai = Container.get(OpenaiService);
  public contracts = Container.get(ContractsService);

  public submitReceipt = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const body: Omit<Submission, 'timestamp'> = req.body;
      const validationResult = await this.openai.validateImage(body.image);
      const validityFactor = (validationResult as object)?.validityFactor;
      const amount = (validationResult as object)?.amount;
      let submissionRequest: Submission;
      if(validityFactor > 0.5){
       submissionRequest = {
        ...body,
        amount: amount,
        timestamp: Date.now(),
      };
      // Submission validation with smart contract
      await this.contracts.validateSubmission(submissionRequest);
    }
      else{
         submissionRequest = {
          ...body,
          amount: 0,
          timestamp: Date.now(),
        };
        // Submission validation with smart contract
        await this.contracts.validateSubmission(submissionRequest);
      }
     

      if (validationResult == undefined || !('validityFactor' in (validationResult as object))) {
        throw new HttpException(500, 'Error validating image');
      }

      const descriptionOfAnalysis = (validationResult as object)?.descriptionOfAnalysis;
      console.log('validityFactor', validityFactor);
      console.log('amount', amount);
      console.log('descriptionOfAnalysis', descriptionOfAnalysis);
      if (validityFactor > 0.5) {
        if (!(await this.contracts.registerSubmission(submissionRequest))) {
          throw new HttpException(500, 'Error registering submission and sending rewards');
        }
      }

      res.status(200).json({ validation: {descriptionOfAnalysis:descriptionOfAnalysis,amount:amount,validityFactor:validityFactor} });
    } catch (error) {
      next(error);
      return;
    }
  };
}
