module.exports = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: 'us-east-2',
  appName: 'Packt NodeJS',
  envName: 'packt-nodejs-env-dev',
  solutionStack: '64bit Amazon Linux 2017.09 v2.9.2 running Docker 17.12.0-ce',

  version: '0.1.0_build' + process.env.BUILD_NUMBER,
  bucketConfig: {
    Bucket: process.env.S3_BUCKET,
    ACL: "authenticated-read",
  },
}
