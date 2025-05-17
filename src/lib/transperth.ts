import jsdom from 'jsdom';
import puppeteer from 'puppeteer';
const {JSDOM} = jsdom;

export type BusTimetableEntry = {
    isLive: boolean,
    serviceNo: string,
    timeToArrive: string,
    scheduledTime: string
  }

export async function fetchBusStopTimes(stopNo:number):Promise<BusTimetableEntry[]> {
    const response = await fetch(`https://136213.mobi/RealTime/RealTimeStopResults.aspx?SN=${stopNo}`)
    const responseText = await response.text()
    const entries = parseTimetablePage(responseText, 'bus');

    return entries;
}

export async function fetchTrainTimes(station:string, trainline: string, terminus: string):Promise<BusTimetableEntry[]> {
    const browser = await puppeteer.launch()
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