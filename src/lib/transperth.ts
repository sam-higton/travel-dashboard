import jsdom from 'jsdom';
import puppeteer, { Browser as PuppeteerBrowser }  from 'puppeteer';
import puppeteerCore, { Browser as CoreBrowser } from "puppeteer-core";
import chromium from "@sparticuz/chromium-min";
const {JSDOM} = jsdom;

export const dynamic = 'force-dynamic';

export type BusTimetableEntry = {
    isLive: boolean,
    serviceNo: string,
    timeToArrive: string,
    scheduledTime: string
  }

  const remoteExecutablePath =
  "https://github.com/Sparticuz/chromium/releases/download/v121.0.0/chromium-v121.0.0-pack.tar";
  
  let browser: PuppeteerBrowser | CoreBrowser | undefined;

  async function getBrowser():Promise<PuppeteerBrowser | CoreBrowser> {

    if (browser) return browser;
   
   if (process.env.NEXT_PUBLIC_VERCEL_ENVIRONMENT === 'production') {
      browser = await puppeteerCore.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(remoteExecutablePath),
      headless: true,
    });
    } else {
      browser = await puppeteer.launch({
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
      headless: true,
    });
    }
    return browser;
}

export async function fetchBusStopTimes(stopNo:number):Promise<BusTimetableEntry[]> {
    const response = await fetch(`https://136213.mobi/RealTime/RealTimeStopResults.aspx?SN=${stopNo}`, {next: {revalidate: 60}})
    const responseText = await response.text()
    const entries = parseTimetablePage(responseText, 'bus');

    return entries;
}

export async function fetchTrainTimes(station:string, trainline: string, terminus: string):Promise<BusTimetableEntry[]> {
    const browser = await getBrowser();
    const page = await browser.newPage()
    await page.goto(`https://136213.mobi/RealTime/RealTimeStopResults.aspx?station=${station}&trainline=${trainline}`)
    const html = await page.content();
    const entries = parseTimetablePage(html, 'train');
    if(entries[0].serviceNo.includes(terminus)) return entries;

    await page.waitForSelector('#btnReverseDirection');
    const navigationPromise = page.waitForNavigation({ 
        waitUntil: 'networkidle0' // Wait until network is idle
    });
    await page.click('#btnReverseDirection');
    await navigationPromise;
    const reverseHtml = await page.content();


    return parseTimetablePage(reverseHtml, 'train');
}

function parseTimetablePage(html:string, type: 'train' | 'bus'):BusTimetableEntry[] {

    const dom = new JSDOM(html);
    const entries:BusTimetableEntry[] = []
    dom.window.document.querySelectorAll('#pnlStopTimetable .tpm_row_timetable_wrap').forEach((entry) => {
      const isLive = entry.querySelector('.tt-livetext') !== null;
      let serviceNo = '';
      if(type === 'bus') {
        serviceNo = entry.querySelector('.tpm_row_timetable > div > span')?.textContent || '';
      } else {
        serviceNo = entry.querySelector('.tpm_row_timetable > div > .route-display-name')?.textContent || '';
      }
      const timeToArrive = entry.querySelector('.tpm_row_timetable > div:nth-of-type(3) strong')?.textContent?.replace('(sched.)','') || ''
      const scheduledTime = entry.querySelector('.tpm_row_timetable > div:nth-of-type(3) > br')?.nextSibling?.textContent?.trim() || '';
      entries.push({
        isLive, serviceNo, timeToArrive, scheduledTime
      })
    });
    return entries;
}