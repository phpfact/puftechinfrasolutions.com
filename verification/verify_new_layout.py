from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        try:
            page.goto("http://localhost:8080")

            # Verify Title
            expect(page).to_have_title("Premium PUFF Panel Construction Home")

            # Verify Header Logo specifically
            # Searching inside the header tag
            header_logo = page.locator("header").get_by_role("heading", name="PUFFPANELS")
            expect(header_logo).to_be_visible()

            # Verify Hero Section
            hero = page.locator("#hero_section")
            expect(hero).to_be_visible()

            # Wait for images to load (a simple check)
            page.wait_for_load_state("networkidle")

            # Take Screenshot
            page.screenshot(path="verification/new_homepage.png", full_page=True)
            print("Verification successful. Screenshot saved to verification/new_homepage.png")

        except Exception as e:
            print(f"Verification failed: {e}")
            page.screenshot(path="verification/error.png")
        finally:
            browser.close()

if __name__ == "__main__":
    run()
