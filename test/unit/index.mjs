import { test } from "node:test";
import assert from "node:assert/strict";
import { jdom } from "../";

test("will pass", () => {
    console.log(jdom);
    assert.ok("hello world");
});

test.skip("will fail", () => {
    assert.fail("fail");
});