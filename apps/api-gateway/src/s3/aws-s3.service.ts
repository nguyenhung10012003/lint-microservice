import { Injectable } from '@nestjs/common';
import { S3 } from 'aws-sdk';

@Injectable()
export class AwsS3Service {
  private readonly s3: S3;
  constructor() {
    this.s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadFile(file: Express.Multer.File): Promise<string> {
    const params: S3.PutObjectRequest = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `media/${Date.now()}-${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
    };
    const data = await this.s3.upload(params).promise();
    return data.Location;
  }

  async uploadFiles(files: Express.Multer.File[]): Promise<string[]> {
    return Promise.all(
      files.map(async (file) => {
        return this.uploadFile(file);
      }),
    );
  }

  async deleteFile(fileUrl: string): Promise<void> {
    return;
  }
}
