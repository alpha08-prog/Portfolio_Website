import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { cleanup, fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import emailjs from "@emailjs/browser";
import Index from "@/pages/Index";

vi.mock("@emailjs/browser", () => ({ default: { send: vi.fn() } }));

beforeEach(() => {
  vi.stubGlobal("IntersectionObserver", class {
    observe() {} unobserve() {} disconnect() {}
  });
  vi.stubEnv("VITE_EMAILJS_SERVICE_ID", "test-service");
  vi.stubEnv("VITE_EMAILJS_TEMPLATE_ID", "test-template");
  vi.stubEnv("VITE_EMAILJS_PUBLIC_KEY", "test-key");
  vi.mocked(emailjs.send).mockReset();
});
afterEach(() => { cleanup(); vi.unstubAllGlobals(); vi.unstubAllEnvs(); });

describe("portfolio interactions", () => {
  it("filters the project collection and restores all projects", () => {
    render(<Index />);
    expect(screen.getAllByRole("button", { name: /^Explore (AI Scholar|IsoLab|Kubernetes|EEG)/ })).toHaveLength(4);
    fireEvent.click(screen.getByRole("button", { name: "Security" }));
    expect(screen.getByRole("button", { name: "Explore Kubernetes Attack Path Analyzer" })).toBeVisible();
    expect(screen.getByRole("button", { name: "Explore IsoLab — Cloud Security" })).toBeVisible();
    expect(screen.queryByRole("button", { name: "Explore AI Scholar" })).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /All work/ }));
    expect(screen.getByRole("button", { name: "Explore AI Scholar" })).toBeVisible();
  });

  it("opens a project with the correct source and live demo, then restores focus", async () => {
    render(<Index />);
    fireEvent.click(screen.getByRole("button", { name: "Explore Kubernetes Attack Path Analyzer" }));
    const dialog = screen.getByRole("dialog");
    expect(within(dialog).getByRole("heading", { name: "Kubernetes Attack Path Analyzer" })).toBeVisible();
    expect(within(dialog).getByRole("link", { name: /View source code/ })).toHaveAttribute("href", "https://github.com/alpha08-prog/Kubernetes-Attack-Path-Analyzer");
    expect(within(dialog).getByRole("link", { name: "Live demo" })).toHaveAttribute("href", "https://kubenetes-attack-path-analyzer.vercel.app/");
    fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button", { name: "Explore Kubernetes Attack Path Analyzer" })).toHaveFocus());
  });

  it("explores architecture layers and pauses the diagram", () => {
    render(<Index />);
    const services = screen.getByRole("button", { name: "Services" });
    fireEvent.click(services);
    expect(services).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByText("APIs, access control, and business logic that connect the pieces.")).toBeVisible();
    fireEvent.click(screen.getByRole("button", { name: "Pause motion" }));
    expect(screen.getByRole("button", { name: "Play motion" })).toHaveAttribute("aria-pressed", "true");
  });

  it("supports keyboard quick navigation and search", () => {
    render(<Index />);
    fireEvent.keyDown(window, { key: "k", ctrlKey: true });
    const dialog = screen.getByRole("dialog");
    fireEvent.change(within(dialog).getByRole("textbox", { name: "Search pages and links" }), { target: { value: "resume" } });
    expect(within(dialog).getByRole("link", { name: "Download résumé" })).toHaveAttribute("href", "/resume.pdf");
    expect(within(dialog).queryByRole("link", { name: "Work" })).not.toBeInTheDocument();
    fireEvent.click(within(dialog).getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("closes mobile navigation after choosing a section", () => {
    render(<Index />);
    fireEvent.click(screen.getByRole("button", { name: "Open navigation" }));
    expect(screen.getByRole("button", { name: "Close navigation" })).toHaveAttribute("aria-expanded", "true");
    fireEvent.click(within(screen.getByRole("navigation", { name: "Main navigation" })).getByRole("link", { name: "Work" }));
    expect(screen.getByRole("button", { name: "Open navigation" })).toHaveAttribute("aria-expanded", "false");
  });

  it("copies the published email address", async () => {
    const writeText = vi.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { configurable: true, value: { writeText } });
    render(<Index />);
    fireEvent.click(screen.getByRole("button", { name: "Copy email address" }));
    await waitFor(() => expect(screen.getByText("Email copied to clipboard")).toBeVisible());
    expect(writeText).toHaveBeenCalledWith("agrawalatharva2004@gmail.com");
  });

  it("uses the new résumé endpoint for every résumé action", () => {
    render(<Index />);
    const links = screen.getAllByRole("link", { name: /résumé/i });
    expect(links.length).toBeGreaterThanOrEqual(4);
    for (const link of links) expect(link).toHaveAttribute("href", "/resume.pdf");
    expect(screen.getByText("Software Development Intern")).toBeVisible();
    expect(screen.getByText(/CPI 8.82\/10/)).toBeVisible();
  });
});

function fillContact() {
  fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Test Visitor" } });
  fireEvent.change(screen.getByLabelText("Email address"), { target: { value: "visitor@example.com" } });
  fireEvent.change(screen.getByLabelText("What's on your mind?"), { target: { value: "An example message for a mocked delivery test." } });
  fireEvent.click(screen.getByRole("button", { name: "Send a message" }));
}

describe("contact delivery states (mocked; no email sent)", () => {
  it("shows success after a confirmed delivery", async () => {
    vi.mocked(emailjs.send).mockResolvedValue({ status: 200, text: "OK" });
    render(<Index />); fillContact();
    await waitFor(() => expect(screen.getByText("Message sent. Thanks for reaching out!")).toBeVisible());
    expect(emailjs.send).toHaveBeenCalledWith("test-service", "test-template", expect.objectContaining({ from_name: "Test Visitor", from_email: "visitor@example.com" }), "test-key");
    expect(screen.getByLabelText("Your name")).toHaveValue("");
  });

  it("offers direct email after failed delivery", async () => {
    vi.mocked(emailjs.send).mockRejectedValue(new Error("Delivery unavailable"));
    render(<Index />); fillContact();
    await waitFor(() => expect(screen.getByRole("link", { name: "Email me directly" })).toHaveAttribute("href", "mailto:agrawalatharva2004@gmail.com"));
    expect(screen.getByLabelText("Your name")).toHaveValue("Test Visitor");
  });
});
