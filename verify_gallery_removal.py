from playwright.sync_api import sync_playwright

def verify_gallery_removal():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Scroll to gallery
        gallery_section = page.locator("#gallery")
        gallery_section.scroll_into_view_if_needed()

        # Wait a bit for images to load (if lazy loading)
        page.wait_for_timeout(2000)

        # Take a screenshot of the gallery section
        page.screenshot(path="verification_gallery_removal.png", full_page=True)

        # Also take a specific screenshot of the grid to be sure
        grid = page.locator(".masonry-grid")
        grid.screenshot(path="verification_gallery_grid_cleaned.png")

        browser.close()

if __name__ == "__main__":
    verify_gallery_removal()
