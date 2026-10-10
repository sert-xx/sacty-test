/**
 * 文字列のちょっとした処理。sacty の動作確認で、エージェントに機能を足してもらうための土台。
 */

/** 前後の空白を除き、連続する空白を1つにまとめる。 */
export function normalizeSpaces(value) {
  return value.trim().replace(/\s+/g, " ");
}

/** 先頭の文字を大文字にする（空文字はそのまま）。 */
export function capitalize(value) {
  return value.length === 0 ? value : value[0].toUpperCase() + value.slice(1);
}
