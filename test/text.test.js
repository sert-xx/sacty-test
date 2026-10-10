import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { readFileSync } from "node:fs";
import { capitalize, normalizeSpaces, reverse } from "../src/text.js";

describe("normalizeSpaces", () => {
  it("前後の空白を除き、連続する空白を1つにまとめる", () => {
    assert.equal(normalizeSpaces("  hello   world \n"), "hello world");
  });

  it("空白だけなら空文字にする", () => {
    assert.equal(normalizeSpaces("   "), "");
  });
});

describe("capitalize", () => {
  it("先頭の文字を大文字にする", () => {
    assert.equal(capitalize("sacty"), "Sacty");
  });

  it("空文字はそのまま", () => {
    assert.equal(capitalize(""), "");
  });
});

describe("reverse", () => {
  it("英字列が逆順になる", () => assert.equal(reverse("abc"), "cba"));
  it("1文字はそのまま", () => assert.equal(reverse("a"), "a"));
  it("空文字でエラーにならず空文字を返す", () => {
    assert.doesNotThrow(() => reverse(""));
    assert.equal(reverse("").length, 0);
    assert.equal(reverse(""), "");
  });
  it("2文字が入れ替わる", () => assert.equal(reverse("ab"), "ba"));
  it("奇数長・偶数長", () => {
    assert.equal(reverse("abcd"), "dcba");
    assert.equal(reverse("abcde"), "edcba");
  });
  it("回文は同じ文字列", () => {
    assert.equal(reverse("level"), "level");
    assert.equal(reverse("abba"), "abba");
  });
  it("空白と記号も逆順", () => assert.equal(reverse("a b!"), "!b a"));
  it("先頭末尾の空白・改行が保持される", () => assert.equal(reverse(" ab\n"), "\nba "));
  it("日本語が逆順になる", () => assert.equal(reverse("あいう"), "ういあ"));
  it("ASCIIと非ASCIIの混在", () => assert.equal(reverse("aあb"), "bあa"));
  it("BMP外の文字が壊れない", () => {
    const r = reverse("a😀b");
    assert.equal(r, "b😀a");
    assert.ok(r.isWellFormed());
  });
  it("二重の逆順で元に戻る", () => {
    for (const s of ["abc", "a", "", "level", "a b!", "あいう", "a😀b"]) {
      assert.equal(reverse(reverse(s)), s);
    }
  });
  it("元の文字列が変更されない", () => {
    const s = "abc";
    const r = reverse(s);
    assert.equal(s, "abc");
    assert.equal(s.length, 3);
    assert.equal(r, "cba");
  });
  it("戻り値は別の新しい文字列で、加工しても元に影響しない", () => {
    const s = "abc";
    let r = reverse(s);
    r += "x";
    r = r.toUpperCase();
    assert.equal(s, "abc");
    assert.notEqual(r, s);
  });
  it("同じ入力を繰り返しても同じ結果", () => {
    assert.equal(reverse("abc"), "cba");
    assert.equal(reverse("abc"), "cba");
  });
  it("長い文字列でも正しく動く", () => {
    const s = "ab".repeat(50000);
    const start = Date.now();
    const r = reverse(s);
    assert.ok(Date.now() - start < 3000);
    assert.equal(r.length, 100000);
    assert.equal(r, "ba".repeat(50000));
  });
  it("結合文字はコードポイント単位で逆順になり、制限が明記されている", () => {
    assert.equal(reverse("éa"), "áe");
    const src = readFileSync(new URL("../src/text.js", import.meta.url), "utf8");
    assert.match(src, /書記素クラスタ[\s\S]*?\*\/\s*export function reverse/);
  });
});
