import { getNextData } from "./getNextData.js";
import { setNextData } from "./setNextData.js";
import { resolve } from "path";

/**
 * Обновляет `NEXT_DATA` в `content.desktop.html`
 * @param {string} brandDir - Путь к директории бренда (web-root/${BRAND.env.brand}/)
 * @param {string} updatedHtml - Новое содержимое секции
 */
export function updateNextData(brandDir, updatedHtml) {
  const contentHtmlPath = brandDir

  // Получаем текущий NEXT_DATA
  const nextData = getNextData(contentHtmlPath);
  if (!nextData) return;

  // Обновляем `widgetData.content`, если нужно
  if (
    nextData.widgetData &&
    typeof nextData.widgetData.content === "string" &&
    nextData.widgetData.content.includes("<!-- {{custom_widget}} -->")
  ) {
    console.log("🔄 Обновляем `widgetData.content` с новым HTML");
    nextData.widgetData.content = updatedHtml; // Подставляем обновлённое содержимое
  } else {
    console.warn("⚠️ `widgetData.content` не содержит `<!-- {{custom_widget}} -->`. Обновление не требуется.");
    return;
  }

  // Записываем обновлённый NEXT_DATA в content.desktop.html
  setNextData(contentHtmlPath, nextData);
}
