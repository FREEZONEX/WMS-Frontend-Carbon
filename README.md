# WMS Frontend with NextJS + Carbon UI

The following diagram shows the structure of this system.
![alt text](./image.png)
Or you can click [here](https://ofra65wfwe.feishu.cn/docx/VO6Gdq3bAoTUS4x1ah1cDfLLnAd) to view.

Clone the repository to your local device. Run the following cmd:

below command is used for running in development mode

```bash
npm install
npm run dev
```

running in production mode enhances performance and speed

```bash
npm run build
npm start
```

The backend API is configured in next.config.js. Please modify the host and port accordingly if you are running the backend locally

You will see the project start and run in localhost 3000 (or some random port if port 3000 is not available).

Configure paths in `jsconfig.json`

```
{
  "compilerOptions": {
    "baseUrl": "./src",
    "paths": {
      "@/components/*": ["components/*"],
      "@/app/*": ["app/*"]
   }
  }
}
```
