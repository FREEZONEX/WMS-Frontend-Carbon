# WMS Frontend with NextJS + Carbon UI

Clone the repository to your local device. Run the following cmd:

```bash
npm install
npm run dev
```

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
