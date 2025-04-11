import fs from "fs";
import path from "path";

/**
 * Получает путь к шаблону страницы
 * @param {string} jsonFilePath - Путь к JSON с конфигом бренда
 * @param __dirname
 * @return {string} - Путь к шаблону страницы
 */
export async function getTemplatePathByBrand(jsonFilePath, __dirname) {
  try {
    const jsonContent = fs.readFileSync(jsonFilePath, 'utf-8')
    const config = JSON.parse(jsonContent)

    // Получаем бренд из конфигурации
    const brand = config.brand

    // Формируем путь к шаблону на основе бренда
    const templatePath = path.join(__dirname, `web-root/${brand}-next/content.desktop.html`)

    // Проверяем существование шаблона
    if (!fs.existsSync(templatePath)) {
      console.warn(`Шаблон для бренда ${brand} не найден: ${templatePath}`)
      console.warn('Используем шаблон по умолчанию')
      return path.join(__dirname, 'web-root/coral-next/content.desktop.html')
    }

    console.log(`Используется шаблон для бренда ${brand}: ${templatePath}`)
    return templatePath
  } catch (error) {
    console.error(`Ошибка при получении шаблона: ${error.message}`)
    return path.join(__dirname, 'web-root/coral-next/content.desktop.html')
  }
}
