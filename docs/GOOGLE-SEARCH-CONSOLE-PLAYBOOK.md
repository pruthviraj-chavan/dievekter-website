# Google Search Console Operational Playbook (`www.dievekter.com`)

This guide establishes a clean, evidence-first Google Search Console workflow combining the **`claude-seo` (`seo-google`)**, **`localseoskills` (`google-search-console-tool`)**, and **Comparison Contract / Decision Record** standards.

---

## 1. First-Time Setup After Adding `www.dievekter.com` to GSC

1. **Property Selection:** Verify the Domain property (`sc-domain:dievekter.com`) alongside canonical HTTPS URL prefix (`https://www.dievekter.com/`). Remember `dievekter.com` 308-redirects to `https://www.dievekter.com/`, so performance should consolidate onto `www`.
2. **Submit Sitemap Immediately:** In Search Console -> **Sitemaps**, submit:
   - `https://www.dievekter.com/sitemap.xml`
3. **Priority URL Inspections (Index Request Queue):**
   - `https://www.dievekter.com/`
   - `https://www.dievekter.com/locations`, `/locations/radhanagari`, `/locations/kolhapur`, `/locations/phondaghat`
   - `https://www.dievekter.com/services`, `/services/website-development`, `/services/ai-agents`, `/services/seo-optimization`
   - `https://www.dievekter.com/study-abroad`, `/study-abroad/germany`
   - `https://www.dievekter.com/blog/study-in-germany-complete-guide-indian-students`
   - `https://www.dievekter.com/blog/aps-certificate-india-checklist-documents-timeline-germany`

---

## 2. Four GSC Report Types That Must Never Be Collapsed

| Question | Correct GSC View | Important Boundary |
| --- | --- | --- |
| **Total organic clicks/impressions trend?** | Ungrouped property/page aggregate | **Never** sum visible query rows and call them property totals (GSC omits low-volume & anonymized queries). |
| **Which queries trigger our pages?** | `dimensions=["query", "page"]` with fixed date/country/device | Rows are an analytical sample under top-row limits, not full search demand. |
| **Which URLs belong to an intent?** | Query + page slice paired with live SERP inspection | Average position averages across cities/devices; verify actual SERP results before editing. |
| **Is a page indexed cleanly?** | URL Inspection (`gsc_inspect.py`) + live crawl | Shows status at recorded crawl time; inspect one URL at a time rather than guessing site-wide indexation. |

> **Historical Data Boundary Note (2025–2026):** Keep clean date windows and account for Search Console lag (do not judge brand-new edits on incomplete tail days). For geographic filtering, segment **India** (`IN`) separately from **Germany** (`DE`) and global search traffic.

---

## 3. Mandatory Comparison Contract Before Running Analysis

Document these seven fields before pulling or comparing metrics:

- **Property:** `sc-domain:dievekter.com`
- **Date Window:** Matched 28-day period (e.g., excluding final 2–3 incomplete days) vs prior period
- **Search Type:** `web` (or `image`, separate from Generative AI UI impressions view)
- **Dimensions:** `page`, `query`, `country`, `device`
- **Filters:** e.g., non-brand queries vs brand queries (`dievekter`), or prefix `/study-abroad/` vs `/services/` vs `/locations/`
- **Metric Focus:** Clicks, Impressions, CTR, Average Position
- **Decision Requested:** Investigate / Meta-CTR test / Content update / Technical check

---

## 4. Connecting Read-Only GSC CLI Scripts (`claude-seo`)

When you are ready to inspect live Search Console data and URL index status from terminal/agent workflows using `claude-seo` (`~/.claude/skills/seo/scripts/gsc_query.py` & `gsc_inspect.py`):

1. Create a read-only Google Cloud **Service Account** (`cloud.google.com`) and enable:
   - **Google Search Console API**
   - **PageSpeed Insights API** & **Chrome UX Report API**
2. Download the Service Account JSON key to `~/.config/claude-seo/service_account.json` (strictly outside any git repo).
3. In **Google Search Console -> Settings -> Users and permissions**, add that service account `client_email` with **Full (read-only analytics/inspection)** permission — keep `Owner` restricted unless using Indexing API.
4. Create `~/.config/claude-seo/google-api.json`:

```json
{
  "service_account_path": "~/.config/claude-seo/service_account.json",
  "default_property": "sc-domain:dievekter.com",
  "sites": {
    "dievekter.com": {
      "gsc_property": "sc-domain:dievekter.com",
      "ga4_property_id": "properties/YOUR_GA4_NUMERIC_PROPERTY_ID"
    }
  }
}
```

5. Verify access and run scoped read-only queries:

```bash
"$HOME/.claude/skills/seo/scripts/claude-seo" run google_auth.py --check --json
"$HOME/.claude/skills/seo/scripts/claude-seo" run gsc_query.py --domain dievekter.com --json
"$HOME/.claude/skills/seo/scripts/claude-seo" run gsc_inspect.py --domain dievekter.com https://www.dievekter.com/locations/kolhapur --json
```

---

## 5. Weekly Decision Record Template (No Dashboard Theatre)

- **Observation:** Measured change + scoped dates (e.g., `/services/ai-agents` impressions rose, CTR stayed 1.1%).
- **Alternative Explanations Checked:** SERP layout (AI Overviews / ads), brand vs non-brand shift, recent title edit.
- **Hypothesis & Owner:** One testable title/meta or H2 clarity change assigned to named owner.
- **Post-Change Measurement:** Re-run the exact same scoped comparison 14–28 days post-deploy.
