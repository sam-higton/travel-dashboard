

export function currentTime(timezone:string):string {
    // Create a date object for the current time
  const now = new Date();
  
  // Format the date based on the provided timezone
  // Using Intl.DateTimeFormat for proper timezone handling
  const formatter = new Intl.DateTimeFormat('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
    timeZone: timezone
  });
  
  // Get the formatted time string
  const formattedTime = formatter.format(now);
  
  // Return just the time part (HH:MM)
  return formattedTime;
    
}