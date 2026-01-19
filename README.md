Prerequisites for the Windows PC
Node.js: Download and install (the LTS version is recommended). This is required to run the development server and build the site.
Git: Download and install (to easily download your code from GitHub).
Step-by-Step Installation
Download your code: Open Command Prompt or PowerShell and run:
bash
git clone https://github.com/Top-the-ace/traveler.git
cd traveler
Install dependencies: This will install the necessary packages (like Vite) into a node_modules folder:
bash
npm install
Run the site locally: To see the site in "development mode" (where it updates as you change code):
bash
npm run dev
You will see a link like http://localhost:5173/. Open it in your browser.
Create a Production Version (Optional): If you want to create a final, optimized version of the site (for example, to host it on a web server):
bash
npm run build
This will create a dist folder containing only the static HTML, CSS, and JS files. You can simply copy the contents of this folder to any web server (like Nginx, Apache, or host it on services like Netlify/Vercel).
Summary Checklist for Windows
Action	Command
Get Code	git clone https://github.com/Top-the-ace/traveler.git
Setup	npm install
Launch	npm run dev
Does this help? Let me know if you run into any issues on your Windows machine!
