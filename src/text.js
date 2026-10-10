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

/**
 * 文字列をコードポイント単位で逆順にした新しい文字列を返す。
 *
 * 制限: 書記素クラスタ（見た目の1文字）単位ではない。結合文字（e + U+0301）、
 * 国旗、家族絵文字などは、構成するコードポイントが逆順になり、見た目が崩れることがある。
 */
export function reverse(value) {
  return Array.from(value).reverse().join("");
}
