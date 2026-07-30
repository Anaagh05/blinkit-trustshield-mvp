# Edge Cases & Corner Cases — Blinkit TrustShield + AI Review Intelligence

> A comprehensive catalog of every edge case, corner case, and failure mode across the MVP — organized by layer.  
> **References**: [architecture.md](file:///d:/MVP/docs/architecture.md) · [problemStatement.md](file:///d:/MVP/docs/problemStatement.md)

---

## 1. Gemini API — AI Layer

| # | Edge Case | Trigger | Expected Behavior | Priority |
|---|-----------|---------|-------------------|----------|
| 1.1 | **API key missing or empty** | `.env` file has no `VITE_GEMINI_API_KEY` or it's blank | Show inline warning: "AI features unavailable — API key not configured". TrustShield and static PDP still render. Quick-Ask buttons show disabled state with tooltip. | 🔴 High |
| 1.2 | **API key invalid / revoked** | Key exists but is rejected by Google (HTTP 401/403) | Catch error → show "AI features temporarily unavailable" + fallback summary from `fallback.js`. Log error to console. | 🔴 High |
| 1.3 | **Rate limit hit (HTTP 429)** | Free tier: 15 RPM exceeded (multiple users or rapid retries) | Show "AI is busy right now. Try again in a moment." with a **retry button** + cooldown timer (30s). Do NOT auto-retry in a loop. | 🔴 High |
| 1.4 | **Request timeout** | Gemini takes > 15 seconds to respond (network lag, server overload) | Abort fetch with `AbortController` after 15s. Show "Request timed out — tap to retry." | 🟡 Medium |
| 1.5 | **Gemini returns non-JSON text** | Model hallucinates a conversational response instead of structured JSON | Attempt to extract JSON from response using regex (`/{[\s\S]*}/`). If extraction fails → fallback to `fallback.js`. | 🟡 Medium |
| 1.6 | **Gemini returns malformed JSON** | Missing closing braces, trailing commas, unescaped quotes | Wrap `JSON.parse()` in try-catch. On failure → fallback data. | 🟡 Medium |
| 1.7 | **Gemini returns partial JSON** | Valid JSON but missing keys (e.g., no `quickAsk` field) | Validate response schema before using. Use defaults for missing fields: `summary` → fallback text, `pros` → `["No pros identified"]`, `cons` → `["No cons identified"]`, `quickAsk.*` → "Information not available." | 🟡 Medium |
| 1.8 | **Gemini returns empty arrays** | `pros: []` or `cons: []` | Render "No specific pros/cons identified from reviews" instead of empty space. | 🟢 Low |
| 1.9 | **Gemini returns excessive output** | Summary is 500+ words instead of 2-3 sentences | Truncate `summary` to 300 characters + "..." on the UI. Full text available on expand. | 🟢 Low |
| 1.10 | **Gemini returns offensive content** | AI hallucinates inappropriate text in summary or answers | Reject if response contains profanity keywords. Fallback to `fallback.js`. | 🟢 Low |
| 1.11 | **API endpoint URL changes** | Google deprecates `/v1beta` endpoint | Centralize endpoint URL in `gemini.js` constants. Easy to update in one place. | 🟢 Low |
| 1.12 | **Gemini returns response in wrong language** | Model responds in Hindi or mixed language | Add explicit instruction in prompt: "Respond only in English." | 🟢 Low |

---

## 2. Caching — sessionStorage Layer

| # | Edge Case | Trigger | Expected Behavior | Priority |
|---|-----------|---------|-------------------|----------|
| 2.1 | **sessionStorage unavailable** | Browser in incognito mode (some Safari versions) | Wrap all `sessionStorage` calls in try-catch. If unavailable → skip caching, make fresh API call each time. | 🔴 High |
| 2.2 | **sessionStorage quota exceeded** | Other apps or tabs have filled the ~5MB quota | Catch `QuotaExceededError`. Clear the `blinkit_ai_insights` key and retry write. If still fails → skip caching silently. | 🟡 Medium |
| 2.3 | **Cached data is corrupted** | Manual tampering via DevTools | Validate cached JSON on read with try-catch + schema check. If invalid → delete key, treat as cache miss. | 🟡 Medium |
| 2.4 | **Cache contains stale product data** | User navigates to a different product | Cache is keyed by `productId`. Different product → cache miss → fresh API call. | 🟢 Low |
| 2.5 | **Multiple tabs open same product** | User opens product in 2+ tabs simultaneously | `sessionStorage` is per-tab. Each tab makes one API call. Acceptable for MVP. | 🟢 Low |
| 2.6 | **Cache persists after review data update** | Developer updates `reviews.json` | Acceptable for MVP. For production: add a `dataVersion` field to cache and compare against current version. | 🟢 Low |

---

## 3. Network Layer

| # | Edge Case | Trigger | Expected Behavior | Priority |
|---|-----------|---------|-------------------|----------|
| 3.1 | **User is offline** | No internet connection when tapping "Summarize" | Check `navigator.onLine` before API call. If offline → show "You're offline." | 🔴 High |
| 3.2 | **Network drops mid-request** | Connection lost while Gemini API call is in-flight | Fetch rejects → catch error → show "Connection lost. Tap to retry." | 🔴 High |
| 3.3 | **Extremely slow network (2G/3G)** | Gemini response takes 5-10 seconds | Loading skeleton remains visible. No timeout until 15s (see 1.4). | 🟡 Medium |
| 3.4 | **User goes offline then comes back** | Online → offline → online during session | Listen for `online`/`offline` events. When back online → if AI failed, show retry prompt. | 🟢 Low |
| 3.5 | **CORS errors** | Gemini API blocks browser-side requests | Catch error → show generic "AI unavailable" message. | 🟢 Low |

---

## 4. User Interaction — UI/UX Layer

| # | Edge Case | Trigger | Expected Behavior | Priority |
|---|-----------|---------|-------------------|----------|
| 4.1 | **Double-click on "Summarize" button** | User rapidly taps button twice | Disable button immediately on first click (`loading=true`). | 🔴 High |
| 4.2 | **Click "Summarize" while already loading** | User taps during skeleton loading state | Button is disabled during loading. No action. | 🔴 High |
| 4.3 | **Tap Quick-Ask before AI summary is loaded** | User scrolls to Quick-Ask section and taps | Buttons show disabled state with hint: "Tap 'Summarize with AI' first". | 🟡 Medium |
| 4.4 | **Rapid toggling of Quick-Ask buttons** | User taps all 3 buttons quickly | Accordion behavior: only one answer visible at a time. Previous collapses. | 🟡 Medium |
| 4.5 | **Scroll position jump after AI content loads** | AI summary card expands | Smooth scroll adjustment — don't jump the viewport. | 🟡 Medium |
| 4.6 | **Cart quantity goes below 0** | User repeatedly taps "−" button | Clamp quantity to `Math.max(0, quantity - 1)`. Disable "−" button when 0. | 🟡 Medium |
| 4.7 | **Cart quantity goes absurdly high** | User repeatedly taps "+" | Cap quantity at 10. Show toast: "Maximum 10 units per order." | 🟢 Low |
| 4.8 | **User clicks back button in Navbar** | Back arrow clicked | Navigate to a placeholder "Home" screen. | 🟢 Low |
| 4.9 | **User clicks search icon in Navbar** | Search icon clicked | Show a toast or modal: "Search coming soon!" | 🟢 Low |
| 4.10 | **Product image fails to load** | Image path is wrong | Show a styled placeholder with the product name. | 🟡 Medium |

---

## 5. Responsive & Viewport — Layout Layer

| # | Edge Case | Trigger | Expected Behavior | Priority |
|---|-----------|---------|-------------------|----------|
| 5.1 | **Very small viewport (< 320px)** | Old/small phones | Content should still be usable. Test with `min-width: 280px`. | 🟡 Medium |
| 5.2 | **Very large viewport (4K monitor)** | Desktop user on ultra-wide screen | PDP stays at `max-width: 480px`, centered. | 🟡 Medium |
| 5.3 | **Landscape mobile orientation** | User rotates phone | Layout should adapt. Sticky elements remain fixed. | 🟢 Low |
| 5.4 | **Sticky overlap** | Long product header + navbar push content | Ensure padding-top and padding-bottom account for fixed elements. | 🔴 High |
| 5.5 | **Virtual keyboard open (mobile)** | Keyboard appears | N/A for current scope. | 🟢 Low |
| 5.6 | **Dynamic font scaling** | User has OS-level font size set to "Large" | Use `rem` units, not `px`, for font sizes. | 🟡 Medium |
| 5.7 | **Notch / safe area (iPhone)** | iPhone with notch | Use `env(safe-area-inset-top)` and `env(safe-area-inset-bottom)`. | 🟢 Low |

---

## 6. Data Integrity — Review Dataset

| # | Edge Case | Trigger | Expected Behavior | Priority |
|---|-----------|---------|-------------------|----------|
| 6.1 | **reviews.json is empty** | Empty file | Check length before prompt. If empty → skip AI call, show "No reviews". | 🔴 High |
| 6.2 | **Review text contains special characters** | Emojis, HTML tags | Sanitize before inserting into prompt. | 🟡 Medium |
| 6.3 | **Review text exceeds 150-char limit** | Long review | Truncate to 150 chars in the prompt builder. | 🟢 Low |
| 6.4 | **All reviews are the same rating** | Only 5-star reviews | Acceptable for mock data, but curation should ensure a mix. | 🟢 Low |
| 6.5 | **Review author names missing** | `author` field is `null` | Display "Blinkit Buyer" as default author name. | 🟢 Low |
| 6.6 | **Duplicate reviews** | Same review text appears multiple times | Deduplicate in prompt builder with `Set`. | 🟢 Low |

---

## 7. Security & Privacy

| # | Edge Case | Trigger | Expected Behavior | Priority |
|---|-----------|---------|-------------------|----------|
| 7.1 | **API key visible in client bundle** | Extracted from source | Accepted risk for MVP. For production: move to backend. | 🟡 Medium |
| 7.2 | **XSS via AI-generated content** | Gemini returns text containing `<script>` | React auto-escapes JSX text content. No `dangerouslySetInnerHTML`. | 🔴 High |
| 7.3 | **Prompt injection via review data** | Malicious review in mock data | No real injection vector as data is static. | 🟢 Low |
| 7.4 | **User inspects cached AI data** | Cached data visible | Non-sensitive data. Acceptable. | 🟢 Low |
| 7.5 | **API key abuse by third party** | Key extracted and abused | Free tier has limits (15 RPM). | 🟡 Medium |

---

## 8. Browser Compatibility

| # | Edge Case | Trigger | Expected Behavior | Priority |
|---|-----------|---------|-------------------|----------|
| 8.1 | **JavaScript disabled** | JS disabled | Show `<noscript>` message: "This app requires JavaScript." | 🟡 Medium |
| 8.2 | **Old browser (IE11, legacy Edge)** | Unsupported browser | Not a priority for MVP. | 🟢 Low |
| 8.3 | **Safari Private Browsing** | Older Safari throws on `sessionStorage` | Wrap in try-catch. Skip caching. | 🟡 Medium |
| 8.4 | **Fetch API unavailable** | Old browsers without `fetch` | Vite polyfills handle this. | 🟢 Low |
| 8.5 | **CSS animations disabled** | `prefers-reduced-motion: reduce` | Skip animations. | 🟡 Medium |

---

## 9. Deployment & Environment

| # | Edge Case | Trigger | Expected Behavior | Priority |
|---|-----------|---------|-------------------|----------|
| 9.1 | **`VITE_GEMINI_API_KEY` not set on Vercel** | Missing env var | Show "unavailable" warning. Static PDP still works. | 🔴 High |
| 9.2 | **Build fails on Vercel** | Dependency issues | Specify Node version in `package.json`. | 🟡 Medium |
| 9.3 | **Vercel cold start latency** | First visit after idle | Not applicable (static files). | 🟢 Low |
| 9.4 | **Custom domain SSL issues** | Custom domain added | Vercel provides free SSL by default. | 🟢 Low |
| 9.5 | **SPA routing on refresh (404)** | User refreshes on sub-path | `vercel.json` rewrite rule handles it. | 🟡 Medium |

---

## 10. Accessibility (a11y)

| # | Edge Case | Trigger | Expected Behavior | Priority |
|---|-----------|---------|-------------------|----------|
| 10.1 | **Screen reader on AI content** | VoiceOver / NVDA | Use `aria-live="polite"` and `aria-label="Loading AI summary"`. | 🟡 Medium |
| 10.2 | **Keyboard navigation** | Tab key | Ensure interactive elements are focusable with Enter/Space. | 🟡 Medium |
| 10.3 | **Color contrast insufficient** | Light yellow on white | Verify text meets WCAG AA contrast ratio. | 🟡 Medium |
| 10.4 | **Touch target too small** | Mobile buttons | Minimum touch target: 44×44px. | 🟡 Medium |
| 10.5 | **Loading state not communicated** | Screen reader user doesn't know AI is loading | Add `role="status"` and `aria-busy="true"`. | 🟢 Low |

---

## Summary by Priority

| Priority | Count | Action |
|----------|-------|--------|
| 🔴 **High** | 10 | Must handle before deploy. App-breaking if missed. |
| 🟡 **Medium** | 20 | Should handle in Phase 4 (Polish). Degraded UX if missed. |
| 🟢 **Low** | 18 | Nice to have. Can defer to post-MVP. |
| **Total** | **48** | |

### Top 10 Must-Handle Edge Cases

| # | Edge Case | Where to Handle |
|---|-----------|----------------|
| 1.1 | API key missing | `gemini.js` — early return + UI warning |
| 1.2 | API key invalid (401/403) | `gemini.js` — catch + fallback data |
| 1.3 | Rate limit (429) | `gemini.js` — retry button with cooldown |
| 2.1 | sessionStorage unavailable | `cache.js` — try-catch wrapper |
| 3.1 | User offline | `useAIInsights.js` — `navigator.onLine` check |
| 3.2 | Network drops mid-request | `useAIInsights.js` — catch + retry prompt |
| 4.1 | Double-click on Summarize | `AIReviewSummary.jsx` — disable on click |
| 5.4 | Sticky element overlap | `App.css` — padding-top/bottom offsets |
| 6.1 | Empty reviews.json | `gemini.js` — length check before prompt |
| 7.2 | XSS in AI output | All components — no `dangerouslySetInnerHTML` |
