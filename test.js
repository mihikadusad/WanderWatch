function convertToSeconds(timeString) {
    // Split the time string into hours and minutes
    const [hours, minutes] = timeString.split(':').map(Number);
    
    // Calculate the total seconds
    const totalSeconds = (hours * 60 + minutes) * 60;
    
    return totalSeconds;
  }
  
function getCurrentTime(){
    const currentDate = new Date();
    const currentHour = currentDate.getHours();
    const currentMinute = currentDate.getMinutes();
    return (currentHour*60+currentMinute) * 60;
}

  // Example usage:
  const timeString = "12:30";
  const totalSeconds = convertToSeconds(timeString);
  console.log(totalSeconds); // Output: 45000