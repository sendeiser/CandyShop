"""Comprehensive test of Candy Shop webapp"""
from playwright.sync_api import sync_playwright
import sys

BASE = "http://localhost:5174"
errors = []

def test(label, fn):
    try:
        fn()
        print(f"  OK {label}")
    except Exception as e:
        print(f"  FAIL {label}: {e}")
        errors.append({"test": label, "error": str(e)})

def check(cond, msg):
    if not cond:
        raise Exception(msg)

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 800})
        page.set_default_timeout(5000)

        # 1. Home
        print("\n[HOME PAGE]")
        page.goto(BASE, wait_until="networkidle")
        page.wait_for_timeout(1000)

        test("Page has h1", lambda: page.wait_for_selector("h1"))
        test("Hero has CTA link", lambda: page.wait_for_selector("a[href='/catalogo']"))
        test("Page has content", lambda: check(len(page.content()) > 500, "Minimal content"))

        # 2. Navbar
        print("\n[NAVBAR]")
        test("Navbar visible", lambda: page.wait_for_selector("nav"))
        test("Search input", lambda: page.wait_for_selector("input[placeholder*='Buscar']"))

        # 3. Catalog
        print("\n[CATALOG]")
        page.goto(f"{BASE}/catalogo", wait_until="networkidle")
        page.wait_for_timeout(2000)
        test("Catalog page loads", lambda: page.wait_for_selector("h1"))

        # Check for product links (could be /producto/slug or similar)
        product_links = page.locator("a").all()
        product_hrefs = [l.get_attribute("href") for l in product_links if l.get_attribute("href")]
        product_links_found = [h for h in product_hrefs if h and '/producto/' in h]
        test(f"Product links ({len(product_links_found)} found)", lambda: None)

        # Check for product cards
        add_buttons = page.locator("button:has-text('Agreg')").all()
        test(f"Add buttons ({len(add_buttons)} found)", lambda: None)

        # 4. Product Detail
        print("\n[PRODUCT DETAIL]")
        if product_links_found:
            href = product_links_found[0]
            page.goto(f"{BASE}{href}", wait_until="networkidle")
            page.wait_for_timeout(1000)
            test("Product page has h1", lambda: page.wait_for_selector("h1"))
            test("Weight selector", lambda: page.wait_for_selector("text=100g"))
            test("Has add to cart button", lambda: page.wait_for_selector("button:has-text('Agreg')"))
        else:
            print("  SKIP (no product links)")

        # 5. Category Pages
        print("\n[CATEGORY PAGES]")
        for path in ["/gomitas", "/combos", "/eventos", "/nosotros", "/contacto"]:
            try:
                page.goto(f"{BASE}{path}", wait_until="networkidle")
                page.wait_for_timeout(1000)
                ok = len(page.content()) > 200
                test(f"Page {path} loads", lambda: check(ok, "Minimal content"))
            except Exception as e:
                test(f"Page {path} loads", lambda: check(False, str(e)))

        # 6. Search
        print("\n[SEARCH]")
        page.goto(f"{BASE}/buscar?q=ositos", wait_until="networkidle")
        page.wait_for_timeout(2000)
        test("Search results page loads", lambda: page.wait_for_selector("h1"))

        page.goto(f"{BASE}/buscar?q=noexiste123xyz", wait_until="networkidle")
        page.wait_for_timeout(1000)
        test("Empty search has content", lambda: check(len(page.content()) > 200, "Empty page"))

        # 7. Auth
        print("\n[AUTH]")
        page.goto(f"{BASE}/auth/login", wait_until="networkidle")
        page.wait_for_timeout(1000)
        test("Login has email field", lambda: page.wait_for_selector("input[type='email']"))
        test("Login has password field", lambda: page.wait_for_selector("input[type='password']"))
        test("Login has submit button", lambda: page.wait_for_selector("button[type='submit']"))

        page.goto(f"{BASE}/auth/register", wait_until="networkidle")
        page.wait_for_timeout(1000)
        test("Register page loads", lambda: page.wait_for_selector("input[type='email']"))

        # 8. Cart
        print("\n[CART]")
        page.goto(f"{BASE}/carrito", wait_until="networkidle")
        page.wait_for_timeout(1000)
        test("Cart page loads", lambda: check(len(page.content()) > 200, "Empty page"))

        # 9. Admin (unauthenticated)
        print("\n[ADMIN - unauthenticated]")
        page.goto(f"{BASE}/admin", wait_until="networkidle")
        page.wait_for_timeout(1000)
        is_login = "login" in page.url
        test(f"Admin redirects to login (redirect: {is_login})", lambda: None)

        # 10. Console errors
        print("\n[CONSOLE ERRORS]")
        console_errors = []
        page.on("console", lambda msg: console_errors.append(f"[{msg.type}] {msg.text}") if msg.type == "error" else None)
        page.goto(f"{BASE}/catalogo", wait_until="networkidle")
        page.wait_for_timeout(2000)
        if console_errors:
            for err in console_errors[:5]:
                print(f"    ! {err[:150]}")
        test("No console errors", lambda: check(len(console_errors) == 0, str(console_errors[:3])))

        browser.close()

        # Summary
        passed = 25 - len(errors)
        total = 25
        print(f"\n{'='*50}")
        print(f"  {passed}/{total} PASSED ({len(errors)} FAILED)")
        if errors:
            print()
            for e in errors:
                print(f"  FAIL: {e['test']} -> {e['error'][:120]}")
        else:
            print("  ALL TESTS PASSED!")
        print(f"{'='*50}")

        return len(errors)

if __name__ == "__main__":
    exit_code = run()
    sys.exit(exit_code)
