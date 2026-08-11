import puppeteer from 'puppeteer';

(async () => {
  console.log('Starting puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-web-security'] // disable web security to avoid some localhost cors, but we want to see what fails
  });
  const page = await browser.newPage();
  
  // Emulate Android Chrome
  await page.setUserAgent('Mozilla/5.0 (Linux; Android 13; SM-G998B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36');
  await page.setViewport({ width: 393, height: 852, isMobile: true });

  // Log all network requests
  page.on('request', request => {
    if (request.url().includes('firebase') || request.url().includes('googleapis')) {
      console.log('>>', request.method(), request.url());
    }
  });

  page.on('requestfailed', request => {
    if (request.url().includes('firebase') || request.url().includes('googleapis')) {
      console.log('FAILED:', request.url(), request.failure()?.errorText);
    }
  });

  page.on('response', response => {
    if (response.url().includes('firebase') || response.url().includes('googleapis')) {
      console.log('<<', response.status(), response.url());
    }
  });

  page.on('console', msg => console.log('PAGE LOG:', msg.text()));

  console.log('Navigating to app...');
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle0' });

  console.log('Clicking Register Now...');
  // Click "Register Now" to open modal
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const registerBtn = buttons.find(b => b.textContent.includes('Register Now'));
    if (registerBtn) registerBtn.click();
  });

  await new Promise(r => setTimeout(r, 1000));

  console.log('Clicking Sign in with Google...');
  // Click "Sign in with Google" inside modal
  await page.evaluate(() => {
    const buttons = Array.from(document.querySelectorAll('button'));
    const signInBtn = buttons.find(b => b.textContent.includes('Sign in with Google'));
    if (signInBtn) signInBtn.click();
  });

  console.log('Waiting for network/auth...');
  await new Promise(r => setTimeout(r, 5000));

  await browser.close();
  console.log('Done.');
})();
