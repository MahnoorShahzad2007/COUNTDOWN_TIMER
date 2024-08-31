import inquirer from 'inquirer';
import chalk from 'chalk';

// Function to format time in HH:MM:SS
function formatTime(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;
  
  const formattedHours = hours.toString().padStart(2, '0');
  const formattedMinutes = minutes.toString().padStart(2, '0');
  const formattedSeconds = seconds.toString().padStart(2, '0');

  return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

// Function to start the countdown timer
async function startCountdown(duration: number): Promise<void> {
  const endTime = Date.now() + duration;

  const interval = setInterval(() => {
    const remainingTime = endTime - Date.now();
    if (remainingTime <= 0) {
      clearInterval(interval);
      console.log(chalk.green('Countdown finished!'));
    } else {
      console.log(`Time remaining: ${formatTime(remainingTime)}`);
    }
  }, 1000);
}

// Main function to prompt user and start the countdown
async function main() {
  const { minutes } = await inquirer.prompt([
    {
      type: 'input',
      name: 'minutes',
      message: 'Enter the countdown duration in minutes:',
      validate: (input: string) => {
        const num = parseFloat(input);
        if (isNaN(num) || num <= 0) {
          return 'Please enter a valid positive number.';
        }
        return true;
      },
    },
  ]);

  const durationInMinutes = parseFloat(minutes);
  const durationInMillis = durationInMinutes * 60 * 1000;

  console.log(chalk.cyan(`Starting countdown for ${durationInMinutes} minute(s)...`));
  await startCountdown(durationInMillis);
}

main().catch((error) => console.error(chalk.red('An error occurred:'), error));

