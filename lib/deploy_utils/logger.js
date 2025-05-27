import chalk from 'chalk';
import figures from 'figures';
import ora from 'ora';

export function fatal(message) {
  console.log("\n" + chalk.red(`${figures.warning} ${message}`) + "\n");
}

export function success(message) {
  console.log("\n" + chalk.greenBright(`${figures.tick} ${message}`) + "\n");
}

export function taskHead(message) {
  console.log("\n" + chalk.bgBlackBright.yellowBright(message.padOrTrimTo(80)) + "\n");
}

export async function asyncTask(message, promise) {
  const spinner = ora();
  return new Promise(async resolve => {
    spinner.start(chalk.yellow(message + '...'));
    try {
      const result = await promise;
      spinner.succeed(chalk.green(message));
      resolve(result);
    } catch (ex) {
      spinner.fail(chalk.red(message));
      console.log(ex);
    }
  });
}
