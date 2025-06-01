import inquirer from "inquirer";

/**
 * Показывает интерактивное окно с чекбоксами для выбора дополнительных опций проекта.
 *
 * @returns {Promise<string[]>} Массив выбранных значений, таких как 'sass', 'vue', 'git' и т.д.
 */
export async function askExtrasWithCheckboxes() {
  const {features} = await inquirer.prompt([
    {
      type: 'checkbox',
      name: 'features',
      message: 'Что добавить в проект?',
      choices: [
        {name: 'Sass', value: 'sass', checked: true},
        {name: 'Vue', value: 'vue'},
        {name: 'Less', value: 'less'},
        {name: 'Pug', value: 'pug'},
        {name: 'Инициализировать git-репозиторий', value: 'git'},
      ]
    }
  ]);
  return features;
}
