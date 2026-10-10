import assert from "node:assert/strict";
import { describe, it } from "node:test";
import { capitalize, normalizeSpaces } from "../src/text.js";

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
