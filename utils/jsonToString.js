import jsesc from "jsesc";

/**
 * Превращает объект JSON в строку с безопасным экранированием
 * @param {Object} jsonData - Объект JSON
 * @returns {string} - JSON-строка
 */
export function jsonToString(jsonData) {
  if (!jsonData) {
    console.error("❌ Ошибка: Пустой JSON-объект!");
    return "";
  }

  try {
    // Конвертируем JSON в строку с безопасным экранированием
    const jsonString = jsesc(jsonData,{
        indent: 2,
        quotes: 'double',
        isScriptContext: true,
        json: true
      });

    console.log("✅ JSON успешно конвертирован в строку!");
    return jsonString;
  } catch (error) {
    console.error("❌ Ошибка при конвертации JSON в строку:", error.message);
    return "";
  }
}
