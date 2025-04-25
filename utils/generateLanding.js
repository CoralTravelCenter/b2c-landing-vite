import path from "path";
import fs from "fs";
import {processSection} from "./processSection.js";
import {combineIntoLandingPage} from "./combineIntoLandingPage.js";
import {injectSections} from "./injectSections.js";

/**
 * Генерирует финальный HTML лэндинга из шаблона и секций, указанных в конфигурации.
 * @param {string} templatePath - Путь к HTML-шаблону, содержащему базовую разметку страницы.
 * @param {{ sections: string[] }} configData - Конфигурационный объект, содержащий массив путей к секциям.
 * @param {string} devDir - Путь к директории, в которую сохраняется итоговый `index.html`.
 * @returns {Promise<string>} Сгенерированный HTML-код лэндинга.
 */

export async function generateLanding(templatePath, configData, devDir) {
  try {
    // Обрабатываем все секции, передавая экземпляр Vite
    const processedSectionsPromises = configData.sections.map(sectionPath =>
      processSection(sectionPath)
    )

    // Ждем завершения обработки всех секций
    const processedSections = await Promise.all(processedSectionsPromises)

    // Объединяем секции в один HTML-файл
    const landingHTML = combineIntoLandingPage(
      processedSections
    )

    const injectedLandingHTML = await injectSections(templatePath, landingHTML)

    // Сохраняем результат в файл
    const outputPath = path.join(devDir, 'index.html') // Изменяем путь на dev
    fs.writeFileSync(outputPath, injectedLandingHTML)

    
  } catch (error) {
    console.error(`Ошибка при генерации лэндинга: ${error.message}`)
  }
}
