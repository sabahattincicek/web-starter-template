// @vitest-environment jsdom
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";

describe("Button", () => {
  it("shows its label", () => {
    render(<Button>Save</Button>);

    expect(screen.getByRole("button", { name: "Save" })).toBeDefined();
  });

  it("merges a custom class with its variant classes", () => {
    render(<Button className="custom">Save</Button>);

    expect(screen.getByRole("button").className).toContain("custom");
    expect(screen.getByRole("button").className).toContain("bg-primary");
  });
});
